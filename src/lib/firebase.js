import { initializeApp, getApps, getApp } from 'firebase/app'
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateProfile,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth'
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
}

const missingVars = Object.entries(firebaseConfig)
  .filter(([, v]) => !v || v.includes('PLACEHOLDER') || v.includes('your_'))
  .map(([k]) => k)

if (missingVars.length > 0) {
  console.error('GLOWIFY: Missing Firebase config vars:', missingVars.join(', '))
  console.error('Fix .env and restart: npm run dev')
}

let app, auth, db

try {
  app  = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)
  auth = getAuth(app)
  db   = getFirestore(app)
  setPersistence(auth, browserLocalPersistence)
    .then(() => console.log('Glowify Firebase: persistence enabled ✓'))
    .catch(err => console.warn('Glowify Firebase: persistence warning:', err.message))
  console.log('Glowify Firebase: initialized successfully ✓')
} catch (err) {
  console.error('Glowify Firebase: init FAILED:', err.message)
}

export { auth, db }

const parseAuthError = (code) => {
  const map = {
    'auth/user-not-found':         'No account found with this email.',
    'auth/wrong-password':         'Incorrect password. Please try again.',
    'auth/invalid-credential':     'Invalid email or password.',
    'auth/invalid-email':          'Please enter a valid email address.',
    'auth/email-already-in-use':   'An account with this email already exists.',
    'auth/weak-password':          'Password must be at least 6 characters.',
    'auth/popup-closed-by-user':   'Sign-in popup closed. Please try again.',
    'auth/popup-blocked':          'Popup blocked. Allow popups for this site.',
    'auth/network-request-failed': 'Network error. Check your connection.',
    'auth/too-many-requests':      'Too many attempts. Please wait and try again.',
    'auth/operation-not-allowed':  'This sign-in method is not enabled in Firebase Console.',
    'auth/cancelled-popup-request':'Sign-in cancelled. Please try again.',
  }
  return map[code] || `Error (${code}). Please try again.`
}

export const firebaseAuth = {

  signInWithEmail: async (email, password) => {
    try {
      if (!auth) throw new Error('Firebase auth not initialized')
      console.log('Glowify: signing in →', email)
      const result = await signInWithEmailAndPassword(auth, email, password)
      console.log('Glowify: sign-in SUCCESS uid:', result.user.uid)
      return { user: result.user, error: null }
    } catch (err) {
      console.error('Glowify: sign-in FAILED:', err.code, err.message)
      return { user: null, error: parseAuthError(err.code) }
    }
  },

  signUpWithEmail: async (email, password, displayName, storeName) => {
    try {
      if (!auth) throw new Error('Firebase auth not initialized')
      console.log('Glowify: creating account →', email)
      const result = await createUserWithEmailAndPassword(auth, email, password)
      if (displayName) await updateProfile(result.user, { displayName })
      await firestoreHelpers.createUserProfile(result.user, { displayName, storeName })
      await firestoreHelpers.seedMockData(result.user.uid)
      console.log('Glowify: sign-up SUCCESS uid:', result.user.uid)
      return { user: result.user, error: null }
    } catch (err) {
      console.error('Glowify: sign-up FAILED:', err.code, err.message)
      return { user: null, error: parseAuthError(err.code) }
    }
  },

  signInWithGoogle: async () => {
    try {
      if (!auth) throw new Error('Firebase auth not initialized')
      const provider = new GoogleAuthProvider()
      provider.setCustomParameters({ prompt: 'select_account' })
      provider.addScope('email')
      provider.addScope('profile')
      console.log('Glowify: opening Google sign-in')
      const result = await signInWithPopup(auth, provider)
      const isNew = result._tokenResponse?.isNewUser
      if (isNew) {
        console.log('Glowify: new Google user — seeding data')
        await firestoreHelpers.createUserProfile(result.user, {
          displayName: result.user.displayName,
          storeName: 'Glowify Beauty Co.',
        })
        await firestoreHelpers.seedMockData(result.user.uid)
      }
      console.log('Glowify: Google sign-in SUCCESS uid:', result.user.uid)
      return { user: result.user, error: null }
    } catch (err) {
      console.error('Glowify: Google sign-in FAILED:', err.code, err.message)
      return { user: null, error: parseAuthError(err.code) }
    }
  },

  signOut: async () => {
    try {
      await firebaseSignOut(auth)
      console.log('Glowify: signed out ✓')
      return { error: null }
    } catch (err) {
      console.error('Glowify: sign-out error:', err.message)
      return { error: err.message }
    }
  },

  resetPassword: async (email) => {
    try {
      await sendPasswordResetEmail(auth, email)
      return { error: null }
    } catch (err) {
      return { error: parseAuthError(err.code) }
    }
  },

  onAuthStateChanged: (callback) => {
    if (!auth) {
      console.warn('Glowify: auth unavailable — resolving null')
      setTimeout(() => callback(null), 0)
      return () => {}
    }
    return onAuthStateChanged(auth, (user) => {
      console.log('Glowify: auth state →', user ? `SIGNED IN (${user.uid})` : 'SIGNED OUT')
      callback(user)
    })
  },
}

export const firestoreHelpers = {

  profileExists: async (uid) => {
    try {
      const snap = await getDoc(doc(db, 'users', uid))
      return snap.exists()
    } catch { return false }
  },

  createUserProfile: async (user, extra = {}) => {
    if (!db) return
    try {
      await setDoc(doc(db, 'users', user.uid), {
        uid:               user.uid,
        email:             user.email,
        displayName:       extra.displayName || user.displayName || user.email?.split('@')[0] || 'User',
        storeName:         extra.storeName || 'My Store',
        plan:              'Enterprise',
        planStatus:        'Active',
        location:          'Austin, Texas, USA',
        shopifyDomain:     'glowifybeauty.myshopify.com',
        memberSince:       new Date('2024-03-14').toISOString(),
        daysActive:        61,
        aiActionsTaken:    147,
        automationsActive: 23,
        revenueViaAI:      84200,
        integrations:      ['Shopify','Meta Ads','Google Ads','Klaviyo','Stripe'],
        updatedAt:         serverTimestamp(),
      }, { merge: true })
      console.log('Glowify: profile saved to Firestore ✓')
    } catch (err) {
      console.error('Glowify: createUserProfile failed:', err.message)
    }
  },

  getProfile: async (uid) => {
    if (!db) return null
    try {
      const snap = await getDoc(doc(db, 'users', uid))
      return snap.exists() ? { id: snap.id, ...snap.data() } : null
    } catch (err) {
      console.error('Glowify: getProfile failed:', err.message)
      return null
    }
  },

  getData: async (uid, collectionName, limitNum = 100) => {
    if (!db) return []
    try {
      const q = query(
        collection(db, 'users', uid, collectionName),
        orderBy('createdAt', 'desc'),
        limit(limitNum)
      )
      const snap = await getDocs(q)
      const results = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      console.log(`Glowify: loaded ${results.length} from ${collectionName}`)
      return results
    } catch (err) {
      console.error(`Glowify: getData(${collectionName}) failed:`, err.message)
      return []
    }
  },

  seedMockData: async (uid) => {
    if (!db) return
    try {
      console.log('Glowify: seeding mock data...')
      const batch = writeBatch(db)

      for (let i = 0; i < 60; i++) {
        const d = new Date('2024-03-14')
        d.setDate(d.getDate() + i)
        const base = 3200, growth = (i/59)*3600
        const wave = Math.sin(i*0.8)*400
        const noise = (Math.random()-0.5)*500
        const weekendBoost = (d.getDay()===5||d.getDay()===6) ? 700 : 0
        const revenue = Math.max(1800, Math.round(base+growth+wave+noise+weekendBoost))
        batch.set(doc(collection(db,'users',uid,'revenue_snapshots')), {
          date:     d.toISOString().split('T')[0],
          day:      d.toLocaleDateString('en-US',{month:'short',day:'numeric'}),
          revenue,
          orders:   Math.round(revenue/74+Math.random()*8),
          roas:     parseFloat((3.8+Math.random()*1.4).toFixed(2)),
          convRate: parseFloat((0.028+Math.random()*0.012).toFixed(4)),
          createdAt: serverTimestamp(),
        })
      }

      ;[
        {rank:1,name:'Vitamin C Brightening Serum',type:'Serum',units:420,revenue:37800,rating:4.9,margin:68,stock:12,trend:'up',status:'Low Stock'},
        {rank:2,name:'Retinol Night Repair Cream',type:'Moisturiser',units:310,revenue:24800,rating:4.7,margin:71,stock:48,trend:'up',status:'Healthy'},
        {rank:3,name:'SPF 50 Daily Shield',type:'SPF',units:280,revenue:16800,rating:4.6,margin:58,stock:92,trend:'flat',status:'Healthy'},
        {rank:4,name:'Peptide Eye Cream',type:'Eye Care',units:190,revenue:15200,rating:4.8,margin:74,stock:31,trend:'up',status:'Healthy'},
        {rank:5,name:'Hydrating Rose Toner',type:'Toner',units:160,revenue:9600,rating:4.5,margin:61,stock:0,trend:'down',status:'Out of Stock'},
        {rank:6,name:'AHA/BHA Exfoliant',type:'Exfoliant',units:140,revenue:11200,rating:4.6,margin:66,stock:78,trend:'flat',status:'Healthy'},
        {rank:7,name:'Niacinamide Pore Serum',type:'Serum',units:120,revenue:8400,rating:4.4,margin:63,stock:18,trend:'up',status:'Low Stock'},
        {rank:8,name:'Collagen Boost Moisturiser',type:'Moisturiser',units:98,revenue:7840,rating:4.3,margin:69,stock:55,trend:'flat',status:'Healthy'},
      ].forEach(p => batch.set(doc(collection(db,'users',uid,'products')), {...p,createdAt:serverTimestamp()}))

      ;[
        {name:'Abandoned Cart Recovery',type:'Email',trigger:'Cart abandoned 1h',lastRun:'12 min ago',actions:847,active:true,revenue:31200},
        {name:'Low Stock Alert + PO',type:'Inventory',trigger:'Stock < 20 units',lastRun:'2h ago',actions:14,active:true,revenue:0},
        {name:'VIP Tier Auto-Tag',type:'CRM',trigger:'3rd purchase',lastRun:'4h ago',actions:284,active:true,revenue:12800},
        {name:'Underperforming Ad Pause',type:'Paid Ads',trigger:'ROAS < 2.5x for 24h',lastRun:'Yesterday',actions:7,active:true,revenue:4200},
        {name:'Post-Purchase Review Request',type:'Email',trigger:'5 days post-delivery',lastRun:'3h ago',actions:1840,active:true,revenue:0},
        {name:'Win-Back Sequence',type:'Email',trigger:'45 days no purchase',lastRun:'6h ago',actions:810,active:true,revenue:18400},
        {name:'Price Match Alert',type:'Pricing',trigger:'Competitor price drop',lastRun:'1 day ago',actions:23,active:true,revenue:0},
        {name:'New Customer Welcome',type:'Email',trigger:'First purchase',lastRun:'8 min ago',actions:1420,active:true,revenue:7400},
        {name:'Flash Sale Auto-Launch',type:'Marketing',trigger:'Inventory > 200 units',lastRun:'12 days ago',actions:3,active:false,revenue:14800},
        {name:'Upsell After Purchase',type:'Email',trigger:'Post-checkout',lastRun:'1h ago',actions:640,active:true,revenue:9200},
      ].forEach(a => batch.set(doc(collection(db,'users',uid,'automations')), {...a,createdAt:serverTimestamp()}))

      ;[
        {icon:'Zap',title:'Paused underperforming Facebook Ad Set #7',result:'Saved 340 in wasted spend',time:'Today 9:14am',status:'Completed',impact:340},
        {icon:'Mail',title:'Sent win-back campaign to 1,840 lapsed customers',result:'6,200 recovered in 48h',time:'Yesterday 2:00pm',status:'Completed',impact:6200},
        {icon:'Package',title:'Triggered restock PO for Vitamin C Serum',result:'120 units ordered from supplier',time:'Yesterday 10:30am',status:'Completed',impact:0},
        {icon:'TrendingUp',title:'Scaled Google Shopping budget +30%',result:'ROAS at 5.2x within target',time:'May 16',status:'Completed',impact:4200},
        {icon:'AlertCircle',title:'Detected mobile checkout bug on Safari',result:'Flagged for dev team — ticket #1094',time:'May 15',status:'Running',impact:0},
        {icon:'Mail',title:'Launched Flash Sale to VIP segment',result:'41% open rate — 14,800 GMV',time:'May 14',status:'Completed',impact:14800},
        {icon:'Zap',title:'A/B test on PDP hero image started',result:'Variant B winning by 12% CTR',time:'May 12',status:'Running',impact:0},
        {icon:'Package',title:'Auto-repriced 14 SKUs vs competitors',result:'Avg margin improved +2.3%',time:'May 10',status:'Completed',impact:2100},
      ].forEach(a => batch.set(doc(collection(db,'users',uid,'ai_actions')), {...a,createdAt:serverTimestamp()}))

      ;[
        {type:'order',color:'#10B981',text:'Order #8821 — New York, US',amount:'142.00',time:'1 min ago'},
        {type:'order',color:'#10B981',text:'Order #8820 — London, UK',amount:'89.00',time:'3 min ago'},
        {type:'marketing',color:'#6366F1',text:'Flash Sale email sent to 4,200 subscribers',amount:null,time:'8 min ago'},
        {type:'alert',color:'#F59E0B',text:'Stock alert: Retinol Cream below 20 units',amount:null,time:'12 min ago'},
        {type:'order',color:'#10B981',text:'Order #8819 — Toronto, CA',amount:'210.00',time:'14 min ago'},
        {type:'marketing',color:'#6366F1',text:'Facebook Campaign #3 hit daily spend cap',amount:null,time:'22 min ago'},
        {type:'order',color:'#10B981',text:'Order #8818 — Sydney, AU',amount:'67.00',time:'28 min ago'},
        {type:'automation',color:'#8B5CF6',text:'Abandoned cart recovery — 340 recovered',amount:'340.00',time:'35 min ago'},
        {type:'alert',color:'#EF4444',text:'Conversion drop on /collections/skincare',amount:null,time:'41 min ago'},
        {type:'order',color:'#10B981',text:'Order #8817 — Chicago, US',amount:'189.00',time:'47 min ago'},
        {type:'marketing',color:'#10B981',text:'Google Shopping ROAS reached 5.2x',amount:null,time:'1h ago'},
        {type:'order',color:'#10B981',text:'Order #8816 — Berlin, DE',amount:'93.00',time:'1h 10m ago'},
      ].forEach(a => batch.set(doc(collection(db,'users',uid,'activity_feed')), {...a,createdAt:serverTimestamp()}))

      ;[
        {name:'Spring Glow Sale',platform:'Meta',budget:'200/d',spent:'1,840',roas:'3.8x',metric:'2.1% CTR',status:'Active',action:'View'},
        {name:'Retinol Awareness',platform:'Meta',budget:'80/d',spent:'740',roas:'2.9x',metric:'1.4% CTR',status:'Underperforming',action:'Pause'},
        {name:'Google Shopping — Serums',platform:'Google',budget:'150/d',spent:'1,380',roas:'5.6x',metric:'3.8% CTR',status:'Active',action:'Scale'},
        {name:'Google Brand Search',platform:'Google',budget:'60/d',spent:'540',roas:'6.1x',metric:'8.2% CTR',status:'Active',action:'View'},
        {name:'VIP Win-Back Email',platform:'Klaviyo',budget:'—',spent:'—',roas:'—',metric:'44% OR',status:'Sent',action:'Report'},
        {name:'Flash Sale Blast',platform:'Klaviyo',budget:'—',spent:'—',roas:'—',metric:'38% OR',status:'Sent',action:'Report'},
      ].forEach(c => batch.set(doc(collection(db,'users',uid,'campaigns')), {...c,createdAt:serverTimestamp()}))

      ;[
        {type:'WARNING',color:'#F59E0B',bg:'rgba(245,158,11,0.1)',border:'rgba(245,158,11,0.25)',title:'Ad Frequency Too High',desc:'Facebook ad frequency hit 4.8x. Rotate new ad sets within 48h.',dismissed:false},
        {type:'OPPORTUNITY',color:'#6366F1',bg:'rgba(99,102,241,0.1)',border:'rgba(99,102,241,0.25)',title:'Bundle Upsell Untapped',desc:'67% of Vitamin C buyers also view Retinol. A bundle could recover 12K/month.',dismissed:false},
        {type:'TREND',color:'#10B981',bg:'rgba(16,185,129,0.1)',border:'rgba(16,185,129,0.25)',title:'Mobile Revenue Up 28%',desc:'Mobile now drives 61% of orders. Consider mobile-first creatives.',dismissed:false},
      ].forEach(ins => batch.set(doc(collection(db,'users',uid,'ai_insights')), {...ins,createdAt:serverTimestamp()}))

      await batch.commit()
      console.log('Glowify: mock data seeded successfully ✓')
    } catch (err) {
      console.error('Glowify: seedMockData FAILED:', err.message)
    }
  },
}

export default app

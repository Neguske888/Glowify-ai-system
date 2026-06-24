import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app'
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
  Auth,
  User,
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
  Firestore,
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
}

let app: FirebaseApp, auth: Auth, db: Firestore

try {
  app  = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)
  auth = getAuth(app)
  db   = getFirestore(app)
  setPersistence(auth, browserLocalPersistence)
    .then(() => console.log('Glowify Firebase: persistence enabled ✓'))
    .catch(err => console.warn('Glowify Firebase: persistence warning:', err.message))
} catch (err: any) {
  console.error('Glowify Firebase: init FAILED:', err.message)
}

export { auth, db }

const parseAuthError = (code: string): string => {
  const map: Record<string, string> = {
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
  signInWithEmail: async (email: string, password: string) => {
    try {
      if (!auth) throw new Error('Firebase auth not initialized')
      const result = await signInWithEmailAndPassword(auth, email, password)
      return { user: result.user, error: null }
    } catch (err: any) {
      return { user: null, error: parseAuthError(err.code) }
    }
  },

  signUpWithEmail: async (email: string, password: string, displayName?: string, storeName?: string) => {
    try {
      if (!auth) throw new Error('Firebase auth not initialized')
      const result = await createUserWithEmailAndPassword(auth, email, password)
      if (displayName) await updateProfile(result.user, { displayName })
      await firestoreHelpers.createUserProfile(result.user, { displayName, storeName })
      await firestoreHelpers.seedMockData(result.user.uid)
      return { user: result.user, error: null }
    } catch (err: any) {
      return { user: null, error: parseAuthError(err.code) }
    }
  },

  signInWithGoogle: async () => {
    try {
      if (!auth) throw new Error('Firebase auth not initialized')
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const isNew = (result as any)._tokenResponse?.isNewUser
      if (isNew) {
        await firestoreHelpers.createUserProfile(result.user, {
          displayName: result.user.displayName || undefined,
          storeName: 'Glowify Beauty Co.',
        })
        await firestoreHelpers.seedMockData(result.user.uid)
      }
      return { user: result.user, error: null }
    } catch (err: any) {
      return { user: null, error: parseAuthError(err.code) }
    }
  },

  signOut: async () => {
    try {
      await firebaseSignOut(auth)
      return { error: null }
    } catch (err: any) {
      return { error: err.message }
    }
  },

  resetPassword: async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email)
      return { error: null }
    } catch (err: any) {
      return { error: parseAuthError(err.code) }
    }
  },

  onAuthStateChanged: (callback: (user: User | null) => void) => {
    if (!auth) {
      setTimeout(() => callback(null), 0)
      return () => {}
    }
    return onAuthStateChanged(auth, callback)
  },
}

export const firestoreHelpers = {
  profileExists: async (uid: string) => {
    try {
      const snap = await getDoc(doc(db, 'users', uid))
      return snap.exists()
    } catch { return false }
  },

  createUserProfile: async (user: User, extra: { displayName?: string; storeName?: string } = {}) => {
    if (!db) return
    try {
      await setDoc(doc(db, 'users', user.uid), {
        uid:               user.uid,
        email:             user.email,
        displayName:       extra.displayName || user.displayName || user.email?.split('@')[0] || 'User',
        storeName:         extra.storeName || 'My Store',
        plan:              'Enterprise',
        planStatus:        'Active',
        updatedAt:         serverTimestamp(),
      }, { merge: true })
    } catch (err: any) {
      console.error('Glowify: createUserProfile failed:', err.message)
    }
  },

  getProfile: async (uid: string) => {
    if (!db) return null
    try {
      const snap = await getDoc(doc(db, 'users', uid))
      return snap.exists() ? { id: snap.id, ...snap.data() } : null
    } catch (err: any) {
      return null
    }
  },

  getData: async (uid: string, collectionName: string, limitNum: number = 100) => {
    if (!db) return []
    try {
      const q = query(
        collection(db, 'users', uid, collectionName),
        orderBy('createdAt', 'desc'),
        limit(limitNum)
      )
      const snap = await getDocs(q)
      return snap.docs.map(d => ({ id: d.id, ...d.data() }))
    } catch (err: any) {
      return []
    }
  },

  seedMockData: async (uid: string) => {
    if (!db) return
    try {
      const batch = writeBatch(db)
      // Seeding logic... (omitted for brevity in this example but should be fully typed)
      await batch.commit()
    } catch (err: any) {
      console.error('Glowify: seedMockData FAILED:', err.message)
    }
  },
}

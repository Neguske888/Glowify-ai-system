// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  onAuthStateChanged, 
  User, 
  GoogleAuthProvider, 
  signInWithPopup,
  signOut as firebaseSignOut,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  serverTimestamp, 
  collection, 
  query, 
  getDocs, 
  orderBy, 
  limit,
  writeBatch
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCJqT-DKaEyuMGqp-Iyx9XFAjQdimswS90",
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "glowify-ai-system.firebaseapp.com",
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID || "glowify-ai-system",
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "glowify-ai-system.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "507485872156",
  appId:             import.meta.env.VITE_FIREBASE_APP_ID || "1:507485872156:web:fb8782bd039a71a14e3fd9",
  measurementId:     import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-648EKGCVB4"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);

setPersistence(auth, browserLocalPersistence).catch(err => {
  console.error("Firebase persistence failed:", err.message);
});

export const googleProvider = new GoogleAuthProvider();

export const firebaseAuth = {
  signInWithGoogle: async () => {
    if (!auth) throw new Error("Firebase Auth not initialized");
    return signInWithPopup(auth, googleProvider);
  },
  
  signOut: async () => {
    if (!auth) throw new Error("Firebase Auth not initialized");
    return firebaseSignOut(auth);
  },

  onAuthStateChanged: (callback: (user: User | null) => void) => {
    if (!auth) {
      setTimeout(() => callback(null), 0);
      return () => {};
    }
    return onAuthStateChanged(auth, callback);
  },
};

export const firestoreHelpers = {
  profileExists: async (uid: string) => {
    try {
      if (!db) return false;
      const snap = await getDoc(doc(db, 'users', uid));
      return snap.exists();
    } catch { return false; }
  },

  createUserProfile: async (user: User, extra: { displayName?: string; storeName?: string } = {}) => {
    if (!db) return;
    try {
      await setDoc(doc(db, 'users', user.uid), {
        uid:               user.uid,
        email:             user.email,
        displayName:       extra.displayName || user.displayName || user.email?.split('@')[0] || 'User',
        storeName:         extra.storeName || 'My Store',
        plan:              'Enterprise',
        planStatus:        'Active',
        updatedAt:         serverTimestamp(),
      }, { merge: true });
    } catch (err: any) {
      console.error('Glowify: createUserProfile failed:', err.message);
    }
  },

  getProfile: async (uid: string) => {
    if (!db) return null;
    try {
      const snap = await getDoc(doc(db, 'users', uid));
      return snap.exists() ? { id: snap.id, ...snap.data() } : null;
    } catch (err: any) {
      return null;
    }
  },

  getData: async (uid: string, collectionName: string, limitNum: number = 100) => {
    if (!db) return [];
    try {
      const q = query(
        collection(db, 'users', uid, collectionName),
        orderBy('createdAt', 'desc'),
        limit(limitNum)
      );
      const snap = await getDocs(q);
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (err: any) {
      return [];
    }
  },

  seedMockData: async (uid: string) => {
    if (!db) return;
    try {
      const batch = writeBatch(db);
      
      const snapshotsRef = collection(db, 'users', uid, 'revenue_snapshots');
      for (let i = 0; i < 30; i++) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        batch.set(doc(snapshotsRef), {
          date: d.toISOString(),
          revenue: 3800 + (30 - i) * 80 + Math.random() * 600,
          orders: 45 + Math.floor(Math.random() * 20),
          createdAt: serverTimestamp()
        });
      }

      const productsRef = collection(db, 'users', uid, 'products');
      const products = [
        { name: 'Vitamin C Brightening Serum', price: 89, inventory: 42, sales: 840, category: 'Serums', velocity: 18.5 },
        { name: 'Hyaluronic Moisture Surge', price: 65, inventory: 12, sales: 1240, category: 'Moisturizers', velocity: 12.2 },
        { name: 'Retinol Night Treatment', price: 120, inventory: 28, sales: 520, category: 'Treatments', velocity: 22.4 },
        { name: 'Gentle AHA Cleanser', price: 45, inventory: 85, sales: 980, category: 'Cleansers', velocity: 15.8 }
      ];
      products.forEach(p => {
        batch.set(doc(productsRef), { ...p, createdAt: serverTimestamp() });
      });

      const activityRef = collection(db, 'users', uid, 'activity_feed');
      const activities = [
        { type: 'order', text: 'New Order #8824 — Vitamin C Serum', amount: '89.00', color: '#10B981', time: '1m ago' },
        { type: 'order', text: 'New Order #8823 — Hyaluronic Surge x2', amount: '130.00', color: '#10B981', time: '3m ago' },
        { type: 'automation', text: 'Cart Recovered — Retinol Cream', amount: '340.00', color: '#8B4A6B', time: '8m ago' },
        { type: 'alert', text: 'Low Stock: Hyaluronic Moisture Surge (12)', amount: null, color: '#F59E0B', time: '12m ago' },
        { type: 'marketing', text: 'Klaviyo — Win-Back Series sent (4,200)', amount: null, color: '#C9747A', time: '18m ago' }
      ];
      activities.forEach(a => {
        batch.set(doc(activityRef), { ...a, createdAt: serverTimestamp() });
      });

      await batch.commit();
      console.log('Glowify: seedMockData SUCCESS');
    } catch (err: any) {
      console.error('Glowify: seedMockData FAILED:', err.message);
    }
  },
};

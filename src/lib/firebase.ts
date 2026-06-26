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
  updateDoc,
  serverTimestamp,
  collection,
  query,
  getDocs,
  orderBy,
  limit,
  onSnapshot,
  Unsubscribe
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

  // Subscribe to real-time telemetry/logs
  subscribeToLogs: (uid: string, callback: (logs: any[]) => void): Unsubscribe => {
    if (!db) {
      callback([]);
      return () => {};
    }
    
    const q = query(
      collection(db, 'users', uid, 'telemetry'),
      orderBy('timestamp', 'desc'),
      limit(50)
    );

    return onSnapshot(q, (snapshot) => {
      const logs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate?.() || new Date()
      }));
      callback(logs);
    }, (error) => {
      console.error('Error subscribing to logs:', error);
      callback([]);
    });
  },

  // Subscribe to agent states
  subscribeToAgents: (uid: string, callback: (agents: any[]) => void): Unsubscribe => {
    if (!db) {
      callback([]);
      return () => {};
    }
    
    const q = query(collection(db, 'users', uid, 'agents'));

    return onSnapshot(q, (snapshot) => {
      const agents = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(agents);
    }, (error) => {
      console.error('Error subscribing to agents:', error);
      callback([]);
    });
  },

  // Update agent status
  updateAgentStatus: async (uid: string, agentId: string, status: 'active' | 'paused') => {
    if (!db) return;
    try {
      await updateDoc(doc(db, 'users', uid, 'agents', agentId), {
        status,
        updatedAt: serverTimestamp()
      });
    } catch (err) {
      console.error('Error updating agent status:', err);
    }
  },

  // Get integrations from user profile
  getIntegrations: async (uid: string) => {
    if (!db) return null;
    try {
      const snap = await getDoc(doc(db, 'users', uid));
      if (snap.exists()) {
        const data = snap.data();
        return {
          shopifyApiKey: data.shopifyApiKey || '',
          shopifyStoreDomain: data.shopifyStoreDomain || '',
          klaviyoApiKey: data.klaviyoApiKey || '',
          geminiApiKey: data.geminiApiKey || ''
        };
      }
      return null;
    } catch (err) {
      console.error('Error getting integrations:', err);
      return null;
    }
  }
};

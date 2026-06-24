import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

let app
let auth
let analytics

try {
  app = initializeApp(firebaseConfig)
  console.log('Firebase initialized successfully', app)
  auth = getAuth(app)
  analytics = getAnalytics(app)
} catch (err) {
  console.error('Firebase init failed:', err.message)
}

const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({ prompt: 'select_account' })

export { auth, analytics }

export const firebaseAuth = {

  signInWithEmail: async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      return { user: result.user, error: null }
    } catch (err) {
      return { user: null, error: firebaseAuth.parseError(err.code) }
    }
  },

  signUpWithEmail: async (email, password, displayName) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      if (displayName) await updateProfile(result.user, { displayName })
      return { user: result.user, error: null }
    } catch (err) {
      return { user: null, error: firebaseAuth.parseError(err.code) }
    }
  },

  signInWithGoogle: async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      return { user: result.user, error: null }
    } catch (err) {
      return { user: null, error: firebaseAuth.parseError(err.code) }
    }
  },

  signOut: async () => {
    try {
      await signOut(auth)
      return { error: null }
    } catch (err) {
      return { error: err.message }
    }
  },

  resetPassword: async (email) => {
    try {
      await sendPasswordResetEmail(auth, email)
      return { error: null }
    } catch (err) {
      return { error: firebaseAuth.parseError(err.code) }
    }
  },

  onAuthStateChanged: (callback) => {
    if (!auth) { callback(null); return () => {} }
    return onAuthStateChanged(auth, callback)
  },

  parseError: (code) => {
    const errors = {
      'auth/user-not-found': 'No account found with this email address.',
      'auth/wrong-password': 'Incorrect password. Please try again.',
      'auth/invalid-credential': 'Invalid email or password. Please try again.',
      'auth/email-already-in-use': 'An account with this email already exists.',
      'auth/weak-password': 'Password must be at least 6 characters.',
      'auth/invalid-email': 'Please enter a valid email address.',
      'auth/popup-closed-by-user': 'Google sign-in was cancelled.',
      'auth/network-request-failed': 'Network error. Check your connection.',
      'auth/too-many-requests': 'Too many attempts. Please wait a moment.',
      'auth/popup-blocked': 'Popup was blocked. Allow popups for this site.',
    }
    return errors[code] || 'Something went wrong. Please try again.'
  },
}

export default app

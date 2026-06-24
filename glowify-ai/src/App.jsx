import React, { useState, useEffect, useMemo, createContext, useContext } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { io } from 'socket.io-client';

// 1. Firebase Config Setup (Assuming it's available in your environment variables)
const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG || '{}');
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 2. Auth Context with Zero-Loading-State
const AuthContext = createContext({ user: null, loading: true });

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sync check on mount
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {loading ? <div className="fixed inset-0 bg-[#0A0A0F]" /> : children}
    </AuthContext.Provider>
  );
};

// 3. WebSocket Hook
export const useRealTimeMetrics = (user) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!user) return;

    const newSocket = io(process.env.VITE_SOCKET_URL, {
      extraHeaders: {
        'x-store-id': user.uid, // Simplified discriminator
        'Authorization': `Bearer ${user.accessToken}`
      }
    });

    setSocket(newSocket);
    return () => newSocket.close();
  }, [user]);

  return socket;
};

// 4. Main Protected App
const ProtectedDashboard = ({ user }) => {
  useRealTimeMetrics(user);
  return (
    <div className="text-white">
      <h1>Dashboard for {user.email}</h1>
      <button onClick={() => signOut(auth)}>Sign Out</button>
    </div>
  );
};

const App = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null; // Handled by AuthProvider

  return user ? <ProtectedDashboard user={user} /> : <AuthScreen />;
};

// Mock AuthScreen for demonstration of the transition
const AuthScreen = () => <div>Login Screen</div>;

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

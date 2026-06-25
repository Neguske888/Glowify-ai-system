import React, { useState, useEffect } from 'react';
import { Search, Bell, Zap, BarChart3, Users, Home, Bot, Megaphone, Package, Settings as SettingsIcon, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { auth, firestoreHelpers } from './lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

// Internal imports
import { Sidebar } from './components/Sidebar';
import { TechBackground } from './components/CommonUI';
import { OverviewView, AnalyticsView } from './components/DashboardViews';

// New view imports
import { AIAgentsView } from './components/views/AIAgentsView';
import { MarketingView } from './components/views/MarketingView';
import { InventoryView } from './components/views/InventoryView';
import { CustomersView } from './components/views/CustomersView';
import { AutomationsView } from './components/views/AutomationsView';
import { SettingsView } from './components/views/SettingsView';

// Auth imports
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AuthScreen } from './components/AuthScreen';

// ─── Profile Panel ──────────────────────────────────────────────────────────
interface ProfilePanelProps {
  isOpen: boolean;
  onClose: () => void;
  displayName: string;
  storeName: string;
  initials: string;
  photoURL: string | null;
}

const ProfilePanel: React.FC<ProfilePanelProps> = ({ isOpen, onClose, displayName, storeName, initials, photoURL }) => {
  const { user, profile, signOut } = useAuth();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-[400px] bg-[#080608] border-l border-[#1E1E3A] p-6 z-[101] shadow-2xl flex flex-col"
          >
            <div className="flex justify-end mb-4">
              <button onClick={onClose} className="p-2 rounded-xl bg-[#1E1E3A] text-[#A0A0B8]">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex flex-col items-center text-center flex-1">
              <div
                className="w-24 h-24 rounded-3xl overflow-hidden flex items-center justify-center text-3xl font-black text-white shadow-2xl mb-6 border-2 border-[#C9747A]/20"
                style={{ background: 'linear-gradient(135deg, #C9747A, #8B4A6B)' }}
              >
                {photoURL
                  ? <img src={photoURL} alt={displayName} className="w-full h-full object-cover" />
                  : <span>{initials}</span>
                }
              </div>
              <h2 className="text-2xl font-bold text-[#F5EEF0] tracking-tight">
                {displayName}
              </h2>
              <p className="text-sm text-[#6B5560] mt-1">{user?.email}</p>

              <div className="mt-8 grid grid-cols-2 gap-3 w-full">
                <div className="bg-[#0D0D1A] p-4 rounded-2xl border border-[#1E1E3A]">
                  <p className="text-[10px] font-bold text-[#6B5560] uppercase tracking-widest">Account</p>
                  <p className="text-sm font-bold text-[#F5EEF0] mt-1">{profile?.plan || 'Enterprise'}</p>
                </div>
                <div className="bg-[#0D0D1A] p-4 rounded-2xl border border-[#1E1E3A]">
                  <p className="text-[10px] font-bold text-[#6B5560] uppercase tracking-widest">Status</p>
                  <p className="text-sm font-bold text-[#10B981] mt-1">{profile?.planStatus || 'Active'}</p>
                </div>
                {storeName && (
                  <div className="col-span-2 bg-[#0D0D1A] p-4 rounded-2xl border border-[#1E1E3A]">
                    <p className="text-[10px] font-bold text-[#6B5560] uppercase tracking-widest">Store</p>
                    <p className="text-sm font-bold text-[#F5EEF0] mt-1">{storeName}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3 mt-auto pt-6">
              <button
                onClick={async () => { onClose(); await signOut(); }}
                className="w-full py-4 flex items-center justify-center gap-2 bg-[#EF4444]/10 hover:bg-[#EF4444]/20 border border-[#EF4444]/20 text-[#F87171] font-bold rounded-2xl transition-all active:scale-[0.98]"
              >
                Sign Out
              </button>
              <button
                onClick={onClose}
                className="w-full py-4 bg-[#1E1E3A] hover:bg-[#2A2A48] text-[#F5EEF0] font-bold rounded-2xl transition-all active:scale-[0.98]"
              >
                Close
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ─── App Shell (inner, requires AuthContext) ─────────────────────────────────
const AppShell: React.FC = () => {
  const { user, profile, loading } = useAuth();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<{displayName?: string; storeName?: string; photoURL?: string} | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [pageLoading, setPageLoading] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Wire Firebase auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const profile = await firestoreHelpers.getProfile(user.uid);
        setUserProfile(profile as any);
      }
    });
    return unsub;
  }, []);

  // Page loading shimmer on tab change
  useEffect(() => {
    setPageLoading(true);
    const timer = setTimeout(() => setPageLoading(false), 600);
    return () => clearTimeout(timer);
  }, [activeTab]);

  // Compute display values
  const displayName = userProfile?.displayName || currentUser?.displayName || currentUser?.email?.split('@')[0] || 'User';
  const storeName = (userProfile as any)?.storeName || 'My Store';
  const initials = displayName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
  const photoURL = currentUser?.photoURL || null;

  // ── Firebase loading spinner ────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-[#080608] flex items-center justify-center">
        <TechBackground />
        <div className="relative z-10 flex flex-col items-center gap-4">
          <motion.div 
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            style={{
              width: '64px', height: '64px', borderRadius: '20px',
              background: 'linear-gradient(135deg, #C9747A, #8B4A6B)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 32px rgba(201,116,122,0.4)',
            }}
          >
            <Zap size={32} className="text-white fill-white" />
          </motion.div>
          <div className="w-6 h-6 border-2 border-[#1E1E3A] border-t-[#C9747A] rounded-full animate-spin" />
          <p className="text-sm text-[#6B5560] font-bold tracking-wider uppercase">Initializing</p>
        </div>
      </div>
    );
  }

  // ── Auth gate ───────────────────────────────────────────────────────────
  if (!user) {
    return <AuthScreen onSuccess={() => {}} />;
  }

  // ── Dashboard ───────────────────────────────────────────────────────────
  const renderView = () => {
    switch (activeTab) {
      case 'overview':    return <OverviewView loading={pageLoading} />;
      case 'analytics':   return <AnalyticsView loading={pageLoading} />;
      case 'ai':          return <AIAgentsView />;
      case 'marketing':   return <MarketingView />;
      case 'products':    return <InventoryView />;
      case 'customers':   return <CustomersView />;
      case 'automations': return <AutomationsView />;
      case 'settings':    return <SettingsView />;
      default:            return <OverviewView loading={false} />;
    }
  };

  return (
    <div className="glw-app-container bg-[#080608] min-h-screen text-[#F5EEF0] flex overflow-hidden font-sans selection:bg-[#C9747A]/30">
      <TechBackground />
      
      {/* Sidebar — overlay on mobile, fixed on desktop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[150] lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.div 
        className={`
          fixed lg:relative top-0 left-0 h-full z-[151]
          transition-all duration-300 ease-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <Sidebar
          activeTab={activeTab}
          setActiveTab={(tab) => { setActiveTab(tab); setSidebarOpen(false); }}
        />
      </motion.div>

      <main className="flex-1 flex flex-col h-screen overflow-hidden relative z-10">
        {/* Header */}
        <header className="h-16 lg:h-20 border-b border-[#1E1E3A] bg-[#080608]/90 backdrop-blur-xl flex items-center justify-between px-4 lg:px-8 shrink-0">
          <div className="flex items-center gap-3 lg:gap-6 flex-1">
            <button
              className="lg:hidden w-10 h-10 rounded-xl bg-[#0D0D1A] border border-[#1E1E3A] flex items-center justify-center text-[#A0A0B8] active:scale-90 transition-transform"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>
            
            <div className="hidden md:flex items-center gap-3 bg-[#0D0D1A] border border-[#1E1E3A] rounded-xl px-4 py-2 w-full max-w-md focus-within:border-[#C9747A]/50 transition-all">
              <Search size={16} className="text-[#3D3D55]" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none outline-none text-sm text-[#F5EEF0] w-full placeholder:text-[#3D3D55]"
              />
            </div>
            
            {/* Mobile Brand Label */}
            <div className="lg:hidden font-black text-lg tracking-tighter text-[#F5EEF0]">
              GLOWIFY<span className="text-[#C9747A]">.</span>
            </div>
          </div>

          <div className="flex items-center gap-2 lg:gap-4">
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="w-10 h-10 lg:w-11 lg:h-11 rounded-xl bg-[#0D0D1A] border border-[#1E1E3A] flex items-center justify-center text-[#A0A0B8] hover:text-[#C9747A] active:scale-90 transition-all relative"
              >
                <Bell size={18} />
                <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#EF4444] rounded-full border-2 border-[#0D0D1A]" />
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      onClick={() => setShowNotifications(false)}
                      className="fixed inset-0 z-[190]"
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 top-12 lg:top-14 w-[calc(100vw-32px)] sm:w-[360px] bg-[#0D0D1A] border border-[#1E1E3A] rounded-2xl shadow-2xl z-[191] overflow-hidden"
                    >
                      <div className="flex items-center justify-between px-5 py-4 border-b border-[#1E1E3A]">
                        <span className="text-sm font-bold text-[#F1F1F8]">Notifications</span>
                        <span className="text-[10px] font-bold text-[#C9747A] uppercase tracking-widest cursor-pointer">Clear all</span>
                      </div>
                      <div className="divide-y divide-[#1E1E3A] max-h-[400px] overflow-y-auto custom-scrollbar">
                        {[
                          { icon: '🚨', title: 'Low Stock', desc: 'Hyaluronic Serum — 12 units left', time: '2m' },
                          { icon: '🤖', title: 'AI Ready', desc: 'Sentinel found 3 optimizations', time: '15m' },
                          { icon: '📦', title: 'New Order', desc: '#8824 — Vitamin C Serum', time: '22m' },
                          { icon: '⚡', title: 'Recovered', desc: 'Abandoned cart — $340 saved', time: '1h' },
                        ].map((n, i) => (
                          <div key={i} className="flex items-start gap-3 px-5 py-4 hover:bg-white/5 active:bg-white/10 transition-colors">
                            <span className="text-lg shrink-0">{n.icon}</span>
                            <div className="flex-1 min-w-0">
                              <p className="text-[13px] font-bold text-[#F1F1F8]">{n.title}</p>
                              <p className="text-[11px] text-[#6B6B88] truncate">{n.desc}</p>
                            </div>
                            <span className="text-[10px] text-[#3D3D55] font-bold">{n.time}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Profile trigger */}
            <div onClick={() => setShowProfile(true)} className="flex items-center gap-3 pl-1 lg:pl-2 cursor-pointer group active:scale-95 transition-transform">
              <div className="text-right hidden sm:block">
                <p className="text-[13px] font-bold text-[#F5EEF0] group-hover:text-[#C9747A] transition-colors">
                  {displayName}
                </p>
                <p className="text-[11px] text-[#6B5560] font-medium">
                  {storeName}
                </p>
              </div>
              <div
                className="w-10 h-10 lg:w-11 lg:h-11 rounded-xl overflow-hidden flex items-center justify-center font-black text-white text-xs lg:text-sm shadow-xl border border-white/10"
                style={{ background: 'linear-gradient(135deg, #C9747A, #8B4A6B)' }}
              >
                {photoURL
                  ? <img src={photoURL} alt={displayName} className="w-full h-full object-cover" />
                  : <span>{initials}</span>
                }
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar">
          <div className="max-w-[1600px] mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 lg:mb-10">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="flex items-center gap-3 mb-2 lg:mb-3">
                  <span className="px-2 py-0.5 rounded-md bg-[#C9747A]/10 text-[#C9747A] text-[9px] font-black uppercase tracking-widest border border-[#C9747A]/20">
                    Live
                  </span>
                  <span className="text-[10px] font-bold text-[#6B5560]">Synced 2m ago</span>
                </div>
                <h1 className="text-3xl lg:text-4xl font-black text-[#F5EEF0] tracking-tight">
                  {activeTab === 'settings'
                    ? 'Settings'
                    : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                </h1>
              </motion.div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                {renderView()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>

      <ProfilePanel 
        isOpen={showProfile} 
        onClose={() => setShowProfile(false)}
        displayName={displayName}
        storeName={storeName}
        initials={initials}
        photoURL={photoURL}
      />
    </div>
  );
};

// ─── Root App (wraps everything in AuthProvider) ─────────────────────────────
const App: React.FC = () => (
  <AuthProvider>
    <AppShell />
  </AuthProvider>
);

export default App;

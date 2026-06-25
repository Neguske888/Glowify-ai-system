import React, { useState, useEffect } from 'react';
import { Search, Bell, Zap, BarChart3, Users, Home, Bot, Megaphone, Package, Settings as SettingsIcon, Menu } from 'lucide-react';
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

  const handleSignOut = async () => {
    onClose();
    await signOut();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed top-0 right-0 h-full w-full max-w-[400px] bg-[#080608] border-l border-[#231820] p-8 z-[101] shadow-2xl flex flex-col"
          >
            <div className="flex flex-col items-center text-center mt-12 flex-1">
              <div
                className="w-24 h-24 rounded-3xl overflow-hidden flex items-center justify-center text-3xl font-black text-white shadow-2xl mb-6"
                style={{ background: 'linear-gradient(135deg, #C9747A, #8B4A6B)' }}
              >
                {photoURL
                  ? <img src={photoURL} alt={displayName} className="w-full h-full object-cover" />
                  : <span>{initials}</span>
                }
              </div>
              <h2 className="text-2xl font-bold text-[#F5EEF0]">
                {displayName}
              </h2>
              <p className="text-sm text-[#6B5560] mt-1">{user?.email}</p>

              <div className="mt-8 grid grid-cols-2 gap-4 w-full">
                <div className="bg-[#100D10] p-4 rounded-2xl border border-[#231820]">
                  <p className="text-[10px] font-bold text-[#6B5560] uppercase">Account</p>
                  <p className="text-sm font-bold text-[#F5EEF0] mt-1">{profile?.plan || 'Enterprise'}</p>
                </div>
                <div className="bg-[#100D10] p-4 rounded-2xl border border-[#231820]">
                  <p className="text-[10px] font-bold text-[#6B5560] uppercase">Status</p>
                  <p className="text-sm font-bold text-[#10B981] mt-1">{profile?.planStatus || 'Active'}</p>
                </div>
                {storeName && (
                  <div className="col-span-2 bg-[#100D10] p-4 rounded-2xl border border-[#231820]">
                    <p className="text-[10px] font-bold text-[#6B5560] uppercase">Store</p>
                    <p className="text-sm font-bold text-[#F5EEF0] mt-1">{storeName}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2 mt-6">
              <button
                onClick={handleSignOut}
                className="w-full py-4 flex items-center justify-center gap-2 bg-[#EF4444]/10 hover:bg-[#EF4444]/20 border border-[#EF4444]/20 text-[#F87171] font-bold rounded-2xl transition-all"
              >
                Sign Out
              </button>
              <button
                onClick={onClose}
                className="w-full py-4 bg-[#231820] hover:bg-[#3A2530] text-[#F5EEF0] font-bold rounded-2xl transition-all"
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
  const { user, profile, loading, signOut } = useAuth();
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
    const timer = setTimeout(() => setPageLoading(false), 800);
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
          <div style={{
            width: '52px', height: '52px', borderRadius: '16px',
            background: 'linear-gradient(135deg, #C9747A, #8B4A6B)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 24px rgba(201,116,122,0.35)',
          }}>
            <Zap size={26} className="text-white fill-white" />
          </div>
          <div className="w-5 h-5 border-2 border-[#231820] border-t-[#C9747A] rounded-full animate-spin" />
          <p className="text-xs text-[#6B5560] font-medium">Loading Glowify AI...</p>
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

  const topTabs = [
    { id: 'overview',    icon: Home,        label: 'Command' },
    { id: 'ai',          icon: Bot,         label: 'AI Agents' },
    { id: 'analytics',   icon: BarChart3,   label: 'Analytics' },
    { id: 'marketing',   icon: Megaphone,   label: 'Marketing' },
    { id: 'products',    icon: Package,     label: 'Inventory' },
    { id: 'customers',   icon: Users,       label: 'Customers' },
    { id: 'automations', icon: Zap,         label: 'Automations' },
    { id: 'settings',    icon: SettingsIcon, label: 'Settings' },
  ];

  return (
    <div className="glw-app-container bg-[#080608] min-h-screen text-[#F5EEF0] flex overflow-hidden">
      <TechBackground />
      
      {/* Sidebar — always visible on desktop, overlay on mobile */}
      <>
        {/* Mobile overlay backdrop */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/70 z-[30] lg:hidden"
            />
          )}
        </AnimatePresence>

        {/* Sidebar itself */}
        <div className={`
          fixed lg:relative top-0 left-0 h-full z-[31]
          transition-transform duration-250
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <Sidebar
            activeTab={activeTab}
            setActiveTab={(tab) => { setActiveTab(tab); setSidebarOpen(false); }}
          />
        </div>
      </>

      <main className="flex-1 flex flex-col h-screen overflow-hidden relative z-10">
        {/* Header */}
        <header className="h-20 border-b border-[#231820] bg-[#080608]/85 backdrop-blur-md flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-6 flex-1">
            {/* Mobile hamburger menu */}
            <button
              className="lg:hidden w-10 h-10 rounded-xl border border-[#1E1E3A] flex items-center justify-center text-[#A0A0B8] hover:text-white mr-2 shrink-0"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>
            
            <div className="flex items-center gap-3 bg-[#0C0A0C] border border-[#231820] rounded-xl px-4 py-2.5 w-full max-w-md focus-within:border-[#C9747A] transition-all">
              <Search size={18} className="text-[#3D2B32]" />
              <input
                type="text"
                placeholder="Search data, agents, or settings..."
                className="bg-transparent border-none outline-none text-sm text-[#F5EEF0] w-full placeholder:text-[#3D2B32]"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="w-11 h-11 rounded-xl bg-[#0D0D1A] border border-[#1E1E3A] flex items-center justify-center text-[#A0A0B8] hover:text-[#6366F1] hover:border-[#6366F1] transition-all relative"
              >
                <Bell size={20} />
                <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#EF4444] rounded-full border-2 border-[#0D0D1A]" />
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      onClick={() => setShowNotifications(false)}
                      className="fixed inset-0 z-[90]"
                    />
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-14 w-[340px] bg-[#0D0D1A] border border-[#1E1E3A] rounded-2xl shadow-2xl z-[91] overflow-hidden"
                    >
                      <div className="flex items-center justify-between px-5 py-4 border-b border-[#1E1E3A]">
                        <span className="text-[13px] font-bold text-[#F1F1F8]">Notifications</span>
                        <span className="text-[10px] font-bold text-[#6366F1] cursor-pointer hover:underline">Clear all</span>
                      </div>
                      <div className="divide-y divide-[#1E1E3A] max-h-[360px] overflow-y-auto">
                        {[
                          { icon: '🚨', title: 'Low Stock Alert', desc: 'Hyaluronic Moisture Surge — 12 units left', time: '2m ago', color: '#EF4444' },
                          { icon: '🤖', title: 'AI Analysis Ready', desc: 'Inventory-Sentinel generated 3 recommendations', time: '15m ago', color: '#6366F1' },
                          { icon: '📦', title: 'New Order #8824', desc: 'Vitamin C Brightening Serum — $89.00', time: '22m ago', color: '#10B981' },
                          { icon: '⚡', title: 'Cart Recovered', desc: 'Automation recovered $340 abandoned cart', time: '1h ago', color: '#8B5CF6' },
                          { icon: '📧', title: 'Campaign Sent', desc: 'Win-Back Series — 4,200 recipients', time: '2h ago', color: '#3B82F6' },
                        ].map((n, i) => (
                          <div key={i} className="flex items-start gap-3 px-5 py-3.5 hover:bg-white/5 cursor-pointer transition-colors">
                            <span className="text-lg mt-0.5">{n.icon}</span>
                            <div className="flex-1 min-w-0">
                              <p className="text-[12px] font-bold text-[#F1F1F8]">{n.title}</p>
                              <p className="text-[11px] text-[#6B6B88] truncate">{n.desc}</p>
                            </div>
                            <span className="text-[10px] text-[#3D3D55] whitespace-nowrap">{n.time}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Profile button */}
            <div onClick={() => setShowProfile(true)} className="flex items-center gap-3 pl-2 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <p className="text-[13px] font-bold text-[#F5EEF0] group-hover:text-[#C9747A] transition-colors">
                  {displayName}
                </p>
                <p className="text-[11px] text-[#6B5560]">
                  {storeName}
                </p>
              </div>
              <div
                className="w-11 h-11 rounded-xl overflow-hidden flex items-center justify-center font-black text-white text-sm shadow-xl group-hover:scale-105 transition-all"
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
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-[1600px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2.5 py-1 rounded-md bg-[#C9747A]/10 text-[#C9747A] text-[10px] font-black uppercase tracking-widest border border-[#C9747A]/20">
                    System Live
                  </span>
                  <span className="text-[11px] font-bold text-[#6B5560]">Last synced: 2m ago</span>
                </div>
                <h1 className="text-4xl font-black text-[#F5EEF0] tracking-tight">
                  {activeTab === 'settings'
                    ? 'Settings'
                    : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                </h1>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
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

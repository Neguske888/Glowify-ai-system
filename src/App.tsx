// src/App.tsx
import React, { useState, useEffect } from 'react';
import { Search, Bell, Zap, Package, Menu, X, ChevronRight, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TechBackground } from './components/CommonUI';
import { Sidebar } from './components/Sidebar';
import { OverviewView, AnalyticsView } from './components/DashboardViews';
import { AIAgentsView } from './components/views/AIAgentsView';
import { MarketingView } from './components/views/MarketingView';
import { InventoryView } from './components/views/InventoryView';
import { CustomersView } from './components/views/CustomersView';
import { AutomationsView } from './components/views/AutomationsView';
import { ActivityCenter } from './components/ActivityCenter';
import { SettingsView } from './components/views/SettingsView';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DashboardProvider } from './contexts/DashboardContext';
import { AuthScreen } from './components/AuthScreen';
import { CommandPalette } from './components/CommandPalette';
import { NotificationCenter } from './components/NotificationCenter';


// ─── Profile Panel ──────────────────────────────────────────────────────────
const ProfilePanel: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { profile, signOut } = useAuth();
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]" />
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed top-0 right-0 h-full w-full max-w-[360px] bg-[#080608] border-l border-[#1E1E3A] z-[201] shadow-2xl p-8">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-xl font-black text-white tracking-tight">Account</h3>
              <button onClick={onClose} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#6B5560] hover:text-white transition-colors"><X size={20} /></button>
            </div>
            <div className="flex flex-col items-center text-center mb-10">
              <div className="w-24 h-24 rounded-[32px] bg-gradient-to-br from-[#C9747A] to-[#8B4A6B] p-1 mb-4 shadow-xl shadow-[#C9747A]/20">
                <div className="w-full h-full rounded-[28px] bg-[#080608] flex items-center justify-center text-3xl font-black text-white">{profile?.displayName?.[0] || 'U'}</div>
              </div>
              <h4 className="text-xl font-black text-white mb-1">{profile?.displayName || 'User'}</h4>
              <p className="text-sm font-bold text-[#6B5560] uppercase tracking-widest">{profile?.storeName || 'My Store'}</p>
            </div>
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5"><p className="text-[10px] font-black text-[#6B5560] uppercase tracking-widest mb-1">Plan</p><p className="text-sm font-bold text-white">{profile?.plan || 'Enterprise'}</p></div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5"><p className="text-[10px] font-black text-[#6B5560] uppercase tracking-widest mb-1">Status</p><p className="text-sm font-bold text-[#10B981] flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#10B981]" />{profile?.planStatus || 'Active'}</p></div>
            </div>
            <button onClick={signOut} className="w-full mt-10 py-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-sm font-black hover:bg-rose-500 hover:text-white transition-all">Sign Out</button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ─── App Shell ──────────────────────────────────────────────────────────────
const AppShell: React.FC = () => {
  const { user, profile, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState(false);

  if (authLoading) {
    return (
      <div className="h-screen w-screen bg-[#080608] flex items-center justify-center">
        <TechBackground />
        <div className="relative z-10 flex flex-col items-center gap-4">
          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="w-16 h-16 rounded-3xl bg-gradient-to-br from-[#C9747A] to-[#8B4A6B] flex items-center justify-center shadow-2xl shadow-[#C9747A]/20">
            <Zap size={32} className="text-white fill-white" />
          </motion.div>
          <div className="w-6 h-6 border-2 border-[#1E1E3A] border-t-[#C9747A] rounded-full animate-spin" />
          <p className="text-[10px] text-[#6B5560] font-black uppercase tracking-widest">Glowify OS Initializing</p>
        </div>
      </div>
    );
  }

  if (!user) return <AuthScreen />;

  const renderView = () => {
    switch (activeTab) {
      case 'overview': return <OverviewView loading={authLoading} onNavigate={setActiveTab} />;
      case 'analytics': return <AnalyticsView loading={authLoading} onNavigate={setActiveTab} />;
      case 'marketing': return <MarketingView onNavigate={setActiveTab} />;
      case 'products': return <InventoryView onNavigate={setActiveTab} />;
      case 'customers': return <CustomersView />;
      case 'automations': return <AutomationsView />;
      case 'activity': return <ActivityCenter />;
      case 'ai': return <AIAgentsView />;
      case 'settings': return <SettingsView />;
      default: return <OverviewView loading={authLoading} onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#080608] text-[#F1F1F8] overflow-hidden font-sans selection:bg-[#C9747A]/30">
      <TechBackground />
      <div className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:relative z-[150] transition-transform duration-300 ease-out`}><Sidebar activeTab={activeTab} setActiveTab={(tab) => { setActiveTab(tab); setIsSidebarOpen(false); }} /></div>
      <AnimatePresence>{isSidebarOpen && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[140] lg:hidden" />}</AnimatePresence>
      <main className="flex-1 flex flex-col min-w-0 relative">
        <CommandPalette isOpen={false} onClose={() => {}} onNavigate={setActiveTab} />
        <header className="h-20 lg:h-24 border-b border-[#1E1E3A] flex items-center justify-between px-4 lg:px-10 bg-[#080608]/80 backdrop-blur-xl sticky top-0 z-[100]">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#6B5560]"><Menu size={20} /></button>
            <div className="hidden sm:block">
              <h1 className="text-xl lg:text-2xl font-black text-white tracking-tight flex items-center gap-3">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}<ChevronRight size={16} className="text-[#3D3D55]" /><span className="text-[#6B6B88] text-sm lg:text-base font-bold">{profile?.storeName || 'My Store'}</span></h1>
            </div>
          </div>
          <div className="flex items-center gap-2 lg:gap-4">
            <div className="relative">
              <button onClick={() => setIsNotificationCenterOpen(true)} className="w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-[#6B6B88] hover:text-[#C9747A] hover:bg-[#C9747A]/10 transition-all relative group"><Bell size={20} className="group-active:scale-90 transition-transform" /><span className="absolute top-3 right-3 w-2 h-2 bg-[#C9747A] rounded-full border-2 border-[#080608]" /></button>
            </div>
            <button onClick={() => setIsProfileOpen(true)} className="flex items-center gap-3 pl-1 pr-1 lg:pr-4 py-1 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all group">
              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-xl bg-gradient-to-br from-[#C9747A] to-[#8B4A6B] flex items-center justify-center text-sm font-black text-white shadow-lg group-hover:scale-105 transition-transform">{profile?.displayName?.[0] || 'U'}</div>
              <div className="hidden lg:block text-left"><p className="text-xs font-black text-white leading-none">{profile?.displayName || 'User'}</p><p className="text-[10px] font-bold text-[#6B5560] mt-1 uppercase tracking-wider">{profile?.plan || 'Enterprise'}</p></div>
            </button>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 lg:p-10">
          <div className="max-w-[1400px] mx-auto">{renderView()}</div>
        </div>
      </main>
      <ProfilePanel isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
      <NotificationCenter isOpen={isNotificationCenterOpen} onClose={() => setIsNotificationCenterOpen(false)} />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <DashboardProvider>
        <AppShell />
      </DashboardProvider>
    </AuthProvider>
  );
}

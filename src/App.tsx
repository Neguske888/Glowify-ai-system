import React, { useState, useEffect } from 'react';
import { Search, Bell, Calendar, Zap, TrendingUp, BarChart3, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Internal imports
import { Sidebar } from './components/Sidebar';
import { TechBackground } from './components/CommonUI';
import { OverviewView, AnalyticsView } from './components/DashboardViews';

const ProfilePanel: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => (
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
          className="fixed top-0 right-0 h-full w-full max-w-[400px] bg-[#0D0D1A] border-l border-[#1E1E3A] p-8 z-[101] shadow-2xl"
        >
          <div className="flex flex-col items-center text-center mt-12">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center text-3xl font-black text-white shadow-2xl mb-6">
              AR
            </div>
            <h2 className="text-2xl font-bold text-[#F1F1F8]">Alex Riviera</h2>
            <p className="text-sm text-[#6B6B88] mt-1">Chief Executive Officer</p>
            <div className="mt-8 grid grid-cols-2 gap-4 w-full">
              <div className="bg-[#0F0F1E] p-4 rounded-2xl border border-[#1E1E3A]">
                <p className="text-[10px] font-bold text-[#6B6B88] uppercase">Account</p>
                <p className="text-sm font-bold text-white mt-1">Enterprise</p>
              </div>
              <div className="bg-[#0F0F1E] p-4 rounded-2xl border border-[#1E1E3A]">
                <p className="text-[10px] font-bold text-[#6B6B88] uppercase">Status</p>
                <p className="text-sm font-bold text-[#10B981] mt-1">Verified</p>
              </div>
            </div>
          </div>
          <div className="mt-auto absolute bottom-8 left-8 right-8">
            <button onClick={onClose} className="w-full py-4 bg-[#1E1E3A] hover:bg-[#2A2A48] text-[#F1F1F8] font-bold rounded-2xl transition-all">
              Close Settings
            </button>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const renderView = () => {
    switch (activeTab) {
      case 'overview': return <OverviewView loading={loading} />;
      case 'analytics': return <AnalyticsView loading={loading} />;
      default: return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <div className="w-16 h-16 bg-[#1E1E3A] rounded-2xl flex items-center justify-center mb-4">
            <Zap size={32} className="text-[#6B6B88]" />
          </div>
          <h2 className="text-xl font-bold text-white">Section Under Construction</h2>
          <p className="text-sm text-[#6B6B88] mt-2">We're building something amazing here. Stay tuned!</p>
        </div>
      );
    }
  };

  return (
    <div className="glw-app-container bg-[#07070F] min-h-screen text-[#F1F1F8] flex overflow-hidden">
      <TechBackground />
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={() => console.log('Logout')} />

      <main className="flex-1 flex flex-col h-screen overflow-hidden relative z-10">
        <header className="h-20 border-b border-[#1E1E3A] bg-[#07070F]/80 backdrop-blur-md flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-6 flex-1">
            <div className="flex items-center gap-3 bg-[#0D0D1A] border border-[#1E1E3A] rounded-xl px-4 py-2.5 w-full max-w-md focus-within:border-[#6366F1] transition-all">
              <Search size={18} className="text-[#3D3D55]" />
              <input type="text" placeholder="Search data, agents, or settings..." className="bg-transparent border-none outline-none text-sm text-[#F1F1F8] w-full placeholder:text-[#3D3D55]" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="w-11 h-11 rounded-xl bg-[#0D0D1A] border border-[#1E1E3A] flex items-center justify-center text-[#A0A0B8] hover:text-[#6366F1] hover:border-[#6366F1] transition-all relative">
              <Bell size={20} />
              <div className="absolute top-3 right-3 w-2 h-2 bg-[#EF4444] rounded-full border-2 border-[#0D0D1A]" />
            </button>
            <div onClick={() => setShowProfile(true)} className="flex items-center gap-3 pl-2 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <p className="text-[13px] font-bold text-[#F1F1F8] group-hover:text-[#6366F1] transition-colors">Alex Riviera</p>
                <p className="text-[11px] text-[#6B6B88]">Chief Executive Officer</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center font-black text-white text-sm shadow-xl group-hover:scale-105 transition-all">
                AR
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-[1600px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2.5 py-1 rounded-md bg-[#10B981]/10 text-[#10B981] text-[10px] font-black uppercase tracking-widest border border-[#10B981]/20">System Live</span>
                  <span className="text-[11px] font-bold text-[#6B6B88]">Last synced: 2m ago</span>
                </div>
                <h1 className="text-4xl font-black text-white tracking-tight">
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                </h1>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-[#0D0D1A] border border-[#1E1E3A] rounded-xl p-1.5 flex gap-1">
                  {[
                    {id: 'overview', icon: TrendingUp, label: 'Overview'},
                    {id: 'analytics', icon: BarChart3, label: 'Analytics'},
                    {id: 'customers', icon: Users, label: 'Customers'},
                  ].map(tab => (
                    <button 
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === tab.id ? 'bg-[#1E1E3A] text-white shadow-lg' : 'text-[#6B6B88] hover:text-[#A0A0B8]'}`}
                    >
                      <tab.icon size={14} />
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {renderView()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>

      <ProfilePanel isOpen={showProfile} onClose={() => setShowProfile(false)} />
    </div>
  );
};

export default App;

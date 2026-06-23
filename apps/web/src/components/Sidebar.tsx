// src/components/Sidebar.tsx
import React from 'react';
import { Home, Bot, BarChart2, Megaphone, Package, Users, Zap, Settings, LogOut, LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, active, onClick }) => (
  <motion.div 
    whileHover={{ x: 4 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 group relative ${
      active 
        ? 'bg-gradient-to-r from-[#6366F1]/15 to-transparent text-white' 
        : 'text-[#6B6B88] hover:text-[#A0A0B8] hover:bg-white/5'
    }`}
  >
    <Icon size={20} className={active ? 'text-[#6366F1]' : 'group-hover:text-[#A0A0B8]'} />
    <span className={`text-[13px] font-bold tracking-tight ${active ? 'text-white' : ''}`}>{label}</span>
    
    {active && (
      <>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#6366F1] rounded-r-full shadow-[0_0_12px_rgba(99,102,241,0.6)]" />
        <motion.div 
          layoutId="sidebar-active"
          className="absolute inset-0 bg-gradient-to-r from-[#6366F1]/10 to-transparent rounded-xl -z-10"
        />
      </>
    )}
  </motion.div>
);

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onLogout }) => {
  const menuItems = [
    { id: 'overview', icon: Home, label: 'Command Center' },
    { id: 'ai', icon: Bot, label: 'AI Agents' },
    { id: 'analytics', icon: BarChart2, label: 'Performance' },
    { id: 'marketing', icon: Megaphone, label: 'Marketing' },
    { id: 'products', icon: Package, label: 'Inventory' },
    { id: 'customers', icon: Users, label: 'Customers' },
    { id: 'automations', icon: Zap, label: 'Automations' },
  ];

  return (
    <aside className="w-[280px] h-screen bg-[#07070F] border-r border-[#1E1E3A] flex flex-col shrink-0 relative z-20">
      <div className="p-8 mb-4">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.3)] group-hover:scale-110 transition-transform duration-300">
            <Zap size={22} className="text-white fill-white" />
          </div>
          <div>
            <span className="text-xl font-black tracking-tighter text-white block leading-none">GLOWIFY<span className="text-[#6366F1]">AI</span></span>
            <span className="text-[9px] font-black text-[#6B6B88] tracking-[0.2em] uppercase mt-1 block">OS v2.4.0</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
        <p className="px-4 text-[10px] font-black text-[#3D3D55] uppercase tracking-[0.2em] mb-4 mt-2">Main Menu</p>
        {menuItems.map(item => (
          <SidebarItem 
            key={item.id}
            {...item}
            active={activeTab === item.id}
            onClick={() => setActiveTab(item.id)}
          />
        ))}
      </nav>

      <div className="p-6 mt-auto">
        <div className="bg-[#0D0D1A] border border-[#1E1E3A] rounded-2xl p-4 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg bg-[#10B981]/10 flex items-center justify-center">
              <TrendingUp size={16} className="text-[#10B981]" />
            </div>
            <span className="text-[11px] font-bold text-white">Efficiency +24%</span>
          </div>
          <p className="text-[10px] text-[#6B6B88] leading-relaxed">AI agents have automated 14 tasks in the last 24 hours.</p>
        </div>
        
        <div className="space-y-1">
          <SidebarItem icon={Settings} label="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
          <SidebarItem icon={LogOut} label="Logout" onClick={onLogout} />
        </div>
      </div>
    </aside>
  );
};

const TrendingUp: React.FC<{size: number, className?: string}> = ({size, className}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
);

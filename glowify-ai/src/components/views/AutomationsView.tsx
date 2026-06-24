import React from 'react';
import { Zap, Package, TrendingUp, ShoppingCart, Star, Search, Play, Pause, MoreVertical, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { MetricCard } from '../MetricCard';

interface Automation {
  id: string;
  name: string;
  description: string;
  category: 'inventory' | 'pricing' | 'marketing' | 'customer';
  status: 'active' | 'paused' | 'draft';
  trigger: string;
  lastFired: string;
  actionsTaken: number;
  revenueImpact: number;
  icon: any;
}

const AUTOMATIONS: Automation[] = [
  {
    id: 'auto_1',
    name: 'Stockout Prevention',
    description: 'Monitors inventory velocity and auto-generates purchase orders when stock drops below reorder threshold.',
    category: 'inventory',
    status: 'active',
    trigger: 'Stock < reorder point',
    lastFired: '2 hours ago',
    actionsTaken: 847,
    revenueImpact: 28400,
    icon: Package,
  },
  {
    id: 'auto_2',
    name: 'Dynamic Pricing Engine',
    description: 'Adjusts product prices based on competitor analysis, demand signals, and margin targets.',
    category: 'pricing',
    status: 'active',
    trigger: 'Competitor price change detected',
    lastFired: '45 mins ago',
    actionsTaken: 312,
    revenueImpact: 14200,
    icon: TrendingUp,
  },
  {
    id: 'auto_3',
    name: 'Cart Recovery Flow',
    description: 'Sends personalised email sequences to customers who abandoned checkout within the last 2 hours.',
    category: 'marketing',
    status: 'active',
    trigger: 'Cart abandoned > 2 hours',
    lastFired: '15 mins ago',
    actionsTaken: 1240,
    revenueImpact: 9800,
    icon: ShoppingCart,
  },
  {
    id: 'auto_4',
    name: 'VIP Upgrade Detector',
    description: 'Automatically segments customers into VIP tier when LTV crosses $500 and triggers exclusive offers.',
    category: 'customer',
    status: 'active',
    trigger: 'Customer LTV > $500',
    lastFired: '3 hours ago',
    actionsTaken: 89,
    revenueImpact: 6200,
    icon: Star,
  },
  {
    id: 'auto_5',
    name: 'SEO Content Optimizer',
    description: 'Rewrites product meta-descriptions and H1 tags when organic traffic drops or trending keywords are detected.',
    category: 'marketing',
    status: 'paused',
    trigger: 'Organic CTR drop > 10%',
    lastFired: '2 days ago',
    actionsTaken: 56,
    revenueImpact: 3400,
    icon: Search,
  },
  {
    id: 'auto_6',
    name: 'Review Request Sequence',
    description: 'Triggers post-purchase review request emails 7 days after delivery confirmation.',
    category: 'customer',
    status: 'active',
    trigger: '7 days post-delivery',
    lastFired: '1 hour ago',
    actionsTaken: 2180,
    revenueImpact: 0,
    icon: Star,
  },
  {
    id: 'auto_7',
    name: 'Flash Sale Creator',
    description: 'Draft automation — auto-creates a flash sale for slow-moving inventory when sell-through rate drops below 20%.',
    category: 'pricing',
    status: 'draft',
    trigger: 'Sell-through rate < 20%',
    lastFired: 'Never',
    actionsTaken: 0,
    revenueImpact: 0,
    icon: Zap,
  },
];

export const AutomationsView: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header Row */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-[#F5EEF0] tracking-tight">Workflow Automations</h2>
        <button className="px-4 py-2 bg-[#C9747A] hover:bg-[#D4A0A3] text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-[#C9747A]/20 flex items-center gap-2">
          <Plus size={16} />
          Create New Workflow
        </button>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard label="Active Automations" value="5" trend="up" />
        <MetricCard label="Total Actions Taken" value="4,724" />
        <MetricCard label="Revenue Attributed" value="$62,000" trend="up" />
        <MetricCard label="Paused / Draft" value="2" trend="neutral" />
      </div>

      {/* Summary Impact Bar */}
      <div className="bg-gradient-to-r from-[#140F14] to-[#100D10] border border-[#C9747A]/20 rounded-2xl p-6 shadow-2xl flex items-center justify-around text-center">
        <div>
          <p className="text-[10px] font-black text-[#6B5560] uppercase tracking-widest mb-1">Status</p>
          <p className="text-sm font-bold text-[#F5EEF0]">5 automations running</p>
        </div>
        <div className="w-px h-8 bg-[#231820]" />
        <div>
          <p className="text-[10px] font-black text-[#6B5560] uppercase tracking-widest mb-1">Recent Activity</p>
          <p className="text-sm font-bold text-[#F5EEF0]">Last 24h: 47 actions fired</p>
        </div>
        <div className="w-px h-8 bg-[#231820]" />
        <div>
          <p className="text-[10px] font-black text-[#6B5560] uppercase tracking-widest mb-1">Monthly Yield</p>
          <p className="text-sm font-bold text-[#10B981]">+$62k attributed revenue</p>
        </div>
      </div>

      {/* Automations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {AUTOMATIONS.map((auto) => (
          <motion.div 
            key={auto.id}
            whileHover={{ y: -4 }}
            className="bg-[#140F14] border border-[#231820] rounded-3xl p-6 shadow-xl hover:border-[#C9747A]/30 transition-all group"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#080608] border border-[#231820] flex items-center justify-center text-[#6B5560] group-hover:text-[#C9747A] transition-colors">
                  <auto.icon size={24} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-[#F5EEF0] tracking-tight">{auto.name}</h3>
                  <p className="text-[11px] text-[#6B5560] mt-0.5 uppercase font-bold tracking-wider">{auto.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                  auto.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                  auto.status === 'paused' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
                  'bg-[#100D10] text-[#6B5560] border-[#231820]'
                }`}>
                  {auto.status}
                </span>
                <div className={`w-10 h-5 rounded-full p-1 cursor-pointer transition-colors ${auto.status === 'active' ? 'bg-[#C9747A]' : 'bg-[#231820]'}`}>
                  <div className={`w-3 h-3 rounded-full bg-white transition-transform ${auto.status === 'active' ? 'translate-x-5' : 'translate-x-0'}`} />
                </div>
              </div>
            </div>

            <p className="text-xs text-[#B09AA0] leading-relaxed mb-6 h-8 line-clamp-2">
              {auto.description}
            </p>

            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-[#231820]">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-[#6B5560] uppercase tracking-widest">Trigger</p>
                <p className="text-xs font-bold text-[#F5EEF0]">{auto.trigger}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-[#6B5560] uppercase tracking-widest">Last Fired</p>
                <p className="text-xs font-bold text-[#B09AA0]">{auto.lastFired}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-[#6B5560] uppercase tracking-widest">Actions</p>
                <p className="text-xs font-bold text-[#F5EEF0]">{auto.actionsTaken.toLocaleString()}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-[#6B5560] uppercase tracking-widest">Impact</p>
                <p className="text-xs font-bold text-[#10B981]">+${auto.revenueImpact.toLocaleString()}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

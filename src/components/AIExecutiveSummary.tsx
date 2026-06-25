import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowUpRight, TrendingUp, Zap } from 'lucide-react';
import { useDashboard } from '../contexts/DashboardContext';

export const AIExecutiveSummary: React.FC = () => {
  const { timeRange } = useDashboard();

  const getSummary = () => {
    switch (timeRange) {
      case 'Today':
        return {
          revenue: '12%',
          customers: '5%',
          topProduct: '$4,200',
          automation: '$850',
          recommendation: 'Increase budget on Meta campaign by 10% for the evening peak.'
        };
      case 'Last 7 Days':
        return {
          revenue: '18%',
          customers: '12%',
          topProduct: '$28,400',
          automation: '$5,200',
          recommendation: 'Restock Vitamin C Serum immediately; current velocity will lead to stockout in 48 hours.'
        };
      default:
        return {
          revenue: '14%',
          customers: '8%',
          topProduct: '$22,100',
          automation: '$4,500',
          recommendation: 'Increase budget on Meta campaign by 15% to capitalize on rising ROAS.'
        };
    }
  };

  const summary = getSummary();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-[#140F14] to-[#0D0D1A] border border-[#C9747A]/30 rounded-[32px] p-8 shadow-2xl relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
        <Sparkles size={120} className="text-[#C9747A]" />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-2xl bg-[#C9747A]/20 flex items-center justify-center text-[#C9747A]">
            <TrendingUp size={20} />
          </div>
          <div>
            <h3 className="text-lg font-black text-white tracking-tight">AI Executive Summary</h3>
            <p className="text-[10px] font-bold text-[#6B5560] uppercase tracking-[0.2em]">{timeRange} Performance</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <p className="text-sm text-[#B09AA0] leading-relaxed">
              Revenue increased <span className="text-[#10B981] font-black">{summary.revenue}</span>. 
              Returning customers increased <span className="text-[#10B981] font-black">{summary.customers}</span>.
            </p>
            <p className="text-sm text-[#B09AA0] leading-relaxed">
              Top product generated <span className="text-white font-black">{summary.topProduct}</span>. 
              Cart recovery automation generated <span className="text-[#C9747A] font-black">{summary.automation}</span>.
            </p>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <Zap size={14} className="text-[#C9747A]" />
              <span className="text-[10px] font-black text-white uppercase tracking-widest">Recommendation</span>
            </div>
            <p className="text-xs font-bold text-[#F1F1F8] leading-relaxed mb-4">
              {summary.recommendation}
            </p>
            <button className="flex items-center gap-2 text-[10px] font-black text-[#C9747A] uppercase tracking-widest hover:gap-3 transition-all">
              Execute Optimization <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

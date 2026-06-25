import React, { useState, useEffect } from 'react';
import { Package, AlertTriangle, TrendingUp, BarChart3, ArrowRight, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { MetricCard } from '../MetricCard';
import { ConnectStore } from '../ConnectStore';
import { useAuth } from '../../contexts/AuthContext';
import { useDashboard } from '../../contexts/DashboardContext';
import { fetchDashboardData } from '../../lib/api';
import { ShoppingBag, ArrowUpRight, ArrowDownRight, MoreHorizontal, Sparkles, Activity } from 'lucide-react';

export const InventoryView: React.FC<{ onNavigate: (tab: string) => void }> = ({ onNavigate }) => {
  const { timeRange } = useDashboard();
  const { user, profile } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const hasApiKey = !!profile?.shopifyApiKey;

  useEffect(() => {
    async function load() {
      if (!user || !hasApiKey) {
        setLoading(false);
        return;
      }
      setLoading(true);
      const res = await fetchDashboardData(user.uid);
      setData(res);
      setLoading(false);
    }
    load();
  }, [user, hasApiKey]);

  if (!hasApiKey && !loading) {
    return <ConnectStore onConnect={() => onNavigate('settings')} title="Manage Your Inventory" description="Connect your Shopify store to track stock levels, monitor sales velocity, and get AI-powered restock alerts." />;
  }

  const products = data?.products || [];

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard label="Total SKUs" value={products.length.toString()} loading={loading} />
        <MetricCard label="Avg Margin" value="64%" trend="up" loading={loading} />
        <MetricCard label="Low Stock Alerts" value="4" trend="down" loading={loading} />
        <MetricCard label="Out of Stock" value="2" trend="neutral" loading={loading} />
      </div>

      <div className="bg-[#140F14] border border-[#231820] rounded-[32px] overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-[#231820] bg-[#100D10]/50 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-black text-[#F5EEF0] uppercase tracking-widest flex items-center gap-2">
              <Package size={16} className="text-[#C9747A]" />
              Product Intelligence
            </h3>
            <p className="text-[10px] text-[#6B5560] font-bold mt-1 uppercase tracking-widest">Real-time Stock & Health Analysis</p>
          </div>
          <button className="px-4 py-2 bg-[#C9747A]/10 border border-[#C9747A]/20 text-[#C9747A] text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-[#C9747A] hover:text-white transition-all">
            Export Inventory Report
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#231820]">
                <th className="px-8 py-5 text-[10px] font-black text-[#6B5560] uppercase tracking-widest">Product</th>
                <th className="px-8 py-5 text-[10px] font-black text-[#6B5560] uppercase tracking-widest">Health Score</th>
                <th className="px-8 py-5 text-[10px] font-black text-[#6B5560] uppercase tracking-widest text-right">Inventory</th>
                <th className="px-8 py-5 text-[10px] font-black text-[#6B5560] uppercase tracking-widest text-right">Sales Velocity</th>
                <th className="px-8 py-5 text-[10px] font-black text-[#6B5560] uppercase tracking-widest text-right">Margin</th>
                <th className="px-8 py-5 text-[10px] font-black text-[#6B5560] uppercase tracking-widest text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p: any) => {
                const healthScore = Math.floor(Math.random() * 40) + 60; // Mock score 60-100
                return (
                  <tr key={p.id} className="border-b border-[#231820]/50 hover:bg-[#1A1218] transition-colors group">
                    <td className="px-8 py-5">
                      <p className="text-xs font-bold text-[#F5EEF0]">{p.name}</p>
                      <p className="text-[10px] text-[#6B5560] font-bold mt-1 uppercase tracking-widest">{p.category || 'Beauty'}</p>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 w-16 bg-[#080608] rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${healthScore > 80 ? 'bg-emerald-500' : healthScore > 60 ? 'bg-amber-500' : 'bg-rose-500'}`}
                            style={{ width: `${healthScore}%` }}
                          />
                        </div>
                        <span className="text-[11px] font-black text-white">{healthScore}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-xs font-bold text-[#F5EEF0] text-right tabular-nums">{p.stock || 120}</td>
                    <td className="px-8 py-5 text-xs font-bold text-[#F5EEF0] text-right tabular-nums">{p.velocity || '4.2/day'}</td>
                    <td className="px-8 py-5 text-xs font-bold text-[#10B981] text-right tabular-nums">68%</td>
                    <td className="px-8 py-5 text-center">
                      <button className="p-2 rounded-lg bg-white/5 text-[#6B5560] hover:text-[#C9747A] hover:bg-[#C9747A]/10 transition-all">
                        <MoreHorizontal size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#140F14] border border-[#231820] rounded-[32px] p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-[#C9747A]/10 flex items-center justify-center text-[#C9747A]">
              <Activity size={20} />
            </div>
            <h3 className="text-sm font-black text-[#F5EEF0] uppercase tracking-widest">AI Stock Predictions</h3>
          </div>
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-[#080608] border border-[#231820]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black text-white uppercase tracking-widest">Vitamin C Serum</span>
                <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Critical</span>
              </div>
              <p className="text-xs text-[#B09AA0] leading-relaxed">
                Stockout predicted in <span className="text-white font-bold">4 days</span>. Recommend immediate reorder of 500 units to maintain current growth trajectory.
              </p>
            </div>
            <button className="w-full py-3 bg-[#C9747A] text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-[#D4A0A3] transition-all">
              Auto-Generate Purchase Order
            </button>
          </div>
        </div>

        <div className="bg-[#140F14] border border-[#231820] rounded-[32px] p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <Sparkles size={20} />
            </div>
            <h3 className="text-sm font-black text-[#F5EEF0] uppercase tracking-widest">Product Opportunities</h3>
          </div>
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-[#080608] border border-[#231820]">
              <p className="text-xs text-[#B09AA0] leading-relaxed">
                <span className="text-white font-bold">Hydrating Cleanser</span> has a 72% repeat purchase rate. Bundling it with the <span className="text-white font-bold">Moisturizer</span> could increase AOV by <span className="text-emerald-400 font-bold">$22.00</span>.
              </p>
            </div>
            <button className="w-full py-3 bg-white/5 border border-white/10 text-[#F1F1F8] text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all">
              Create Bundle Offer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

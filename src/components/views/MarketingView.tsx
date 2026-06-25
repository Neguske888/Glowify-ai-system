import React, { useState, useEffect } from 'react';
import { Megaphone, TrendingUp, Mail, Globe, ArrowUpRight, ArrowDownRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { MetricCard } from '../MetricCard';
import { ConnectStore } from '../ConnectStore';
import { useAuth } from '../../contexts/AuthContext';
import { useDashboard } from '../../contexts/DashboardContext';
import { fetchDashboardData } from '../../lib/api';

const CAMPAIGNS = [
  { id: 'camp_1', name: 'Summer Glow Serum Launch', platform: 'Meta', spend: 4200, revenue: 18400, roas: 4.38, status: 'active' },
  { id: 'camp_2', name: 'Retinol Treatment Retargeting', platform: 'Google', spend: 1800, revenue: 9200, roas: 5.11, status: 'active' },
  { id: 'camp_3', name: 'Beauty Influencer Push', platform: 'TikTok', spend: 3500, revenue: 12800, roas: 3.65, status: 'active' },
  { id: 'camp_4', name: 'VIP Early Access', platform: 'Klaviyo', spend: 450, revenue: 15600, roas: 34.6, status: 'completed' },
];

export const MarketingView: React.FC<{ onNavigate: (tab: string) => void }> = ({ onNavigate }) => {
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
    return <ConnectStore onConnect={() => onNavigate('settings')} title="Connect Marketing Channels" description="Connect your Shopify and Klaviyo accounts to see real-time marketing performance and AI-driven recommendations." />;
  }

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard label="Total Ad Spend" value="$9,950" change="+12%" trend="up" loading={loading} />
        <MetricCard label="Blended ROAS" value="4.2x" change="+0.3x" trend="up" loading={loading} />
        <MetricCard label="Email Revenue" value="$15,600" change="+24%" trend="up" loading={loading} />
        <MetricCard label="Organic Revenue" value="$4,200" change="+8%" trend="up" loading={loading} />
      </div>

      <div className="bg-[#140F14] border border-[#231820] rounded-[32px] overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-[#231820] bg-[#100D10]/50 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-black text-[#F5EEF0] uppercase tracking-widest flex items-center gap-2">
              <Megaphone size={16} className="text-[#C9747A]" />
              Active Campaigns
            </h3>
            <p className="text-[10px] text-[#6B5560] font-bold mt-1 uppercase tracking-widest">{timeRange} Performance</p>
          </div>
          <button className="px-4 py-2 bg-[#C9747A]/10 border border-[#C9747A]/20 text-[#C9747A] text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-[#C9747A] hover:text-white transition-all">
            Launch New Campaign
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#231820]">
                <th className="px-8 py-5 text-[10px] font-black text-[#6B5560] uppercase tracking-widest">Campaign Name</th>
                <th className="px-8 py-5 text-[10px] font-black text-[#6B5560] uppercase tracking-widest">Platform</th>
                <th className="px-8 py-5 text-[10px] font-black text-[#6B5560] uppercase tracking-widest text-right">Spend</th>
                <th className="px-8 py-5 text-[10px] font-black text-[#6B5560] uppercase tracking-widest text-right">Revenue</th>
                <th className="px-8 py-5 text-[10px] font-black text-[#6B5560] uppercase tracking-widest text-right">ROAS</th>
                <th className="px-8 py-5 text-[10px] font-black text-[#6B5560] uppercase tracking-widest text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {CAMPAIGNS.map((camp) => (
                <tr key={camp.id} className="border-b border-[#231820]/50 hover:bg-[#1A1218] transition-colors group">
                  <td className="px-8 py-5">
                    <p className="text-xs font-bold text-[#F5EEF0]">{camp.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="text-[10px] text-[#6B5560] font-bold uppercase tracking-widest">{camp.status}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold text-[#B09AA0]">
                      {camp.platform}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-xs font-bold text-[#F5EEF0] text-right tabular-nums">${camp.spend.toLocaleString()}</td>
                  <td className="px-8 py-5 text-xs font-bold text-[#10B981] text-right tabular-nums">${camp.revenue.toLocaleString()}</td>
                  <td className="px-8 py-5 text-xs font-black text-[#F5EEF0] text-right tabular-nums">{camp.roas}x</td>
                  <td className="px-8 py-5 text-center">
                    <button className="p-2 rounded-lg bg-white/5 text-[#6B5560] hover:text-[#C9747A] hover:bg-[#C9747A]/10 transition-all">
                      <Sparkles size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#140F14] border border-[#231820] rounded-[32px] p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-black text-[#F5EEF0] uppercase tracking-widest flex items-center gap-2">
              <Sparkles size={16} className="text-[#C9747A]" />
              AI Creative Assistant
            </h3>
          </div>
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-[#080608] border border-[#231820]">
              <p className="text-[10px] font-black text-[#6B5560] uppercase tracking-widest mb-2">Recommended Ad Copy</p>
              <p className="text-sm text-[#F1F1F8] font-medium italic">"Experience the Glow. Our Summer Glow Serum is now back in stock. Shop now for 20% off your first order."</p>
            </div>
            <div className="flex gap-3">
              <button className="flex-1 py-3 bg-[#C9747A] text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-[#D4A0A3] transition-all">
                Generate New Copy
              </button>
              <button className="flex-1 py-3 bg-white/5 border border-white/10 text-[#F1F1F8] text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all">
                Create Creative Brief
              </button>
            </div>
          </div>
        </div>

        <div className="bg-[#140F14] border border-[#231820] rounded-[32px] p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-black text-[#F5EEF0] uppercase tracking-widest flex items-center gap-2">
              <TrendingUp size={16} className="text-[#C9747A]" />
              Budget Optimization
            </h3>
          </div>
          <div className="space-y-6">
            <p className="text-xs text-[#B09AA0] leading-relaxed">
              Based on the last 7 days, <span className="text-white font-bold">Klaviyo VIP Flows</span> are outperforming all paid channels. Reallocating $500 from TikTok to Meta retargeting is projected to increase overall ROAS by <span className="text-[#10B981] font-bold">0.4x</span>.
            </p>
            <button className="w-full py-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-emerald-500 hover:text-white transition-all">
              Apply Reallocation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

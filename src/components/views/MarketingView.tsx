import React, { useState, useEffect } from 'react';
import { Megaphone, TrendingUp, Mail, Globe, ArrowUpRight, ArrowDownRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { MetricCard } from '../MetricCard';
import { useAuth } from '../../contexts/AuthContext';
import { fetchDashboardData } from '../../lib/api';

const CHANNEL_SPEND = [
  { channel: 'Meta Ads', spend: 8200, revenue: 34440, roas: 4.2, trend: 'up', change: '+0.4x' },
  { channel: 'Google Ads', spend: 3800, revenue: 14060, roas: 3.7, trend: 'up', change: '+0.2x' },
  { channel: 'TikTok Ads', spend: 1200, revenue: 3840, roas: 3.2, trend: 'down', change: '-0.1x' },
  { channel: 'Email (Klaviyo)', spend: 400, revenue: 9800, roas: 24.5, trend: 'up', change: '+2.1x' },
  { channel: 'Organic SEO', spend: 0, revenue: 22400, roas: Infinity, trend: 'up', change: '+18%' },
];

const ROAS_TREND = Array.from({length: 30}, (_, i) => ({
  day: i + 1,
  meta: parseFloat((3.5 + Math.random() * 1.2).toFixed(2)),
  google: parseFloat((3.0 + Math.random() * 1.0).toFixed(2)),
  email: parseFloat((20 + Math.random() * 8).toFixed(1)),
}));

const EMAIL_CAMPAIGNS = [
  { name: 'Win-Back Series', sent: 4200, openRate: 34.2, clickRate: 8.7, revenue: 3840, status: 'active' },
  { name: 'Post-Purchase Flow', sent: 1890, openRate: 48.5, clickRate: 14.2, revenue: 2210, status: 'active' },
  { name: 'VIP Early Access', sent: 620, openRate: 62.1, clickRate: 22.8, revenue: 1940, status: 'sent' },
  { name: 'Abandoned Cart', sent: 3100, openRate: 41.3, clickRate: 11.5, revenue: 2890, status: 'active' },
];

export const MarketingView: React.FC = () => {
  const { user } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!user) return;
      setLoading(true);
      const res = await fetchDashboardData(user.uid);
      setData(res);
      setLoading(false);
    }
    load();
  }, [user]);

  return (
    <div className="space-y-10">
      {/* KPI Strip */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard label="Total Ad Spend" value="$13,600" change="-4.2%" trend="up" loading={loading} />
        <MetricCard label="Blended ROAS" value="4.2x" change="+0.8x" trend="up" loading={loading} />
        <MetricCard label="Email Revenue" value="$9,800" change="+24%" trend="up" loading={loading} />
        <MetricCard label="Organic Revenue" value="$22,400" change="+18%" trend="up" loading={loading} />
      </div>

      {/* Channel Performance Table */}
      <div className="bg-[#140F14] border border-[#231820] rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-[#231820] bg-[#100D10]/50 flex items-center justify-between">
          <h3 className="text-sm font-black text-[#F5EEF0] uppercase tracking-widest flex items-center gap-2">
            <Megaphone size={16} className="text-[#C9747A]" />
            Channel Performance
          </h3>
          <span className="text-[11px] font-bold text-[#6B5560]">Last 30 Days</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#231820]">
                <th className="p-6 text-[11px] font-black text-[#6B5560] uppercase tracking-widest">Channel</th>
                <th className="p-6 text-[11px] font-black text-[#6B5560] uppercase tracking-widest">Spend</th>
                <th className="p-6 text-[11px] font-black text-[#6B5560] uppercase tracking-widest">Revenue</th>
                <th className="p-6 text-[11px] font-black text-[#6B5560] uppercase tracking-widest">ROAS</th>
                <th className="p-6 text-[11px] font-black text-[#6B5560] uppercase tracking-widest">7D Trend</th>
                <th className="p-6 text-[11px] font-black text-[#6B5560] uppercase tracking-widest">Change</th>
              </tr>
            </thead>
            <tbody>
              {CHANNEL_SPEND.map((row) => (
                <tr key={row.channel} className="border-b border-[#231820]/50 hover:bg-[#1A1218] transition-colors group">
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#080608] border border-[#231820] flex items-center justify-center text-[#6B5560] group-hover:text-[#C9747A] transition-colors">
                        {row.channel.includes('Meta') ? <TrendingUp size={14} /> : 
                         row.channel.includes('Google') ? <Globe size={14} /> : 
                         row.channel.includes('Email') ? <Mail size={14} /> : <TrendingUp size={14} />}
                      </div>
                      <span className="text-sm font-bold text-[#F5EEF0]">{row.channel}</span>
                    </div>
                  </td>
                  <td className="p-6 text-sm font-medium text-[#B09AA0] tabular-nums">
                    {row.spend === 0 ? '—' : `$${row.spend.toLocaleString()}`}
                  </td>
                  <td className="p-6 text-sm font-bold text-[#F5EEF0] tabular-nums">
                    ${row.revenue.toLocaleString()}
                  </td>
                  <td className="p-6">
                    {row.roas === Infinity ? (
                      <span className="text-lg font-black text-[#C9747A]">∞</span>
                    ) : (
                      <span className={`px-2.5 py-1 rounded-lg text-[11px] font-black ${
                        row.channel.includes('Email') ? 'bg-[#C9747A]/20 text-[#C9747A]' : 'bg-[#100D10] text-[#B09AA0]'
                      } border border-[#231820]`}>
                        {row.roas}x
                      </span>
                    )}
                  </td>
                  <td className="p-6">
                    {row.trend === 'up' ? <ArrowUpRight size={18} className="text-[#10B981]" /> : <ArrowDownRight size={18} className="text-[#EF4444]" />}
                  </td>
                  <td className={`p-6 text-xs font-bold ${row.trend === 'up' ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                    {row.change}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ROAS Trend Chart & Email Campaigns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#140F14] border border-[#231820] rounded-3xl p-6 shadow-2xl">
          <h3 className="text-sm font-black text-[#F5EEF0] uppercase tracking-widest mb-8">ROAS Trend (30D)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ROAS_TREND}>
                <CartesianGrid strokeDasharray="3 3" stroke="#231820" vertical={false} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#6B5560', fontSize: 10}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B5560', fontSize: 10}} />
                <Tooltip 
                  contentStyle={{ background: '#080608', border: '1px solid #231820', borderRadius: '12px' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                />
                <Legend />
                <Line type="monotone" dataKey="meta" name="Meta Ads" stroke="#C9747A" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="google" name="Google Ads" stroke="#3B82F6" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#140F14] border border-[#231820] rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-[#231820] bg-[#100D10]/50">
            <h3 className="text-sm font-black text-[#F5EEF0] uppercase tracking-widest">Email Campaign Stats</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#231820]">
                  <th className="px-6 py-4 text-[10px] font-black text-[#6B5560] uppercase tracking-widest">Campaign</th>
                  <th className="px-6 py-4 text-[10px] font-black text-[#6B5560] uppercase tracking-widest">Open Rate</th>
                  <th className="px-6 py-4 text-[10px] font-black text-[#6B5560] uppercase tracking-widest">Revenue</th>
                  <th className="px-6 py-4 text-[10px] font-black text-[#6B5560] uppercase tracking-widest">Status</th>
                </tr>
              </thead>
              <tbody>
                {EMAIL_CAMPAIGNS.map((camp) => (
                  <tr key={camp.name} className="border-b border-[#231820]/50 hover:bg-[#1A1218] transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-xs font-bold text-[#F5EEF0]">{camp.name}</p>
                      <p className="text-[10px] text-[#6B5560]">{camp.sent.toLocaleString()} sent</p>
                    </td>
                    <td className="px-6 py-4 text-xs font-bold text-[#B09AA0]">{camp.openRate}%</td>
                    <td className="px-6 py-4 text-xs font-bold text-[#F5EEF0]">${camp.revenue.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                        camp.status === 'active' ? 'bg-[#C9747A]/10 text-[#C9747A] border-[#C9747A]/20' : 'bg-[#100D10] text-[#6B5560] border-[#231820]'
                      }`}>
                        {camp.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* AI Marketing Recommendation */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#140F14] border-l-4 border-[#C9747A] rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-[#C9747A]/10 text-[#C9747A]">
            <Sparkles size={24} />
          </div>
          <div>
            <h4 className="text-sm font-black text-[#F5EEF0] uppercase tracking-widest mb-2">AI Marketing Recommendation</h4>
            <p className="text-[13px] text-[#B09AA0] leading-relaxed">
              📈 <span className="font-bold text-[#F5EEF0]">Opportunity detected:</span> Email channel delivering 24.5x ROAS — 6x higher than paid. Recommend increasing Klaviyo flow investment by $200/month. Estimated impact: <span className="text-[#10B981] font-bold">+$4,900</span> additional monthly revenue.
            </p>
          </div>
        </div>
        <button className="px-6 py-3 bg-[#C9747A] hover:bg-[#D4A0A3] text-white text-xs font-black rounded-xl transition-all shrink-0">
          Approve Action
        </button>
      </motion.div>
    </div>
  );
};

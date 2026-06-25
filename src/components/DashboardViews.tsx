import React, { useState, useEffect } from 'react';
import { Package, Mail, AlertCircle, Zap, TrendingUp, TrendingDown, ArrowRight, X } from 'lucide-react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, YAxis } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Skeleton } from './CommonUI';
import { MetricCard } from './MetricCard';
import { ConnectStore } from './ConnectStore';
import { fetchDashboardData } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';

const ActivityItem: React.FC<{ item: any }> = ({ item }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex items-center p-3 hover:bg-white/5 active:bg-white/10 rounded-2xl transition-colors cursor-pointer group"
  >
    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-active:scale-90"
      style={{
        background: `${item.color || '#C9747A'}15`,
        border: `1px solid ${item.color || '#C9747A'}25`,
      }}>
      {item.type === 'order' && <Package size={18} style={{ color: item.color || '#10B981' }} />}
      {item.type === 'marketing' && <Mail size={18} style={{ color: item.color || '#3B82F6' }} />}
      {item.type === 'alert' && <AlertCircle size={18} style={{ color: item.color || '#EF4444' }} />}
      {item.type === 'automation' && <Zap size={18} style={{ color: item.color || '#8B4A6B' }} />}
    </div>
    <div className="flex-1 min-w-0 ml-3">
      <p className="text-[13px] font-bold text-[#F1F1F8] truncate">{item.text}</p>
      <p className="text-[11px] text-[#6B6B88] font-medium">{item.time || 'Just now'}</p>
    </div>
    {item.amount && (
      <span className="text-[12px] font-black text-[#10B981] ml-2 tabular-nums">
        +${item.amount}
      </span>
    )}
  </motion.div>
);

export const OverviewView: React.FC<{ loading: boolean; onNavigate: (tab: string) => void }> = ({ loading: authLoading, onNavigate }) => {
  const { user, profile } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<'Daily' | 'Weekly'>('Daily');
  const [showAllActivity, setShowAllActivity] = useState(false);
  const [activityFilter, setActivityFilter] = useState('all');

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

  if (!hasApiKey && !authLoading) {
    return <ConnectStore onConnect={() => onNavigate('settings')} />;
  }

  const chartData = data?.snapshots?.map((s: any) => ({
    label: new Date(s.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    revenue: s.revenue
  })).reverse() || [];

  const displayedActivities = data?.activity?.slice(0, 4) || [];

  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
        <MetricCard label="Revenue" value={data?.snapshots?.[0]?.revenue ? `$${(data.snapshots[0].revenue/1000).toFixed(1)}k` : "$0.00"} change="+0%" trend="neutral" loading={loading || authLoading} />
        <MetricCard label="ROAS" value="0.0x" change="+0.0" trend="neutral" loading={loading || authLoading} />
        <MetricCard label="Conv." value="0.00%" change="+0.0%" trend="neutral" loading={loading || authLoading} />
        <MetricCard label="AI Impact" value="$0.00" change="+0%" trend="neutral" loading={loading || authLoading} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-2">
          <Card className="min-h-[350px] lg:min-h-[400px] flex flex-col">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-lg font-bold text-[#F1F1F8] tracking-tight">Revenue Growth</h3>
                <p className="text-xs text-[#6B6B88]">Omnichannel performance metrics</p>
              </div>
              <div className="flex items-center gap-1 bg-[#0D0D1A] rounded-xl p-1 border border-[#1E1E3A] self-start">
                {(['Daily', 'Weekly'] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => setPeriod(t)}
                    className={`px-4 py-1.5 text-[10px] font-black rounded-lg transition-all ${
                      period === t ? 'bg-[#C9747A] text-white shadow-lg' : 'text-[#6B6B88] hover:text-[#A0A0B8]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex-1 min-h-[240px] w-full">
              {loading || authLoading ? <Skeleton h="100%" w="100%" r={16} /> : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="grad-revenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#C9747A" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#C9747A" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="label" tick={{ fill: '#3D3D55', fontSize: 10, fontWeight: 700 }} tickLine={false} axisLine={false} interval={5} dy={10} />
                    <YAxis tick={{ fill: '#3D3D55', fontSize: 10, fontWeight: 700 }} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{ background: '#0D0D1A', border: '1px solid #1E1E3A', borderRadius: '16px', color: '#F1F1F8', fontSize: '12px' }}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#C9747A" strokeWidth={3} fill="url(#grad-revenue)" dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </Card>
        </div>

        <div className="flex flex-col">
          <Card className="flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-[#F1F1F8] tracking-tight">Live Feed</h3>
                <p className="text-[10px] font-bold text-[#10B981] uppercase tracking-widest mt-0.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                  System Active
                </p>
              </div>
            </div>
            <div className="space-y-1 flex-1">
              {displayedActivities.length > 0 ? (
                displayedActivities.map((item: any, i: number) => (
                  <ActivityItem key={item.id || i} item={item} />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-full opacity-40 py-10">
                  <Zap size={32} className="mb-3" />
                  <p className="text-[11px] font-bold uppercase tracking-widest">No activity recorded</p>
                </div>
              )}
            </div>
            <button
              onClick={() => setShowAllActivity(true)}
              className="w-full mt-6 py-4 bg-[#0D0D1A] border border-[#1E1E3A] rounded-2xl text-[11px] font-black uppercase tracking-widest text-[#A0A0B8] hover:text-[#C9747A] hover:border-[#C9747A]/50 transition-all active:scale-[0.98]"
            >
              View Full Activity Log
            </button>
          </Card>
        </div>
      </div>

      {/* Slide-over Activity Modal */}
      <AnimatePresence>
        {showAllActivity && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowAllActivity(false)} className="fixed inset-0 bg-black/80 backdrop-blur-md z-[200]" />
            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 300 }} className="fixed bottom-0 left-0 right-0 h-[85vh] lg:h-full lg:w-full lg:max-w-[480px] lg:top-0 lg:right-0 lg:left-auto bg-[#080608] border-t lg:border-t-0 lg:border-l border-[#1E1E3A] z-[201] flex flex-col shadow-2xl rounded-t-[32px] lg:rounded-none">
              <div className="w-12 h-1.5 bg-[#1E1E3A] rounded-full mx-auto mt-3 mb-1 lg:hidden" />
              <div className="flex items-center justify-between px-6 py-6 border-b border-[#1E1E3A]">
                <div>
                  <h3 className="text-xl font-black text-[#F1F1F8] tracking-tight">Activity Log</h3>
                  <p className="text-xs text-[#6B6B88] font-bold mt-1 uppercase tracking-widest">Last 24 Hours</p>
                </div>
                <button onClick={() => setShowAllActivity(false)} className="w-10 h-10 rounded-2xl bg-[#1E1E3A] flex items-center justify-center text-[#A0A0B8] active:scale-90 transition-transform">
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
                {(data?.activity || []).length > 0 ? (
                  (data.activity).filter((item: any) => activityFilter === 'all' || item.type === activityFilter).map((item: any, i: number) => (
                    <ActivityItem key={item.id || i} item={item} />
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-full opacity-40">
                    <p className="text-[11px] font-bold uppercase tracking-widest">No activity found</p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export const AnalyticsView: React.FC<{ loading: boolean; onNavigate: (tab: string) => void }> = ({ loading: authLoading, onNavigate }) => {
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

  if (!hasApiKey && !authLoading) {
    return <ConnectStore onConnect={() => onNavigate('settings')} />;
  }

  const categoryData = data?.products?.map((p: any) => ({
    name: p.name.split(' ')[0],
    value: p.sales,
    color: '#C9747A'
  })) || [];

  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <Card className="min-h-[350px]">
          <div className="mb-8">
            <h3 className="text-lg font-bold text-[#F1F1F8] tracking-tight">Sales by Category</h3>
            <p className="text-xs text-[#6B6B88]">Product performance distribution</p>
          </div>
          <div className="h-[250px] lg:h-[300px]">
            {loading || authLoading ? <Skeleton h="100%" w="100%" r={16} /> : (
              categoryData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#3D3D55', fontSize: 10, fontWeight: 700}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#3D3D55', fontSize: 10, fontWeight: 700}} />
                    <Tooltip cursor={{ fill: 'rgba(255,255,255,0.03)' }} contentStyle={{ background: '#0D0D1A', border: '1px solid #1E1E3A', borderRadius: '16px', color: '#F1F1F8', fontSize: '12px' }} />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={40}>
                      {categoryData.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex flex-col items-center justify-center h-full opacity-40">
                  <Package size={32} className="mb-3" />
                  <p className="text-[11px] font-bold uppercase tracking-widest">No product data</p>
                </div>
              )
            )}
          </div>
        </Card>
        
        <Card className="min-h-[350px]">
          <div className="mb-8">
            <h3 className="text-lg font-bold text-[#F1F1F8] tracking-tight">Channel Performance</h3>
            <p className="text-xs text-[#6B6B88]">Traffic and conversion by source</p>
          </div>
          <div className="space-y-6">
            {[
              { name: 'Direct Store', value: 0, color: '#C9747A', trend: '+0%' },
              { name: 'Social Ads', value: 0, color: '#8B4A6B', trend: '+0%' },
              { name: 'Email Flow', value: 0, color: '#D4A0A3', trend: '+0%' },
              { name: 'Organic', value: 0, color: '#F59E0B', trend: '+0%' },
            ].map(channel => (
              <div key={channel.name} className="space-y-3">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-sm font-bold text-[#F1F1F8]">{channel.name}</p>
                    <p className="text-[10px] font-bold text-[#10B981]">{channel.trend} vs last month</p>
                  </div>
                  <p className="text-xs font-black text-[#F1F1F8] tabular-nums">{channel.value}%</p>
                </div>
                <div className="h-2 bg-[#0D0D1A] rounded-full overflow-hidden border border-[#1E1E3A]">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${channel.value}%` }} className="h-full rounded-full" style={{ background: channel.color }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

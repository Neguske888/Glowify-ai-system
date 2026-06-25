import React, { useState, useEffect } from 'react';
import { Package, Mail, AlertCircle, Zap, TrendingUp, TrendingDown, ArrowRight, X } from 'lucide-react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, YAxis } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { DS } from '../theme';
import { Card, Skeleton } from './CommonUI';
import { MetricCard } from './MetricCard';

// Task 4.1 - Revenue Data
const today = new Date();

const DAILY_DATA = Array.from({ length: 30 }, (_, i) => {
  const d = new Date(today);
  d.setDate(today.getDate() - (29 - i));
  return {
    label: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    revenue: Math.round(3800 + i * 80 + Math.random() * 600),
  };
});

const WEEKLY_DATA = Array.from({ length: 12 }, (_, i) => {
  const d = new Date(today);
  d.setDate(today.getDate() - (11 - i) * 7);
  return {
    label: `W${i + 1}`,
    revenue: Math.round(24000 + i * 800 + Math.random() * 3000),
  };
});

const CATEGORY_DATA = [
  { name: 'Serums', value: 45000, color: '#C9747A' },
  { name: 'Moisturizers', value: 32000, color: '#8B4A6B' },
  { name: 'Cleansers', value: 28000, color: '#D4A0A3' },
  { name: 'Treatments', value: 15000, color: '#F59E0B' },
];

// Task 4.2 - Live Feed Data
const ALL_ACTIVITIES = [
  { type: 'order',      color: '#10B981', text: 'New Order #8824 — Vitamin C Serum',         amount: '89.00',  time: '1m ago'  },
  { type: 'order',      color: '#10B981', text: 'New Order #8823 — Hyaluronic Surge x2',     amount: '130.00', time: '3m ago'  },
  { type: 'automation', color: '#8B4A6B', text: 'Cart Recovered — Retinol Cream',             amount: '340.00', time: '8m ago'  },
  { type: 'alert',      color: '#F59E0B', text: 'Low Stock: Hyaluronic Moisture Surge (12)',  amount: null,     time: '12m ago' },
  { type: 'marketing',  color: '#C9747A', text: 'Klaviyo — Win-Back Series sent (4,200)',     amount: null,     time: '18m ago' },
  { type: 'order',      color: '#10B981', text: 'New Order #8822 — AHA Cleanser',             amount: '52.00',  time: '22m ago' },
  { type: 'alert',      color: '#EF4444', text: 'Out of Stock: Peptide Eye Serum',            amount: null,     time: '31m ago' },
  { type: 'automation', color: '#8B4A6B', text: 'Pricing Engine — Retinol adjusted to $118', amount: null,     time: '45m ago' },
];

const ActivityItem: React.FC<{ item: any }> = ({ item }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex items-center p-3 hover:bg-white/5 active:bg-white/10 rounded-2xl transition-colors cursor-pointer group"
  >
    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-active:scale-90"
      style={{
        background: `${item.color}15`,
        border: `1px solid ${item.color}25`,
      }}>
      {item.type === 'order' && <Package size={18} style={{ color: item.color }} />}
      {item.type === 'marketing' && <Mail size={18} style={{ color: item.color }} />}
      {item.type === 'alert' && <AlertCircle size={18} style={{ color: item.color }} />}
      {item.type === 'automation' && <Zap size={18} style={{ color: item.color }} />}
    </div>
    <div className="flex-1 min-w-0 ml-3">
      <p className="text-[13px] font-bold text-[#F1F1F8] truncate">{item.text}</p>
      <p className="text-[11px] text-[#6B6B88] font-medium">{item.time}</p>
    </div>
    {item.amount && (
      <span className="text-[12px] font-black text-[#10B981] ml-2 tabular-nums">
        +${item.amount}
      </span>
    )}
  </motion.div>
);

export const OverviewView: React.FC<{ loading: boolean }> = ({ loading }) => {
  const [period, setPeriod] = useState<'Daily' | 'Weekly'>('Daily');
  const [visibleCount, setVisibleCount] = useState(0);
  const [showAllActivity, setShowAllActivity] = useState(false);
  const [activityFilter, setActivityFilter] = useState('all');

  const chartData = period === 'Daily' ? DAILY_DATA : WEEKLY_DATA;

  // Auto-rotate live feed
  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleCount(c => (c + 1) % ALL_ACTIVITIES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const displayedActivities = Array.from({ length: 4 }, (_, i) =>
    ALL_ACTIVITIES[(visibleCount + i) % ALL_ACTIVITIES.length]
  );

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
        <MetricCard label="Revenue" value="$142.8k" change="+12%" trend="up" loading={loading} />
        <MetricCard label="ROAS" value="4.2x" change="+0.8" trend="up" loading={loading} />
        <MetricCard label="Conv." value="3.84%" change="-0.2%" trend="down" loading={loading} />
        <MetricCard label="AI Impact" value="$31.2k" change="+18%" trend="up" loading={loading} />
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
              {loading ? <Skeleton h="100%" w="100%" r={16} /> : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="grad-revenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#C9747A" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#C9747A" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="label"
                      tick={{ fill: '#3D3D55', fontSize: 10, fontWeight: 700 }}
                      tickLine={false}
                      axisLine={false}
                      interval={period === 'Daily' ? 5 : 1}
                      dy={10}
                    />
                    <YAxis 
                      tick={{ fill: '#3D3D55', fontSize: 10, fontWeight: 700 }}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(v) => `$${v >= 1000 ? (v/1000).toFixed(1)+'k' : v}`}
                    />
                    <Tooltip
                      contentStyle={{
                        background: '#0D0D1A', border: '1px solid #1E1E3A',
                        borderRadius: '16px', color: '#F1F1F8', fontSize: '12px',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.5)', padding: '12px'
                      }}
                      cursor={{ stroke: '#C9747A', strokeWidth: 1, strokeDasharray: '4 4' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#C9747A" 
                      strokeWidth={3} 
                      fill="url(#grad-revenue)" 
                      dot={false}
                      activeDot={{ r: 6, fill: '#C9747A', stroke: '#080608', strokeWidth: 2 }}
                    />
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
              <AnimatePresence mode="popLayout">
                {displayedActivities.map((item, i) => (
                  <ActivityItem key={`${visibleCount}-${i}`} item={item} />
                ))}
              </AnimatePresence>
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
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowAllActivity(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[200]"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 h-[85vh] lg:h-full lg:w-full lg:max-w-[480px] lg:top-0 lg:right-0 lg:left-auto bg-[#080608] border-t lg:border-t-0 lg:border-l border-[#1E1E3A] z-[201] flex flex-col shadow-2xl rounded-t-[32px] lg:rounded-none"
            >
              <div className="w-12 h-1.5 bg-[#1E1E3A] rounded-full mx-auto mt-3 mb-1 lg:hidden" />
              <div className="flex items-center justify-between px-6 py-6 border-b border-[#1E1E3A]">
                <div>
                  <h3 className="text-xl font-black text-[#F1F1F8] tracking-tight">Activity Log</h3>
                  <p className="text-xs text-[#6B6B88] font-bold mt-1 uppercase tracking-widest">Last 24 Hours</p>
                </div>
                <button 
                  onClick={() => setShowAllActivity(false)} 
                  className="w-10 h-10 rounded-2xl bg-[#1E1E3A] flex items-center justify-center text-[#A0A0B8] active:scale-90 transition-transform"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="flex gap-2 px-6 py-4 overflow-x-auto no-scrollbar border-b border-[#1E1E3A]">
                {['all', 'order', 'marketing', 'alert', 'automation'].map(f => (
                  <button
                    key={f}
                    onClick={() => setActivityFilter(f)}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                      activityFilter === f ? 'bg-[#C9747A] text-white' : 'bg-[#0D0D1A] text-[#6B6B88] border border-[#1E1E3A]'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
                {ALL_ACTIVITIES
                  .filter(item => activityFilter === 'all' || item.type === activityFilter)
                  .map((item, i) => (
                    <ActivityItem key={i} item={item} />
                  ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export const AnalyticsView: React.FC<{ loading: boolean }> = ({ loading }) => (
  <div className="space-y-6 lg:space-y-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
      <Card className="min-h-[350px]">
        <div className="mb-8">
          <h3 className="text-lg font-bold text-[#F1F1F8] tracking-tight">Sales by Category</h3>
          <p className="text-xs text-[#6B6B88]">Product performance distribution</p>
        </div>
        <div className="h-[250px] lg:h-[300px]">
          {loading ? <Skeleton h="100%" w="100%" r={16} /> : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CATEGORY_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#3D3D55', fontSize: 10, fontWeight: 700}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#3D3D55', fontSize: 10, fontWeight: 700}} />
                <Tooltip
                  cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                  contentStyle={{
                    background: '#0D0D1A', border: '1px solid #1E1E3A',
                    borderRadius: '16px', color: '#F1F1F8', fontSize: '12px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)', padding: '12px'
                  }}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={40}>
                  {CATEGORY_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
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
            { name: 'Direct Store', value: 85, color: '#C9747A', trend: '+12%' },
            { name: 'Social Ads', value: 62, color: '#8B4A6B', trend: '+5%' },
            { name: 'Email Flow', value: 48, color: '#D4A0A3', trend: '+22%' },
            { name: 'Organic', value: 35, color: '#F59E0B', trend: '-2%' },
          ].map(channel => (
            <div key={channel.name} className="space-y-3">
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-sm font-bold text-[#F1F1F8]">{channel.name}</span>
                  <p className="text-[10px] font-black text-[#6B6B88] uppercase tracking-widest mt-0.5">{channel.trend} this week</p>
                </div>
                <span className="text-sm font-black text-[#F1F1F8] tabular-nums">{channel.value}%</span>
              </div>
              <div className="h-3 bg-[#0D0D1A] rounded-full overflow-hidden border border-[#1E1E3A]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${channel.value}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full rounded-full shadow-[0_0_10px_rgba(201,116,122,0.3)]"
                  style={{ background: channel.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  </div>
);

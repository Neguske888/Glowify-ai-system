import React, { useState, useEffect } from 'react';
import { Package, Mail, AlertCircle, Zap } from 'lucide-react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
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
    label: `W${i + 1} ${d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`,
    revenue: Math.round(24000 + i * 800 + Math.random() * 3000),
  };
});

const CATEGORY_DATA = [
  { name: 'Serums', value: 45000, color: '#6366F1' },
  { name: 'Moisturizers', value: 32000, color: '#8B5CF6' },
  { name: 'Cleansers', value: 28000, color: '#D4A0A3' },
  { name: 'Treatments', value: 15000, color: '#F59E0B' },
];

// Task 4.2 - Live Feed Data
const ALL_ACTIVITIES = [
  { type: 'order',      color: '#10B981', text: 'New Order #8824 — Vitamin C Serum',         amount: '89.00',  time: '1m ago'  },
  { type: 'order',      color: '#10B981', text: 'New Order #8823 — Hyaluronic Surge x2',     amount: '130.00', time: '3m ago'  },
  { type: 'automation', color: '#8B5CF6', text: 'Cart Recovered — Retinol Cream',             amount: '340.00', time: '8m ago'  },
  { type: 'alert',      color: '#F59E0B', text: 'Low Stock: Hyaluronic Moisture Surge (12)',  amount: null,     time: '12m ago' },
  { type: 'marketing',  color: '#6366F1', text: 'Klaviyo — Win-Back Series sent (4,200)',     amount: null,     time: '18m ago' },
  { type: 'order',      color: '#10B981', text: 'New Order #8822 — AHA Cleanser',             amount: '52.00',  time: '22m ago' },
  { type: 'alert',      color: '#EF4444', text: 'Out of Stock: Peptide Eye Serum',            amount: null,     time: '31m ago' },
  { type: 'automation', color: '#8B5CF6', text: 'Pricing Engine — Retinol adjusted to $118', amount: null,     time: '45m ago' },
  { type: 'order',      color: '#10B981', text: 'New Order #8821 — Vitamin C Serum x3',      amount: '267.00', time: '52m ago' },
  { type: 'marketing',  color: '#6366F1', text: 'Post-Purchase Survey sent',                  amount: null,     time: '1h ago'  },
  { type: 'automation', color: '#8B5CF6', text: 'VIP Upgrade: Claire Fontaine (LTV $500+)',  amount: null,     time: '1h ago'  },
  { type: 'order',      color: '#10B981', text: 'New Order #8820 — Peptide Eye Serum',       amount: '95.00',  time: '1h ago'  },
  { type: 'alert',      color: '#F59E0B', text: 'AI Recommendation ready for review',         amount: null,     time: '2h ago'  },
  { type: 'marketing',  color: '#6366F1', text: 'Abandoned Cart email sent — 3,100 contacts',amount: null,     time: '2h ago'  },
  { type: 'order',      color: '#10B981', text: 'New Order #8819 — AHA Cleanser + Serum',    amount: '141.00', time: '2h ago'  },
];

const ActivityItem: React.FC<{ item: any }> = ({ item }) => (
  <div className="flex items-center p-3 hover:bg-white/5 rounded-xl transition-colors">
    <div style={{
      width:'36px', height:'36px', borderRadius:'10px', flexShrink:0,
      background: `${item.color}14`,
      border:     `1px solid ${item.color}22`,
      display:'flex', alignItems:'center', justifyContent:'center',
    }}>
      {item.type === 'order' && <Package size={16} style={{ color: item.color }} />}
      {item.type === 'marketing' && <Mail size={16} style={{ color: item.color }} />}
      {item.type === 'alert' && <AlertCircle size={16} style={{ color: item.color }} />}
      {item.type === 'automation' && <Zap size={16} style={{ color: item.color }} />}
    </div>
    <div className="flex-1 min-w-0 ml-3">
      <p className="text-[13px] font-semibold text-[#F1F1F8] truncate">{item.text}</p>
      <p className="text-[11px] text-[#6B6B88]">{item.time}</p>
    </div>
    {item.amount && (
      <span className="text-[12px] font-bold text-[#10B981] ml-auto">
        +${item.amount}
      </span>
    )}
  </div>
);

const ActivityFilter: React.FC<{ filter: {id: string; label: string}; activeFilter: string; setFilter: (f: string) => void }> = ({ filter, activeFilter, setFilter }) => (
  <button
    onClick={() => setFilter(filter.id)}
    className={`px-3 py-1.5 text-[10px] font-bold rounded-lg transition-all ${
      activeFilter === filter.id
        ? 'bg-[#1E1E3A] text-[#F1F1F8]'
        : 'text-[#6B6B88] hover:text-[#A0A0B8]'
    }`}
  >
    {filter.label}
  </button>
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
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const displayedActivities = Array.from({ length: 5 }, (_, i) =>
    ALL_ACTIVITIES[(visibleCount + i) % ALL_ACTIVITIES.length]
  );

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard label="Total Revenue" value="$142,840" change="+12.4%" trend="up" loading={loading} />
        <MetricCard label="Active ROAS" value="4.2x" change="+0.8x" trend="up" loading={loading} />
        <MetricCard label="Conversion Rate" value="3.84%" change="-0.2%" trend="down" loading={loading} />
        <MetricCard label="AI Impact" value="$31,200" change="+18.5%" trend="up" loading={loading} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="min-h-[400px]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-bold text-[#F1F1F8] tracking-tight">Revenue Growth</h3>
                <p className="text-xs text-[#6B6B88]">Real-time performance across all channels</p>
              </div>
              <div className="flex items-center gap-2 bg-[#0D0D1A] rounded-lg p-1 border border-[#1E1E3A]">
                {(['Daily', 'Weekly'] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => setPeriod(t)}
                    className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${
                      period === t ? 'bg-[#1E1E3A] text-white' : 'text-[#6B6B88] hover:text-[#A0A0B8]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-[280px] w-full">
              {loading ? <Skeleton h="100%" w="100%" r={12} /> : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="grad-revenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="label"
                      tick={{ fill: '#6B6B88', fontSize: 10 }}
                      tickLine={false}
                      axisLine={false}
                      interval={period === 'Daily' ? 4 : 1}
                      tickMargin={8}
                    />
                    <Tooltip
                      contentStyle={{
                        background: '#0D0D1A', border: '1px solid #1E1E3A',
                        borderRadius: '12px', color: '#F1F1F8', fontSize: '12px',
                      }}
                      formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#6366F1" strokeWidth={2.5} fill="url(#grad-revenue)" dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="h-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-[#F1F1F8] tracking-tight">Live Feed</h3>
              <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            </div>
            <div className="space-y-2">
              {displayedActivities.map((item, i) => (
                <ActivityItem key={`${visibleCount}-${i}`} item={item} />
              ))}
            </div>
            <button
              onClick={() => setShowAllActivity(true)}
              className="w-full mt-6 py-3 border border-[#1E1E3A] rounded-xl text-xs font-bold text-[#A0A0B8] hover:bg-white/5 hover:border-[#6366F1] hover:text-[#6366F1] transition-all"
            >
              View All Activity →
            </button>
          </Card>
        </div>
      </div>

      <AnimatePresence>
        {showAllActivity && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowAllActivity(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 80 }}
              transition={{ duration: 0.22 }}
              className="fixed top-0 right-0 h-full w-full max-w-[480px] bg-[#0D0D1A] border-l border-[#1E1E3A] z-[101] flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-[#1E1E3A] shrink-0">
                <div>
                  <h3 className="text-[15px] font-bold text-[#F1F1F8]">All Activity</h3>
                  <p className="text-[11px] text-[#6B6B88] mt-0.5">{ALL_ACTIVITIES.length} events — last 24 hours</p>
                </div>
                <button onClick={() => setShowAllActivity(false)} className="w-9 h-9 rounded-xl bg-[#1E1E3A] flex items-center justify-center text-[#6B6B88] hover:text-white transition-colors text-lg font-light">
                  ×
                </button>
              </div>
              <div className="flex gap-1 px-6 py-3 border-b border-[#1E1E3A] shrink-0 overflow-x-auto no-scrollbar">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'order', label: 'Orders' },
                  { id: 'marketing', label: 'Marketing' },
                  { id: 'alert', label: 'Alerts' },
                  { id: 'automation', label: 'Automations' },
                ].map(f => (
                  <ActivityFilter key={f.id} filter={f} activeFilter={activityFilter} setFilter={setActivityFilter} />
                ))}
              </div>
              <div className="flex-1 overflow-y-auto py-2">
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
  <div className="space-y-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="min-h-[400px]">
        <h3 className="text-lg font-bold text-[#F1F1F8] tracking-tight mb-8">Sales by Category</h3>
        <div className="h-[300px]">
          {loading ? <Skeleton h="100%" w="100%" r={12} /> : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CATEGORY_DATA}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B6B88', fontSize: 12}} />
                <Tooltip
                  contentStyle={{
                    background: '#0D0D1A', border: '1px solid #1E1E3A',
                    borderRadius: '12px', color: '#F1F1F8', fontSize: '12px',
                  }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {CATEGORY_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </Card>
      <Card className="min-h-[400px]">
        <h3 className="text-lg font-bold text-[#F1F1F8] tracking-tight mb-8">Channel Performance</h3>
        <div className="space-y-6">
          {[
            { name: 'Direct', value: 85, color: '#6366F1' },
            { name: 'Social', value: 62, color: '#8B5CF6' },
            { name: 'Email', value: 48, color: '#D4A0A3' },
            { name: 'Search', value: 35, color: '#F59E0B' },
          ].map(channel => (
            <div key={channel.name} className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-[#F1F1F8]">{channel.name}</span>
                <span className="text-[#6B6B88]">{channel.value}%</span>
              </div>
              <div className="h-2 bg-[#07070F] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${channel.value}%` }}
                  className="h-full"
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

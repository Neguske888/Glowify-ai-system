import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import {
  Home,
  Bot,
  BarChart2,
  Megaphone,
  Package,
  Users,
  Zap,
  Settings,
  ChevronDown,
  RefreshCw,
  Bell,
  TrendingUp,
  AlertTriangle,
  Target,
  ShoppingCart,
  Tag,
  AlertCircle,
  Mail,
  ChevronRight,
  LogOut,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Search,
  CheckCircle2,
  Clock
} from 'lucide-react';

/* --- MOCK DATA --- */

const REVENUE_TREND = [
  { name: 'Mon', value: 18200 },
  { name: 'Tue', value: 21400 },
  { name: 'Wed', value: 19800 },
  { name: 'Thu', value: 24100 },
  { name: 'Fri', value: 22700 },
  { name: 'Sat', value: 26300 },
  { name: 'Sun', value: 28400 },
];

const ADS_ROAS_DATA = [
  { name: 'May 13', value: 5.1 },
  { name: 'May 14', value: 4.9 },
  { name: 'May 15', value: 4.7 },
  { name: 'May 16', value: 4.4 },
  { name: 'May 17', value: 4.2 },
  { name: 'May 18', value: 4.0 },
  { name: 'May 19', value: 3.8 },
];

const PRODUCT_DATA = [
  { name: 'Vit C', value: 420 },
  { name: 'Retinol', value: 310 },
  { name: 'SPF50', value: 280 },
  { name: 'Eye Crm', value: 190 },
  { name: 'Toner', value: 160 },
];

const RETENTION_DATA = [
  { name: 'Wk 1', value: 44 },
  { name: 'Wk 2', value: 43 },
  { name: 'Wk 3', value: 45 },
  { name: 'Wk 4', value: 42 },
  { name: 'Wk 5', value: 41 },
  { name: 'Wk 6', value: 41 },
];

const KPI_DATA = [
  { label: 'Revenue', value: '$284,920', delta: '+18.4%', trend: 'up', data: [12, 15, 14, 18, 17, 21, 24] },
  { label: 'Orders', value: '3,847', delta: '+12.1%', trend: 'up', data: [8, 10, 9, 12, 11, 14, 15] },
  { label: 'Conv. Rate', value: '3.24%', delta: '-0.4%', trend: 'down', data: [4.2, 4.1, 4.0, 3.8, 3.6, 3.4, 3.2] },
  { label: 'ROAS', value: '4.7x', delta: '+8.2%', trend: 'up', data: [3.8, 4.0, 4.1, 4.3, 4.5, 4.6, 4.7] },
  { label: 'AOV', value: '$74.06', delta: '+3.1%', trend: 'up', data: [68, 70, 69, 71, 72, 73, 74] },
  { label: 'Ret. Cust', value: '41%', delta: '+5.6%', trend: 'up', data: [36, 37, 38, 38, 39, 40, 41] },
];

const ACTION_ITEMS = [
  { id: 1, priority: 'P1', title: 'Restock Vitamin C Serum', desc: 'Only 12 units left. Sells 40/day on average.', impact: '+$3,200', color: 'red' },
  { id: 2, priority: 'P1', title: 'Fix Broken Checkout on Mobile Safari', desc: 'Affects 18% of sessions. Detected 6h ago.', impact: '+$8,100', color: 'red' },
  { id: 3, priority: 'P2', title: 'Launch Flash Sale Email', desc: 'Segment of 4,200 lapsed buyers ready.', impact: '+$5,600', color: 'amber' },
  { id: 4, priority: 'P3', title: 'Enable Post-Purchase Upsell', desc: 'Average upsell acceptance: 22% on similar stores.', impact: '+$1,800', color: 'blue' },
];

const ACTIVITY_FEED = [
  { id: 1, type: 'order', text: 'Order #8821 — $142.00 — New York, US', time: '1 min ago', icon: ShoppingCart, color: '#10B981' },
  { id: 2, type: 'order', text: 'Order #8820 — $89.00 — London, UK', time: '3 min ago', icon: ShoppingCart, color: '#10B981' },
  { id: 3, type: 'marketing', text: 'Flash Sale email sent to 4,200 subscribers', time: '8 min ago', icon: Mail, color: '#6366F1' },
  { id: 4, type: 'alert', text: 'Stock alert: Retinol Cream below 20 units', time: '12 min ago', icon: AlertCircle, color: '#F59E0B' },
  { id: 5, type: 'order', text: 'Order #8819 — $210.00 — Toronto, CA', time: '14 min ago', icon: ShoppingCart, color: '#10B981' },
  { id: 6, type: 'marketing', text: 'Facebook Campaign #3 spend hit daily cap', time: '22 min ago', icon: Tag, color: '#6366F1' },
  { id: 7, type: 'order', text: 'Order #8818 — $67.00 — Sydney, AU', time: '28 min ago', icon: ShoppingCart, color: '#10B981' },
  { id: 8, type: 'marketing', text: 'Abandoned cart recovery — $340 recovered', time: '35 min ago', icon: Mail, color: '#6366F1' },
  { id: 9, type: 'alert', text: 'Conversion drop detected on /collections/skincare', time: '41 min ago', icon: AlertCircle, color: '#F59E0B' },
  { id: 10, type: 'order', text: 'Order #8817 — $189.00 — Chicago, US', time: '47 min ago', icon: ShoppingCart, color: '#10B981' },
  { id: 11, type: 'marketing', text: 'Google Shopping ROAS reached 5.2x', time: '1h ago', icon: Tag, color: '#6366F1' },
  { id: 12, type: 'order', text: 'Order #8816 — $93.00 — Berlin, DE', time: '1h ago', icon: ShoppingCart, color: '#10B981' },
];

const AI_INSIGHTS = [
  {
    icon: TrendingUp,
    category: 'TREND',
    color: 'text-indigo-400',
    headline: 'Mobile Revenue Up 28%',
    desc: 'Mobile now drives 61% of orders. Your mobile checkout UX is outperforming desktop. Consider mobile-first campaign creatives.'
  },
  {
    icon: AlertTriangle,
    category: 'WARNING',
    color: 'text-amber-400',
    headline: 'Ad Frequency Too High',
    desc: 'Facebook ad frequency hit 4.8x for your core audience. Creative fatigue likely. Rotate new ad sets within 48h.'
  },
  {
    icon: Target,
    category: 'OPPORTUNITY',
    color: 'text-indigo-400',
    headline: 'Bundle Upsell Untapped',
    desc: "67% of Vitamin C buyers also view Retinol within the same session but don't convert. A bundle offer could recover $12K/month."
  }
];

/* --- COMPONENTS --- */

const SidebarItem = ({ icon: Icon, label, active, expanded, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center h-12 mb-1 transition-all duration-200 group relative ${
      active ? 'text-indigo-400 border-l-2 border-indigo-500 bg-indigo-500/5' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
    }`}
  >
    <div className={`flex items-center justify-center ${expanded ? 'ml-4' : 'w-16'}`}>
      <Icon size={20} strokeWidth={active ? 2.5 : 2} />
    </div>
    {expanded && <span className="ml-3 font-medium text-sm">{label}</span>}
    {!expanded && (
      <div className="absolute left-14 px-2 py-1 bg-[#1E1E2E] text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
        {label}
      </div>
    )}
  </button>
);

const Card = ({ children, className = "" }) => (
  <div className={`bg-[#111118] border border-[#1E1E2E] rounded-2xl p-5 ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, type = "blue" }) => {
  const styles = {
    red: "bg-red-500/10 text-red-400 border-red-500/20",
    amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    blue: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    green: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${styles[type]}`}>
      {children}
    </span>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1E1E2E] border border-[#2E2E3E] p-2 rounded-lg shadow-xl">
        <p className="text-white font-bold text-xs">{payload[0].value}</p>
      </div>
    );
  }
  return null;
};

const ComingSoon = ({ title }) => (
  <div className="flex flex-col items-center justify-center h-[calc(100vh-120px)]">
    <Card className="w-full max-w-md p-12 text-center flex flex-col items-center">
      <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-6">
        <Zap size={32} />
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
      <p className="text-slate-500 mb-8">This module is currently being optimized by Glowify Intelligence. Check back shortly for real-time insights.</p>
      <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all">
        Notify Me
      </button>
    </Card>
  </div>
);

/* --- MAIN PAGE --- */

const OverviewPage = () => {
  return (
    <div className="space-y-6 pb-12">
      {/* AI SUMMARY CARD */}
      <Card className="border-l-4 border-l-indigo-500 relative overflow-hidden group">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-3/5 space-y-4">
            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">AI Business Summary</p>
            <h2 className="text-2xl font-bold text-white leading-tight">Your store is growing 23% faster than last month</h2>
            <p className="text-slate-400 text-sm max-w-xl">
              Conversion rate dipped <span className="text-red-400 font-bold">0.4%</span> in the last 48h — likely tied to your Facebook campaign targeting change on May 15.
            </p>
            <div className="flex gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 rounded-lg text-emerald-400 text-xs font-bold">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Revenue on Track
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-red-500/10 rounded-lg text-red-400 text-xs font-bold">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                Conversion Risk Detected
              </div>
            </div>
          </div>
          <div className="md:w-2/5 flex flex-col justify-end space-y-2">
            <div className="h-20 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={REVENUE_TREND}>
                  <defs>
                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="value" stroke="#6366F1" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="text-right text-emerald-400 font-bold text-sm">↑ $12,400 vs last week</p>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-[#1E1E2E] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
              <Sparkles size={16} />
            </div>
            <p className="text-xs text-slate-300">
              <span className="font-bold text-indigo-400">AI Recommendation:</span> Pause the Facebook Retargeting Ad Set #3 and reallocate $800 to Google Shopping — projected +14% ROAS improvement.
            </p>
          </div>
          <button className="whitespace-nowrap bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-indigo-500/20">
            Apply Recommendation →
          </button>
        </div>
      </Card>

      {/* KPI STRIP */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {KPI_DATA.map((kpi, i) => (
          <Card key={i} className="p-4 space-y-3">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{kpi.label}</p>
            <div className="flex items-baseline justify-between">
              <h3 className="text-xl font-bold text-white">{kpi.value}</h3>
              <div className={`flex items-center text-[10px] font-bold ${kpi.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                {kpi.trend === 'up' ? <ArrowUpRight size={10} className="mr-0.5" /> : <ArrowDownRight size={10} className="mr-0.5" />}
                {kpi.delta}
              </div>
            </div>
            <div className="h-8 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={kpi.data.map((v, idx) => ({ v }))}>
                  <Line 
                    type="monotone" 
                    dataKey="v" 
                    stroke={kpi.trend === 'up' ? '#10B981' : '#EF4444'} 
                    strokeWidth={2} 
                    dot={false} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        ))}
      </div>

      {/* TWO COLUMN SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ACTION ITEMS */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between px-2">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Zap size={18} className="text-indigo-400 fill-indigo-400" />
                What You Should Do Next
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Prioritized by revenue impact</p>
            </div>
          </div>
          <div className="space-y-3">
            {ACTION_ITEMS.map(item => (
              <Card key={item.id} className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4 hover:border-indigo-500/30 transition-all">
                <div className="flex gap-4 w-full">
                  <div className={`w-1 bg-${item.color}-500 rounded-full h-12 flex-shrink-0`} />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge type={item.color}>{item.priority}</Badge>
                      <h4 className="font-bold text-white text-sm">{item.title}</h4>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1">{item.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="text-right">
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">Est. impact</p>
                    <p className="text-emerald-400 font-bold text-sm">{item.impact}</p>
                  </div>
                  <button className="px-4 py-2 border border-[#2E2E3E] hover:border-indigo-500/50 text-slate-300 hover:text-white rounded-lg text-xs font-bold transition-all whitespace-nowrap">
                    Take Action →
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* LIVE ACTIVITY FEED */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Live Activity
            </h3>
          </div>
          <Card className="p-0 overflow-hidden">
            <div className="max-h-[380px] overflow-y-auto scroll-thin">
              {ACTIVITY_FEED.map((event, i) => (
                <div key={event.id} className={`flex items-start gap-3 p-4 border-b border-[#1E1E2E] last:border-0 ${i % 2 === 0 ? 'bg-white/[0.01]' : ''}`}>
                  <div className="mt-1 w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: event.color }} />
                  <div className="flex-1 space-y-1">
                    <p className="text-xs text-slate-300 leading-snug">{event.text}</p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500">
                      <event.icon size={10} />
                      {event.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* HEALTH GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sales Performance */}
        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-white">Sales Performance</h4>
            <Badge type="green">Healthy</Badge>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={REVENUE_TREND}>
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(99, 102, 241, 0.1)' }} />
                <Bar dataKey="value" fill="#6366F1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[10px] text-slate-500 italic">AI Note: "Revenue accelerating. Weekend spike +34% vs prior week."</p>
        </Card>

        {/* Ads Performance */}
        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-white">Ads Performance</h4>
            <Badge type="red">At Risk</Badge>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ADS_ROAS_DATA}>
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="value" stroke="#F59E0B" strokeWidth={3} dot={{ r: 4, fill: '#F59E0B' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[10px] text-slate-500 italic">AI Note: "ROAS declining 4 days straight. Facebook spend rebalancing needed."</p>
        </Card>

        {/* Product Performance */}
        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-white">Product Performance</h4>
            <Badge type="green">Healthy</Badge>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={PRODUCT_DATA}>
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(99, 102, 241, 0.1)' }} />
                <Bar dataKey="value" fill="#6366F1" radius={[4, 4, 0, 0]} />
                <XAxis dataKey="name" hide />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[10px] text-slate-500 italic">AI Note: "Vitamin C Serum driving 31% of total revenue."</p>
        </Card>

        {/* Customer Health */}
        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-white">Customer Health</h4>
            <Badge type="amber">Warning</Badge>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={RETENTION_DATA}>
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={3} dot={{ r: 4, fill: '#10B981' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[10px] text-slate-500 italic">AI Note: "Retention plateauing. Launch loyalty program to break 45% ceiling."</p>
        </Card>
      </div>

      {/* AI INSIGHTS PANEL */}
      <div className="space-y-4">
        <div className="px-2">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles size={18} className="text-indigo-400" />
            AI Insights
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">Powered by Glowify Intelligence</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {AI_INSIGHTS.map((insight, i) => (
            <Card key={i} className="hover:border-indigo-500/20 transition-all cursor-default">
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-xl bg-white/5 ${insight.color}`}>
                  <insight.icon size={20} />
                </div>
                <div className="space-y-2">
                  <p className={`text-[10px] font-black uppercase tracking-[0.2em] ${insight.color}`}>
                    {insight.category}
                  </p>
                  <h5 className="font-bold text-white text-sm leading-tight">{insight.headline}</h5>
                  <p className="text-xs text-slate-500 leading-relaxed">{insight.desc}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

/* --- MAIN APP WRAPPER --- */

export default function GlowifyDashboard() {
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const menuItems = [
    { id: 'Overview', icon: Home, label: 'Overview' },
    { id: 'AI Command Center', icon: Bot, label: 'AI Command Center' },
    { id: 'Analytics', icon: BarChart2, label: 'Performance Analytics' },
    { id: 'Marketing', icon: Megaphone, label: 'Marketing Hub' },
    { id: 'Products', icon: Package, label: 'Product Intelligence' },
    { id: 'Customers', icon: Users, label: 'Customer Insights' },
    { id: 'Automation', icon: Zap, label: 'Automation Center' },
    { id: 'Settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="flex h-screen bg-[#0A0A0F] text-slate-300 selection:bg-indigo-500/30 font-sans overflow-hidden">
      <style>{`
        .scroll-thin::-webkit-scrollbar { width: 4px; }
        .scroll-thin::-webkit-scrollbar-track { background: transparent; }
        .scroll-thin::-webkit-scrollbar-thumb { background: #1E1E2E; border-radius: 10px; }
        .scroll-thin::-webkit-scrollbar-thumb:hover { background: #2E2E3E; }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
          100% { transform: translateY(0px); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
      `}</style>

      {/* SIDEBAR */}
      <aside 
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        className={`fixed left-0 top-0 h-full bg-[#07070B] border-r border-[#1E1E2E] z-[100] transition-all duration-300 ease-in-out flex flex-col ${
          expanded ? 'w-[220px]' : 'w-16'
        }`}
      >
        <div className={`h-20 flex items-center ${expanded ? 'px-6' : 'justify-center'}`}>
          <div className="relative group">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
              <span className="text-white font-black text-xl">G</span>
            </div>
            {expanded && (
              <span className="absolute left-14 top-1/2 -translate-y-1/2 text-white font-bold text-lg whitespace-nowrap">
                Glowify AI
              </span>
            )}
          </div>
        </div>

        <nav className="flex-1 mt-4">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              active={activeTab === item.id}
              expanded={expanded}
              onClick={() => setActiveTab(item.id)}
            />
          ))}
        </nav>

        <div className={`p-4 mt-auto border-t border-[#1E1E2E] ${expanded ? 'px-6' : 'px-3'}`}>
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex-shrink-0" />
            {expanded && (
              <>
                <div className="flex-1 overflow-hidden">
                  <p className="text-xs font-bold text-white truncate">Alex Johnson</p>
                  <p className="text-[10px] text-slate-500 truncate">Store Owner</p>
                </div>
                <LogOut size={14} className="text-slate-500 hover:text-red-400" />
              </>
            )}
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${expanded ? 'ml-[220px]' : 'ml-16'}`}>
        
        {/* TOP BAR */}
        <header className="h-20 border-b border-[#1E1E2E] px-8 flex items-center justify-between bg-[#0A0A0F]/80 backdrop-blur-xl sticky top-0 z-[90]">
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-3">
              Good morning, Alex 👋
            </h1>
            <p className="text-xs text-slate-500 font-medium">Here's your business pulse for today</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#111118] border border-[#1E1E2E] rounded-xl text-xs font-bold cursor-pointer hover:bg-white/5 transition-all">
              Last 30 days
              <ChevronDown size={14} />
            </div>
            
            <button className="p-2.5 bg-[#111118] border border-[#1E1E2E] rounded-xl hover:bg-white/5 transition-all text-slate-400 hover:text-white">
              <RefreshCw size={18} />
            </button>
            
            <button className="p-2.5 bg-[#111118] border border-[#1E1E2E] rounded-xl hover:bg-white/5 transition-all text-slate-400 hover:text-white relative">
              <Bell size={18} />
              <div className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full ring-2 ring-[#0A0A0F]" />
            </button>
            
            <div className="w-[1px] h-8 bg-[#1E1E2E] mx-1" />
            
            <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400 text-xs font-bold animate-float">
              <Sparkles size={14} className="fill-indigo-400" />
              AI Active
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <div className="flex-1 overflow-y-auto px-8 py-8 scroll-thin">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            activeTab === 'Overview' ? <OverviewPage /> : <ComingSoon title={activeTab} />
          )}
        </div>
      </main>
    </div>
  );
}

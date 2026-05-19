import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Zap, 
  Bot, 
  Settings, 
  BarChart3, 
  LayoutDashboard, 
  ShoppingBag, 
  TrendingUp, 
  Users, 
  ArrowUpRight, 
  ArrowDownRight, 
  AlertCircle, 
  CheckCircle2, 
  Play, 
  FileText,
  Loader2,
  ChevronRight,
  LogOut,
  Rocket
} from 'lucide-react';

/* ── CONSTANTS & STYLES ────────────────────────────────────────────── */
const STORE_URL = "serenova-global.myshopify.com";

const THEME = {
  bg: "bg-[#0A0A0F]",
  card: "bg-white/[0.03] backdrop-blur-xl border-white/[0.08]",
  accent: "text-[#7C3AED]",
  secondary: "text-[#06B6D4]",
  glow: "hover:border-[#7C3AED]/50 transition-all duration-500",
};

/* ── COMPONENTS ────────────────────────────────────────────────────── */

/**
 * Animated Counter Component
 */
const AnimatedCounter = ({ value, prefix = "", suffix = "", duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const target = parseFloat(value.replace(/[^0-9.]/g, ''));

  useEffect(() => {
    let startTime;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(progress * target);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [target, duration]);

  const formatted = target % 1 === 0 
    ? Math.floor(count).toLocaleString() 
    : count.toFixed(1);

  return <span>{prefix}{formatted}{suffix}</span>;
};

/**
 * Metric Card Component
 */
const MetricCard = ({ label, value, delta, isLive = false, trend = "up" }) => (
  <div className={`${THEME.card} ${THEME.glow} p-6 rounded-2xl relative overflow-hidden group`}>
    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
      {isLive ? <Activity className="w-8 h-8 text-emerald-400" /> : <BarChart3 className="w-8 h-8 text-indigo-400" />}
    </div>
    <div className="space-y-1 relative z-10">
      <div className="flex items-center gap-2">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</p>
        {isLive && (
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[8px] font-black uppercase tracking-tighter">
            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" /> Live
          </span>
        )}
      </div>
      <div className="flex items-baseline gap-2">
        <h3 className="text-3xl font-black text-white font-mono tracking-tighter italic">
          <AnimatedCounter value={value} prefix={value.includes('$') ? '$' : ''} suffix={value.includes('%') ? '%' : value.includes('/min') ? '/min' : ''} />
        </h3>
      </div>
      <div className={`flex items-center gap-1 text-[11px] font-bold ${trend === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
        {trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
        {delta}
      </div>
    </div>
    <div className="mt-4 w-full bg-white/[0.05] h-[1px] relative">
      <div className={`absolute top-0 left-0 h-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent w-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000`} />
    </div>
  </div>
);

/**
 * Opportunity Card Component
 */
const OpportunityCard = ({ id, title, body, priority, status: initialStatus, progress: initialProgress = 0, actionLabel }) => {
  const [status, setStatus] = useState(initialStatus);
  const [progress, setProgress] = useState(initialProgress);
  const [isDeploying, setIsDeploying] = useState(false);

  const handleDeploy = () => {
    if (status !== 'IDLE') return;
    setIsDeploying(true);
    // Simulate Deployment Sequence
    let cur = 0;
    const interval = setInterval(() => {
      cur += Math.random() * 15;
      if (cur >= 65) {
        clearInterval(interval);
        setProgress(65);
        setStatus('RUNNING');
        setIsDeploying(false);
      } else {
        setProgress(cur);
      }
    }, 400);
  };

  const getPriorityStyles = () => {
    switch(priority) {
      case 'HIGH': return { icon: <AlertCircle className="w-4 h-4 text-rose-500" />, bg: "bg-rose-500/10", border: "border-rose-500/20", text: "text-rose-400" };
      case 'MEDIUM': return { icon: <AlertCircle className="w-4 h-4 text-amber-500" />, bg: "bg-amber-500/10", border: "border-amber-500/20", text: "text-amber-400" };
      case 'ACTIVE': return { icon: <Activity className="w-4 h-4 text-emerald-500" />, bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-400" };
      case 'COMPLETED': return { icon: <CheckCircle2 className="w-4 h-4 text-sky-500" />, bg: "bg-sky-500/10", border: "border-sky-500/20", text: "text-sky-400" };
      default: return { icon: null, bg: "bg-slate-500/10", border: "border-slate-500/20", text: "text-slate-400" };
    }
  };

  const styles = getPriorityStyles();

  return (
    <div className={`${THEME.card} ${THEME.glow} p-6 rounded-2xl relative flex flex-col justify-between group h-full`}>
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md border ${styles.bg} ${styles.border} ${styles.text} text-[10px] font-black uppercase tracking-widest`}>
              {styles.icon}
              {priority === 'ACTIVE' || priority === 'COMPLETED' ? status : `${priority} PRIORITY`}
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight pt-2 group-hover:text-indigo-300 transition-colors">{title}</h3>
          </div>
          <div className="p-2 rounded-xl bg-white/[0.03] border border-white/[0.05]">
            <Rocket className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition-colors" />
          </div>
        </div>
        
        <p className="text-sm text-slate-400 leading-relaxed">
          {body}
        </p>

        {status === 'RUNNING' && (
          <div className="space-y-2 py-2">
            <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              <span>Agent Progress</span>
              <span className="text-indigo-400">{Math.floor(progress)}%</span>
            </div>
            <div className="w-full bg-white/[0.05] h-1.5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-indigo-600 to-purple-500 transition-all duration-700 ease-out shimmer" 
                style={{ width: `${progress}%` }} 
              />
            </div>
          </div>
        )}
      </div>

      <div className="pt-6 mt-auto">
        <button 
          onClick={handleDeploy}
          disabled={status !== 'IDLE' || isDeploying}
          className={`w-full py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
            status === 'IDLE' 
              ? 'bg-white text-slate-950 hover:bg-indigo-500 hover:text-white shadow-xl shadow-white/5' 
              : status === 'RUNNING' 
                ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 cursor-default'
                : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 cursor-default'
          }`}
        >
          {isDeploying ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Initializing...
            </>
          ) : status === 'IDLE' ? (
            <>
              <Play className="w-3 h-3 fill-current" />
              {actionLabel}
            </>
          ) : status === 'RUNNING' ? (
            <>
              <Activity className="w-3 h-3" />
              In Progress
            </>
          ) : (
            <>
              <FileText className="w-3 h-3" />
              View Report
            </>
          )}
        </button>
      </div>
    </div>
  );
};

/* ── MAIN APP COMPONENT ────────────────────────────────────────────── */

export default function App() {
  const [activeTab, setActiveTab] = useState('Operations Hub');
  const [time, setTime] = useState(new Date().toLocaleTimeString('en-US', { hour12: false }));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { label: 'Operations Hub', icon: <Zap className="w-4 h-4" /> },
    { label: 'Agents Online', icon: <Bot className="w-4 h-4" />, badge: "3" },
    { label: 'System Status', icon: <Activity className="w-4 h-4" /> },
    { label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
    { label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className={`flex h-screen ${THEME.bg} text-slate-300 font-sans selection:bg-indigo-500/30 overflow-hidden`}>
      
      {/* ── DOT GRID BACKGROUND ── */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20" 
           style={{ backgroundImage: 'radial-gradient(#1e293b 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />

      {/* ── SIDEBAR ── */}
      <aside className="w-[240px] bg-[#07070B] border-r border-white/[0.05] flex flex-col z-10">
        <div className="p-8">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 overflow-hidden group">
                <span className="text-white font-black text-xl italic group-hover:scale-110 transition-transform">G</span>
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#07070B] shadow-sm animate-pulse" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tighter text-white m-0 uppercase italic">Glowify</h1>
              <p className="text-[9px] uppercase tracking-[0.2em] font-black text-indigo-500/80 m-0 leading-none">Intelligence OS</p>
            </div>
          </div>
        </div>

        <div className="px-6 mb-8">
          <div className="group cursor-pointer p-3 bg-white/[0.02] border border-white/[0.05] rounded-xl hover:bg-white/[0.04] transition-all">
            <div className="flex items-center gap-2 mb-1.5">
              <ShoppingBag className="w-3 h-3 text-indigo-400" />
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Active Store</p>
            </div>
            <p className="text-[11px] font-bold text-slate-300 truncate font-mono tracking-tight group-hover:text-indigo-300 transition-colors">
              {STORE_URL}
            </p>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveTab(item.label)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all group ${
                activeTab === item.label 
                ? 'bg-indigo-500/10 text-white border border-indigo-500/20 shadow-[0_0_20px_rgba(124,58,237,0.05)]' 
                : 'text-slate-500 hover:text-slate-300 hover:bg-white/[0.02]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`transition-colors ${activeTab === item.label ? 'text-indigo-400' : 'group-hover:text-slate-300'}`}>
                  {item.icon}
                </div>
                {item.label}
              </div>
              {item.badge && (
                <span className="px-1.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-400 text-[9px] font-black">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-6 mt-auto">
          <button className="w-full p-4 rounded-2xl bg-gradient-to-br from-[#7C3AED]/20 to-transparent border border-[#7C3AED]/30 group hover:border-[#7C3AED]/60 transition-all text-left">
            <p className="text-[10px] font-black text-indigo-300 uppercase tracking-widest mb-1">Enterprise Plan</p>
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-white">Upgrade Now</p>
              <ChevronRight className="w-3 h-3 text-indigo-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
          
          <div className="mt-6 flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-[10px] font-black text-indigo-400 uppercase tracking-tighter italic">
                SN
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] font-black text-white leading-none">Serena Nova</p>
                <p className="text-[9px] text-slate-500 leading-none tracking-tight">Admin Console</p>
              </div>
            </div>
            <LogOut className="w-3.5 h-3.5 text-slate-600 hover:text-rose-400 cursor-pointer transition-colors" />
          </div>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main className="flex-1 overflow-y-auto relative z-10 flex flex-col">
        
        {/* Top bar */}
        <header className="px-12 py-6 border-b border-white/[0.05] bg-[#0A0A0F]/50 backdrop-blur-md flex justify-between items-center sticky top-0 z-20">
          <div className="flex items-baseline gap-4">
            <h2 className="text-xl font-black text-white tracking-tighter uppercase italic">{activeTab}</h2>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Autonomous Intelligence Active</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end">
              <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest leading-none mb-1">System Clock</p>
              <p className="text-xs font-bold text-slate-300 font-mono tracking-tighter">{time}</p>
            </div>
            <div className="w-[1px] h-8 bg-white/[0.05]" />
            <button className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.06] transition-all text-slate-500 hover:text-indigo-400 group">
              <Activity className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            </button>
          </div>
        </header>

        <div className="flex-1 px-12 py-10 space-y-12">
          
          {/* Metrics Row */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard label="Daily Revenue" value="14280" delta="12.4% vs yesterday" trend="up" />
            <MetricCard label="Checkout Velocity" value="3.2" suffix="/min" delta="Live" isLive trend="up" />
            <MetricCard label="Conversion Rate" value="4.7" suffix="%" delta="0.3% this hour" trend="up" />
            <MetricCard label="Active Sessions" value="847" delta="Pulsing live indicator" isLive trend="up" />
          </section>

          {/* Intelligence Feed */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-xl font-black text-white tracking-tighter italic uppercase">Autonomous Opportunities</h3>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Priority Risk Mitigation Feed</p>
              </div>
              <div className="flex gap-2">
                <span className="px-3 py-1 rounded-lg bg-white/[0.03] border border-white/[0.05] text-[10px] font-bold text-slate-400">All Agents</span>
                <span className="px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-bold text-indigo-400">High Risk First</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <OpportunityCard 
                id="1"
                priority="HIGH"
                title="Stockout Risk Detected"
                body="SKU #GL-4471 (Radiance Serum 30ml) will be out of stock in ~6h based on current velocity. Recommend emergency restock trigger."
                actionLabel="Deploy Restock Agent"
                status="IDLE"
              />
              <OpportunityCard 
                id="2"
                priority="MEDIUM"
                title="Checkout Abandonment Spike"
                body="23% increase in cart abandonment at payment step. Possible friction point. Agent can A/B test discount overlay."
                actionLabel="Run Conversion Agent"
                status="IDLE"
              />
              <OpportunityCard 
                id="3"
                priority="ACTIVE"
                title="Email Winback Campaign"
                body="Agent is processing 1,240 lapsed customers from last 90 days. Estimated revenue recovery: $3,200."
                actionLabel="View Progress"
                status="RUNNING"
                progress={67}
              />
              <OpportunityCard 
                id="4"
                priority="COMPLETED"
                title="Pricing Optimization"
                body="Agent adjusted 14 product prices based on competitor analysis. Projected +8.2% margin improvement."
                actionLabel="View Report"
                status="DEPLOYED TO WORKER"
              />
            </div>
          </section>

        </div>

        {/* Shimmer Effect Global Styles */}
        <style dangerouslySetInnerHTML={{ __html: `
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,600;0,700;0,800;1,400;1,800&family=DM+Mono:wght@400;500&display=swap');
          
          .shimmer {
            background-size: 200% 100%;
            animation: shimmer-anim 2s infinite linear;
          }
          @keyframes shimmer-anim {
            from { background-position: 200% 0; }
            to { background-position: -200% 0; }
          }
          
          body { font-family: 'Plus Jakarta Sans', sans-serif; }
          .font-mono { font-family: 'DM Mono', monospace; }
        `}} />
      </main>
    </div>
  );
}

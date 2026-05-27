import React, { useState } from 'react';
import { Home, Bot, BarChart2, Megaphone, Package, Users, Zap, Settings, LogOut, ArrowRight, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

const DS = {
  // ── BACKGROUNDS ────────────────────────────────────────
  bg: {
    base:       '#07070F',   // deepest — html/body/#root
    surface:    '#0D0D1A',   // page background
    card:       '#0F0F1E',   // all card backgrounds
    cardHover:  '#131325',   // card hover state
    input:      '#0A0A18',   // all input fields
    overlay:    '#1A1A2E',   // modals, dropdowns, tooltips
    subtle:     '#0C0C1A',   // alternating table rows
    tag:        '#111128',   // small tag/chip backgrounds
  },
  // ── BORDERS ────────────────────────────────────────────
  border: {
    default:    '#1E1E3A',   // standard — most elements
    subtle:     '#161628',   // very subtle — table dividers
    strong:     '#2A2A48',   // emphasized — selected states
    focus:      '#6366F1',   // focus ring color
    glow:       'rgba(99,102,241,0.3)',
    success:    'rgba(16,185,129,0.25)',
    warning:    'rgba(245,158,11,0.25)',
    danger:     'rgba(239,68,68,0.25)',
    info:       'rgba(59,130,246,0.25)',
  },
  // ── BRAND ──────────────────────────────────────────────
  brand: {
    primary:        '#6366F1',
    primaryHover:   '#5558E8',
    primaryDark:    '#4F46E5',
    secondary:      '#8B5CF6',
    gradient:       'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
    gradientHover:  'linear-gradient(135deg, #5558E8 0%, #7C3AED 100%)',
    gradientSubtle: 'linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(139,92,246,0.06) 100%)',
    glow:           '0 0 24px rgba(99,102,241,0.25)',
    glowStrong:     '0 0 40px rgba(99,102,241,0.4)',
  },
  // ── SEMANTIC COLORS ────────────────────────────────────
  semantic: {
    success:        '#10B981',
    successLight:   '#34D399',
    successBg:      'rgba(16,185,129,0.08)',
    successBorder:  'rgba(16,185,129,0.2)',
    warning:        '#F59E0B',
    warningLight:   '#FCD34D',
    warningBg:      'rgba(245,158,11,0.08)',
    warningBorder:  'rgba(245,158,11,0.2)',
    danger:         '#EF4444',
    dangerLight:    '#F87171',
    dangerBg:       'rgba(239,68,68,0.08)',
    dangerBorder:   'rgba(239,68,68,0.2)',
    info:           '#3B82F6',
    infoLight:      '#60A5FA',
    infoBg:         'rgba(59,130,246,0.08)',
    infoBorder:     'rgba(59,130,246,0.2)',
    cyan:           '#06B6D4',
    cyanBg:         'rgba(6,182,212,0.08)',
    pink:           '#EC4899',
    pinkBg:         'rgba(236,72,153,0.08)',
    orange:         '#F97316',
    orangeBg:       'rgba(249,115,22,0.08)',
  },
  // ── TEXT ───────────────────────────────────────────────
  text: {
    primary:    '#F1F1F8',   // headings, important values
    secondary:  '#A0A0B8',   // body text, descriptions
    muted:      '#6B6B88',   // labels, captions, timestamps
    ghost:      '#3D3D55',   // placeholders, disabled
    accent:     '#818CF8',   // indigo accent text
    success:    '#34D399',
    warning:    '#FCD34D',
    danger:     '#F87171',
    mono:       '#818CF8',   // monospace numbers
  },
  // ── SHADOWS ────────────────────────────────────────────
  shadow: {
    xs:          '0 1px 2px rgba(0,0,0,0.4)',
    sm:          '0 1px 4px rgba(0,0,0,0.4), 0 4px 12px rgba(0,0,0,0.3)',
    md:          '0 2px 8px rgba(0,0,0,0.5), 0 8px 24px rgba(0,0,0,0.4)',
    lg:          '0 4px 16px rgba(0,0,0,0.6), 0 16px 40px rgba(0,0,0,0.5)',
    xl:          '0 8px 32px rgba(0,0,0,0.7), 0 24px 60px rgba(0,0,0,0.6)',
    card:        '0 1px 3px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.3)',
    cardHover:   '0 4px 16px rgba(0,0,0,0.6), 0 0 0 1px rgba(99,102,241,0.12), 0 12px 32px rgba(0,0,0,0.5)',
    glow:        '0 0 20px rgba(99,102,241,0.15)',
    glowHover:   '0 0 32px rgba(99,102,241,0.3)',
    button:      '0 4px 14px rgba(99,102,241,0.35)',
    buttonHover: '0 8px 24px rgba(99,102,241,0.5)',
    tooltip:     '0 8px 32px rgba(0,0,0,0.7), 0 2px 8px rgba(0,0,0,0.5)',
  },
  // ── RADIUS ─────────────────────────────────────────────
  radius: {
    xs:   '4px',
    sm:   '8px',
    md:   '12px',
    lg:   '16px',
    xl:   '20px',
    xxl:  '24px',
    full: '9999px',
  },
  // ── SPACING ────────────────────────────────────────────
  space: {
    1:  '4px',   2:  '8px',   3: '12px',
    4: '16px',   5: '20px',   6: '24px',
    8: '32px',  10: '40px',  12: '48px',
    16:'64px',  20:'80px',
  },
  // ── TYPOGRAPHY ─────────────────────────────────────────
  type: {
    display: { fontSize:'32px', fontWeight:'800', letterSpacing:'-0.03em', lineHeight:1.15, color:'#F1F1F8' },
    h1:      { fontSize:'24px', fontWeight:'700', letterSpacing:'-0.025em', lineHeight:1.25, color:'#F1F1F8' },
    h2:      { fontSize:'18px', fontWeight:'600', letterSpacing:'-0.015em', lineHeight:1.35, color:'#F1F1F8' },
    h3:      { fontSize:'15px', fontWeight:'600', letterSpacing:'-0.01em', lineHeight:1.4, color:'#F1F1F8' },
    h4:      { fontSize:'13px', fontWeight:'600', letterSpacing:'-0.005em', lineHeight:1.45, color:'#F1F1F8' },
    body:    { fontSize:'14px', fontWeight:'400', letterSpacing:'0', lineHeight:1.6, color:'#A0A0B8' },
    small:   { fontSize:'12px', fontWeight:'400', letterSpacing:'0.01em', lineHeight:1.5, color:'#6B6B88' },
    label:   { fontSize:'11px', fontWeight:'600', letterSpacing:'0.08em', lineHeight:1, color:'#6B6B88', textTransform:'uppercase' },
    mono:    { fontFamily:"'JetBrains Mono','Fira Code',monospace", fontSize:'13px', color:'#818CF8' },
    monoLg:  { fontFamily:"'JetBrains Mono','Fira Code',monospace", fontSize:'26px', fontWeight:'700', letterSpacing:'-0.03em', color:'#F1F1F8' },
  },
  // ── TRANSITIONS ────────────────────────────────────────
  transition: {
    fast:    'all 0.12s ease',
    base:    'all 0.18s cubic-bezier(0.4,0,0.2,1)',
    smooth:  'all 0.22s cubic-bezier(0.4,0,0.2,1)',
    slow:    'all 0.35s cubic-bezier(0.4,0,0.2,1)',
    spring:  'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
    sidebar: 'width 250ms cubic-bezier(0.4,0,0.2,1)',
  },
  // ── CHART THEME ────────────────────────────────────────
  chart: {
    tooltip: {
      contentStyle: {
        background:   '#1A1A2E',
        border:       '1px solid #2A2A48',
        borderRadius: '12px',
        color:        '#F1F1F8',
        fontSize:     '12px',
        fontFamily:   "'Inter',system-ui,sans-serif",
        padding:      '10px 14px',
        boxShadow:    '0 16px 40px rgba(0,0,0,0.7)',
      },
      cursor:      { stroke:'rgba(99,102,241,0.2)', strokeWidth:1, strokeDasharray:'3 3' },
      labelStyle:  { color:'#6B6B88', fontSize:'11px', marginBottom:'4px', fontWeight:'500' },
    },
    grid:  { strokeDasharray:'2 4', stroke:'rgba(255,255,255,0.035)', vertical:false },
    xAxis: { tick:{fill:'#4A4A6A',fontSize:11,fontFamily:'Inter'}, tickLine:false, axisLine:false, tickMargin:8 },
    yAxis: { tick:{fill:'#4A4A6A',fontSize:11,fontFamily:'Inter'}, tickLine:false, axisLine:false, tickMargin:8, width:44 },
    colors: {
      primary:   '#6366F1',
      secondary: '#8B5CF6',
      success:   '#10B981',
      warning:   '#F59E0B',
      danger:    '#EF4444',
      info:      '#3B82F6',
      cyan:      '#06B6D4',
      pink:      '#EC4899',
    },
  },
};

const TechBackground = () => (
  <div style={{position:'fixed',inset:0,pointerEvents:'none',zIndex:0,overflow:'hidden'}}>
    {/* Animated grid */}
    <div className="glw-tech-grid" style={{position:'absolute',inset:0}}/>
    {/* Top glow line */}
    <div className="glw-divider-glow" style={{position:'absolute',top:0,left:0,right:0}}/>
    {/* Indigo orb — top right */}
    <div className="glw-orb" style={{
      top:'-140px',right:'-100px',width:'580px',height:'580px',
      background:'radial-gradient(circle,rgba(99,102,241,0.07) 0%,transparent 65%)',
    }}/>
    {/* Purple orb — bottom left */}
    <div className="glw-orb glw-orb-2" style={{
      bottom:'-100px',left:'12%',width:'440px',height:'440px',
      background:'radial-gradient(circle,rgba(139,92,246,0.055) 0%,transparent 65%)',
    }}/>
    {/* Cyan accent — mid left */}
    <div className="glw-orb glw-orb-3" style={{
      top:'38%',left:'-60px',width:'300px',height:'300px',
      background:'radial-gradient(circle,rgba(6,182,212,0.04) 0%,transparent 65%)',
    }}/>
    {/* Circuit decoration */}
    <svg style={{position:'absolute',top:0,right:0,opacity:0.045,pointerEvents:'none'}} width="320" height="220" viewBox="0 0 320 220">
      <line x1="0"   y1="45"  x2="220" y2="45"  stroke="#6366F1" strokeWidth="1"/>
      <line x1="220" y1="45"  x2="220" y2="130" stroke="#6366F1" strokeWidth="1"/>
      <line x1="220" y1="130" x2="320" y2="130" stroke="#6366F1" strokeWidth="1"/>
      <line x1="90"  y1="45"  x2="90"  y2="0"   stroke="#6366F1" strokeWidth="1"/>
      <line x1="220" y1="88"  x2="290" y2="88"  stroke="#8B5CF6" strokeWidth="1"/>
      <line x1="155" y1="45"  x2="155" y2="75"  stroke="#8B5CF6" strokeWidth="1"/>
      <line x1="155" y1="75"  x2="320" y2="75"  stroke="#8B5CF6" strokeWidth="1"/>
      <line x1="0"   y1="175" x2="80"  y2="175" stroke="#06B6D4" strokeWidth="1"/>
      <line x1="80"  y1="175" x2="80"  y2="220" stroke="#06B6D4" strokeWidth="1"/>
      <circle cx="90"  cy="45"  r="3.5" fill="#6366F1"/>
      <circle cx="220" cy="45"  r="3.5" fill="#6366F1"/>
      <circle cx="220" cy="130" r="3.5" fill="#8B5CF6"/>
      <circle cx="220" cy="88"  r="2.5" fill="#8B5CF6"/>
      <circle cx="155" cy="75"  r="2.5" fill="#8B5CF6"/>
      <circle cx="80"  cy="175" r="2.5" fill="#06B6D4"/>
    </svg>
  </div>
);

const REVENUE_DATA = Array.from({length:60},(_,i)=>({date:i, revenue: Math.round(3000 + i*50 + Math.random()*500)}));

const Card = ({ children, className = "", metric }) => (
  <motion.div 
    className={`glw-card bg-[#0F0F1E] border border-[#1E1E3A] rounded-2xl p-6 shadow-xl relative overflow-hidden ${className}`}
  >
    {metric && (
      <svg style={{position:'absolute',top:'10px',right:'10px',opacity:0.18}} width="32" height="32" viewBox="0 0 32 32">
        {[0,1,2].map(r=>[0,1,2].map(c=>(
          <circle key={`${r}-${c}`} cx={c*12+4} cy={r*12+4} r="1.5" fill={metric.color || DS.brand.primary}/>
        )))}
      </svg>
    )}
    {children}
    {metric && (
      <div className="absolute bottom-0 left-0 right-0 h-[1px] opacity-0 transition-opacity duration-300 group-hover:opacity-100" 
           style={{ background: `linear-gradient(90deg, transparent, ${metric.color || DS.brand.primary}, transparent)` }} />
    )}
  </motion.div>
);

const Toggle = ({ checked, onChange, disabled = false }) => (
  <div
    onClick={!disabled ? onChange : undefined}
    className="glw-toggle-track"
    style={{
      background: checked ? '#6366F1' : '#1E1E3A',
      boxShadow:  checked ? '0 0 12px rgba(99,102,241,0.4)' : 'none',
      opacity:    disabled ? 0.5 : 1,
      cursor:     disabled ? 'not-allowed' : 'pointer',
    }}
  >
    <div
      className="glw-toggle-thumb"
      style={{ left: checked ? '21px' : '3px' }}
    />
  </div>
);

const ProgressBar = ({ value, max, color = '#6366F1' }) => {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="glw-progress-track">
      <div
        className="glw-progress-fill"
        style={{
          width:      `${pct}%`,
          background: pct > 80
            ? 'linear-gradient(90deg, #F59E0B, #EF4444)'
            : pct > 60
              ? 'linear-gradient(90deg, #6366F1, #F59E0B)'
              : 'linear-gradient(90deg, #6366F1, #8B5CF6)',
        }}
      />
    </div>
  );
};

const Skeleton = ({ w = '100%', h = 16, r = 6 }) => (
  <div className="glw-skeleton" style={{ width: w, height: h, borderRadius: r }} />
);

const ActivityItem = ({ item }) => (
  <div className="glw-activity-item">
    <div style={{
      width:'32px', height:'32px', borderRadius:'8px', flexShrink:0,
      background: `${item.color}14`,
      border:     `1px solid ${item.color}22`,
      display:'flex', alignItems:'center', justifyContent:'center',
    }}>
      <item.Icon size={14} style={{ color: item.color }} />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-[13px] font-medium text-[#F1F1F8] truncate">{item.title}</p>
      <p className="text-[11px] text-[#6B6B88]">{item.desc}</p>
    </div>
    {item.amount && (
      <span className="glw-mono" style={{ color: DS.semantic.success, fontSize:'12px', fontWeight:'600', marginLeft:'auto', flexShrink:0 }}>
        {item.amount}
      </span>
    )}
    <span style={{ fontSize:'11px', color:'#3D3D55', flexShrink:0, marginLeft: item.amount ? '8px' : 'auto' }}>
      {item.time}
    </span>
  </div>
);

const ProfilePanel = ({ isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[440px] bg-[#111128] border border-[#1E1E3A] rounded-[24px] p-8 z-[101] shadow-[0_32px_80px_rgba(0,0,0,0.8)]"
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center text-2xl font-black text-white shadow-[0_0_24px_rgba(99,102,241,0.25)] mb-4">
              AR
            </div>
            <h2 className="text-xl font-bold text-[#F1F1F8]">Alex Riviera</h2>
            <p className="text-sm text-[#6B6B88] mt-1">Chief Executive Officer</p>
            
            <div className="grid grid-cols-2 gap-3 w-full mt-8">
              {[
                { l: 'Store status', v: 'Active', c: DS.semantic.success },
                { l: 'Plan', v: 'Enterprise', c: DS.brand.primary },
                { l: 'Regions', v: 'Global', c: DS.semantic.info },
                { l: 'AI Agent', v: 'Optimized', c: DS.semantic.warning }
              ].map(stat => (
                <div key={stat.l} className="bg-[#0A0A18] border border-[#1E1E3A] rounded-xl p-4">
                  <p className="text-[10px] font-bold text-[#6B6B88] uppercase tracking-wider mb-1">{stat.l}</p>
                  <p className="text-sm font-bold" style={{ color: stat.c }}>{stat.v}</p>
                </div>
              ))}
            </div>

            <div className="w-full mt-8 pt-6 border-t border-[#1E1E3A] flex gap-3">
              <button className="glw-btn glw-btn-ghost flex-1">Settings</button>
              <button className="glw-btn glw-btn-primary flex-1">View Billing</button>
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

const App = () => {
  const [activePage, setActivePage] = useState('overview');
  const [showProfile, setShowProfile] = useState(false);
  const [loading, setLoading] = useState(false);

  // Mock loading sequence
  React.useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, [activePage]);

  const activity = [
    { title: 'New Order #8241', desc: 'Beauty Bundle (3 items)', time: '2m ago', amount: '+$124.50', Icon: Package, color: DS.semantic.info },
    { title: 'AI Optimization', desc: 'Campaign "Summer Glow" updated', time: '14m ago', Icon: Zap, color: DS.semantic.warning },
    { title: 'New Customer', desc: 'sarah.j@example.com joined', time: '28m ago', Icon: Users, color: DS.semantic.success },
    { title: 'Stock Alert', desc: 'Hydrating Serum is low', time: '1h ago', Icon: Package, color: DS.semantic.danger },
  ];

  const nav = [
    {id:'overview', label:'Overview', Icon:Home},
    {id:'ai', label:'AI Command', Icon:Bot},
    {id:'analytics', label:'Analytics', Icon:BarChart2},
    {id:'marketing', label:'Marketing', Icon:Megaphone},
    {id:'products', label:'Products', Icon:Package},
    {id:'customers', label:'Customers', Icon:Users},
    {id:'automations', label:'Automations', Icon:Zap},
    {id:'settings', label:'Settings', Icon:Settings},
  ];

  const metrics = [
    {l:'Revenue', v:'$284,920', color: DS.semantic.info},
    {l:'Orders', v:'3,847', color: DS.semantic.success},
    {l:'Conv. Rate', v:'3.24%', color: DS.semantic.warning},
    {l:'ROAS', v:'4.7x', color: DS.semantic.pink}
  ];

  return (
    <div className="flex h-screen bg-[#07070F] text-[#A0A0B8] font-sans selection:bg-indigo-500/30">
      <TechBackground />
      
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-[#0D0D1A] to-[#090914] border-r border-[#1E1E3A] flex flex-col z-20 shadow-[4px_0_32px_rgba(0,0,0,0.5)]">
        <div className="p-6 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] rounded-[14px] flex items-center justify-center font-black text-white shadow-[0_0_24px_rgba(99,102,241,0.25)] text-xl">G</div>
            <div>
              <h1 className="font-extrabold text-[#F1F1F8] text-[17px] tracking-tight leading-none">Glowify AI</h1>
              <p className="text-[11px] text-[#6B6B88] font-semibold tracking-[0.06em] mt-1 uppercase">Commerce OS</p>
            </div>
          </div>
        </div>
        
        <nav className="flex flex-col gap-1 flex-1 px-2">
          {nav.map(({id, label, Icon}) => (
            <button 
              key={id} 
              onClick={() => setActivePage(id)} 
              className={`glw-nav-item ${activePage === id ? 'active' : ''}`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4">
          <div 
            onClick={() => setShowProfile(true)}
            className="bg-indigo-500/5 border border-indigo-500/10 rounded-xl p-3 flex items-center gap-3 cursor-pointer hover:bg-indigo-500/10 transition-colors group"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center font-bold text-white shadow-lg group-hover:shadow-indigo-500/40 transition-all">A</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-[#F1F1F8] truncate">Alex Riviera</p>
              <p className="text-[10px] text-[#6B6B88] font-medium">Pro Plan</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
        {/* Topbar */}
        <header className="h-[72px] bg-[#07070F]/85 backdrop-blur-xl border-bottom border-[#1E1E3A] flex items-center justify-between px-8 sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-[#F1F1F8] tracking-tight">Good morning, Alex 👋</h2>
            <div className="flex items-center gap-2 bg-emerald-500/5 border border-emerald-500/20 rounded-full px-3 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 glw-pulse" />
              <span className="text-[11px] font-bold text-emerald-400 tracking-wider uppercase">Live</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-[#0A0A18] border border-[#1E1E3A] rounded-lg px-3 py-1.5 mr-2">
              <Zap size={14} className="text-amber-400" />
              <span className="text-xs font-bold text-[#F1F1F8] ml-1">AI Agent Active</span>
            </div>
            <button className="glw-btn-icon"><Bot size={18} /></button>
            <button className="glw-btn-icon" onClick={() => setShowProfile(true)}><Settings size={18} /></button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activePage} 
              className="page-enter p-8 min-h-full"
            >
              <div className="grid grid-cols-4 gap-6 mb-8">
                {metrics.map((m, idx) => (
                  <Card key={m.l} metric={m} className={`stagger-${idx + 1}`}>
                    <p className="text-[11px] font-semibold text-[#6B6B88] tracking-wider uppercase">{m.l}</p>
                    {loading ? (
                      <div className="mt-4 space-y-2">
                        <Skeleton h={32} w="80%" />
                        <Skeleton h={14} w="40%" />
                      </div>
                    ) : (
                      <div className="flex items-baseline gap-2 mt-2">
                        <p className="text-[26px] font-bold text-[#F1F1F8] glw-mono tracking-tighter">{m.v}</p>
                        <span className="text-[11px] font-bold text-emerald-400">+12.5%</span>
                      </div>
                    )}
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 space-y-6 stagger-5">
                  <Card>
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h3 className="text-[15px] font-bold text-[#F1F1F8] tracking-tight">Revenue Trend</h3>
                        <p className="text-xs text-[#6B6B88] mt-1">Daily platform revenue across all channels</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="glw-btn-ghost glw-btn-sm">1D</button>
                        <button className="glw-btn-primary glw-btn-sm">7D</button>
                        <button className="glw-btn-ghost glw-btn-sm">30D</button>
                      </div>
                    </div>
                    
                    <div className="h-[300px] w-full">
                      {loading ? (
                        <div className="h-full w-full bg-[#0A0A18] rounded-xl flex items-end p-6 gap-2">
                          {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                            <Skeleton key={i} h={`${h}%`} w="100%" />
                          ))}
                        </div>
                      ) : (
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={REVENUE_DATA}>
                            <defs>
                              <linearGradient id="grad-revenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%"  stopColor="#6366F1" stopOpacity={0.22}/>
                                <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <XAxis 
                              dataKey="date" 
                              tick={DS.chart.xAxis.tick} 
                              tickLine={DS.chart.xAxis.tickLine} 
                              axisLine={DS.chart.xAxis.axisLine} 
                              tickMargin={DS.chart.xAxis.tickMargin}
                              hide={false}
                            />
                            <Tooltip
                              contentStyle={DS.chart.tooltip.contentStyle}
                              cursor={DS.chart.tooltip.cursor}
                              labelStyle={DS.chart.tooltip.labelStyle}
                            />
                            <Area 
                              type="monotone" 
                              dataKey="revenue" 
                              stroke="#6366F1" 
                              strokeWidth={2}
                              fill="url(#grad-revenue)" 
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      )}
                    </div>
                  </Card>

                  <Card>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-[15px] font-bold text-[#F1F1F8] tracking-tight">Recent Activity</h3>
                      <button className="text-xs font-semibold text-[#818CF8] hover:text-[#6366F1] transition-colors">View All</button>
                    </div>
                    <div className="space-y-1">
                      {loading ? [1,2,3,4].map(i => (
                        <div key={i} className="flex items-center gap-4 p-3">
                          <Skeleton h={32} w={32} r={8} />
                          <div className="flex-1 space-y-2">
                            <Skeleton h={14} w="60%" />
                            <Skeleton h={10} w="30%" />
                          </div>
                        </div>
                      )) : activity.map((item, i) => (
                        <ActivityItem key={i} item={item} />
                      ))}
                    </div>
                  </Card>
                </div>

                <div className="space-y-6 stagger-6">
                  {/* Premium AI Summary Card */}
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(99,102,241,0.35) 0%, rgba(139,92,246,0.2) 50%, rgba(30,30,58,0.25) 100%)',
                    borderRadius: '20px',
                    padding: '1.5px',
                    boxShadow: '0 0 40px rgba(99,102,241,0.1)',
                  }}>
                    <div style={{
                      background: 'linear-gradient(135deg, #0F0F1E 0%, #0D0D1C 100%)',
                      borderRadius: '18.5px',
                      padding: '24px',
                      position: 'relative',
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        display:'inline-flex', alignItems:'center', gap:'6px',
                        background:'rgba(99,102,241,0.08)', border:'1px solid rgba(99,102,241,0.2)',
                        borderRadius:'6px', padding:'4px 10px', marginBottom:'16px',
                      }}>
                        <span style={{width:'5px',height:'5px',borderRadius:'50%',background:'#10B981'}} className="glw-pulse"/>
                        <span style={{fontSize:'10px',fontWeight:'700',color:'#6366F1',letterSpacing:'0.1em',fontFamily:"'JetBrains Mono',monospace"}}>
                          AI ANALYSIS ACTIVE
                        </span>
                      </div>

                      <div className="space-y-6">
                        {loading ? (
                          <>
                            <Skeleton h={60} w="100%" r={12} />
                            <Skeleton h={30} w="100%" r={8} />
                            <Skeleton h={20} w="100%" r={8} />
                          </>
                        ) : (
                          <>
                            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4">
                              <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2">Growth Opportunity</p>
                              <p className="text-[13px] text-[#F1F1F8] leading-relaxed">Inventory for <span className="text-emerald-400 font-bold">"Velvet Matte Lipstick"</span> is low. Replenishing now could capture <span className="text-white font-bold">$4.2k</span> in missed revenue.</p>
                            </div>
                            
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <span className="text-xs font-medium text-[#6B6B88]">Monthly Goal</span>
                                <span className="text-xs font-bold text-[#F1F1F8]">84%</span>
                              </div>
                              <ProgressBar value={84} max={100} />
                            </div>

                            <div className="pt-4 border-t border-[#1E1E3A]">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                                  <Zap size={16} className="text-indigo-400" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-xs font-bold text-[#F1F1F8]">AI Agent Optimization</p>
                                  <p className="text-[11px] text-[#6B6B88]">Reduced CAC by 18% today</p>
                                </div>
                              </div>
                            </div>
                            
                            <button className="glw-btn glw-btn-primary w-full mt-2">
                              Execute AI Recommendations
                              <ArrowRight size={14} />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <Card>
                    <h3 className="text-[15px] font-bold text-[#F1F1F8] tracking-tight mb-4">Integrations</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {['Shopify', 'Stripe', 'Meta', 'TikTok'].map(plat => (
                        <div key={plat} className="flex items-center gap-2 bg-[#0A0A18] border border-[#1E1E3A] rounded-lg p-2.5">
                          <div className="w-5 h-5 rounded bg-slate-800" />
                          <span className="text-[11px] font-bold text-[#A0A0B8]">{plat}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <ProfilePanel isOpen={showProfile} onClose={() => setShowProfile(false)} />
    </div>
  );
};

export default App;

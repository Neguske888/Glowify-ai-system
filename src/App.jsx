import React, { useState, useEffect, useMemo } from 'react';
import { 
  Zap, Bot, Activity, BarChart3, TestTube2, Settings, Search, Bell, 
  ChevronDown, Globe, CreditCard, LogOut, TrendingUp, AlertCircle, 
  CheckCircle2, Play, Pause, RefreshCw, X, ArrowRight, Shield, 
  Cpu, Database, LayoutGrid, Terminal, Download, Plus, Mail, MessageSquare, 
  Eye, EyeOff, Trash2, Clock, ZapOff, Users, Menu, RefreshCcw
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

/**
 * GLOWIFY AI - PREMIUM AI-POWERED SHOPIFY DASHBOARD
 * World-class dashboard with Unified Design System and Calm Technical Aesthetics.
 */

// --- COLOR & DESIGN SYSTEM TOKENS ---
const DESIGN_TOKENS = {
  bg: {
    base: '#07070F',        // deepest background
    surface: '#0D0D1A',     // page background
    card: '#111122',        // card background
    cardHover: '#141428',   // card hover state
    overlay: '#1A1A2E',     // modals, panels
    input: '#0A0A18',       // input fields
    subtle: '#0F0F1E',      // subtle sections
  },
  border: {
    default: '#1E1E3A',     // standard border
    subtle: '#16163A',      // very subtle border
    focus: '#6366F1',       // focused input border
    glow: 'rgba(99,102,241,0.3)', // glowing border
  },
  brand: {
    primary: '#6366F1',     // indigo primary
    primaryHover: '#5558E8',
    secondary: '#8B5CF6',   // purple secondary
    gradient: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
    gradientSubtle: 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(139,92,246,0.15) 100%)',
  },
  semantic: {
    success: '#10B981',
    successBg: 'rgba(16,185,129,0.08)',
    successBorder: 'rgba(16,185,129,0.2)',
    warning: '#F59E0B',
    warningBg: 'rgba(245,158,11,0.08)',
    warningBorder: 'rgba(245,158,11,0.2)',
    danger: '#EF4444',
    dangerBg: 'rgba(239,68,68,0.08)',
    dangerBorder: 'rgba(239,68,68,0.2)',
    info: '#3B82F6',
    infoBg: 'rgba(59,130,246,0.08)',
    infoBorder: 'rgba(59,130,246,0.2)',
  },
  text: {
    primary: '#F1F1F8',     // headings
    secondary: '#A0A0B8',   // body
    muted: '#6B6B88',       // labels, captions
    ghost: '#3D3D55',       // placeholder, disabled
    accent: '#818CF8',      // indigo text
  },
  shadow: {
    card: '0 1px 3px rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.3)',
    cardHover: '0 4px 12px rgba(0,0,0,0.5), 0 16px 40px rgba(0,0,0,0.4)',
    glow: '0 0 20px rgba(99,102,241,0.15)',
    glowStrong: '0 0 40px rgba(99,102,241,0.25)',
    button: '0 4px 16px rgba(99,102,241,0.3)',
    buttonHover: '0 8px 24px rgba(99,102,241,0.45)',
  },
};

// --- UNIVERSAL CHART THEME ---
const chartTheme = {
  CartesianGrid: {
    strokeDasharray: '3 3',
    stroke: 'rgba(255,255,255,0.04)',
    vertical: false,
  },
  XAxis: {
    tick: { fill: '#6B6B88', fontSize: 11, fontFamily: 'Inter' },
    tickLine: false,
    axisLine: false,
    tickMargin: 8,
  },
  YAxis: {
    tick: { fill: '#6B6B88', fontSize: 11, fontFamily: 'Inter' },
    tickLine: false,
    axisLine: false,
    tickMargin: 8,
    width: 48,
  },
  Tooltip: {
    contentStyle: {
      background: '#1A1A2E',
      border: '1px solid #2E2E4A',
      borderRadius: '12px',
      color: '#F1F1F8',
      fontSize: '13px',
      fontFamily: 'Inter',
      padding: '10px 14px',
      boxShadow: '0 16px 40px rgba(0,0,0,0.6)',
    },
    cursor: { stroke: 'rgba(99,102,241,0.3)', strokeWidth: 1, strokeDasharray: '4 2' },
    labelStyle: { color: '#6B6B88', fontSize: '11px', marginBottom: '4px' },
  },
  AreaGradient: (id, color) => (
    <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor={color} stopOpacity={0.2}/>
      <stop offset="100%" stopColor={color} stopOpacity={0}/>
    </linearGradient>
  ),
  Bar: { radius: [4, 4, 0, 0] },
};

// --- SIDEBAR & ELEMENT STYLE CONSTANTS ---
const sidebarStyle = {
  background: 'linear-gradient(180deg, #0D0D1A 0%, #09091A 100%)',
  borderRight: '1px solid #1E1E3A',
  boxShadow: '4px 0 24px rgba(0,0,0,0.4)',
};

const navItemStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '10px 14px',
  borderRadius: '10px',
  cursor: 'pointer',
  color: '#6B6B88',
  fontSize: '13px',
  fontWeight: '500',
  transition: 'all 0.18s ease',
  position: 'relative',
  margin: '1px 8px',
  background: 'transparent',
  border: 'none',
  width: 'calc(100% - 16px)',
  textAlign: 'left',
};

const navItemActiveStyle = {
  ...navItemStyle,
  background: 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(139,92,246,0.08) 100%)',
  color: '#818CF8',
  fontWeight: '600',
  boxShadow: 'inset 0 0 0 1px rgba(99,102,241,0.2)',
};

const KPICardStyle = {
  background: 'linear-gradient(135deg, #111122 0%, #0F0F20 100%)',
  border: '1px solid #1E1E3A',
  borderRadius: '16px',
  padding: '20px',
  position: 'relative',
  overflow: 'hidden',
  cursor: 'default',
  transition: 'all 0.2s ease',
};

const KPICardHover = {
  border: '1px solid rgba(99,102,241,0.3)',
  transform: 'translateY(-2px)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(99,102,241,0.1)',
};

const aiSummaryCardStyle = {
  borderRadius: '20px',
  padding: '1px',
  background: 'linear-gradient(135deg, rgba(99,102,241,0.4) 0%, rgba(139,92,246,0.2) 50%, rgba(30,30,58,0.3) 100%)',
  boxShadow: '0 0 40px rgba(99,102,241,0.08)',
};

const aiSummaryInner = {
  background: 'linear-gradient(135deg, #111122 0%, #0D0D1E 100%)',
  borderRadius: '19px',
  padding: '24px',
};

const activityItemStyle = {
  display: 'flex', alignItems: 'center', gap: '12px',
  padding: '10px 8px',
  borderBottom: '1px solid rgba(30,30,58,0.5)',
  transition: 'background 0.15s ease',
  borderRadius: '8px',
};

const activityIconStyle = (color) => ({
  width: '32px', height: '32px', borderRadius: '8px', flexShrink: 0,
  background: `${color}15`,
  border: `1px solid ${color}25`,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
});

const topBarStyle = {
  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  padding: '16px 24px',
  borderBottom: '1px solid #1E1E3A',
  background: 'rgba(7,7,15,0.8)',
  backdropFilter: 'blur(12px)',
  position: 'sticky', top: 0, zIndex: 20,
};

// --- MOCK DATA ---
const INITIAL_METRICS = {
  dailyRevenue: 6840,
  revenueChange: 12.4,
  checkoutVelocity: 3.2,
  conversionRate: 4.7,
  activeSessions: 847,
  ordersToday: 92,
  avgOrderValue: 112,
  refunds: 3,
  aiActionsToday: 23,
  agentsRunning: 3,
  cartAbandonment: 68.4,
  avgSessionTime: '3m 42s',
  topProduct: 'Vitamin C Serum',
  lastOrderTime: '1 min ago',
  lastOrderAmount: 142,
};

const AGENTS_LIST = [
  { id: 'restock', name: 'Restock Guardian', type: 'Inventory', status: 'IDLE', progress: 0, runtime: '-', lastAction: 'Waiting for trigger', color: 'red' },
  { id: 'checkout', name: 'Checkout Rescue', type: 'Conversion', status: 'IDLE', progress: 0, runtime: '-', lastAction: 'Monitoring checkout flow', color: 'amber' },
  { id: 'winback', name: 'Winback Emailer', type: 'Marketing', status: 'RUNNING', progress: 67, runtime: '2h 4m', lastAction: 'Sent batch 7 of 12', color: 'violet' },
  { id: 'pricing', name: 'Pricing Optimizer', type: 'Revenue', status: 'COMPLETED', progress: 100, runtime: '12m', lastAction: 'Updated 14 SKUs', color: 'cyan' },
  { id: 'seo', name: 'SEO Meta Updater', type: 'SEO', status: 'IDLE', progress: 0, runtime: '-', lastAction: 'Scan pending', color: 'violet' },
  { id: 'review', name: 'Review Aggregator', type: 'Reputation', status: 'QUEUED', progress: 0, runtime: '-', lastAction: 'Position 2 in queue', color: 'amber' },
];

const OPPORTUNITIES = [
  {
    id: 1,
    title: 'Stockout Risk Detected',
    priority: 'CRITICAL',
    agent: 'Restock Guardian',
    body: 'SKU GL-4471 (Radiance Serum 30ml) trending to 0 units in ~6 hours based on current sell velocity of 4.2 units/hour.',
    metrics: { stock: '24 units', velocity: '4.2/hr', eta: '5.7h' },
    impact: '~$2,800 revenue at risk',
    agentId: 'restock'
  },
  {
    id: 2,
    title: 'Checkout Abandonment Spike',
    priority: 'HIGH',
    agent: 'Checkout Rescue',
    body: '23% increase in abandonment at payment step detected over last 2 hours. 87 carts abandoned.',
    metrics: { abandoned: '87', value: '$4,350', delta: '+23%' },
    impact: '~$4,350 recoverable',
    agentId: 'checkout'
  },
  {
    id: 3,
    title: 'SEO Quick Win Opportunity',
    priority: 'OPPORTUNITY',
    agent: 'SEO Meta Updater',
    body: '32 product pages have meta descriptions under 70 chars. Updating can improve CTR by 8-15%.',
    metrics: { pages: '32', impact: '+11%', eta: '8min' },
    impact: 'Est. +11% CTR lift',
    agentId: 'seo'
  }
];

const SYSTEM_LOG_POOL = [
  "✅ Shopify webhook: order.created #4821 — $127.00",
  "🤖 Restock Guardian dispatched → worker pool",
  "✅ Pricing sync: 14 products updated",
  "⚡ BullMQ queue: 0 failed jobs",
  "✅ DB health check passed — 8ms",
  "🛍 New session: customer from US/California",
  "🤖 Winback Emailer: batch 7 sent — 103 emails",
  "✅ Shopify webhook: checkout.abandoned #cart_882",
  "⚠️ Redis memory: 68% used — within threshold",
  "✅ CDN: cache cleared for 3 updated products",
  "🤖 SEO Agent: Meta tags updated for 12 products",
  "✅ Gemini Gateway: Token limit 14% utilized",
  "🛒 Checkout Rescue: A/B variant B deployed",
  "📦 Inventory update: SKU GL-4471 reorder triggered"
];

// Sparkline curve generator
const generateSparkline = (base, variance, points = 12) =>
  Array.from({ length: points }, (_, i) => ({
    i,
    v: Math.max(0, base + (Math.random() - 0.4) * variance + (i / points) * (variance * 0.3))
  }));

const TODAY_TIMELINE = [
  { time: '09:14', event: 'AI paused Facebook Ad Set #7', type: 'ai', impact: '+$340 saved' },
  { time: '10:30', event: 'Restock PO sent to supplier', type: 'inventory', impact: '120 units' },
  { time: '11:22', event: 'Flash Sale email delivered', type: 'marketing', impact: '4,200 sent' },
  { time: '13:45', event: 'ROAS target hit on Google', type: 'ads', impact: '5.2x ROAS' },
  { time: '15:18', event: 'Checkout bug detected — Safari', type: 'alert', impact: 'Dev notified' },
  { time: '17:02', event: 'Win-back sequence triggered', type: 'automation', impact: '810 users' },
];

const REVENUE_TREND_DATA = Array.from({ length: 30 }, (_, i) => {
  const h = 4000 + Math.sin(i * 0.5) * 1500 + Math.random() * 800;
  return {
    name: `May ${i + 1}`,
    Revenue: Math.round(h),
  };
});

const AGENT_PERFORMANCE_DATA = [
  { name: 'M', Actions: 12 },
  { name: 'T', Actions: 18 },
  { name: 'W', Actions: 9 },
  { name: 'T', Actions: 24 },
  { name: 'F', Actions: 31 },
  { name: 'S', Actions: 19 },
  { name: 'S', Actions: 23 },
];

const AI_HEALTH_BREAKDOWN = [
  { metric: 'Revenue Trajectory', score: 96, status: 'excellent' },
  { metric: 'Ad Efficiency', score: 82, status: 'good' },
  { metric: 'Inventory Health', score: 71, status: 'warning' },
  { metric: 'Customer Retention', score: 88, status: 'good' },
  { metric: 'Automation Coverage', score: 94, status: 'excellent' },
];

// --- BRANDED VISUAL COMPONENTS ---

const IconWrapper = ({ icon: Icon, color, size = 18 }) => {
  const colorMap = {
    violet: '#8B5CF6',
    cyan: '#06B6D4',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444'
  };
  return (
    <div style={{ color: colorMap[color] || '#6B6B88' }}>
      <Icon size={size} />
    </div>
  );
};

const GridDotsSVG = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" style={{ position: 'absolute', top: '-4px', right: '-4px', opacity: 0.4, pointerEvents: 'none' }}>
    {[0,1,2,3].map(row => [0,1,2,3].map(col => (
      <circle key={`${row}-${col}`} cx={col*12+6} cy={row*12+6} r="1.5" fill="#6366F1"/>
    )))}
  </svg>
);

const CircuitPattern = () => (
  <svg width="120" height="80" viewBox="0 0 120 80" style={{ position: 'absolute', top: 0, right: 0, opacity: 0.06, pointerEvents: 'none' }}>
    <line x1="0" y1="20" x2="80" y2="20" stroke="#6366F1" strokeWidth="1"/>
    <line x1="80" y1="20" x2="80" y2="60" stroke="#6366F1" strokeWidth="1"/>
    <line x1="80" y1="60" x2="120" y2="60" stroke="#6366F1" strokeWidth="1"/>
    <line x1="30" y1="20" x2="30" y2="0" stroke="#6366F1" strokeWidth="1"/>
    <line x1="80" y1="40" x2="110" y2="40" stroke="#8B5CF6" strokeWidth="1"/>
    <circle cx="30" cy="20" r="3" fill="#6366F1"/>
    <circle cx="80" cy="20" r="3" fill="#6366F1"/>
    <circle cx="80" cy="60" r="3" fill="#8B5CF6"/>
    <circle cx="80" cy="40" r="2" fill="#8B5CF6"/>
  </svg>
);

const TechBackground = () => (
  <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
    <div className="animate-orb" style={{
      position: 'absolute', top: '-120px', right: '-80px',
      width: '500px', height: '500px',
      background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
      borderRadius: '50%',
    }}/>
    <div className="animate-orb" style={{
      position: 'absolute', bottom: '-100px', left: '200px',
      width: '400px', height: '400px',
      background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)',
      borderRadius: '50%',
      animationDelay: '3s',
    }}/>
    <div style={{
      position: 'absolute', inset: 0,
      backgroundImage: `
        linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px)
      `,
      backgroundSize: '48px 48px',
    }}/>
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0,
      height: '1px',
      background: 'linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.4) 50%, transparent 100%)',
    }}/>
  </div>
);

const Card = ({ children, style = {}, hoverable = false, glow = false, className = '' }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => hoverable && setHovered(true)}
      onMouseLeave={() => hoverable && setHovered(false)}
      style={{
        background: 'linear-gradient(135deg, #111122 0%, #0F0F1E 100%)',
        border: `1px solid ${hovered && hoverable ? 'rgba(99,102,241,0.25)' : '#1E1E3A'}`,
        borderRadius: '16px',
        padding: '20px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)',
        transform: hovered && hoverable ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hovered && hoverable
          ? '0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.1)'
          : '0 1px 3px rgba(0,0,0,0.3)',
        ...(glow && { boxShadow: '0 0 30px rgba(99,102,241,0.1), 0 1px 3px rgba(0,0,0,0.3)' }),
        ...style,
      }}
      className={className}
    >
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: '60px', height: '60px',
        background: 'radial-gradient(circle at top right, rgba(99,102,241,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }}/>
      {children}
    </div>
  );
};

const Badge = ({ type, label }) => {
  const styles = {
    success: { bg: 'rgba(16,185,129,0.1)', color: '#34D399', border: 'rgba(16,185,129,0.2)' },
    warning: { bg: 'rgba(245,158,11,0.1)', color: '#FCD34D', border: 'rgba(245,158,11,0.2)' },
    danger:  { bg: 'rgba(239,68,68,0.1)',  color: '#F87171', border: 'rgba(239,68,68,0.2)' },
    info:    { bg: 'rgba(99,102,241,0.1)', color: '#818CF8', border: 'rgba(99,102,241,0.2)' },
    neutral: { bg: 'rgba(107,107,136,0.1)', color: '#A0A0B8', border: 'rgba(107,107,136,0.2)' },
    live:    { bg: 'rgba(16,185,129,0.1)', color: '#34D399', border: 'rgba(16,185,129,0.2)' },
  };
  const s = styles[type] || styles.neutral;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '5px',
      background: s.bg, color: s.color,
      border: `1px solid ${s.border}`,
      borderRadius: '20px', padding: '3px 10px',
      fontSize: '11px', fontWeight: '600', letterSpacing: '0.02em',
    }}>
      {type === 'live' && (
        <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#10B981', display: 'inline-block', animation: 'ping 2s ease-in-out infinite' }}/>
      )}
      {label}
    </span>
  );
};

const Skeleton = ({ width = '100%', height = 16, borderRadius = 6, style = {} }) => (
  <div className="animate-shimmer" style={{
    width, height, borderRadius,
    background: 'linear-gradient(90deg, #111122 25%, #1A1A30 50%, #111122 75%)',
    backgroundSize: '200% 100%',
    ...style,
  }}/>
);

const CardSkeleton = () => (
  <div style={{ background: '#111122', border: '1px solid #1E1E3A', borderRadius: '16px', padding: '20px' }}>
    <Skeleton width="40%" height={12} style={{ marginBottom: 12 }} />
    <Skeleton width="60%" height={28} style={{ marginBottom: 8 }} />
    <Skeleton width="30%" height={10} />
  </div>
);

const EmptyState = ({ icon: Icon, title, desc, action, onActionClick }) => (
  <div style={{
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    justifyContent: 'center', padding: '48px 24px', textAlign: 'center',
    gap: '12px',
  }}>
    <div style={{
      width: '56px', height: '56px', borderRadius: '16px',
      background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.15)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      marginBottom: '4px',
    }}>
      {Icon && <Icon size={24} color="#6366F1" strokeWidth={1.5}/>}
    </div>
    <div style={{ fontSize: '15px', fontWeight: '600', color: '#F1F1F8' }}>{title}</div>
    <div style={{ fontSize: '13px', color: '#6B6B88', maxWidth: '260px', lineHeight: 1.6 }}>{desc}</div>
    {action && (
      <button className="btn-primary-new" style={{ marginTop: '8px', fontSize: '12px', padding: '8px 16px' }} onClick={onActionClick}>
        {action}
      </button>
    )}
  </div>
);

const PageHeader = ({ title, subtitle, actions }) => (
  <div style={{
    display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
    marginBottom: '24px', paddingBottom: '20px',
    borderBottom: '1px solid #1E1E3A',
  }}>
    <div>
      <h1 style={{
        fontSize: '22px', fontWeight: '700', color: '#F1F1F8',
        letterSpacing: '-0.02em', marginBottom: '4px',
      }}>{title}</h1>
      {subtitle && (
        <p style={{ fontSize: '13px', color: '#6B6B88', lineHeight: 1.5 }}>{subtitle}</p>
      )}
    </div>
    {actions && (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {actions}
      </div>
    )}
  </div>
);

const Sparkline = ({ data, trendUp }) => {
  const color = trendUp ? '#10B981' : '#EF4444';
  const width = 120;
  const height = 40;
  if (!data || data.length === 0) return null;
  const max = Math.max(...data.map(d => d.v));
  const min = Math.min(...data.map(d => d.v));
  const range = max - min || 1;
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((d.v - min) / range) * (height - 4) - 2;
    return `${x},${y}`;
  }).join(' ');

  const fillPoints = `${points} ${width},${height} 0,${height}`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block' }}>
      <defs>
        <linearGradient id={`sparkline-grad-${trendUp}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.15} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <polygon points={fillPoints} fill={`url(#sparkline-grad-${trendUp})`} />
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" />
    </svg>
  );
};

const KPICard = ({ label, value, trend, sub, sparkline, isUp, pulse }) => {
  const [hovered, setHovered] = useState(false);
  const isNeutral = trend === 'Live';
  
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...KPICardStyle,
        ...(hovered && KPICardHover)
      }}
    >
      <GridDotsSVG />

      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', zIndex: 2, position: 'relative' }}>
        <div>
          <div style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.08em', color: '#6B6B88', textTransform: 'uppercase', marginBottom: 8 }}>
            {label}
          </div>
          
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
            <span style={{ fontSize: '24px', fontWeight: 800, letterSpacing: '-0.03em', fontFamily: 'JetBrains Mono', color: '#F1F1F8' }}>
              {value}
            </span>
            {pulse && (
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', display: 'inline-block', animation: 'ping 2s ease-in-out infinite', alignSelf: 'center' }} />
            )}
          </div>
        </div>

        <div style={{ height: 40, margin: '12px 0 8px', display: 'flex', alignItems: 'center' }}>
          <Sparkline data={sparkline} trendUp={isUp} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
          <span style={{
            background: isNeutral ? 'rgba(99,102,241,0.1)' : (isUp ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)'),
            color: isNeutral ? '#818CF8' : (isUp ? '#34D399' : '#F87171'),
            border: `1px solid ${isNeutral ? 'rgba(99,102,241,0.2)' : (isUp ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)')}`,
            borderRadius: '20px', padding: '2px 8px', fontSize: '11px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 3
          }}>
            {isNeutral ? (
              <Zap size={10} />
            ) : (
              isUp ? <TrendingUp size={10} /> : <TrendingUp size={10} style={{ transform: 'rotate(180deg)' }} />
            )}
            {trend}
          </span>
          <span style={{ fontSize: 11, color: '#6B6B88' }}>{sub}</span>
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '2px',
        background: 'linear-gradient(90deg, transparent, #6366F1 50%, transparent)',
        transition: 'all 0.3s ease',
        opacity: hovered ? 1 : 0
      }} />
    </div>
  );
};

const Toast = ({ message, type, onDismiss }) => {
  const bgColor = {
    success: 'rgba(16, 185, 129, 0.9)',
    warning: 'rgba(245, 158, 11, 0.9)',
    error: 'rgba(239, 68, 68, 0.9)',
    info: 'rgba(99, 102, 241, 0.9)'
  }[type] || 'rgba(99, 102, 241, 0.9)';

  const Icon = {
    success: CheckCircle2,
    warning: AlertCircle,
    error: ZapOff,
    info: Bot
  }[type] || Bot;

  return (
    <div className="glass" style={{
      position: 'fixed', bottom: 24, right: 24, padding: '12px 20px',
      zIndex: 1000, display: 'flex', alignItems: 'center', gap: 12,
      background: bgColor, border: 'none', minWidth: 280,
      animation: 'slideUp 0.3s ease-out',
      boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
      borderRadius: '12px'
    }}>
      <Icon size={18} color="white" />
      <span style={{ fontSize: 14, fontWeight: 500, color: 'white' }}>{message}</span>
      <button onClick={onDismiss} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', marginLeft: 'auto' }}>
        <X size={16} />
      </button>
    </div>
  );
};

// --- MAIN APP COMPONENT ---

const App = () => {
  // Responsive hook
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth <= 1024;
  
  const sidebarWidth = isMobile ? 0 : (isTablet ? 72 : 260);

  // Global State
  const [activeTab, setActiveTab] = useState('operations');
  const [metrics, setMetrics] = useState(INITIAL_METRICS);
  const [agents, setAgents] = useState(AGENTS_LIST);
  const [toasts, setToasts] = useState([]);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [reportOpen, setReportOpen] = useState(null);
  const [systemLogs, setSystemLogs] = useState(SYSTEM_LOG_POOL.slice(0, 10));
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [simRunning, setSimRunning] = useState(false);
  const [simProgress, setSimProgress] = useState(0);
  const [selectedStrategy, setSelectedStrategy] = useState('balanced');
  const [showSimResults, setShowSimResults] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const [toggleSettings, setToggleSettings] = useState({
    cot: true,
    retry: true,
    logging: false,
    failures: true,
    slack: true,
    weekly: true,
    milestones: true,
    approvals: true,
    health: false
  });

  const [systemHealth, setSystemHealth] = useState({
    shopify: { latency: 34, status: 'CONNECTED' },
    redis: { depth: 3, status: 'HEALTHY' },
    gemini: { latency: 1.2, status: 'CONNECTED' },
    postgres: { conn: 12, status: 'CONNECTED' },
    webhook: { rate: 77, status: 'ACTIVE' },
    cdn: { hitRate: 97.3, status: 'HEALTHY' }
  });

  // Timers & Simulations
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        activeSessions: prev.activeSessions + (Math.random() > 0.5 ? 4 : -4)
      }));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => {
      const newLog = SYSTEM_LOG_POOL[Math.floor(Math.random() * SYSTEM_LOG_POOL.length)];
      setSystemLogs(prev => [newLog, ...prev.slice(0, 49)]);

      setSystemHealth(prev => ({
        ...prev,
        shopify: { ...prev.shopify, latency: Math.max(10, prev.shopify.latency + (Math.random() > 0.5 ? 2 : -2)) }
      }));
    }, 6000);
    return () => clearInterval(interval);
  }, [autoRefresh]);

  // Sparkline Memo Curves
  const sparklineData = useMemo(() => ({
    revenue: generateSparkline(6000, 800, 12),
    orders: generateSparkline(80, 15, 12),
    velocity: generateSparkline(3, 0.8, 12),
    conversion: generateSparkline(4.5, 0.6, 12),
    visitors: generateSparkline(820, 40, 12),
    abandonment: generateSparkline(68, 5, 12),
  }), []);

  // Action Dispatchers
  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const handleDeployAgent = (agentId) => {
    setAgents(prev => prev.map(a => 
      a.id === agentId ? { ...a, status: 'RUNNING', progress: 0, runtime: 'Initializing...' } : a
    ));
    addToast(`Agent ${agentId} deployed to worker pool`, 'success');

    let prog = 0;
    const interval = setInterval(() => {
      prog += 5;
      setAgents(prev => prev.map(a => 
        a.id === agentId ? { ...a, progress: prog, runtime: 'Just started' } : a
      ));
      if (prog >= 100) {
        clearInterval(interval);
        setAgents(prev => prev.map(a => 
          a.id === agentId ? { ...a, status: 'RUNNING', progress: 100, runtime: 'Active' } : a
        ));
      }
    }, 150);
  };

  const runSimulation = () => {
    setSimRunning(true);
    setSimProgress(0);
    setShowSimResults(false);
    
    const interval = setInterval(() => {
      setSimProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setSimRunning(false);
          setShowSimResults(true);
          addToast("Simulation complete — results ready", 'info');
          return 100;
        }
        return prev + 2;
      });
    }, 120);
  };

  // --- SUB-RENDERS FOR CLEAN DESIGN ---
  
  const SidebarContent = () => (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32, paddingLeft: isTablet ? 8 : 4 }}>
        <div style={{ 
          width: 32, height: 32, borderRadius: '50%', 
          background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)', 
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0
        }}>
          <Zap size={18} color="white" fill="white" />
        </div>
        {!isTablet && (
          <h1 style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', color: '#F1F1F8' }}>Glowify AI</h1>
        )}
      </div>

      {!isTablet && (
        <div style={{
          background: 'rgba(99,102,241,0.05)',
          border: '1px solid rgba(99,102,241,0.1)',
          borderRadius: '12px',
          padding: '12px',
          marginBottom: '24px'
        }}>
          <div style={{ color: DESIGN_TOKENS.text.muted, fontSize: 11, marginBottom: 4, fontWeight: 600, letterSpacing: '0.05em' }}>STORE:</div>
          <div style={{ fontWeight: 600, fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: DESIGN_TOKENS.text.secondary }}>serenova-global.myshopify.com</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
            <span style={{ width: 6, height: 6, background: '#10B981', borderRadius: '50%', display: 'inline-block', animation: 'ping 2s ease-in-out infinite' }}></span>
            <span style={{ color: '#10b981', fontSize: 12, fontWeight: 500 }}>Connected</span>
          </div>
        </div>
      )}
      {isTablet && (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
          <div style={{ width: 8, height: 8, background: '#10b981', borderRadius: '50%', animation: 'ping 2s ease-in-out infinite' }} />
        </div>
      )}

      <nav style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {[
          { id: 'operations', label: 'Operations Hub', icon: Zap },
          { id: 'agents', label: 'Agents Online', icon: Bot, badge: '3 Running' },
          { id: 'system', label: 'System Status', icon: Activity, badge: 'Clear' },
          { id: 'analytics', label: 'Analytics', icon: BarChart3, badge: '30d' },
          { id: 'simulation', label: 'Simulation Mode', icon: TestTube2, badge: 'NEW' },
          { id: 'settings', label: 'Settings', icon: Settings },
        ].map(item => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                if (isMobile) setMobileSidebarOpen(false);
              }}
              style={{
                ...(isActive ? navItemActiveStyle : navItemStyle),
                justifyContent: isTablet ? 'center' : 'flex-start',
                padding: isTablet ? '12px 0' : '10px 14px',
              }}
              title={item.label}
            >
              {isActive && (
                <div style={{
                  position: 'absolute', left: 0, top: '20%', height: '60%', width: '3px',
                  background: 'linear-gradient(180deg, #6366F1, #8B5CF6)',
                  borderRadius: '0 3px 3px 0'
                }}></div>
              )}
              
              <item.icon size={18} color={isActive ? '#818CF8' : '#6B6B88'} />
              {!isTablet && <span>{item.label}</span>}
              
              {!isTablet && item.badge && (
                <span style={{
                  marginLeft: 'auto', fontSize: 9, padding: '2px 6px', borderRadius: 4,
                  background: item.badge === 'NEW' ? '#F59E0B' : 'rgba(16, 185, 129, 0.2)',
                  color: item.badge === 'NEW' ? 'black' : '#10b981', fontWeight: 700
                }}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div style={{ height: '1px', background: 'rgba(255,255,255,0.04)', margin: '16px 14px' }}></div>

      {!isTablet && (
        <div style={{
          marginTop: 'auto',
          background: 'rgba(99,102,241,0.03)',
          border: '1px solid rgba(99,102,241,0.05)',
          borderRadius: '12px',
          padding: '12px',
          margin: '8px 0'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: DESIGN_TOKENS.text.muted, marginBottom: 6 }}>
            <span>Storage used</span>
            <span>2.4 GB / 10 GB</span>
          </div>
          <div style={{ height: 6, background: 'rgba(255,255,255,0.05)', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ width: '24%', height: '100%', background: 'var(--brand-primary, #6366F1)' }}></div>
          </div>
        </div>
      )}

      <div style={{ 
        marginTop: isTablet ? 'auto' : 8, 
        display: 'flex', alignItems: 'center', 
        gap: 10, padding: '8px 4px',
        justifyContent: isTablet ? 'center' : 'flex-start'
      }}>
        <div style={{ 
          width: 32, height: 32, borderRadius: '50%', 
          background: '#1E1E3A', display: 'flex', alignItems: 'center', justifyContent: 'center', 
          fontSize: 12, fontWeight: 600, color: '#F1F1F8',
          flexShrink: 0
        }}>SG</div>
        {!isTablet && (
          <div style={{ fontSize: 13, minWidth: 0 }}>
            <div style={{ fontWeight: 600, color: '#F1F1F8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Admin</div>
            <div style={{ color: '#6B6B88', fontSize: 11, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Serenova Global</div>
          </div>
        )}
      </div>

      {!isTablet && (
        <button 
          className="btn-primary-new" 
          style={{ width: '100%', fontSize: 13, padding: '12px', marginTop: 16 }}
          onClick={() => addToast("Redirecting to billing...", "info")}
        >
          Upgrade to Enterprise
        </button>
      )}
    </>
  );

  const TopBar = () => {
    const [refreshing, setRefreshing] = useState(false);

    const handleRefreshClick = () => {
      setRefreshing(true);
      addToast("Syncing latest live store data...", "info");
      setTimeout(() => {
        setRefreshing(false);
        addToast("Store metrics successfully updated", "success");
      }, 1000);
    };

    return (
      <div style={topBarStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 1 }}>
          {isMobile && (
            <button 
              className="btn-icon-new" 
              onClick={() => setMobileSidebarOpen(true)}
              style={{ flexShrink: 0 }}
            >
              <Menu size={18} />
            </button>
          )}

          <div style={{ position: 'relative', flex: isMobile ? 1 : 'none' }}>
            <Search size={16} color="#6B6B88" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              className="input-field"
              placeholder="Search products, agents, orders..."
              style={{ 
                width: isMobile ? '100%' : 320, 
                paddingLeft: 36, 
                height: 40,
                background: '#0A0A18',
                borderColor: '#1E1E3A'
              }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchOpen(true)}
              onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
            />
            {searchOpen && (
              <div className="glass" style={{ position: 'absolute', top: 48, left: 0, width: isMobile ? '100%' : 400, padding: 12, zIndex: 100, background: '#1A1A2E', borderColor: '#2E2E4A' }}>
                <div style={{ fontSize: 11, color: '#6B6B88', marginBottom: 8, textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>Recent Results</div>
                {[
                  { label: 'Restock Guardian', type: 'Agent' },
                  { label: '#4821 - Radiance Serum', type: 'Order' },
                  { label: 'Glow Toner 100ml', type: 'Product' }
                ]
                .filter(item => item.label.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((res, i) => (
                  <div 
                    key={i} 
                    style={{ display: 'flex', justifyContent: 'space-between', padding: 8, borderRadius: 6, cursor: 'pointer', color: '#A0A0B8' }} 
                    onMouseDown={() => addToast(`Opening ${res.label}...`, 'info')}
                    className="hover:bg-[rgba(99,102,241,0.08)] hover:text-[#818CF8]"
                  >
                    <span>{res.label}</span>
                    <span style={{ fontSize: 10, color: '#6B6B88' }}>{res.type}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {!isMobile && (
            <div style={{
              background: '#111122',
              border: '1px solid #1E1E3A',
              borderRadius: '8px',
              padding: '8px 12px',
              fontSize: '13px',
              color: '#A0A0B8',
              cursor: 'pointer',
              transition: 'all 0.18s ease',
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}
            className="hover:border-[rgba(99,102,241,0.3)] hover:text-[#818CF8]"
            onClick={() => addToast("Custom date selector opened", "info")}
            >
              <span>May 1, 2026 - May 21, 2026</span>
              <ChevronDown size={14} />
            </div>
          )}

          <button 
            className="btn-icon-new"
            onClick={handleRefreshClick}
            style={{ width: '34px', height: '34px' }}
          >
            <RefreshCw size={16} className={refreshing ? "animate-spin-smooth" : ""} />
          </button>

          <div style={{ position: 'relative' }}>
            <button className="btn-icon-new" style={{ width: 40, height: 40 }} onClick={() => setNotificationsOpen(!notificationsOpen)}>
              <Bell size={18} />
              <div style={{ position: 'absolute', top: 6, right: 6, width: 6, height: 6, background: '#EF4444', borderRadius: '50%' }}></div>
            </button>
            {notificationsOpen && (
              <div className="glass" style={{ position: 'absolute', top: 48, right: 0, width: 320, padding: 16, zIndex: 100, background: '#1A1A2E', borderColor: '#2E2E4A' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, alignItems: 'center' }}>
                  <span style={{ fontWeight: 600, color: '#F1F1F8' }}>Notifications</span>
                  <button style={{ background: 'transparent', border: 'none', color: '#6366F1', fontSize: 12, cursor: 'pointer', fontWeight: 600 }} onClick={() => setNotificationsOpen(false)}>Mark all read</button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    { msg: 'Stockout risk: SKU GL-4471 — 6h runway', time: '2 min ago', type: 'danger' },
                    { msg: 'Checkout abandonment +23% detected', time: '14 min ago', type: 'warning' },
                    { msg: 'Pricing Optimizer completed — +8.2% margin', time: '1h ago', type: 'success' },
                  ].map((n, i) => (
                    <div key={i} style={{ display: 'flex', gap: 12, fontSize: 13, borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: 8 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: n.type === 'danger' ? '#EF4444' : n.type === 'warning' ? '#F59E0B' : '#10B981', marginTop: 4, flexShrink: 0 }}></div>
                      <div>
                        <div style={{ color: '#A0A0B8', lineHeight: 1.4 }}>{n.msg}</div>
                        <div style={{ fontSize: 11, color: '#6B6B88', marginTop: 2 }}>{n.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div style={{ position: 'relative' }}>
            <button className="btn-ghost-new" style={{ gap: 8, padding: '0 8px 0 12px', height: 40, borderRadius: '8px' }} onClick={() => setUserMenuOpen(!userMenuOpen)}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)', fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600 }}>SG</div>
              <ChevronDown size={14} />
            </button>
            {userMenuOpen && (
              <div className="glass" style={{ position: 'absolute', top: 48, right: 0, width: 180, padding: 8, zIndex: 100, background: '#1A1A2E', borderColor: '#2E2E4A' }}>
                <button className="btn-ghost-new" style={{ width: '100%', justifyContent: 'flex-start', padding: 8, border: 'none' }} onClick={() => addToast("Profile settings loaded", "info")}><Users size={14} /> Profile</button>
                <button className="btn-ghost-new" style={{ width: '100%', justifyContent: 'flex-start', padding: 8, border: 'none' }} onClick={() => addToast("Billing portal loaded", "info")}><CreditCard size={14} /> Billing</button>
                <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', margin: '4px 0' }}></div>
                <button className="btn-ghost-new" style={{ width: '100%', justifyContent: 'flex-start', padding: 8, border: 'none', color: '#EF4444' }} onClick={() => addToast("Logged out", "info")}><LogOut size={14} /> Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // --- TAB PAGES ---

  const OperationsHub = () => {
    let gridCols = 'repeat(6, 1fr)';
    if (isMobile) {
      gridCols = 'repeat(2, 1fr)';
    } else if (isTablet) {
      gridCols = 'repeat(3, 1fr)';
    }

    return (
      <div>
        <PageHeader 
          title="Operations Hub" 
          subtitle="Real-time operational snapshot and active business intelligence"
          actions={
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn-ghost-new" onClick={() => addToast("Reports updated", "success")}><Download size={14} /> Export Report</button>
              <button className="btn-primary-new" onClick={() => setActiveTab('simulation')}><TestTube2 size={14} /> Run Simulation</button>
            </div>
          }
        />

        {/* KPI Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: gridCols, gap: '16px', marginBottom: '24px' }}>
          {[
            { label: 'Daily Revenue', value: `$${metrics.dailyRevenue.toLocaleString()}`, trend: '+12.4%', sub: 'vs yesterday', sparkline: sparklineData.revenue, isUp: true },
            { label: 'Orders Today', value: metrics.ordersToday.toString(), trend: '+8.2%', sub: 'vs yesterday', sparkline: sparklineData.orders, isUp: true },
            { label: 'Checkout Vel', value: `${metrics.checkoutVelocity}/min`, trend: 'Live', sub: 'Active checkouts', sparkline: sparklineData.velocity, isUp: true, pulse: true },
            { label: 'Conversion', value: `${metrics.conversionRate}%`, trend: '+0.3%', sub: 'vs last hour', sparkline: sparklineData.conversion, isUp: true },
            { label: 'Active Visitors', value: metrics.activeSessions.toString(), trend: 'Live', sub: 'Pulsing traffic', sparkline: sparklineData.visitors, isUp: true, pulse: true },
            { label: 'Cart Abandonment', value: `${metrics.cartAbandonment}%`, trend: '-2.4%', sub: 'Optimized by AI', sparkline: sparklineData.abandonment, isUp: false },
          ].map((k, i) => (
            <KPICard
              key={i}
              label={k.label}
              value={k.value}
              trend={k.trend}
              sub={k.sub}
              sparkline={k.sparkline}
              isUp={k.isUp}
              pulse={k.pulse}
            />
          ))}
        </div>

        {/* Supplementary Metrics Row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, fontSize: 12, color: '#6B6B88', background: 'rgba(255,255,255,0.01)', padding: '12px 20px', borderRadius: 99, marginBottom: 32, border: '1px solid #1E1E3A', width: 'fit-content' }}>
          <span>Today's Orders: <b style={{ color: '#F1F1F8', fontFamily: 'JetBrains Mono' }}>{metrics.ordersToday}</b></span>
          <span style={{ opacity: 0.3 }}>|</span>
          <span>Avg Order Value: <b style={{ color: '#F1F1F8', fontFamily: 'JetBrains Mono' }}>${metrics.avgOrderValue}</b></span>
          <span style={{ opacity: 0.3 }}>|</span>
          <span>Refunds: <b style={{ color: '#EF4444', fontFamily: 'JetBrains Mono' }}>{metrics.refunds}</b></span>
          <span style={{ opacity: 0.3 }}>|</span>
          <span>AI Actions Today: <b style={{ color: '#818CF8', fontFamily: 'JetBrains Mono' }}>{metrics.aiActionsToday}</b></span>
          <span style={{ opacity: 0.3 }}>|</span>
          <span>Agents Running: <b style={{ color: '#6366F1', fontFamily: 'JetBrains Mono' }}>{metrics.agentsRunning} of 6</b></span>
        </div>

        {/* AI Business Summary Card */}
        <div style={aiSummaryCardStyle} className="mb-[32px] animate-glow">
          <div style={aiSummaryInner} className="relative overflow-hidden">
            <CircuitPattern />
            <div style={{
              position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px',
              background: 'linear-gradient(180deg, #6366F1, #8B5CF6)'
            }}></div>

            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center', gap: 16 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', display: 'inline-block', animation: 'ping 1.5s infinite' }} />
                  <span className="text-mono" style={{ textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '11px', fontWeight: 600 }}>AI Analysis Active</span>
                </div>
                <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#F1F1F8', letterSpacing: '-0.02em', marginBottom: 6 }}>
                  Operations Summary
                </h2>
                <p style={{ fontSize: '13px', color: '#A0A0B8', lineHeight: 1.6, maxWidth: 640 }}>
                  Serenova Global performance is strong. AI automated routing has saved <b>$340</b> in ad set optimization, while checkout velocity shows normal patterns. Action needed on <b>SKU GL-4471</b> restock triggers.
                </p>
              </div>
              <button 
                className="btn-primary-new" 
                style={{ flexShrink: 0 }}
                onClick={() => addToast("Initiating system optimization review...", "info")}
              >
                <Zap size={14} /> Run Quick Action
              </button>
            </div>
          </div>
        </div>

        {/* Opportunities and Live Activity Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr', gap: 24 }}>
          {/* Opportunities Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F1F1F8' }}>Autonomous Opportunities</h2>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn-ghost-new" style={{ fontSize: 12, padding: '6px 12px' }} onClick={() => addToast("Filtering options...", "info")}>All <ChevronDown size={14} /></button>
                <button className="btn-icon-new" onClick={() => addToast("Refreshed opportunities feed", "info")}><RefreshCw size={14} /></button>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {OPPORTUNITIES.map(opp => {
                const agent = agents.find(a => a.id === opp.agentId);
                const priorityColor = opp.priority === 'CRITICAL' ? '#EF4444' : (opp.priority === 'HIGH' ? '#F59E0B' : '#8B5CF6');
                return (
                  <Card 
                    key={opp.id} 
                    hoverable={true}
                    style={{
                      borderLeft: `4px solid ${priorityColor}`,
                      padding: '24px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, alignItems: 'center' }}>
                        <h3 style={{ fontSize: 16, fontWeight: 700, color: '#F1F1F8' }}>{opp.title}</h3>
                        <Badge type={opp.priority === 'CRITICAL' ? 'danger' : (opp.priority === 'HIGH' ? 'warning' : 'info')} label={opp.priority} />
                      </div>
                      <div style={{ fontSize: 12, color: '#6B6B88', marginBottom: 12 }}>Agent: <b style={{ color: '#A0A0B8' }}>{opp.agent}</b></div>
                      <p style={{ fontSize: 13, color: '#A0A0B8', lineHeight: 1.5, marginBottom: 20 }}>{opp.body}</p>
                      
                      <div style={{ display: 'flex', gap: 16, marginBottom: 20, padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: 8, border: '1px solid #1E1E3A' }}>
                        {Object.entries(opp.metrics).map(([k, v]) => (
                          <div key={k} style={{ flex: 1 }}>
                            <div style={{ fontSize: 10, textTransform: 'uppercase', color: '#6B6B88', marginBottom: 4, fontWeight: 600, letterSpacing: '0.05em' }}>{k}</div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: '#F1F1F8', fontFamily: 'JetBrains Mono' }}>{v}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                        <div style={{ fontSize: 13, color: '#34D399', fontWeight: 600 }}>Impact: {opp.impact}</div>
                        <button 
                          className={agent.status === 'RUNNING' ? 'btn-ghost-new' : 'btn-primary-new'}
                          onClick={() => agent.status !== 'RUNNING' && handleDeployAgent(opp.agentId)}
                          disabled={agent.status === 'RUNNING'}
                          style={{ padding: '8px 16px', fontSize: 12 }}
                        >
                          {agent.status === 'RUNNING' ? (
                            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              <span className="animate-pulse-green" style={{ width: 6, height: 6, background: '#10B981', borderRadius: '50%' }}></span>
                              Running
                            </span>
                          ) : agent.runtime === 'Initializing...' ? (
                            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              <RefreshCw size={12} className="animate-spin-smooth" />
                              Initializing...
                            </span>
                          ) : (
                            `Deploy ${opp.agent.split(' ')[0]}`
                          )}
                        </button>
                      </div>

                      {agent.status === 'RUNNING' && (
                        <div style={{ marginTop: 16 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 6, color: '#6B6B88' }}>
                            <span>Processing optimization...</span>
                            <span style={{ fontFamily: 'JetBrains Mono', color: '#818CF8', fontWeight: 600 }}>{agent.progress}%</span>
                          </div>
                          <div style={{ height: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 10, overflow: 'hidden' }}>
                            <div style={{ width: `${agent.progress}%`, height: '100%', background: 'linear-gradient(90deg, #6366F1, #8B5CF6)', transition: 'width 0.3s ease' }}></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Activity Feed Section */}
          <Card style={{ padding: 24, alignSelf: 'start' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#F1F1F8' }}>Live Activity Feed</h3>
              <span className="badge badge-success" style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(16, 185, 129, 0.1)', color: '#34D399', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: 20, padding: '2px 8px', fontSize: 10, fontWeight: 600 }}>
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#10B981', display: 'inline-block', animation: 'ping 1.5s infinite' }} />
                Live
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {TODAY_TIMELINE.map((item, idx) => {
                let typeColor = '#6366F1';
                if (item.type === 'inventory') typeColor = '#F59E0B';
                else if (item.type === 'marketing') typeColor = '#8B5CF6';
                else if (item.type === 'ads') typeColor = '#06B6D4';
                else if (item.type === 'alert') typeColor = '#EF4444';
                else if (item.type === 'automation') typeColor = '#10B981';

                return (
                  <div key={idx} style={activityItemStyle} className="hover:bg-[rgba(99,102,241,0.04)]">
                    <div style={activityIconStyle(typeColor)}>
                      {item.type === 'ai' && <Cpu size={14} color={typeColor} />}
                      {item.type === 'inventory' && <Database size={14} color={typeColor} />}
                      {item.type === 'marketing' && <Mail size={14} color={typeColor} />}
                      {item.type === 'ads' && <TrendingUp size={14} color={typeColor} />}
                      {item.type === 'alert' && <AlertCircle size={14} color={typeColor} />}
                      {item.type === 'automation' && <Zap size={14} color={typeColor} />}
                    </div>
                    
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 500, color: '#F1F1F8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.event}</div>
                      <div style={{ fontSize: 11, color: '#6B6B88', marginTop: 2 }}>{item.impact}</div>
                    </div>

                    <div style={{ color: '#3D3D55', fontSize: 11, marginLeft: 'auto', flexShrink: 0, fontFamily: 'JetBrains Mono' }}>
                      {item.time}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    );
  };

  const AgentsOnline = () => (
    <div>
      <PageHeader
        title="Agent Control Center"
        subtitle="Manage and monitor your autonomous agent fleet"
        actions={
          <button className="btn-primary-new" onClick={() => addToast("Rule configuration opened", "info")}>
            <Plus size={18} /> Configure New Rule
          </button>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(6, 1fr)', gap: 16, marginBottom: 32 }}>
        {[
          { label: 'Running', val: 3, color: 'success' },
          { label: 'Idle', val: 2, color: 'neutral' },
          { label: 'Queued', val: 1, color: 'warning' },
          { label: 'Completed Today', val: 8, color: 'info' },
          { label: 'Success Rate', val: '94.2%', color: 'success' },
          { label: 'Avg Runtime', val: '24min', color: 'info' },
        ].map((s, i) => (
          <Card key={i} style={{ padding: 16 }}>
            <div style={{ fontSize: 11, color: '#6B6B88', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, marginBottom: 8 }}>{s.label}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: s.color === 'success' ? '#34D399' : (s.color === 'warning' ? '#FCD34D' : (s.color === 'info' ? '#818CF8' : '#A0A0B8')), fontFamily: 'JetBrains Mono' }}>{s.val}</div>
          </Card>
        ))}
      </div>

      <div className="glass" style={{ overflow: 'hidden', background: 'linear-gradient(135deg, #111122 0%, #0F0F1E 100%)', border: '1px solid #1E1E3A', borderRadius: 16, marginBottom: 40 }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #1E1E3A', display: 'flex', gap: 12 }}>
          {['All', 'Running', 'Idle', 'Queued', 'Completed'].map(f => (
            <button key={f} className={`btn-ghost-new ${f === 'All' ? 'border-[rgba(99,102,241,0.3)] text-[#818CF8]' : ''}`} style={{ fontSize: 13, padding: '6px 12px' }}>{f}</button>
          ))}
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: 700 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1E1E3A', color: '#6B6B88', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                <th style={{ padding: '16px 24px' }}>Agent Name</th>
                <th>Type</th>
                <th>Status</th>
                <th>Runtime</th>
                <th>Progress</th>
                <th>Last Action</th>
                <th style={{ padding: '16px 24px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {agents.map(a => (
                <tr key={a.id} style={{ borderBottom: '1px solid #1E1E3A', fontSize: 13 }} className="hover:bg-[rgba(255,255,255,0.01)]">
                  <td style={{ padding: '20px 24px', fontWeight: 600, color: '#F1F1F8' }}>{a.name}</td>
                  <td style={{ color: '#A0A0B8' }}>{a.type}</td>
                  <td>
                    <Badge 
                      type={a.status === 'RUNNING' ? 'success' : (a.status === 'QUEUED' ? 'warning' : (a.status === 'IDLE' ? 'neutral' : 'info'))} 
                      label={a.status} 
                    />
                  </td>
                  <td style={{ color: '#6B6B88', fontFamily: 'JetBrains Mono' }}>{a.runtime}</td>
                  <td style={{ width: 160 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ flex: 1, height: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 10, overflow: 'hidden' }}>
                        <div style={{ width: `${a.progress}%`, height: '100%', background: 'linear-gradient(90deg, #6366F1, #8B5CF6)' }}></div>
                      </div>
                      <span style={{ fontSize: 11, width: 30, color: '#6B6B88', fontFamily: 'JetBrains Mono', textAlign: 'right' }}>{a.progress}%</span>
                    </div>
                  </td>
                  <td style={{ color: '#A0A0B8', fontSize: 13 }}>{a.lastAction}</td>
                  <td style={{ padding: '20px 24px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                      {a.status === 'RUNNING' ? (
                        <button 
                          className="btn-icon-new"
                          style={{ width: 30, height: 30 }}
                          onClick={() => {
                            setAgents(prev => prev.map(ag => ag.id === a.id ? { ...ag, status: 'PAUSED' } : ag));
                            addToast(`Agent ${a.name} paused`, 'warning');
                          }}
                        >
                          <Pause size={12} />
                        </button>
                      ) : (
                        <button 
                          className="btn-icon-new"
                          style={{ width: 30, height: 30 }}
                          onClick={() => handleDeployAgent(a.id)}
                        >
                          <Play size={12} />
                        </button>
                      )}
                      <button 
                        className="btn-icon-new"
                        style={{ width: 30, height: 30 }}
                        onClick={() => setReportOpen(a.id)}
                      >
                        <Terminal size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Card style={{ padding: 24 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: '#F1F1F8', marginBottom: 24 }}>Agent Performance — Last 7 Days</h3>
        <div style={{ height: isMobile ? 160 : 200, width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={AGENT_PERFORMANCE_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid {...chartTheme.CartesianGrid} />
              <XAxis dataKey="name" {...chartTheme.XAxis} />
              <YAxis {...chartTheme.YAxis} />
              <Tooltip {...chartTheme.Tooltip} />
              <Bar dataKey="Actions" fill="#6366F1" radius={chartTheme.Bar.radius} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );

  const SystemStatus = () => {
    let healthGridCols = 'repeat(3, 1fr)';
    if (isMobile) {
      healthGridCols = '1fr';
    } else if (isTablet) {
      healthGridCols = 'repeat(2, 1fr)';
    }

    return (
      <div>
        <PageHeader
          title="Infrastructure Health"
          subtitle="Real-time check on backend microservices and external APIs"
          actions={
            <button className="btn-ghost-new" onClick={() => setAutoRefresh(!autoRefresh)}>
              <span className={autoRefresh ? "animate-pulse-green" : ""} style={{ width: 6, height: 6, background: autoRefresh ? '#10b981' : '#6B6B88', borderRadius: '50%', display: 'inline-block', marginRight: 6 }}></span>
              Auto-refresh: {autoRefresh ? 'ON' : 'OFF'}
            </button>
          }
        />

        <div style={{ padding: '16px 24px', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
          <CheckCircle2 size={24} color="#10b981" style={{ flexShrink: 0 }} />
          <div>
            <div style={{ fontWeight: 700, color: '#10b981', fontSize: 14 }}>All Systems Operational</div>
            <div style={{ fontSize: 12, color: 'rgba(16, 185, 129, 0.8)' }}>Last checked: Just now ({systemHealth.shopify.latency}ms latency)</div>
          </div>
        </div>

        {/* Health Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: healthGridCols, gap: 24, marginBottom: 32 }}>
          {[
            { label: 'Shopify API Connection', status: 'CONNECTED', metric: `${systemHealth.shopify.latency}ms`, sub: '99.98% Uptime', icon: Globe },
            { label: 'Redis / BullMQ Workers', status: 'HEALTHY', metric: `${systemHealth.redis.depth} Active`, sub: '4/4 Workers', icon: Cpu },
            { label: 'AI Model Gateway', status: 'CONNECTED', metric: '1.2s avg', sub: 'gemini-2.0-flash', icon: Zap },
            { label: 'PostgreSQL / Prisma', status: 'CONNECTED', metric: `${systemHealth.postgres.conn}/50`, sub: '8ms avg query', icon: Database },
            { label: 'Webhook Listener', status: 'ACTIVE', metric: `${systemHealth.webhook.rate}/hr`, sub: '0 failed today', icon: LayoutGrid },
            { label: 'CDN / Asset Delivery', status: 'HEALTHY', metric: '97.3%', sub: '12 edge nodes', icon: Globe },
          ].map((s, i) => (
            <Card key={i} style={{ padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#F1F1F8' }}>{s.label}</span>
                <IconWrapper icon={s.icon} color="cyan" size={16} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <Badge type="success" label={s.status} />
                <span className="mono" style={{ fontSize: 18, fontWeight: 600, color: '#F1F1F8', fontFamily: 'JetBrains Mono' }}>{s.metric}</span>
              </div>
              <div style={{ fontSize: 11, color: '#6B6B88', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>{s.sub}</span>
                <div style={{ width: 60, height: 4, background: 'rgba(16, 185, 129, 0.2)', borderRadius: 10, overflow: 'hidden' }}>
                  <div style={{ width: '80%', height: '100%', background: '#10b981' }}></div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Live Logs Console */}
        <Card style={{ padding: 0 }}>
          <div style={{ padding: '12px 20px', borderBottom: '1px solid #1E1E3A', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.01)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Terminal size={14} color="#6366F1" />
              <span style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#F1F1F8' }}>Live Event Feed</span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn-ghost-new" style={{ fontSize: 10, padding: '4px 8px' }} onClick={() => setSystemLogs([])}>Clear</button>
              <button className="btn-ghost-new" style={{ fontSize: 10, padding: '4px 8px' }} onClick={() => addToast("Logs downloaded successfully", "success")}><Download size={12} /> Export .log</button>
            </div>
          </div>
          <div className="mono" style={{ padding: 20, height: 300, overflowY: 'auto', fontSize: 12, display: 'flex', flexDirection: 'column', gap: 8, background: '#07070F' }}>
            {systemLogs.length === 0 ? (
              <EmptyState
                icon={Terminal}
                title="No Live Logs"
                desc="Wait for live store webhooks or trigger an agent cycle to inspect live events."
                action="Trigger Sync"
                onActionClick={() => {
                  const newLog = SYSTEM_LOG_POOL[Math.floor(Math.random() * SYSTEM_LOG_POOL.length)];
                  setSystemLogs([newLog]);
                  addToast("Forced single event sync", "success");
                }}
              />
            ) : (
              systemLogs.map((log, i) => {
                let logColor = '#A0A0B8';
                if (log.includes('⚠️')) logColor = '#FCD34D';
                else if (log.includes('✅')) logColor = '#34D399';
                else if (log.includes('🤖')) logColor = '#818CF8';
                return (
                  <div key={i} style={{ color: logColor }}>
                    <span style={{ color: '#3D3D55', marginRight: 12 }}>[{new Date().toLocaleTimeString()}]</span>
                    {log}
                  </div>
                );
              })
            )}
          </div>
        </Card>
      </div>
    );
  };

  const Analytics = () => {
    let analyticsGridCols = 'repeat(4, 1fr)';
    if (isMobile) {
      analyticsGridCols = 'repeat(2, 1fr)';
    } else if (isTablet) {
      analyticsGridCols = 'repeat(2, 1fr)';
    }

    let bottomGridCols = isMobile ? '1fr' : '1fr 340px';

    return (
      <div>
        <PageHeader
          title="Performance Analytics"
          subtitle="Inspect historical store records and direct AI contribution statistics"
          actions={
            <div style={{ display: 'flex', gap: 12 }}>
              <div className="glass" style={{ padding: 4, display: 'flex', background: 'rgba(255,255,255,0.02)', border: '1px solid #1E1E3A', borderRadius: 8 }}>
                {['7d', '30d', '90d'].map(d => (
                  <button key={d} className={`btn-ghost-new ${d === '30d' ? 'border-[rgba(99,102,241,0.3)] text-[#818CF8]' : ''}`} style={{ fontSize: 12, padding: '4px 10px', border: 'none' }}>{d}</button>
                ))}
              </div>
              <button className="btn-primary-new" onClick={() => addToast("Starting CSV export...", "info")}><Download size={16} /> Export CSV</button>
            </div>
          }
        />

        {/* Analytics KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: analyticsGridCols, gap: 16, marginBottom: 40 }}>
          {[
            { label: 'Total Revenue', value: '$128,450', change: '↑ 18.2%', sub: 'vs prior period' },
            { label: 'Orders', value: '2,841', change: '↑ 9.4%', sub: 'vs prior period' },
            { label: 'AI Actions', value: '347', change: '↑ 41.7%', sub: 'Automation high', color: 'violet' },
            { label: 'AI Revenue', value: '$31,200', change: '24.3%', sub: 'of total revenue', color: 'cyan' },
          ].map((k, i) => (
            <Card key={i} style={{ padding: 20 }}>
              <div style={{ fontSize: 12, color: '#6B6B88', marginBottom: 12, textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>{k.label}</div>
              <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 8, color: k.color === 'violet' ? '#818CF8' : (k.color === 'cyan' ? '#06B6D4' : '#F1F1F8'), fontFamily: 'JetBrains Mono' }}>{k.value}</div>
              <div style={{ fontSize: 12 }}>
                <span style={{ color: '#10b981', fontWeight: 600 }}>{k.change}</span>
                <span style={{ color: '#6B6B88', marginLeft: 8 }}>{k.sub}</span>
              </div>
            </Card>
          ))}
        </div>

        {/* Revenue Trend AreaChart */}
        <Card style={{ padding: 24, marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#F1F1F8' }}>Revenue Trend — Last 30 Days</h3>
              <p style={{ fontSize: 12, color: '#6B6B88', marginTop: 2 }}>Daily store revenue generated by automated agents</p>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn-ghost-new" style={{ fontSize: 11, padding: '6px 12px' }} onClick={() => addToast("Filtering chart by revenue", "info")}>Revenue</button>
              <button className="btn-ghost-new" style={{ fontSize: 11, padding: '6px 12px' }} onClick={() => addToast("Filtering chart by orders", "info")}>Orders</button>
              <button className="btn-ghost-new" style={{ fontSize: 11, padding: '6px 12px' }} onClick={() => addToast("Filtering chart by AI actions", "info")}>AI Actions</button>
            </div>
          </div>
          <div style={{ height: isMobile ? 160 : 240, position: 'relative' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_TREND_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  {chartTheme.AreaGradient("colorRev", "#6366F1")}
                </defs>
                <CartesianGrid {...chartTheme.CartesianGrid} />
                <XAxis
                  dataKey="name"
                  {...chartTheme.XAxis}
                  tickFormatter={(str) => {
                    const day = parseInt(str.split(" ")[1]);
                    return day % 5 === 0 || day === 1 ? str : "";
                  }}
                />
                <YAxis {...chartTheme.YAxis} tickFormatter={(val) => `$${val}`} />
                <Tooltip {...chartTheme.Tooltip} />
                <Area type="monotone" dataKey="Revenue" stroke="#6366F1" strokeWidth={2} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Bottom analytics grid */}
        <div style={{ display: 'grid', gridTemplateColumns: bottomGridCols, gap: 24 }}>
          {/* Agent ROI breakdown */}
          <Card style={{ padding: 24 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#F1F1F8', marginBottom: 24 }}>Agent ROI Breakdown</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                { name: 'Pricing Optimizer', rev: '$12,400', roi: '4,800%', p: 90 },
                { name: 'Winback Emailer', rev: '$9,200', roi: '3,200%', p: 70 },
                { name: 'Checkout Rescue', rev: '$6,800', roi: '2,100%', p: 55 },
                { name: 'Restock Guardian', rev: '$2,800', roi: '890%', p: 25 },
                { name: 'SEO Meta Updater', rev: '$0', roi: 'measuring', p: 5 },
              ].map((a, i) => (
                <div key={i} style={{ cursor: 'pointer' }} onClick={() => addToast(`Filtering stats for ${a.name}`, 'info')}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 8 }}>
                    <span style={{ fontWeight: 600, color: '#F1F1F8' }}>{i+1}. {a.name}</span>
                    <div style={{ display: 'flex', gap: 16 }}>
                      <span style={{ color: '#A0A0B8', fontFamily: 'JetBrains Mono' }}>{a.rev}</span>
                      <span style={{ color: '#10b981', fontWeight: 600, fontFamily: 'JetBrains Mono' }}>ROI: {a.roi}</span>
                    </div>
                  </div>
                  <div style={{ height: 8, background: 'rgba(255,255,255,0.03)', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ width: `${a.p}%`, height: '100%', background: 'linear-gradient(90deg, #6366F1, #8B5CF6)' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* AI vs Organic Split Card */}
          <Card style={{ padding: 24, textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#F1F1F8', marginBottom: 24 }}>AI vs Organic Split</h3>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', minHeight: 180, flexDirection: 'column' }}>
              <div style={{ width: 160, height: 160, borderRadius: '50%', border: '16px solid #6366F1', borderRightColor: 'rgba(255,255,255,0.05)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', transform: 'rotate(-45deg)' }}>
                <div style={{ transform: 'rotate(45deg)', textAlign: 'center' }}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: '#F1F1F8', fontFamily: 'JetBrains Mono' }}>$31.2k</div>
                  <div style={{ fontSize: 11, color: '#6B6B88', fontWeight: 600 }}>AI Attributed</div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 24, fontSize: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 10, height: 10, background: '#6366F1', borderRadius: 2 }}></div>
                  <span style={{ color: '#A0A0B8' }}>AI: 24.3%</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 10, height: 10, background: 'rgba(255,255,255,0.1)', borderRadius: 2 }}></div>
                  <span style={{ color: '#A0A0B8' }}>Organic: 75.7%</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  };

  const SimulationMode = () => (
    <div>
      <PageHeader
        title="Simulation Mode"
        subtitle="Backtest AI strategies against historical store data before enabling live execution"
        actions={<Badge type="warning" label="Beta mode active" />}
      />

      <div style={{ padding: '16px 20px', background: 'rgba(6, 182, 212, 0.05)', border: '1px solid rgba(6, 182, 212, 0.2)', borderRadius: 12, display: 'flex', gap: 16, marginBottom: 32 }}>
        <IconWrapper icon={AlertCircle} color="cyan" />
        <p style={{ fontSize: 13, color: '#06B6D4', lineHeight: 1.5 }}>
          Simulation runs your AI strategies against the last 90 days of store data. No live Shopify actions are taken. 
          Results show projected impact if strategies had been active.
        </p>
      </div>

      <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20, color: '#F1F1F8' }}>Select Strategy to Simulate</h3>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 16, marginBottom: 32 }}>
        {[
          { id: 'aggressive', title: 'Aggressive Growth', risk: 'HIGH', riskColor: 'danger', lift: '+31.2%', desc: 'Max automation, minimum guardrails. Deploy all agents.' },
          { id: 'balanced', title: 'Balanced Optimization', risk: 'MEDIUM', riskColor: 'warning', lift: '+24.3%', desc: '4 agents active, human approval on high-risk actions.' },
          { id: 'conservative', title: 'Conservative Safety', risk: 'LOW', riskColor: 'success', lift: '+11.8%', desc: '2 agents active. Full human-in-the-loop validation.' },
          { id: 'custom', title: 'Custom Strategy', risk: 'VARIES', riskColor: 'info', lift: 'CALCULATED', desc: 'Build your own agent combination and triggers.' },
        ].map(s => {
          const isSelected = selectedStrategy === s.id;
          return (
            <Card 
              key={s.id} 
              hoverable={true}
              style={{ 
                cursor: 'pointer', 
                border: isSelected ? '1px solid #6366F1' : '1px solid #1E1E3A',
                background: isSelected ? 'linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(139,92,246,0.04) 100%)' : 'linear-gradient(135deg, #111122 0%, #0F0F1E 100%)',
                transition: 'all 0.2s ease',
                padding: 20
              }} 
              onClick={() => setSelectedStrategy(s.id)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, alignItems: 'center' }}>
                <div style={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid #6366F1', padding: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {isSelected && <div style={{ width: 8, height: 8, background: '#6366F1', borderRadius: '50%' }}></div>}
                </div>
                <Badge type={s.riskColor} label={s.risk} />
              </div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8, color: '#F1F1F8' }}>{s.title}</div>
              <p style={{ fontSize: 12, color: '#6B6B88', lineHeight: 1.4, marginBottom: 16 }}>{s.desc}</p>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#818CF8', fontFamily: 'JetBrains Mono' }}>Projected lift: {s.lift}</div>
            </Card>
          );
        })}
      </div>

      <div style={{ display: 'flex', gap: 24, marginBottom: 32 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, color: '#6B6B88', marginBottom: 8, fontWeight: 600 }}>Backtest Period</div>
          <div className="glass" style={{ padding: 4, display: 'flex', background: 'rgba(255,255,255,0.02)', border: '1px solid #1E1E3A', borderRadius: 10 }}>
            {['Last 30 days', 'Last 60 days', 'Last 90 days'].map(p => (
              <button key={p} className={`btn-ghost-new ${p.includes('30') ? 'border-[rgba(99,102,241,0.3)] text-[#818CF8]' : ''}`} style={{ flex: 1, fontSize: 12, border: 'none' }}>{p}</button>
            ))}
          </div>
        </div>
      </div>

      {!simRunning && !showSimResults && (
        <button className="btn-primary-new" style={{ width: '100%', padding: 16, fontSize: 16 }} onClick={runSimulation}>
          <Play size={18} /> Run Simulation
        </button>
      )}

      {simRunning && (
        <Card style={{ padding: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <RefreshCw size={18} className="animate-spin-smooth" color="#6366F1" />
              <span style={{ fontWeight: 600, color: '#F1F1F8' }}>Simulating Strategy: {selectedStrategy.toUpperCase()}...</span>
            </div>
            <button className="btn-ghost-new" style={{ fontSize: 12, padding: '4px 12px' }} onClick={() => setSimRunning(false)}>Cancel</button>
          </div>
          <div style={{ height: 8, background: 'rgba(255,255,255,0.05)', borderRadius: 10, marginBottom: 24, overflow: 'hidden' }}>
            <div style={{ width: `${simProgress}%`, height: '100%', background: 'linear-gradient(90deg, #6366F1, #8B5CF6)', borderRadius: 10, transition: 'width 0.2s' }}></div>
          </div>
          <div className="mono" style={{ fontSize: 12, color: '#6B6B88', display: 'flex', flexDirection: 'column', gap: 6 }}>
            {simProgress > 10 && <div>[00:01] Loading historical data — 2,841 orders...</div>}
            {simProgress > 30 && <div>[00:02] Applying Pricing Optimizer logic to 847 products...</div>}
            {simProgress > 50 && <div>[00:03] Simulating Winback sequences — 1,240 customers...</div>}
            {simProgress > 70 && <div>[00:04] Running Checkout Rescue on 412 abandoned carts...</div>}
            {simProgress > 90 && <div>[00:05] Calculating attribution model...</div>}
          </div>
        </Card>
      )}

      {showSimResults && (
        <div style={{ animation: 'fadeUp 0.4s ease-out' }}>
          <Card style={{ padding: 32 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#F1F1F8' }}>Simulation Complete — Balanced Optimization · 30 Days</h3>
              <button className="btn-primary-new" onClick={() => { setActiveTab('agents'); addToast("Live strategy successfully updated", "success"); }}>✅ Enable Strategy Live</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
              {[
                { l: 'Projected Revenue Lift', v: '+$31,200', d: '+24.3%', c: 'success' },
                { l: 'Orders Recovered', v: '127', d: '+4.2%', c: 'info' },
                { l: 'Stockouts Prevented', v: '4', d: '-100%', c: 'success' },
                { l: 'Margin Improvement', v: '+8.2%', d: 'Optimized', c: 'warning' },
              ].map((k, i) => (
                <div key={i} style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid #1E1E3A', borderRadius: 12 }}>
                  <div style={{ fontSize: 11, color: '#6B6B88', marginBottom: 8, textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>{k.l}</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: '#F1F1F8', fontFamily: 'JetBrains Mono', marginBottom: 4 }}>{k.v}</div>
                  <div style={{ fontSize: 12, color: k.c === 'success' ? '#34D399' : (k.c === 'info' ? '#818CF8' : '#FCD34D'), fontWeight: 600 }}>{k.d}</div>
                </div>
              ))}
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 32 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #1E1E3A', fontSize: 12, color: '#6B6B88', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <th style={{ padding: 12, textAlign: 'left' }}>Metric</th>
                  <th style={{ padding: 12, textAlign: 'left' }}>Without AI</th>
                  <th style={{ padding: 12, textAlign: 'left' }}>With AI</th>
                  <th style={{ padding: 12, textAlign: 'right' }}>Delta</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { m: 'Daily Revenue', w: '$3,200', a: '$4,280', d: '+$1,080' },
                  { m: 'Conversion Rate', w: '3.1%', a: '4.7%', d: '+1.6%' },
                  { m: 'Abandoned Carts', w: '31%', a: '18%', d: '-13%' },
                  { m: 'Avg Order Value', w: '$89', a: '$112', d: '+$23' },
                ].map((r, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #1E1E3A', fontSize: 13 }} className="hover:bg-[rgba(255,255,255,0.01)]">
                    <td style={{ padding: 16, fontWeight: 600, color: '#F1F1F8' }}>{r.m}</td>
                    <td style={{ padding: 16, color: '#A0A0B8' }}>{r.w}</td>
                    <td style={{ padding: 16, color: '#F1F1F8' }}>{r.a}</td>
                    <td style={{ padding: 16, textAlign: 'right', color: '#10B981', fontWeight: 600 }}>{r.d}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 16 }}>
              {[
                { l: '2 actions would have required approval', c: 'warning' },
                { l: '0 actions would have violated guardrails', c: 'success' },
                { l: '4 actions had >90% confidence score', c: 'info' },
              ].map((risk, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 13, color: '#A0A0B8' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: risk.c === 'success' ? '#10B981' : (risk.c === 'warning' ? '#F59E0B' : '#6366F1') }}></div>
                  {risk.l}
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );

  const SettingsTab = () => (
    <div style={{ maxWidth: 800 }}>
      <PageHeader title="System Settings" subtitle="Configure AI behaviors, notifications, API variables, and integrations" />

      {/* Store connection */}
      <Card style={{ padding: 24, marginBottom: 32 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: '#F1F1F8', marginBottom: 20 }}>Store Connection</h3>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center', marginBottom: 24, flexDirection: isMobile ? 'column' : 'row' }}>
          <div style={{ flex: 1, width: '100%' }}>
            <label style={{ fontSize: 12, color: '#6B6B88', marginBottom: 8, display: 'block', fontWeight: 600 }}>Store URL</label>
            <input type="text" className="input-field" defaultValue="serenova-global.myshopify.com" style={{ background: '#0A0A18', borderColor: '#1E1E3A' }} />
          </div>
          <div style={{ width: isMobile ? '100%' : 140 }}>
            <label style={{ fontSize: 12, color: '#6B6B88', marginBottom: 8, display: 'block', fontWeight: 600 }}>Status</label>
            <div className="badge badge-success" style={{ display: 'flex', alignItems: 'center', gap: 6, width: 'fit-content' }}>
              <div className="animate-pulse-green" style={{ width: 4, height: 4, background: '#10b981', borderRadius: '50%' }}></div>
              Connected
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
          {['read_products', 'write_products', 'read_orders', 'write_orders', 'read_inventory', 'write_inventory'].map(s => (
            <span key={s} className="glass" style={{ fontSize: 10, padding: '4px 8px', borderRadius: 4, background: 'rgba(255,255,255,0.02)', border: '1px solid #1E1E3A', color: '#6B6B88' }}>{s}</span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn-ghost-new" onClick={() => addToast("Forced store sync initiated", "info")}><RefreshCw size={14} /> Force Resync</button>
          <button className="btn-ghost-new">Reconnect Store</button>
        </div>
      </Card>

      {/* AI config */}
      <Card style={{ padding: 24, marginBottom: 32 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: '#F1F1F8', marginBottom: 20 }}>AI Model Configuration</h3>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 24, marginBottom: 24 }}>
          <div>
            <label style={{ fontSize: 12, color: '#6B6B88', marginBottom: 8, display: 'block', fontWeight: 600 }}>Active Model</label>
            <select className="input-field" style={{ background: '#0A0A18', borderColor: '#1E1E3A' }}>
              <option>gemini-2.0-flash</option>
              <option>gemini-1.5-pro</option>
              <option>gemini-2.5-pro (Beta)</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: 12, color: '#6B6B88', marginBottom: 8, display: 'block', fontWeight: 600 }}>Max Tokens per Agent</label>
            <input type="number" className="input-field" defaultValue="2048" style={{ background: '#0A0A18', borderColor: '#1E1E3A' }} />
          </div>
        </div>
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <label style={{ fontSize: 12, color: '#6B6B88', fontWeight: 600 }}>Temperature</label>
            <span style={{ fontSize: 12, color: '#6366F1', fontWeight: 600, fontFamily: 'JetBrains Mono' }}>0.7 — Balanced</span>
          </div>
          <input type="range" style={{ width: '100%', accentColor: '#6366F1' }} min="0" max="1" step="0.1" defaultValue="0.7" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 24 }}>
          {[
            { key: 'cot', label: 'Chain-of-Thought reasoning' },
            { key: 'retry', label: 'Auto-retry failed operations' },
            { key: 'logging', label: 'Detailed AI model logging' },
          ].map(t => (
            <div key={t.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              <span style={{ fontSize: 13, color: '#A0A0B8' }}>{t.label}</span>
              <div 
                className={`toggle-switch ${toggleSettings[t.key] ? 'active' : ''}`}
                onClick={() => setToggleSettings(prev => ({ ...prev, [t.key]: !prev[t.key] }))}
              ></div>
            </div>
          ))}
        </div>
      </Card>

      {/* Notifications */}
      <Card style={{ padding: 24, marginBottom: 32 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: '#F1F1F8', marginBottom: 20 }}>Notifications</h3>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 24, marginBottom: 24 }}>
          <div>
            <label style={{ fontSize: 12, color: '#6B6B88', marginBottom: 8, display: 'block', fontWeight: 600 }}>Email Address</label>
            <input type="text" className="input-field" defaultValue="admin@serenovabeauty.com" style={{ background: '#0A0A18', borderColor: '#1E1E3A' }} />
          </div>
          <div>
            <label style={{ fontSize: 12, color: '#6B6B88', marginBottom: 8, display: 'block', fontWeight: 600 }}>Slack Webhook URL</label>
            <div style={{ position: 'relative' }}>
              <input type="password" className="input-field" defaultValue="https://hooks.slack.com/services/..." style={{ background: '#0A0A18', borderColor: '#1E1E3A', paddingRight: 40 }} />
              <Eye size={14} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#6B6B88' }} />
            </div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 24, marginBottom: 24 }}>
          {[
            { key: 'failures', label: 'Email alerts for agent failures' },
            { key: 'slack', label: 'Slack webhook notifications' },
            { key: 'weekly', label: 'Weekly performance summary digest' },
            { key: 'milestones', label: 'Revenue milestone notification alerts' },
            { key: 'approvals', label: 'Agent approval requests' },
            { key: 'health', label: 'System health warning notifications' },
          ].map(t => (
            <div key={t.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              <span style={{ fontSize: 13, color: '#A0A0B8' }}>{t.label}</span>
              <div 
                className={`toggle-switch ${toggleSettings[t.key] ? 'active' : ''}`}
                onClick={() => setToggleSettings(prev => ({ ...prev, [t.key]: !prev[t.key] }))}
              ></div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn-ghost-new" onClick={() => addToast("Test email notification dispatched", "info")}><Mail size={14} /> Send Test Email</button>
          <button className="btn-ghost-new" onClick={() => addToast("Slack integration test complete", "success")}><MessageSquare size={14} /> Send Test Slack</button>
        </div>
      </Card>

      {/* API keys */}
      <Card style={{ padding: 24, marginBottom: 32 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: '#F1F1F8', marginBottom: 20 }}>API Keys & Integrations</h3>
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 12, color: '#6B6B88', marginBottom: 8, display: 'block', fontWeight: 600 }}>API Authentication Token</label>
          <div style={{ display: 'flex', gap: 12, flexDirection: isMobile ? 'column' : 'row' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <input type="password" readOnly className="input-field" defaultValue="glw_prod_7721_ak_94h2k8f..." style={{ background: '#0A0A18', borderColor: '#1E1E3A', paddingRight: 60 }} />
              <button style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: '#6366F1', fontSize: 12, cursor: 'pointer', fontWeight: 600 }} onClick={() => addToast("API token copied to clipboard", "success")}>Copy</button>
            </div>
            <button className="btn-ghost-new" onClick={() => addToast("API Key regenerated", "warning")}>Regenerate</button>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 16 }}>
          {[
            { name: 'Shopify Admin', status: 'Connected', isDone: true },
            { name: 'Gemini Gateway', status: 'Connected', isDone: true },
            { name: 'Klaviyo', status: 'Connect', isDone: false },
            { name: 'Gorgias', status: 'Connect', isDone: false },
            { name: 'Google Analytics', status: 'Connect', isDone: false },
            { name: 'Zendesk', status: 'Connect', isDone: false },
          ].map(i => (
            <div key={i.name} className="glass" style={{ padding: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.01)', border: '1px solid #1E1E3A', borderRadius: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#A0A0B8' }}>{i.name}</span>
              <button 
                className={i.isDone ? "btn-ghost-new" : "btn-ghost-new border-[#6366F1] text-[#818CF8]"} 
                style={{ padding: '4px 8px', fontSize: 10, border: i.isDone ? 'none' : '1px solid #1E1E3A' }}
                onClick={() => !i.isDone && addToast(`Connecting to ${i.name}...`, "info")}
              >
                {i.isDone ? <CheckCircle2 size={12} color="#10B981" /> : i.status}
              </button>
            </div>
          ))}
        </div>
      </Card>

      {/* Danger Zone */}
      <Card style={{ padding: 24, border: '1px solid rgba(239, 68, 68, 0.2)', background: 'rgba(239, 68, 68, 0.02)' }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: '#EF4444', marginBottom: 12 }}>Danger Zone</h3>
        <p style={{ fontSize: 13, color: '#A0A0B8', marginBottom: 24 }}>Destructive operations that permanently reset settings or sever API links.</p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button className="btn-ghost-new border-[#EF4444] text-[#F87171] hover:bg-[rgba(239,68,68,0.05)]" onClick={() => addToast("Database reset request registered", "warning")}>Reset All Agent Metrics</button>
          <button className="btn-primary-new" style={{ background: '#EF4444', boxShadow: 'none' }} onClick={() => addToast("Disconnection process initiated", "error")}>Disconnect Shopify Store</button>
        </div>
      </Card>
    </div>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: DESIGN_TOKENS.bg.base, position: 'relative' }}>
      <TechBackground />
      
      {/* Mobile Drawer Sidebar */}
      {isMobile && mobileSidebarOpen && (
        <>
          <div 
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 90 }} 
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div style={{ 
            position: 'fixed', left: 0, top: 0, bottom: 0, width: 260, 
            background: 'linear-gradient(180deg, #0D0D1A 0%, #09091A 100%)',
            borderRight: '1px solid #1E1E3A',
            boxShadow: '4px 0 24px rgba(0,0,0,0.5)',
            zIndex: 100,
            padding: '24px 16px',
            display: 'flex', flexDirection: 'column'
          }}>
            <SidebarContent />
          </div>
        </>
      )}

      {/* Desktop/Tablet Left Sidebar */}
      {!isMobile && (
        <div style={{
          width: sidebarWidth, height: '100vh', position: 'fixed', left: 0, top: 0,
          background: 'linear-gradient(180deg, #0D0D1A 0%, #09091A 100%)',
          borderRight: '1px solid #1E1E3A',
          boxShadow: '4px 0 24px rgba(0,0,0,0.4)',
          padding: isTablet ? '24px 8px' : '24px 16px',
          display: 'flex', flexDirection: 'column', zIndex: 50,
          transition: 'width 250ms cubic-bezier(0.4,0,0.2,1)'
        }}>
          <SidebarContent />
        </div>
      )}

      {/* Main Content Viewport */}
      <div style={{ 
        flex: 1, 
        marginLeft: isMobile ? 0 : sidebarWidth, 
        display: 'flex', flexDirection: 'column', 
        minWidth: 0,
        transition: 'margin-left 250ms cubic-bezier(0.4,0,0.2,1)'
      }}>
        <TopBar />
        <main style={{ padding: isMobile ? '16px' : '32px', flex: 1, position: 'relative', zIndex: 10 }}>
          <div key={activeTab} className="page-enter">
            {activeTab === 'operations' && <OperationsHub />}
            {activeTab === 'agents' && <AgentsOnline />}
            {activeTab === 'system' && <SystemStatus />}
            {activeTab === 'analytics' && <Analytics />}
            {activeTab === 'simulation' && <SimulationMode />}
            {activeTab === 'settings' && <SettingsTab />}
          </div>
        </main>
      </div>

      {/* TOASTS CONTAINER */}
      <div style={{ position: 'fixed', bottom: 0, right: 0, zIndex: 1000 }}>
        {toasts.map(t => (
          <Toast key={t.id} message={t.message} type={t.type} onDismiss={() => setToasts(prev => prev.filter(toast => toast.id !== t.id))} />
        ))}
      </div>

      {/* AGENT LOGS DRAWER */}
      <div className={`slide-over ${reportOpen ? 'open' : ''}`} style={{ background: '#0D0D1E' }}>
        <div style={{ padding: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F1F1F8' }}>Agent Cycle Logs</h2>
            <button className="btn-icon-new" style={{ width: 34, height: 34 }} onClick={() => setReportOpen(null)}><X size={18} /></button>
          </div>
          {reportOpen && (
            <>
              <div style={{ padding: 16, marginBottom: 24, borderLeft: '4px solid #6366F1', background: 'rgba(99,102,241,0.03)', border: '1px solid #1E1E3A', borderRadius: 8 }}>
                <div style={{ fontSize: 13, color: '#A0A0B8' }}>Agent Name: <b style={{ color: '#F1F1F8' }}>{agents.find(a => a.id === reportOpen).name}</b></div>
                <div style={{ fontSize: 11, color: '#6B6B88', marginTop: 4 }}>Reported status: {agents.find(a => a.id === reportOpen).status}</div>
              </div>
              <div className="mono" style={{ background: '#07070F', padding: 20, borderRadius: 8, fontSize: 12, height: 400, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10, border: '1px solid #1E1E3A' }}>
                <div>[14:22:01] Agent initialized — store context loaded</div>
                <div>[14:22:02] Gemini reasoning: analyzing inventory levels</div>
                <div style={{ color: '#06B6D4' }}>[14:22:04] Decision: SKU GL-4471 reorder threshold hit</div>
                <div style={{ color: '#10B981' }}>[14:22:05] Action: POST /admin/api/orders → PO-4821 created</div>
                <div>[14:22:07] Confirmation: Shopify order #PO-4821 confirmed</div>
                <div>[14:22:08] Metric recorded: restock_triggered = true</div>
                <div style={{ color: '#818CF8' }}>[14:22:09] Agent cycle complete. Next check: 15min</div>
                <div style={{ opacity: 0.5 }}>[14:37:09] Waking for next cycle...</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

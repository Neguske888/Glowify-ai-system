import React, { useState, useEffect, useMemo } from 'react';
import { 
  BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
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
  ChevronRight,
  Bell,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  Mail,
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Target,
  Activity,
  Globe,
  CreditCard,
  Shield,
  Lock,
  Eye,
  EyeOff,
  User,
  ShoppingBag,
  LogOut,
  X,
  Menu,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  Clock,
  DollarSign,
  Percent,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  Filter,
  Download,
  Upload,
  Plus,
  Minus,
  Edit,
  Trash2,
  Copy,
  ExternalLink,
  ToggleLeft,
  ToggleRight,
  Cpu,
  Database,
  Wifi,
  WifiOff,
} from 'lucide-react'
import { firebaseAuth } from './lib/firebase'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }
  componentDidCatch(error, info) {
    console.error('Glowify render error:', error, info)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', background: '#0A0A0F', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div style={{ background: '#111118', border: '1px solid #EF4444', borderRadius: '16px', padding: '32px', maxWidth: '500px', width: '100%' }}>
            <div style={{ color: '#EF4444', fontSize: '18px', fontWeight: 'bold', marginBottom: '8px', fontFamily: 'system-ui' }}>
              Glowify AI — Render Error
            </div>
            <div style={{ color: '#9CA3AF', fontSize: '13px', fontFamily: 'monospace', background: '#0A0A0F', padding: '12px', borderRadius: '8px', marginBottom: '16px', wordBreak: 'break-word' }}>
              {this.state.error?.message || 'Unknown error'}
            </div>
            <div style={{ color: '#6B7280', fontSize: '12px', fontFamily: 'system-ui', marginBottom: '16px' }}>
              Check browser console (F12) for full error details.
              Common fixes: restart dev server, check .env file, verify Firebase config.
            </div>
            <button
              onClick={() => window.location.reload()}
              style={{ background: '#6366F1', color: 'white', border: 'none', borderRadius: '8px', padding: '10px 20px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}
            >
              Reload App
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

/* --- MOCK DATA --- */
const USER_PROFILE = {
  name: "Alex Johnson",
  email: "alex@glowifybeauty.com",
  store: "Glowify Beauty Co.",
  plan: "Enterprise",
  url: "glowifybeauty.myshopify.com",
  joined: "March 14, 2024",
  location: "Austin, Texas, USA",
  initials: "AJ",
  stats: { revenue: "$284,920", actions: 147, automations: 23, daysActive: 61 },
  integrations: ["Shopify", "Meta Ads", "Google Ads", "Klaviyo", "Stripe"]
};

const KPI_DATA = [
  { label: 'Total Revenue', value: '$284,920', delta: '+34.2%' },
  { label: 'Total Orders', value: '3,847', delta: '+28.6%' },
  { label: 'Avg Conv. Rate', value: '3.24%', delta: '+0.8%' },
  { label: 'Avg ROAS', value: '4.7x', delta: '+18.4%' },
  { label: 'Avg AOV', value: '$74.06', delta: '+9.2%' },
  { label: 'Refund Rate', value: '1.8%', delta: '-0.3%' }
];

const REVENUE_60D = Array.from({ length: 60 }, (_, i) => ({ day: `Day ${i + 1}`, value: Math.floor(3200 + (i * 60) + (Math.random() * 800 - 400)) }));
const REVENUE_BY_CHANNEL = [{ name: 'Shopify', value: 38, color: '#6366F1' }, { name: 'Google', value: 29, color: '#10B981' }, { name: 'Meta', value: 21, color: '#F59E0B' }, { name: 'Email', value: 12, color: '#3B82F6' }];
const ORDERS_BY_DAY = [{ day: 'Mon', value: 410 }, { day: 'Tue', value: 480 }, { day: 'Wed', value: 520 }, { day: 'Thu', value: 610 }, { day: 'Fri', value: 780 }, { day: 'Sat', value: 920 }, { day: 'Sun', value: 127 }];
const CONVERSION_FUNNEL = [{ label: 'Sessions', value: '118,800', pct: 100 }, { label: 'Product Views', value: '71,280', pct: 60 }, { label: 'Add to Cart', value: '28,520', pct: 24 }, { label: 'Purchased', value: '3,847', pct: 3.24 }];
const RECENT_AI_ACTIONS = [
  { id: 1, icon: Zap, title: "Paused underperforming Ad Set", result: "Saved $340", time: "Today 9:14am", status: "Completed", color: "green" },
  { id: 2, icon: Mail, title: "Win-back campaign launched", result: "$6,200 recovered", time: "Yesterday 2:00pm", status: "Completed", color: "green" },
  { id: 3, icon: Package, title: "Restock PO triggered", result: "120 units", time: "Yesterday 10:30am", status: "Completed", color: "green" }
];
const PRODUCT_PERFORMANCE = [
  { rank: "#1", name: "Vitamin C Serum", units: 420, revenue: "$37,800", rating: "4.9", margin: "68%", stock: "12", status: "Low Stock", color: "amber" },
  { rank: "#2", name: "Retinol Night Cream", units: 310, revenue: "$24,800", rating: "4.7", margin: "71%", stock: "48", status: "Healthy", color: "green" }
];
const CUSTOMER_SEGMENTS = [{ name: "VIP", count: 284, rev: "31%", desc: "High LTV", color: "indigo" }, { name: "Loyal", count: 891, rev: "38%", desc: "Repeaters", color: "green" }];
const GEO_REVENUE = [{ name: "USA", value: 142400 }, { name: "UK", value: 38200 }];
const AUTOMATIONS_LIST = [{ id: 1, name: "Abandoned Cart", type: "Email", trigger: "1h", lastRun: "12m ago", actions: 847, status: "Active" }];
const MARKETING_CAMPAIGNS = [{ name: "Spring Sale", platform: "Meta", budget: "$200/d", spent: "$1,840", roas: "3.8x", ctr: "2.1%", status: "Active", action: "View", color: "green" }];
const AI_USAGE_WEEKS = [4, 7, 9, 12, 18, 22, 31, 44].map((v, i) => ({ week: i + 1, value: v }));

/* --- COMPONENTS --- */
const Card = ({ children, className = "" }) => <div className={`bg-[#111118] border border-[#1E1E2E] rounded-2xl p-5 ${className}`}>{children}</div>;
const Badge = ({ children, type = "blue" }) => {
  const styles = { red: "bg-red-500/10 text-red-400 border-red-500/20", amber: "bg-amber-500/10 text-amber-400 border-amber-500/20", blue: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20", green: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", indigo: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" };
  return <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${styles[type]}`}>{children}</span>;
};
const Toggle = ({ active, onToggle }) => <div onClick={onToggle} className={`w-8 h-4 rounded-full relative cursor-pointer transition-all duration-300 ${active ? 'bg-emerald-500' : 'bg-[#1E1E2E]'}`}><div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all duration-300 ${active ? 'left-[1.125rem]' : 'left-0.5'}`} /></div>;
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1E1E2E] border border-[#2E2E3E] p-2 rounded-lg shadow-xl">
        {label && <p className="text-[#6B7280] text-[10px] uppercase font-bold mb-1">{label}</p>}
        <p className="text-white font-bold text-xs">{typeof payload[0].value === 'number' && !label ? payload[0].value : `$${payload[0].value.toLocaleString()}`}</p>
      </div>
    );
  }
  return null;
};
const SectionHeader = ({ title, subtitle, icon: Icon, color = "indigo" }) => (
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center gap-3">
      {Icon && <div className={`w-8 h-8 rounded-lg bg-${color}-500/10 flex items-center justify-center text-${color}-400`}><Icon size={18} /></div>}
      <div><h3 className="text-lg font-bold text-white leading-none">{title}</h3>{subtitle && <p className="text-xs text-[#6B7280] mt-1">{subtitle}</p>}</div>
    </div>
  </div>
);

const AuthScreen = ({ onAuthSuccess }) => {
  console.log('Rendering AuthScreen');
  const [view, setView] = React.useState('login')
  const [email, setEmail] = React.useState('admin@glowify.ai')
  const [password, setPassword] = React.useState('password123')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [fullName, setFullName] = React.useState('')
  const [storeName, setStoreName] = React.useState('')
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirm, setShowConfirm] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [googleLoading, setGoogleLoading] = React.useState(false)
  const [authError, setAuthError] = React.useState('')
  const [authSuccess, setAuthSuccess] = React.useState('')

  const clearMessages = () => { setAuthError(''); setAuthSuccess('') }
  const switchView = (v) => { clearMessages(); setView(v); setPassword(''); setConfirmPassword('') }

  const handleLogin = async () => {
    if (!email || !password) { setAuthError('Please fill in all fields.'); return }
    clearMessages(); 

    // Mock authentication logic for testing
    if (email === 'admin@glowify.ai' && password === 'password123') {
      const mockUser = {
        uid: 'mock-user-123',
        email: email,
        displayName: 'Alex Johnson',
        storeName: 'Glowify Beauty Co.',
        photoURL: 'https://ui-avatars.com/api/?name=Alex+Johnson',
        isMock: true,
        role: 'admin',
        createdAt: new Date().toISOString()
      }
      onAuthSuccess(mockUser)
      return
    }

    setLoading(true)
    const { user, error } = await firebaseAuth.signInWithEmail(email, password)
    setLoading(false)
    if (error) { setAuthError(error); return }
    if (user) onAuthSuccess(user)
  }

  const handleSignup = async () => {
    if (!fullName || !email || !password || !confirmPassword) { setAuthError('Please fill in all fields.'); return }
    if (password !== confirmPassword) { setAuthError('Passwords do not match.'); return }
    if (password.length < 6) { setAuthError('Password must be at least 6 characters.'); return }
    clearMessages(); setLoading(true)
    const { user, error } = await firebaseAuth.signUpWithEmail(email, password, fullName)
    setLoading(false)
    if (error) { setAuthError(error); return }
    if (user) onAuthSuccess(user)
  }

  const handleGoogle = async () => {
    clearMessages(); setGoogleLoading(true)
    const { user, error } = await firebaseAuth.signInWithGoogle()
    setGoogleLoading(false)
    if (error) { setAuthError(error); return }
    if (user) onAuthSuccess(user)
  }

  const handleReset = async () => {
    if (!email) { setAuthError('Please enter your email address.'); return }
    clearMessages(); setLoading(true)
    const { error } = await firebaseAuth.resetPassword(email)
    setLoading(false)
    if (error) { setAuthError(error); return }
    setAuthSuccess('Reset link sent! Check your inbox.')
  }

  // ─── STYLE TOKENS ──────────────────────────────────────────
  const S = {
    // Layout
    screen: {
      minHeight: '100vh',
      background: '#0A0A0F',
      display: 'flex',
      fontFamily: "'Inter', system-ui, sans-serif",
    },
    leftPanel: {
      width: '42%',
      minHeight: '100vh',
      background: 'linear-gradient(145deg, #0D0D1A 0%, #0A0A0F 45%, #0D0A1F 100%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '48px',
      position: 'relative',
      overflow: 'hidden',
    },
    rightPanel: {
      flex: 1,
      minHeight: '100vh',
      background: '#0A0A0F',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 32px',
    },
    formWrapper: {
      width: '100%',
      maxWidth: '440px',
    },
    // Logo
    logoGlyph: {
      width: '52px',
      height: '52px',
      borderRadius: '16px',
      background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '22px',
      fontWeight: '800',
      color: 'white',
      boxShadow: '0 8px 32px rgba(99,102,241,0.35)',
      flexShrink: 0,
    },
    logoText: {
      fontSize: '20px',
      fontWeight: '700',
      color: 'white',
      lineHeight: 1.2,
    },
    logoSub: {
      fontSize: '12px',
      color: '#6B7280',
      marginTop: '2px',
    },
    // Feature cards
    featureCard: {
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '16px',
      padding: '16px',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
      marginBottom: '12px',
      backdropFilter: 'blur(10px)',
    },
    featureIconBox: (color) => ({
      width: '36px',
      height: '36px',
      borderRadius: '10px',
      background: color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }),
    // Card
    card: {
      background: '#111118',
      border: '1px solid #1E1E2E',
      borderRadius: '20px',
      padding: '32px',
      marginTop: '24px',
      position: 'relative',
    },
    cardTopLine: {
      height: '1px',
      background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.6), transparent)',
      marginBottom: '24px',
      borderRadius: '1px',
    },
    // Input
    inputWrapper: {
      marginBottom: '16px',
    },
    inputLabel: {
      display: 'block',
      fontSize: '11px',
      color: '#6B7280',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      fontWeight: '600',
      marginBottom: '8px',
    },
    inputOuter: {
      position: 'relative',
    },
    input: {
      width: '100%',
      background: '#0A0A0F',
      border: '1px solid #1E1E2E',
      borderRadius: '12px',
      padding: '14px 44px 14px 40px',
      fontSize: '14px',
      color: 'white',
      outline: 'none',
      transition: 'border-color 0.2s, box-shadow 0.2s',
      fontFamily: "'Inter', system-ui, sans-serif",
    },
    inputNoIcon: {
      width: '100%',
      background: '#0A0A0F',
      border: '1px solid #1E1E2E',
      borderRadius: '12px',
      padding: '14px 16px',
      fontSize: '14px',
      color: 'white',
      outline: 'none',
      transition: 'border-color 0.2s',
      fontFamily: "'Inter', system-ui, sans-serif",
    },
    inputIconLeft: {
      position: 'absolute',
      left: '14px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#4B5563',
      pointerEvents: 'none',
    },
    inputIconRight: {
      position: 'absolute',
      right: '14px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#4B5563',
      cursor: 'pointer',
      background: 'none',
      border: 'none',
      display: 'flex',
      alignItems: 'center',
    },
    // Buttons
    primaryBtn: {
      width: '100%',
      padding: '15px',
      borderRadius: '12px',
      background: 'linear-gradient(135deg, #6366F1 0%, #5855eb 100%)',
      color: 'white',
      fontSize: '14px',
      fontWeight: '600',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      transition: 'all 0.2s',
      boxShadow: '0 4px 20px rgba(99,102,241,0.3)',
      fontFamily: "'Inter', system-ui, sans-serif",
      marginTop: '8px',
    },
    googleBtn: {
      width: '100%',
      padding: '14px',
      borderRadius: '12px',
      background: '#0A0A0F',
      border: '1px solid #2E2E3E',
      color: 'white',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      transition: 'all 0.2s',
      fontFamily: "'Inter', system-ui, sans-serif",
      marginBottom: '4px',
    },
    divider: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      margin: '16px 0',
    },
    dividerLine: {
      flex: 1,
      height: '1px',
      background: '#1E1E2E',
    },
    dividerText: {
      fontSize: '12px',
      color: '#374151',
    },
    // Messages
    errorBox: {
      background: 'rgba(239,68,68,0.1)',
      border: '1px solid rgba(239,68,68,0.25)',
      borderRadius: '12px',
      padding: '12px 16px',
      marginBottom: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    successBox: {
      background: 'rgba(16,185,129,0.1)',
      border: '1px solid rgba(16,185,129,0.25)',
      borderRadius: '12px',
      padding: '12px 16px',
      marginBottom: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    // Typography
    heading: {
      fontSize: '28px',
      fontWeight: '800',
      color: 'white',
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    subheading: {
      fontSize: '14px',
      color: '#6B7280',
      marginTop: '6px',
    },
    linkBtn: {
      background: 'none',
      border: 'none',
      color: '#6366F1',
      cursor: 'pointer',
      fontSize: '14px',
      fontFamily: "'Inter', system-ui, sans-serif",
      fontWeight: '500',
      padding: 0,
    },
    mutedText: {
      color: '#6B7280',
      fontSize: '14px',
    },
    // Spinner
    spinner: {
      width: '18px',
      height: '18px',
      border: '2px solid rgba(255,255,255,0.3)',
      borderTop: '2px solid white',
      borderRadius: '50%',
      animation: 'glowSpin 0.7s linear infinite',
    },
    // Two col grid
    twoCol: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '12px',
    },
    // Social proof
    avatarRow: {
      display: 'flex',
      alignItems: 'center',
    },
    avatar: (bg, i) => ({
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      background: bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '11px',
      fontWeight: '700',
      border: '2px solid #0A0A0F',
      marginLeft: i > 0 ? '-8px' : '0',
    }),
  }

  // ─── SUB-COMPONENTS ────────────────────────────────────────

  const Spinner = () => (
    <div style={S.spinner} />
  )

  const GoogleSVG = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  )

  const InputField = ({ label, type, value, onChange, placeholder, IconLeft, hasRight, onRightClick, rightIcon: RightIcon, noLeftIcon }) => {
    const [focused, setFocused] = React.useState(false)
    return (
      <div style={S.inputWrapper}>
        <label style={S.inputLabel}>{label}</label>
        <div style={S.inputOuter}>
          {IconLeft && !noLeftIcon && (
            <div style={S.inputIconLeft}>
              <IconLeft size={15} />
            </div>
          )}
          <input
            type={type}
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                if (view === 'login') handleLogin()
                else if (view === 'signup') handleSignup()
                else handleReset()
              }
            }}
            style={{
              ...(noLeftIcon ? S.inputNoIcon : S.input),
              borderColor: focused ? '#6366F1' : '#1E1E2E',
              boxShadow: focused ? '0 0 0 3px rgba(99,102,241,0.15)' : 'none',
              paddingRight: hasRight ? '44px' : '16px',
            }}
          />
          {hasRight && (
            <button type="button" onClick={onRightClick} style={S.inputIconRight}>
              {RightIcon && <RightIcon size={15} />}
            </button>
          )}
        </div>
      </div>
    )
  }

  const PrimaryButton = ({ onClick, isLoading, children }) => {
    const [hovered, setHovered] = React.useState(false)
    return (
      <button
        onClick={onClick}
        disabled={isLoading}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          ...S.primaryBtn,
          background: hovered
            ? 'linear-gradient(135deg, #5855eb 0%, #7C3AED 100%)'
            : 'linear-gradient(135deg, #6366F1 0%, #5855eb 100%)',
          transform: hovered && !isLoading ? 'translateY(-1px)' : 'translateY(0)',
          boxShadow: hovered
            ? '0 8px 30px rgba(99,102,241,0.45)'
            : '0 4px 20px rgba(99,102,241,0.3)',
          opacity: isLoading ? 0.7 : 1,
        }}
      >
        {isLoading ? <Spinner /> : children}
      </button>
    )
  }

  const GoogleButton = ({ onClick, isLoading }) => {
    const [hovered, setHovered] = React.useState(false)
    return (
      <button
        onClick={onClick}
        disabled={isLoading}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          ...S.googleBtn,
          borderColor: hovered ? 'rgba(99,102,241,0.4)' : '#2E2E3E',
          background: hovered ? '#15151F' : '#0A0A0F',
        }}
      >
        {isLoading ? <Spinner /> : <><GoogleSVG /><span>Continue with Google</span></>}
      </button>
    )
  }

  const Divider = () => (
    <div style={S.divider}>
      <div style={S.dividerLine} />
      <span style={S.dividerText}>or</span>
      <div style={S.dividerLine} />
    </div>
  )

  const features = [
    { label: 'AI-Powered Decisions', desc: 'Real-time insights that act before you think', bg: 'rgba(99,102,241,0.15)', color: '#818CF8', Icon: Zap },
    { label: 'Revenue Intelligence', desc: 'Know exactly where every dollar comes from', bg: 'rgba(16,185,129,0.15)', color: '#34D399', Icon: TrendingUp },
    { label: 'Enterprise Security', desc: 'Bank-grade encryption on all your store data', bg: 'rgba(139,92,246,0.15)', color: '#A78BFA', Icon: Shield },
  ]

  const avatars = [
    { initials: 'MK', bg: 'linear-gradient(135deg,#F43F5E,#FB7185)' },
    { initials: 'JT', bg: 'linear-gradient(135deg,#3B82F6,#60A5FA)' },
    { initials: 'SR', bg: 'linear-gradient(135deg,#10B981,#34D399)' },
  ]

  return (
    <>
      <style>{`
        @keyframes glowSpin { to { transform: rotate(360deg); } }
        @keyframes orbFloat {
          0%,100% { transform: scale(1) translate(0,0); opacity:0.3; }
          50% { transform: scale(1.12) translate(-12px,-8px); opacity:0.5; }
        }
        @keyframes cardIn {
          from { opacity:0; transform:translateY(20px); }
          to { opacity:1; transform:translateY(0); }
        }
        @keyframes msgIn {
          from { opacity:0; transform:translateY(-6px); }
          to { opacity:1; transform:translateY(0); }
        }
        .auth-card-anim { animation: cardIn 0.45s cubic-bezier(0.16,1,0.3,1) forwards; }
        .msg-anim { animation: msgIn 0.2s ease forwards; }
        .orb1 { animation: orbFloat 7s ease-in-out infinite; }
        .orb2 { animation: orbFloat 10s ease-in-out infinite reverse; }
        input::placeholder { color: #374151; }
        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 100px #0A0A0F inset !important;
          -webkit-text-fill-color: white !important;
          border-color: #1E1E2E !important;
        }
        @media (max-width: 768px) {
          .left-panel-hide { display: none !important; }
          .right-panel-full { padding: 24px 20px !important; }
        }
      `}</style>

      <div style={S.screen}>

        {/* ══════════ LEFT PANEL ══════════ */}
        <div style={S.leftPanel} className="left-panel-hide">
          {/* Orbs */}
          <div className="orb1" style={{
            position:'absolute', top:'60px', left:'20px',
            width:'380px', height:'380px',
            background:'rgba(99,102,241,0.18)',
            borderRadius:'50%', filter:'blur(80px)', pointerEvents:'none'
          }} />
          <div className="orb2" style={{
            position:'absolute', bottom:'40px', right:'-40px',
            width:'260px', height:'260px',
            background:'rgba(139,92,246,0.12)',
            borderRadius:'50%', filter:'blur(60px)', pointerEvents:'none'
          }} />

          <div style={{ position:'relative', zIndex:1 }}>
            {/* Logo */}
            <div style={{ display:'flex', alignItems:'center', gap:'14px', marginBottom:'56px' }}>
              <div style={S.logoGlyph}>G</div>
              <div>
                <div style={S.logoText}>Glowify AI</div>
                <div style={S.logoSub}>Commerce Intelligence Platform</div>
              </div>
            </div>

            {/* Headline */}
            <div style={{ marginBottom:'36px' }}>
              <h2 style={{ fontSize:'32px', fontWeight:'800', color:'white', lineHeight:1.25, letterSpacing:'-0.03em', marginBottom:'12px' }}>
                Your store.<br />
                <span style={{ background:'linear-gradient(135deg,#818CF8,#A78BFA)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                  On autopilot.
                </span>
              </h2>
              <p style={{ fontSize:'14px', color:'#6B7280', lineHeight:1.6, maxWidth:'280px' }}>
                AI decisions, real-time intelligence, and automated growth — all in one dashboard.
              </p>
            </div>

            {/* Feature cards */}
            {features.map((f, i) => (
              <div key={i} style={S.featureCard}>
                <div style={S.featureIconBox(f.bg)}>
                  <f.Icon size={16} color={f.color} />
                </div>
                <div>
                  <div style={{ fontSize:'13px', fontWeight:'600', color:'white', marginBottom:'3px' }}>{f.label}</div>
                  <div style={{ fontSize:'12px', color:'#6B7280', lineHeight:1.5 }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Social proof */}
          <div style={{ position:'relative', zIndex:1, display:'flex', alignItems:'center', gap:'14px' }}>
            <div style={S.avatarRow}>
              {avatars.map((a, i) => (
                <div key={i} style={S.avatar(a.bg, i)}>{a.initials}</div>
              ))}
            </div>
            <div>
              <div style={{ fontSize:'12px', fontWeight:'600', color:'white', marginBottom:'4px' }}>
                Trusted by 2,400+ store owners
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
                <span style={{ color:'#FBBF24', fontSize:'12px' }}>★★★★★</span>
                <span style={{ fontSize:'12px', color:'#6B7280' }}>4.9/5 rating</span>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════ RIGHT PANEL ══════════ */}
        <div style={S.rightPanel} className="right-panel-full">
          <div style={S.formWrapper} className="auth-card-anim">

            {/* Mobile logo */}
            <div style={{ display:'none', alignItems:'center', gap:'10px', marginBottom:'28px', justifyContent:'center' }} className="mobile-logo">
              <div style={{ ...S.logoGlyph, width:'40px', height:'40px', borderRadius:'12px', fontSize:'16px' }}>G</div>
              <span style={{ ...S.logoText, fontSize:'18px' }}>Glowify AI</span>
            </div>

            {/* Dynamic heading */}
            <div style={{ marginBottom:'4px' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'6px' }}>
                {view === 'reset' && (
                  <button onClick={() => switchView('login')} style={{ ...S.linkBtn, fontSize:'13px', display:'flex', alignItems:'center', gap:'4px', marginBottom:'8px' }}>
                    ← Back
                  </button>
                )}
              </div>
              <h1 style={S.heading}>
                {view === 'login' && 'Welcome back'}
                {view === 'signup' && 'Start for free'}
                {view === 'reset' && 'Reset password'}
              </h1>
              <p style={S.subheading}>
                {view === 'login' && 'Sign in to your Glowify dashboard'}
                {view === 'signup' && 'Join 2,400+ store owners using Glowify AI'}
                {view === 'reset' && "We'll send a recovery link to your email"}
              </p>
            </div>

            {/* ─── FORM CARD ─── */}
            <div style={S.card}>
              <div style={S.cardTopLine} />

              {/* Error */}
              {authError && (
                <div style={S.errorBox} className="msg-anim">
                  <AlertCircle size={15} color="#F87171" />
                  <span style={{ fontSize:'13px', color:'#F87171' }}>{authError}</span>
                </div>
              )}

              {/* Success */}
              {authSuccess && (
                <div style={S.successBox} className="msg-anim">
                  <CheckCircle size={15} color="#34D399" />
                  <span style={{ fontSize:'13px', color:'#34D399' }}>{authSuccess}</span>
                </div>
              )}

              {/* ── LOGIN ── */}
              {view === 'login' && (
                <>
                  <GoogleButton onClick={handleGoogle} isLoading={googleLoading} />
                  <Divider />
                  <InputField label="Email Address" type="email" value={email} onChange={setEmail} placeholder="alex@yourstore.com" IconLeft={Mail} />
                  <InputField
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={setPassword}
                    placeholder="••••••••"
                    IconLeft={Lock}
                    hasRight
                    onRightClick={() => setShowPassword(p => !p)}
                    rightIcon={showPassword ? EyeOff : Eye}
                  />
                  <div style={{ display:'flex', justifyContent:'flex-end', marginTop:'-8px', marginBottom:'16px' }}>
                    <button onClick={() => switchView('reset')} style={{ ...S.linkBtn, fontSize:'12px', color:'#818CF8' }}>
                      Forgot password?
                    </button>
                  </div>
                  <PrimaryButton onClick={handleLogin} isLoading={loading}>
                    Sign In →
                  </PrimaryButton>
                </>
              )}

              {/* ── SIGNUP ── */}
              {view === 'signup' && (
                <>
                  <GoogleButton onClick={handleGoogle} isLoading={googleLoading} />
                  <Divider />
                  <div style={S.twoCol}>
                    <InputField label="Full Name" type="text" value={fullName} onChange={setFullName} placeholder="Alex Johnson" IconLeft={User} />
                    <InputField label="Store Name" type="text" value={storeName} onChange={setStoreName} placeholder="My Store" IconLeft={ShoppingBag} />
                  </div>
                  <InputField label="Email Address" type="email" value={email} onChange={setEmail} placeholder="alex@yourstore.com" IconLeft={Mail} />
                  <InputField
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={setPassword}
                    placeholder="Min. 6 characters"
                    IconLeft={Lock}
                    hasRight
                    onRightClick={() => setShowPassword(p => !p)}
                    rightIcon={showPassword ? EyeOff : Eye}
                  />
                  <InputField
                    label="Confirm Password"
                    type={showConfirm ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                    placeholder="Re-enter password"
                    IconLeft={Lock}
                    hasRight
                    onRightClick={() => setShowConfirm(p => !p)}
                    rightIcon={showConfirm ? EyeOff : Eye}
                  />
                  <div style={{ display:'flex', alignItems:'center', gap:'6px', marginBottom:'16px' }}>
                    <Lock size={11} color="#4B5563" />
                    <span style={{ fontSize:'11px', color:'#4B5563' }}>Your data is encrypted and never shared</span>
                  </div>
                  <PrimaryButton onClick={handleSignup} isLoading={loading}>
                    Create Account →
                  </PrimaryButton>
                </>
              )}

              {/* ── RESET ── */}
              {view === 'reset' && (
                <>
                  <InputField label="Email Address" type="email" value={email} onChange={setEmail} placeholder="alex@yourstore.com" IconLeft={Mail} />
                  <PrimaryButton onClick={handleReset} isLoading={loading}>
                    Send Reset Link →
                  </PrimaryButton>
                </>
              )}
            </div>

            {/* Switch view */}
            <div style={{ textAlign:'center', marginTop:'20px' }}>
              {view === 'login' && (
                <span style={S.mutedText}>
                  Don't have an account?{' '}
                  <button onClick={() => switchView('signup')} style={{ ...S.linkBtn, fontWeight:'600' }}>
                    Start for free
                  </button>
                </span>
              )}
              {view === 'signup' && (
                <span style={S.mutedText}>
                  Already have an account?{' '}
                  <button onClick={() => switchView('login')} style={{ ...S.linkBtn, fontWeight:'600' }}>
                    Sign in
                  </button>
                </span>
              )}
              {view === 'reset' && (
                <button onClick={() => switchView('login')} style={{ ...S.linkBtn, color:'#818CF8' }}>
                  ← Back to sign in
                </button>
              )}
            </div>

            {/* Footer */}
            <div style={{ textAlign:'center', marginTop:'24px' }}>
              <p style={{ fontSize:'11px', color:'#374151', marginBottom:'8px' }}>
                By continuing you agree to our{' '}
                <span style={{ color:'#6366F1', cursor:'pointer' }}>Terms</span>
                {' '}and{' '}
                <span style={{ color:'#6366F1', cursor:'pointer' }}>Privacy Policy</span>
              </p>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'6px' }}>
                <Lock size={10} color="#374151" />
                <span style={{ fontSize:'11px', color:'#374151' }}>256-bit SSL · SOC2 Compliant · GDPR Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


const OverviewPage = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {KPI_DATA.map((kpi, i) => (
        <Card key={i} className="p-4 space-y-2">
          <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest">{kpi.label}</p>
          <h3 className="text-xl font-bold text-white">{kpi.value}</h3>
          <div className="flex items-center gap-1">
             <span className={`text-[10px] font-bold ${kpi.delta.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>{kpi.delta}</span>
             <span className="text-[10px] text-[#4B5563]">vs last month</span>
          </div>
        </Card>
      ))}
    </div>
    
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <SectionHeader title="Revenue Overview" subtitle="60-day performance trend" icon={TrendingUp} />
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={REVENUE_60D || []}>
            <defs>
              <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E1E2E" vertical={false} />
            <XAxis dataKey="day" hide />
            <YAxis hide domain={['auto', 'auto']} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="value" stroke="#6366F1" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
          </AreaChart>
        </ResponsiveContainer>
      </Card>
      
      <Card>
        <SectionHeader title="Channels" subtitle="Revenue split" icon={PieChartIcon} />
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={REVENUE_BY_CHANNEL || []}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {(REVENUE_BY_CHANNEL || []).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="bottom" height={36}/>
          </PieChart>
        </ResponsiveContainer>
      </Card>
    </div>
  </div>
);

function App() {
  const [firebaseUser, setFirebaseUser] = React.useState(undefined)
  const [activePage, setActivePage] = React.useState('Overview');

  const activePageData = useMemo(() => {
    return [
      { name: 'Overview', icon: Home },
      { name: 'Analytics', icon: BarChart2 },
      { name: 'Customers', icon: Users },
      { name: 'Marketing', icon: Megaphone },
      { name: 'Inventory', icon: Package },
      { name: 'AI Center', icon: Bot },
      { name: 'Settings', icon: Settings },
    ].find(p => p.name === activePage) || { name: 'Overview', icon: Home };
  }, [activePage]);

  React.useEffect(() => {
    console.log('App useEffect running', { firebaseAuth })
    if (!firebaseAuth || !firebaseAuth.onAuthStateChanged) {
      console.warn('Firebase auth not found or missing onAuthStateChanged')
      setFirebaseUser(null)
      return
    }
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      console.log('Auth state changed', user)
      setFirebaseUser(user !== undefined ? user : null)
    })
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe()
    }
  }, [])

  if (firebaseUser === undefined) {
    return (
      <div style={{ minHeight: '100vh', background: '#0A0A0F', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '4px solid #6366F1', borderTopColor: 'transparent', animation: 'spin 0.8s linear infinite' }} />
        <p style={{ color: '#6B7280', fontSize: '14px', fontFamily: 'system-ui' }}>Loading Glowify AI...</p>
        <style>{` @keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  if (!firebaseUser) {
    return <AuthScreen onAuthSuccess={(user) => setFirebaseUser(user)} />
  }
  
  return (
    <div className="flex h-screen bg-[#0A0A0F] text-slate-300">
      <aside className="w-64 bg-[#07070B] border-r border-[#1E1E2E] p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">G</div>
          <h1 className="text-white font-bold text-lg tracking-tight">Glowify AI</h1>
        </div>
        <nav className="flex flex-col gap-1.5">
          {[
            { name: 'Overview', icon: Home },
            { name: 'Analytics', icon: BarChart2 },
            { name: 'Customers', icon: Users },
            { name: 'Marketing', icon: Megaphone },
            { name: 'Inventory', icon: Package },
            { name: 'AI Center', icon: Bot },
            { name: 'Settings', icon: Settings },
          ].map(p => (
            <button 
              key={p.name} 
              onClick={() => setActivePage(p.name)} 
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${activePage === p.name ? 'bg-indigo-600/10 text-indigo-400 font-semibold' : 'text-[#6B7280] hover:text-slate-300 hover:bg-white/5'}`}
            >
              <p.icon size={18} />
              {p.name}
            </button>
          ))}
          <button 
            onClick={async () => { await firebaseAuth.signOut(); setFirebaseUser(null); }} 
            className="flex items-center gap-3 px-3 py-2.5 mt-10 rounded-xl text-sm text-red-500 hover:bg-red-500/10 transition-all"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </nav>
        <div className="mt-auto p-4 bg-[#111118] border border-[#1E1E2E] rounded-2xl flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-xs">{firebaseUser?.displayName?.charAt(0) || 'U'}</div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-white truncate">{firebaseUser?.displayName || 'User'}</p>
            <p className="text-[10px] text-[#6B7280] truncate">{firebaseUser?.email}</p>
          </div>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex items-center justify-between mb-8">
           <div>
             <h2 className="text-2xl font-bold text-white tracking-tight">{activePage}</h2>
             <p className="text-xs text-[#6B7280] mt-1">Real-time intelligence from all your channels</p>
           </div>
           <div className="flex items-center gap-3">
             <button className="w-10 h-10 rounded-xl bg-[#111118] border border-[#1E1E2E] flex items-center justify-center text-[#6B7280] hover:text-white"><Bell size={18} /></button>
             <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-xl text-white text-sm font-semibold hover:bg-indigo-500 transition-all"><Plus size={16} /> New Action</button>
           </div>
        </header>
        {activePage === 'Overview' && <OverviewPage />}
        {activePage !== 'Overview' && <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 mb-4"><activePageData.icon size={32} /></div>
            <h3 className="text-xl font-bold text-white">{activePage} Module</h3>
            <p className="text-sm text-[#6B7280] mt-2 max-w-xs">This intelligence module is currently analyzing your data streams. Check back shortly.</p>
          </div>}
      </main>
    </div>
  );
}

const WrappedApp = () => (
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
)
export default WrappedApp

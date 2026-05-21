import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
  Home, Bot, BarChart2, Megaphone, Package, Users, Zap, Settings, Bell,
  TrendingUp, TrendingDown, ShoppingCart, Mail, AlertCircle, AlertTriangle,
  CheckCircle, Target, Activity, Globe, CreditCard, Shield, Lock, Eye,
  EyeOff, User, ShoppingBag, LogOut, X, Menu, ArrowUpRight, ArrowDownRight,
  Star, Clock, DollarSign, Percent, Filter, Download, Upload, Plus,
  Minus, Edit, Trash2, Copy, ExternalLink, ToggleLeft, ToggleRight,
  Cpu, Database, Wifi, WifiOff
} from 'lucide-react';
import { firebaseAuth } from './lib/firebase';

const AuthScreen = ({ onAuthSuccess }) => {
  const [view, setView] = React.useState('login')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleLogin = async () => {
    const { user } = await firebaseAuth.signInWithEmail(email, password)
    if (user) onAuthSuccess(user)
  }

  return (
    <div style={{ background: '#0A0A0F', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="bg-[#111118] border border-[#1E1E2E] p-8 rounded-2xl w-full max-w-md">
        <h1 className="text-white text-2xl font-bold mb-4">{view === 'login' ? 'Welcome Back' : 'Sign Up'}</h1>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full p-3 mb-4 bg-[#0A0A0F] text-white border border-[#1E1E2E] rounded-lg" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="w-full p-3 mb-4 bg-[#0A0A0F] text-white border border-[#1E1E2E] rounded-lg" />
        <button onClick={handleLogin} className="w-full py-3 bg-indigo-600 text-white rounded-lg font-bold">Sign In</button>
      </div>
    </div>
  )
}

const App = () => {
  // ─── MOCK DATA ENGINE ─────────────────────────────────────
  const STORE_OWNER = {
    name: 'Alex Johnson',
    email: 'alex@glowifybeauty.com',
    store: 'Glowify Beauty Co.',
    plan: 'Enterprise',
    planStatus: 'Active',
    location: 'Austin, Texas, USA',
    shopifyDomain: 'glowifybeauty.myshopify.com',
    memberSince: 'March 14, 2024',
    daysActive: 61,
    revenueViaAI: 84200,
    aiActionsTaken: 147,
    automationsActive: 23,
    integrations: ['Shopify', 'Meta Ads', 'Google Ads', 'Klaviyo', 'Stripe'],
    avatar: 'AJ',
  }

  const REVENUE_DATA_60 = Array.from({ length: 60 }, (_, i) => {
    const d = new Date('2024-03-14')
    d.setDate(d.getDate() + i)
    const base = 3200
    const growth = (i / 59) * 3600
    const wave = Math.sin(i * 0.8) * 400
    const noise = (Math.random() - 0.5) * 500
    const weekendBoost = (d.getDay() === 5 || d.getDay() === 6) ? 700 : 0
    return {
      day: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      revenue: Math.max(1800, Math.round(base + growth + wave + noise + weekendBoost)),
      orders: Math.round((base + growth + noise) / 74 + Math.random() * 8),
      roas: parseFloat((3.8 + Math.random() * 1.4).toFixed(2)),
      convRate: parseFloat((0.028 + Math.random() * 0.012).toFixed(4)),
    }
  })

  const REVENUE_7 = REVENUE_DATA_60.slice(-7)
  const REVENUE_30 = REVENUE_DATA_60.slice(-30)

  const KPI_METRICS = [
    { id: 'revenue', label: 'Revenue', value: '$284,920', trend: '+18.4%', up: true, spark: [18200,21400,19800,24100,22700,26300,28400] },
    { id: 'orders', label: 'Orders', value: '3,847', trend: '+12.1%', up: true, spark: [410,480,520,610,780,920,127] },
    { id: 'conv', label: 'Conv. Rate', value: '3.24%', trend: '-0.4%', up: false, spark: [3.1,3.3,3.4,3.2,3.5,3.1,3.24] },
    { id: 'roas', label: 'ROAS', value: '4.7x', trend: '+8.2%', up: true, spark: [4.1,4.3,4.5,4.4,4.8,5.0,4.7] },
    { id: 'aov', label: 'AOV', value: '$74.06', trend: '+3.1%', up: true, spark: [68,70,71,73,72,75,74] },
    { id: 'returning', label: 'Returning', value: '41%', trend: '+5.6%', up: true, spark: [34,36,37,38,40,41,41] },
  ]

  const PRODUCTS = [
    { id:1, rank:1, name:'Vitamin C Brightening Serum', type:'Serum', units:420, revenue:37800, rating:4.9, margin:68, stock:12, trend:'up', status:'Low Stock' },
    { id:2, rank:2, name:'Retinol Night Repair Cream', type:'Moisturiser', units:310, revenue:24800, rating:4.7, margin:71, stock:48, trend:'up', status:'Healthy' },
    { id:3, rank:3, name:'SPF 50 Daily Shield', type:'SPF', units:280, revenue:16800, rating:4.6, margin:58, stock:92, trend:'flat', status:'Healthy' },
    { id:4, rank:4, name:'Peptide Eye Cream', type:'Eye Care', units:190, revenue:15200, rating:4.8, margin:74, stock:31, trend:'up', status:'Healthy' },
    { id:5, rank:5, name:'Hydrating Rose Toner', type:'Toner', units:160, revenue:9600, rating:4.5, margin:61, stock:0, trend:'down', status:'Out of Stock' },
    { id:6, rank:6, name:'AHA/BHA Exfoliant', type:'Exfoliant', units:140, revenue:11200, rating:4.6, margin:66, stock:78, trend:'flat', status:'Healthy' },
    { id:7, rank:7, name:'Niacinamide Pore Serum', type:'Serum', units:120, revenue:8400, rating:4.4, margin:63, stock:18, trend:'up', status:'Low Stock' },
    { id:8, rank:8, name:'Collagen Boost Moisturiser', type:'Moisturiser', units:98, revenue:7840, rating:4.3, margin:69, stock:55, trend:'flat', status:'Healthy' },
  ]

  const CAMPAIGNS = [
    { id:1, name:'Spring Glow Sale', platform:'Meta', budget:'$200/d', spent:'$1,840', roas:'3.8x', metric:'2.1%', status:'Active', action:'View' },
    { id:2, name:'Retinol Awareness', platform:'Meta', budget:'$80/d', spent:'$740', roas:'2.9x', metric:'1.4%', status:'Underperforming', action:'Pause' },
    { id:3, name:'Google Shopping — Serums', platform:'Google', budget:'$150/d', spent:'$1,380', roas:'5.6x', metric:'3.8%', status:'Active', action:'Scale' },
    { id:4, name:'Google Brand Search', platform:'Google', budget:'$60/d', spent:'$540', roas:'6.1x', metric:'8.2%', status:'Active', action:'View' },
    { id:5, name:'VIP Win-Back Email', platform:'Klaviyo', budget:'—', spent:'—', roas:'—', metric:'44% OR', status:'Sent', action:'Report' },
    { id:6, name:'Flash Sale Blast', platform:'Klaviyo', budget:'—', spent:'—', roas:'—', metric:'38% OR', status:'Sent', action:'Report' },
  ]

  const AUTOMATIONS_DATA = [
    { id:1, name:'Abandoned Cart Recovery', type:'Email', trigger:'Cart abandoned 1h', lastRun:'12 min ago', actions:847, active:true, revenue:31200 },
    { id:2, name:'Low Stock Alert + PO', type:'Inventory', trigger:'Stock < 20 units', lastRun:'2h ago', actions:14, active:true, revenue:0 },
    { id:3, name:'VIP Tier Auto-Tag', type:'CRM', trigger:'3rd purchase', lastRun:'4h ago', actions:284, active:true, revenue:12800 },
    { id:4, name:'Underperforming Ad Pause', type:'Paid Ads', trigger:'ROAS < 2.5x for 24h', lastRun:'Yesterday', actions:7, active:true, revenue:4200 },
    { id:5, name:'Post-Purchase Review Request', type:'Email', trigger:'5 days post-delivery', lastRun:'3h ago', actions:1840, active:true, revenue:0 },
    { id:6, name:'Win-Back Sequence', type:'Email', trigger:'45 days no purchase', lastRun:'6h ago', actions:810, active:true, revenue:18400 },
    { id:7, name:'Price Match Alert', type:'Pricing', trigger:'Competitor price drop', lastRun:'1 day ago', actions:23, active:true, revenue:0 },
    { id:8, name:'New Customer Welcome', type:'Email', trigger:'First purchase', lastRun:'8 min ago', actions:1420, active:true, revenue:7400 },
    { id:9, name:'Flash Sale Auto-Launch', type:'Marketing', trigger:'Inventory > 200 units', lastRun:'12 days ago', actions:3, active:false, revenue:14800 },
    { id:10, name:'Upsell After Purchase', type:'Email', trigger:'Post-checkout', lastRun:'1h ago', actions:640, active:true, revenue:9200 },
  ]

  const AI_ACTIONS = [
    { id:1, icon:'Zap', title:'Paused underperforming Facebook Ad Set #7', result:'Saved $340 in wasted spend', time:'Today 9:14am', status:'Completed', impact:340 },
    { id:2, icon:'Mail', title:'Sent win-back campaign to 1,840 lapsed customers', result:'$6,200 recovered in 48h', time:'Yesterday 2:00pm', status:'Completed', impact:6200 },
    { id:3, icon:'Package', title:'Triggered restock PO for Vitamin C Serum', result:'120 units ordered from supplier', time:'Yesterday 10:30am', status:'Completed', impact:0 },
    { id:4, icon:'TrendingUp', title:'Scaled Google Shopping budget +30%', result:'ROAS at 5.2x within target', time:'May 16', status:'Completed', impact:4200 },
    { id:5, icon:'AlertCircle', title:'Detected mobile checkout bug on Safari', result:'Flagged for dev team — ticket #1094', time:'May 15', status:'Running', impact:0 },
    { id:6, icon:'Mail', title:'Launched Flash Sale to VIP segment', result:'41% open rate — $14,800 GMV', time:'May 14', status:'Completed', impact:14800 },
    { id:7, icon:'Zap', title:'A/B test on PDP hero image started', result:'Variant B winning by 12% CTR', time:'May 12', status:'Running', impact:0 },
    { id:8, icon:'Package', title:'Auto-repriced 14 SKUs vs competitors', result:'Avg margin improved +2.3%', time:'May 10', status:'Completed', impact:2100 },
  ]
  
  // ─── END MOCK DATA ─────────────────────────────────────────

  const [firebaseUser, setFirebaseUser] = React.useState(undefined)
  const [authReady, setAuthReady] = React.useState(false)
  const [activePage, setActivePage] = React.useState('overview')
  
  React.useEffect(() => {
    let unsubscribe = () => {}
    try {
      unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
        setFirebaseUser(user || null)
        setAuthReady(true)
      })
    } catch (err) {
      console.error('Auth listener error:', err)
      setFirebaseUser(null)
      setAuthReady(true)
    }
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe()
    }
  }, [])

  const tableStyles = {
    table: { width:'100%', borderCollapse:'collapse' },
    th: { padding:'10px 14px', textAlign:'left', fontSize:'11px', color:'#6B7280', textTransform:'uppercase', letterSpacing:'0.06em', borderBottom:'1px solid #1E1E2E', fontWeight:'600' },
    td: { padding:'12px 14px', fontSize:'13px', color:'#9CA3AF', borderBottom:'1px solid rgba(30,30,46,0.5)', verticalAlign:'middle' },
    tdWhite: { padding:'12px 14px', fontSize:'13px', color:'white', fontWeight:'500', borderBottom:'1px solid rgba(30,30,46,0.5)', verticalAlign:'middle' },
    row: { cursor:'default', transition:'background 0.15s' },
  }

  if (!authReady) {
    return (
      <div style={{ minHeight: '100vh', background: '#0A0A0F', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '4px solid #6366F1', borderTopColor: 'transparent', animation: 'spin 0.8s linear infinite' }} />
        <style>{` @keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  if (!firebaseUser) {
    return (
      <AuthScreen onAuthSuccess={(user) => {
        setFirebaseUser(user)
        setAuthReady(true)
      }} />
    )
  }

  const renderContent = () => {
    switch (activePage) {
        case 'ai-command':
            return (
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ background: '#111118', border: '#1E1E2E', borderRadius: '16px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'white', fontWeight: '600' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 8px #10B981', animation: 'pulse 2s infinite' }} />
                                Glowify Intelligence — Active
                            </div>
                            <div style={{ color: '#6B7280', fontSize: '13px', marginTop: '4px' }}>147 actions taken · 23 automations running · Last action: 4 min ago</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ color: '#6B7280', fontSize: '12px' }}>AI Health Score</div>
                            <div style={{ color: '#6366F1', fontSize: '36px', fontWeight: '800' }}>94/100</div>
                        </div>
                    </div>
                    <div>
                        <h2 style={{ color: 'white', fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>Recent AI Actions</h2>
                        <table style={tableStyles.table}>
                            <thead>
                                <tr>
                                    <th style={tableStyles.th}>Action</th>
                                    <th style={tableStyles.th}>Result</th>
                                    <th style={tableStyles.th}>Time</th>
                                    <th style={tableStyles.th}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {AI_ACTIONS.map(action => (
                                    <tr key={action.id} style={{ borderBottom: '1px solid rgba(30,30,46,0.5)' }}>
                                        <td style={tableStyles.tdWhite}>
                                            <span style={{ background: 'rgba(99,102,241,0.1)', color: '#818CF8', borderRadius: '6px', padding: '4px 8px', fontSize: '11px', marginRight: '8px' }}>{action.icon}</span>
                                            {action.title}
                                        </td>
                                        <td style={tableStyles.td}>{action.result}</td>
                                        <td style={tableStyles.td}>{action.time}</td>
                                        <td style={tableStyles.td}>
                                            <span style={{ background: action.status === 'Completed' ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)', color: action.status === 'Completed' ? '#34D399' : '#FCD34D', padding: '4px 8px', borderRadius: '6px' }}>{action.status}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        default:
            return <div className="text-white p-8">Welcome, {firebaseUser?.displayName || 'Alex'}. Page: {activePage}</div>
    }
  }

  return (
    <div className="flex h-screen bg-[#0A0A0F] text-slate-300 font-sans">
      <nav className="w-64 border-r border-[#1E1E2E] p-6 flex flex-col gap-6">
        <div className="text-white font-bold text-xl mb-4">Glowify AI</div>
        {['overview', 'ai-command', 'analytics', 'marketing', 'products', 'customers', 'automations', 'settings'].map(page => (
            <button key={page} onClick={() => setActivePage(page)} style={{ color: activePage === page ? '#6366F1' : '#6B7280', display: 'flex', alignItems: 'center', gap: '10px', textTransform: 'capitalize' }}>
                {page}
            </button>
        ))}
      </nav>
      <main className="flex-1 overflow-y-auto">
        {renderContent()}
        <button
          onClick={async () => {
            try { await firebaseAuth.signOut() } catch (err) { console.error('Sign out error:', err) }
            finally { setFirebaseUser(null); setAuthReady(true) }
          }}
          className="mt-6 ml-8 flex items-center gap-2 text-red-500"
        >
          <LogOut size={18} /> Sign Out
        </button>
      </main>
      <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }`}</style>
    </div>
  )
}

export default App;

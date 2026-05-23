import React, { useState, useEffect, useMemo } from 'react';
import { firebaseAuth, firestoreHelpers } from './lib/firebase'
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
import { firebaseAuth, firestoreHelpers } from './lib/firebase';

const REVENUE_DATA_60 = Array.from({length:60},(_,i)=>{
  const d = new Date('2024-03-14')
  d.setDate(d.getDate()+i)
  const base=3200,growth=(i/59)*3600,wave=Math.sin(i*0.8)*400
  const noise=(Math.random()-0.5)*500
  const wb=(d.getDay()===5||d.getDay()===6)?700:0
  return {
    date:d.toISOString().split('T')[0],
    day:d.toLocaleDateString('en-US',{month:'short',day:'numeric'}),
    revenue:Math.max(1800,Math.round(base+growth+wave+noise+wb)),
    orders:Math.round((base+growth)/74+Math.random()*8),
    roas:parseFloat((3.8+Math.random()*1.4).toFixed(2)),
    convRate:parseFloat((0.028+Math.random()*0.012).toFixed(4)),
  }
})

const PRODUCTS = [
  {id:1,rank:1,name:'Vitamin C Brightening Serum',type:'Serum',units:420,revenue:37800,rating:4.9,margin:68,stock:12,trend:'up',status:'Low Stock'},
  {id:2,rank:2,name:'Retinol Night Repair Cream',type:'Moisturiser',units:310,revenue:24800,rating:4.7,margin:71,stock:48,trend:'up',status:'Healthy'},
  {id:3,rank:3,name:'SPF 50 Daily Shield',type:'SPF',units:280,revenue:16800,rating:4.6,margin:58,stock:92,trend:'flat',status:'Healthy'},
  {id:4,rank:4,name:'Peptide Eye Cream',type:'Eye Care',units:190,revenue:15200,rating:4.8,margin:74,stock:31,trend:'up',status:'Healthy'},
  {id:5,rank:5,name:'Hydrating Rose Toner',type:'Toner',units:160,revenue:9600,rating:4.5,margin:61,stock:0,trend:'down',status:'Out of Stock'},
  {id:6,rank:6,name:'AHA/BHA Exfoliant',type:'Exfoliant',units:140,revenue:11200,rating:4.6,margin:66,stock:78,trend:'flat',status:'Healthy'},
  {id:7,rank:7,name:'Niacinamide Pore Serum',type:'Serum',units:120,revenue:8400,rating:4.4,margin:63,stock:18,trend:'up',status:'Low Stock'},
  {id:8,rank:8,name:'Collagen Boost Moisturiser',type:'Moisturiser',units:98,revenue:7840,rating:4.3,margin:69,stock:55,trend:'flat',status:'Healthy'},
]

const AUTOMATIONS_DATA = [
  {id:1,name:'Abandoned Cart Recovery',type:'Email',trigger:'Cart abandoned 1h',lastRun:'12 min ago',actions:847,active:true,revenue:31200},
  {id:2,name:'Low Stock Alert + PO',type:'Inventory',trigger:'Stock < 20 units',lastRun:'2h ago',actions:14,active:true,revenue:0},
  {id:3,name:'VIP Tier Auto-Tag',type:'CRM',trigger:'3rd purchase',lastRun:'4h ago',actions:284,active:true,revenue:12800},
  {id:4,name:'Underperforming Ad Pause',type:'Paid Ads',trigger:'ROAS < 2.5x for 24h',lastRun:'Yesterday',actions:7,active:true,revenue:4200},
  {id:5,name:'Post-Purchase Review Request',type:'Email',trigger:'5 days post-delivery',lastRun:'3h ago',actions:1840,active:true,revenue:0},
  {id:6,name:'Win-Back Sequence',type:'Email',trigger:'45 days no purchase',lastRun:'6h ago',actions:810,active:true,revenue:18400},
  {id:7,name:'Price Match Alert',type:'Pricing',trigger:'Competitor price drop',lastRun:'1 day ago',actions:23,active:true,revenue:0},
  {id:8,name:'New Customer Welcome',type:'Email',trigger:'First purchase',lastRun:'8 min ago',actions:1420,active:true,revenue:7400},
  {id:9,name:'Flash Sale Auto-Launch',type:'Marketing',trigger:'Inventory > 200 units',lastRun:'12 days ago',actions:3,active:false,revenue:14800},
  {id:10,name:'Upsell After Purchase',type:'Email',trigger:'Post-checkout',lastRun:'1h ago',actions:640,active:true,revenue:9200},
]

const AI_ACTIONS = [
  {id:1,icon:'Zap',title:'Paused underperforming Facebook Ad Set #7',result:'Saved $340 in wasted spend',time:'Today 9:14am',status:'Completed',impact:340},
  {id:2,icon:'Mail',title:'Sent win-back campaign to 1,840 lapsed customers',result:'$6,200 recovered in 48h',time:'Yesterday 2:00pm',status:'Completed',impact:6200},
  {id:3,icon:'Package',title:'Triggered restock PO for Vitamin C Serum',result:'120 units ordered from supplier',time:'Yesterday 10:30am',status:'Completed',impact:0},
  {id:4,icon:'TrendingUp',title:'Scaled Google Shopping budget +30%',result:'ROAS at 5.2x within target',time:'May 16',status:'Completed',impact:4200},
  {id:5,icon:'AlertCircle',title:'Detected mobile checkout bug on Safari',result:'Flagged for dev — ticket #1094',time:'May 15',status:'Running',impact:0},
  {id:6,icon:'Mail',title:'Launched Flash Sale to VIP segment',result:'41% open rate — $14,800 GMV',time:'May 14',status:'Completed',impact:14800},
  {id:7,icon:'Zap',title:'A/B test on PDP hero image started',result:'Variant B winning by 12% CTR',time:'May 12',status:'Running',impact:0},
  {id:8,icon:'Package',title:'Auto-repriced 14 SKUs vs competitors',result:'Avg margin improved +2.3%',time:'May 10',status:'Completed',impact:2100},
]

const ACTIVITY_FEED = [
  {id:1,type:'order',color:'#10B981',text:'Order #8821 — New York, US',amount:'$142.00',time:'1 min ago'},
  {id:2,type:'order',color:'#10B981',text:'Order #8820 — London, UK',amount:'$89.00',time:'3 min ago'},
  {id:3,type:'marketing',color:'#6366F1',text:'Flash Sale email sent to 4,200 subscribers',amount:null,time:'8 min ago'},
  {id:4,type:'alert',color:'#F59E0B',text:'Stock alert: Retinol Cream below 20 units',amount:null,time:'12 min ago'},
  {id:5,type:'order',color:'#10B981',text:'Order #8819 — Toronto, CA',amount:'$210.00',time:'14 min ago'},
  {id:6,type:'marketing',color:'#6366F1',text:'Facebook Campaign #3 hit daily spend cap',amount:null,time:'22 min ago'},
  {id:7,type:'order',color:'#10B981',text:'Order #8818 — Sydney, AU',amount:'$67.00',time:'28 min ago'},
  {id:8,type:'automation',color:'#8B5CF6',text:'Abandoned cart recovery — $340 recovered',amount:'$340.00',time:'35 min ago'},
  {id:9,type:'alert',color:'#EF4444',text:'Conversion drop on /collections/skincare',amount:null,time:'41 min ago'},
  {id:10,type:'order',color:'#10B981',text:'Order #8817 — Chicago, US',amount:'$189.00',time:'47 min ago'},
  {id:11,type:'marketing',color:'#10B981',text:'Google Shopping ROAS reached 5.2x',amount:null,time:'1h ago'},
  {id:12,type:'order',color:'#10B981',text:'Order #8816 — Berlin, DE',amount:'$93.00',time:'1h 10m ago'},
]

const CAMPAIGNS = [
  {id:1,name:'Spring Glow Sale',platform:'Meta',budget:'$200/d',spent:'$1,840',roas:'3.8x',metric:'2.1% CTR',status:'Active',action:'View'},
  {id:2,name:'Retinol Awareness',platform:'Meta',budget:'$80/d',spent:'$740',roas:'2.9x',metric:'1.4% CTR',status:'Underperforming',action:'Pause'},
  {id:3,name:'Google Shopping — Serums',platform:'Google',budget:'$150/d',spent:'$1,380',roas:'5.6x',metric:'3.8% CTR',status:'Active',action:'Scale'},
  {id:4,name:'Google Brand Search',platform:'Google',budget:'$60/d',spent:'$540',roas:'6.1x',metric:'8.2% CTR',status:'Active',action:'View'},
  {id:5,name:'VIP Win-Back Email',platform:'Klaviyo',budget:'—',spent:'—',roas:'—',metric:'44% OR',status:'Sent',action:'Report'},
  {id:6,name:'Flash Sale Blast',platform:'Klaviyo',budget:'—',spent:'—',roas:'—',metric:'38% OR',status:'Sent',action:'Report'},
]

const AI_INSIGHTS = [
  {id:1,type:'WARNING',color:'#F59E0B',bg:'rgba(245,158,11,0.1)',border:'rgba(245,158,11,0.25)',title:'Ad Frequency Too High',desc:'Facebook ad frequency hit 4.8x. Rotate new ad sets within 48h.',dismissed:false},
  {id:2,type:'OPPORTUNITY',color:'#6366F1',bg:'rgba(99,102,241,0.1)',border:'rgba(99,102,241,0.25)',title:'Bundle Upsell Untapped',desc:'67% of Vitamin C buyers view Retinol. A bundle could recover $12K/month.',dismissed:false},
  {id:3,type:'TREND',color:'#10B981',bg:'rgba(16,185,129,0.1)',border:'rgba(16,185,129,0.25)',title:'Mobile Revenue Up 28%',desc:'Mobile now drives 61% of orders. Consider mobile-first creatives.',dismissed:false},
]

const App = () => {
  const [firebaseUser,  setFirebaseUser]  = React.useState(undefined)
  const [authReady,     setAuthReady]     = React.useState(false)
  const [userProfile,   setUserProfile]   = React.useState(null)
  const [dataLoading,   setDataLoading]   = React.useState(false)
  const [dbData, setDbData] = React.useState({
    revenueSnapshots:[],products:[],automations:[],
    aiActions:[],activityFeed:[],campaigns:[],aiInsights:[],
  })
  const [liveMetrics, setLiveMetrics] = React.useState({
    todayRevenue:6840,todayOrders:92,activeVisitors:847,
    lastOrderTime:'1 min ago',lastOrderAmount:142,
  })

  const loadUserData = React.useCallback(async (uid) => {
    setDataLoading(true)
    try {
      const [revenueSnapshots,products,automations,aiActions,activityFeed,campaigns,aiInsights] =
        await Promise.all([
          firestoreHelpers.getData(uid,'revenue_snapshots',60),
          firestoreHelpers.getData(uid,'products',20),
          firestoreHelpers.getData(uid,'automations',20),
          firestoreHelpers.getData(uid,'ai_actions',20),
          firestoreHelpers.getData(uid,'activity_feed',20),
          firestoreHelpers.getData(uid,'campaigns',20),
          firestoreHelpers.getData(uid,'ai_insights',10),
        ])
      setDbData({revenueSnapshots,products,automations,aiActions,activityFeed,campaigns,aiInsights})
      console.log('Glowify: all Firestore data loaded ✓')
    } catch(err) {
      console.error('Glowify: loadUserData error:',err.message)
    } finally {
      setDataLoading(false)
    }
  }, [])

  React.useEffect(()=>{
    console.log('Glowify: mounting auth listener')
    const unsubscribe = firebaseAuth.onAuthStateChanged(async (user) => {
      setFirebaseUser(user||null)
      setAuthReady(true)
      if (user) {
        const profile = await firestoreHelpers.getProfile(user.uid)
        if (!profile) {
          await firestoreHelpers.createUserProfile(user,{
            displayName: user.displayName||user.email?.split('@')[0],
            storeName: 'Glowify Beauty Co.',
          })
          await firestoreHelpers.seedMockData(user.uid)
          const newProfile = await firestoreHelpers.getProfile(user.uid)
          setUserProfile(newProfile)
        } else {
          setUserProfile(profile)
        }
        loadUserData(user.uid)
      } else {
        setUserProfile(null)
        setDbData({revenueSnapshots:[],products:[],automations:[],aiActions:[],activityFeed:[],campaigns:[],aiInsights:[]})
      }
    })
    const safetyTimer = setTimeout(()=>{
      setAuthReady(prev=>{ if(!prev){ setFirebaseUser(null); return true } return prev })
    }, 6000)
    return ()=>{ unsubscribe(); clearTimeout(safetyTimer) }
  }, [loadUserData])

  React.useEffect(()=>{
    if(!firebaseUser) return
    const interval = setInterval(()=>{
      setLiveMetrics(prev=>({
        todayRevenue: prev.todayRevenue + Math.round(Math.random()*180+40),
        todayOrders:  prev.todayOrders + (Math.random()>0.55?1:0),
        activeVisitors: Math.max(200,Math.round(prev.activeVisitors+(Math.random()-0.4)*40)),
        lastOrderTime: Math.random()>0.7?'Just now':prev.lastOrderTime,
        lastOrderAmount: Math.round(Math.random()*160+55),
      }))
    }, 30000)
    return ()=>clearInterval(interval)
  }, [firebaseUser])

  const displayRevenue     = dbData.revenueSnapshots.length>0 ? [...dbData.revenueSnapshots].sort((a,b)=>a.date>b.date?1:-1) : REVENUE_DATA_60
  const displayProducts    = dbData.products.length>0 ? [...dbData.products].sort((a,b)=>(a.rank||0)-(b.rank||0)) : PRODUCTS
  const displayAutomations = dbData.automations.length>0 ? dbData.automations : AUTOMATIONS_DATA
  const displayAIActions   = dbData.aiActions.length>0 ? dbData.aiActions : AI_ACTIONS
  const displayFeed        = dbData.activityFeed.length>0 ? dbData.activityFeed : ACTIVITY_FEED
  const displayCampaigns   = dbData.campaigns.length>0 ? dbData.campaigns : CAMPAIGNS
  const displayInsights    = dbData.aiInsights.length>0 ? dbData.aiInsights.filter(i=>!i.dismissed) : AI_INSIGHTS

  if(!authReady){return(<div style={{minHeight:'100vh',background:'#07070F',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'24px',fontFamily:"'Inter',system-ui,sans-serif"}}><style>{` @keyframes rr{to{transform:rotate(360deg)}} @keyframes bb{0%,100%{opacity:.8;transform:scale(.97)}50%{opacity:1;transform:scale(1.03)}} @keyframes fu{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}`}</style><div style={{position:'relative',width:'80px',height:'80px'}}><div style={{position:'absolute',inset:0,borderRadius:'50%',border:'2px solid #1E1E3A'}}/><div style={{position:'absolute',inset:0,borderRadius:'50%',border:'2px solid transparent',borderTopColor:'#6366F1',borderRightColor:'#8B5CF6',animation:'rr 1s linear infinite'}}/><div style={{position:'absolute',inset:'12px',background:'linear-gradient(135deg,#6366F1,#8B5CF6)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'22px',fontWeight:'800',color:'white',animation:'bb 2.5s ease-in-out infinite',boxShadow:'0 0 24px rgba(99,102,241,.5)'}}>G</div></div><div style={{textAlign:'center',animation:'fu .5s ease forwards'}}><div style={{fontSize:'17px',fontWeight:'700',color:'#F1F1F8',letterSpacing:'-.02em',marginBottom:'6px'}}>Glowify AI</div><div style={{fontSize:'13px',color:'#6B7280'}}>Initializing intelligence systems...</div></div></div>)}

  if(!firebaseUser){return(<AuthScreen onAuthSuccess={(user)=>{console.log('Glowify: onAuthSuccess uid:',user?.uid);setFirebaseUser(user);setAuthReady(true)}}/>)}

  return null
}

const AuthScreen = ({ onAuthSuccess }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [storeName, setStoreName] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [authError, setAuthError] = useState(null)
  const clearMessages = () => setAuthError(null)

  const handleLogin = async () => {
    if (!email || !password) { setAuthError('Please fill in all fields.'); return }
    clearMessages(); setLoading(true)
    const { user, error } = await firebaseAuth.signInWithEmail(email, password)
    setLoading(false)
    if (error) { setAuthError(error); return }
    if (user) { console.log('Glowify AuthScreen: calling onAuthSuccess'); onAuthSuccess(user) }
  }

  const handleSignup = async () => {
    if (!fullName||!email||!password||!confirmPassword) { setAuthError('Please fill in all fields.'); return }
    if (password!==confirmPassword) { setAuthError('Passwords do not match.'); return }
    if (password.length<6) { setAuthError('Password must be at least 6 characters.'); return }
    clearMessages(); setLoading(true)
    const { user, error } = await firebaseAuth.signUpWithEmail(email, password, fullName, storeName)
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

  return null
}

export default App

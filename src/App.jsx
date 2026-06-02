import { useState, useEffect } from "react";

/* ── Injected styles for animations & fonts ──────────────────────────── */
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #080808;
    font-family: 'DM Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 2px; }

  @keyframes pulse-dot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.4; transform: scale(0.85); }
  }
  @keyframes ping {
    0%   { transform: scale(1); opacity: 0.6; }
    100% { transform: scale(2.2); opacity: 0; }
  }
  @keyframes shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position: 400px 0; }
  }
  @keyframes fade-up {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }

  .fade-up { animation: fade-up 0.5s ease both; }
  .fade-up-1 { animation: fade-up 0.5s 0.08s ease both; }
  .fade-up-2 { animation: fade-up 0.5s 0.16s ease both; }
  .fade-up-3 { animation: fade-up 0.5s 0.24s ease both; }
  .fade-up-4 { animation: fade-up 0.5s 0.32s ease both; }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 12px;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.18s, color 0.18s;
    font-size: 13px;
    font-weight: 400;
    letter-spacing: 0.01em;
    color: #555;
    user-select: none;
    border: none;
    background: transparent;
    width: 100%;
    text-align: left;
  }
  .nav-item:hover { background: #151515; color: #aaa; }
  .nav-item.active { background: #161616; color: #e8e8e8; }
  .nav-item.active .nav-dot { background: #7eeaca; }

  .stat-card {
    position: relative;
    overflow: hidden;
    border: 1px solid #1c1c1c;
    border-radius: 10px;
    padding: 22px 24px;
    background: #0e0e0e;
    transition: border-color 0.25s, transform 0.25s;
    cursor: default;
  }
  .stat-card:hover { border-color: #2a2a2a; transform: translateY(-2px); }

  .insight-row {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    padding: 14px 0;
    border-bottom: 1px solid #141414;
    animation: fade-up 0.4s ease both;
  }
  .insight-row:last-child { border-bottom: none; }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 3px 9px;
    border-radius: 20px;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .action-btn {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 8px 18px;
    border-radius: 6px;
    font-size: 11.5px;
    font-weight: 500;
    letter-spacing: 0.05em;
    cursor: pointer;
    transition: all 0.2s;
    border: none;
    font-family: 'DM Sans', sans-serif;
  }

  .metric-bar-track {
    height: 3px;
    background: #1c1c1c;
    border-radius: 2px;
    margin-top: 10px;
    overflow: hidden;
  }
  .metric-bar-fill {
    height: 100%;
    border-radius: 2px;
    transition: width 1.2s cubic-bezier(0.4,0,0.2,1);
  }
`;

/* ── Colour system ───────────────────────────────────────────────────── */
const C = {
  bg:       "#080808",
  surface:  "#0e0e0e",
  border:   "#1c1c1c",
  text:     "#e8e8e8",
  muted:    "#444",
  faint:    "#222",
  green:    "#7eeaca",
  greenDim: "rgba(126,234,202,0.08)",
  sky:      "#7dd3fc",
  skyDim:   "rgba(125,211,252,0.08)",
  amber:    "#fbbf24",
  amberDim: "rgba(251,191,36,0.08)",
  rose:     "#fb7185",
  roseDim:  "rgba(251,113,133,0.08)",
  violet:   "#c4b5fd",
};

/* ── Nav items ───────────────────────────────────────────────────────── */
const NAV = [
  { id: "dashboard",   icon: "◈", label: "Dashboard"    },
  { id: "insights",    icon: "◎", label: "AI Insights"  },
  { id: "orders",      icon: "◻", label: "Orders"       },
  { id: "automations", icon: "⟳", label: "Automations"  },
  { id: "analytics",   icon: "▦", label: "Analytics"    },
  { id: "settings",    icon: "◉", label: "Settings"     },
];

/* ── Fake live data ──────────────────────────────────────────────────── */
const INSIGHTS = [
  {
    id: 1, type: "revenue", urgency: "high",
    title: "Scale Calm Stack campaign immediately",
    body: "6.8× ROAS detected on $124/day spend — well below saturation. Scaling to $380/day projects +$14,200 in monthly revenue.",
    lift: "+$14,200/mo", conf: 97,
  },
  {
    id: 2, type: "seo", urgency: "medium",
    title: "3 featured snippet opportunities unfilled",
    body: "Morning Ritual page rose from #8 → #3. Adding FAQ schema now could lock first-position snippets before competitors react.",
    lift: "+880 sessions", conf: 94,
  },
  {
    id: 3, type: "email", urgency: "medium",
    title: "Win-Back segment primed for conversion",
    body: "60-day lapsed cohort historically converts at 14%+. Scheduled flow launches tomorrow — consider adding SMS touchpoint.",
    lift: "+$1,680 this week", conf: 91,
  },
  {
    id: 4, type: "warning", urgency: "critical",
    title: "Morning Clarity creative fatigue at 58%",
    body: "CTR will drop ~40% within 7 days at current trajectory. Pause existing creative and generate cortisol-angle hooks now.",
    lift: "Prevents −$2,100", conf: 88,
  },
];

const AUTOMATIONS_DATA = [
  { name: "Welcome Flow",        status: "live",    rate: "62.4% open",  revenue: "$4,820" },
  { name: "Abandoned Cart",      status: "live",    rate: "48.1% open",  revenue: "$2,140" },
  { name: "Post-Purchase Upsell",status: "live",    rate: "54.8% open",  revenue: "$3,380" },
  { name: "Win-Back 60-Day",     status: "pending", rate: "Launches tmr", revenue: "—"     },
  { name: "VIP Tier Reveal",     status: "done",    rate: "71.2% open",  revenue: "$6,920" },
];

/* ── Helpers ─────────────────────────────────────────────────────────── */
function urgencyColor(u) {
  if (u === "critical") return { text: C.rose,   bg: C.roseDim  };
  if (u === "high")     return { text: C.green,  bg: C.greenDim };
  if (u === "medium")   return { text: C.amber,  bg: C.amberDim };
  return                       { text: C.muted,  bg: C.faint    };
}
function statusColor(s) {
  if (s === "live")    return { text: C.green, bg: C.greenDim };
  if (s === "pending") return { text: C.amber, bg: C.amberDim };
  return                      { text: C.muted, bg: C.faint    };
}
function fmt(n) {
  return n >= 1000 ? `$${(n/1000).toFixed(1)}k` : `$${n}`;
}

/* ════════════════════════════════════════════════════════════════════════
   ROOT COMPONENT
═══════════════════════════════════════════════════════════════════════ */
export default function App() {
  const [active, setActive]       = useState("dashboard");
  const [time, setTime]           = useState("");
  const [revenue, setRevenue]     = useState(34200);
  const [aiStatus, setAiStatus]   = useState("Analysing");
  const [tick, setTick]           = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date().toLocaleTimeString("en-GB", { hour:"2-digit", minute:"2-digit", second:"2-digit" }));
      setTick(t => t + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const renderContent = () => {
    console.log("renderContent called. Active state:", active);
    switch (active) {
      case "dashboard":
        return (
          <>
            {/* Stat cards */}
            <div className="fade-up-1" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14 }}>
              <StatCard label="Total Revenue" value={fmt(revenue)} delta="+18.4%" positive={true} bar={72} barColor={C.green} icon="$" />
              <StatCard label="AI Predictions" value="4 Active" delta="97% confidence" positive={true} bar={97} barColor={C.violet} icon="✦" />
              <StatCard label="Automations" value="3 Live" delta="$10.3k generated" positive={true} bar={60} barColor={C.sky} icon="⟳" />
              <StatCard label="Avg ROAS" value="4.8×" delta="↑ 0.6× this week" positive={true} bar={80} barColor={C.amber} icon="◎" />
            </div>

            {/* Two-column: Insights + Automations */}
            <div className="fade-up-2" style={{ display:"grid", gridTemplateColumns:"1.4fr 1fr", gap:16 }}>
              {/* AI Insights panel */}
              <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, overflow:"hidden" }}>
                <div style={{ padding:"16px 20px", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                  <div>
                    <div style={{ fontSize:12, fontWeight:500, color: C.text, letterSpacing:"0.02em" }}>Intelligence Feed</div>
                    <div style={{ fontSize:10, color:"#333", marginTop:2, letterSpacing:"0.06em" }}>{INSIGHTS.length} active recommendations</div>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:6, fontSize:10, color:"#333", fontFamily:"'DM Mono',monospace" }}>
                    <span style={{ animation:"blink 1.2s step-end infinite", color: C.green }}>▮</span> Live
                  </div>
                </div>
                <div style={{ padding:"4px 20px 8px" }}>
                  {INSIGHTS.map((ins, i) => {
                    const { text, bg } = urgencyColor(ins.urgency);
                    return (
                      <div key={ins.id} className="insight-row" style={{ animationDelay:`${i*0.06}s` }}>
                        <div style={{ width:32, height:32, borderRadius:8, background: bg, border:`1px solid ${text}25`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, flexShrink:0, marginTop:1 }}>
                          {ins.type === "revenue" ? "↑" : ins.type === "seo" ? "◎" : ins.type === "email" ? "✉" : "⚠"}
                        </div>
                        <div style={{ flex:1 }}>
                          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                            <span style={{ fontSize:12, fontWeight:500, color: C.text }}>{ins.title}</span>
                            <span className="badge" style={{ background: bg, color: text, border:`1px solid ${text}20` }}>{ins.urgency}</span>
                          </div>
                          <p style={{ fontSize:11.5, color:"#555", lineHeight:1.65, marginBottom:7 }}>{ins.body}</p>
                          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                            <span style={{ fontSize:11, color: text, fontWeight:500 }}>{ins.lift}</span>
                            <span style={{ fontSize:10, color:"#2f2f2f" }}>·</span>
                            <span style={{ fontSize:10, color:"#333", fontFamily:"'DM Mono',monospace" }}>{ins.conf}% confidence</span>
                            <button className="action-btn" style={{ marginLeft:"auto", background: bg, border:`1px solid ${text}25`, color: text, padding:"5px 12px", fontSize:10 }}>Execute →</button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right column */}
              <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                <div style={{ background: C.surface, border:`1px solid ${C.border}`, borderRadius:12, padding:"18px 20px" }}>
                  <div style={{ fontSize:11, color:"#333", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:14 }}>Business Health</div>
                  <div style={{ display:"flex", alignItems:"center", gap:16 }}>
                    <ScoreRing value={78} color={C.green} />
                    <div>
                      <div style={{ fontSize:22, fontWeight:300, color: C.text, lineHeight:1 }}>78 <span style={{ fontSize:13, color:"#333" }}>/ 100</span></div>
                      <div style={{ fontSize:11, color:"#444", marginTop:5, lineHeight:1.6 }}>Strong ad + email performance.<br/><span style={{ color: C.amber }}>2 SEO pages declining.</span></div>
                      <div style={{ display:"flex", gap:8, marginTop:10 }}>
                        <span className="badge" style={{ background:C.greenDim, color:C.green }}>Ads ✓</span>
                        <span className="badge" style={{ background:C.amberDim, color:C.amber }}>SEO !</span>
                        <span className="badge" style={{ background:C.roseDim, color:C.rose }}>Inv. !</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ background: C.surface, border:`1px solid ${C.border}`, borderRadius:12, overflow:"hidden", flex:1 }}>
                  <div style={{ padding:"14px 18px", borderBottom:`1px solid ${C.border}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <span style={{ fontSize:12, fontWeight:500, color: C.text }}>Automations</span>
                    <button className="action-btn" style={{ background:"transparent", border:`1px solid ${C.border}`, color:"#444", padding:"5px 11px", fontSize:10 }}>+ New</button>
                  </div>
                  {AUTOMATIONS_DATA.map((a, i) => {
                    const { text, bg } = statusColor(a.status);
                    return (
                      <div key={i} style={{ display:"flex", alignItems:"center", padding:"11px 18px", borderBottom: i < AUTOMATIONS_DATA.length-1 ? `1px solid ${C.faint}` : "none", gap:10 }}>
                        <div style={{ width:5, height:5, borderRadius:"50%", background: text, flexShrink:0, boxShadow: a.status==="live" ? `0 0 6px ${text}` : "none" }}/>
                        <span style={{ fontSize:12, color:"#aaa", flex:1 }}>{a.name}</span>
                        <span style={{ fontSize:10, color:"#333", fontFamily:"'DM Mono',monospace" }}>{a.rate}</span>
                        <span style={{ fontSize:11, color: C.green, fontWeight:500, minWidth:52, textAlign:"right" }}>{a.revenue}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        );
      default:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: C.muted }}>
            <h2 style={{ fontSize: '24px', fontWeight: 300 }}>{NAV.find(n => n.id === active)?.label || 'Page'}</h2>
            <p style={{ marginTop: '10px' }}>Content for {active} is coming soon.</p>
          </div>
        );
    }
  };

  useEffect(() => {
    if (tick % 7 === 0 && tick > 0) {
      setRevenue(v => v + Math.floor(Math.random() * 140 + 20));
    }
    if (tick % 13 === 0) {
      const states = ["Analysing", "Optimising", "Predicting", "Monitoring"];
      setAiStatus(states[tick % states.length]);
    }
  }, [tick]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_STYLES }} />

      <div style={{ display:"flex", height:"100vh", background: C.bg, color: C.text, overflow:"hidden" }}>

        {/* ── Sidebar ──────────────────────────────────────────────── */}
        <aside style={{
          width: 220,
          background: "#09090b",
          borderRight: `1px solid ${C.border}`,
          display: "flex",
          flexDirection: "column",
          padding: "0",
          flexShrink: 0,
        }}>
          {/* Logo */}
          <div style={{ padding: "24px 20px 20px", borderBottom: `1px solid ${C.border}` }}>
            <div style={{ display:"flex", alignItems:"center", gap: 10 }}>
              <div style={{
                width: 30, height: 30,
                background: "linear-gradient(135deg, #7eeaca22, #7eeaca44)",
                border: `1px solid ${C.green}44`,
                borderRadius: 8,
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize: 14,
              }}>✦</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, letterSpacing: "0.04em", color: C.text }}>Glowify</div>
                <div style={{ fontSize: 10, color: C.muted, letterSpacing: "0.1em", textTransform:"uppercase", marginTop: 1 }}>AI Platform</div>
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav style={{ flex:1, padding:"12px 10px", display:"flex", flexDirection:"column", gap: 2 }}>
            <div style={{ fontSize:9, letterSpacing:"0.14em", textTransform:"uppercase", color:"#333", padding:"6px 12px 4px" }}>
              Navigation
            </div>
            {NAV.map(n => (
              <button
                key={n.id}
                className={`nav-item${active===n.id?" active":""}`}
                onClick={() => {
                  console.log("Navigating to:", n.id);
                  setActive(n.id);
                }}
              >
                <span className="nav-dot" style={{
                  width: 5, height: 5, borderRadius:"50%",
                  background: active===n.id ? C.green : "#2a2a2a",
                  flexShrink: 0, transition:"background 0.2s",
                }}/>
                <span style={{ fontFamily:"'DM Mono', monospace", fontSize:10, color: active===n.id?"#555":"#2a2a2a" }}>{n.icon}</span>
                {n.label}
              </button>
            ))}
          </nav>

          {/* Bottom status */}
          <div style={{ padding:"14px 16px", borderTop:`1px solid ${C.border}` }}>
            <div style={{ display:"flex", alignItems:"center", gap: 8 }}>
              <div style={{ position:"relative", width:8, height:8 }}>
                <div style={{
                  position:"absolute", inset:0, borderRadius:"50%",
                  background: C.green, animation:"ping 1.4s ease-out infinite",
                }}/>
                <div style={{ width:8, height:8, borderRadius:"50%", background: C.green, animation:"pulse-dot 2s ease-in-out infinite" }}/>
              </div>
              <span style={{ fontSize:11, color:"#444", fontFamily:"'DM Mono',monospace" }}>
                {time || "00:00:00"}
              </span>
            </div>
            <div style={{ fontSize:10, color:"#2f2f2f", marginTop:6, letterSpacing:"0.06em" }}>
              serenova.myshopify.com
            </div>
          </div>
        </aside>

        {/* ── Main ─────────────────────────────────────────────────── */}
        <main style={{ flex:1, overflowY:"auto", padding:"32px 36px", display:"flex", flexDirection:"column", gap: 28 }}>
          {/* Header row */}
          <div className="fade-up" style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between" }}>
            <div>
              <div style={{ fontSize:11, letterSpacing:"0.18em", textTransform:"uppercase", color:"#333", marginBottom:6 }}>
                AI Overview
              </div>
              <h1 style={{
                fontFamily:"'DM Serif Display', serif",
                fontSize: 28,
                fontWeight: 400,
                color: C.text,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}>
                {NAV.find(n => n.id === active)?.label || 'Glowify'}
              </h1>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap: 10 }}>
              <div style={{
                display:"flex", alignItems:"center", gap:7,
                background: C.greenDim, border:`1px solid ${C.green}30`,
                borderRadius:6, padding:"7px 13px",
              }}>
                <div style={{ width:6, height:6, borderRadius:"50%", background: C.green, animation:"pulse-dot 1.8s ease-in-out infinite" }}/>
                <span style={{ fontSize:11, color: C.green, fontWeight:500, letterSpacing:"0.06em" }}>
                  AI {aiStatus}
                </span>
              </div>
              <button className="action-btn" style={{ background:"#111", border:`1px solid ${C.border}`, color:"#555" }}>
                ↻ Refresh
              </button>
            </div>
          </div>
          {renderContent()}

          {/* Footer note */}
          <div className="fade-up-4" style={{ display:"flex", alignItems:"center", justifyContent:"space-between", paddingTop:4 }}>
            <span style={{ fontSize:10, color:"#222", letterSpacing:"0.08em", fontFamily:"'DM Mono',monospace" }}>
              GLOWIFY AI OS · v2.1.0
            </span>
            <span style={{ fontSize:10, color:"#222", letterSpacing:"0.08em", fontFamily:"'DM Mono',monospace" }}>
              Powered by Claude · Shopify Admin API
            </span>
          </div>
        </main>
      </div>
    </>
  );
}

/* ── StatCard ────────────────────────────────────────────────────────── */
function StatCard({ label, value, delta, positive, bar, barColor, icon }) {
  return (
    <div className="stat-card">
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
        <div style={{
          width:28, height:28, borderRadius:7,
          background:`${barColor}12`, border:`1px solid ${barColor}22`,
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:12, color: barColor, fontFamily:"'DM Mono',monospace",
        }}>{icon}</div>
        <span style={{
          fontSize:10, fontWeight:500, letterSpacing:"0.05em",
          color: positive ? "#7eeaca" : "#fb7185",
          background: positive ? "rgba(126,234,202,0.07)" : "rgba(251,113,133,0.07)",
          padding:"2px 8px", borderRadius:20,
        }}>{delta}</span>
      </div>
      <div style={{ fontSize:22, fontWeight:300, color:"#e8e8e8", letterSpacing:"-0.02em", lineHeight:1 }}>
        {value}
      </div>
      <div style={{ fontSize:10, color:"#333", letterSpacing:"0.1em", textTransform:"uppercase", marginTop:5 }}>
        {label}
      </div>
      <div className="metric-bar-track">
        <div className="metric-bar-fill" style={{ width:`${bar}%`, background: barColor }} />
      </div>
    </div>
  );
}

/* ── ScoreRing (SVG) ────────────────────────────────────────────────── */
function ScoreRing({ value, color }) {
  const r = 28, circ = 2 * Math.PI * r;
  const filled = (value / 100) * circ;
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" style={{ flexShrink:0, transform:"rotate(-90deg)" }}>
      <circle cx="36" cy="36" r={r} fill="none" stroke="#1c1c1c" strokeWidth="4" />
      <circle cx="36" cy="36" r={r} fill="none" stroke={color} strokeWidth="4"
        strokeDasharray={`${filled} ${circ}`} strokeLinecap="round"
        style={{ transition:"stroke-dasharray 1s ease", filter:`drop-shadow(0 0 6px ${color}60)` }} />
    </svg>
  );
}


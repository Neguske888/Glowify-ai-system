// src/theme.ts

export interface Theme {
  bg: Record<string, string>;
  border: Record<string, string>;
  brand: Record<string, string>;
  semantic: Record<string, string>;
  text: Record<string, string>;
  shadow: Record<string, string>;
  radius: Record<string, string>;
  space: Record<string, string>;
  type: Record<string, any>;
  transition: Record<string, string>;
  chart: any;
}

export const DS: Theme = {
  // ── BACKGROUNDS ────────────────────────────────────────
  bg: {
    base:       '#07070F',
    surface:    '#0D0D1A',
    card:       '#0F0F1E',
    cardHover:  '#131325',
    input:      '#0A0A18',
    overlay:    '#1A1A2E',
    subtle:     '#0C0C1A',
    tag:        '#111128',
  },
  // ── BORDERS ────────────────────────────────────────────
  border: {
    default:    '#1E1E3A',
    subtle:     '#161628',
    strong:     '#2A2A48',
    focus:      '#6366F1',
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
    primary:    '#F1F1F8',
    secondary:  '#A0A0B8',
    muted:      '#6B6B88',
    ghost:      '#3D3D55',
    accent:     '#818CF8',
    success:    '#34D399',
    warning:    '#FCD34D',
    danger:     '#F87171',
    mono:       '#818CF8',
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

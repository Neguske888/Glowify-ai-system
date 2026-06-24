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
  bg: {
    base:       '#080608',
    surface:    '#100D10',
    card:       '#140F14',
    cardHover:  '#1A1218',
    input:      '#0C0A0C',
    overlay:    '#140F14',
    subtle:     '#100D10',
    tag:        '#1A1218',
  },
  border: {
    default:    '#231820',
    subtle:     '#1A1218',
    strong:     '#3A2530',
    focus:      '#C9747A',
    glow:       'rgba(201,116,122,0.2)',
    success:    'rgba(16,185,129,0.25)',
    warning:    'rgba(245,158,11,0.25)',
    danger:     'rgba(239,68,68,0.25)',
    info:       'rgba(59,130,246,0.25)',
  },
  brand: {
    primary:        '#C9747A',
    primaryHover:   '#D4A0A3',
    primaryDark:    '#8B4A6B',
    secondary:      '#8B4A6B',
    gradient:       'linear-gradient(135deg, #C9747A 0%, #8B4A6B 100%)',
    gradientHover:  'linear-gradient(135deg, #D4A0A3 0%, #A35B7D 100%)',
    gradientSubtle: 'linear-gradient(135deg, rgba(201,116,122,0.1) 0%, rgba(139,74,107,0.06) 100%)',
    glow:           '0 0 24px rgba(201,116,122,0.25)',
    glowStrong:     '0 0 40px rgba(201,116,122,0.4)',
  },
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
  text: {
    primary:    '#F5EEF0',
    secondary:  '#B09AA0',
    muted:      '#6B5560',
    ghost:      '#3D2B32',
    accent:     '#C9747A',
    success:    '#10B981',
    warning:    '#F59E0B',
    danger:     '#EF4444',
    mono:       '#C9747A',
  },
  shadow: {
    xs:          '0 1px 2px rgba(0,0,0,0.4)',
    sm:          '0 1px 4px rgba(0,0,0,0.4), 0 4px 12px rgba(0,0,0,0.3)',
    md:          '0 2px 8px rgba(0,0,0,0.5), 0 8px 24px rgba(0,0,0,0.4)',
    lg:          '0 4px 16px rgba(0,0,0,0.6), 0 16px 40px rgba(0,0,0,0.5)',
    xl:          '0 8px 32px rgba(0,0,0,0.7), 0 24px 60px rgba(0,0,0,0.6)',
    card:        '0 1px 3px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.3)',
    cardHover:   '0 4px 16px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,116,122,0.12), 0 12px 32px rgba(0,0,0,0.5)',
    glow:        '0 0 20px rgba(201,116,122,0.15)',
    glowHover:   '0 0 32px rgba(201,116,122,0.3)',
    button:      '0 4px 14px rgba(201,116,122,0.35)',
    buttonHover: '0 8px 24px rgba(201,116,122,0.5)',
    tooltip:     '0 8px 32px rgba(0,0,0,0.7), 0 2px 8px rgba(0,0,0,0.5)',
  },
  radius: {
    xs:   '4px',
    sm:   '8px',
    md:   '12px',
    lg:   '16px',
    xl:   '20px',
    xxl:  '24px',
    full: '9999px',
  },
  space: {
    1:  '4px',   2:  '8px',   3: '12px',
    4: '16px',   5: '20px',   6: '24px',
    8: '32px',  10: '40px',  12: '48px',
    16:'64px',  20:'80px',
  },
  type: {
    display: { fontSize:'32px', fontWeight:'800', letterSpacing:'-0.03em', lineHeight:1.15, color:'#F5EEF0' },
    h1:      { fontSize:'24px', fontWeight:'700', letterSpacing:'-0.025em', lineHeight:1.25, color:'#F5EEF0' },
    h2:      { fontSize:'18px', fontWeight:'600', letterSpacing:'-0.015em', lineHeight:1.35, color:'#F5EEF0' },
    h3:      { fontSize:'15px', fontWeight:'600', letterSpacing:'-0.01em', lineHeight:1.4, color:'#F5EEF0' },
    h4:      { fontSize:'13px', fontWeight:'600', letterSpacing:'-0.005em', lineHeight:1.45, color:'#F5EEF0' },
    body:    { fontSize:'14px', fontWeight:'400', letterSpacing:'0', lineHeight:1.6, color:'#B09AA0' },
    small:   { fontSize:'12px', fontWeight:'400', letterSpacing:'0.01em', lineHeight:1.5, color:'#6B5560' },
    label:   { fontSize:'11px', fontWeight:'600', letterSpacing:'0.08em', lineHeight:1, color:'#6B5560', textTransform:'uppercase' },
    mono:    { fontFamily:"'JetBrains Mono','Fira Code',monospace", fontSize:'13px', color:'#C9747A' },
    monoLg:  { fontFamily:"'JetBrains Mono','Fira Code',monospace", fontSize:'26px', fontWeight:'700', letterSpacing:'-0.03em', color:'#F5EEF0' },
  },
  transition: {
    fast:    'all 0.12s ease',
    base:    'all 0.18s cubic-bezier(0.4,0,0.2,1)',
    smooth:  'all 0.22s cubic-bezier(0.4,0,0.2,1)',
    slow:    'all 0.35s cubic-bezier(0.4,0,0.2,1)',
    spring:  'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
    sidebar: 'width 250ms cubic-bezier(0.4,0,0.2,1)',
  },
  chart: {
    tooltip: {
      contentStyle: {
        background:   '#1A0F14',
        border:       '1px solid #3A2530',
        borderRadius: '12px',
        color:        '#F5EEF0',
        fontSize:     '12px',
        fontFamily:   "'Plus Jakarta Sans',system-ui,sans-serif",
        padding:      '10px 14px',
        boxShadow:    '0 16px 40px rgba(0,0,0,0.7)',
      },
      cursor:      { stroke:'rgba(201,116,122,0.2)', strokeWidth:1, strokeDasharray:'3 3' },
      labelStyle:  { color:'#6B5560', fontSize:'11px', marginBottom:'4px', fontWeight:'500' },
    },
    grid:  { strokeDasharray:'2 4', stroke:'rgba(255,255,255,0.035)', vertical:false },
    xAxis: { tick:{fill:'#6B5560',fontSize:11,fontFamily:'Plus Jakarta Sans'}, tickLine:false, axisLine:false, tickMargin:8 },
    yAxis: { tick:{fill:'#6B5560',fontSize:11,fontFamily:'Plus Jakarta Sans'}, tickLine:false, axisLine:false, tickMargin:8, width:44 },
    colors: {
      primary:   '#C9747A',
      secondary: '#8B4A6B',
      success:   '#10B981',
      warning:   '#F59E0B',
      danger:    '#EF4444',
      info:      '#3B82F6',
      cyan:      '#06B6D4',
      pink:      '#EC4899',
    },
  },
};

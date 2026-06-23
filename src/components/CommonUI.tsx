// src/components/CommonUI.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { DS } from '../theme';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  metric?: {
    color?: string;
  };
}

export const Card: React.FC<CardProps> = ({ children, className = "", metric }) => (
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

interface ToggleProps {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
}

export const Toggle: React.FC<ToggleProps> = ({ checked, onChange, disabled = false }) => (
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

interface ProgressBarProps {
  value: number;
  max: number;
  color?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ value, max }) => {
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

interface SkeletonProps {
  w?: string | number;
  h?: string | number;
  r?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({ w = '100%', h = 16, r = 6 }) => (
  <div className="glw-skeleton" style={{ width: w, height: h, borderRadius: r }} />
);

export const TechBackground: React.FC = () => (
  <div style={{position:'fixed',inset:0,pointerEvents:'none',zIndex:0,overflow:'hidden'}}>
    <div className="glw-tech-grid" style={{position:'absolute',inset:0}}/>
    <div className="glw-divider-glow" style={{position:'absolute',top:0,left:0,right:0}}/>
    <div className="glw-orb" style={{
      top:'-140px',right:'-100px',width:'580px',height:'580px',
      background:'radial-gradient(circle,rgba(99,102,241,0.07) 0%,transparent 65%)',
    }}/>
    <div className="glw-orb glw-orb-2" style={{
      bottom:'-100px',left:'12%',width:'440px',height:'440px',
      background:'radial-gradient(circle,rgba(139,92,246,0.055) 0%,transparent 65%)',
    }}/>
    <div className="glw-orb glw-orb-3" style={{
      top:'38%',left:'-60px',width:'300px',height:'300px',
      background:'radial-gradient(circle,rgba(6,182,212,0.04) 0%,transparent 65%)',
    }}/>
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

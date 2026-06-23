import React from 'react';

interface MetricCardProps {
  label: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  loading?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({ label, value, change, trend, loading }) => {
  return (
    <div className="relative group overflow-hidden bg-neutral-900/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6 transition-all hover:border-white/10 hover:bg-neutral-900/60 shadow-2xl">
      {/* Subtle Gradient Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10 flex flex-col gap-1">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">
          {label}
        </span>
        
        <div className="flex items-baseline justify-between mt-2">
          {loading ? (
            <div className="h-9 w-24 bg-neutral-800 animate-pulse rounded-lg" />
          ) : (
            <h2 className="text-3xl font-bold tracking-tight text-white tabular-nums">
              {value}
            </h2>
          )}
          
          {change && !loading && (
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
              trend === 'up' ? 'bg-emerald-500/10 text-emerald-400' : 
              trend === 'down' ? 'bg-rose-500/10 text-rose-400' : 
              'bg-neutral-500/10 text-neutral-400'
            }`}>
              {change}
            </span>
          )}
        </div>

        {/* Decorative sparkline-like bar */}
        <div className="mt-4 h-[2px] w-full bg-neutral-800 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ${
              trend === 'up' ? 'bg-emerald-500/50' : trend === 'down' ? 'bg-rose-500/50' : 'bg-neutral-500/50'
            }`}
            style={{ width: loading ? '10%' : '100%' }}
          />
        </div>
      </div>
    </div>
  );
};

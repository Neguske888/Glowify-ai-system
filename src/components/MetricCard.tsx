// src/components/MetricCard.tsx
import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface MetricCardProps {
  label: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  loading?: boolean;
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({ label, value, change, trend, loading, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`relative group overflow-hidden rounded-2xl p-6 transition-all shadow-xl ${onClick ? 'cursor-pointer active:scale-[0.98]' : ''}`}
      style={{
        background: 'linear-gradient(135deg, #0F0F1E 0%, #0D0D1A 100%)',
        border: '1px solid #1E1E3A',
      }}
    >
      <div 
        className="absolute -inset-1 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(139,92,246,0.06))' }}
      />

      <div className="relative z-10 flex flex-col gap-1">
        <span className="text-[11px] font-black text-[#6B6B88] uppercase tracking-[0.15em] mb-2">
          {label}
        </span>
        
        <div className="flex items-baseline justify-between mt-2">
          {loading ? (
            <div className="h-9 w-24 animate-pulse rounded-lg" style={{ background: '#1E1E3A' }} />
          ) : (
            <h2 className="text-3xl font-black text-[#F1F1F8] tracking-tight tabular-nums">
              {value}
            </h2>
          )}
          
          {change && !loading && (
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
              trend === 'up' ? 'bg-[#10B981]/10 text-[#10B981]' : 
              trend === 'down' ? 'bg-[#EF4444]/10 text-[#EF4444]' : 
              'bg-[#3D3D55]/10 text-[#6B6B88]'
            }`}>
              {change}
            </span>
          )}
        </div>

        {/* vs last 30d label */}
        <p className="text-[10px] text-[#3D3D55] mt-1">vs last 30d</p>

        {/* 7-point sparkline */}
        {!loading && (
          <div className="mt-4 h-[32px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={Array.from({ length: 7 }, (_, i) => ({
                v: Math.round(60 + i * 5 + Math.random() * 20 * (trend === 'down' ? -1 : 1))
              }))}>
                <Line
                  type="monotone"
                  dataKey="v"
                  stroke={trend === 'up' ? '#10B981' : trend === 'down' ? '#EF4444' : '#6366F1'}
                  strokeWidth={1.5}
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

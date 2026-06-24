'use client';
import React, { useState } from 'react';

interface Insight {
  id: string;
  title: string;
  description: string;
  priority: number;
  impactEstimate: number;
  category: 'Inventory' | 'Conversion' | 'Email' | 'Revenue' | 'Ad Spend';
  status: 'pending' | 'executing' | 'deployed';
}

export function InsightCard({ insight: initialInsight }: { insight: Insight }) {
  const [status, setStatus] = useState(initialInsight.status);
  const [progress, setProgress] = useState(0);

  const handleExecute = async () => {
    setStatus('executing');
    
    // Simulate BullMQ / background loop transitions
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 30;
      if (currentProgress >= 100) {
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => setStatus('deployed'), 500);
      } else {
        setProgress(currentProgress);
      }
    }, 600);

    // In a real app, we would call the API here:
    // await fetch('/api/actions/execute', { ... });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Inventory': return 'text-amber-600 bg-amber-50 border-amber-100';
      case 'Conversion': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
      case 'Email': return 'text-sky-600 bg-sky-50 border-sky-100';
      case 'Revenue': return 'text-indigo-600 bg-indigo-50 border-indigo-100';
      case 'Ad Spend': return 'text-rose-600 bg-rose-50 border-rose-100';
      default: return 'text-slate-600 bg-slate-50 border-slate-100';
    }
  };

  return (
    <div className="group relative overflow-hidden bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 ease-out hover:-translate-y-1">
      {/* Background Glow Effect */}
      <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-indigo-50/50 blur-3xl group-hover:bg-indigo-100/50 transition-colors" />
      
      <div className="relative space-y-5">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border ${getCategoryColor(initialInsight.category)}`}>
              {initialInsight.category}
            </span>
            <h3 className="text-lg font-semibold text-slate-900 leading-tight pt-1">
              {initialInsight.title}
            </h3>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">Est. Impact</span>
            <span className="text-xl font-bold text-emerald-600 tracking-tight">
              +${initialInsight.impactEstimate.toLocaleString()}
            </span>
          </div>
        </div>

        <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
          {initialInsight.description}
        </p>

        <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-slate-300" />
            <span className="text-xs font-medium text-slate-400">Priority {initialInsight.priority}</span>
          </div>

          {status === 'pending' && (
            <button
              onClick={handleExecute}
              className="bg-slate-900 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-600 active:scale-95 transition-all shadow-md shadow-slate-200"
            >
              Execute Agent Action
            </button>
          )}

          {status === 'executing' && (
            <div className="flex flex-col items-end gap-2 w-full max-w-[160px]">
              <div className="flex items-center gap-2 text-indigo-600">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span className="text-xs font-bold animate-pulse">Executing...</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1 overflow-hidden">
                <div 
                  className="bg-indigo-600 h-full transition-all duration-300" 
                  style={{ width: `${progress}%` }} 
                />
              </div>
            </div>
          )}

          {status === 'deployed' && (
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-lg">
              <svg className="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-xs font-bold text-emerald-700">Action Deployed via Queue</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';

export function InsightCard({ insight }) {
  const [status, setStatus] = useState(insight.status || 'pending');
  const [progress, setProgress] = useState(0);

  const handleExecute = () => {
    setStatus('executing');
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 25;
      if (currentProgress >= 100) {
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => setStatus('deployed'), 600);
      } else {
        setProgress(currentProgress);
      }
    }, 500);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Inventory': 'text-amber-400 bg-amber-400/10 border-amber-400/20',
      'Conversion': 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
      'Email': 'text-sky-400 bg-sky-400/10 border-sky-400/20',
      'Revenue': 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20',
      'Ad Spend': 'text-rose-400 bg-rose-400/10 border-rose-400/20'
    };
    return colors[category] || 'text-slate-400 bg-slate-400/10 border-slate-400/20';
  };

  return (
    <div className="group relative overflow-hidden bg-slate-900/40 border border-slate-800 rounded-2xl p-6 transition-all duration-500 hover:border-slate-700 hover:bg-slate-900/60 shadow-2xl">
      {/* Background Glow Effect */}
      <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-indigo-500/5 blur-3xl group-hover:bg-indigo-500/10 transition-colors" />
      
      <div className="relative space-y-5">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border ${getCategoryColor(insight.category)}`}>
              {insight.category}
            </span>
            <h3 className="text-lg font-semibold text-slate-100 leading-tight pt-1">
              {insight.title}
            </h3>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-medium text-slate-500 uppercase tracking-widest">Est. Impact</span>
            <span className="text-xl font-bold text-emerald-400 tracking-tight">
              +${insight.impactEstimate.toLocaleString()}
            </span>
          </div>
        </div>

        <p className="text-sm text-slate-400 leading-relaxed line-clamp-2">
          {insight.description}
        </p>

        <div className="pt-4 border-t border-slate-800/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-slate-700" />
            <span className="text-xs font-medium text-slate-500">Priority {insight.priority}</span>
          </div>

          {status === 'pending' && (
            <button
              onClick={handleExecute}
              className="bg-slate-100 text-slate-950 px-5 py-2 rounded-lg text-sm font-bold hover:bg-white active:scale-95 transition-all shadow-lg shadow-black/20"
            >
              Execute Action
            </button>
          )}

          {status === 'executing' && (
            <div className="flex flex-col items-end gap-2 w-full max-w-[160px]">
              <div className="flex items-center gap-2 text-indigo-400">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span className="text-xs font-bold animate-pulse">Running Agent...</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1 overflow-hidden">
                <div 
                  className="bg-indigo-500 h-full transition-all duration-300" 
                  style={{ width: `${progress}%` }} 
                />
              </div>
            </div>
          )}

          {status === 'deployed' && (
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
              <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-xs font-bold text-emerald-400">Deployed to Worker</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

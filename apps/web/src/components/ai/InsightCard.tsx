'use client';
import { useState } from 'react';

export function InsightCard({ insight }: { insight: any }) {
  const [status, setStatus] = useState(insight.status);

  const handleExecute = async () => {
    const res = await fetch('/api/actions/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ insightId: insight.id, actionType: 'SHOPIFY_UPDATE' }),
    });
    if (res.ok) setStatus('executed');
  };

  return (
    <div className="border border-slate-200 p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-all space-y-4">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-slate-900 text-lg">{insight.title}</h3>
        <span className="text-[10px] uppercase tracking-wider font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full">
          Priority {insight.priority}
        </span>
      </div>
      
      <p className="text-slate-600 text-sm leading-relaxed">{insight.description}</p>
      
      <div className="flex justify-between items-center pt-4 border-t border-slate-100">
        <div className="flex flex-col">
          <span className="text-xs text-slate-400">Est. Impact</span>
          <span className="text-green-600 font-bold text-lg tracking-tight">
            +${Number(insight.impactEstimate).toLocaleString()}
          </span>
        </div>
        
        {status === 'pending' ? (
          <button 
            onClick={handleExecute} 
            className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-indigo-700 active:scale-95 transition-all shadow-sm"
          >
            Execute Action
          </button>
        ) : (
          <span className="text-green-700 bg-green-50 px-3 py-1.5 rounded-lg text-sm font-medium">
            ✓ Executed
          </span>
        )}
      </div>
    </div>
  );
}

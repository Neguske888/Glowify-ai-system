'use client';

import React from 'react';

interface Insight {
  id: string;
  title: string;
  impact: number;
  description: string;
}

export default function AIInsightsCard({ insights }: { insights: Insight[] }) {
  const handleApprove = async (id: string) => {
    // API call to approve execution
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">AI Strategic Insights</h2>
      <div className="space-y-4">
        {insights.map((insight) => (
          <div key={insight.id} className="p-4 bg-slate-50 rounded-lg flex justify-between items-center">
            <div>
              <h3 className="font-medium text-slate-800">{insight.title}</h3>
              <p className="text-sm text-slate-500">{insight.description}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                Impact: {insight.impact}/10
              </span>
              <button
                onClick={() => handleApprove(insight.id)}
                className="px-4 py-2 bg-slate-900 text-white text-sm rounded hover:bg-slate-800 transition"
              >
                Approve Execution
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

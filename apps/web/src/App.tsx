import React, { useState, useEffect } from 'react';
import { InsightCard } from './components/ai/InsightCard';

interface Metric {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
}

const INSIGHTS_DATA: any[] = [
  {
    id: '1',
    title: 'Restock Best-Selling Serum',
    description: 'Inventory for "Glow Serum" is below 15 units. Current velocity suggests stockout in 3 days. Projected loss: $4,200.',
    impactEstimate: 4200,
    priority: 1,
    category: 'Inventory',
    status: 'pending'
  },
  {
    id: '2',
    title: 'Optimize Checkout Flow',
    description: 'Mobile drop-off rate at shipping selection is 24% higher than desktop. Simplify shipping options to recover carts.',
    impactEstimate: 1200,
    priority: 2,
    category: 'Conversion',
    status: 'pending'
  },
  {
    id: '3',
    title: 'Launch Lapsed Customer Campaign',
    description: '840 customers haven\'t purchased in 60 days. AI predicts 12% conversion with a "personalized replenishment" email.',
    impactEstimate: 2800,
    priority: 2,
    category: 'Email',
    status: 'pending'
  },
  {
    id: '4',
    title: 'Increase Google Ads Bid for High-Margin Items',
    description: 'ROAS for "Vitamin C Oil" is 6.4x. Increasing daily spend by $50 is projected to yield $320 in additional daily revenue.',
    impactEstimate: 9600,
    priority: 3,
    category: 'Ad Spend',
    status: 'pending'
  }
];

export default function App() {
  const [metrics, setMetrics] = useState<Metric[]>([
    { label: 'Daily Revenue', value: '$12,480', change: '+14.2%', isPositive: true },
    { label: 'Active Carts', value: '142', change: '+8%', isPositive: true },
    { label: 'Conversion Rate', value: '3.82%', change: '-0.4%', isPositive: false },
    { label: 'Avg. Order Value', value: '$88.50', change: '+$4.20', isPositive: true },
  ]);

  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
      // Randomly fluctuate revenue slightly for "live" feel
      setMetrics(prev => prev.map(m => {
        if (m.label === 'Daily Revenue') {
          const val = parseFloat(m.value.replace('$', '').replace(',', ''));
          const newVal = val + (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 5);
          return { ...m, value: `$${newVal.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}` };
        }
        return m;
      }));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-indigo-100">
      {/* Premium Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-bottom border-slate-200 px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <span className="text-white font-bold text-xl">G</span>
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-slate-900">Glowify AI</h1>
            <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Operations Hub</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">System Status</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-semibold text-slate-600">Agents Online</span>
            </div>
          </div>
          <div className="h-10 w-[1px] bg-slate-200" />
          <div className="text-right">
            <p className="text-xs font-medium text-slate-400">{time}</p>
            <p className="text-sm font-bold text-slate-700">serenova-global.shopify</p>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-8 py-10 space-y-12">
        {/* Metrics Header */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{metric.label}</p>
              <div className="flex items-baseline justify-between">
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{metric.value}</h2>
                <span className={`text-xs font-bold px-2 py-1 rounded-lg ${metric.isPositive ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'}`}>
                  {metric.change}
                </span>
              </div>
              <div className="mt-4 w-full bg-slate-50 h-1.5 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${metric.isPositive ? 'bg-emerald-400' : 'bg-rose-400'}`} 
                  style={{ width: '65%' }} 
                />
              </div>
            </div>
          ))}
        </section>

        {/* AI Insights Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">AI Insights & Actions</h2>
              <p className="text-sm text-slate-500">Autonomous agents have identified {INSIGHTS_DATA.length} high-impact opportunities.</p>
            </div>
            <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-2 group">
              View All Intelligence 
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {INSIGHTS_DATA.map((insight) => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </div>
        </section>

        {/* Footer info */}
        <footer className="pt-12 border-t border-slate-200 flex justify-between items-center text-slate-400">
          <p className="text-xs font-medium">Glowify-AI-System v2.4.0 • Enterprise Core</p>
          <div className="flex gap-4">
            <span className="text-xs hover:text-slate-600 cursor-pointer">Security Report</span>
            <span className="text-xs hover:text-slate-600 cursor-pointer">Agent Logs</span>
          </div>
        </footer>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
      `}} />
    </div>
  );
}

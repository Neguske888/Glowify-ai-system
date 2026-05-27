import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { DashboardLayout } from '../../src/components/DashboardLayout';
import { MetricCard } from '../../src/components/MetricCard';
import { AgentFeed } from '../../src/components/AgentFeed';
import { Product, WebhookEvent, AgentLog } from '../../src/utils/neurozenMockData';

// Firebase Config (Must match your project settings)
const firebaseConfig = {
  projectId: "glowify-ai-system",
  // Other keys can be empty for public access if rules allow, 
  // but usually you'd include apiKey, authDomain, etc.
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [webhooks, setWebhooks] = useState<WebhookEvent[]>([]);
  const [logs, setLogs] = useState<AgentLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storeId = 'neurozen_lab';
    const storeRef = collection(db, 'stores', storeId, 'products');
    const webhookRef = collection(db, 'stores', storeId, 'webhooks_queue');
    const logRef = collection(db, 'stores', storeId, 'agent_telemetry');

    // 1. Live Products Listener
    const unsubProducts = onSnapshot(storeRef, (snapshot) => {
      const pData = snapshot.docs.map(doc => doc.data() as Product);
      setProducts(pData);
      setLoading(false);
    });

    // 2. Live Webhooks Listener
    const unsubWebhooks = onSnapshot(query(webhookRef, orderBy('occurredAt', 'desc'), limit(10)), (snapshot) => {
      const wData = snapshot.docs.map(doc => doc.data() as WebhookEvent);
      setWebhooks(wData);
    });

    // 3. Live Agent Telemetry Listener
    const unsubLogs = onSnapshot(query(logRef, orderBy('timestamp', 'desc'), limit(20)), (snapshot) => {
      const lData = snapshot.docs.map(doc => doc.data() as AgentLog);
      setLogs(lData);
    });

    return () => {
      unsubProducts();
      unsubWebhooks();
      unsubLogs();
    };
  }, []);

  // Compute Dynamic Metrics
  const totalImpact = logs.reduce((acc, log) => acc + (log.impactScore * 145), 0); // Weighted mock impact
  const lowStockCount = products.filter(p => p.stockLevel < p.reorderPoint).length;
  const activeAgents = new Set(logs.map(l => l.agent)).size;
  const processedWebhooks = webhooks.length;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Top Bento Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard 
            label="Total Autonomous Impact" 
            value={`$${totalImpact.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
            change="+18.4%"
            trend="up"
            loading={loading}
          />
          <MetricCard 
            label="Operational Latency Saved" 
            value="12.4s"
            change="-4.2h"
            trend="up"
            loading={loading}
          />
          <MetricCard 
            label="Active Fleet Strength" 
            value={activeAgents.toString()}
            change={`${activeAgents}/4 Online`}
            trend="neutral"
            loading={loading}
          />
          <MetricCard 
            label="Inventory Vulnerabilities" 
            value={lowStockCount.toString()}
            change={lowStockCount > 0 ? "Critical" : "Safe"}
            trend={lowStockCount > 0 ? "down" : "up"}
            loading={loading}
          />
        </div>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Agent Telemetry Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-white tracking-tight uppercase italic">Live Agent Stream</h2>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-white/5 rounded text-[10px] font-bold text-neutral-500 border border-white/5">WS_SECURE</span>
                <span className="px-3 py-1 bg-indigo-500/10 rounded text-[10px] font-bold text-indigo-400 border border-indigo-500/20">NEURAL_READY</span>
              </div>
            </div>
            <AgentFeed logs={logs} loading={loading} />
          </div>

          {/* Product Insights Column */}
          <div className="space-y-6">
             <h2 className="text-xl font-black text-white tracking-tight uppercase italic">Inventory Pulse</h2>
             <div className="bg-neutral-900/40 backdrop-blur-xl border border-white/5 rounded-2xl p-5 space-y-4">
                {loading ? (
                  [1,2,3].map(i => <div key={i} className="h-16 w-full bg-neutral-800 animate-pulse rounded-xl" />)
                ) : (
                  products.map(product => (
                    <div key={product.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-white leading-tight">{product.title}</span>
                        <span className="text-[10px] font-bold text-neutral-500 uppercase">{product.category}</span>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-mono font-bold ${product.stockLevel < product.reorderPoint ? 'text-rose-400' : 'text-emerald-400'}`}>
                          {product.stockLevel} units
                        </div>
                        <div className="text-[9px] text-neutral-600 font-bold uppercase tracking-wider">Stock Level</div>
                      </div>
                    </div>
                  ))
                )}
             </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

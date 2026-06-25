import React, { useState, useEffect } from 'react';
import { Package, AlertTriangle, TrendingUp, BarChart3, ArrowRight, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { MetricCard } from '../MetricCard';
import { useAuth } from '../../contexts/AuthContext';
import { fetchDashboardData } from '../../lib/api';

const margin = (p: any) => Math.round(((p.price - (p.cogs || 15)) / p.price) * 100);
const daysLeft = (p: any) => (p.velocity || 10) > 0 ? Math.floor(p.inventory / (p.velocity || 10)) : 999;

export const InventoryView: React.FC = () => {
  const { user } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!user) return;
      setLoading(true);
      const res = await fetchDashboardData(user.uid);
      setData(res);
      setLoading(false);
    }
    load();
  }, [user]);

  const products = data?.products || [];
  const lowStockProducts = products.filter((p: any) => daysLeft(p) < 14);
  const avgMargin = products.length > 0 
    ? Math.round(products.reduce((acc: number, p: any) => acc + margin(p), 0) / products.length)
    : 0;

  return (
    <div className="space-y-8">
      {/* Alert Banner */}
      {lowStockProducts.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-4 flex items-center gap-4 shadow-lg shadow-rose-500/5"
        >
          <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center text-rose-400 shrink-0">
            <AlertTriangle size={20} />
          </div>
          <p className="text-[13px] text-rose-200 leading-relaxed">
            <span className="font-black uppercase tracking-widest mr-2">Inventory Alert:</span>
            {lowStockProducts.length} products require immediate attention.
          </p>
        </motion.div>
      )}

      {/* KPI Strip */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard label="Total SKUs" value={products.length.toString()} loading={loading} />
        <MetricCard label="Avg Margin" value={`${avgMargin}%`} trend="up" loading={loading} />
        <MetricCard label="Low Stock Alerts" value={lowStockProducts.length.toString()} trend="down" change="Critical" loading={loading} />
        <MetricCard label="Out of Stock" value={products.filter((p: any) => p.inventory === 0).length.toString()} trend="down" change="Action Required" loading={loading} />
      </div>

      {/* Inventory Table */}
      <div className="bg-[#140F14] border border-[#231820] rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-[#231820] bg-[#100D10]/50 flex items-center justify-between">
          <h3 className="text-sm font-black text-[#F5EEF0] uppercase tracking-widest flex items-center gap-2">
            <Package size={16} className="text-[#C9747A]" />
            Product Inventory
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#231820]">
                <th className="p-6 text-[11px] font-black text-[#6B5560] uppercase tracking-widest">Product Name</th>
                <th className="p-6 text-[11px] font-black text-[#6B5560] uppercase tracking-widest">Stock</th>
                <th className="p-6 text-[11px] font-black text-[#6B5560] uppercase tracking-widest">Velocity</th>
                <th className="p-6 text-[11px] font-black text-[#6B5560] uppercase tracking-widest">Days Left</th>
                <th className="p-6 text-[11px] font-black text-[#6B5560] uppercase tracking-widest">Margin</th>
                <th className="p-6 text-[11px] font-black text-[#6B5560] uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p: any) => {
                const dl = daysLeft(p);
                const m = margin(p);
                const status = p.inventory === 0 ? 'out_of_stock' : dl < 14 ? 'low_stock' : 'active';
                return (
                  <tr key={p.id} className={`border-b border-[#231820]/50 hover:bg-[#1A1218] transition-colors ${status === 'out_of_stock' ? 'bg-rose-500/[0.02]' : ''}`}>
                    <td className="p-6">
                      <p className="text-sm font-bold text-[#F5EEF0]">{p.name}</p>
                      <p className="text-[10px] text-[#6B5560] uppercase tracking-widest font-bold mt-1">{p.category || 'Beauty'}</p>
                    </td>
                    <td className="p-6 text-sm font-bold text-[#B09AA0] tabular-nums">{p.inventory}</td>
                    <td className="p-6 text-sm font-medium text-[#6B5560] tabular-nums">{p.velocity || 10}/day</td>
                    <td className="p-6">
                      <div className="flex items-center gap-2">
                        {dl === 0 ? (
                          <span className="text-rose-400 font-black text-xs uppercase tracking-widest">OUT</span>
                        ) : (
                          <>
                            <span className={`text-sm font-black ${dl < 7 ? 'text-rose-400' : dl < 14 ? 'text-amber-400' : 'text-emerald-400'}`}>
                              {dl} days
                            </span>
                            {dl < 7 && <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />}
                          </>
                        )}
                      </div>
                    </td>
                    <td className="p-6">
                      <span className={`text-sm font-bold ${m > 80 ? 'text-[#C9747A]' : 'text-[#B09AA0]'}`}>{m}%</span>
                    </td>
                    <td className="p-6">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
                        status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                        status === 'low_stock' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
                        'bg-rose-500/10 text-rose-400 border-rose-500/20'
                      }`}>
                        {status.replace('_', ' ')}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Margin Analysis Chart */}
        <div className="lg:col-span-2 bg-[#140F14] border border-[#231820] rounded-3xl p-6 shadow-2xl">
          <h3 className="text-sm font-black text-[#F5EEF0] uppercase tracking-widest mb-8 flex items-center gap-2">
            <BarChart3 size={16} className="text-[#C9747A]" />
            Margin by Product
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={products} layout="vertical" margin={{ left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#231820" horizontal={false} />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#6B5560', fontSize: 10}} domain={[0, 100]} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#F5EEF0', fontSize: 10, fontWeight: 'bold'}} width={120} />
                <Tooltip 
                  cursor={{fill: 'rgba(201,116,122,0.05)'}}
                  contentStyle={{ background: '#080608', border: '1px solid #231820', borderRadius: '12px' }}
                />
                <Bar dataKey={(p) => margin(p)} name="Margin %" radius={[0, 4, 4, 0]}>
                  {products.map((p: any, i: number) => {
                    const m = margin(p);
                    return <Cell key={i} fill={m > 80 ? '#C9747A' : m > 60 ? '#8B4A6B' : '#EF4444'} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Restock Recommendations */}
        <div className="space-y-4">
          <h3 className="text-sm font-black text-[#F5EEF0] uppercase tracking-widest mb-4 flex items-center gap-2 px-2">
            <ShieldAlert size={16} className="text-[#C9747A]" />
            AI Restock Tasks
          </h3>
          {lowStockProducts.slice(0, 2).map((item: any, i: number) => (
            <div key={i} className={`p-5 rounded-2xl bg-[#140F14] border ${daysLeft(item) < 7 ? 'border-rose-500/30 shadow-lg shadow-rose-500/5' : 'border-[#231820]'} relative overflow-hidden group`}>
              {daysLeft(item) < 7 && <div className="absolute top-0 left-0 w-1 h-full bg-rose-500" />}
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${daysLeft(item) < 7 ? 'bg-rose-500 text-white' : 'bg-amber-500 text-black'}`}>
                  {daysLeft(item) < 7 ? 'Critical' : 'Alert'}
                </span>
                <span className="text-[10px] text-[#6B5560] font-bold">PO-GEN-0{i+1}</span>
              </div>
              <h4 className="text-xs font-black text-[#F5EEF0] mb-2">{item.name}</h4>
              <div className="space-y-1 mb-4">
                <p className="text-[11px] text-[#B09AA0]">Stock: <span className="text-rose-400 font-bold">{item.inventory} units</span></p>
                <p className="text-[11px] text-[#B09AA0]">Stockout: <span className="text-rose-400 font-bold">~{daysLeft(item)} days</span></p>
                <p className="text-[11px] text-[#B09AA0]">Recommended PO: <span className="text-[#F5EEF0] font-bold">200 units</span></p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-[#231820]">
                <span className="text-xs font-black text-[#F5EEF0]">$2,800</span>
                <button className="flex items-center gap-1.5 text-[10px] font-black text-[#C9747A] hover:text-[#D4A0A3] transition-colors">
                  Approve PO <ArrowRight size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

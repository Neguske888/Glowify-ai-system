import React from 'react';
import { Package, AlertTriangle, TrendingUp, BarChart3, ArrowRight, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { MetricCard } from '../MetricCard';

const BEAUTY_PRODUCTS = [
  { id: 'prod_1', name: 'Vitamin C Brightening Serum', price: 89, cogs: 18, stock: 142, reorder: 50, velocity: 18.5, status: 'active', category: 'Serums' },
  { id: 'prod_2', name: 'Hyaluronic Moisture Surge', price: 65, cogs: 14, stock: 12, reorder: 40, velocity: 12.2, status: 'low_stock', category: 'Moisturizers' },
  { id: 'prod_3', name: 'AHA/BHA Exfoliating Cleanser', price: 52, cogs: 11, stock: 8, reorder: 45, velocity: 15.8, status: 'low_stock', category: 'Cleansers' },
  { id: 'prod_4', name: 'Retinol Night Renewal Cream', price: 120, cogs: 28, stock: 210, reorder: 60, velocity: 22.4, status: 'active', category: 'Treatments' },
  { id: 'prod_5', name: 'Peptide Firming Eye Serum', price: 95, cogs: 22, stock: 0, reorder: 30, velocity: 8.5, status: 'out_of_stock', category: 'Serums' },
];

const margin = (p: any) => Math.round(((p.price - p.cogs) / p.price) * 100);
const daysLeft = (p: any) => p.velocity > 0 ? Math.floor(p.stock / p.velocity) : 999;

export const InventoryView: React.FC = () => {
  const lowStockProducts = BEAUTY_PRODUCTS.filter(p => p.status !== 'active');
  const avgMargin = Math.round(BEAUTY_PRODUCTS.reduce((acc, p) => acc + margin(p), 0) / BEAUTY_PRODUCTS.length);

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
            2 products require immediate attention — <span className="font-bold">Hyaluronic Moisture Surge</span> (12 units, ~1 day) and <span className="font-bold">AHA/BHA Exfoliating Cleanser</span> (8 units, &lt;1 day).
          </p>
        </motion.div>
      )}

      {/* KPI Strip */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard label="Total SKUs" value="5" />
        <MetricCard label="Avg Margin" value={`${avgMargin}%`} trend="up" />
        <MetricCard label="Low Stock Alerts" value="2" trend="down" change="Critical" />
        <MetricCard label="Out of Stock" value="1" trend="down" change="Action Required" />
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
              {BEAUTY_PRODUCTS.map((p) => {
                const dl = daysLeft(p);
                const m = margin(p);
                return (
                  <tr key={p.id} className={`border-b border-[#231820]/50 hover:bg-[#1A1218] transition-colors ${p.status === 'out_of_stock' ? 'bg-rose-500/[0.02]' : ''}`}>
                    <td className="p-6">
                      <p className="text-sm font-bold text-[#F5EEF0]">{p.name}</p>
                      <p className="text-[10px] text-[#6B5560] uppercase tracking-widest font-bold mt-1">{p.category}</p>
                    </td>
                    <td className="p-6 text-sm font-bold text-[#B09AA0] tabular-nums">{p.stock}</td>
                    <td className="p-6 text-sm font-medium text-[#6B5560] tabular-nums">{p.velocity}/day</td>
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
                        p.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                        p.status === 'low_stock' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
                        'bg-rose-500/10 text-rose-400 border-rose-500/20'
                      }`}>
                        {p.status.replace('_', ' ')}
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
              <BarChart data={BEAUTY_PRODUCTS} layout="vertical" margin={{ left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#231820" horizontal={false} />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#6B5560', fontSize: 10}} domain={[0, 100]} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#F5EEF0', fontSize: 10, fontWeight: 'bold'}} width={120} />
                <Tooltip 
                  cursor={{fill: 'rgba(201,116,122,0.05)'}}
                  contentStyle={{ background: '#080608', border: '1px solid #231820', borderRadius: '12px' }}
                />
                <Bar dataKey={(p) => margin(p)} name="Margin %" radius={[0, 4, 4, 0]}>
                  {BEAUTY_PRODUCTS.map((p, i) => {
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
          {[
            { name: 'Hyaluronic Moisture Surge', stock: 12, dl: 1, po: 200, cost: 2800, critical: false },
            { name: 'AHA/BHA Exfoliating Cleanser', stock: 8, dl: '<1', po: 300, cost: 3300, critical: true },
          ].map((item, i) => (
            <div key={i} className={`p-5 rounded-2xl bg-[#140F14] border ${item.critical ? 'border-rose-500/30 shadow-lg shadow-rose-500/5' : 'border-[#231820]'} relative overflow-hidden group`}>
              {item.critical && <div className="absolute top-0 left-0 w-1 h-full bg-rose-500" />}
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${item.critical ? 'bg-rose-500 text-white' : 'bg-amber-500 text-black'}`}>
                  {item.critical ? 'Critical' : 'Alert'}
                </span>
                <span className="text-[10px] text-[#6B5560] font-bold">PO-GEN-0{i+1}</span>
              </div>
              <h4 className="text-xs font-black text-[#F5EEF0] mb-2">{item.name}</h4>
              <div className="space-y-1 mb-4">
                <p className="text-[11px] text-[#B09AA0]">Stock: <span className="text-rose-400 font-bold">{item.stock} units</span></p>
                <p className="text-[11px] text-[#B09AA0]">Stockout: <span className="text-rose-400 font-bold">~{item.dl} day</span></p>
                <p className="text-[11px] text-[#B09AA0]">Recommended PO: <span className="text-[#F5EEF0] font-bold">{item.po} units</span></p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-[#231820]">
                <span className="text-xs font-black text-[#F5EEF0]">${item.cost.toLocaleString()}</span>
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

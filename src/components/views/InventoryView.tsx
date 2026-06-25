import React, { useState, useEffect } from 'react';
import { Package, AlertTriangle, TrendingUp, BarChart3, ArrowRight, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { MetricCard } from '../MetricCard';
import { ConnectStore } from '../ConnectStore';
import { useAuth } from '../../contexts/AuthContext';
import { fetchDashboardData } from '../../lib/api';

export const InventoryView: React.FC<{ onNavigate: (tab: string) => void }> = ({ onNavigate }) => {
  const { user, profile } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const hasApiKey = !!profile?.shopifyApiKey;

  useEffect(() => {
    async function load() {
      if (!user || !hasApiKey) {
        setLoading(false);
        return;
      }
      setLoading(true);
      const res = await fetchDashboardData(user.uid);
      setData(res);
      setLoading(false);
    }
    load();
  }, [user, hasApiKey]);

  if (!hasApiKey && !loading) {
    return <ConnectStore onConnect={() => onNavigate('settings')} title="Manage Your Inventory" description="Connect your Shopify store to track stock levels, monitor sales velocity, and get AI-powered restock alerts." />;
  }

  const products = data?.products || [];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard label="Total SKUs" value="0" loading={loading} />
        <MetricCard label="Avg Margin" value="0%" trend="neutral" loading={loading} />
        <MetricCard label="Low Stock Alerts" value="0" trend="neutral" loading={loading} />
        <MetricCard label="Out of Stock" value="0" trend="neutral" loading={loading} />
      </div>

      <div className="bg-[#140F14] border border-[#231820] rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-[#231820] bg-[#100D10]/50 flex items-center justify-between">
          <h3 className="text-sm font-black text-[#F5EEF0] uppercase tracking-widest flex items-center gap-2">
            <Package size={16} className="text-[#C9747A]" />
            Product Inventory
          </h3>
        </div>
        <div className="p-20 text-center opacity-40">
          <Package size={40} className="mx-auto mb-4" />
          <p className="text-sm font-bold uppercase tracking-widest">Connect your store to see inventory data</p>
        </div>
      </div>
    </div>
  );
};

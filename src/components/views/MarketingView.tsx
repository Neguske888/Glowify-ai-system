import React, { useState, useEffect } from 'react';
import { Megaphone, TrendingUp, Mail, Globe, ArrowUpRight, ArrowDownRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { MetricCard } from '../MetricCard';
import { ConnectStore } from '../ConnectStore';
import { useAuth } from '../../contexts/AuthContext';
import { fetchDashboardData } from '../../lib/api';

export const MarketingView: React.FC<{ onNavigate: (tab: string) => void }> = ({ onNavigate }) => {
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
    return <ConnectStore onConnect={() => onNavigate('settings')} title="Connect Marketing Channels" description="Connect your Shopify and Klaviyo accounts to see real-time marketing performance and AI-driven recommendations." />;
  }

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard label="Total Ad Spend" value="$0.00" change="+0%" trend="neutral" loading={loading} />
        <MetricCard label="Blended ROAS" value="0.0x" change="+0.0x" trend="neutral" loading={loading} />
        <MetricCard label="Email Revenue" value="$0.00" change="+0%" trend="neutral" loading={loading} />
        <MetricCard label="Organic Revenue" value="$0.00" change="+0%" trend="neutral" loading={loading} />
      </div>

      <div className="bg-[#140F14] border border-[#231820] rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-[#231820] bg-[#100D10]/50 flex items-center justify-between">
          <h3 className="text-sm font-black text-[#F5EEF0] uppercase tracking-widest flex items-center gap-2">
            <Megaphone size={16} className="text-[#C9747A]" />
            Channel Performance
          </h3>
          <span className="text-[11px] font-bold text-[#6B5560]">No data available</span>
        </div>
        <div className="p-20 text-center opacity-40">
          <Megaphone size={40} className="mx-auto mb-4" />
          <p className="text-sm font-bold uppercase tracking-widest">Connect your store to see marketing data</p>
        </div>
      </div>
    </div>
  );
};

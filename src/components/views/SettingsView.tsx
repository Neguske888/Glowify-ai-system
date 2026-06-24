// src/components/views/SettingsView.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Key, Store, Mail, Cpu, Eye, EyeOff, CheckCircle, AlertCircle, Save, User, Shield, Zap } from 'lucide-react';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../contexts/AuthContext';

interface ApiKeyFieldProps {
  label: string;
  description: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  icon: React.ReactNode;
  accentColor: string;
  docsUrl?: string;
}

const ApiKeyField: React.FC<ApiKeyFieldProps> = ({
  label, description, placeholder, value, onChange, icon, accentColor, docsUrl,
}) => {
  const [show, setShow] = useState(false);

  return (
    <div className="bg-[#100D10] border border-[#231820] rounded-2xl p-5 hover:border-[#3A2530] transition-all">
      <div className="flex items-start gap-3 mb-4">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: `${accentColor}15`, border: `1px solid ${accentColor}25` }}
        >
          <span style={{ color: accentColor }}>{icon}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-bold text-[#F5EEF0]">{label}</p>
            {value && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20">
                Connected
              </span>
            )}
          </div>
          <p className="text-xs text-[#6B5560] mt-0.5 leading-relaxed">{description}</p>
          {docsUrl && (
            <a
              href={docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-[#C9747A] hover:underline mt-1 inline-block"
            >
              View documentation →
            </a>
          )}
        </div>
      </div>
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full bg-[#080608] border border-[#231820] rounded-xl px-4 py-3 pr-11
            text-sm text-[#F5EEF0] placeholder:text-[#3D2B32] font-mono
            focus:outline-none focus:border-[#C9747A] focus:ring-1 focus:ring-[#C9747A]/20
            transition-all"
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#3D2B32] hover:text-[#6B5560] transition-colors"
        >
          {show ? <EyeOff size={15} /> : <Eye size={15} />}
        </button>
      </div>
    </div>
  );
};

export const SettingsView: React.FC = () => {
  const { user, profile, refreshProfile } = useAuth();

  // API key state
  const [shopifyApiKey, setShopifyApiKey] = useState('');
  const [shopifyStoreDomain, setShopifyStoreDomain] = useState('');
  const [klaviyoApiKey, setKlaviyoApiKey] = useState('');
  const [geminiApiKey, setGeminiApiKey] = useState('');

  // UI state
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [saveMessage, setSaveMessage] = useState('');

  // Pre-fill from profile
  useEffect(() => {
    if (profile) {
      setShopifyApiKey(profile.shopifyApiKey || '');
      setShopifyStoreDomain(profile.shopifyStoreDomain || '');
      setKlaviyoApiKey(profile.klaviyoApiKey || '');
      setGeminiApiKey(profile.geminiApiKey || '');
    }
  }, [profile]);

  const handleSave = async () => {
    if (!user || !db) return;
    setSaving(true);
    setSaveStatus('idle');

    try {
      await setDoc(
        doc(db, 'users', user.uid),
        {
          shopifyApiKey:      shopifyApiKey.trim(),
          shopifyStoreDomain: shopifyStoreDomain.trim(),
          klaviyoApiKey:      klaviyoApiKey.trim(),
          geminiApiKey:       geminiApiKey.trim(),
          updatedAt:          serverTimestamp(),
        },
        { merge: true }
      );
      await refreshProfile();
      setSaveStatus('success');
      setSaveMessage('API keys saved successfully.');
    } catch (err: any) {
      setSaveStatus('error');
      setSaveMessage('Failed to save. Please try again.');
    } finally {
      setSaving(false);
      setTimeout(() => setSaveStatus('idle'), 4000);
    }
  };

  const initials = profile?.displayName
    ? profile.displayName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
    : user?.email?.[0]?.toUpperCase() || '?';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-8 pb-8"
    >
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-black text-[#F5EEF0] tracking-tight mb-1">Settings</h1>
        <p className="text-sm text-[#6B5560]">Manage your account, integrations, and API keys.</p>
      </div>

      {/* Profile card */}
      <div className="bg-[#100D10] border border-[#231820] rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-5">
          <User size={16} className="text-[#C9747A]" />
          <h2 className="text-sm font-bold text-[#F5EEF0] uppercase tracking-widest">Account</h2>
        </div>
        <div className="flex items-center gap-5">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-black text-white shadow-xl shrink-0"
            style={{ background: 'linear-gradient(135deg, #C9747A, #8B4A6B)' }}
          >
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-lg font-bold text-[#F5EEF0] truncate">
              {profile?.displayName || user?.displayName || user?.email?.split('@')[0] || 'User'}
            </p>
            <p className="text-sm text-[#6B5560] truncate">{user?.email}</p>
            <div className="flex items-center gap-3 mt-2 flex-wrap">
              <span className="px-2.5 py-1 rounded-lg bg-[#C9747A]/10 text-[#C9747A] text-[10px] font-bold uppercase tracking-widest border border-[#C9747A]/20">
                {profile?.plan || 'Enterprise'}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-[#10B981]/10 text-[#10B981] text-[10px] font-bold uppercase tracking-widest border border-[#10B981]/20">
                {profile?.planStatus || 'Active'}
              </span>
              {profile?.storeName && (
                <span className="text-xs text-[#6B5560]">
                  <Store size={11} className="inline mr-1" />
                  {profile.storeName}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* API Keys section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Shield size={16} className="text-[#C9747A]" />
          <h2 className="text-sm font-bold text-[#F5EEF0] uppercase tracking-widest">API Integrations</h2>
        </div>
        <p className="text-xs text-[#6B5560] mb-5 leading-relaxed">
          Your API keys are stored securely in Firestore and are only accessible to your account.
          They are never logged or shared.
        </p>

        <div className="space-y-4">
          {/* Shopify API Key */}
          <ApiKeyField
            label="Shopify Admin API Key"
            description="Required for syncing orders, products, and customer data from your Shopify store."
            placeholder="shpat_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
            value={shopifyApiKey}
            onChange={setShopifyApiKey}
            icon={<Store size={16} />}
            accentColor="#10B981"
            docsUrl="https://help.shopify.com/en/manual/apps/app-types/custom-apps"
          />

          {/* Shopify Store Domain */}
          <div className="bg-[#100D10] border border-[#231820] rounded-2xl p-5 hover:border-[#3A2530] transition-all">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-[#10B981]/10 border border-[#10B981]/20">
                <Store size={16} className="text-[#10B981]" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#F5EEF0]">Shopify Store Domain</p>
                <p className="text-xs text-[#6B5560] mt-0.5">Your myshopify.com subdomain (without https://).</p>
              </div>
            </div>
            <input
              type="text"
              placeholder="your-store.myshopify.com"
              value={shopifyStoreDomain}
              onChange={e => setShopifyStoreDomain(e.target.value)}
              className="w-full bg-[#080608] border border-[#231820] rounded-xl px-4 py-3
                text-sm text-[#F5EEF0] placeholder:text-[#3D2B32]
                focus:outline-none focus:border-[#C9747A] focus:ring-1 focus:ring-[#C9747A]/20
                transition-all"
            />
          </div>

          {/* Klaviyo API Key */}
          <ApiKeyField
            label="Klaviyo Private API Key"
            description="Enables email flow automation, list management, and campaign analytics via Klaviyo."
            placeholder="pk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
            value={klaviyoApiKey}
            onChange={setKlaviyoApiKey}
            icon={<Mail size={16} />}
            accentColor="#3B82F6"
            docsUrl="https://help.klaviyo.com/hc/en-us/articles/115005062267"
          />

          {/* Gemini API Key */}
          <ApiKeyField
            label="Google Gemini API Key"
            description="Powers the AI Agents, product descriptions, and marketing copy generation features."
            placeholder="AIzaSy..."
            value={geminiApiKey}
            onChange={setGeminiApiKey}
            icon={<Cpu size={16} />}
            accentColor="#C9747A"
            docsUrl="https://aistudio.google.com/app/apikey"
          />
        </div>
      </div>

      {/* Save button + status */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all"
          style={{
            background: saving ? '#2A1A20' : 'linear-gradient(135deg, #C9747A, #8B4A6B)',
            boxShadow: saving ? 'none' : '0 4px 20px rgba(201,116,122,0.35)',
            cursor: saving ? 'not-allowed' : 'pointer',
          }}
        >
          {saving ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Save size={15} />
          )}
          {saving ? 'Saving...' : 'Save API Keys'}
        </button>

        {saveStatus !== 'idle' && (
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex items-center gap-2 text-sm font-medium ${
              saveStatus === 'success' ? 'text-[#10B981]' : 'text-[#EF4444]'
            }`}
          >
            {saveStatus === 'success'
              ? <CheckCircle size={16} />
              : <AlertCircle size={16} />
            }
            {saveMessage}
          </motion.div>
        )}
      </div>

      {/* Integration status overview */}
      <div className="bg-[#100D10] border border-[#231820] rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Zap size={16} className="text-[#C9747A]" />
          <h2 className="text-sm font-bold text-[#F5EEF0] uppercase tracking-widest">Integration Status</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { label: 'Shopify', connected: !!(shopifyApiKey && shopifyStoreDomain), color: '#10B981' },
            { label: 'Klaviyo', connected: !!klaviyoApiKey, color: '#3B82F6' },
            { label: 'Gemini AI', connected: !!geminiApiKey, color: '#C9747A' },
          ].map(({ label, connected, color }) => (
            <div
              key={label}
              className="flex items-center gap-3 p-3 rounded-xl border"
              style={{
                background: connected ? `${color}08` : '#080608',
                borderColor: connected ? `${color}25` : '#231820',
              }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: connected ? color : '#3D2B32' }}
              />
              <span className="text-sm font-medium text-[#F5EEF0]">{label}</span>
              <span
                className="ml-auto text-[10px] font-bold uppercase tracking-wider"
                style={{ color: connected ? color : '#3D2B32' }}
              >
                {connected ? 'Connected' : 'Not set'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

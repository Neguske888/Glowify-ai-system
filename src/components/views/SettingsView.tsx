// src/components/views/SettingsView.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Store, Lock, Plug, CreditCard, Eye, EyeOff, CheckCircle, AlertCircle, Save, Zap, Loader2, LogOut, X, Sparkles, MessageSquare, Activity } from 'lucide-react';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db, firestoreHelpers } from '../../lib/firebase';
import { updateProfile, linkWithCredential, EmailAuthProvider, updatePassword } from 'firebase/auth';
import { useAuth } from '../../contexts/AuthContext';

// Shopify domain validation regex
const SHOPIFY_DOMAIN_REGEX = /^[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9]\.myshopify\.com$/;

// Integration status with animated indicators
const IntegrationStatus: React.FC<{ status: 'connected' | 'pending' | 'disconnected' }> = ({ status }) => {
  if (status === 'connected') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
        </span>
        Connected
      </span>
    );
  }
  if (status === 'pending') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-500 border border-dashed border-amber-500/30">
        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
        Pending
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#6B5560]/10 text-[#6B5560] border border-[#6B5560]/20">
      <span className="w-2 h-2 rounded-full bg-[#6B5560]"></span>
      Disconnected
    </span>
  );
};

// Toast notification
const Toast: React.FC<{ message: string; type: 'success' | 'error'; onClose: () => void }> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl border ${
        type === 'success' ? 'bg-[#10B981]/10 border-[#10B981]/30 text-[#10B981]' : 'bg-[#EF4444]/10 border-[#EF4444]/30 text-[#EF4444]'
      }`}
    >
      {type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
      <span className="text-sm font-bold">{message}</span>
      <button onClick={onClose} className="ml-2 hover:opacity-70 transition-opacity"><X size={16} /></button>
    </motion.div>
  );
};

// Unsaved changes confirmation dialog
const UnsavedDialog: React.FC<{ onSave: () => void; onDiscard: () => void; onCancel: () => void }> = ({ onSave, onDiscard, onCancel }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm"
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="bg-[#0F0F1E] border border-[#1E1E3A] rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center">
          <AlertCircle size={24} className="text-amber-500" />
        </div>
        <h3 className="text-lg font-bold text-white">Unsaved Changes</h3>
      </div>
      <p className="text-sm text-[#6B6B88] mb-6">You have unsaved changes. Are you sure you want to leave? Your changes will be lost.</p>
      <div className="flex gap-3">
        <button onClick={onCancel} className="flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-widest text-[#6B6B88] border border-[#1E1E3A] hover:bg-white/5 transition-all">Cancel</button>
        <button onClick={onDiscard} className="flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-widest text-white bg-[#1E1E3A] hover:bg-[#2A2A48] transition-all">Discard</button>
        <button onClick={onSave} className="flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-widest text-white bg-gradient-to-r from-[#C9747A] to-[#8B4A6B] hover:opacity-90 transition-all">Save & Leave</button>
      </div>
    </motion.div>
  </motion.div>
);

// Skeleton loader for form fields
const SkeletonField: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse ${className}`}>
    <div className="h-3 w-20 bg-[#1E1E3A] rounded mb-2"></div>
    <div className="h-12 bg-[#1E1E3A] rounded-xl"></div>
  </div>
);

// Skeleton loader for integration cards
const SkeletonCard: React.FC = () => (
  <div className="bg-[#0F0F1E] border border-[#1E1E3A] rounded-2xl p-5 animate-pulse">
    <div className="flex items-start gap-3 mb-4">
      <div className="w-10 h-10 rounded-xl bg-[#1E1E3A]"></div>
      <div className="flex-1">
        <div className="h-4 w-32 bg-[#1E1E3A] rounded mb-2"></div>
        <div className="h-3 w-48 bg-[#1E1E3A] rounded"></div>
      </div>
    </div>
    <div className="h-11 bg-[#1E1E3A] rounded-xl"></div>
  </div>
);

// API Key field with eye toggle
const ApiKeyField: React.FC<{
  label: string; description: string; placeholder: string; value: string;
  onChange: (v: string) => void; icon: React.ReactNode; accentColor: string;
  status: 'connected' | 'pending' | 'disconnected';
  isLoading?: boolean;
}> = ({ label, description, placeholder, value, onChange, icon, accentColor, status, isLoading }) => {
  const [show, setShow] = useState(false);
  
  if (isLoading) {
    return (
      <div className="bg-[#0F0F1E] border border-[#1E1E3A] rounded-2xl p-5 animate-pulse">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#1E1E3A]"></div>
          <div className="flex-1">
            <div className="h-4 w-32 bg-[#1E1E3A] rounded mb-2"></div>
            <div className="h-3 w-48 bg-[#1E1E3A] rounded"></div>
          </div>
        </div>
        <div className="h-11 bg-[#1E1E3A] rounded-xl"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#0F0F1E] border border-[#1E1E3A] rounded-2xl p-5 hover:border-[#2A2A48] transition-all group">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110" style={{ background: `${accentColor}15`, border: `1px solid ${accentColor}25` }}>
          <span style={{ color: accentColor }}>{icon}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-bold text-[#F1F1F8]">{label}</p>
            <IntegrationStatus status={status} />
          </div>
          <p className="text-xs text-[#6B6B88] mt-0.5 leading-relaxed">{description}</p>
        </div>
      </div>
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full bg-[#07070F] border border-[#1E1E3A] rounded-xl px-4 py-3 pr-11 text-sm text-[#F1F1F8] placeholder:text-[#3D3D55] font-mono focus:outline-none focus:border-[#C9747A]/50 transition-all"
        />
        <button type="button" onClick={() => setShow(!show)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#3D3D55] hover:text-[#A0A0B8] transition-colors p-1">
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </div>
  );
};

// Usage bar for billing
const UsageBar: React.FC<{ label: string; used: number; total: number; unit: string; color: string }> = ({ label, used, total, unit, color }) => {
  const percentage = Math.min((used / total) * 100, 100);
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-xs font-medium text-[#6B6B88]">{label}</span>
        <span className="text-xs font-bold text-[#F1F1F8]">{used.toLocaleString()} / {total.toLocaleString()} {unit}</span>
      </div>
      <div className="h-2 bg-[#0F0F1E] rounded-full overflow-hidden">
        <motion.div initial={{ width: 0 }} animate={{ width: `${percentage}%` }} transition={{ duration: 0.8, ease: 'easeOut' }} className="h-full rounded-full" style={{ background: color }} />
      </div>
    </div>
  );
};

type TabId = 'profile' | 'integrations' | 'billing';

export const SettingsView: React.FC = () => {
  const { user, profile, refreshProfile, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<TabId>('profile');
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);
  const [pendingTab, setPendingTab] = useState<TabId | null>(null);

  // Track original values for dirty checking
  const [originalValues, setOriginalValues] = useState({
    displayName: '', storeName: '', shopifyApiKey: '', shopifyStoreDomain: '', klaviyoApiKey: '', geminiApiKey: ''
  });

  // Profile state
  const [displayName, setDisplayName] = useState('');
  const [storeName, setStoreName] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);

  // Password state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPwd, setShowNewPwd] = useState(false);
  const [showConfPwd, setShowConfPwd] = useState(false);
  const [savingPwd, setSavingPwd] = useState(false);
  const [pwdResult, setPwdResult] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
  const [passwordAlreadySet, setPasswordAlreadySet] = useState(false);

  // API key state
  const [shopifyApiKey, setShopifyApiKey] = useState('');
  const [shopifyStoreDomain, setShopifyStoreDomain] = useState('');
  const [shopifyDomainError, setShopifyDomainError] = useState('');
  const [klaviyoApiKey, setKlaviyoApiKey] = useState('');
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [savingKeys, setSavingKeys] = useState(false);

  // UI state
  const [confirmSignOut, setConfirmSignOut] = useState(false);

  // Check if form is dirty
  const isDirty = 
    displayName !== originalValues.displayName ||
    storeName !== originalValues.storeName ||
    shopifyApiKey !== originalValues.shopifyApiKey ||
    shopifyStoreDomain !== originalValues.shopifyStoreDomain ||
    klaviyoApiKey !== originalValues.klaviyoApiKey ||
    geminiApiKey !== originalValues.geminiApiKey;

  // Validate Shopify domain
  const validateShopifyDomain = useCallback((domain: string) => {
    if (!domain) {
      setShopifyDomainError('');
      return true;
    }
    if (!SHOPIFY_DOMAIN_REGEX.test(domain)) {
      setShopifyDomainError('Must be in format: your-store.myshopify.com');
      return false;
    }
    setShopifyDomainError('');
    return true;
  }, []);

  // Handle Shopify domain change with validation
  const handleShopifyDomainChange = (value: string) => {
    setShopifyStoreDomain(value);
    validateShopifyDomain(value);
  };

  useEffect(() => {
    if (profile) {
      const values = {
        displayName: profile.displayName || '',
        storeName: profile.storeName || '',
        shopifyApiKey: profile.shopifyApiKey || '',
        shopifyStoreDomain: profile.shopifyStoreDomain || '',
        klaviyoApiKey: profile.klaviyoApiKey || '',
        geminiApiKey: profile.geminiApiKey || ''
      };
      setDisplayName(values.displayName);
      setStoreName(values.storeName);
      setShopifyApiKey(values.shopifyApiKey);
      setShopifyStoreDomain(values.shopifyStoreDomain);
      setKlaviyoApiKey(values.klaviyoApiKey);
      setGeminiApiKey(values.geminiApiKey);
      setOriginalValues(values);
      setIsLoading(false);
    }
    if (user) {
      if (user.providerData.some(p => p.providerId === 'password')) setPasswordAlreadySet(true);
    }
  }, [profile, user]);

  // Handle tab change with dirty check
  const handleTabChange = (newTab: TabId) => {
    if (isDirty) {
      setPendingTab(newTab);
      setShowUnsavedDialog(true);
    } else {
      setActiveTab(newTab);
    }
  };

  const handleSaveAndSwitch = async () => {
    setShowUnsavedDialog(false);
    await handleSaveApiKeys();
    if (pendingTab) setActiveTab(pendingTab);
    setPendingTab(null);
  };

  const handleDiscardAndSwitch = () => {
    // Reset to original values
    setDisplayName(originalValues.displayName);
    setStoreName(originalValues.storeName);
    setShopifyApiKey(originalValues.shopifyApiKey);
    setShopifyStoreDomain(originalValues.shopifyStoreDomain);
    setKlaviyoApiKey(originalValues.klaviyoApiKey);
    setGeminiApiKey(originalValues.geminiApiKey);
    setShopifyDomainError('');
    setShowUnsavedDialog(false);
    if (pendingTab) setActiveTab(pendingTab);
    setPendingTab(null);
  };

  const handleCancelDialog = () => {
    setShowUnsavedDialog(false);
    setPendingTab(null);
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    setSavingProfile(true);
    try {
      await updateProfile(user, { displayName });
      await setDoc(doc(db, 'users', user.uid), { displayName, storeName, updatedAt: serverTimestamp() }, { merge: true });
      await refreshProfile();
      setOriginalValues(prev => ({ ...prev, displayName, storeName }));
      setToast({ message: 'Profile updated successfully', type: 'success' });
    } catch { setToast({ message: 'Failed to update profile', type: 'error' }); }
    finally { setSavingProfile(false); }
  };

  const handleSetPassword = async () => {
    setPwdResult(null);
    if (newPassword.length < 8) { setPwdResult({ type: 'error', msg: 'Password must be at least 8 characters.' }); return; }
    if (newPassword !== confirmPassword) { setPwdResult({ type: 'error', msg: 'Passwords do not match.' }); return; }
    if (!user?.email) { setPwdResult({ type: 'error', msg: 'No email address found.' }); return; }
    setSavingPwd(true);
    try {
      if (passwordAlreadySet) { await updatePassword(user, newPassword); }
      else { await linkWithCredential(user, EmailAuthProvider.credential(user.email, newPassword)); }
      await setDoc(doc(db, 'users', user.uid), { passwordSet: true, updatedAt: serverTimestamp() }, { merge: true });
      setPasswordAlreadySet(true);
      setPwdResult({ type: 'success', msg: 'Security updated successfully.' });
      setNewPassword(''); setConfirmPassword('');
    } catch (err: any) {
      setPwdResult({ type: 'error', msg: err.code === 'auth/requires-recent-login' ? 'Please sign out and sign in again.' : 'Failed to update security.' });
    } finally { setSavingPwd(false); }
  };

  const handleSaveApiKeys = async () => {
    if (!user || !db) return;
    if (!validateShopifyDomain(shopifyStoreDomain)) return;
    setSavingKeys(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    try {
      await setDoc(doc(db, 'users', user.uid), { shopifyApiKey, shopifyStoreDomain, klaviyoApiKey, geminiApiKey, updatedAt: serverTimestamp() }, { merge: true });
      await refreshProfile();
      setOriginalValues(prev => ({ ...prev, shopifyApiKey, shopifyStoreDomain, klaviyoApiKey, geminiApiKey }));
      setToast({ message: 'Integrations saved successfully', type: 'success' });
    } catch { setToast({ message: 'Failed to save integrations', type: 'error' }); }
    finally { setSavingKeys(false); }
  };

  const getStatus = (key: string) => key && key.length > 0 ? 'connected' : 'disconnected';

  // Check if save button should be disabled
  const isSaveDisabled = !validateShopifyDomain(shopifyStoreDomain) || savingKeys;

  const tabs = [
    { id: 'profile' as TabId, label: 'Account', icon: <User size={16} /> },
    { id: 'integrations' as TabId, label: 'Integrations', icon: <Plug size={16} /> },
    { id: 'billing' as TabId, label: 'Billing', icon: <CreditCard size={16} /> },
  ];

  return (
    <div className="space-y-6">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      {showUnsavedDialog && <UnsavedDialog onSave={handleSaveAndSwitch} onDiscard={handleDiscardAndSwitch} onCancel={handleCancelDialog} />}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white">Settings</h2>
          <p className="text-sm text-[#6B6B88] mt-1">Manage your Glowify AI account</p>
        </div>
        <div className="flex items-center gap-1 bg-[#0F0F1E] p-1 rounded-2xl border border-[#1E1E3A]">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => handleTabChange(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeTab === tab.id ? 'bg-[#C9747A] text-white shadow-lg' : 'text-[#6B6B88] hover:text-white hover:bg-white/5'}`}>
              {tab.icon}<span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'profile' && (
          <motion.div key="profile" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
            {/* Profile */}
            <section className="bg-[#0F0F1E] border border-[#1E1E3A] rounded-[24px] p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#C9747A]/10 flex items-center justify-center"><User size={24} className="text-[#C9747A]" /></div>
                <div><h3 className="text-[15px] font-bold text-[#F5EEF0]">Account Profile</h3><p className="text-[11px] text-[#6B5560]">Your personal information</p></div>
              </div>
              {isLoading ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SkeletonField />
                    <SkeletonField />
                  </div>
                  <SkeletonField />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-[#6B6B88] uppercase tracking-widest ml-1">Display Name</label>
                      <input type="text" value={displayName} onChange={e => setDisplayName(e.target.value)} placeholder="Your name"
                        className="w-full bg-[#07070F] border border-[#1E1E3A] rounded-xl px-4 py-3.5 text-sm text-[#F1F1F8] placeholder:text-[#3D3D55] focus:outline-none focus:border-[#C9747A]/50 transition-all" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-[#6B6B88] uppercase tracking-widest ml-1">Email</label>
                      <input type="email" value={user?.email || ''} disabled className="w-full bg-[#0A0A14] border border-[#1E1E3A] rounded-xl px-4 py-3.5 text-sm text-[#6B6B88] cursor-not-allowed" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-[#6B6B88] uppercase tracking-widest ml-1">Store Name</label>
                    <div className="relative">
                      <Store size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3D3D55]" />
                      <input type="text" value={storeName} onChange={e => setStoreName(e.target.value)} placeholder="Your Shopify store name"
                        className="w-full bg-[#07070F] border border-[#1E1E3A] rounded-xl pl-11 pr-4 py-3.5 text-sm text-[#F1F1F8] placeholder:text-[#3D3D55] focus:outline-none focus:border-[#C9747A]/50 transition-all" />
                    </div>
                  </div>
                  <button onClick={handleSaveProfile} disabled={savingProfile}
                    className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ background: savingProfile ? '#6B5560' : 'linear-gradient(135deg, #C9747A, #8B4A6B)' }}>
                    {savingProfile ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : <><Save size={16} /> Save Profile</>}
                  </button>
                </div>
              )}
            </section>

            {/* Security */}
            <section className="bg-[#0F0F1E] border border-[#1E1E3A] rounded-[24px] p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#8B4A6B]/10 flex items-center justify-center"><Lock size={24} className="text-[#8B4A6B]" /></div>
                <div><h3 className="text-[15px] font-bold text-[#F5EEF0]">Security</h3><p className="text-[11px] text-[#6B5560]">Update your password</p></div>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-[#6B6B88] uppercase tracking-widest ml-1">New Password</label>
                    <div className="relative">
                      <input type={showNewPwd ? 'text' : 'password'} value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Min. 8 characters"
                        className="w-full bg-[#07070F] border border-[#1E1E3A] rounded-xl px-4 py-3.5 pr-11 text-sm text-[#F1F1F8] placeholder:text-[#3D3D55] focus:outline-none focus:border-[#C9747A]/50 transition-all" />
                      <button onClick={() => setShowNewPwd(!showNewPwd)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#3D3D55] hover:text-[#A0A0B8]">{showNewPwd ? <EyeOff size={16} /> : <Eye size={16} />}</button>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-[#6B6B88] uppercase tracking-widest ml-1">Confirm Password</label>
                    <div className="relative">
                      <input type={showConfPwd ? 'text' : 'password'} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Repeat password"
                        className="w-full bg-[#07070F] border border-[#1E1E3A] rounded-xl px-4 py-3.5 pr-11 text-sm text-[#F1F1F8] placeholder:text-[#3D3D55] focus:outline-none focus:border-[#C9747A]/50 transition-all" />
                      <button onClick={() => setShowConfPwd(!showConfPwd)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#3D3D55] hover:text-[#A0A0B8]">{showConfPwd ? <EyeOff size={16} /> : <Eye size={16} />}</button>
                    </div>
                  </div>
                </div>
                <AnimatePresence>{pwdResult && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                    className={`p-4 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-3 ${pwdResult.type === 'success' ? 'bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20' : 'bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/20'}`}>
                    {pwdResult.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}{pwdResult.msg}
                  </motion.div>
                )}</AnimatePresence>
                <button onClick={handleSetPassword} disabled={savingPwd || !newPassword}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest text-white bg-[#1E1E3A] hover:bg-[#2A2A48] transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                  {savingPwd ? <><Loader2 size={16} className="animate-spin" /> Updating...</> : <><Lock size={16} /> Update Security</>}
                </button>
              </div>
            </section>

            {/* Sign Out */}
            <section className="bg-[#EF4444]/5 border border-[#EF4444]/10 rounded-[24px] p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#EF4444]/10 flex items-center justify-center"><LogOut size={24} className="text-[#EF4444]" /></div>
                <div><h3 className="text-[15px] font-bold text-[#F5EEF0]">Sign Out</h3><p className="text-[11px] text-[#6B5560]">Securely end your current session</p></div>
              </div>
              {!confirmSignOut ? (
                <button onClick={() => setConfirmSignOut(true)} className="px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-[#EF4444] border border-[#EF4444]/20 hover:bg-[#EF4444]/10 transition-all">Terminate Session</button>
              ) : (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-2">
                  <button onClick={async () => { await signOut(); }} className="px-5 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-white bg-[#EF4444] hover:bg-[#DC2626] transition-all">Confirm Logout</button>
                  <button onClick={() => setConfirmSignOut(false)} className="px-5 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-[#6B5560] border border-[#1E1E3A] hover:bg-white/5 transition-all">Cancel</button>
                </motion.div>
              )}
            </section>
          </motion.div>
        )}

        {activeTab === 'integrations' && (
          <motion.div key="integrations" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
            <section className="bg-[#0F0F1E] border border-[#1E1E3A] rounded-[24px] p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#10B981]/10 flex items-center justify-center"><Plug size={24} className="text-[#10B981]" /></div>
                <div><h3 className="text-[15px] font-bold text-[#F5EEF0]">Connected Services</h3><p className="text-[11px] text-[#6B5560]">Manage your API keys and integrations</p></div>
              </div>
              <div className="space-y-4">
                <ApiKeyField label="Shopify Admin API" description="Connect your Shopify store for product & order sync." placeholder="shpat_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  value={shopifyApiKey} onChange={setShopifyApiKey} icon={<Store size={18} />} accentColor="#95BF47" status={getStatus(shopifyApiKey)} isLoading={isLoading} />
                
                {/* Shopify Domain with validation */}
                <div className="bg-[#0F0F1E] border border-[#1E1E3A] rounded-2xl p-5 hover:border-[#2A2A48] transition-all group">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-[#95BF47]/10 border border-[#95BF47]/25"><Store size={18} style={{ color: '#95BF47' }} /></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-bold text-[#F1F1F8]">Shopify Store Domain</p>
                        <IntegrationStatus status={shopifyStoreDomain ? 'connected' : 'disconnected'} />
                      </div>
                      <p className="text-xs text-[#6B6B88] mt-0.5">Your myshopify.com store URL</p>
                    </div>
                  </div>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={shopifyStoreDomain} 
                      onChange={e => handleShopifyDomainChange(e.target.value)} 
                      placeholder="your-store.myshopify.com"
                      className={`w-full bg-[#07070F] border rounded-xl px-4 py-3 text-sm text-[#F1F1F8] placeholder:text-[#3D3D55] font-mono focus:outline-none focus:border-[#C9747A]/50 transition-all ${
                        shopifyDomainError ? 'border-[#EF4444]/50' : 'border-[#1E1E3A]'
                      }`}
                    />
                  </div>
                  {shopifyDomainError && (
                    <p className="text-[10px] text-[#EF4444] mt-2 font-bold uppercase tracking-wider flex items-center gap-1">
                      <AlertCircle size={10} /> {shopifyDomainError}
                    </p>
                  )}
                </div>

                <ApiKeyField label="Klaviyo Private Key" description="Automate flows and marketing campaigns." placeholder="pk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  value={klaviyoApiKey} onChange={setKlaviyoApiKey} icon={<MessageSquare size={18} />} accentColor="#3B82F6" status={getStatus(klaviyoApiKey)} isLoading={isLoading} />
                <ApiKeyField label="Gemini AI Engine" description="Powers AI agents and product intelligence." placeholder="AIzaSy..."
                  value={geminiApiKey} onChange={setGeminiApiKey} icon={<Sparkles size={18} />} accentColor="#C9747A" status={getStatus(geminiApiKey)} isLoading={isLoading} />
              </div>
            </section>
            <button onClick={handleSaveApiKeys} disabled={isSaveDisabled}
              className="flex items-center gap-2.5 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-white transition-all shadow-xl hover:shadow-[#C9747A]/20 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto justify-center"
              style={{ background: savingKeys ? 'linear-gradient(135deg, #6B5560, #4A3A48)' : 'linear-gradient(135deg, #C9747A, #8B4A6B)' }}>
              {savingKeys ? <><Loader2 size={16} className="animate-spin" /> Synchronizing...</> : <><Save size={16} /> Save Integrations</>}
            </button>
          </motion.div>
        )}

        {activeTab === 'billing' && (
          <motion.div key="billing" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
            {/* Current Plan */}
            <section className="bg-gradient-to-br from-[#140F14] to-[#0F0F1E] border border-[#C9747A]/30 rounded-[24px] p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9747A]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#C9747A] to-[#8B4A6B] flex items-center justify-center shadow-lg shadow-[#C9747A]/20"><Zap size={28} className="text-white" /></div>
                  <div>
                    <div className="flex items-center gap-3"><h3 className="text-xl font-black text-white">Enterprise Plan</h3><span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20">Active</span></div>
                    <p className="text-sm text-[#6B6B88] mt-1">Unlimited AI operations & integrations</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-[#080608]/50 rounded-xl p-4 border border-[#1E1E3A]/50"><p className="text-[10px] font-black text-[#6B6B88] uppercase tracking-widest mb-1">Renewal</p><p className="text-sm font-bold text-white">Jan 15, 2025</p></div>
                  <div className="bg-[#080608]/50 rounded-xl p-4 border border-[#1E1E3A]/50"><p className="text-[10px] font-black text-[#6B6B88] uppercase tracking-widest mb-1">Amount</p><p className="text-sm font-bold text-white">$299/mo</p></div>
                  <div className="bg-[#080608]/50 rounded-xl p-4 border border-[#1E1E3A]/50"><p className="text-[10px] font-black text-[#6B6B88] uppercase tracking-widest mb-1">Billing</p><p className="text-sm font-bold text-white">Monthly</p></div>
                  <div className="bg-[#080608]/50 rounded-xl p-4 border border-[#1E1E3A]/50"><p className="text-[10px] font-black text-[#6B6B88] uppercase tracking-widest mb-1">Status</p><p className="text-sm font-bold text-[#10B981]">Paid</p></div>
                </div>
              </div>
            </section>

            {/* Usage Metrics */}
            <section className="bg-[#0F0F1E] border border-[#1E1E3A] rounded-[24px] p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#8B4A6B]/10 flex items-center justify-center"><Activity size={24} className="text-[#8B4A6B]" /></div>
                <div><h3 className="text-[15px] font-bold text-[#F5EEF0]">Usage This Month</h3><p className="text-[11px] text-[#6B5560]">December 2024</p></div>
              </div>
              <div className="space-y-6">
                <UsageBar label="AI Tasks" used={847} total={1000} unit="tasks" color="linear-gradient(90deg, #C9747A, #8B4A6B)" />
                <UsageBar label="Gemini API Calls" used={23450} total={50000} unit="calls" color="linear-gradient(90deg, #10B981, #059669)" />
                <UsageBar label="Automations Run" used={156} total={500} unit="runs" color="linear-gradient(90deg, #3B82F6, #1D4ED8)" />
                <UsageBar label="Data Sync (GB)" used={2.4} total={10} unit="GB" color="linear-gradient(90deg, #F59E0B, #D97706)" />
              </div>
              <div className="mt-6 pt-6 border-t border-[#1E1E3A]">
                <button className="w-full py-3 rounded-xl text-xs font-black uppercase tracking-widest text-[#C9747A] border border-[#C9747A]/20 hover:bg-[#C9747A]/10 transition-all">Upgrade Plan for More Usage</button>
              </div>
            </section>

            {/* Payment Method */}
            <section className="bg-[#0F0F1E] border border-[#1E1E3A] rounded-[24px] p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#3B82F6]/10 flex items-center justify-center"><CreditCard size={24} className="text-[#3B82F6]" /></div>
                <div><h3 className="text-[15px] font-bold text-[#F5EEF0]">Payment Method</h3><p className="text-[11px] text-[#6B5560]">Manage your billing information</p></div>
              </div>
              <div className="flex items-center justify-between p-4 bg-[#080608]/50 rounded-xl border border-[#1E1E3A]/50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-8 bg-gradient-to-r from-[#1A1F71] to-[#0066B2] rounded flex items-center justify-center text-white text-xs font-bold">VISA</div>
                  <div><p className="text-sm font-bold text-white">•••• •••• •••• 4242</p><p className="text-[10px] text-[#6B6B88]">Expires 12/26</p></div>
                </div>
                <button className="text-xs font-bold text-[#C9747A] hover:underline uppercase tracking-wider">Update</button>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

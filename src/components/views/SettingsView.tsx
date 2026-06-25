// src/components/views/SettingsView.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Key, Store, Mail, Cpu, Eye, EyeOff, CheckCircle, AlertCircle, Save, User, Lock, Zap, Loader2, LogOut, Trash2 } from 'lucide-react';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, firestoreHelpers } from '../../lib/firebase';
import { updateProfile, linkWithCredential, EmailAuthProvider, updatePassword } from 'firebase/auth';
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
  error?: string;
}

const ApiKeyField: React.FC<ApiKeyFieldProps> = ({
  label, description, placeholder, value, onChange, icon, accentColor, docsUrl, error
}) => {
  const [show, setShow] = useState(false);

  return (
    <div className={`bg-[#0F0F1E] border ${error ? 'border-[#EF4444]/50' : 'border-[#1E1E3A]'} rounded-2xl p-5 hover:border-[#2A2A48] transition-all group`}>
      <div className="flex items-start gap-3 mb-4">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
          style={{ background: `${accentColor}15`, border: `1px solid ${accentColor}25` }}
        >
          <span style={{ color: accentColor }}>{icon}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-bold text-[#F1F1F8]">{label}</p>
            {value && !error && (
              <motion.span 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20"
              >
                Configured
              </motion.span>
            )}
          </div>
          <p className="text-xs text-[#6B6B88] mt-0.5 leading-relaxed">{description}</p>
          {docsUrl && (
            <a
              href={docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-[#C9747A] hover:underline mt-1.5 inline-block font-bold uppercase tracking-wider"
            >
              Get Key →
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
          className={`w-full bg-[#07070F] border ${error ? 'border-[#EF4444]/30' : 'border-[#1E1E3A]'} rounded-xl px-4 py-3 pr-11
            text-sm text-[#F1F1F8] placeholder:text-[#3D3D55] font-mono
            focus:outline-none focus:border-[#C9747A]/50 focus:ring-1 focus:ring-[#C9747A]/10
            transition-all`}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#3D3D55] hover:text-[#A0A0B8] transition-colors"
        >
          {show ? <EyeOff size={15} /> : <Eye size={15} />}
        </button>
      </div>
      {error && (
        <p className="text-[10px] text-[#EF4444] mt-2 font-bold uppercase tracking-wider flex items-center gap-1">
          <AlertCircle size={10} /> {error}
        </p>
      )}
    </div>
  );
};

export const SettingsView: React.FC = () => {
  const { user, profile, refreshProfile, signOut } = useAuth();

  // Profile state
  const [displayName, setDisplayName] = useState('');
  const [storeName, setStoreName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);
  const [savedProfile, setSavedProfile] = useState(false);

  // Password state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPwd, setShowNewPwd] = useState(false);
  const [showConfPwd, setShowConfPwd] = useState(false);
  const [savingPwd, setSavingPwd] = useState(false);
  const [pwdResult, setPwdResult] = useState<{type:'success'|'error'; msg:string} | null>(null);
  const [passwordAlreadySet, setPasswordAlreadySet] = useState(false);

  // API key state
  const [shopifyApiKey, setShopifyApiKey] = useState('');
  const [shopifyStoreDomain, setShopifyStoreDomain] = useState('');
  const [klaviyoApiKey, setKlaviyoApiKey] = useState('');
  const [geminiApiKey, setGeminiApiKey] = useState('');
  
  // Errors
  const [shopifyError, setShopifyError] = useState('');

  // UI state
  const [savingKeys, setSavingKeys] = useState(false);
  const [keyStatus, setKeyStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [keyMessage, setKeyMessage] = useState('');
  const [confirmSignOut, setConfirmSignOut] = useState(false);

  // Hydrate states from profile
  useEffect(() => {
    if (profile) {
      setDisplayName(profile.displayName || '');
      setStoreName(profile.storeName || '');
      setShopifyApiKey(profile.shopifyApiKey || '');
      setShopifyStoreDomain(profile.shopifyStoreDomain || '');
      setKlaviyoApiKey(profile.klaviyoApiKey || '');
      setGeminiApiKey(profile.geminiApiKey || '');
    }
    if (user) {
      setPhotoURL(user.photoURL || '');
      if (user.providerData.some(p => p.providerId === 'password')) {
        setPasswordAlreadySet(true);
      }
    }
  }, [profile, user]);

  const handleSaveProfile = async () => {
    if (!user) return;
    setSavingProfile(true);
    try {
      await updateProfile(user, { displayName });
      await setDoc(doc(db, 'users', user.uid), { 
        displayName, 
        storeName, 
        updatedAt: serverTimestamp() 
      }, { merge: true });
      
      await refreshProfile();
      setSavedProfile(true);
      setTimeout(() => setSavedProfile(false), 3000);
    } catch (err: any) {
      console.error('Profile save failed:', err);
    } finally {
      setSavingProfile(false);
    }
  };

  const handleSetPassword = async () => {
    setPwdResult(null);
    if (newPassword.length < 8) { setPwdResult({ type: 'error', msg: 'Password must be at least 8 characters.' }); return; }
    if (newPassword !== confirmPassword) { setPwdResult({ type: 'error', msg: 'Passwords do not match.' }); return; }
    if (!user?.email) { setPwdResult({ type: 'error', msg: 'No email address found on this account.' }); return; }
    
    setSavingPwd(true);
    try {
      const credential = EmailAuthProvider.credential(user.email, newPassword);
      if (passwordAlreadySet) {
        await updatePassword(user, newPassword);
      } else {
        await linkWithCredential(user, credential);
      }
      await setDoc(doc(db, 'users', user.uid), { passwordSet: true, updatedAt: serverTimestamp() }, { merge: true });
      setPasswordAlreadySet(true);
      setPwdResult({ type: 'success', msg: 'Security updated successfully.' });
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      const msg = err.code === 'auth/requires-recent-login'
        ? 'Please sign out and sign in again before changing your password.'
        : err.message || 'Failed to update security.';
      setPwdResult({ type: 'error', msg });
    } finally {
      setSavingPwd(false);
    }
  };

  const handleSaveApiKeys = async () => {
    if (!user || !db) return;
    setShopifyError('');
    
    // Basic Shopify Key Validation
    if (shopifyApiKey && !shopifyApiKey.startsWith('shpat_')) {
      setShopifyError('Invalid Shopify Admin API Key format (should start with shpat_)');
      return;
    }

    setSavingKeys(true);
    setKeyStatus('idle');
    try {
      // Clean domain input (remove https:// and trailing slashes)
      const cleanDomain = shopifyStoreDomain.trim()
        .replace(/^https?:\/\//, '')
        .replace(/\/$/, '');

      await setDoc(
        doc(db, 'users', user.uid),
        {
          shopifyApiKey:      shopifyApiKey.trim(),
          shopifyStoreDomain: cleanDomain,
          klaviyoApiKey:      klaviyoApiKey.trim(),
          geminiApiKey:       geminiApiKey.trim(),
          updatedAt:          serverTimestamp(),
        },
        { merge: true }
      );
      
      await refreshProfile();
      setKeyStatus('success');
      setKeyMessage('Integrations synchronized.');
    } catch (err: any) {
      setKeyStatus('error');
      setKeyMessage('Failed to save. Check your connection.');
    } finally {
      setSavingKeys(false);
      setTimeout(() => setKeyStatus('idle'), 4000);
    }
  };

  const initials = displayName
    ? displayName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
    : user?.email?.[0]?.toUpperCase() || '?';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8 pb-12"
    >
      {/* Profile Section */}
      <section className="bg-[#0F0F1E] border border-[#1E1E3A] rounded-[24px] overflow-hidden shadow-sm">
        <div className="flex items-center gap-4 px-6 py-5 border-b border-[#1E1E3A] bg-white/[0.02]">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#C9747A]/10 border border-[#C9747A]/20">
            <User size={20} className="text-[#C9747A]" />
          </div>
          <div>
            <h3 className="text-[15px] font-bold text-[#F5EEF0]">Identity</h3>
            <p className="text-[11px] text-[#6B5560] font-medium">Personal and store information</p>
          </div>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-[24px] overflow-hidden bg-gradient-to-br from-[#C9747A] to-[#8B4A6B] flex items-center justify-center font-black text-white text-2xl shadow-2xl border-2 border-white/5">
              {photoURL
                ? <img src={photoURL} alt="avatar" className="w-full h-full object-cover" />
                : <span>{initials}</span>
              }
            </div>
            <div>
              <p className="text-sm font-bold text-[#F5EEF0]">{user?.email}</p>
              <p className="text-[11px] text-[#6B5560] mt-1 font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                Authenticated via Google
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-[#3D3D55] uppercase tracking-[0.15em] ml-1">Display Name</label>
              <input
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                placeholder="Full Name"
                className="w-full bg-[#07070F] border border-[#1E1E3A] rounded-xl px-4 py-3.5 text-sm text-[#F5EEF0] placeholder:text-[#3D3D55] focus:outline-none focus:border-[#C9747A]/50 transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-[#3D3D55] uppercase tracking-[0.15em] ml-1">Store Name</label>
              <input
                value={storeName}
                onChange={e => setStoreName(e.target.value)}
                placeholder="Store Name"
                className="w-full bg-[#07070F] border border-[#1E1E3A] rounded-xl px-4 py-3.5 text-sm text-[#F5EEF0] placeholder:text-[#3D3D55] focus:outline-none focus:border-[#C9747A]/50 transition-all"
              />
            </div>
          </div>

          <button
            onClick={handleSaveProfile}
            disabled={savingProfile}
            className="group relative flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all overflow-hidden"
            style={{
              background: savedProfile ? 'rgba(16,185,129,0.1)' : 'linear-gradient(135deg, #C9747A, #8B4A6B)',
              color: savedProfile ? '#10B981' : 'white',
              border: savedProfile ? '1px solid rgba(16,185,129,0.3)' : 'none',
              boxShadow: savedProfile ? 'none' : '0 4px 15px rgba(201,116,122,0.3)',
            }}
          >
            <AnimatePresence mode="wait">
              {savingProfile ? (
                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Loader2 size={18} className="animate-spin" />
                </motion.div>
              ) : savedProfile ? (
                <motion.div key="saved" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-2">
                  <CheckCircle size={18} /> Changes Saved
                </motion.div>
              ) : (
                <motion.div key="default" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                  Update Identity
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </section>

      {/* API Integrations */}
      <section className="space-y-5">
        <div className="flex items-center gap-3 ml-1">
          <div className="w-8 h-8 rounded-lg bg-[#C9747A]/10 flex items-center justify-center">
            <Key size={16} className="text-[#C9747A]" />
          </div>
          <h2 className="text-sm font-black text-[#F5EEF0] uppercase tracking-[0.2em]">Data Synchronicity</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <ApiKeyField
            label="Shopify Admin API Key"
            description="Sync products, orders, and customer segments."
            placeholder="shpat_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
            value={shopifyApiKey}
            onChange={setShopifyApiKey}
            icon={<Store size={18} />}
            accentColor="#10B981"
            docsUrl="https://help.shopify.com/en/manual/apps/app-types/custom-apps"
            error={shopifyError}
          />

          <div className="bg-[#0F0F1E] border border-[#1E1E3A] rounded-2xl p-5 hover:border-[#2A2A48] transition-all group">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-[#10B981]/10 border border-[#10B981]/20 group-hover:scale-110 transition-transform">
                <Store size={18} className="text-[#10B981]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-[#F5EEF0]">Shopify Domain</p>
                <p className="text-[11px] text-[#6B5560] mt-0.5 font-medium">Your .myshopify.com subdomain</p>
              </div>
            </div>
            <input
              type="text"
              placeholder="your-store.myshopify.com"
              value={shopifyStoreDomain}
              onChange={e => setShopifyStoreDomain(e.target.value)}
              className="w-full bg-[#07070F] border border-[#1E1E3A] rounded-xl px-4 py-3.5 text-sm text-[#F5EEF0] placeholder:text-[#3D3D55] focus:outline-none focus:border-[#C9747A]/50 transition-all"
            />
          </div>

          <ApiKeyField
            label="Klaviyo Private Key"
            description="Automate flows and marketing campaigns."
            placeholder="pk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
            value={klaviyoApiKey}
            onChange={setKlaviyoApiKey}
            icon={<Mail size={18} />}
            accentColor="#3B82F6"
          />

          <ApiKeyField
            label="Gemini AI Engine"
            description="Powers product analysis and agent intelligence."
            placeholder="AIzaSy..."
            value={geminiApiKey}
            onChange={setGeminiApiKey}
            icon={<Cpu size={18} />}
            accentColor="#C9747A"
          />
        </div>

        <div className="flex items-center gap-4 pt-2">
          <button
            onClick={handleSaveApiKeys}
            disabled={savingKeys}
            className="flex items-center gap-2.5 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-white transition-all shadow-xl hover:shadow-[#C9747A]/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: 'linear-gradient(135deg, #C9747A, #8B4A6B)' }}
          >
            {savingKeys ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {savingKeys ? 'Synchronizing...' : 'Save Integrations'}
          </button>

          <AnimatePresence>
            {keyStatus !== 'idle' && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className={`flex items-center gap-2 text-xs font-black uppercase tracking-widest ${
                  keyStatus === 'success' ? 'text-[#10B981]' : 'text-[#EF4444]'
                }`}
              >
                {keyStatus === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                {keyMessage}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Security & Access */}
      <section className="bg-[#0F0F1E] border border-[#1E1E3A] rounded-[24px] overflow-hidden">
        <div className="flex items-center gap-4 px-6 py-5 border-b border-[#1E1E3A] bg-white/[0.02]">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#C9747A]/10 border border-[#C9747A]/20">
            <Lock size={20} className="text-[#C9747A]" />
          </div>
          <div>
            <h3 className="text-[15px] font-bold text-[#F5EEF0]">Security</h3>
            <p className="text-[11px] text-[#6B5560] font-medium">Manage your access credentials</p>
          </div>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-[#3D3D55] uppercase tracking-[0.15em] ml-1">New Password</label>
              <div className="relative">
                <input
                  type={showNewPwd ? 'text' : 'password'}
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  className="w-full bg-[#07070F] border border-[#1E1E3A] rounded-xl px-4 py-3.5 text-sm text-[#F5EEF0] placeholder:text-[#3D3D55] focus:outline-none focus:border-[#C9747A]/50 transition-all"
                />
                <button onClick={() => setShowNewPwd(!showNewPwd)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#3D3D55] hover:text-[#A0A0B8]">
                  {showNewPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-[#3D3D55] uppercase tracking-[0.15em] ml-1">Verify Password</label>
              <div className="relative">
                <input
                  type={showConfPwd ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Repeat Password"
                  className="w-full bg-[#07070F] border border-[#1E1E3A] rounded-xl px-4 py-3.5 text-sm text-[#F5EEF0] placeholder:text-[#3D3D55] focus:outline-none focus:border-[#C9747A]/50 transition-all"
                />
                <button onClick={() => setShowConfPwd(!showConfPwd)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#3D3D55] hover:text-[#A0A0B8]">
                  {showConfPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {pwdResult && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className={`p-4 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-3 ${
                  pwdResult.type === 'success' ? 'bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20' : 'bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/20'
                }`}
              >
                {pwdResult.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                {pwdResult.msg}
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={handleSetPassword}
            disabled={savingPwd}
            className="px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest text-white transition-all bg-[#1E1E3A] hover:bg-[#2A2A48] active:scale-95 disabled:opacity-50"
          >
            {savingPwd ? 'Processing...' : 'Update Security'}
          </button>
        </div>
      </section>

      {/* Danger Zone */}
      <section className="bg-[#EF4444]/5 border border-[#EF4444]/10 rounded-[24px] p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#EF4444]/10 flex items-center justify-center shrink-0">
            <LogOut size={24} className="text-[#EF4444]" />
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-[15px] font-bold text-[#F5EEF0]">Sign Out</h3>
            <p className="text-[11px] text-[#6B5560] font-medium">Securely end your current session</p>
          </div>
        </div>
        
        {!confirmSignOut ? (
          <button
            onClick={() => setConfirmSignOut(true)}
            className="px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-[#EF4444] border border-[#EF4444]/20 hover:bg-[#EF4444]/10 transition-all active:scale-95"
          >
            Terminate Session
          </button>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2"
          >
            <button
              onClick={async () => { await signOut(); }}
              className="px-5 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-white bg-[#EF4444] hover:bg-[#DC2626] transition-all"
            >
              Confirm Logout
            </button>
            <button
              onClick={() => setConfirmSignOut(false)}
              className="px-5 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-[#6B5560] border border-[#1E1E3A] hover:bg-white/5 transition-all"
            >
              Cancel
            </button>
          </motion.div>
        )}
      </section>
    </motion.div>
  );
};

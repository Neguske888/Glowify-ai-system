// src/components/views/SettingsView.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Key, Store, Mail, Cpu, Eye, EyeOff, CheckCircle, AlertCircle, Save, User, Lock, Zap } from 'lucide-react';
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
}

const ApiKeyField: React.FC<ApiKeyFieldProps> = ({
  label, description, placeholder, value, onChange, icon, accentColor, docsUrl,
}) => {
  const [show, setShow] = useState(false);

  return (
    <div className="bg-[#0F0F1E] border border-[#1E1E3A] rounded-2xl p-5 hover:border-[#2A2A48] transition-all">
      <div className="flex items-start gap-3 mb-4">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: `${accentColor}15`, border: `1px solid ${accentColor}25` }}
        >
          <span style={{ color: accentColor }}>{icon}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-bold text-[#F1F1F8]">{label}</p>
            {value && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20">
                Connected
              </span>
            )}
          </div>
          <p className="text-xs text-[#6B6B88] mt-0.5 leading-relaxed">{description}</p>
          {docsUrl && (
            <a
              href={docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-[#6366F1] hover:underline mt-1 inline-block"
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
          className="w-full bg-[#07070F] border border-[#1E1E3A] rounded-xl px-4 py-3 pr-11
            text-sm text-[#F1F1F8] placeholder:text-[#3D3D55] font-mono
            focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1]/20
            transition-all"
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#3D3D55] hover:text-[#6B6B88] transition-colors"
        >
          {show ? <EyeOff size={15} /> : <Eye size={15} />}
        </button>
      </div>
    </div>
  );
};

export const SettingsView: React.FC = () => {
  const { user, profile, refreshProfile, signOut } = useAuth();

  // Profile state
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [storeName, setStoreName] = useState('');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
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

  // UI state
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [saveMessage, setSaveMessage] = useState('');
  const [confirmSignOut, setConfirmSignOut] = useState(false);

  // Load profile data on mount
  useEffect(() => {
    if (!user) return;
    firestoreHelpers.getProfile(user.uid).then((p: any) => {
      if (p?.storeName) setStoreName(p.storeName);
      if (p?.displayName) setDisplayName(p.displayName);
      setShopifyApiKey(p?.shopifyApiKey || '');
      setShopifyStoreDomain(p?.shopifyStoreDomain || '');
      setKlaviyoApiKey(p?.klaviyoApiKey || '');
      setGeminiApiKey(p?.geminiApiKey || '');
    });
  }, [user]);

  // Check if password already linked
  useEffect(() => {
    if (user?.providerData.some(p => p.providerId === 'password')) {
      setPasswordAlreadySet(true);
    }
  }, [user]);

  // Task 5.1 - Save Profile
  const handleSaveProfile = async () => {
    if (!user) return;
    setSavingProfile(true);
    try {
      await updateProfile(user, { displayName });
      await setDoc(doc(db, 'users', user.uid), { displayName, storeName, updatedAt: serverTimestamp() }, { merge: true });
      setSavedProfile(true);
      setTimeout(() => setSavedProfile(false), 3000);
    } catch (err: any) {
      console.error('Profile save failed:', err);
    } finally {
      setSavingProfile(false);
    }
  };

  // Task 5.2 - Set/Change Password
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
      setPwdResult({ type: 'success', msg: passwordAlreadySet ? 'Password updated successfully.' : 'Password set. You can now also sign in with email + password.' });
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      const msg = err.code === 'auth/requires-recent-login'
        ? 'Please sign out and sign in again before changing your password.'
        : err.code === 'auth/credential-already-in-use'
          ? 'This email is already linked to another account.'
          : err.message || 'Failed to set password.';
      setPwdResult({ type: 'error', msg });
    } finally {
      setSavingPwd(false);
    }
  };

  // Save API Keys
  const handleSaveApiKeys = async () => {
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

  const initials = displayName
    ? displayName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
    : user?.email?.[0]?.toUpperCase() || '?';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-8 pb-8"
    >
      {/* Task 5.1 - Profile Section */}
      <div className="bg-[#0F0F1E] border border-[#1E1E3A] rounded-2xl overflow-hidden">
        <div className="flex items-center gap-4 px-6 py-5 border-b border-[#1E1E3A]">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#6366F1]/10 border border-[#6366F1]/20">
            <User size={20} className="text-[#6366F1]" />
          </div>
          <div>
            <h3 className="text-[15px] font-bold text-[#F1F1F8]">Profile</h3>
            <p className="text-xs text-[#6B6B88] mt-0.5">Your name, store, and avatar</p>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center font-black text-white text-xl shadow-xl">
              {photoURL
                ? <img src={photoURL} alt="avatar" className="w-full h-full object-cover" />
                : <span>{initials}</span>
              }
            </div>
            <div>
              <p className="text-[13px] font-bold text-[#F1F1F8]">{user?.email}</p>
              <p className="text-[11px] text-[#6B6B88] mt-0.5">Google account — avatar from Google profile</p>
            </div>
          </div>
          <div>
            <label className="text-[11px] font-bold text-[#6B6B88] uppercase tracking-wider block mb-1.5">Display Name</label>
            <input
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
              placeholder="Your full name"
              className="w-full bg-[#07070F] border border-[#1E1E3A] rounded-xl px-4 py-3 text-sm text-[#F1F1F8] placeholder:text-[#3D3D55] focus:outline-none focus:border-[#6366F1] transition-all"
            />
          </div>
          <div>
            <label className="text-[11px] font-bold text-[#6B6B88] uppercase tracking-wider block mb-1.5">Store Name</label>
            <input
              value={storeName}
              onChange={e => setStoreName(e.target.value)}
              placeholder="e.g. Glow Beauty Co."
              className="w-full bg-[#07070F] border border-[#1E1E3A] rounded-xl px-4 py-3 text-sm text-[#F1F1F8] placeholder:text-[#3D3D55] focus:outline-none focus:border-[#6366F1] transition-all"
            />
          </div>
          <button
            onClick={handleSaveProfile}
            disabled={savingProfile}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all"
            style={{
              background: savedProfile ? 'rgba(16,185,129,0.1)' : 'linear-gradient(135deg,#6366F1,#8B5CF6)',
              color: savedProfile ? '#10B981' : 'white',
              border: savedProfile ? '1px solid rgba(16,185,129,0.3)' : 'none',
              boxShadow: savedProfile ? 'none' : '0 4px 14px rgba(99,102,241,0.35)',
            }}
          >
            {savingProfile ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : savedProfile ? '✓ Saved' : 'Save Profile'}
          </button>
        </div>
      </div>

      {/* Task 5.2 - Password Section */}
      <div className="bg-[#0F0F1E] border border-[#1E1E3A] rounded-2xl overflow-hidden">
        <div className="flex items-center gap-4 px-6 py-5 border-b border-[#1E1E3A]">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#6366F1]/10 border border-[#6366F1]/20">
            <Lock size={20} className="text-[#6366F1]" />
          </div>
          <div>
            <h3 className="text-[15px] font-bold text-[#F1F1F8]">Password</h3>
            <p className="text-xs text-[#6B6B88] mt-0.5">Set or change your sign-in password</p>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="text-[11px] font-bold text-[#6B6B88] uppercase tracking-wider block mb-1.5">New Password</label>
            <div className="relative">
              <input
                type={showNewPwd ? 'text' : 'password'}
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="w-full bg-[#07070F] border border-[#1E1E3A] rounded-xl px-4 py-3 pr-10 text-sm text-[#F1F1F8] placeholder:text-[#3D3D55] focus:outline-none focus:border-[#6366F1] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowNewPwd(!showNewPwd)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#3D3D55] hover:text-[#6B6B88]"
              >
                {showNewPwd ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <div>
            <label className="text-[11px] font-bold text-[#6B6B88] uppercase tracking-wider block mb-1.5">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfPwd ? 'text' : 'password'}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                className="w-full bg-[#07070F] border border-[#1E1E3A] rounded-xl px-4 py-3 pr-10 text-sm text-[#F1F1F8] placeholder:text-[#3D3D55] focus:outline-none focus:border-[#6366F1] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowConfPwd(!showConfPwd)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#3D3D55] hover:text-[#6B6B88]"
              >
                {showConfPwd ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          {pwdResult && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-3 rounded-lg text-sm font-medium flex items-center gap-2 ${
                pwdResult.type === 'success'
                  ? 'bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20'
                  : 'bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/20'
              }`}
            >
              {pwdResult.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
              {pwdResult.msg}
            </motion.div>
          )}
          <button
            onClick={handleSetPassword}
            disabled={savingPwd}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all"
            style={{
              background: savingPwd ? '#2A2A48' : 'linear-gradient(135deg,#6366F1,#8B5CF6)',
              boxShadow: savingPwd ? 'none' : '0 4px 14px rgba(99,102,241,0.35)',
              cursor: savingPwd ? 'not-allowed' : 'pointer',
            }}
          >
            {savingPwd ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Set Password'}
          </button>
        </div>
      </div>

      {/* Task 5.3 - API Keys Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Key size={16} className="text-[#6366F1]" />
          <h2 className="text-sm font-bold text-[#F1F1F8] uppercase tracking-widest">API Integrations</h2>
        </div>
        <p className="text-xs text-[#6B6B88] mb-5 leading-relaxed">
          Your API keys are stored securely in Firestore and are only accessible to your account.
          They are never logged or shared.
        </p>

        <div className="space-y-4">
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

          <div className="bg-[#0F0F1E] border border-[#1E1E3A] rounded-2xl p-5 hover:border-[#2A2A48] transition-all">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-[#10B981]/10 border border-[#10B981]/20">
                <Store size={16} className="text-[#10B981]" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#F1F1F8]">Shopify Store Domain</p>
                <p className="text-xs text-[#6B6B88] mt-0.5">Your myshopify.com subdomain (without https://).</p>
              </div>
            </div>
            <input
              type="text"
              placeholder="your-store.myshopify.com"
              value={shopifyStoreDomain}
              onChange={e => setShopifyStoreDomain(e.target.value)}
              className="w-full bg-[#07070F] border border-[#1E1E3A] rounded-xl px-4 py-3
                text-sm text-[#F1F1F8] placeholder:text-[#3D3D55]
                focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1]/20
                transition-all"
            />
          </div>

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

          <ApiKeyField
            label="Google Gemini API Key"
            description="Powers the AI Agents, product descriptions, and marketing copy generation features."
            placeholder="AIzaSy..."
            value={geminiApiKey}
            onChange={setGeminiApiKey}
            icon={<Cpu size={16} />}
            accentColor="#6366F1"
            docsUrl="https://aistudio.google.com/app/apikey"
          />
        </div>

        <div className="flex items-center gap-4 mt-6">
          <button
            onClick={handleSaveApiKeys}
            disabled={saving}
            className="flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all"
            style={{
              background: saving ? '#2A2A48' : 'linear-gradient(135deg, #6366F1, #8B5CF6)',
              boxShadow: saving ? 'none' : '0 4px 20px rgba(99,102,241,0.35)',
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
      </div>

      {/* Integration status overview */}
      <div className="bg-[#0F0F1E] border border-[#1E1E3A] rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Zap size={16} className="text-[#6366F1]" />
          <h2 className="text-sm font-bold text-[#F1F1F8] uppercase tracking-widest">Integration Status</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { label: 'Shopify', connected: !!(shopifyApiKey && shopifyStoreDomain), color: '#10B981' },
            { label: 'Klaviyo', connected: !!klaviyoApiKey, color: '#3B82F6' },
            { label: 'Gemini AI', connected: !!geminiApiKey, color: '#6366F1' },
          ].map(({ label, connected, color }) => (
            <div
              key={label}
              className="flex items-center gap-3 p-3 rounded-xl border"
              style={{
                background: connected ? `${color}08` : '#07070F',
                borderColor: connected ? `${color}25` : '#1E1E3A',
              }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: connected ? color : '#3D3D55' }}
              />
              <span className="text-sm font-medium text-[#F1F1F8]">{label}</span>
              <span
                className="ml-auto text-[10px] font-bold uppercase tracking-wider"
                style={{ color: connected ? color : '#3D3D55' }}
              >
                {connected ? 'Connected' : 'Not set'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Task 5.4 - Sign Out Section */}
      <div className="bg-[#EF4444]/4 border border-[#EF4444]/15 rounded-2xl p-6">
        <h3 className="text-[15px] font-bold text-[#EF4444] mb-1">Sign Out</h3>
        <p className="text-[12px] text-[#6B6B88] mb-4">You will be returned to the login screen.</p>
        {!confirmSignOut ? (
          <button
            onClick={() => setConfirmSignOut(true)}
            className="px-5 py-2.5 rounded-xl text-sm font-bold text-[#EF4444] border border-[#EF4444]/30 hover:bg-[#EF4444]/10 transition-all"
          >
            Sign Out
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <span className="text-[12px] text-[#F1F1F8]">Are you sure?</span>
            <button
              onClick={async () => { await signOut(); }}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#EF4444] hover:bg-[#DC2626] transition-all"
            >
              Yes, sign out
            </button>
            <button
              onClick={() => setConfirmSignOut(false)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-[#6B6B88] border border-[#1E1E3A] hover:bg-white/5 transition-all"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

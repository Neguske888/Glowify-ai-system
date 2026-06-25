import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, CheckCircle, AlertCircle, Zap, TrendingUp, Package, Mail, Trash2 } from 'lucide-react';

interface Notification {
  id: string;
  type: 'revenue' | 'inventory' | 'automation' | 'integration' | 'team' | 'recommendation';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  action?: { label: string; onClick: () => void };
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    type: 'revenue',
    title: 'Revenue Alert',
    message: 'Revenue increased 14% today. Highest daily sales in 30 days.',
    timestamp: '5 mins ago',
    read: false,
    action: { label: 'View Dashboard', onClick: () => {} }
  },
  {
    id: 'n2',
    type: 'inventory',
    title: 'Stock Alert',
    message: 'Vitamin C Serum inventory will run out in 4 days at current velocity.',
    timestamp: '1 hour ago',
    read: false,
    action: { label: 'Create PO', onClick: () => {} }
  },
  {
    id: 'n3',
    type: 'automation',
    title: 'Automation Success',
    message: 'Cart Recovery Flow executed 47 times, generating $2,100 in revenue.',
    timestamp: '3 hours ago',
    read: true
  },
  {
    id: 'n4',
    type: 'recommendation',
    title: 'AI Recommendation',
    message: 'Reallocate $500 from TikTok to Meta for 0.4x ROAS improvement.',
    timestamp: '6 hours ago',
    read: true,
    action: { label: 'Apply', onClick: () => {} }
  },
];

export const NotificationCenter: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const unreadCount = notifications.filter(n => !n.read).length;
  const filteredNotifications = filter === 'unread' ? notifications.filter(n => !n.read) : notifications;

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'revenue': return <TrendingUp size={18} className="text-emerald-500" />;
      case 'inventory': return <Package size={18} className="text-amber-500" />;
      case 'automation': return <Zap size={18} className="text-purple-500" />;
      case 'integration': return <AlertCircle size={18} className="text-red-500" />;
      case 'team': return <Mail size={18} className="text-blue-500" />;
      case 'recommendation': return <CheckCircle size={18} className="text-indigo-500" />;
      default: return <Bell size={18} />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[300] flex items-start justify-end pt-20">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={onClose}
            className="fixed inset-0" 
          />
          <motion.div 
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            className="relative w-full max-w-[420px] h-[85vh] bg-[#0D0D1A] border border-[#1E1E3A] rounded-l-[24px] shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-6 border-b border-[#1E1E3A]">
              <div>
                <h3 className="text-lg font-black text-white tracking-tight">Notifications</h3>
                {unreadCount > 0 && (
                  <p className="text-[10px] font-bold text-[#C9747A] uppercase tracking-widest mt-1">{unreadCount} Unread</p>
                )}
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#6B5560] hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 px-6 py-4 border-b border-[#1E1E3A] bg-white/[0.02]">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                  filter === 'all' 
                    ? 'bg-[#C9747A] text-white' 
                    : 'bg-white/5 text-[#6B5560] hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                  filter === 'unread' 
                    ? 'bg-[#C9747A] text-white' 
                    : 'bg-white/5 text-[#6B5560] hover:text-white'
                }`}
              >
                Unread
              </button>
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  className="ml-auto px-3 py-1.5 rounded-lg text-[10px] font-bold text-[#C9747A] hover:text-white transition-all"
                >
                  Mark all read
                </button>
              )}
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {filteredNotifications.length > 0 ? (
                <div className="divide-y divide-[#1E1E3A]">
                  {filteredNotifications.map((notif) => (
                    <motion.div
                      key={notif.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className={`p-4 hover:bg-white/[0.02] transition-colors cursor-pointer group ${!notif.read ? 'bg-white/[0.05]' : ''}`}
                      onClick={() => handleMarkAsRead(notif.id)}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 mt-1">
                          {getIcon(notif.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <h4 className="text-sm font-bold text-white">{notif.title}</h4>
                            <button
                              onClick={(e) => { e.stopPropagation(); handleDelete(notif.id); }}
                              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-[#6B5560] hover:text-white"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                          <p className="text-xs text-[#B09AA0] leading-relaxed mb-2">{notif.message}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-[#3D3D55] font-bold uppercase tracking-widest">{notif.timestamp}</span>
                            {notif.action && (
                              <button 
                                onClick={(e) => { e.stopPropagation(); notif.action?.onClick(); }}
                                className="text-[10px] font-black text-[#C9747A] hover:text-white transition-all uppercase tracking-widest"
                              >
                                {notif.action.label} →
                              </button>
                            )}
                          </div>
                        </div>
                        {!notif.read && (
                          <div className="w-2 h-2 rounded-full bg-[#C9747A] shrink-0 mt-2" />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full opacity-40 py-12">
                  <Bell size={40} className="mb-4" />
                  <p className="text-[11px] font-bold uppercase tracking-widest">
                    {filter === 'unread' ? 'No unread notifications' : 'No notifications'}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useRouter } from '../context/RouterContext';
import { formatZMW } from '../types/bakery';
import {
  X,
  Cake,
  MessageSquare,
  AlertOctagon,
  Settings,
  User as UserIcon,
  Clock,
  LogOut,
  LogIn,
  Phone,
  MessageCircle,
  Sun,
  Moon,
  Sparkles,
  Star,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Send,
  Truck
} from 'lucide-react';

interface SideDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

type SubModalType = 'feedback' | 'complaint' | 'settings' | 'history' | 'profile' | null;

export function SideDashboard({ isOpen, onClose }: SideDashboardProps) {
  const { user, isLoggedIn, logout, openAuthModal } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { items, total } = useCart();
  const router = useRouter();

  const [activeSubModal, setActiveSubModal] = useState<SubModalType>(null);

  // Feedback State
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [feedbackCategory, setFeedbackCategory] = useState('Cake Quality');
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  // Complaint State
  const [complaintOrderNum, setComplaintOrderNum] = useState('');
  const [complaintCategory, setComplaintCategory] = useState('Delivery Issue');
  const [complaintText, setComplaintText] = useState('');
  const [complaintSubmitted, setComplaintSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackSubmitted(true);
    setTimeout(() => {
      setFeedbackSubmitted(false);
      setActiveSubModal(null);
      setFeedbackText('');
    }, 2200);
  };

  const handleComplaintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setComplaintSubmitted(true);
    setTimeout(() => {
      setComplaintSubmitted(false);
      setActiveSubModal(null);
      setComplaintText('');
      setComplaintOrderNum('');
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-purple-950/60 dark:bg-black/70 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Drawer Container (Slides from left) */}
      <div className="fixed inset-y-0 left-0 max-w-sm w-full flex">
        <div className="w-full bg-white dark:bg-[#1A0B2E] text-purple-950 dark:text-purple-100 shadow-2xl flex flex-col border-r border-pink-100 dark:border-purple-800/60 animate-in slide-in-from-left duration-300">
          {/* Drawer Header */}
          <div className="p-5 border-b border-purple-100 dark:border-purple-800/60 flex items-center justify-between bg-purple-50/60 dark:bg-purple-950/40">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-800 via-purple-700 to-pink-500 flex items-center justify-center text-white shadow-md">
                <Cake className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg font-bold text-purple-950 dark:text-white leading-none">
                  Cake Elegancy
                </span>
                <span className="text-[11px] text-pink-600 dark:text-pink-400 font-serif italic mt-0.5">
                  Hellen's cakery paradise
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Quick Dark Mode toggle in drawer */}
              <button
                type="button"
                onClick={toggleTheme}
                className="p-2 rounded-full text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors"
                title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-purple-600" />}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-full text-purple-400 hover:text-purple-700 dark:hover:text-white hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* User Account Banner */}
          <div className="p-4 bg-gradient-to-r from-purple-900 via-purple-800 to-pink-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold text-pink-200">
                {isLoggedIn && user ? user.name.charAt(0).toUpperCase() : <UserIcon className="w-4 h-4" />}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold truncate">
                  {isLoggedIn && user ? user.name : 'Welcome, Guest!'}
                </div>
                <div className="text-[10px] text-purple-200 truncate">
                  {isLoggedIn && user ? user.email : 'Log in to place orders with 20% off'}
                </div>
              </div>
            </div>

            {!isLoggedIn && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  openAuthModal('login');
                }}
                className="px-3 py-1 rounded-full bg-pink-500 hover:bg-pink-600 text-white text-[11px] font-bold shadow-xs transition-colors shrink-0"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Main Menu Items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-1.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-purple-400 dark:text-purple-400/80 px-3 pt-2">
              Customer Services
            </p>

            {/* 1. Give Feedback */}
            <button
              type="button"
              onClick={() => setActiveSubModal('feedback')}
              className="w-full flex items-center justify-between p-3 rounded-2xl text-xs font-semibold text-purple-900 dark:text-purple-100 hover:bg-purple-50 dark:hover:bg-purple-900/40 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-pink-100 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="block font-bold">Give Feedback</span>
                  <span className="text-[10px] text-purple-500 dark:text-purple-400 font-normal">
                    Share your experience with Hellen
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-purple-300 dark:text-purple-600" />
            </button>

            {/* 2. Log a Complaint */}
            <button
              type="button"
              onClick={() => setActiveSubModal('complaint')}
              className="w-full flex items-center justify-between p-3 rounded-2xl text-xs font-semibold text-purple-900 dark:text-purple-100 hover:bg-purple-50 dark:hover:bg-purple-900/40 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <AlertOctagon className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="block font-bold">Log a Complaint</span>
                  <span className="text-[10px] text-purple-500 dark:text-purple-400 font-normal">
                    Report an issue with an order
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-purple-300 dark:text-purple-600" />
            </button>

            {/* 3. Settings */}
            <button
              type="button"
              onClick={() => setActiveSubModal('settings')}
              className="w-full flex items-center justify-between p-3 rounded-2xl text-xs font-semibold text-purple-900 dark:text-purple-100 hover:bg-purple-50 dark:hover:bg-purple-900/40 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Settings className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="block font-bold">Settings</span>
                  <span className="text-[10px] text-purple-500 dark:text-purple-400 font-normal">
                    Theme mode, currency, preferences
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-purple-300 dark:text-purple-600" />
            </button>

            <p className="text-[10px] font-bold uppercase tracking-wider text-purple-400 dark:text-purple-400/80 px-3 pt-3">
              Account & Activity
            </p>

            {/* 4. My Account / Profile */}
            <button
              type="button"
              onClick={() => {
                if (isLoggedIn) {
                  setActiveSubModal('profile');
                } else {
                  onClose();
                  openAuthModal('login');
                }
              }}
              className="w-full flex items-center justify-between p-3 rounded-2xl text-xs font-semibold text-purple-900 dark:text-purple-100 hover:bg-purple-50 dark:hover:bg-purple-900/40 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-pink-100 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <UserIcon className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="block font-bold">My Account / Profile</span>
                  <span className="text-[10px] text-purple-500 dark:text-purple-400 font-normal">
                    {isLoggedIn ? user?.name : 'Log in or Register'}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-purple-300 dark:text-purple-600" />
            </button>

            {/* 5. Order History */}
            <button
              type="button"
              onClick={() => setActiveSubModal('history')}
              className="w-full flex items-center justify-between p-3 rounded-2xl text-xs font-semibold text-purple-900 dark:text-purple-100 hover:bg-purple-50 dark:hover:bg-purple-900/40 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="block font-bold">Order History</span>
                  <span className="text-[10px] text-purple-500 dark:text-purple-400 font-normal">
                    View previous bakes & status
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-purple-300 dark:text-purple-600" />
            </button>

            {/* 6. Logout / Login */}
            {isLoggedIn ? (
              <button
                type="button"
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="w-full flex items-center gap-3 p-3 rounded-2xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
              >
                <div className="w-8 h-8 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center">
                  <LogOut className="w-4 h-4" />
                </div>
                <span>Log Out of Cake Elegancy</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  openAuthModal('login');
                }}
                className="w-full flex items-center gap-3 p-3 rounded-2xl text-xs font-semibold text-purple-900 dark:text-purple-200 hover:bg-purple-50 dark:hover:bg-purple-900/40 transition-colors"
              >
                <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 flex items-center justify-center">
                  <LogIn className="w-4 h-4" />
                </div>
                <span>Log In / Sign Up</span>
              </button>
            )}
          </div>

          {/* Drawer Footer: Official Contact Numbers & Socials */}
          <div className="p-4 border-t border-purple-100 dark:border-purple-800/60 bg-purple-50/50 dark:bg-[#150726] space-y-3">
            <div>
              <p className="text-[10px] uppercase font-bold text-purple-500 dark:text-purple-400 tracking-wider mb-1.5 flex items-center gap-1">
                <Phone className="w-3 h-3 text-pink-600" />
                Direct Order Phone Lines:
              </p>
              <div className="space-y-1 text-xs">
                <a
                  href="tel:+260971603384"
                  className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-purple-950/50 border border-purple-200/60 dark:border-purple-800/60 hover:border-pink-300 transition-colors"
                >
                  <span className="font-bold text-purple-950 dark:text-purple-100">+260 971 603 384</span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">Calls + WhatsApp</span>
                </a>
                <a
                  href="tel:+260957784048"
                  className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-purple-950/50 border border-purple-200/60 dark:border-purple-800/60 hover:border-pink-300 transition-colors"
                >
                  <span className="font-bold text-purple-950 dark:text-purple-100">+260 957 784 048</span>
                  <span className="text-[10px] text-purple-500 dark:text-purple-400 font-semibold">Calls only</span>
                </a>
              </div>
            </div>

            {/* Social Media Links */}
            <div>
              <p className="text-[10px] uppercase font-bold text-purple-500 dark:text-purple-400 tracking-wider mb-1.5">
                Socials & Inquiries:
              </p>
              <div className="flex gap-2">
                <a
                  href="https://wa.me/260971603384"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 p-2 rounded-xl bg-emerald-600/10 dark:bg-emerald-950/40 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold flex items-center justify-center gap-1 hover:bg-emerald-600 hover:text-white transition-all"
                  title="WhatsApp"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href="#"
                  className="flex-1 p-2 rounded-xl bg-pink-600/10 dark:bg-pink-950/40 border border-pink-500/30 text-pink-700 dark:text-pink-300 text-[11px] font-bold flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all"
                >
                  Instagram
                </a>
                <a
                  href="#"
                  className="flex-1 p-2 rounded-xl bg-blue-600/10 dark:bg-blue-950/40 border border-blue-500/30 text-blue-700 dark:text-blue-300 text-[11px] font-bold flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"
                >
                  Facebook
                </a>
                <a
                  href="#"
                  className="p-2 rounded-xl bg-purple-600/10 dark:bg-purple-950/40 border border-purple-500/30 text-purple-700 dark:text-purple-300 text-[11px] font-bold flex items-center justify-center hover:bg-purple-700 hover:text-white transition-all"
                >
                  TikTok
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-modals for Feedback, Complaint, Settings, History, Profile */}
      {activeSubModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setActiveSubModal(null)}
          />

          <div className="relative bg-white dark:bg-[#200D39] text-purple-950 dark:text-purple-100 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-pink-100 dark:border-purple-800 z-10 animate-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setActiveSubModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-purple-400 hover:text-purple-800 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {/* 1. GIVE FEEDBACK MODAL */}
            {activeSubModal === 'feedback' && (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-2xl bg-pink-100 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 flex items-center justify-center mx-auto mb-2">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-bold">Give Feedback to Hellen</h3>
                  <p className="text-xs text-purple-700 dark:text-purple-300 mt-1">
                    Your feedback helps us continuously perfect our celebration bakes.
                  </p>
                </div>

                {feedbackSubmitted ? (
                  <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-center space-y-2">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                    <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                      Thank you for your sweet feedback!
                    </p>
                    <p className="text-[11px] text-emerald-700 dark:text-emerald-400">
                      Hellen personally reviews customer thoughts to keep every bake exceptional.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleFeedbackSubmit} className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold mb-1">Rate Your Experience:</label>
                      <div className="flex gap-2 justify-center py-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setFeedbackRating(star)}
                            className="p-1 transition-transform hover:scale-110"
                          >
                            <Star
                              className={`w-6 h-6 ${
                                star <= feedbackRating
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-purple-300 dark:text-purple-700'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-1">Category:</label>
                      <select
                        value={feedbackCategory}
                        onChange={(e) => setFeedbackCategory(e.target.value)}
                        className="w-full bg-purple-50/70 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-pink-500"
                      >
                        <option>Cake Quality & Freshness</option>
                        <option>Packaging & Presentation</option>
                        <option>Delivery Speed (Yango/Platinum)</option>
                        <option>Customer Communication</option>
                        <option>Other Suggestions</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-1">Comments:</label>
                      <textarea
                        required
                        rows={3}
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                        placeholder="Tell Hellen what you loved or how we can improve..."
                        className="w-full bg-purple-50/70 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 rounded-xl p-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-pink-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-800 to-pink-600 text-white font-bold text-xs shadow-md hover:brightness-105 transition-all flex items-center justify-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Feedback</span>
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* 2. LOG A COMPLAINT MODAL */}
            {activeSubModal === 'complaint' && (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 flex items-center justify-center mx-auto mb-2">
                    <AlertOctagon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-bold">Log an Order Issue</h3>
                  <p className="text-xs text-purple-700 dark:text-purple-300 mt-1">
                    We treat every order with highest priority and resolve issues promptly.
                  </p>
                </div>

                {complaintSubmitted ? (
                  <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-center space-y-2">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                    <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                      Issue Logged Successfully
                    </p>
                    <p className="text-[11px] text-emerald-700 dark:text-emerald-400">
                      Reference created. Hellen will call or WhatsApp you directly to rectify your order.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleComplaintSubmit} className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold mb-1">Order Reference (Optional):</label>
                      <input
                        type="text"
                        value={complaintOrderNum}
                        onChange={(e) => setComplaintOrderNum(e.target.value)}
                        placeholder="e.g. CE-82914 or your phone number"
                        className="w-full bg-purple-50/70 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-pink-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-1">Issue Type:</label>
                      <select
                        value={complaintCategory}
                        onChange={(e) => setComplaintCategory(e.target.value)}
                        className="w-full bg-purple-50/70 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-pink-500"
                      >
                        <option>Delivery Delay (Yango / Platinum)</option>
                        <option>Packaging or Handling Concern</option>
                        <option>Custom Inscription Mismatch</option>
                        <option>Item Missing from Package</option>
                        <option>Other Inquiry</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-1">Describe the problem:</label>
                      <textarea
                        required
                        rows={3}
                        value={complaintText}
                        onChange={(e) => setComplaintText(e.target.value)}
                        placeholder="Please give details so we can assist immediately..."
                        className="w-full bg-purple-50/70 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 rounded-xl p-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-pink-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-purple-900 hover:bg-purple-950 text-white font-bold text-xs shadow-md transition-all"
                    >
                      Log Issue & Request Call Back
                    </button>

                    <div className="pt-2 text-center">
                      <a
                        href="https://wa.me/260971603384?text=Hello%20Hellen,%20I%20have%20an%20urgent%20complaint%20regarding%20my%20order."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-emerald-600 dark:text-emerald-400 font-bold hover:underline inline-flex items-center gap-1"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Escalate urgently to WhatsApp (+260 971 603 384)</span>
                      </a>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* 3. SETTINGS MODAL */}
            {activeSubModal === 'settings' && (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 flex items-center justify-center mx-auto mb-2">
                    <Settings className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-bold">Bakery App Settings</h3>
                </div>

                <div className="space-y-3 text-xs">
                  {/* Dark Mode Row */}
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200/70 dark:border-purple-800">
                    <div className="flex items-center gap-2.5">
                      {isDark ? <Moon className="w-4 h-4 text-purple-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
                      <div>
                        <div className="font-bold">Dark Appearance</div>
                        <div className="text-[10px] text-purple-500 dark:text-purple-400">
                          {isDark ? 'Royal purple night mode enabled' : 'Soft daylight mode enabled'}
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={toggleTheme}
                      className="px-3 py-1 rounded-full text-xs font-bold bg-purple-900 text-white dark:bg-pink-600 transition-colors"
                    >
                      {isDark ? 'Switch to Light' : 'Switch to Dark'}
                    </button>
                  </div>

                  {/* Currency Row */}
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200/70 dark:border-purple-800">
                    <div>
                      <div className="font-bold">Store Currency</div>
                      <div className="text-[10px] text-purple-500 dark:text-purple-400">
                        Zambian Kwacha (ZMW)
                      </div>
                    </div>
                    <span className="font-mono font-bold text-pink-600 bg-pink-100 dark:bg-pink-950 px-2 py-0.5 rounded-lg">
                      ZMW (K)
                    </span>
                  </div>

                  {/* Delivery notification preference */}
                  <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200/70 dark:border-purple-800 space-y-1">
                    <div className="font-bold flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-pink-500" />
                      <span>Fulfillment Partners</span>
                    </div>
                    <p className="text-[11px] text-purple-700 dark:text-purple-300">
                      Standard delivery dispatch: Yango Deli (Lusaka) & Platinum Carrier (Country-wide Zambia).
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveSubModal(null)}
                  className="w-full py-2.5 rounded-xl bg-purple-900 text-white font-bold text-xs"
                >
                  Done
                </button>
              </div>
            )}

            {/* 4. PROFILE MODAL */}
            {activeSubModal === 'profile' && (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-2xl bg-pink-100 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 flex items-center justify-center mx-auto mb-2">
                    <UserIcon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-bold">Customer Profile</h3>
                  <p className="text-xs text-purple-600 dark:text-purple-400">
                    Your Cake Elegancy order identity
                  </p>
                </div>

                <div className="space-y-2 text-xs bg-purple-50 dark:bg-purple-950/50 p-4 rounded-2xl border border-purple-200 dark:border-purple-800">
                  <div className="flex justify-between py-1 border-b border-purple-100 dark:border-purple-800">
                    <span className="text-purple-500 dark:text-purple-400 font-medium">Name:</span>
                    <span className="font-bold">{user?.name}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-purple-100 dark:border-purple-800">
                    <span className="text-purple-500 dark:text-purple-400 font-medium">Email:</span>
                    <span className="font-semibold">{user?.email}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-purple-100 dark:border-purple-800">
                    <span className="text-purple-500 dark:text-purple-400 font-medium">Phone:</span>
                    <span className="font-semibold">{user?.phone || '+260 971 603 384'}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-purple-500 dark:text-purple-400 font-medium">Discount Level:</span>
                    <span className="font-bold text-pink-600">20% Website Discount Active</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setActiveSubModal(null);
                    }}
                    className="flex-1 py-2.5 rounded-xl border border-rose-300 text-rose-600 dark:text-rose-400 font-bold text-xs hover:bg-rose-50"
                  >
                    Log Out
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveSubModal(null)}
                    className="flex-1 py-2.5 rounded-xl bg-purple-900 text-white font-bold text-xs"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            {/* 5. ORDER HISTORY MODAL */}
            {activeSubModal === 'history' && (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 flex items-center justify-center mx-auto mb-2">
                    <Clock className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-bold">Order History</h3>
                  <p className="text-xs text-purple-600 dark:text-purple-400">
                    Your recent bespoke bakery orders
                  </p>
                </div>

                <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                  {/* Current In-Cart Summary */}
                  {items.length > 0 && (
                    <div className="p-3 rounded-2xl bg-pink-50 dark:bg-pink-950/40 border border-pink-200 dark:border-pink-800 text-xs space-y-1">
                      <div className="flex justify-between font-bold text-pink-800 dark:text-pink-300">
                        <span>Current Basket (Pending Checkout):</span>
                        <span>{formatZMW(total)}</span>
                      </div>
                      <p className="text-[11px] text-purple-700 dark:text-purple-300">
                        {items.length} unique bake(s) waiting in your cart with 20% discount applied.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveSubModal(null);
                          onClose();
                          router.push('/cart');
                        }}
                        className="text-pink-600 font-bold underline text-[11px] block mt-1"
                      >
                        Proceed to Checkout →
                      </button>
                    </div>
                  )}

                  {/* Sample Past Orders */}
                  {[
                    {
                      orderId: 'CE-94021',
                      item: 'Velvet Lavender Berry Cake (8-inch)',
                      date: '14 Oct 2026',
                      amount: 560.0,
                      carrier: 'Yango Deli',
                      status: 'Delivered',
                    },
                    {
                      orderId: 'CE-91823',
                      item: 'Blueberry Lemon Glazed Scones (12 pcs)',
                      date: '28 Sep 2026',
                      amount: 420.0,
                      carrier: 'Platinum Carrier (Ndola)',
                      status: 'Delivered',
                    },
                  ].map((ord) => (
                    <div
                      key={ord.orderId}
                      className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800/80 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-purple-950 dark:text-white font-mono">{ord.orderId}</span>
                        <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold px-2 py-0.5 rounded-full">
                          {ord.status}
                        </span>
                      </div>
                      <div className="text-[11px] font-medium text-purple-900 dark:text-purple-200 truncate">
                        {ord.item}
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-purple-500 dark:text-purple-400 pt-1 border-t border-purple-100 dark:border-purple-800/60">
                        <span>{ord.date} • {ord.carrier}</span>
                        <span className="font-bold text-purple-950 dark:text-white">{formatZMW(ord.amount)}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setActiveSubModal(null)}
                  className="w-full py-2.5 rounded-xl bg-purple-900 text-white font-bold text-xs"
                >
                  Close History
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

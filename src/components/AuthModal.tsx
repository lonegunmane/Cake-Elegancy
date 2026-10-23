import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Lock, Mail, User as UserIcon, Phone, Sparkles, Check, ArrowRight } from 'lucide-react';

export function AuthModal() {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalMode,
    setAuthModalMode,
    login,
    signup,
  } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }

    if (authModalMode === 'login') {
      login(email, password);
    } else {
      if (!name.trim()) {
        setError('Please enter your full name.');
        return;
      }
      signup(name, email, phone || '+260 971 603 384', password);
    }
  };

  const handleQuickDemoLogin = (demoEmail: string) => {
    login(demoEmail);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-purple-950/60 backdrop-blur-xs transition-opacity"
        onClick={closeAuthModal}
      />

      <div className="relative bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 overflow-hidden shadow-2xl border border-pink-100 z-10 animate-in zoom-in-95 duration-200">
        <button
          type="button"
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-2 rounded-full text-purple-400 hover:text-purple-700 hover:bg-purple-50 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-700 to-pink-500 text-white flex items-center justify-center mx-auto shadow-md">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-purple-950">
            {authModalMode === 'login' ? 'Welcome Back' : 'Create an Account'}
          </h3>
          <p className="text-xs text-purple-800/70 max-w-xs mx-auto">
            {authModalMode === 'login'
              ? 'Log in to place your order with Cake Elegancy and receive your automatic 20% website discount.'
              : 'Sign up to complete your bakery order and enjoy 20% off all website purchases.'}
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex bg-purple-50/80 p-1 rounded-2xl border border-purple-100 mb-5">
          <button
            type="button"
            onClick={() => {
              setAuthModalMode('login');
              setError('');
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              authModalMode === 'login'
                ? 'bg-purple-900 text-white shadow-xs'
                : 'text-purple-700 hover:text-purple-950'
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthModalMode('signup');
              setError('');
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              authModalMode === 'signup'
                ? 'bg-purple-900 text-white shadow-xs'
                : 'text-purple-700 hover:text-purple-950'
            }`}
          >
            Create Account
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {authModalMode === 'signup' && (
            <div>
              <label className="block text-xs font-bold text-purple-950 mb-1">
                Your Full Name:
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Chola Mwansa"
                  className="w-full bg-purple-50/50 border border-purple-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-purple-950 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-purple-950 mb-1">
              Email Address:
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full bg-purple-50/50 border border-purple-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-purple-950 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </div>

          {authModalMode === 'signup' && (
            <div>
              <label className="block text-xs font-bold text-purple-950 mb-1">
                WhatsApp / Phone Number:
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+260 971 603 384"
                  className="w-full bg-purple-50/50 border border-purple-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-purple-950 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-purple-950 mb-1">
              Password:
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-purple-50/50 border border-purple-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-purple-950 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-800 to-pink-600 hover:from-purple-900 hover:to-pink-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-98 flex items-center justify-center gap-2"
          >
            <span>{authModalMode === 'login' ? 'Log In & Continue' : 'Create Account & Continue'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Fast Login shortcuts */}
        <div className="mt-5 pt-4 border-t border-purple-100 text-center">
          <p className="text-[11px] text-purple-400 font-medium mb-2">
            Quick demo login (1-click):
          </p>
          <div className="flex gap-2 justify-center">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('customer@example.com')}
              className="bg-purple-100/70 hover:bg-pink-100 text-purple-900 text-xs px-3 py-1.5 rounded-xl font-medium transition-colors"
            >
              Demo Customer
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('hellen@cakeelegancy.com')}
              className="bg-purple-100/70 hover:bg-pink-100 text-purple-900 text-xs px-3 py-1.5 rounded-xl font-medium transition-colors"
            >
              Hellen (Bakery Admin)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

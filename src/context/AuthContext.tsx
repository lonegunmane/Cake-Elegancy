import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types/bakery';

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password?: string) => boolean;
  signup: (name: string, email: string, phone: string, password?: string) => boolean;
  logout: () => void;
  isAuthModalOpen: boolean;
  openAuthModal: (mode?: 'login' | 'signup', onAuthSuccessCallback?: () => void) => void;
  closeAuthModal: () => void;
  authModalMode: 'login' | 'signup';
  setAuthModalMode: (mode: 'login' | 'signup') => void;
  requireAuth: (callback: () => void) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USERS: Record<string, User> = {
  'hellen@cakeelegancy.com': {
    id: 'usr-1',
    name: 'Hellen M.',
    email: 'hellen@cakeelegancy.com',
    phone: '+260 971 603 384',
    city: 'Lusaka',
  },
  'customer@example.com': {
    id: 'usr-2',
    name: 'Chola Winter',
    email: 'customer@example.com',
    phone: '+260 957 784 048',
    city: 'Lusaka',
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('cakeelegancy_user');
        return saved ? JSON.parse(saved) : null;
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');
  const [postAuthCallback, setPostAuthCallback] = useState<(() => void) | null>(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem('cakeelegancy_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('cakeelegancy_user');
    }
  }, [user]);

  const login = (email: string, _password?: string) => {
    const trimmed = email.trim().toLowerCase();
    const existing = DEMO_USERS[trimmed];

    const loggedUser: User = existing || {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      email: trimmed,
      phone: '+260 971 603 384',
      city: 'Lusaka',
    };

    setUser(loggedUser);
    setIsAuthModalOpen(false);

    if (postAuthCallback) {
      postAuthCallback();
      setPostAuthCallback(null);
    }
    return true;
  };

  const signup = (name: string, email: string, phone: string, _password?: string) => {
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      city: 'Lusaka',
    };

    setUser(newUser);
    setIsAuthModalOpen(false);

    if (postAuthCallback) {
      postAuthCallback();
      setPostAuthCallback(null);
    }
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const openAuthModal = (mode: 'login' | 'signup' = 'login', callback?: () => void) => {
    setAuthModalMode(mode);
    if (callback) {
      setPostAuthCallback(() => callback);
    } else {
      setPostAuthCallback(null);
    }
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setPostAuthCallback(null);
  };

  const requireAuth = (callback: () => void): boolean => {
    if (user) {
      callback();
      return true;
    }
    openAuthModal('login', callback);
    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        signup,
        logout,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        authModalMode,
        setAuthModalMode,
        requireAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

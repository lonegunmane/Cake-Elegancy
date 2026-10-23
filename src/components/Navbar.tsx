import React, { useState } from 'react';
import { Link, usePathname, useRouter } from '../context/RouterContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
  ShoppingBag,
  Menu,
  X,
  Search,
  Cake,
  User as UserIcon,
  LogOut,
  ChevronRight,
  Phone,
  MessageCircle,
  Sun,
  Moon,
  Sparkles
} from 'lucide-react';
import { CATEGORIES } from '../data/products';
import { CakeElegancyLogo } from './Logo';
import { CONTACT_INFO } from '../data/social';

interface NavbarProps {
  onOpenSideDashboard: () => void;
}

export function Navbar({ onOpenSideDashboard }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { totalItems, openCart } = useCart();
  const { user, isLoggedIn, logout, openAuthModal } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Cakes', href: '/cakes' },
    { name: 'Scones', href: '/scones' },
    { name: 'Muffins', href: '/muffins' },
    { name: 'Cupcakes', href: '/cupcakes' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    setSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#1A0B2E]/95 backdrop-blur-md border-b border-pink-100 dark:border-purple-800/60 shadow-xs transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Mobile menu trigger */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl text-purple-900 dark:text-purple-200 hover:text-pink-600 hover:bg-pink-50 dark:hover:bg-purple-900/50 transition-colors focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Cake Elegancy Brand Logo with Monogram CE Tiered Cake — Clicking opens the Side Dashboard! */}
            <button
              type="button"
              onClick={onOpenSideDashboard}
              className="flex items-center group text-left focus:outline-none focus:ring-2 focus:ring-pink-500/50 rounded-2xl p-1 -ml-1 transition-all"
              title="Click logo to open Cake Elegancy Dashboard & Menu"
              aria-label="Open Cake Elegancy Side Dashboard"
            >
              <CakeElegancyLogo variant="inline" size="md" interactive={true} />
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1.5 bg-purple-50/70 dark:bg-purple-950/60 p-1.5 rounded-full border border-purple-100/80 dark:border-purple-800/80">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-purple-900 text-white dark:bg-pink-600 shadow-sm shadow-purple-950/20 font-semibold'
                        : 'text-purple-900 dark:text-purple-200 hover:text-pink-600 dark:hover:text-pink-300 hover:bg-white/80 dark:hover:bg-purple-900/60'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <Link
                href="/products"
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  pathname === '/products'
                    ? 'bg-purple-900 text-white dark:bg-pink-600 font-semibold'
                    : 'text-purple-700 dark:text-purple-300 hover:text-pink-600 dark:hover:text-pink-300 hover:bg-white/80 dark:hover:bg-purple-900/60'
                }`}
              >
                All Treats
              </Link>
            </nav>

            {/* Header Right Actions */}
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              {/* WhatsApp Quick Order */}
              <a
                href="https://wa.me/260971603384"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden xl:flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 px-3 py-1.5 rounded-full text-xs font-semibold border border-emerald-200/80 dark:border-emerald-800/60 transition-colors"
                title="Chat or Order via WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>WhatsApp</span>
              </a>

              {/* Search Toggle */}
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="p-2.5 rounded-full text-purple-800 dark:text-purple-200 hover:text-pink-600 dark:hover:text-pink-300 hover:bg-pink-50 dark:hover:bg-purple-900/50 transition-colors"
                title="Search treats"
                aria-label="Search treats"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Dark Mode Toggle Button (Sun / Moon) */}
              <button
                type="button"
                onClick={toggleTheme}
                className="p-2.5 rounded-full text-purple-800 dark:text-purple-200 hover:text-pink-600 dark:hover:text-pink-300 hover:bg-pink-50 dark:hover:bg-purple-900/50 transition-colors focus:outline-none"
                title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
                aria-label="Toggle dark mode theme"
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-amber-400 hover:rotate-90 transition-transform duration-300" />
                ) : (
                  <Moon className="w-5 h-5 text-purple-700 hover:-rotate-12 transition-transform duration-300" />
                )}
              </button>

              {/* Account / User Button */}
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 dark:hover:bg-purple-900/60 text-purple-950 dark:text-purple-100 px-3.5 py-2 rounded-full text-xs font-bold border border-purple-200/80 dark:border-purple-800 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-purple-900 dark:bg-pink-600 text-white flex items-center justify-center text-[11px]">
                      {user?.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="max-w-[90px] truncate hidden sm:inline">{user?.name}</span>
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#200D39] text-purple-950 dark:text-purple-100 rounded-2xl shadow-xl border border-pink-100 dark:border-purple-800 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="p-3 border-b border-purple-50 dark:border-purple-800/60">
                        <p className="text-xs font-bold text-purple-950 dark:text-white truncate">{user?.name}</p>
                        <p className="text-[11px] text-purple-500 dark:text-purple-400 truncate">{user?.email}</p>
                        {user?.phone && (
                          <p className="text-[10px] text-pink-600 dark:text-pink-400 font-medium mt-0.5">{user.phone}</p>
                        )}
                      </div>
                      <div className="p-1 space-y-0.5">
                        <Link
                          href="/cart"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 text-xs text-purple-800 dark:text-purple-200 hover:bg-pink-50 dark:hover:bg-purple-900/40 rounded-xl font-medium"
                        >
                          <ShoppingBag className="w-4 h-4 text-purple-400" />
                          <span>My Current Order</span>
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            logout();
                            setUserDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl font-medium transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Log Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => openAuthModal('login')}
                    className="text-purple-800 dark:text-purple-200 hover:text-pink-600 dark:hover:text-pink-400 px-3 py-2 rounded-full text-xs font-bold transition-colors"
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    onClick={() => openAuthModal('signup')}
                    className="bg-purple-100/80 dark:bg-purple-900/60 hover:bg-purple-200 dark:hover:bg-purple-800 text-purple-950 dark:text-purple-100 px-3.5 py-2 rounded-full text-xs font-bold border border-purple-200 dark:border-purple-700 transition-colors"
                  >
                    Create Account
                  </button>
                </div>
              )}

              {/* View Cart Button */}
              <button
                type="button"
                onClick={openCart}
                className="relative flex items-center gap-2 bg-gradient-to-r from-purple-900 to-pink-600 dark:from-purple-800 dark:to-pink-600 text-white px-4 py-2.5 rounded-full font-medium text-sm shadow-md shadow-pink-500/20 hover:shadow-lg hover:shadow-pink-500/30 hover:brightness-105 active:scale-95 transition-all"
                aria-label="Open cart"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline font-semibold">Cart</span>
                {totalItems > 0 && (
                  <span className="bg-white text-purple-950 text-xs font-extrabold rounded-full w-5 h-5 flex items-center justify-center shadow-xs">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-pink-100 dark:border-purple-800/60 bg-white/98 dark:bg-[#1A0B2E]/98 backdrop-blur-lg px-4 pt-3 pb-6 shadow-xl animate-in fade-in slide-in-from-top duration-200">
            {/* Account bar for mobile */}
            <div className="mb-4 pb-3 border-b border-purple-100 dark:border-purple-800/60">
              {isLoggedIn ? (
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-purple-900 dark:bg-pink-600 text-white flex items-center justify-center text-xs font-bold">
                      {user?.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-purple-950 dark:text-white">{user?.name}</p>
                      <p className="text-[11px] text-pink-600 dark:text-pink-400">{user?.phone || user?.email}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-xs text-rose-600 dark:text-rose-400 hover:underline font-semibold"
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openAuthModal('login');
                    }}
                    className="w-full py-2.5 text-center text-xs font-bold text-purple-900 dark:text-purple-200 bg-purple-50 dark:bg-purple-950/60 rounded-xl border border-purple-200 dark:border-purple-800"
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openAuthModal('signup');
                    }}
                    className="w-full py-2.5 text-center text-xs font-bold text-white bg-purple-900 dark:bg-pink-600 rounded-xl"
                  >
                    Create Account
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium ${
                    pathname === link.href
                      ? 'bg-purple-50 dark:bg-purple-950/60 text-purple-950 dark:text-white font-semibold border-l-4 border-purple-800 dark:border-pink-500'
                      : 'text-purple-800 dark:text-purple-200 hover:bg-pink-50 dark:hover:bg-purple-900/40 hover:text-pink-600'
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-purple-300 dark:text-purple-600" />
                </Link>
              ))}
              <Link
                href="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium text-purple-800 dark:text-purple-200 hover:bg-pink-50 dark:hover:bg-purple-900/40"
              >
                <span>Browse All Treats</span>
                <ChevronRight className="w-4 h-4 text-purple-300 dark:text-purple-600" />
              </Link>
              <Link
                href="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold text-pink-700 dark:text-pink-300 bg-pink-50/80 dark:bg-pink-950/40 mt-2"
              >
                <span className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4" />
                  View Shopping Bag
                </span>
                <span className="bg-pink-600 text-white text-xs px-2.5 py-0.5 rounded-full font-bold">
                  {totalItems} items
                </span>
              </Link>
            </div>

            {/* Direct WhatsApp Call & Message on Mobile */}
            <div className="mt-5 pt-4 border-t border-purple-100 dark:border-purple-800/60 space-y-2">
              <a
                href="https://wa.me/260971603384"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl text-xs font-bold transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order via WhatsApp (+260 971 603 384)</span>
              </a>
              <a
                href="tel:+260957784048"
                className="flex items-center justify-center gap-2 bg-purple-50 dark:bg-purple-950/60 text-purple-900 dark:text-purple-200 py-2.5 rounded-xl text-xs font-semibold border border-purple-200 dark:border-purple-800"
              >
                <Phone className="w-3.5 h-3.5 text-purple-700 dark:text-pink-400" />
                <span>Call Us: +260 957 784 048</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-purple-950/60 dark:bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-[#1E0B36] rounded-3xl shadow-2xl max-w-lg w-full p-6 border border-pink-100 dark:border-purple-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-xl font-bold text-purple-950 dark:text-white flex items-center gap-2">
                <Search className="w-5 h-5 text-pink-500" />
                Search Cake Elegancy
              </h3>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-1 rounded-full text-purple-400 hover:text-purple-700 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cakes, scones, muffins, cupcakes..."
                autoFocus
                className="w-full bg-purple-50/60 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-700 rounded-2xl py-3.5 pl-4 pr-12 text-purple-950 dark:text-purple-100 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-pink-500 text-base"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bottom-2 px-3.5 bg-gradient-to-r from-purple-800 to-pink-600 text-white rounded-xl font-medium text-sm hover:brightness-105"
              >
                Search
              </button>
            </form>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <span className="text-purple-400 dark:text-purple-400/80 font-medium py-1">Popular:</span>
              {['Lavender Cake', 'Blueberry Scone', 'Double Chocolate', 'Rosé Cupcake'].map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => {
                    setSearchQuery(term);
                    router.push(`/products?search=${encodeURIComponent(term)}`);
                    setSearchOpen(false);
                  }}
                  className="bg-purple-100/70 dark:bg-purple-900/60 hover:bg-pink-100 dark:hover:bg-pink-950 text-purple-800 dark:text-purple-200 hover:text-pink-700 dark:hover:text-pink-300 px-2.5 py-1 rounded-full transition-colors font-medium"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

import React, { useState } from 'react';
import { Link, usePathname, useRouter } from '../context/RouterContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
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
  Sparkles
} from 'lucide-react';
import { CATEGORIES } from '../data/products';

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { totalItems, openCart } = useCart();
  const { user, isLoggedIn, logout, openAuthModal } = useAuth();

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
      {/* Main Sticky Header (Promotional top banner removed per branding instructions) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-pink-100 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Mobile menu trigger */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl text-purple-900 hover:text-pink-600 hover:bg-pink-50 transition-colors focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Cake Elegancy Brand Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-800 via-purple-700 to-pink-500 flex items-center justify-center shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform duration-300">
                <Cake className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-tight text-purple-950 flex items-center leading-none">
                  Cake Elegancy
                  <span className="w-2 h-2 rounded-full bg-pink-500 ml-1.5 inline-block"></span>
                </span>
                <span className="text-[11px] font-medium tracking-normal text-pink-600 mt-1 italic font-serif">
                  Hellen's cakery paradise
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1.5 bg-purple-50/70 p-1.5 rounded-full border border-purple-100/80">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-purple-900 text-white shadow-sm shadow-purple-950/20 font-semibold'
                        : 'text-purple-900 hover:text-pink-600 hover:bg-white/80'
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
                    ? 'bg-purple-900 text-white font-semibold'
                    : 'text-purple-700 hover:text-pink-600 hover:bg-white/80'
                }`}
              >
                All Treats
              </Link>
            </nav>

            {/* Header Right Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* WhatsApp Quick Order */}
              <a
                href="https://wa.me/260971603384"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden xl:flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-semibold border border-emerald-200/80 transition-colors"
                title="Chat or Order via WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp</span>
              </a>

              {/* Search Toggle */}
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="p-2.5 rounded-full text-purple-800 hover:text-pink-600 hover:bg-pink-50 transition-colors"
                title="Search treats"
                aria-label="Search treats"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Account / User Button */}
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 bg-purple-50 hover:bg-purple-100 text-purple-950 px-3.5 py-2 rounded-full text-xs font-bold border border-purple-200/80 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-purple-900 text-white flex items-center justify-center text-[11px]">
                      {user?.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="max-w-[100px] truncate hidden sm:inline">{user?.name}</span>
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-pink-100 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="p-3 border-b border-purple-50">
                        <p className="text-xs font-bold text-purple-950 truncate">{user?.name}</p>
                        <p className="text-[11px] text-purple-500 truncate">{user?.email}</p>
                        {user?.phone && (
                          <p className="text-[10px] text-pink-600 font-medium mt-0.5">{user.phone}</p>
                        )}
                      </div>
                      <div className="p-1">
                        <Link
                          href="/cart"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 text-xs text-purple-800 hover:bg-pink-50 hover:text-pink-700 rounded-xl font-medium"
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
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded-xl font-medium transition-colors"
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
                    className="text-purple-800 hover:text-pink-600 px-3 py-2 rounded-full text-xs font-bold transition-colors"
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    onClick={() => openAuthModal('signup')}
                    className="bg-purple-100/80 hover:bg-purple-200 text-purple-950 px-3.5 py-2 rounded-full text-xs font-bold border border-purple-200 transition-colors"
                  >
                    Create Account
                  </button>
                </div>
              )}

              {/* View Cart Button */}
              <button
                type="button"
                onClick={openCart}
                className="relative flex items-center gap-2 bg-gradient-to-r from-purple-900 to-pink-600 text-white px-4 py-2.5 rounded-full font-medium text-sm shadow-md shadow-pink-500/20 hover:shadow-lg hover:shadow-pink-500/30 hover:brightness-105 active:scale-95 transition-all"
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
          <div className="lg:hidden border-t border-pink-100 bg-white/98 backdrop-blur-lg px-4 pt-3 pb-6 shadow-xl animate-in fade-in slide-in-from-top duration-200">
            {/* Account bar for mobile */}
            <div className="mb-4 pb-3 border-b border-purple-100">
              {isLoggedIn ? (
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-purple-900 text-white flex items-center justify-center text-xs font-bold">
                      {user?.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-purple-950">{user?.name}</p>
                      <p className="text-[11px] text-pink-600">{user?.phone || user?.email}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-xs text-rose-600 hover:underline font-semibold"
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
                    className="w-full py-2.5 text-center text-xs font-bold text-purple-900 bg-purple-50 rounded-xl border border-purple-200"
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openAuthModal('signup');
                    }}
                    className="w-full py-2.5 text-center text-xs font-bold text-white bg-purple-900 rounded-xl"
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
                      ? 'bg-purple-50 text-purple-950 font-semibold border-l-4 border-purple-800'
                      : 'text-purple-800 hover:bg-pink-50 hover:text-pink-600'
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-purple-300" />
                </Link>
              ))}
              <Link
                href="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium text-purple-800 hover:bg-pink-50"
              >
                <span>Browse All Treats</span>
                <ChevronRight className="w-4 h-4 text-purple-300" />
              </Link>
              <Link
                href="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold text-pink-700 bg-pink-50/80 mt-2"
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
            <div className="mt-5 pt-4 border-t border-purple-100 space-y-2">
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
                className="flex items-center justify-center gap-2 bg-purple-50 text-purple-900 py-2.5 rounded-xl text-xs font-semibold border border-purple-200"
              >
                <Phone className="w-3.5 h-3.5 text-purple-700" />
                <span>Call Us: +260 957 784 048</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-purple-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 border border-pink-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-xl font-bold text-purple-950 flex items-center gap-2">
                <Search className="w-5 h-5 text-pink-500" />
                Search Cake Elegancy
              </h3>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-1 rounded-full text-purple-400 hover:text-purple-700"
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
                className="w-full bg-purple-50/60 border border-purple-200 rounded-2xl py-3.5 pl-4 pr-12 text-purple-950 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white text-base"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bottom-2 px-3.5 bg-gradient-to-r from-purple-800 to-pink-600 text-white rounded-xl font-medium text-sm hover:brightness-105"
              >
                Search
              </button>
            </form>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <span className="text-purple-400 font-medium py-1">Popular:</span>
              {['Lavender Cake', 'Blueberry Scone', 'Double Chocolate', 'Rosé Cupcake'].map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => {
                    setSearchQuery(term);
                    router.push(`/products?search=${encodeURIComponent(term)}`);
                    setSearchOpen(false);
                  }}
                  className="bg-purple-100/70 hover:bg-pink-100 text-purple-800 hover:text-pink-700 px-2.5 py-1 rounded-full transition-colors font-medium"
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

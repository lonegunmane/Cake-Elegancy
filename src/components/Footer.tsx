import React, { useState } from 'react';
import { Link } from '../context/RouterContext';
import { Cake, Heart, Sparkles, Phone, MessageCircle, Mail, Check, Truck, Globe } from 'lucide-react';
import { CATEGORIES } from '../data/products';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-gradient-to-b from-purple-950 via-purple-900 to-[#2A0845] text-purple-100 pt-16 pb-12 mt-20 border-t border-purple-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-purple-800/60">
          {/* Column 1: Brand & Order-Only Note */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white shadow-md">
                <Cake className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-tight text-white leading-none">
                  Cake Elegancy
                </span>
                <span className="text-xs text-pink-300 font-serif italic mt-0.5">
                  Hellen's cakery paradise
                </span>
              </div>
            </div>
            <p className="text-purple-200/80 text-sm leading-relaxed max-w-sm">
              Bespoke celebration cakes, golden buttery scones, wholesome breakfast muffins, and delicate swirl cupcakes. Handcrafted fresh to order using premium European cultured butter and gourmet flavors.
            </p>
            <div className="p-3 rounded-2xl bg-white/5 border border-purple-700/60 text-xs text-purple-200/90 space-y-1">
              <div className="flex items-center gap-1.5 text-pink-300 font-bold">
                <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                <span>Order-Only Bakery</span>
              </div>
              <p className="text-[11px] text-purple-300/80">
                We operate strictly on an order-only basis with no physical walk-in store. Every treat is freshly baked and dispatched specifically for you!
              </p>
            </div>
          </div>

          {/* Column 2: Baked Collections */}
          <div>
            <h4 className="font-serif text-base font-semibold text-white mb-4 tracking-wide">
              Our Bakes
            </h4>
            <ul className="space-y-2.5 text-sm">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={cat.path}
                    className="text-purple-200/70 hover:text-pink-300 transition-colors flex items-center gap-1.5"
                  >
                    <span>{cat.name}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/products"
                  className="text-pink-400 hover:text-pink-300 transition-colors font-medium flex items-center gap-1.5"
                >
                  <span>All Bakery Goods →</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Direct Inquiries (No physical shop) */}
          <div>
            <h4 className="font-serif text-base font-semibold text-white mb-4 tracking-wide">
              Contact & Inquiries
            </h4>
            <div className="space-y-3 text-xs text-purple-200/90">
              <div>
                <p className="text-[11px] text-purple-400 uppercase font-bold tracking-wider mb-1">
                  Official Phone Lines:
                </p>
                <div className="space-y-1.5">
                  <a
                    href="tel:+260971603384"
                    className="flex items-center gap-2 hover:text-pink-300 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                    <span>+260 971 603 384 (Calls + WhatsApp)</span>
                  </a>
                  <a
                    href="tel:+260957784048"
                    className="flex items-center gap-2 hover:text-pink-300 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                    <span>+260 957 784 048 (Calls only)</span>
                  </a>
                </div>
              </div>

              {/* Delivery Partners */}
              <div className="pt-2 border-t border-purple-800/60">
                <p className="text-[11px] text-purple-400 uppercase font-bold tracking-wider mb-1 flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-pink-400" />
                  Reliable Deliveries:
                </p>
                <p className="text-[11px] text-purple-300/80">
                  • <strong>Local (Lusaka):</strong> Yango Deli<br />
                  • <strong>Country-wide:</strong> Platinum Carrier Services
                </p>
              </div>

              {/* Social Media Links */}
              <div className="pt-2">
                <p className="text-[11px] text-purple-400 uppercase font-bold tracking-wider mb-2">
                  Connect & Follow:
                </p>
                <div className="flex flex-wrap gap-2">
                  <a
                    href="https://wa.me/260971603384"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 text-xs hover:bg-emerald-600/50 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-pink-600/30 border border-pink-500/40 text-pink-300 text-xs hover:bg-pink-600/50 transition-colors"
                  >
                    <span>Instagram</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-600/30 border border-blue-500/40 text-blue-300 text-xs hover:bg-blue-600/50 transition-colors"
                  >
                    <span>Facebook</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-600/30 border border-purple-500/40 text-purple-300 text-xs hover:bg-purple-600/50 transition-colors"
                  >
                    <span>TikTok</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: 20% Website Discount & Newsletter */}
          <div>
            <h4 className="font-serif text-base font-semibold text-white mb-4 tracking-wide">
              Online Perks
            </h4>
            <div className="bg-gradient-to-br from-pink-500/20 to-purple-800/40 border border-pink-500/40 rounded-2xl p-3.5 mb-3 text-xs">
              <span className="font-bold text-pink-300 block mb-1">
                20% Website Discount
              </span>
              <p className="text-purple-200/80 text-[11px] leading-relaxed">
                Every order placed directly through our website automatically gets 20% off at checkout!
              </p>
            </div>
            {subscribed ? (
              <div className="bg-pink-950/60 border border-pink-500/40 rounded-xl p-3 text-pink-200 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-pink-400 shrink-0" />
                <span>Welcome! You're subscribed to Hellen's sweet updates.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-purple-900/60 border border-purple-700/80 rounded-xl px-3.5 py-2 text-xs text-white placeholder-purple-400 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400"
                />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-xl py-2 text-xs font-semibold shadow-md transition-all active:scale-98"
                >
                  Join Hellen's Paradise Club
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-purple-300/70 gap-4">
          <div className="flex items-center gap-2">
            <span>© 2026 Cake Elegancy. All rights reserved.</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-pink-300">
              Baked with love by Hellen <Heart className="w-3 h-3 text-pink-400 fill-pink-400" />
            </span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 text-purple-300/80">
            <span>Lusaka, Zambia</span>
            <span>•</span>
            <a href="https://wa.me/260971603384" target="_blank" rel="noopener noreferrer" className="hover:text-pink-300 transition-colors">
              WhatsApp Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

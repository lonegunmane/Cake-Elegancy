import React, { useState } from 'react';
import { Link, useRouter } from '../context/RouterContext';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Product, formatZMW } from '../types/bakery';
import {
  Sparkles,
  ArrowRight,
  Heart,
  Award,
  Clock,
  ShieldCheck,
  Star,
  Cake,
  ChevronRight,
  Phone,
  MessageCircle,
  Truck,
  Percent,
  CheckCircle2,
  Package
} from 'lucide-react';

interface HomePageProps {
  onQuickView: (product: Product) => void;
}

export function HomePage({ onQuickView }: HomePageProps) {
  const router = useRouter();
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');

  const filteredFeaturedProducts = activeCategoryFilter === 'all'
    ? PRODUCTS.slice(0, 8)
    : PRODUCTS.filter(p => p.category === activeCategoryFilter);

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 sm:pb-24 lg:pt-14">
        {/* Soft background ambient gradient blooms */}
        <div className="absolute top-0 right-1/4 -z-10 w-96 h-96 bg-pink-200/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 left-10 -z-10 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Copy & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/80 border border-pink-200 text-pink-700 text-xs sm:text-sm font-semibold shadow-xs">
                <Sparkles className="w-4 h-4 text-pink-500 animate-spin" style={{ animationDuration: '8s' }} />
                <span>Cake Elegancy • Hellen's cakery paradise</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-purple-950 tracking-tight leading-[1.12]">
                Elegance in every bite,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-800 via-pink-600 to-purple-700">
                  baked fresh
                </span>{' '}
                to order.
              </h1>

              <p className="text-base sm:text-lg text-purple-900/70 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Welcome to Hellen's cakery paradise! We specialize in custom multi-tier celebration cakes, golden tea scones, warm breakfast muffins, and frosted cupcakes. <em>Order-only bakery</em> dispatched throughout Zambia.
              </p>

              {/* Automatic 20% Discount Callout */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-900 to-pink-600 text-white px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold shadow-md shadow-pink-500/15">
                <Percent className="w-4 h-4 text-pink-200" />
                <span>Order on our website and get 20% OFF automatically at checkout!</span>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/cakes"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-purple-800 to-pink-600 hover:from-purple-900 hover:to-pink-700 text-white font-bold text-sm shadow-lg shadow-purple-900/15 hover:shadow-xl hover:shadow-pink-500/25 active:scale-98 transition-all flex items-center justify-center gap-2 group"
                >
                  <Cake className="w-4 h-4" />
                  <span>Browse Custom Cakes</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href="https://wa.me/260971603384?text=Hello%20Hellen,%20I%20would%20like%20to%20order%20from%20Cake%20Elegancy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-7 py-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order via WhatsApp</span>
                </a>
              </div>

              {/* Trust Badges (No physical shop) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-purple-100/80 text-left">
                <div className="flex items-center gap-2 text-xs text-purple-900 font-medium">
                  <div className="w-7 h-7 rounded-full bg-pink-100 text-pink-700 flex items-center justify-center shrink-0">
                    <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
                  </div>
                  <span>100% Order-Only Fresh</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-purple-900 font-medium">
                  <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                    <Percent className="w-3.5 h-3.5" />
                  </div>
                  <span>20% Website Discount</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-purple-900 font-medium">
                  <div className="w-7 h-7 rounded-full bg-pink-100 text-pink-700 flex items-center justify-center shrink-0">
                    <Truck className="w-3.5 h-3.5" />
                  </div>
                  <span>Yango Deli (Local)</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-purple-900 font-medium">
                  <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                    <Package className="w-3.5 h-3.5" />
                  </div>
                  <span>Platinum Carrier (Country-wide)</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Card */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white group">
                  <img
                    src="https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=1000&q=80"
                    alt="Velvet Lavender Berry Cake"
                    className="w-full h-96 sm:h-[460px] object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-950/85 via-purple-950/30 to-transparent flex flex-col justify-end p-6 text-white">
                    <span className="bg-pink-500 text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full w-max mb-2">
                      Hellen's Signature
                    </span>
                    <h3 className="font-serif text-2xl font-bold">
                      Velvet Lavender Berry Cake
                    </h3>
                    <p className="text-purple-200 text-xs mt-1">
                      Made to order in custom 6", 8", and 10" sizes with free custom piping inscription
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xl font-bold font-serif">{formatZMW(520.0)}</span>
                      <button
                        type="button"
                        onClick={() => router.push('/product/cake-lavender-berry')}
                        className="bg-white hover:bg-pink-50 text-purple-950 px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors"
                      >
                        Customize Size →
                      </button>
                    </div>
                  </div>
                </div>

                {/* Floating Discount Tag */}
                <div className="absolute -top-4 -left-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-pink-100 hidden sm:flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center font-serif font-bold text-lg">
                    %
                  </div>
                  <div>
                    <div className="text-xs font-bold text-purple-950">20% Off Online</div>
                    <div className="text-[11px] text-pink-600 font-semibold">Automatic at checkout</div>
                  </div>
                </div>

                {/* Floating Order-Only Badge */}
                <div className="absolute -bottom-6 -right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-purple-100 hidden sm:flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-base">
                    🧁
                  </div>
                  <div>
                    <div className="text-xs font-bold text-purple-950">Order-Only Bakery</div>
                    <div className="text-[11px] text-purple-500">Baked fresh for your event</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured 4 Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold text-pink-600 uppercase tracking-widest">
            Hellen's Collections
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-purple-950">
            Explore By Category
          </h2>
          <p className="text-purple-900/60 text-sm">
            Everything is baked strictly on an order basis: single celebration cakes, or minimum 6 pieces for scones, muffins, and cupcakes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={cat.path}
              className="group relative rounded-3xl overflow-hidden bg-white border border-pink-100 shadow-xs hover:shadow-xl hover:shadow-purple-900/10 transition-all duration-300 flex flex-col hover:-translate-y-1.5"
            >
              {/* Category Image */}
              <div className="relative aspect-4/3 w-full overflow-hidden bg-purple-50">
                <img
                  src={cat.heroImage}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-950/70 via-purple-950/20 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-[11px] font-semibold text-pink-300 uppercase tracking-wider">
                    {cat.id === 'cakes' ? 'Min. 1 cake' : 'Min. 6 pieces'}
                  </span>
                  <h3 className="font-serif text-2xl font-bold leading-tight">
                    {cat.name}
                  </h3>
                </div>
              </div>

              {/* Category Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <p className="text-xs text-purple-900/70 leading-relaxed line-clamp-2">
                  {cat.description}
                </p>

                <div className="pt-4 mt-3 border-t border-purple-50 flex items-center justify-between text-xs font-bold text-purple-900 group-hover:text-pink-600 transition-colors">
                  <span>View {cat.name}</span>
                  <div className="w-7 h-7 rounded-full bg-purple-50 group-hover:bg-pink-100 flex items-center justify-center transition-colors">
                    <ChevronRight className="w-4 h-4 text-purple-700 group-hover:text-pink-600" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-pink-600 uppercase tracking-widest">
              From Hellen's Oven
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-purple-950 mt-1">
              Featured Bakery Creations
            </h2>
            <p className="text-purple-900/60 text-sm mt-1">
              Popular celebration favorites (prices in Zambian Kwacha ZMW).
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 bg-purple-100/60 p-1.5 rounded-full border border-purple-200/60">
            {['all', 'cakes', 'scones', 'muffins', 'cupcakes'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategoryFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold capitalize transition-all ${
                  activeCategoryFilter === cat
                    ? 'bg-purple-900 text-white shadow-xs'
                    : 'text-purple-800 hover:text-pink-600 hover:bg-white/60'
                }`}
              >
                {cat === 'all' ? 'All Treats' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredFeaturedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-purple-900 hover:bg-purple-950 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all"
          >
            <span>View All Baked Treats</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Contact Us & Order via WhatsApp Section (Required on Homepage) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-purple-950 via-purple-900 to-pink-950 text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-xl border border-purple-800">
          <div className="absolute top-0 right-0 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/20 border border-pink-400/30 text-pink-300 text-xs font-bold uppercase tracking-widest">
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Direct Customer Care & Inquiries</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Order via WhatsApp or Call Us
            </h2>

            <p className="text-purple-200/90 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              We operate exclusively on an <strong>order-only basis</strong> with no walk-in storefront. To discuss customized celebration cakes, wedding tiers, or bulk orders, reach out directly to Hellen:
            </p>

            {/* Official Phone Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto pt-2 text-left">
              <a
                href="https://wa.me/260971603384"
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 transition-all flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-pink-300 font-bold uppercase tracking-wider">
                    Calls & WhatsApp
                  </div>
                  <div className="text-base font-bold text-white mt-0.5">
                    +260 971 603 384
                  </div>
                  <div className="text-[11px] text-emerald-300 mt-0.5">Click to chat instantly →</div>
                </div>
              </a>

              <a
                href="tel:+260957784048"
                className="p-5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 transition-all flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-purple-700 text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-pink-300 font-bold uppercase tracking-wider">
                    Calls Line Only
                  </div>
                  <div className="text-base font-bold text-white mt-0.5">
                    +260 957 784 048
                  </div>
                  <div className="text-[11px] text-purple-300 mt-0.5">Direct phone call →</div>
                </div>
              </a>
            </div>

            {/* Social Media & Delivery notice */}
            <div className="pt-4 border-t border-purple-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-purple-200">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-pink-400" />
                <span>
                  <strong>Deliveries:</strong> Yango Deli (Lusaka) & Platinum Carrier (Country-wide)
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-purple-300">Socials:</span>
                <a href="https://wa.me/260971603384" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline font-semibold">WhatsApp</a>
                <span>•</span>
                <a href="#" className="hover:text-pink-300 transition-colors">Instagram</a>
                <span>•</span>
                <a href="#" className="hover:text-pink-300 transition-colors">Facebook</a>
                <span>•</span>
                <a href="#" className="hover:text-pink-300 transition-colors">TikTok</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Love & Reviews */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold text-pink-600 uppercase tracking-widest">
            Loved Across Zambia
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-purple-950">
            What Our Clients Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: 'Mwamba Chileshe',
              role: 'Lusaka Wedding Order',
              quote: 'Hellen crafted a stunning 3-tier celebration cake for our wedding reception. The Swiss buttercream was smooth as silk and our guests could not stop complimenting the lavender flavor.',
              stars: 5,
              treat: 'Velvet Lavender Berry Cake',
            },
            {
              name: 'Dr. Thandiwe Banda',
              role: 'Family Birthday Party',
              quote: 'Ordered via WhatsApp and delivered seamlessly through Yango Deli right to our doorstep. The scones and chocolate muffins were fresh, warm, and incredible.',
              stars: 5,
              treat: 'Blueberry Scones (Dozen)',
            },
            {
              name: 'Kabaso Mulenga',
              role: 'Corporate Catering (Kitwe)',
              quote: 'Sent through Platinum Carrier Services to the Copperbelt. Packaged with such care in pink boutique boxes! Arrived in immaculate condition. Hellen is a genius baker.',
              stars: 5,
              treat: 'Assorted Gourmet Cupcakes',
            },
          ].map((review, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-3xl border border-pink-100 shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex gap-1 text-amber-400">
                  {Array.from({ length: review.stars }).map((_, s) => (
                    <Star key={s} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-purple-900/80 leading-relaxed italic">
                  "{review.quote}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-purple-50 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-purple-950">{review.name}</div>
                  <div className="text-[10px] text-purple-400">{review.role}</div>
                </div>
                <span className="text-[10px] font-semibold text-pink-600 bg-pink-50 px-2.5 py-1 rounded-full">
                  {review.treat}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

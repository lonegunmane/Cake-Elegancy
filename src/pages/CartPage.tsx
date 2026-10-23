import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link, useRouter } from '../context/RouterContext';
import { formatZMW, getMinQuantity, DeliveryProvider } from '../types/bakery';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Sparkles,
  Truck,
  Percent,
  Clock,
  ShieldCheck,
  Gift,
  Lock,
  User as UserIcon,
  Phone,
  AlertCircle,
  MapPin
} from 'lucide-react';

interface CartPageProps {
  onCheckout: () => void;
}

export function CartPage({ onCheckout }: CartPageProps) {
  const router = useRouter();
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    websiteDiscount,
    websiteDiscountPercent,
    total,
    deliveryProvider,
    setDeliveryProvider,
    orderNote,
    setOrderNote,
    minQuantityNotice,
  } = useCart();

  const { user, isLoggedIn, openAuthModal, requireAuth } = useAuth();

  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [preferredDate, setPreferredDate] = useState('Tomorrow Morning (09:00 - 12:00)');
  const [localWarning, setLocalWarning] = useState<string | null>(null);

  const handleDecrement = (id: string, currentQty: number, category: any) => {
    const min = getMinQuantity(category);
    if (currentQty <= min) {
      setLocalWarning(`Minimum order for ${category} is ${min} pieces. Use the trash button to remove.`);
      setTimeout(() => setLocalWarning(null), 3000);
      return;
    }
    updateQuantity(id, currentQty - 1);
  };

  const handleCheckoutClick = () => {
    requireAuth(() => {
      onCheckout();
    });
  };

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-20 px-4 text-center space-y-6">
        <div className="w-24 h-24 rounded-full bg-pink-50 border border-pink-100 flex items-center justify-center mx-auto text-pink-500 shadow-inner">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <div className="space-y-2">
          <h1 className="font-serif text-3xl font-bold text-purple-950">
            Your Order Basket is Empty
          </h1>
          <p className="text-purple-800/70 text-sm max-w-sm mx-auto leading-relaxed">
            Welcome to Hellen's cakery paradise! Select from custom celebration cakes, golden scones, warm muffins, or gourmet cupcakes.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link
            href="/cakes"
            className="px-6 py-3 rounded-full bg-purple-900 hover:bg-purple-950 text-white font-bold text-xs shadow-md transition-all"
          >
            Explore Cakes
          </Link>
          <Link
            href="/cupcakes"
            className="px-6 py-3 rounded-full bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs shadow-md transition-all"
          >
            Explore Cupcakes
          </Link>
          <Link
            href="/products"
            className="px-6 py-3 rounded-full bg-white border border-purple-200 text-purple-900 font-bold text-xs hover:bg-purple-50 transition-all"
          >
            View All Treats
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      {/* Title */}
      <div className="flex items-center justify-between pb-4 border-b border-purple-100">
        <div>
          <span className="text-xs font-bold text-pink-600 uppercase tracking-widest">
            Order-Only Review
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-purple-950 mt-0.5">
            Your Bakery Basket ({items.reduce((s, i) => s + i.quantity, 0)} pieces)
          </h1>
        </div>
        <button
          type="button"
          onClick={clearCart}
          className="text-xs font-medium text-purple-500 hover:text-pink-600 underline"
        >
          Clear Basket
        </button>
      </div>

      {/* Automatic 20% Discount Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-purple-900 to-pink-900 text-white rounded-3xl p-5 shadow-md border border-purple-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-pink-500 text-white flex items-center justify-center shrink-0 shadow-md">
            <Percent className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-base sm:text-lg">
              Automatic 20% Website Discount Applied!
            </h3>
            <p className="text-purple-200 text-xs mt-0.5">
              Thank you for ordering directly through Cake Elegancy website. Your 20% savings are deducted at checkout.
            </p>
          </div>
        </div>
        <div className="bg-white/20 border border-white/30 text-white font-mono font-bold text-sm px-4 py-2 rounded-2xl text-center self-start sm:self-auto">
          SAVE 20%
        </div>
      </div>

      {/* Minimum quantity alert if triggered */}
      {(localWarning || minQuantityNotice) && (
        <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>{localWarning || minQuantityNotice}</span>
        </div>
      )}

      {/* Grid: Cart Items on Left, Order Summary on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Items List */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-3xl border border-pink-100 shadow-xs divide-y divide-purple-50 overflow-hidden">
            {items.map((item) => {
              const minQty = getMinQuantity(item.product.category);
              return (
                <div key={item.id} className="p-4 sm:p-6 flex gap-4 sm:gap-6 items-center">
                  <Link href={`/product/${item.product.id}`} className="shrink-0">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover hover:scale-105 transition-transform"
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-pink-600 tracking-wider">
                          {item.product.category}
                        </span>
                        <Link
                          href={`/product/${item.product.id}`}
                          className="font-serif text-base sm:text-lg font-bold text-purple-950 hover:text-pink-600 transition-colors block leading-snug"
                        >
                          {item.product.name}
                        </Link>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 text-purple-400 hover:text-pink-600 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Customization Details */}
                    <div className="mt-1 text-xs text-purple-800/80 space-y-0.5">
                      {item.selectedSize && (
                        <div>Size: <span className="font-semibold text-purple-950">{item.selectedSize}</span></div>
                      )}
                      {item.selectedFlavor && (
                        <div>Flavor: <span className="font-semibold text-purple-950">{item.selectedFlavor}</span></div>
                      )}
                      {item.customMessage && (
                        <div className="text-pink-700 italic bg-pink-50/80 px-2 py-0.5 rounded-lg inline-block mt-1">
                          Piping note: "{item.customMessage}"
                        </div>
                      )}
                      {minQty > 1 && (
                        <div className="text-[10px] text-purple-500">
                          (Min. order rule: {minQty} pieces)
                        </div>
                      )}
                    </div>

                    {/* Quantity & Unit Price */}
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center border border-purple-200 rounded-full bg-purple-50/40 px-2 py-1">
                        <button
                          type="button"
                          onClick={() => handleDecrement(item.id, item.quantity, item.product.category)}
                          className="text-purple-600 hover:text-pink-600 p-1"
                          title={item.quantity <= minQty ? `Minimum order is ${minQty}` : 'Decrease'}
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold text-purple-950 px-3 min-w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-purple-600 hover:text-pink-600 p-1"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="text-sm sm:text-base font-bold text-purple-950 font-serif">
                          {formatZMW(item.unitPrice * item.quantity)}
                        </div>
                        {item.quantity > 1 && (
                          <div className="text-[10px] text-purple-400">
                            {formatZMW(item.unitPrice)} each
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Special Instructions for Hellen */}
          <div className="bg-white rounded-3xl p-5 border border-pink-100 shadow-xs space-y-2">
            <label className="block text-xs font-bold text-purple-950 flex items-center gap-1.5">
              <Gift className="w-4 h-4 text-pink-500" />
              Special Notes or Event Decoration Instructions:
            </label>
            <textarea
              rows={2}
              value={orderNote}
              onChange={(e) => setOrderNote(e.target.value)}
              placeholder="e.g. Color theme (lilac & blush pink), delivery timing, recipient name..."
              className="w-full bg-purple-50/40 border border-purple-200 rounded-2xl p-3 text-xs text-purple-950 placeholder-purple-400 focus:outline-none focus:ring-1 focus:ring-pink-500"
            />
          </div>
        </div>

        {/* Right Column: Order Summary & Account Checkout */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-pink-100 shadow-md space-y-5">
            <h2 className="font-serif text-xl font-bold text-purple-950">
              Order Summary
            </h2>

            {/* Account Status / Logged In Box */}
            <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-100 text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-purple-950 flex items-center gap-1.5">
                  <UserIcon className="w-3.5 h-3.5 text-pink-600" />
                  Account Status:
                </span>
                {isLoggedIn ? (
                  <span className="text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full font-bold text-[10px]">
                    Logged In
                  </span>
                ) : (
                  <span className="text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded-full font-bold text-[10px]">
                    Login Required
                  </span>
                )}
              </div>

              {isLoggedIn ? (
                <div className="text-[11px] text-purple-800 pt-1">
                  Ordering as <strong className="text-purple-950">{user?.name}</strong> ({user?.email})
                  {user?.phone && <span className="block text-purple-600">Phone: {user.phone}</span>}
                </div>
              ) : (
                <div className="pt-1">
                  <p className="text-[11px] text-purple-700 mb-2">
                    To complete your purchase, you must be logged in. Create an account or sign in with 1 click.
                  </p>
                  <button
                    type="button"
                    onClick={() => openAuthModal('login')}
                    className="w-full py-2 bg-purple-900 hover:bg-purple-950 text-white rounded-xl font-bold text-xs transition-colors"
                  >
                    Log In / Create Account
                  </button>
                </div>
              )}
            </div>

            {/* Delivery Service Selection (Yango Deli vs Platinum Carrier) */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-purple-950 block flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-pink-600" />
                Select Delivery Carrier:
              </span>
              <div className="grid grid-cols-1 gap-2.5">
                <button
                  type="button"
                  onClick={() => setDeliveryProvider('yango')}
                  className={`p-3.5 rounded-2xl border text-xs text-left transition-all ${
                    deliveryProvider === 'yango'
                      ? 'border-purple-800 bg-purple-50 text-purple-950 font-bold shadow-xs'
                      : 'border-purple-200/80 text-purple-700 hover:border-purple-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm">Yango Deli</span>
                    <span className="text-[10px] bg-purple-200/60 text-purple-950 px-2 py-0.5 rounded-full font-semibold">
                      Local Deliveries (Lusaka)
                    </span>
                  </div>
                  <p className="text-[11px] text-purple-700/80 font-normal">
                    Direct on-demand delivery across Lusaka. Standard Yango Deli carrier charges apply upon dispatch.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryProvider('platinum')}
                  className={`p-3.5 rounded-2xl border text-xs text-left transition-all ${
                    deliveryProvider === 'platinum'
                      ? 'border-purple-800 bg-purple-50 text-purple-950 font-bold shadow-xs'
                      : 'border-purple-200/80 text-purple-700 hover:border-purple-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm">Platinum Carrier Services</span>
                    <span className="text-[10px] bg-pink-200/60 text-pink-900 px-2 py-0.5 rounded-full font-semibold">
                      Country-wide Zambia
                    </span>
                  </div>
                  <p className="text-[11px] text-purple-700/80 font-normal">
                    Secure courier to Copperbelt, Livingstone, Ndola, and all provinces. Standard Platinum Carrier rates apply.
                  </p>
                </button>
              </div>
            </div>

            {/* Destination Address Input */}
            <div className="space-y-1.5 text-xs">
              <label className="font-bold text-purple-950 block flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-pink-600" />
                Delivery Address / Town:
              </label>
              <input
                type="text"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="e.g. Woodlands, Lusaka or Kansenshi, Ndola"
                className="w-full bg-purple-50/70 border border-purple-200 rounded-xl px-3 py-2 text-xs text-purple-950 focus:outline-none focus:ring-1 focus:ring-pink-500"
              />
            </div>

            {/* Preferred Delivery Time Slot */}
            <div className="space-y-1.5 text-xs">
              <label className="font-bold text-purple-950 block flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-pink-600" />
                Preferred Delivery Slot:
              </label>
              <select
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full bg-purple-50/70 border border-purple-200 rounded-xl px-3 py-2 text-xs text-purple-950 font-medium focus:outline-none focus:ring-1 focus:ring-pink-500 cursor-pointer"
              >
                <option value="Tomorrow Morning (09:00 - 12:00)">Tomorrow Morning (09:00 – 12:00)</option>
                <option value="Tomorrow Afternoon (14:00 - 17:00)">Tomorrow Afternoon (14:00 – 17:00)</option>
                <option value="Weekend Morning Batch">Weekend Morning Batch (10:00 AM)</option>
                <option value="Custom Event Date (Notify Hellen)">Custom Event Date (Confirm on WhatsApp)</option>
              </select>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-2.5 pt-3 border-t border-purple-100 text-xs">
              <div className="flex justify-between text-purple-800">
                <span>Items Subtotal</span>
                <span className="font-semibold">{formatZMW(subtotal)}</span>
              </div>

              {/* 20% Website Discount Row */}
              <div className="flex justify-between text-emerald-700 font-bold bg-emerald-50/80 p-2 rounded-xl border border-emerald-200/80">
                <span className="flex items-center gap-1">
                  <Percent className="w-3.5 h-3.5" />
                  Website Order Discount (20%)
                </span>
                <span>-{formatZMW(websiteDiscount)}</span>
              </div>

              <div className="flex justify-between text-purple-800">
                <span>Delivery Carrier ({deliveryProvider === 'yango' ? 'Yango Deli' : 'Platinum Carrier'})</span>
                <span className="font-medium text-purple-500 italic">
                  Standard rates apply
                </span>
              </div>

              <div className="flex justify-between items-baseline pt-3 border-t border-purple-200 text-purple-950 font-bold">
                <span className="text-base">Discounted Order Total</span>
                <div className="text-right">
                  <span className="text-2xl font-serif text-pink-600">
                    {formatZMW(total)}
                  </span>
                  <div className="text-[10px] text-purple-400 font-normal">
                    Zambian Kwacha (ZMW)
                  </div>
                </div>
              </div>
            </div>

            {/* Checkout Action with Authentication Enforcement */}
            {isLoggedIn ? (
              <button
                type="button"
                onClick={onCheckout}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-800 to-pink-600 hover:from-purple-900 hover:to-pink-700 text-white font-bold text-sm shadow-lg shadow-pink-500/20 active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Place Order with Hellen</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCheckoutClick}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-900 via-purple-800 to-pink-600 hover:brightness-105 text-white font-bold text-sm shadow-lg shadow-purple-900/20 active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>Log In / Create Account to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {/* Trust footer */}
            <div className="pt-2 text-[11px] text-purple-400 text-center flex items-center justify-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-pink-500" />
              <span>Baked fresh to order • Dispatched via safe courier</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useRouter } from '../context/RouterContext';
import { formatZMW, getMinQuantity } from '../types/bakery';
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Sparkles,
  ArrowRight,
  Truck,
  AlertCircle,
  Percent,
  Lock
} from 'lucide-react';

interface CartDrawerProps {
  onCheckout: () => void;
}

export function CartDrawer({ onCheckout }: CartDrawerProps) {
  const router = useRouter();
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
    totalItems,
    subtotal,
    websiteDiscount,
    websiteDiscountPercent,
    total,
    deliveryProvider,
    setDeliveryProvider,
    minQuantityNotice,
  } = useCart();
  const { isLoggedIn, requireAuth } = useAuth();

  if (!isCartOpen) return null;

  const handleGoToCart = () => {
    closeCart();
    router.push('/cart');
  };

  const handleCheckoutClick = () => {
    closeCart();
    requireAuth(() => {
      onCheckout();
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-purple-950/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-pink-100 animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 border-b border-purple-100 flex items-center justify-between bg-purple-50/50">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-700 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-serif text-lg font-bold text-purple-950">
                  Your Order Basket ({totalItems})
                </h2>
                <p className="text-[10px] text-pink-600 font-medium">
                  Cake Elegancy • Order-Only
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={closeCart}
              className="p-2 rounded-full text-purple-400 hover:text-purple-700 hover:bg-purple-100/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Automatic 20% Website Discount Highlight */}
          <div className="bg-gradient-to-r from-purple-900 to-pink-600 text-white px-5 py-2.5 text-xs flex items-center justify-between shadow-xs">
            <span className="flex items-center gap-1.5 font-bold">
              <Sparkles className="w-3.5 h-3.5 text-pink-200" />
              <span>Website Order Discount</span>
            </span>
            <span className="bg-white/20 text-white px-2 py-0.5 rounded-full text-[11px] font-extrabold tracking-wider">
              20% OFF APPLIED
            </span>
          </div>

          {/* Notice banner for minimum quantity if triggered */}
          {minQuantityNotice && (
            <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-xs text-amber-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{minQuantityNotice}</span>
            </div>
          )}

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-20 h-20 rounded-full bg-pink-50 flex items-center justify-center text-pink-400">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <h3 className="font-serif text-xl font-bold text-purple-950">
                  Your basket is empty
                </h3>
                <p className="text-purple-900/60 text-xs max-w-xs leading-relaxed">
                  Explore Hellen's freshly baked celebration cakes, scones, muffins, or cupcakes.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    closeCart();
                    router.push('/products');
                  }}
                  className="bg-gradient-to-r from-purple-900 to-pink-600 text-white px-6 py-2.5 rounded-full text-xs font-semibold shadow-md hover:brightness-105 transition-all"
                >
                  Explore Bakery Menu
                </button>
              </div>
            ) : (
              items.map((item) => {
                const minQty = getMinQuantity(item.product.category);
                return (
                  <div
                    key={item.id}
                    className="flex gap-3.5 p-3 rounded-2xl bg-purple-50/40 border border-purple-100/70 hover:border-pink-200 transition-colors"
                  >
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-18 h-18 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-serif text-sm font-bold text-purple-950 truncate">
                            {item.product.name}
                          </h4>
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="text-purple-400 hover:text-pink-600 p-1 transition-colors"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Customization Details */}
                        <div className="text-[11px] text-purple-800/80 space-y-0.5 mt-0.5">
                          {item.selectedSize && (
                            <div>Size: <span className="font-semibold text-purple-950">{item.selectedSize}</span></div>
                          )}
                          {item.selectedFlavor && (
                            <div>Flavor: <span className="font-semibold text-purple-950">{item.selectedFlavor}</span></div>
                          )}
                          {item.customMessage && (
                            <div className="text-pink-700 italic truncate max-w-48">
                              "{item.customMessage}"
                            </div>
                          )}
                          {minQty > 1 && (
                            <div className="text-[10px] text-purple-500">
                              (Min. order {minQty} pcs)
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-1">
                        <span className="font-bold text-purple-950 text-sm font-serif">
                          {formatZMW(item.unitPrice * item.quantity)}
                        </span>

                        {/* Quantity Controls */}
                        <div className="flex items-center bg-white border border-purple-200 rounded-full px-2 py-0.5 shadow-xs">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-purple-600 hover:text-pink-600 p-1"
                            title={item.quantity <= minQty ? `Minimum is ${minQty}` : 'Decrease'}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-purple-950 px-2 min-w-5 text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-purple-600 hover:text-pink-600 p-1"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Delivery & Checkout Area */}
          {items.length > 0 && (
            <div className="p-5 border-t border-purple-100 bg-white space-y-3.5">
              {/* Delivery Service Selection in Drawer */}
              <div className="p-3 bg-purple-50/70 rounded-2xl border border-purple-100 text-xs space-y-1.5">
                <span className="font-bold text-purple-950 flex items-center gap-1.5 text-[11px]">
                  <Truck className="w-3.5 h-3.5 text-pink-600" />
                  Select Delivery Service:
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setDeliveryProvider('yango')}
                    className={`p-2 rounded-xl border text-[11px] text-left transition-all ${
                      deliveryProvider === 'yango'
                        ? 'border-purple-800 bg-white text-purple-950 font-bold shadow-xs'
                        : 'border-purple-200/70 text-purple-700 hover:bg-white'
                    }`}
                  >
                    <div>Yango Deli</div>
                    <div className="text-[10px] text-purple-500">Lusaka local</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryProvider('platinum')}
                    className={`p-2 rounded-xl border text-[11px] text-left transition-all ${
                      deliveryProvider === 'platinum'
                        ? 'border-purple-800 bg-white text-purple-950 font-bold shadow-xs'
                        : 'border-purple-200/70 text-purple-700 hover:bg-white'
                    }`}
                  >
                    <div>Platinum Carrier</div>
                    <div className="text-[10px] text-purple-500">Country-wide</div>
                  </button>
                </div>
                <p className="text-[10px] text-purple-500 italic">
                  *Standard carrier rates apply and are calculated upon dispatch.
                </p>
              </div>

              {/* Price Breakdown with 20% discount */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-purple-800">
                  <span>Subtotal</span>
                  <span className="font-semibold">{formatZMW(subtotal)}</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span className="flex items-center gap-1">
                    <Percent className="w-3 h-3" />
                    Website Order Discount (20%)
                  </span>
                  <span>-{formatZMW(websiteDiscount)}</span>
                </div>
                <div className="flex justify-between text-purple-950 font-bold text-sm pt-2 border-t border-purple-100">
                  <span>Discounted Total</span>
                  <span className="text-base text-pink-600 font-serif">{formatZMW(total)}</span>
                </div>
              </div>

              {/* Auth Notice if not logged in */}
              {!isLoggedIn && (
                <div className="p-2.5 rounded-xl bg-pink-50 border border-pink-200 text-[11px] text-pink-900 flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-pink-600 shrink-0" />
                  <span>Log in or create an account to finalize your order.</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={handleGoToCart}
                  className="w-full bg-purple-100/80 hover:bg-purple-200 text-purple-900 py-3 rounded-2xl font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  View Full Cart
                </button>
                <button
                  type="button"
                  onClick={handleCheckoutClick}
                  className="w-full bg-gradient-to-r from-purple-900 to-pink-600 text-white py-3 rounded-2xl font-semibold text-xs shadow-md hover:brightness-105 active:scale-98 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>{isLoggedIn ? 'Checkout' : 'Login & Checkout'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

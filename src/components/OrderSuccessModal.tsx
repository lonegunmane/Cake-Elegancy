import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useRouter } from '../context/RouterContext';
import { formatZMW } from '../types/bakery';
import { CheckCircle2, Sparkles, Truck, Clock, ArrowRight, MessageCircle } from 'lucide-react';

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OrderSuccessModal({ isOpen, onClose }: OrderSuccessModalProps) {
  const { items, total, websiteDiscount, deliveryProvider, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [orderNumber] = useState(() => `CE-${Math.floor(100000 + Math.random() * 900000)}`);
  const [savedOrder, setSavedOrder] = useState<{
    items: typeof items;
    total: number;
    websiteDiscount: number;
    deliveryProvider: string;
    userName?: string;
  } | null>(null);

  useEffect(() => {
    if (isOpen) {
      setSavedOrder({
        items: [...items],
        total,
        websiteDiscount,
        deliveryProvider,
        userName: user?.name,
      });

      try {
        confetti({
          particleCount: 110,
          spread: 75,
          origin: { y: 0.6 },
          colors: ['#9333EA', '#EC4899', '#F472B6', '#C084FC', '#FDF2F8'],
        });
      } catch (e) {
        // ignore
      }
    }
  }, [isOpen, user]);

  if (!isOpen || !savedOrder) return null;

  const handleFinish = () => {
    clearCart();
    onClose();
    router.push('/');
  };

  const deliveryName = savedOrder.deliveryProvider === 'yango'
    ? 'Yango Deli (Lusaka Local Delivery)'
    : 'Platinum Carrier Services (Country-wide Delivery)';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-purple-950/70 dark:bg-black/80 backdrop-blur-xs transition-opacity"
        onClick={handleFinish}
      />

      <div className="relative bg-white dark:bg-[#1E0B36] text-purple-950 dark:text-purple-100 rounded-3xl max-w-lg w-full p-6 sm:p-8 overflow-hidden shadow-2xl border border-pink-100 dark:border-purple-800 z-10 text-center animate-in zoom-in-95 duration-300">
        {/* Celebration Header */}
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-pink-500 to-purple-800 text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-pink-500/30">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <span className="text-xs font-bold text-pink-600 dark:text-pink-400 uppercase tracking-widest flex items-center justify-center gap-1.5 mb-1">
          <Sparkles className="w-3.5 h-3.5" /> Order Placed With Love
        </span>

        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-purple-950 dark:text-white">
          Thank You{savedOrder.userName ? `, ${savedOrder.userName}` : ''}!
        </h2>

        <p className="text-xs sm:text-sm text-purple-800/80 dark:text-purple-300/80 mt-2 max-w-sm mx-auto">
          Hellen has received your order at Cake Elegancy. We bake strictly fresh on an order-only basis.
        </p>

        {/* Order Info Card */}
        <div className="mt-6 bg-purple-50/70 dark:bg-purple-950/60 rounded-2xl p-4 text-left border border-purple-100 dark:border-purple-800 text-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-purple-100 dark:border-purple-800/60">
            <span className="text-purple-600 dark:text-purple-400 font-medium">Order Number:</span>
            <span className="font-mono font-bold text-purple-950 dark:text-white text-sm">{orderNumber}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-purple-600 dark:text-purple-400 font-medium flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-pink-500" />
              Delivery Partner:
            </span>
            <span className="font-bold text-purple-950 dark:text-white text-right">
              {deliveryName}
            </span>
          </div>

          <p className="text-[11px] text-purple-600 dark:text-purple-400 bg-white dark:bg-purple-900/40 p-2 rounded-xl border border-purple-100 dark:border-purple-800">
            *Delivery fees are billed at standard carrier rates by {savedOrder.deliveryProvider === 'yango' ? 'Yango Deli' : 'Platinum Carrier Services'} upon package handover.
          </p>

          <div className="flex items-center justify-between">
            <span className="text-purple-600 dark:text-purple-400 font-medium flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-pink-500" />
              Estimated Dispatch:
            </span>
            <span className="font-semibold text-purple-950 dark:text-white">
              Freshly dispatched within 24 hours
            </span>
          </div>

          {/* Items Summary preview */}
          <div className="pt-2 border-t border-purple-100 dark:border-purple-800/60">
            <p className="font-bold text-purple-950 dark:text-white mb-1.5">Your Selected Treats:</p>
            <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
              {savedOrder.items.map((it) => (
                <div key={it.id} className="flex justify-between text-purple-900 dark:text-purple-200 text-[11px]">
                  <span className="truncate max-w-[220px]">
                    {it.quantity}x {it.product.name}
                    {it.selectedSize ? ` (${it.selectedSize})` : ''}
                  </span>
                  <span className="font-semibold text-purple-950 dark:text-white font-serif">
                    {formatZMW(it.unitPrice * it.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Website discount preview */}
          <div className="pt-2 border-t border-purple-100 dark:border-purple-800/60 flex justify-between text-emerald-700 dark:text-emerald-400 font-bold">
            <span>Website Discount (20%):</span>
            <span>-{formatZMW(savedOrder.websiteDiscount)}</span>
          </div>

          <div className="flex justify-between pt-2 border-t border-purple-200 dark:border-purple-800 text-sm font-bold text-purple-950 dark:text-white">
            <span>Discounted Order Total:</span>
            <span className="text-pink-600 dark:text-pink-400 font-serif text-base">{formatZMW(savedOrder.total)}</span>
          </div>
        </div>

        {/* WhatsApp Direct Chat for custom followups */}
        <div className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800 text-left flex items-center justify-between gap-2">
          <div className="text-xs text-emerald-900 dark:text-emerald-200">
            <span className="font-bold block">Need cake custom adjustments?</span>
            <span className="text-[11px] text-emerald-700 dark:text-emerald-400">Chat directly with Hellen on WhatsApp</span>
          </div>
          <a
            href={`https://wa.me/260971603384?text=Hello%20Hellen,%20I%20just%20placed%20order%20${orderNumber}%20at%20Cake%20Elegancy!`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-xl text-xs font-bold transition-colors shrink-0 flex items-center gap-1.5"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp Hellen</span>
          </a>
        </div>

        {/* CTA */}
        <button
          type="button"
          onClick={handleFinish}
          className="mt-6 w-full bg-gradient-to-r from-purple-800 to-pink-600 text-white py-3.5 rounded-2xl font-bold text-sm shadow-md hover:brightness-105 transition-all flex items-center justify-center gap-2 active:scale-98"
        >
          <span>Continue Exploring Paradise</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

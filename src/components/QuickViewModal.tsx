import React, { useState, useEffect } from 'react';
import { Product, formatZMW, getMinQuantity } from '../types/bakery';
import { useCart } from '../context/CartContext';
import { useRouter } from '../context/RouterContext';
import { X, Star, Plus, Minus, ShoppingBag, Sparkles, Check, ArrowRight, AlertCircle } from 'lucide-react';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const router = useRouter();
  const { addToCart } = useCart();

  const minQty = product ? getMinQuantity(product.category) : 1;

  const [quantity, setQuantity] = useState(1);
  const [selectedSizeId, setSelectedSizeId] = useState<string>('');
  const [selectedFlavorId, setSelectedFlavorId] = useState<string>('');
  const [customMessage, setCustomMessage] = useState('');
  const [justAdded, setJustAdded] = useState(false);
  const [minWarning, setMinWarning] = useState(false);

  useEffect(() => {
    if (product) {
      const initialMin = getMinQuantity(product.category);
      setQuantity(initialMin);
      setSelectedSizeId(product.sizeOptions?.[0]?.id || '');
      setSelectedFlavorId(product.flavorOptions?.[0]?.id || '');
      setCustomMessage('');
      setJustAdded(false);
      setMinWarning(false);
    }
  }, [product]);

  if (!product) return null;

  const currentSize = product.sizeOptions?.find(s => s.id === selectedSizeId);
  const currentFlavor = product.flavorOptions?.find(f => f.id === selectedFlavorId);

  const calculatedUnitPrice = product.price + (currentSize?.priceDelta || 0);

  const handleDecrement = () => {
    if (quantity <= minQty) {
      setMinWarning(true);
      setTimeout(() => setMinWarning(false), 2500);
      return;
    }
    setQuantity(quantity - 1);
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    addToCart({
      product,
      quantity,
      selectedSize: currentSize?.name,
      selectedFlavor: currentFlavor?.name,
      customMessage: customMessage.trim() || undefined,
      unitPrice: calculatedUnitPrice,
    });

    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      onClose();
    }, 1200);
  };

  const handleFullDetailView = () => {
    onClose();
    router.push(`/product/${product.id}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-purple-950/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-pink-100 z-10 animate-in zoom-in-95 duration-200">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-purple-900 hover:text-pink-600 shadow-sm transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image */}
          <div className="relative aspect-square md:aspect-auto bg-purple-50">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.dietaryTags.length > 0 && (
              <div className="absolute top-4 left-4 flex flex-wrap gap-1">
                {product.dietaryTags.slice(0, 2).map(tag => (
                  <span
                    key={tag}
                    className="bg-white/95 text-purple-900 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            {minQty > 1 && (
              <div className="absolute bottom-4 left-4 bg-purple-900 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                Minimum Order: {minQty} pieces
              </div>
            )}
          </div>

          {/* Details & Controls */}
          <div className="p-6 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-pink-600 uppercase tracking-widest">
                  {product.category}
                </span>
                <h3 className="font-serif text-xl font-bold text-purple-950 mt-1">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mt-1 text-xs">
                  <div className="flex items-center gap-1 text-amber-500 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{product.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-purple-300">•</span>
                  <span className="text-purple-500">{product.reviewsCount} reviews</span>
                </div>
              </div>

              <p className="text-xs text-purple-900/70 leading-relaxed">
                {product.shortDescription}
              </p>

              {/* Price in ZMW */}
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-purple-950 font-serif">
                  {formatZMW(calculatedUnitPrice)}
                </span>
                <span className="text-xs text-purple-500">
                  {product.category === 'cakes' ? 'base price' : 'per piece'}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-purple-400 line-through">
                    {formatZMW(product.originalPrice + (currentSize?.priceDelta || 0))}
                  </span>
                )}
              </div>

              {/* Size Options (Cakes) */}
              {product.sizeOptions && product.sizeOptions.length > 0 && (
                <div>
                  <label className="block text-xs font-bold text-purple-950 mb-1.5">
                    Select Cake Size:
                  </label>
                  <div className="space-y-1.5">
                    {product.sizeOptions.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSelectedSizeId(opt.id)}
                        className={`w-full text-left p-2.5 rounded-xl border text-xs flex items-center justify-between transition-all ${
                          selectedSizeId === opt.id
                            ? 'border-purple-800 bg-purple-50/80 text-purple-950 font-semibold'
                            : 'border-purple-100 hover:border-purple-300 text-purple-800'
                        }`}
                      >
                        <div>
                          <span>{opt.name}</span>
                          {opt.serves && (
                            <span className="text-[10px] text-purple-500 ml-1.5 font-normal">
                              ({opt.serves})
                            </span>
                          )}
                        </div>
                        <span className="font-bold text-pink-600">
                          {opt.priceDelta > 0 ? `+${formatZMW(opt.priceDelta)}` : 'Standard'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Flavor Options */}
              {product.flavorOptions && product.flavorOptions.length > 0 && (
                <div>
                  <label className="block text-xs font-bold text-purple-950 mb-1.5">
                    Flavor Profile:
                  </label>
                  <div className="grid grid-cols-1 gap-1.5">
                    {product.flavorOptions.map((flav) => (
                      <button
                        key={flav.id}
                        type="button"
                        onClick={() => setSelectedFlavorId(flav.id)}
                        className={`text-left p-2 rounded-xl border text-xs transition-all ${
                          selectedFlavorId === flav.id
                            ? 'border-pink-500 bg-pink-50/80 text-purple-950 font-semibold'
                            : 'border-purple-100 hover:border-pink-200 text-purple-800'
                        }`}
                      >
                        <div>{flav.name}</div>
                        {flav.description && (
                          <div className="text-[10px] text-purple-400 font-normal">
                            {flav.description}
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Custom message for cakes */}
              {product.allowsCustomMessage && (
                <div>
                  <label className="block text-xs font-bold text-purple-950 mb-1">
                    Custom Piping Inscription (Optional):
                  </label>
                  <input
                    type="text"
                    maxLength={35}
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    placeholder="e.g. Happy 30th Birthday Sarah! 🎉"
                    className="w-full bg-purple-50/50 border border-purple-200 rounded-xl px-3 py-2 text-xs text-purple-950 placeholder-purple-400 focus:outline-none focus:ring-1 focus:ring-pink-500"
                  />
                  <span className="text-[10px] text-purple-400 text-right block mt-0.5">
                    {35 - customMessage.length} characters left
                  </span>
                </div>
              )}

              {/* Minimum quantity alert */}
              {minWarning && (
                <div className="p-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-[11px] flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>Minimum order is {minQty} pieces.</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="pt-6 mt-4 border-t border-purple-100 space-y-3">
              <div className="flex items-center justify-between gap-4">
                {/* Quantity */}
                <div className="flex items-center border border-purple-200 rounded-2xl bg-purple-50/40 px-3 py-1.5">
                  <button
                    type="button"
                    onClick={handleDecrement}
                    className="text-purple-600 hover:text-pink-600 p-1"
                    title={quantity <= minQty ? `Minimum is ${minQty}` : 'Decrease'}
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-sm font-bold text-purple-950 px-3 min-w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={handleIncrement}
                    className="text-purple-600 hover:text-pink-600 p-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to Cart button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={justAdded}
                  className={`flex-1 py-3 px-4 rounded-2xl text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 active:scale-98 ${
                    justAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gradient-to-r from-purple-800 to-pink-600 text-white hover:brightness-105'
                  }`}
                >
                  {justAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Basket!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Basket • {formatZMW(calculatedUnitPrice * quantity)}</span>
                    </>
                  )}
                </button>
              </div>

              {/* View full page */}
              <button
                type="button"
                onClick={handleFullDetailView}
                className="w-full text-center text-xs font-semibold text-purple-600 hover:text-pink-600 py-1 transition-colors flex items-center justify-center gap-1"
              >
                <span>View Full Product Details & Options</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

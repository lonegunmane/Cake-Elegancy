import React, { useState, useEffect } from 'react';
import { getProductById, getProductsByCategory } from '../data/products';
import { Product, formatZMW, getMinQuantity } from '../types/bakery';
import { useCart } from '../context/CartContext';
import { Link, useRouter } from '../context/RouterContext';
import { ProductCard } from '../components/ProductCard';
import {
  Star,
  ShoppingBag,
  Plus,
  Minus,
  Check,
  Sparkles,
  ShieldAlert,
  ChevronRight,
  Clock,
  Heart,
  Share2,
  PackageCheck,
  Utensils,
  MessageCircle,
  Truck,
  AlertCircle,
  Percent
} from 'lucide-react';

interface ProductDetailPageProps {
  productId: string;
  onQuickView: (product: Product) => void;
}

export function ProductDetailPage({ productId, onQuickView }: ProductDetailPageProps) {
  const router = useRouter();
  const { addToCart } = useCart();

  const product = getProductById(productId);

  const minQty = product ? getMinQuantity(product.category) : 1;

  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState(minQty);
  const [selectedSizeId, setSelectedSizeId] = useState<string>('');
  const [selectedFlavorId, setSelectedFlavorId] = useState<string>('');
  const [customMessage, setCustomMessage] = useState('');
  const [candlesAddon, setCandlesAddon] = useState(false);
  const [giftNoteAddon, setGiftNoteAddon] = useState(false);
  const [giftNoteText, setGiftNoteText] = useState('');
  const [activeTab, setActiveTab] = useState<'ingredients' | 'allergens' | 'storage'>('ingredients');
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [minWarning, setMinWarning] = useState(false);

  useEffect(() => {
    if (product) {
      const initialMin = getMinQuantity(product.category);
      setSelectedImage(product.imageUrl);
      setQuantity(initialMin);
      setSelectedSizeId(product.sizeOptions?.[0]?.id || '');
      setSelectedFlavorId(product.flavorOptions?.[0]?.id || '');
      setCustomMessage('');
      setCandlesAddon(false);
      setGiftNoteAddon(false);
      setGiftNoteText('');
      setAddedSuccess(false);
      setMinWarning(false);
    }
  }, [productId, product]);

  if (!product) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-4 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center mx-auto font-serif text-2xl font-bold">
          ?
        </div>
        <h2 className="font-serif text-2xl font-bold text-purple-950">
          Treat Not Found
        </h2>
        <p className="text-sm text-purple-800/70">
          We couldn’t find the delicious item you were looking for. It may be an exclusive off-menu order.
        </p>
        <Link
          href="/products"
          className="inline-block px-6 py-3 rounded-full bg-purple-900 text-white font-bold text-xs hover:bg-purple-950 transition-colors"
        >
          Browse All Treats
        </Link>
      </div>
    );
  }

  const currentSize = product.sizeOptions?.find(s => s.id === selectedSizeId);
  const currentFlavor = product.flavorOptions?.find(f => f.id === selectedFlavorId);

  // Add-ons in ZMW (candles = K 35, handwritten note = K 25)
  const addonPrice = (candlesAddon ? 35.0 : 0) + (giftNoteAddon ? 25.0 : 0);
  const unitPrice = product.price + (currentSize?.priceDelta || 0) + addonPrice;

  const handleDecrement = () => {
    if (quantity <= minQty) {
      setMinWarning(true);
      setTimeout(() => setMinWarning(false), 3000);
      return;
    }
    setQuantity(quantity - 1);
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    let combinedMessage = customMessage.trim();
    if (giftNoteAddon && giftNoteText.trim()) {
      combinedMessage += (combinedMessage ? ' | Gift Note: ' : 'Gift Note: ') + giftNoteText.trim();
    }
    if (candlesAddon) {
      combinedMessage += (combinedMessage ? ' | ' : '') + '+ Gold Sparkler Candles';
    }

    addToCart({
      product,
      quantity,
      selectedSize: currentSize?.name,
      selectedFlavor: currentFlavor?.name,
      customMessage: combinedMessage || undefined,
      unitPrice,
    });

    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const relatedProducts = getProductsByCategory(product.category)
    .filter(p => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="space-y-16 pb-20">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-purple-500 font-medium pt-2">
        <Link href="/" className="hover:text-pink-600 transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-purple-300" />
        <Link href={`/${product.category}`} className="capitalize hover:text-pink-600 transition-colors">
          {product.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-purple-300" />
        <span className="text-purple-950 font-bold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative rounded-3xl overflow-hidden bg-white border border-pink-100 shadow-md aspect-4/3 sm:aspect-16/11">
            <img
              src={selectedImage || product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-300"
            />

            {/* Inscription live preview badge */}
            {customMessage && (
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-pink-200 shadow-lg flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-pink-500 shrink-0" />
                <div className="min-w-0">
                  <div className="text-[10px] uppercase font-bold text-pink-600 tracking-wider">
                    Hand-Piped Inscription Preview
                  </div>
                  <div className="text-sm font-serif font-bold text-purple-950 truncate italic">
                    "{customMessage}"
                  </div>
                </div>
              </div>
            )}

            {/* Diet & Min Quantity badges */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
              {minQty > 1 && (
                <span className="bg-purple-900 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  Min. Order: 6 pieces
                </span>
              )}
              {product.dietaryTags.map(tag => (
                <span
                  key={tag}
                  className="bg-white/95 text-purple-900 text-xs font-bold px-3 py-1 rounded-full shadow-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Thumbnails */}
          {product.secondaryImageUrl && (
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setSelectedImage(product.imageUrl)}
                className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                  selectedImage === product.imageUrl ? 'border-purple-800 scale-102 shadow-sm' : 'border-purple-100 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={product.imageUrl} alt="" className="w-full h-full object-cover" />
              </button>
              <button
                type="button"
                onClick={() => setSelectedImage(product.secondaryImageUrl!)}
                className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                  selectedImage === product.secondaryImageUrl ? 'border-purple-800 scale-102 shadow-sm' : 'border-purple-100 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={product.secondaryImageUrl} alt="" className="w-full h-full object-cover" />
              </button>
            </div>
          )}

          {/* Highlights & Delivery Partners */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-purple-50/60 border border-purple-100 flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-pink-600 shrink-0" />
              <div>
                <div className="font-bold text-purple-950">Preparation</div>
                <div className="text-purple-500">{product.prepTime || 'Baked fresh to order'}</div>
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-purple-50/60 border border-purple-100 flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-pink-600 shrink-0" />
              <div>
                <div className="font-bold text-purple-950">Lusaka Delivery</div>
                <div className="text-purple-500">Yango Deli standard rates</div>
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-purple-50/60 border border-purple-100 flex items-center gap-2.5">
              <PackageCheck className="w-4 h-4 text-pink-600 shrink-0" />
              <div>
                <div className="font-bold text-purple-950">Country-wide</div>
                <div className="text-purple-500">Platinum Carrier Services</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Customization & Purchase Box */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-md space-y-6">
          {/* Header & Title */}
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-pink-600 uppercase tracking-widest">
                {product.category}
              </span>
              <button
                type="button"
                onClick={handleShare}
                className="text-xs text-purple-500 hover:text-pink-600 flex items-center gap-1 font-medium transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
              </button>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-purple-950 mt-1">
              {product.name}
            </h1>

            {/* Rating & Order-Only Badge */}
            <div className="flex items-center gap-3 mt-2 text-xs">
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{product.rating.toFixed(1)}</span>
              </div>
              <span className="text-purple-300">•</span>
              <span className="text-purple-600 font-medium">{product.reviewsCount} reviews</span>
              <span className="text-purple-300">•</span>
              <span className="text-purple-900 bg-purple-50 px-2 py-0.5 rounded-full font-semibold">
                Order-Only
              </span>
            </div>

            {/* Price in Zambian Kwacha (ZMW) */}
            <div className="flex items-baseline gap-2 mt-4">
              <span className="font-serif text-3xl font-bold text-purple-950">
                {formatZMW(unitPrice)}
              </span>
              <span className="text-xs text-purple-500">
                {product.category === 'cakes' ? 'per cake' : 'per piece'}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-purple-400 line-through">
                  {formatZMW(product.originalPrice + (currentSize?.priceDelta || 0))}
                </span>
              )}
            </div>

            {/* 20% Discount Callout */}
            <div className="mt-2.5 p-2 rounded-xl bg-pink-50 border border-pink-200 text-xs text-pink-800 font-medium flex items-center gap-2">
              <Percent className="w-4 h-4 text-pink-600 shrink-0" />
              <span>You save 20% on this item automatically when checking out online!</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-purple-900/80 leading-relaxed border-t border-purple-50 pt-4">
            {product.description}
          </p>

          {/* Size Options (Mandatory for Cakes) */}
          {product.category === 'cakes' && product.sizeOptions && product.sizeOptions.length > 0 && (
            <div className="space-y-2 pt-2">
              <label className="block text-xs font-bold text-purple-950 flex items-center justify-between">
                <span>Select Cake Size (Required):</span>
                <span className="text-pink-600 font-normal">Choose diameter</span>
              </label>
              <div className="grid grid-cols-1 gap-2">
                {product.sizeOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedSizeId(opt.id)}
                    className={`p-3 rounded-2xl border text-xs flex items-center justify-between transition-all ${
                      selectedSizeId === opt.id
                        ? 'border-purple-800 bg-purple-50 text-purple-950 font-bold shadow-xs'
                        : 'border-purple-200/70 hover:border-purple-300 text-purple-800'
                    }`}
                  >
                    <div>
                      <span>{opt.name}</span>
                      {opt.serves && (
                        <span className="text-[11px] text-purple-500 block font-normal mt-0.5">
                          {opt.serves}
                        </span>
                      )}
                    </div>
                    <span className="font-bold text-pink-600 text-sm">
                      {opt.priceDelta > 0 ? `+${formatZMW(opt.priceDelta)}` : 'Standard Base'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Flavor options for cakes */}
          {product.flavorOptions && product.flavorOptions.length > 0 && (
            <div className="space-y-2">
              <label className="block text-xs font-bold text-purple-950">
                Choose Filling & Flavor Profile:
              </label>
              <div className="space-y-1.5">
                {product.flavorOptions.map((flav) => (
                  <button
                    key={flav.id}
                    type="button"
                    onClick={() => setSelectedFlavorId(flav.id)}
                    className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all ${
                      selectedFlavorId === flav.id
                        ? 'border-pink-500 bg-pink-50/70 text-purple-950 font-bold'
                        : 'border-purple-200/70 hover:border-pink-200 text-purple-800'
                    }`}
                  >
                    <div>{flav.name}</div>
                    {flav.description && (
                      <div className="text-[10px] text-purple-500 font-normal">
                        {flav.description}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Custom Message / Inscription for cakes */}
          {product.allowsCustomMessage && (
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-purple-950 flex items-center justify-between">
                <span>Free Cake Inscription (Hand-Piped):</span>
                <span className="text-[10px] text-purple-400 font-normal">Complimentary</span>
              </label>
              <input
                type="text"
                maxLength={35}
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="e.g. Happy 30th Birthday Chola! 🎂"
                className="w-full bg-purple-50/60 border border-purple-200 rounded-2xl px-4 py-2.5 text-xs text-purple-950 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <p className="text-[10px] text-purple-400">
                Hand-piped with royal icing by Hellen prior to delivery.
              </p>
            </div>
          )}

          {/* Optional Celebration Add-ons */}
          <div className="space-y-2 pt-2 border-t border-purple-50">
            <span className="text-xs font-bold text-purple-950 block">Optional Celebration Add-ons:</span>
            <label className="flex items-center gap-2.5 p-2 rounded-xl bg-purple-50/40 border border-purple-100 hover:border-purple-200 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={candlesAddon}
                onChange={(e) => setCandlesAddon(e.target.checked)}
                className="rounded text-pink-600 focus:ring-pink-500"
              />
              <span className="flex-1 font-medium text-purple-900">
                Sparkling Gold Celebration Candles (+ {formatZMW(35.0)})
              </span>
            </label>
            <label className="flex items-center gap-2.5 p-2 rounded-xl bg-purple-50/40 border border-purple-100 hover:border-purple-200 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={giftNoteAddon}
                onChange={(e) => setGiftNoteAddon(e.target.checked)}
                className="rounded text-pink-600 focus:ring-pink-500"
              />
              <span className="flex-1 font-medium text-purple-900">
                Handwritten Calligraphy Gift Card (+ {formatZMW(25.0)})
              </span>
            </label>
            {giftNoteAddon && (
              <textarea
                rows={2}
                value={giftNoteText}
                onChange={(e) => setGiftNoteText(e.target.value)}
                placeholder="Write your personal gift message here..."
                className="w-full bg-purple-50/60 border border-purple-200 rounded-xl p-2.5 text-xs text-purple-950 placeholder-purple-400 focus:outline-none focus:ring-1 focus:ring-pink-500"
              />
            )}
          </div>

          {/* Minimum Quantity Warning */}
          {minWarning && (
            <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Minimum order for {product.category} is {minQty} pieces.</span>
            </div>
          )}

          {/* Quantity & Add to Cart */}
          <div className="space-y-3 pt-4 border-t border-purple-100">
            <div className="flex items-center justify-between text-xs text-purple-600 font-medium">
              <span>Order Quantity:</span>
              <span>{product.category === 'cakes' ? 'Min. 1 cake' : 'Min. 6 pieces'}</span>
            </div>

            <div className="flex items-center gap-3">
              {/* Quantity selector */}
              <div className="flex items-center border border-purple-200 rounded-2xl bg-purple-50/60 px-3 py-2">
                <button
                  type="button"
                  onClick={handleDecrement}
                  className="text-purple-700 hover:text-pink-600 p-1"
                  title={quantity <= minQty ? `Minimum is ${minQty}` : 'Decrease'}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-sm font-bold text-purple-950 px-4 min-w-8 text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={handleIncrement}
                  className="text-purple-700 hover:text-pink-600 p-1"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={addedSuccess}
                className={`flex-1 py-3.5 px-6 rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-98 ${
                  addedSuccess
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gradient-to-r from-purple-800 to-pink-600 hover:from-purple-900 hover:to-pink-700 text-white hover:shadow-lg'
                }`}
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Basket!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Basket • {formatZMW(unitPrice * quantity)}</span>
                  </>
                )}
              </button>
            </div>

            {/* Direct WhatsApp Consultation */}
            <a
              href={`https://wa.me/260971603384?text=Hello%20Hellen,%20I%20am%20interested%20in%20ordering%20the%20${encodeURIComponent(product.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Have custom design ideas? Chat with Hellen on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Product Details Tabs (Ingredients, Allergens, Storage) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-xs">
        <div className="flex border-b border-purple-100 gap-4 sm:gap-8 pb-3">
          <button
            type="button"
            onClick={() => setActiveTab('ingredients')}
            className={`font-serif text-sm sm:text-base font-bold pb-2 relative transition-colors ${
              activeTab === 'ingredients'
                ? 'text-purple-950 border-b-2 border-pink-500'
                : 'text-purple-400 hover:text-purple-800'
            }`}
          >
            Artisan Ingredients
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('allergens')}
            className={`font-serif text-sm sm:text-base font-bold pb-2 relative transition-colors ${
              activeTab === 'allergens'
                ? 'text-purple-950 border-b-2 border-pink-500'
                : 'text-purple-400 hover:text-purple-800'
            }`}
          >
            Allergen Notice
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('storage')}
            className={`font-serif text-sm sm:text-base font-bold pb-2 relative transition-colors ${
              activeTab === 'storage'
                ? 'text-purple-950 border-b-2 border-pink-500'
                : 'text-purple-400 hover:text-purple-800'
            }`}
          >
            Delivery & Storage Care
          </button>
        </div>

        <div className="pt-5 text-xs sm:text-sm text-purple-900/80 leading-relaxed">
          {activeTab === 'ingredients' && (
            <div>
              <p className="mb-3">
                Hellen's recipes use uncompromised, gourmet baking ingredients:
              </p>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ing, i) => (
                  <span
                    key={i}
                    className="bg-purple-50 text-purple-900 border border-purple-200/80 px-3 py-1.5 rounded-full font-medium text-xs"
                  >
                    ✓ {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'allergens' && (
            <div className="space-y-3">
              <div className="flex items-start gap-2.5 text-amber-800 bg-amber-50/80 border border-amber-200/80 p-4 rounded-2xl">
                <ShieldAlert className="w-5 h-5 shrink-0 text-amber-600 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-bold text-xs">Allergen Notice:</div>
                  <p className="text-xs">
                    Contains: {product.allergens.join(', ')}. Freshly baked in our boutique order-only kitchen.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'storage' && (
            <div className="space-y-2">
              <p>
                <strong>Delivery Handover:</strong> Delivered via Yango Deli (Lusaka local) or Platinum Carrier Services (Country-wide).
              </p>
              <p>
                <strong>For Cakes:</strong> Keep refrigerated until 1 hour prior to serving. Swiss meringue buttercream softens to silky perfection at ambient room temperature.
              </p>
              <p>
                <strong>For Scones & Muffins:</strong> Best served warm on arrival or warmed in a gentle oven for 3 minutes.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Recommendation */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-pink-600 uppercase tracking-widest">
                More From {product.category}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-purple-950 mt-0.5">
                You Might Also Adore
              </h2>
            </div>
            <Link
              href={`/${product.category}`}
              className="text-xs font-bold text-purple-800 hover:text-pink-600 transition-colors"
            >
              View All {product.category} →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard
                key={rel.id}
                product={rel}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { Product, formatZMW, getMinQuantity } from '../types/bakery';
import { Link, useRouter } from '../context/RouterContext';
import { useCart } from '../context/CartContext';
import { BakeryImage } from './BakeryImage';
import { Star, ShoppingBag, Eye, Check, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const minQty = getMinQuantity(product.category);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // If it's a customizable cake or item needing options, open QuickView or detail page
    if (product.category === 'cakes' && product.sizeOptions && product.sizeOptions.length > 0) {
      if (onQuickView) {
        onQuickView(product);
      } else {
        router.push(`/product/${product.id}`);
      }
      return;
    }

    // Add with proper minimum quantity (6 for scones/muffins/cupcakes)
    addToCart({
      product,
      quantity: minQty,
      unitPrice: product.price,
    });

    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  const primaryBadge = product.dietaryTags.find(t =>
    ['Best Seller', 'Staff Favorite', 'Seasonal', 'Signature'].includes(t)
  );

  return (
    <div className="group bg-white dark:bg-[#1E0B36] rounded-3xl border border-pink-100/80 dark:border-purple-800/60 shadow-xs hover:shadow-xl hover:shadow-purple-900/10 dark:hover:shadow-pink-900/10 transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1">
      {/* Image container */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-purple-50 dark:bg-purple-950/40">
        <Link href={`/product/${product.id}`} className="block w-full h-full">
          <BakeryImage
            src={product.imageUrl}
            alt={product.name}
            category={product.category}
            className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {primaryBadge && (
            <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase shadow-sm ${
              primaryBadge === 'Best Seller'
                ? 'bg-purple-900 dark:bg-purple-800 text-white'
                : primaryBadge === 'Seasonal'
                ? 'bg-pink-500 text-white'
                : 'bg-white/95 dark:bg-purple-900/90 text-purple-900 dark:text-purple-100 border border-purple-200 dark:border-purple-700'
            }`}>
              {primaryBadge}
            </span>
          )}
          {minQty > 1 && (
            <span className="bg-pink-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
              Min. Order: 6 pcs
            </span>
          )}
        </div>

        {/* Quick View Button overlay */}
        <div className="absolute inset-0 bg-purple-950/25 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
          {onQuickView && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView(product);
              }}
              className="pointer-events-auto bg-white/90 dark:bg-purple-900/90 hover:bg-white dark:hover:bg-purple-800 text-purple-900 dark:text-white px-3.5 py-2 rounded-full text-xs font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5 text-pink-500" />
              Quick View
            </button>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-pink-600 dark:text-pink-400 font-semibold uppercase tracking-wider text-[11px]">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-purple-800 dark:text-purple-200 font-medium">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating.toFixed(1)}</span>
              <span className="text-purple-400 dark:text-purple-400/80 text-[11px]">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Title */}
          <Link href={`/product/${product.id}`} className="block group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
            <h3 className="font-serif text-lg font-bold text-purple-950 dark:text-white line-clamp-1 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-purple-900/60 dark:text-purple-300/70 text-xs mt-1.5 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Price & Action */}
        <div className="pt-4 mt-4 border-t border-purple-50 dark:border-purple-800/50 flex items-center justify-between">
          <div>
            <div className="text-[11px] text-purple-400 dark:text-purple-400/80 font-medium">
              {product.category === 'cakes' ? 'Starting at' : 'Per piece'}
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-purple-950 dark:text-white font-serif">
                {formatZMW(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-purple-400 line-through">
                  {formatZMW(product.originalPrice)}
                </span>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={handleQuickAdd}
            className={`px-4 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 shadow-sm active:scale-95 ${
              justAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-purple-50 dark:bg-purple-900/60 text-purple-900 dark:text-purple-100 hover:bg-pink-600 dark:hover:bg-pink-600 hover:text-white border border-purple-200/80 dark:border-purple-700 hover:border-pink-600'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : product.category === 'cakes' ? (
              <>
                <Sparkles className="w-3.5 h-3.5 text-pink-500 group-hover:text-white" />
                <span>Customize</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add {minQty} pcs</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

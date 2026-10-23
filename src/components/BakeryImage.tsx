import React, { useState } from 'react';
import { CategoryType } from '../types/bakery';
import { Cake, Sparkles } from 'lucide-react';

interface BakeryImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  category?: CategoryType;
  className?: string;
}

const CATEGORY_FALLBACKS: Record<CategoryType, string> = {
  cakes: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80',
  scones: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=900&q=80',
  muffins: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&w=900&q=80',
  cupcakes: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=900&q=80',
};

export function BakeryImage({ src, alt, category = 'cakes', className = '', ...props }: BakeryImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasTriedFallback, setHasTriedFallback] = useState(false);
  const [hasFailedCompletely, setHasFailedCompletely] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleError = () => {
    if (!hasTriedFallback) {
      setHasTriedFallback(true);
      setCurrentSrc(CATEGORY_FALLBACKS[category] || CATEGORY_FALLBACKS.cakes);
    } else {
      setHasFailedCompletely(true);
    }
  };

  if (hasFailedCompletely) {
    return (
      <div className={`flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-950/60 dark:to-pink-950/40 p-4 text-center ${className}`}>
        <div className="w-12 h-12 rounded-2xl bg-white/80 dark:bg-purple-900/80 text-pink-600 dark:text-pink-400 flex items-center justify-center shadow-sm mb-2">
          <Cake className="w-6 h-6" />
        </div>
        <span className="text-xs font-serif font-bold text-purple-900 dark:text-purple-200 line-clamp-1">
          {alt}
        </span>
        <span className="text-[10px] text-pink-600 dark:text-pink-400 font-medium flex items-center gap-1 mt-0.5">
          <Sparkles className="w-3 h-3" /> Freshly Baked
        </span>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      onError={handleError}
      onLoad={() => setIsLoaded(true)}
      className={`${className} ${!isLoaded ? 'opacity-85 filter blur-[0.5px]' : 'opacity-100'} transition-opacity duration-300`}
      loading="lazy"
      {...props}
    />
  );
}

import React, { useState, useMemo } from 'react';
import { CategoryType, Product } from '../types/bakery';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { BakeryImage } from '../components/BakeryImage';
import { Link } from '../context/RouterContext';
import {
  ArrowUpDown,
  Search,
  ChevronRight,
  Filter,
  Percent,
  Truck
} from 'lucide-react';

interface CategoryPageProps {
  category?: CategoryType | 'all';
  searchQueryParam?: string;
  onQuickView: (product: Product) => void;
}

export function CategoryPage({ category = 'all', searchQueryParam = '', onQuickView }: CategoryPageProps) {
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [localSearch, setLocalSearch] = useState<string>(searchQueryParam);

  const categoryInfo = category !== 'all' ? CATEGORIES.find(c => c.id === category) : null;

  // Available tags
  const availableTags = ['all', 'Best Seller', 'Nut-Free', 'Staff Favorite', 'Seasonal'];

  const filteredProducts = useMemo(() => {
    let list = category === 'all'
      ? [...PRODUCTS]
      : PRODUCTS.filter(p => p.category === category);

    // Filter by tag
    if (selectedTag !== 'all') {
      list = list.filter(p => p.dietaryTags.includes(selectedTag));
    }

    // Filter by search query
    if (localSearch.trim()) {
      const q = localSearch.toLowerCase().trim();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.ingredients.some(ing => ing.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [category, selectedTag, localSearch, sortBy]);

  return (
    <div className="space-y-8 pb-16">
      {/* Category Hero Banner */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-purple-950 via-purple-900 to-pink-900 text-white p-8 sm:p-12 border border-purple-800 shadow-lg">
        {categoryInfo?.heroImage && (
          <div className="absolute inset-0 opacity-25 mix-blend-overlay">
            <BakeryImage
              src={categoryInfo.heroImage}
              alt={categoryInfo.name}
              category={categoryInfo.id}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="relative z-10 max-w-3xl space-y-3">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-pink-300 font-medium">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-pink-400" />
            <span className="text-white capitalize">
              {category === 'all' ? 'All Treats' : categoryInfo?.name}
            </span>
          </nav>

          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-pink-500 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {category === 'cakes'
                ? 'Minimum Order: 1 Cake'
                : category === 'all'
                ? 'Order-Only Bakery'
                : 'Minimum Order: 6 Pieces'}
            </span>
            <span className="bg-white/20 text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
              <Percent className="w-3 h-3 text-pink-300" />
              20% Off Online Order Applied
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold tracking-tight">
            {category === 'all' ? 'All Fresh Bakery Treats' : categoryInfo?.name}
          </h1>

          <p className="text-sm sm:text-base text-purple-200/90 leading-relaxed max-w-2xl">
            {category === 'all'
              ? 'Browse Hellen\'s complete collection of bespoke celebration cakes, flaky scones, warm muffins, and swirl cupcakes. Baked strictly fresh to order in Lusaka.'
              : categoryInfo?.description}
          </p>

          {/* Category Quick Badges */}
          <div className="flex flex-wrap gap-2 pt-2">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={cat.path}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  category === cat.id
                    ? 'bg-pink-500 text-white shadow-xs'
                    : 'bg-white/10 hover:bg-white/20 text-purple-100'
                }`}
              >
                {cat.name} ({cat.itemCount})
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Filter, Sort & Search Toolbar */}
      <div className="bg-white dark:bg-[#1E0B36] rounded-3xl p-4 sm:p-6 border border-pink-100 dark:border-purple-800/60 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search box inside toolbar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Filter by treat name or ingredient..."
              className="w-full bg-purple-50/60 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-700 rounded-full pl-9 pr-4 py-2 text-xs sm:text-sm text-purple-950 dark:text-purple-100 placeholder-purple-400 focus:outline-none focus:ring-1 focus:ring-pink-500"
            />
            {localSearch && (
              <button
                type="button"
                onClick={() => setLocalSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-400 hover:text-purple-700 dark:hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Dietary Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            <span className="text-xs font-bold text-purple-400 dark:text-purple-300 mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Filter:
            </span>
            {availableTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  selectedTag === tag
                    ? 'bg-purple-900 dark:bg-pink-600 text-white'
                    : 'bg-purple-50 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 hover:bg-pink-50 dark:hover:bg-purple-800 hover:text-pink-600'
                }`}
              >
                {tag === 'all' ? 'All Tags' : tag}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <ArrowUpDown className="w-3.5 h-3.5 text-purple-500 dark:text-purple-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-purple-50/70 dark:bg-purple-950/70 border border-purple-200 dark:border-purple-700 rounded-xl px-3 py-1.5 text-xs font-medium text-purple-950 dark:text-purple-100 focus:outline-none focus:ring-1 focus:ring-pink-500 cursor-pointer"
            >
              <option value="featured">Sort by: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Results summary counter & Delivery Reminder */}
        <div className="text-xs text-purple-500 dark:text-purple-400 flex flex-col sm:flex-row items-start sm:items-center justify-between pt-2 border-t border-purple-50 dark:border-purple-800/60 gap-2">
          <span>
            Showing <strong className="text-purple-950 dark:text-white">{filteredProducts.length}</strong> items in Zambian Kwacha (ZMW)
          </span>
          <div className="flex items-center gap-1.5 text-purple-600 dark:text-purple-300">
            <Truck className="w-3.5 h-3.5 text-pink-600 dark:text-pink-400" />
            <span>Dispatched via Yango Deli or Platinum Carrier</span>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white dark:bg-[#1E0B36] rounded-3xl p-12 text-center border border-pink-100 dark:border-purple-800/60 max-w-lg mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-pink-50 dark:bg-pink-950/40 text-pink-500 flex items-center justify-center mx-auto">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-xl font-bold text-purple-950 dark:text-white">
            No treats match your search
          </h3>
          <p className="text-xs text-purple-800/70 dark:text-purple-300/70">
            We couldn't find any baked goods with your current search or tag filters. Try resetting the filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedTag('all');
              setLocalSearch('');
            }}
            className="px-6 py-2.5 rounded-full bg-purple-900 dark:bg-pink-600 text-white text-xs font-semibold hover:bg-purple-950 dark:hover:bg-pink-700 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      )}
    </div>
  );
}

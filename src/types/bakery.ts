export type CategoryType = 'cakes' | 'scones' | 'muffins' | 'cupcakes';

export type DeliveryProvider = 'yango' | 'platinum';

export interface DeliveryOptionInfo {
  id: DeliveryProvider;
  name: string;
  badge: string;
  description: string;
  coverage: string;
  notes: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  city?: string;
}

export interface ProductSizeOption {
  id: string;
  name: string;
  serves?: string;
  priceDelta: number; // in ZMW
}

export interface ProductFlavorOption {
  id: string;
  name: string;
  description?: string;
  priceDelta?: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: CategoryType;
  price: number; // in ZMW
  originalPrice?: number; // in ZMW
  rating: number;
  reviewsCount: number;
  shortDescription: string;
  description: string;
  ingredients: string[];
  allergens: string[];
  dietaryTags: string[];
  imageUrl: string;
  secondaryImageUrl?: string;
  calories?: string;
  prepTime?: string;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isSeasonal?: boolean;
  sizeOptions?: ProductSizeOption[];
  flavorOptions?: ProductFlavorOption[];
  allowsCustomMessage?: boolean;
  allowsPackSizes?: boolean;
}

export interface CartItem {
  id: string; // Composite unique key
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedFlavor?: string;
  customMessage?: string;
  unitPrice: number; // in ZMW
}

export interface CategoryInfo {
  id: CategoryType;
  name: string;
  path: string;
  tagline: string;
  description: string;
  heroImage: string;
  accentColor: string;
  itemCount: number;
}

/**
 * Returns minimum order quantity for each category
 * Cakes = 1
 * Scones, Muffins, Cupcakes = 6
 */
export function getMinQuantity(category: CategoryType): number {
  return category === 'cakes' ? 1 : 6;
}

/**
 * Consistent Zambian Kwacha (ZMW) currency formatter
 * E.g. K 450.00
 */
export function formatZMW(amount: number): string {
  return `K ${amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

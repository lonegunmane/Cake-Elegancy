import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, Product, DeliveryProvider, getMinQuantity } from '../types/bakery';

interface CartContextType {
  items: CartItem[];
  addToCart: (params: {
    product: Product;
    quantity?: number;
    selectedSize?: string;
    selectedFlavor?: string;
    customMessage?: string;
    unitPrice?: number;
  }) => void;
  updateQuantity: (id: string, quantity: number) => { success: boolean; message?: string };
  removeItem: (id: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  totalItems: number;
  subtotal: number;
  websiteDiscountPercent: number; // 20%
  websiteDiscount: number;
  deliveryProvider: DeliveryProvider;
  setDeliveryProvider: (provider: DeliveryProvider) => void;
  total: number;
  orderNote: string;
  setOrderNote: (note: string) => void;
  lastAddedItem: CartItem | null;
  minQuantityNotice: string | null;
  clearMinQuantityNotice: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('cakeelegancy_cart');
        return saved ? JSON.parse(saved) : [];
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [deliveryProvider, setDeliveryProvider] = useState<DeliveryProvider>('yango');
  const [orderNote, setOrderNote] = useState('');
  const [lastAddedItem, setLastAddedItem] = useState<CartItem | null>(null);
  const [minQuantityNotice, setMinQuantityNotice] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('cakeelegancy_cart', JSON.stringify(items));
    } catch (e) {
      // ignore
    }
  }, [items]);

  const clearMinQuantityNotice = () => setMinQuantityNotice(null);

  const addToCart = ({
    product,
    quantity,
    selectedSize,
    selectedFlavor,
    customMessage,
    unitPrice,
  }: {
    product: Product;
    quantity?: number;
    selectedSize?: string;
    selectedFlavor?: string;
    customMessage?: string;
    unitPrice?: number;
  }) => {
    const minQty = getMinQuantity(product.category);
    // Ensure quantity is at least minimum
    const finalQuantity = Math.max(minQty, quantity || minQty);
    const finalUnitPrice = unitPrice ?? product.price;

    // Unique configuration key
    const configKey = `${product.id}_${selectedSize || 'default'}_${selectedFlavor || 'default'}_${customMessage || ''}`;

    const newItem: CartItem = {
      id: configKey,
      product,
      quantity: finalQuantity,
      selectedSize,
      selectedFlavor,
      customMessage,
      unitPrice: finalUnitPrice,
    };

    setItems(prevItems => {
      const existingIndex = prevItems.findIndex(i => i.id === configKey);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + finalQuantity,
        };
        return updated;
      }
      return [...prevItems, newItem];
    });

    setLastAddedItem(newItem);
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, newQuantity: number): { success: boolean; message?: string } => {
    const targetItem = items.find(i => i.id === id);
    if (!targetItem) return { success: false };

    const minQty = getMinQuantity(targetItem.product.category);

    if (newQuantity <= 0) {
      removeItem(id);
      return { success: true };
    }

    if (newQuantity < minQty) {
      const msg = `Minimum order for ${targetItem.product.category} is ${minQty} pieces.`;
      setMinQuantityNotice(msg);
      setTimeout(() => setMinQuantityNotice(null), 3000);
      return {
        success: false,
        message: msg,
      };
    }

    setItems(prevItems =>
      prevItems.map(item => (item.id === id ? { ...item, quantity: newQuantity } : item))
    );
    return { success: true };
  };

  const removeItem = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  // Automatic 20% website discount on all orders
  const websiteDiscountPercent = 0.20;
  const websiteDiscount = subtotal * websiteDiscountPercent;
  const total = Math.max(0, subtotal - websiteDiscount);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        isCartOpen,
        openCart,
        closeCart,
        totalItems,
        subtotal,
        websiteDiscountPercent,
        websiteDiscount,
        deliveryProvider,
        setDeliveryProvider,
        total,
        orderNote,
        setOrderNote,
        lastAddedItem,
        minQuantityNotice,
        clearMinQuantityNotice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

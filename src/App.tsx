/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { RouterProvider, usePathname } from './context/RouterContext';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { SideDashboard } from './components/SideDashboard';
import { QuickViewModal } from './components/QuickViewModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { AuthModal } from './components/AuthModal';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { Product } from './types/bakery';
import { MessageCircle } from 'lucide-react';

function AppContent() {
  const pathname = usePathname();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isSideDashboardOpen, setIsSideDashboardOpen] = useState(false);

  // Extract query parameter if any
  let searchQuery = '';
  if (typeof window !== 'undefined' && window.location.search) {
    const params = new URLSearchParams(window.location.search);
    searchQuery = params.get('search') || '';
  }

  // Render view depending on pathname
  const renderCurrentPage = () => {
    // 1. Home
    if (pathname === '/' || pathname === '') {
      return <HomePage onQuickView={(prod) => setQuickViewProduct(prod)} />;
    }

    // 2. Specific Category Pages
    if (pathname === '/cakes') {
      return <CategoryPage category="cakes" onQuickView={(prod) => setQuickViewProduct(prod)} />;
    }
    if (pathname === '/scones') {
      return <CategoryPage category="scones" onQuickView={(prod) => setQuickViewProduct(prod)} />;
    }
    if (pathname === '/muffins') {
      return <CategoryPage category="muffins" onQuickView={(prod) => setQuickViewProduct(prod)} />;
    }
    if (pathname === '/cupcakes') {
      return <CategoryPage category="cupcakes" onQuickView={(prod) => setQuickViewProduct(prod)} />;
    }

    // 3. All Products Page
    if (pathname === '/products') {
      return (
        <CategoryPage
          category="all"
          searchQueryParam={searchQuery}
          onQuickView={(prod) => setQuickViewProduct(prod)}
        />
      );
    }

    // 4. Cart Page
    if (pathname === '/cart') {
      return <CartPage onCheckout={() => setIsSuccessModalOpen(true)} />;
    }

    // 5. Product Detail Page: /product/:id or /product/[id]
    if (pathname.startsWith('/product/')) {
      const productId = pathname.replace('/product/', '').split('?')[0].split('/')[0];
      return (
        <ProductDetailPage
          productId={productId}
          onQuickView={(prod) => setQuickViewProduct(prod)}
        />
      );
    }

    // Fallback: Default to home page
    return <HomePage onQuickView={(prod) => setQuickViewProduct(prod)} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF5FF] dark:bg-[#130822] text-purple-950 dark:text-purple-100 relative transition-colors duration-200">
      {/* Sticky Top Navbar - Clicking logo opens Side Dashboard */}
      <Navbar onOpenSideDashboard={() => setIsSideDashboardOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {renderCurrentPage()}
      </main>

      {/* Side Dashboard (Opened solely when clicking the Cake Elegancy logo) */}
      <SideDashboard
        isOpen={isSideDashboardOpen}
        onClose={() => setIsSideDashboardOpen(false)}
      />

      {/* Global Interactive Drawers & Modals */}
      <CartDrawer onCheckout={() => setIsSuccessModalOpen(true)} />
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
      <OrderSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      />
      <AuthModal />

      {/* Floating WhatsApp Action Button */}
      <a
        href="https://wa.me/260971603384?text=Hello%20Hellen,%20I'm%20browsing%20Cake%20Elegancy%20and%20have%20an%20inquiry!"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 font-bold text-xs group"
        title="Chat with Hellen on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
        <span className="hidden sm:inline">Order via WhatsApp</span>
      </a>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider>
        <AuthProvider>
          <CartProvider>
            <AppContent />
          </CartProvider>
        </AuthProvider>
      </RouterProvider>
    </ThemeProvider>
  );
}

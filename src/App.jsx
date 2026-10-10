import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { AuthModal } from './components/AuthModal';
import { LotteryWheel } from './components/LotteryWheel';
import { CartPage } from './pages/CartPage';
import { MemberPage } from './pages/MemberPage';
import { PRODUCTS } from './data/products';
import { ShoppingBag, Plus } from 'lucide-react';

// 商品選購頁面
const ProductListPage = () => {
  const { addToCart } = useCart();

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6">
      <h2 className="text-2xl font-extrabold text-gray-900 mb-6 flex items-center gap-2">
        <ShoppingBag className="w-6 h-6 text-red-600" />
        88shop 精選鮮食與飲品專區
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PRODUCTS.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col justify-between hover:shadow-md transition">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xl font-extrabold text-red-600">NT$ {product.price}</span>
                <button
                  onClick={() => addToCart(product, 1)}
                  className="flex items-center gap-1 px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition"
                >
                  <Plus className="w-4 h-4" /> 加入購物車
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 頂層組裝
function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar onNavigate={setCurrentPage} onOpenAuth={() => setIsAuthOpen(true)} />

      <main className="flex-1">
        {currentPage === 'home' && <ProductListPage />}
        {currentPage === 'products' && <ProductListPage />}
        {currentPage === 'cart' && <CartPage onNavigate={setCurrentPage} onOpenAuth={() => setIsAuthOpen(true)} />}
        {currentPage === 'lottery' && <LotteryWheel onOpenAuth={() => setIsAuthOpen(true)} />}
        {currentPage === 'member' && <MemberPage onNavigate={setCurrentPage} />}
      </main>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

      <footer className="bg-white border-t border-gray-200 py-6 text-center text-xs text-gray-400">
        © 88shop 鮮食便利商店. All rights reserved.
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}
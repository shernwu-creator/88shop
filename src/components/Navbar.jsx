import React, { useState } from 'react';
import { ShoppingCart, User, LogIn, LogOut, Gift, Store, Menu, X, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export const Navbar = ({ onNavigate, onOpenAuth }) => {
  const { currentUser, logout } = useAuth();
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* LOGO */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-extrabold text-xl shadow">
              88
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">
              88<span className="text-red-600">shop</span> 鮮食便利網
            </span>
          </div>

          {/* 導覽連結 */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-700">
            <button onClick={() => onNavigate('home')} className="hover:text-red-600 transition">
              首頁
            </button>
            <button onClick={() => onNavigate('products')} className="hover:text-red-600 transition flex items-center gap-1">
              <ShoppingBag className="w-4 h-4" /> 商品專區
            </button>
            <button onClick={() => onNavigate('lottery')} className="hover:text-red-600 transition flex items-center gap-1 text-amber-600 font-semibold">
              <Gift className="w-4 h-4 animate-bounce" /> 樂透轉轉
            </button>
            <button onClick={() => onNavigate('stores')} className="hover:text-red-600 transition flex items-center gap-1">
              <Store className="w-4 h-4" /> 門市據點
            </button>
          </nav>

          {/* 右側按鈕群（購物車 + 會員登入狀態） */}
          <div className="flex items-center space-x-4">
            {/* 購物車圖示與右上角數量徽章 */}
            <button
              onClick={() => onNavigate('cart')}
              className="relative p-2 text-gray-700 hover:text-red-600 rounded-full hover:bg-gray-100 transition"
              title="購物車"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow animate-scaleIn">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </button>

            {/* 會員登入 / 狀態 */}
            {currentUser ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onNavigate('member')}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                >
                  <User className="w-4 h-4 text-red-600" />
                  <span>{currentUser.account}</span>
                </button>
                <button
                  onClick={logout}
                  className="p-2 text-gray-500 hover:text-red-600 rounded-full hover:bg-gray-100 transition"
                  title="登出"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 shadow-sm transition"
              >
                <LogIn className="w-4 h-4" />
                <span>登入 / 註冊</span>
              </button>
            )}

            {/* 手機版漢堡選單切換 */}
            <button
              className="md:hidden p-2 text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 手機版下拉選單 */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-4 space-y-2">
          <button onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }} className="w-full text-left py-2 text-gray-700">首頁</button>
          <button onClick={() => { onNavigate('products'); setMobileMenuOpen(false); }} className="w-full text-left py-2 text-gray-700">商品專區</button>
          <button onClick={() => { onNavigate('lottery'); setMobileMenuOpen(false); }} className="w-full text-left py-2 text-amber-600 font-bold">樂透轉轉抽獎</button>
          <button onClick={() => { onNavigate('stores'); setMobileMenuOpen(false); }} className="w-full text-left py-2 text-gray-700">門市據點</button>
          {currentUser && (
            <button onClick={() => { onNavigate('member'); setMobileMenuOpen(false); }} className="w-full text-left py-2 text-red-600 font-medium">會員專區</button>
          )}
        </div>
      )}
    </header>
  );
};
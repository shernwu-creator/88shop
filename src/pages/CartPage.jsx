import React from 'react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle2, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export const CartPage = ({ onNavigate, onOpenAuth }) => {
  const { cart, updateQuantity, removeFromCart, checkout, totalPrice, totalItems } = useCart();
  const { currentUser } = useAuth();

  const handleCheckout = () => {
    if (!currentUser) {
      alert('請先登入會員以完成結帳並儲存您的購買商品清單！');
      onOpenAuth();
      return;
    }
    const res = checkout();
    if (res.success) {
      alert(res.message);
      onNavigate('member'); // 導向會員專區查看已購商品
    } else {
      alert(res.message);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto py-16 px-4 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
          <ShoppingCart className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">購物車目前是空的</h2>
        <p className="text-gray-500 mb-6">快去 88shop 挑選美味的便當、鮮食與飲品吧！</p>
        <button
          onClick={() => onNavigate('products')}
          className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition"
        >
          <ShoppingBag className="w-5 h-5" /> 前往購物
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-6 flex items-center gap-2">
        <ShoppingCart className="w-7 h-7 text-red-600" />
        購物車清單 ({totalItems} 件商品)
      </h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
        <div className="divide-y divide-gray-200">
          {cart.map((item) => (
            <div key={item.id} className="p-4 sm:p-6 flex items-center gap-4">
              <img
                src={item.image || 'https://via.placeholder.com/100'}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg border border-gray-100 flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-gray-900 truncate">{item.name}</h3>
                <p className="text-sm text-gray-500">單價：NT$ {item.price}</p>
                <div className="mt-2 flex items-center gap-3">
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-gray-100 text-gray-600 transition"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-3 text-sm font-semibold text-gray-800">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-gray-100 text-gray-600 transition"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-base font-bold text-gray-900">NT$ {item.price * item.quantity}</p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="mt-2 text-sm text-red-500 hover:text-red-700 flex items-center gap-1 transition"
                >
                  <Trash2 className="w-4 h-4" /> 刪除
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 結帳資訊卡 */}
      <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <span className="text-sm text-gray-500">應付總額：</span>
          <span className="text-2xl font-extrabold text-red-600 ml-2">NT$ {totalPrice}</span>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button
            onClick={() => onNavigate('products')}
            className="w-1/2 sm:w-auto px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition"
          >
            繼續挑選
          </button>
          <button
            onClick={handleCheckout}
            className="w-1/2 sm:w-auto px-6 py-2.5 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 shadow flex items-center justify-center gap-2 transition"
          >
            <span>確認結帳</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
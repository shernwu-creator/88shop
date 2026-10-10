import React from 'react';
import { User, Mail, Calendar, Gift, PackageCheck, ShoppingBag, LogOut, Ticket } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const MemberPage = ({ onNavigate }) => {
  const { currentUser, logout } = useAuth();

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto py-16 px-4 text-center">
        <p className="text-gray-600 mb-4">您尚未登入會員。</p>
        <button
          onClick={() => onNavigate('home')}
          className="px-6 py-2.5 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700"
        >
          返回首頁
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      {/* 會員基本資料卡 */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{currentUser.account}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-1">
              <span className="flex items-center gap-1">
                <Mail className="w-4 h-4" /> {currentUser.email}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" /> 加入時間：{currentUser.createdAt}
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            logout();
            onNavigate('home');
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 flex items-center gap-1.5 transition"
        >
          <LogOut className="w-4 h-4" /> 登出帳號
        </button>
      </div>

      {/* 兩欄排版：樂透獎項紀錄 vs 已購商品紀錄 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 樂透轉轉獲獎紀錄 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4 border-b pb-3">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Gift className="w-5 h-5 text-amber-500" />
              樂透抽獎紀錄 & 優惠券
            </h2>
            <button
              onClick={() => onNavigate('lottery')}
              className="text-xs text-red-600 hover:underline flex items-center gap-1"
            >
              再抽一次 <Ticket className="w-3.5 h-3.5" />
            </button>
          </div>

          {!currentUser.lotteryRewards || currentUser.lotteryRewards.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <Gift className="w-10 h-10 mx-auto mb-2 opacity-50" />
              <p className="text-sm">尚無抽獎紀錄，快去轉轉看吧！</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {currentUser.lotteryRewards.map((reward) => (
                <div
                  key={reward.id}
                  className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between"
                >
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">{reward.name}</h4>
                    <p className="text-xs text-amber-700 mt-0.5">優惠代碼：{reward.code}</p>
                  </div>
                  <span className="text-xs text-gray-400">{reward.date}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 歷史已購商品清單 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4 border-b pb-3">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <PackageCheck className="w-5 h-5 text-green-600" />
              已購商品紀錄 ({currentUser.purchasedItems?.length || 0})
            </h2>
            <button
              onClick={() => onNavigate('products')}
              className="text-xs text-red-600 hover:underline flex items-center gap-1"
            >
              逛逛商品 <ShoppingBag className="w-3.5 h-3.5" />
            </button>
          </div>

          {!currentUser.purchasedItems || currentUser.purchasedItems.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <PackageCheck className="w-10 h-10 mx-auto mb-2 opacity-50" />
              <p className="text-sm">尚無已購商品，結帳後會自動記錄在此！</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
              {currentUser.purchasedItems.map((order) => (
                <div key={order.orderId} className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
                  <div className="flex justify-between items-center text-xs text-gray-500 mb-2 border-b border-gray-200 pb-2">
                    <span>訂單號：{order.orderId}</span>
                    <span>{order.date}</span>
                  </div>
                  <div className="space-y-1.5">
                    {order.items.map((prod) => (
                      <div key={prod.id} className="flex justify-between text-sm text-gray-700">
                        <span>{prod.name} x {prod.quantity}</span>
                        <span className="font-medium">NT$ {prod.price * prod.quantity}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-right text-xs font-bold text-red-600 mt-2">
                    總計：NT$ {order.totalAmount}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
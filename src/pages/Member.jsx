import React from 'react';
import { User, Mail, Calendar, Gift, PackageCheck, ShoppingBag, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const MemberPage = ({ onNavigate }) => {
  const { currentUser, logout } = useAuth();

  // 若尚未登入，顯示空狀態
  if (!currentUser) {
    return (
      <div className="container content-wrapper cart-empty-view">
        <User size={64} className="cart-empty-icon" />
        <h2 className="title-centered">您尚未登入會員</h2>
        <button onClick={() => onNavigate('home')} className="form-submit-btn">
          返回首頁
        </button>
      </div>
    );
  }

  return (
    <div className="container content-wrapper member-dashboard">
      
      <div className="member-top-section">
        {/* 數位會員卡 (樣式沿用您已建立好的 .member-card) */}
        <div className="member-card">
          <div className="member-card-header">
            <div>
              <div className="member-level">
                <User size={20} className="material-symbols-outlined" /> 一般會員
              </div>
              <div className="member-name">{currentUser.account}</div>
            </div>
            <button 
              onClick={() => { logout(); onNavigate('home'); }}
              className="btn-logout-card"
            >
              <LogOut size={16} /> 登出
            </button>
          </div>
          <div className="barcode-box">
            <div className="barcode-line"></div>
            <div className="barcode-number">{currentUser.id.toUpperCase()}</div>
          </div>
          <div className="member-info-list">
            <Mail size={16} className="material-symbols-outlined" /> {currentUser.email} <br/>
            <Calendar size={16} className="material-symbols-outlined" /> 加入時間：{currentUser.createdAt}
          </div>
        </div>

        {/* 積分與統計區塊 (樣式沿用 .member-stats 系列) */}
        <div className="member-stats">
          <div className="member-stat-card">
            <div className="member-stat-label">
              <PackageCheck size={18} className="material-symbols-outlined" /> 歷史訂單
            </div>
            <p className="member-stat-value member-stat-points">
              {currentUser.purchasedItems?.length || 0} <span className="member-stat-unit">筆</span>
            </p>
          </div>
          <div className="member-stat-card">
            <div className="member-stat-label">
              <Gift size={18} className="material-symbols-outlined" /> 抽獎紀錄
            </div>
            <p className="member-stat-value member-stat-coupons">
              {currentUser.lotteryRewards?.length || 0} <span className="member-stat-unit">項</span>
            </p>
          </div>
        </div>
      </div>

      {/* 底部兩欄區塊：樂透紀錄 vs 歷史訂單 */}
      <div className="member-records-grid">
        
        {/* 樂透紀錄卡片 */}
        <div className="record-card">
          <h3 className="record-title">
            <Gift size={20} /> 抽獎紀錄與優惠券
          </h3>
          
          {!currentUser.lotteryRewards || currentUser.lotteryRewards.length === 0 ? (
            <p style={{ color: 'var(--text-sub)' }}>尚無抽獎紀錄。</p>
          ) : (
            <div className="record-list-container">
              {currentUser.lotteryRewards.map(reward => (
                <div key={reward.id} className="lottery-record-item">
                  <div className="lottery-record-name">{reward.name}</div>
                  <div className="lottery-record-code">代碼: {reward.code}</div>
                  <div className="lottery-record-date">{reward.date}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 歷史訂單卡片 */}
        <div className="record-card">
          <h3 className="record-title">
            <ShoppingBag size={20} /> 已購商品紀錄
          </h3>

          {!currentUser.purchasedItems || currentUser.purchasedItems.length === 0 ? (
            <p style={{ color: 'var(--text-sub)' }}>尚無已購商品。</p>
          ) : (
            <div className="record-list-container">
              {currentUser.purchasedItems.map(order => (
                <div key={order.orderId} className="order-record-item">
                  <div className="order-record-header">
                    訂單號: {order.orderId} <br/> {order.date}
                  </div>
                  
                  {order.items.map(item => (
                    <div key={item.id} className="order-record-detail">
                      <span>{item.name} x {item.quantity}</span>
                      <span>NT$ {item.price * item.quantity}</span>
                    </div>
                  ))}
                  
                  <div className="order-record-total">
                    總計: NT$ {order.totalAmount}
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
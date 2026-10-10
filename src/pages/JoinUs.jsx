import React from 'react';

export default function JoinUs() {
  return (
    <div className="joinus-page">
      <div className="joinUs-container">
        <h2 className="page-title">人才招募</h2>
        <p className="joinus-subtitle">加入 88shop 團隊，和我們一起創造美好生活！</p>
        
        <h3>門市正職人員</h3>
        <h4>工作內容</h4>
        <ul>
          <li>收銀結帳與顧客服務</li>
          <li>商品進貨、補貨與陳列</li>
          <li>咖啡與熟食製作</li>
        </ul>
        
        <h3>物流配送專員</h3>
        <h4>工作內容</h4>
        <ul>
          <li>負責區域生鮮商品的準時配送</li>
          <li>確保貨品在運送過程中的安全與品質</li>
        </ul>

        <div className="joinus-action">
          <button className="btn-primary" onClick={() => alert('請將履歷寄至 hr@88shop.com.tw')}>立即應徵</button>
        </div>
      </div>
    </div>
  );
}
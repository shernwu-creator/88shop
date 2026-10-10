import React from 'react';

export default function FAQ() {
  return (
    <div className="container content-wrapper">
      <h2 className="title-centered">常見問題 (FAQ)</h2>
      
      <div className="faq-container">
        
        <div className="faq-card">
          <h3 className="faq-question">Q: 請問運費如何計算？</h3>
          <p className="faq-answer">
            A: 凡於網站消費滿 NT$500 即可享免運費優惠，未滿則酌收 NT$60 運費。
          </p>
        </div>
        
        <div className="faq-card">
          <h3 className="faq-question">Q: 樂透轉轉抽到的優惠券有期限嗎？</h3>
          <p className="faq-answer">
            A: 有的，抽中的優惠券會自動存入您的會員中心，一般期限為抽中後的 30 天內有效。
          </p>
        </div>

      </div>
    </div>
  );
}
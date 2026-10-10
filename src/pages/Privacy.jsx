import React from 'react';

export default function Privacy() {
  return (
    <div className="policy-page-wrapper">
      <div className="policy-container">
        <h2 className="page-title">隱私權政策</h2>
        <div className="subtitle">保護您的個人資料是我們的首要責任</div>

        <h2>一、個人資料之蒐集政策</h2>
        <p>
          當您在 <span className="name">88shop</span> 註冊會員、進行購物或參與抽獎活動時，我們將會請您提供必要的個人資料（如：Email、姓名）。
        </p>

        <h2>二、資料之使用方式</h2>
        <ul>
          <li>處理您的訂單及提供後續會員服務。</li>
          <li>紀錄您的購物車與樂透轉轉獲獎紀錄。</li>
          <li>發送重要通知與專屬優惠訊息。</li>
        </ul>

        <h2>三、資料安全與保護</h2>
        <p>
          我們採用標準的技術保護您的 <strong>localStorage</strong> 暫存與帳戶資訊，未經您的同意，我們絕不會將您的個人資料洩露給第三方。
        </p>

        <hr />

        <div className="contact-block">
          <p><strong>若對隱私權政策有任何疑問，請與我們聯繫：</strong></p>
          <p>客服信箱：support@88shop.com.tw</p>
          <p>客服專線：0800-888-888</p>
        </div>
      </div>
    </div>
  );
}
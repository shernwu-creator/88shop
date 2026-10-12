import React from "react";

export default function Contact() {
  return (
    /* 將原本的 container 換成我們統一的白色卡片結構，並限制寬度 */
    <div className="simple-content-box" style={{ maxWidth: "600px" }}>
      {/* 標題只需保留 page-title，因為我們在 CSS 已經設定好置中了 */}
      <h2 className="page-title">聯絡我們</h2>
      <p className="contact-intro">如有任何問題或建議，歡迎填寫下方表單與我們聯繫！</p>

      <form
        className="contact-form"
        onSubmit={(e) => {
          e.preventDefault();
          alert("感謝您的來信，客服人員將盡快回覆您！");
        }}
      >
        <div>
          <label className="form-label">姓名</label>
          <input
            type="text"
            className="form-control form-control-full"
            placeholder="您的姓名"
            required
          />
        </div>
        <div>
          <label className="form-label">電子信箱</label>
          <input
            type="email"
            className="form-control form-control-full"
            placeholder="example@mail.com"
            required
          />
        </div>
        <div>
          <label className="form-label">主旨</label>
          <select className="form-control form-control-full">
            <option>訂單問題</option>
            <option>商品退換貨</option>
            <option>其他建議</option>
          </select>
        </div>
        <div>
          <label className="form-label">訊息內容</label>
          <textarea
            className="form-control form-control-full"
            rows="5"
            placeholder="請詳細描述您的問題..."
            required
          ></textarea>
        </div>
        <button type="submit" className="form-submit-btn">
          送出訊息
        </button>
      </form>
    </div>
  );
}

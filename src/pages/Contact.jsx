import React, { useState } from "react";
import { AlertModal } from "../components/AlertModal";

export default function Contact() {
  const [alertConfig, setAlertConfig] = useState({ isOpen: false, message: "", type: "success" });

  const handleSubmit = (e) => {
    e.preventDefault();
    // 取代原本的 alert
    setAlertConfig({
      isOpen: true,
      message: "感謝您的來信，客服人員將盡快回覆您！",
      type: "success",
    });
  };

  return (
    <div className="simple-content-box" style={{ maxWidth: "600px" }}>
      <h2 className="page-title">聯絡我們</h2>
      <p className="contact-intro">如有任何問題或建議，歡迎填寫下方表單與我們聯繫！</p>

      <form className="contact-form" onSubmit={handleSubmit}>
        {/* ...中間的表單內容維持不變... */}
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
        {/* ... */}
        <button type="submit" className="form-submit-btn">
          送出訊息
        </button>
      </form>

      {/* 掛載彈出視窗元件 */}
      <AlertModal
        isOpen={alertConfig.isOpen}
        message={alertConfig.message}
        type={alertConfig.type}
        onClose={() => setAlertConfig({ ...alertConfig, isOpen: false })}
      />
    </div>
  );
}

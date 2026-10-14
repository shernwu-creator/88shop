import React, { useEffect } from "react";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

export const AlertModal = ({ isOpen, onClose, message, type = "success" }) => {
  // 當開啟時，如果使用者按下 Esc 鍵也能關閉
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 10000 }}>
      <div
        className="alert-card"
        onClick={(e) => e.stopPropagation()}
        // 加入這行讓卡片也有淡入的動畫感覺
        style={{ animation: "popIn 0.3s ease-out forwards" }}
      >
        <button onClick={onClose} className="modal-close-btn">
          <X size={24} />
        </button>

        <div className="alert-content">
          {type === "success" ? (
            <CheckCircle2 size={48} color="var(--primary)" style={{ marginBottom: "16px" }} />
          ) : (
            <AlertCircle size={48} color="#c40008" style={{ marginBottom: "16px" }} />
          )}
          <h3 className="alert-message">{message}</h3>

          <button
            onClick={onClose}
            className="btn-primary"
            style={{ marginTop: "24px", width: "100%" }}
          >
            確認
          </button>
        </div>
      </div>
    </div>
  );
};

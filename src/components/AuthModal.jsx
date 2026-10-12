import React, { useState } from "react";
import { X, Mail, User, Lock } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export const AuthModal = ({ isOpen, onClose }) => {
  const { login, register } = useAuth();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState("");
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (isRegisterMode) {
      if (!email || !account || !password) {
        setErrorMsg("請填寫所有欄位！");
        return;
      }
      const res = register(email, account, password);
      if (res.success) onClose();
      else setErrorMsg(res.message);
    } else {
      if (!account || !password) {
        setErrorMsg("請填寫帳號及密碼！");
        return;
      }
      const res = login(account, password);
      if (res.success) onClose();
      else setErrorMsg(res.message);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="login-card" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="modal-close-btn">
          <X size={24} />
        </button>

        <h2 className="login-title">{isRegisterMode ? "註冊會員" : "會員登入"}</h2>

        {errorMsg && <div className="error-msg-box">{errorMsg}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          {isRegisterMode && (
            <div>
              <label className="form-label">
                <Mail size={16} className="icon-adjust-inline" /> 電子信箱
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="form-control form-control-full"
              />
            </div>
          )}
          <div>
            <label className="form-label">
              <User size={16} className="icon-adjust-inline" />{" "}
              {isRegisterMode ? "設定帳號" : "帳號或 Email"}
            </label>
            <input
              type="text"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              placeholder="請輸入帳號"
              className="form-control form-control-full"
            />
          </div>
          <div>
            <label className="form-label">
              <Lock size={16} className="icon-adjust-inline" /> 密碼
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="請輸入密碼"
              className="form-control form-control-full"
            />
          </div>

          <button type="submit" className="form-submit-btn login-submit-btn">
            {isRegisterMode ? "立即註冊" : "登入"}
          </button>
        </form>

        <div className="login-footer-text">
          {isRegisterMode ? "已經有帳號了？" : "還不是會員嗎？"}
          <button
            type="button"
            onClick={() => {
              setIsRegisterMode(!isRegisterMode);
              setErrorMsg("");
            }}
            className="switch-mode-btn"
          >
            {isRegisterMode ? "點此登入" : "免費註冊"}
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Member() {
  const { currentUser, login, register, logout } = useAuth();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (isRegisterMode) {
      if (!formData.name || !formData.email || !formData.password) {
        setErrorMsg('請填寫所有欄位');
        return;
      }
      const res = register(formData.email, formData.password, formData.name);
      if (!res.success) setErrorMsg(res.message);
    } else {
      const res = login(formData.email, formData.password);
      if (!res.success) setErrorMsg(res.message);
    }
  };

  if (currentUser) {
    return (
      <div className="member-dashboard">
        <h2>會員中心</h2>
        <div className="profile-card">
          <p><strong>姓名：</strong>{currentUser.name}</p>
          <p><strong>帳號信箱：</strong>{currentUser.email}</p>
          <p><strong>會員級別：</strong>一般會員</p>
          <button onClick={logout} className="btn-secondary">登出帳號</button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <h2>{isRegisterMode ? '建立新帳號' : '會員登入'}</h2>
      {errorMsg && <div className="alert-error">{errorMsg}</div>}
      <form onSubmit={handleSubmit} className="auth-form">
        {isRegisterMode && (
          <div className="form-group">
            <label>使用者名稱</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="請輸入暱稱或姓名"
            />
          </div>
        )}
        <div className="form-group">
          <label>電子郵件</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@mail.com"
          />
        </div>
        <div className="form-group">
          <label>密碼</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="請輸入密碼"
          />
        </div>
        <button type="submit" className="btn-primary">
          {isRegisterMode ? '送出註冊' : '登入'}
        </button>
      </form>
      <p className="auth-switch">
        {isRegisterMode ? '已經有帳號？' : '還沒有帳號？'}
        <button
          type="button"
          onClick={() => {
            setIsRegisterMode(!isRegisterMode);
            setErrorMsg('');
          }}
          className="btn-link"
        >
          {isRegisterMode ? '切換至登入' : '立即免費註冊'}
        </button>
      </p>
    </div>
  );
}
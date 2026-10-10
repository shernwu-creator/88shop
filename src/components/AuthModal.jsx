import React, { useState } from 'react';
import { X, Mail, User, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AuthModal = ({ isOpen, onClose }) => {
  const { login, register } = useAuth();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState('');
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (isRegisterMode) {
      if (!email || !account || !password) {
        setErrorMsg('請填寫所有欄位！');
        return;
      }
      const res = register(email, account, password);
      if (res.success) {
        onClose();
      } else {
        setErrorMsg(res.message);
      }
    } else {
      if (!account || !password) {
        setErrorMsg('請填寫帳號及密碼！');
        return;
      }
      const res = login(account, password);
      if (res.success) {
        onClose();
      } else {
        setErrorMsg(res.message);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden p-6 sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold text-gray-900 text-center mb-6">
          {isRegisterMode ? '註冊 88shop 會員' : '會員登入'}
        </h3>

        {errorMsg && (
          <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegisterMode && (
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">電子信箱 (Email)</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              {isRegisterMode ? '設定使用者帳號' : '使用者帳號或 Email'}
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={account}
                onChange={(e) => setAccount(e.target.value)}
                placeholder="請輸入帳號"
                className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">密碼</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="請輸入密碼"
                className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition"
          >
            {isRegisterMode ? '立即註冊' : '登入'}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-500">
          {isRegisterMode ? '已經有帳號了？' : '還不是會員嗎？'}
          <button
            onClick={() => {
              setIsRegisterMode(!isRegisterMode);
              setErrorMsg('');
            }}
            className="ml-1 text-red-600 font-semibold hover:underline"
          >
            {isRegisterMode ? '點此登入' : '立即免費註冊'}
          </button>
        </div>
      </div>
    </div>
  );
};
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('app_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  // 註冊
  const register = (email, password, name) => {
    const users = JSON.parse(localStorage.getItem('app_users') || '[]');
    if (users.some((u) => u.email === email)) {
      return { success: false, message: '該帳號已被註冊' };
    }
    const newUser = { id: Date.now(), email, password, name };
    users.push(newUser);
    localStorage.setItem('app_users', JSON.stringify(users));

    // 註冊成功後直接自動登入
    setCurrentUser({ id: newUser.id, email: newUser.email, name: newUser.name });
    localStorage.setItem(
      'app_current_user',
      JSON.stringify({ id: newUser.id, email: newUser.email, name: newUser.name })
    );
    return { success: true };
  };

  // 登入
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('app_users') || '[]');
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) {
      return { success: false, message: '帳號或密碼錯誤' };
    }
    const sessionUser = { id: user.id, email: user.email, name: user.name };
    setCurrentUser(sessionUser);
    localStorage.setItem('app_current_user', JSON.stringify(sessionUser));
    return { success: true };
  };

  // 登出
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('app_current_user');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
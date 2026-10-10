import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // 所有註冊使用者列表
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('88shop_users');
    return saved ? JSON.parse(saved) : [];
  });

  // 當前登入的會員
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('88shop_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  // 當使用者資料變動時更新 localStorage
  useEffect(() => {
    localStorage.setItem('88shop_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('88shop_current_user', JSON.stringify(currentUser));
      // 同步更新 users 列表中該使用者的完整資料
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.account === currentUser.account ? currentUser : u))
      );
    } else {
      localStorage.removeItem('88shop_current_user');
    }
  }, [currentUser]);

  // 會員註冊（僅需 email, account, password）
  const register = (email, account, password) => {
    const exists = users.some((u) => u.account === account || u.email === email);
    if (exists) {
      return { success: false, message: '該帳號或 Email 已被註冊！' };
    }

    const newUser = {
      id: `user_${Date.now()}`,
      email,
      account,
      password,
      createdAt: new Date().toLocaleDateString('zh-TW'),
      cart: [],            // 該會員專屬的購物車
      purchasedItems: [],  // 結帳後的已購商品歷史
      lotteryRewards: []   // 抽獎獲得的獎品/優惠券
    };

    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    return { success: true, message: '註冊成功並已為您登入！' };
  };

  // 會員登入
  const login = (accountOrEmail, password) => {
    const user = users.find(
      (u) => (u.account === accountOrEmail || u.email === accountOrEmail) && u.password === password
    );
    if (!user) {
      return { success: false, message: '帳號/Email 或密碼錯誤！' };
    }
    setCurrentUser(user);
    return { success: true, message: '登入成功！' };
  };

  // 會員登出
  const logout = () => {
    setCurrentUser(null);
  };

  // 更新會員專屬購物車
  const updateMemberCart = (newCart) => {
    if (!currentUser) return;
    setCurrentUser((prev) => ({
      ...prev,
      cart: newCart
    }));
  };

  // 結帳後將商品寫入會員已購清單
  const addPurchasedOrder = (orderItems, totalAmount) => {
    if (!currentUser) return;
    const newOrder = {
      orderId: `ORD-${Date.now().toString().slice(-6)}`,
      date: new Date().toLocaleString('zh-TW'),
      items: orderItems,
      totalAmount
    };

    setCurrentUser((prev) => ({
      ...prev,
      cart: [], // 清空會員的購物車
      purchasedItems: [newOrder, ...(prev.purchasedItems || [])]
    }));
  };

  // 將抽獎結果存入會員資料
  const addLotteryReward = (prizeName, discountCode) => {
    if (!currentUser) return;
    const newReward = {
      id: `lottery_${Date.now()}`,
      name: prizeName,
      code: discountCode || 'LUCKY88',
      date: new Date().toLocaleString('zh-TW')
    };

    setCurrentUser((prev) => ({
      ...prev,
      lotteryRewards: [newReward, ...(prev.lotteryRewards || [])]
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        register,
        login,
        logout,
        updateMemberCart,
        addPurchasedOrder,
        addLotteryReward
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
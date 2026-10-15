import React, { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("88shop_users");
    return saved ? JSON.parse(saved) : [];
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("88shop_current_user");
    return saved ? JSON.parse(saved) : null;
  });

  // ==========================================
  // 根本解法：建立統一的同步函式，取代 useEffect
  // ==========================================
  const syncCurrentUser = (updatedUser, currentUsersList = users) => {
    setCurrentUser(updatedUser); // 更新當前使用者

    if (updatedUser) {
      localStorage.setItem("88shop_current_user", JSON.stringify(updatedUser));
      // 同步更新大名單
      const updatedList = currentUsersList.map((u) =>
        u.account === updatedUser.account ? updatedUser : u,
      );
      setUsers(updatedList);
      localStorage.setItem("88shop_users", JSON.stringify(updatedList));
    } else {
      localStorage.removeItem("88shop_current_user");
    }
  };

  const register = (email, account, password) => {
    const exists = users.some((u) => u.account === account || u.email === email);
    if (exists) return { success: false, message: "該帳號或 Email 已被註冊！" };

    const newUser = {
      id: `user_${Date.now()}`,
      email,
      account,
      password,
      createdAt: new Date().toLocaleDateString("zh-TW"),
      cart: [],
      purchasedItems: [],
      lotteryRewards: [],
    };

    const newList = [...users, newUser];
    setUsers(newList);
    localStorage.setItem("88shop_users", JSON.stringify(newList));

    syncCurrentUser(newUser, newList); // 呼叫同步函式
    return { success: true, message: "註冊成功並已為您登入！" };
  };

  const login = (accountOrEmail, password) => {
    const user = users.find(
      (u) =>
        (u.account === accountOrEmail || u.email === accountOrEmail) && u.password === password,
    );
    if (!user) return { success: false, message: "帳號/Email 或密碼錯誤！" };

    syncCurrentUser(user); // 呼叫同步函式
    return { success: true, message: "登入成功！" };
  };

  const logout = () => {
    syncCurrentUser(null); // 呼叫同步函式
  };

  const updateMemberCart = (newCart) => {
    if (!currentUser) return;
    syncCurrentUser({ ...currentUser, cart: newCart });
  };

  const addPurchasedOrder = (orderItems, totalAmount) => {
    if (!currentUser) return;
    const newOrder = {
      orderId: `ORD-${Date.now().toString().slice(-6)}`,
      date: new Date().toLocaleString("zh-TW"),
      items: orderItems,
      totalAmount,
    };
    syncCurrentUser({
      ...currentUser,
      cart: [], // 清空購物車
      purchasedItems: [newOrder, ...(currentUser.purchasedItems || [])],
    });
  };

  const addLotteryReward = (prizeName, discountCode) => {
    if (!currentUser) return;
    const newReward = {
      id: `lottery_${Date.now()}`,
      name: prizeName,
      code: discountCode || "LUCKY88",
      date: new Date().toLocaleString("zh-TW"),
    };
    syncCurrentUser({
      ...currentUser,
      lotteryRewards: [newReward, ...(currentUser.lotteryRewards || [])],
    });
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
        addLotteryReward,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

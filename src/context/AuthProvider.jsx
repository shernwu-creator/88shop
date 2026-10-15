import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { readJSON, removeKey, writeJSON } from "../utils/storage";

const USERS_KEY = "88shop_users";
const CURRENT_USER_KEY = "88shop_current_user";

// 讀取會員名單；若 localStorage 損毀或格式不對，一律回傳空陣列
const loadUsers = () => {
  const saved = readJSON(USERS_KEY, []);
  return Array.isArray(saved) ? saved : [];
};

// 讀取登入者 id；相容舊版曾經把「整個 user 物件」存進這個 key 的格式
const loadCurrentUserId = (users) => {
  const saved = readJSON(CURRENT_USER_KEY, null);
  const id = saved && typeof saved === "object" ? saved.id : saved;
  // 名單裡找不到這位使用者（例如名單被清掉）就視為未登入
  return id && users.some((user) => user.id === id) ? id : null;
};

export const AuthProvider = ({ children }) => {
  // users 是唯一資料來源（single source of truth），currentUser 由
  // users + currentUserId 即時推導，不再另外保存一份，
  // 也就不會出現兩份資料不同步、或閉包拿到舊資料互相覆蓋的問題。
  const [users, setUsers] = useState(loadUsers);
  const [currentUserId, setCurrentUserId] = useState(() => loadCurrentUserId(users));

  const found = currentUserId ? users.find((user) => user.id === currentUserId) : null;
  const currentUser = found || null;

  // 名單與登入狀態變動時寫回 localStorage
  useEffect(() => {
    writeJSON(USERS_KEY, users);
  }, [users]);

  useEffect(() => {
    if (currentUserId) writeJSON(CURRENT_USER_KEY, currentUserId);
    else removeKey(CURRENT_USER_KEY);
  }, [currentUserId]);

  // 修改目前登入者的資料。
  // 這裡刻意使用「函式式更新」並從 prevUsers 取得最新資料，
  // 避免同一輪事件中連續呼叫多次時，後面的更新覆蓋掉前面的更新。
  const updateCurrentUser = (updater) => {
    if (!currentUserId) return;
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === currentUserId ? updater(user) : user)),
    );
  };

  // 註冊並自動登入
  const register = (email, account, password) => {
    const exists = users.some((user) => user.account === account || user.email === email);
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

    setUsers((prevUsers) => [...prevUsers, newUser]);
    setCurrentUserId(newUser.id);
    return { success: true, message: "註冊成功並已為您登入！" };
  };

  // 登入
  const login = (accountOrEmail, password) => {
    const user = users.find(
      (item) =>
        (item.account === accountOrEmail || item.email === accountOrEmail) &&
        item.password === password,
    );
    if (!user) return { success: false, message: "帳號/Email 或密碼錯誤！" };

    setCurrentUserId(user.id);
    return { success: true, message: "登入成功！" };
  };

  // 登出
  const logout = () => {
    setCurrentUserId(null);
  };

  // 更新會員的購物車
  const updateMemberCart = (newCart) => {
    updateCurrentUser((user) => ({ ...user, cart: newCart }));
  };

  // 結帳後寫入已購商品紀錄（並清空會員購物車）
  const addPurchasedOrder = (orderItems, totalAmount) => {
    const newOrder = {
      orderId: `ORD-${Date.now().toString().slice(-6)}`,
      date: new Date().toLocaleString("zh-TW"),
      items: orderItems,
      totalAmount,
    };

    // 從 updater 的 user（= 最新資料）取舊紀錄，
    // 而不是從閉包變數取，才不會蓋掉剛寫入的資料
    updateCurrentUser((user) => ({
      ...user,
      cart: [],
      purchasedItems: [newOrder, ...(user.purchasedItems || [])],
    }));
  };

  // 抽獎獎勵寫入會員資料
  const addLotteryReward = (prizeName, discountCode) => {
    const newReward = {
      id: `lottery_${Date.now()}`,
      name: prizeName,
      code: discountCode || "LUCKY88",
      date: new Date().toLocaleString("zh-TW"),
    };

    updateCurrentUser((user) => ({
      ...user,
      lotteryRewards: [newReward, ...(user.lotteryRewards || [])],
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
        addLotteryReward,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

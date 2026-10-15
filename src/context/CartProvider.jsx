import { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { CartContext } from "./CartContext";
import { readJSON, writeJSON } from "../utils/storage";

const GUEST_CART_KEY = "88shop_guest_cart";

// 讀取訪客購物車；格式不對就回傳空陣列
const loadGuestCart = () => {
  const saved = readJSON(GUEST_CART_KEY, []);
  return Array.isArray(saved) ? saved : [];
};

export const CartProvider = ({ children }) => {
  // 直接取用 AuthContext，不經過 hooks 檔案，
  // 避免 useAppHooks <-> context 之間的循環依賴
  const { currentUser, updateMemberCart, addPurchasedOrder } = useContext(AuthContext);

  const [guestCart, setGuestCart] = useState(loadGuestCart);

  // 購物車不另外保存一份 state，而是依登入狀態推導：
  //   會員 -> 會員資料裡的 cart；訪客 -> guestCart
  // 這樣登入 / 登出時購物車會自動切換，不需要 useEffect，
  // 也不需要舊版「渲染期間 setState」的同步技巧。
  const isMember = Boolean(currentUser);
  const cart = isMember ? currentUser.cart || [] : guestCart;

  // 狀態與儲存同步：會員寫回會員資料，訪客寫回 localStorage
  const syncCart = (updatedCart) => {
    if (isMember) {
      updateMemberCart(updatedCart);
    } else {
      setGuestCart(updatedCart);
      writeJSON(GUEST_CART_KEY, updatedCart);
    }
  };

  // 加入購物車
  const addToCart = (product, quantity = 1) => {
    const existingIndex = cart.findIndex((item) => item.id === product.id);

    if (existingIndex > -1) {
      syncCart(
        cart.map((item, index) =>
          index === existingIndex ? { ...item, quantity: item.quantity + quantity } : item,
        ),
      );
      return;
    }

    syncCart([...cart, { ...product, quantity }]);
  };

  // 移除商品
  const removeFromCart = (productId) => {
    syncCart(cart.filter((item) => item.id !== productId));
  };

  // 更新數量（數量 <= 0 時視為移除）
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    syncCart(
      cart.map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item)),
    );
  };

  // 清空購物車
  const clearCart = () => {
    syncCart([]);
  };

  // 結帳：先寫入會員的已購紀錄，再清空購物車。
  // 兩個動作都是函式式更新，所以不會像舊版一樣，
  // 後面的清空把「剛成立的訂單」覆蓋掉。
  const checkout = () => {
    if (cart.length === 0) return { success: false, message: "購物車是空的！" };

    if (!isMember) {
      return { success: false, message: "請先登入會員才能結帳！" };
    }

    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    addPurchasedOrder([...cart], totalAmount);
    clearCart();

    return {
      success: true,
      message: "結帳完成！購買商品已記錄至您的會員專區。",
    };
  };

  // 購物車商品總數量（用於 Navbar 右上角 Badge）
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // 總金額
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        checkout,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

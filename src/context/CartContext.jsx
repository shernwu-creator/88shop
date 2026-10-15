import { createContext, useState } from "react";
import { useAuth } from "../hooks/useAppHooks";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { currentUser, updateMemberCart, addPurchasedOrder } = useAuth();

  // 初始化狀態
  const [cart, setCart] = useState(() => {
    if (currentUser) return currentUser.cart || [];
    const guestCart = localStorage.getItem("88shop_guest_cart");
    return guestCart ? JSON.parse(guestCart) : [];
  });

  // ==========================================
  // 根本解法：使用「渲染期間更新」取代 useEffect
  // 紀錄上一次的帳號，當發現帳號切換時，立刻更新 cart
  // ==========================================
  const [prevAccount, setPrevAccount] = useState(currentUser?.account);

  if (currentUser?.account !== prevAccount) {
    setPrevAccount(currentUser?.account); // 更新對照組
    if (currentUser) {
      setCart(currentUser.cart || []);
    } else {
      const guestCart = localStorage.getItem("88shop_guest_cart");
      setCart(guestCart ? JSON.parse(guestCart) : []);
    }
  }

  const syncCart = (updatedCart) => {
    setCart(updatedCart);
    if (currentUser) {
      updateMemberCart(updatedCart);
    } else {
      localStorage.setItem("88shop_guest_cart", JSON.stringify(updatedCart));
    }
  };

  // 加入購物車
  const addToCart = (product, quantity = 1) => {
    const existingIndex = cart.findIndex((item) => item.id === product.id);
    let updatedCart;
    if (existingIndex > -1) {
      updatedCart = cart.map((item, index) =>
        index === existingIndex ? { ...item, quantity: item.quantity + quantity } : item,
      );
    } else {
      updatedCart = [...cart, { ...product, quantity }];
    }
    syncCart(updatedCart);
  };

  // 更新數量
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item,
    );
    syncCart(updatedCart);
  };

  // 移除商品
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    syncCart(updatedCart);
  };

  // 清空購物車
  const clearCart = () => {
    syncCart([]);
  };

  // 結帳動作：清空購物車狀態，並寫入會員已購商品記錄
  const checkout = () => {
    if (cart.length === 0) return { success: false, message: "購物車是空的！" };

    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (currentUser) {
      addPurchasedOrder([...cart], totalAmount);
    }

    clearCart();
    return {
      success: true,
      message: "結帳完成！購買商品已記錄至您的會員專區。",
    };
  };

  // 計算購物車商品總數量（用於 Navbar 右上角 Badge）
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

// export const useCart = () => useContext(CartContext);

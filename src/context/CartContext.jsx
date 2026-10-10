import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { currentUser, updateMemberCart, addPurchasedOrder } = useAuth();
  const [cart, setCart] = useState([]);

  // 當使用者切換或登入時，載入該使用者的專屬購物車
  useEffect(() => {
    if (currentUser) {
      setCart(currentUser.cart || []);
    } else {
      // 訪客模式可選讀取臨時暫存
      const guestCart = localStorage.getItem('88shop_guest_cart');
      setCart(guestCart ? JSON.parse(guestCart) : []);
    }
  }, [currentUser?.account]);

  // 購物車變更時同步寫入會員或訪客儲存
  const syncCart = (updatedCart) => {
    setCart(updatedCart);
    if (currentUser) {
      updateMemberCart(updatedCart);
    } else {
      localStorage.setItem('88shop_guest_cart', JSON.stringify(updatedCart));
    }
  };

  // 加入購物車
  const addToCart = (product, quantity = 1) => {
    const existingIndex = cart.findIndex((item) => item.id === product.id);
    let updatedCart;
    if (existingIndex > -1) {
      updatedCart = cart.map((item, index) =>
        index === existingIndex ? { ...item, quantity: item.quantity + quantity } : item
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
      item.id === productId ? { ...item, quantity: newQuantity } : item
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
    if (cart.length === 0) return { success: false, message: '購物車是空的！' };

    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (currentUser) {
      addPurchasedOrder([...cart], totalAmount);
    }

    clearCart();
    return { success: true, message: '結帳完成！購買商品已記錄至您的會員專區。' };
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
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
import React, { useState } from "react"; // 記得引入 useState
import { Plus, Minus, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { AlertModal } from "../components/AlertModal"; // 引入 AlertModal

export const CartPage = ({ onOpenAuth }) => {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, checkout, totalPrice, totalItems } = useCart();
  const { currentUser } = useAuth();

  // 新增 Alert 狀態控制
  const [alertConfig, setAlertConfig] = useState({
    isOpen: false,
    message: "",
    type: "success",
    onCloseAction: null, // 用來存放關閉視窗後要執行的動作 (例如跳轉)
  });

  const handleCheckout = () => {
    if (!currentUser) {
      setAlertConfig({
        isOpen: true,
        message: "請先登入會員以完成結帳並儲存您的購買商品清單！",
        type: "error", // 顯示紅色驚嘆號
        onCloseAction: () => onOpenAuth(), // 關閉後打開登入彈窗
      });
      return;
    }
    const res = checkout();
    if (res.success) {
      setAlertConfig({
        isOpen: true,
        message: res.message,
        type: "success",
        onCloseAction: () => navigate("/member"), // 關閉後跳轉會員頁
      });
    } else {
      setAlertConfig({
        isOpen: true,
        message: res.message,
        type: "error",
        onCloseAction: null,
      });
    }
  };

  const closeAlert = () => {
    setAlertConfig((prev) => ({ ...prev, isOpen: false }));
    if (alertConfig.onCloseAction) {
      alertConfig.onCloseAction();
    }
  };

  if (cart.length === 0) {
    return (
      <main id="main-content" className="page-container page-container-medium">
        <div className="simple-content-box cart-empty-view">
          <ShoppingCart size={64} className="cart-empty-icon" />
          <h1 className="page-title">購物車目前是空的</h1>
          <button className="cart-checkout-btn" onClick={() => void navigate("/products")}>
            前往購物
          </button>
        </div>
        <AlertModal
          isOpen={alertConfig.isOpen}
          message={alertConfig.message}
          type={alertConfig.type}
          onClose={closeAlert}
        />
      </main>
    );
  }

  return (
    <main id="main-content" className="page-container page-container-medium">
      <div className="simple-content-box">
        <h1 className="page-title">
          <ShoppingCart size={38} className="material-symbols-outlined" />
          我的購物車
        </h1>

        {/* 購物清單列表 */}
        <div className="cart-lists">
          {cart.map((item) => (
            <div key={item.id} className="cart-list">
              <div className="cart-list-flex">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="cart-item-thumb" />
                ) : (
                  <div className="cart-item-thumb cart-item-thumb-yellow"></div>
                )}

                <div>
                  <h3 className="cart-item-name">{item.name}</h3>
                  <div className="cart-item-qty cart-qty-actions">
                    <span>數量: {item.quantity}</span>
                    <button
                      className="form-secondary-btn btn-small"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus size={14} />
                    </button>
                    <button
                      className="form-secondary-btn btn-small"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="cart-list-actions">
                <div className="cart-item-price">${item.price * item.quantity}</div>
                <button onClick={() => removeFromCart(item.id)} className="cart-delete-btn">
                  移除
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 總計區塊 */}
        <div className="cart-summary">
          <p className="cart-summary-count">共 {totalItems} 件商品</p>
          <h2 className="cart-summary-total">
            總金額: <span className="cart-total-amount">${totalPrice}</span>
          </h2>

          <button className="cart-checkout-btn" onClick={handleCheckout}>
            確認結帳
          </button>
        </div>
      </div>
      <AlertModal
        isOpen={alertConfig.isOpen}
        message={alertConfig.message}
        type={alertConfig.type}
        onClose={closeAlert}
      />
    </main>
  );
};

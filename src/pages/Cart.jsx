import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, totalPrice } = useCart();
  const { currentUser } = useAuth();

  const handleCheckout = () => {
    if (!currentUser) {
      alert('請先登入會員以完成結帳流程');
      return;
    }
    if (cartItems.length === 0) {
      alert('購物車目前為空！');
      return;
    }
    alert(`訂單成立！總金額 NT$ ${totalPrice}，感謝您的購買。`);
    clearCart();
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty-view">
        <h2>購物車目前是空的</h2>
        <p>挑選一些美味的飲品或生鮮商品吧！</p>
        <Link to="/cafe-drinks" className="btn-primary">前往購物</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>購物清單</h2>
      <div className="cart-content">
        <div className="cart-list">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-img" />
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p className="price">NT$ {item.price}</p>
              </div>
              <div className="cart-quantity-control">
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, -1)}
                  className="btn-qty"
                >
                  -
                </button>
                <span className="qty-number">{item.quantity}</span>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, 1)}
                  className="btn-qty"
                >
                  +
                </button>
              </div>
              <div className="cart-item-subtotal">
                NT$ {item.price * item.quantity}
              </div>
              <button
                type="button"
                onClick={() => removeFromCart(item.id)}
                className="btn-delete"
              >
                刪除
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>訂單摘要</h3>
          <div className="summary-row">
            <span>商品小計</span>
            <span>NT$ {totalPrice}</span>
          </div>
          <div className="summary-row">
            <span>運費</span>
            <span>NT$ 0</span>
          </div>
          <hr />
          <div className="summary-row total">
            <span>總付款金額</span>
            <span>NT$ {totalPrice}</span>
          </div>
          <button type="button" onClick={handleCheckout} className="btn-checkout">
            確認結帳
          </button>
        </div>
      </div>
    </div>
  );
}
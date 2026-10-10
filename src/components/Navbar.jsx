import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { totalCount } = useCart();
  const { currentUser, logout } = useAuth();

  return (
    <header className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">MART ONLINE</Link>
        <nav className="nav-links">
          <Link to="/">首頁</Link>
          <Link to="/cafe-drinks">咖啡飲品</Link>
          <Link to="/fresh-food">生鮮熟食</Link>
          <Link to="/cart" className="cart-badge-container">
            購物車
            {totalCount > 0 && <span className="cart-badge">{totalCount}</span>}
          </Link>
          {currentUser ? (
            <div className="user-nav">
              <Link to="/member">您好，{currentUser.name}</Link>
              <button onClick={logout} className="btn-logout">登出</button>
            </div>
          ) : (
            <Link to="/member" className="btn-login">會員登入</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
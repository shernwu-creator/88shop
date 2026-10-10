import React, { useState } from 'react';
import { Search, ShoppingCart, User, Sun, Moon, Menu, Briefcase, Coffee, BookOpen, Gift } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

export const Navbar = ({ onNavigate, onOpenAuth }) => {
  const { currentUser } = useAuth();
  const { totalItems } = useCart();
  const { isDarkMode, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="nav-container">
        {/* LOGO 區塊：完美還原原網頁設計 */}
        <a 
          href="#" 
          className="logo" 
          onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
        >
          <img src="/LOGO_88.png" alt="88便利店 Logo" className="logo-img" />
          <div className="logo-text">
            <span className="logo-main">88便利店</span>
            <span className="logo-sub">88 CONVENIENCE</span>
          </div>
        </a>

        {/* 桌機版主導覽連結 */}
        <nav className="desktop-nav" aria-label="主選單">
          <ul>
            <li>
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('products'); }}>所有商品</a>
            </li>
            <li>
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('ecatalog'); }}>線上 DM</a>
            </li>
            <li>
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('lottery'); }}>幸運轉盤</a>
            </li>
          </ul>
        </nav>

        {/* 示意用搜尋框 */}
        <div className="search-box" role="search">
          <input type="text" placeholder="搜尋鮮食、優惠..." aria-label="站內搜尋" />
          <button type="button" className="search-btn" aria-label="搜尋">
            <Search size={20} style={{ transform: 'translateY(2px)' }} />
          </button>
        </div>

        {/* 右側功能區 */}
        <div className="nav-actions">
          <button 
            className="icon-link" 
            title="購物車" 
            onClick={() => onNavigate('cart')}
            style={{ position: 'relative' }}
          >
            <ShoppingCart size={24} className="shopping-cart" />
            {totalItems > 0 && (
              <span style={{
                position: 'absolute', top: '-5px', right: '-8px',
                background: '#c40008', color: 'white', borderRadius: '50%',
                padding: '2px 6px', fontSize: '10px', fontWeight: 'bold'
              }}>
                {totalItems}
              </span>
            )}
          </button>
          
          <button 
            className="icon-link" 
            title={currentUser ? "會員中心" : "登入/註冊"} 
            onClick={() => currentUser ? onNavigate('member') : onOpenAuth()}
          >
            <User size={24} className="member" />
          </button>

          <button 
            className="theme-btn" 
            title="切換明暗模式" 
            onClick={toggleTheme}
          >
            {isDarkMode ? <Sun size={24} className="darklight" /> : <Moon size={24} className="darklight" />}
          </button>

          {/* 漢堡選單按鈕 (手機版顯示) */}
          <button 
            className="hamburger-btn" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu size={28} className="hanburger-menu" />
          </button>
        </div>
      </div>

      {/* 手機版下拉選單 */}
      <nav className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`} aria-label="行動版主選單">
        <ul>
          <li>
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('products'); setMobileMenuOpen(false); }}>
              <Briefcase size={20} /> 商品專區
            </a>
          </li>
          <li>
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('ecatalog'); setMobileMenuOpen(false); }}>
              <BookOpen size={20} /> 線上 DM
            </a>
          </li>
          <li>
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('lottery'); setMobileMenuOpen(false); }}>
              <Gift size={20} /> 幸運轉盤
            </a>
          </li>
          <li>
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('cart'); setMobileMenuOpen(false); }}>
              <ShoppingCart size={20} /> 購物車
            </a>
          </li>
          <li>
            <a href="#" onClick={(e) => { 
              e.preventDefault(); 
              currentUser ? onNavigate('member') : onOpenAuth();
              setMobileMenuOpen(false); 
            }}>
              <User size={20} /> {currentUser ? '會員中心' : '登入/註冊'}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  User,
  Sun,
  Moon,
  Menu,
  Briefcase,
  BookOpen,
  Gift,
} from "lucide-react";
import { useAuth, useCart, useTheme } from "../hooks/useAppHooks";
import { assetUrl } from "../utils/assetUrl";

export const Navbar = ({ onOpenAuth }) => {
  const { currentUser } = useAuth();
  const { totalItems } = useCart();
  const { isDarkMode, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          <img src={assetUrl("/LOGO_88.png")} alt="88便利店 Logo" className="logo-img" />
          <div className="logo-text">
            <span className="logo-main">88便利店</span>
            <span className="logo-sub">88 CONVENIENCE</span>
          </div>
        </Link>

        <nav className="desktop-nav" aria-label="主選單">
          <ul>
            <li>
              <NavLink to="/products">所有商品</NavLink>
            </li>
            <li>
              <NavLink to="/ecatalog">線上 DM</NavLink>
            </li>
            <li>
              <NavLink to="/lottery">幸運轉盤</NavLink>
            </li>
          </ul>
        </nav>

        <div className="search-box" role="search">
          <input type="text" placeholder="搜尋鮮食、優惠..." aria-label="站內搜尋" />
          <button type="button" className="search-btn" aria-label="搜尋">
            <Search size={20} className="icon-adjust" />
          </button>
        </div>

        <div className="nav-actions">
          <button
            className="icon-link cart-btn-wrapper"
            title="購物車"
            onClick={() => void navigate("/cart")}
          >
            <ShoppingCart size={24} className="shopping-cart" />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </button>

          <button
            className="icon-link"
            title={currentUser ? "會員中心" : "登入/註冊"}
            onClick={() => (currentUser ? void navigate("/member") : onOpenAuth())}
          >
            <User size={24} className="member" />
          </button>

          <button className="theme-btn" title="切換明暗模式" onClick={toggleTheme}>
            {isDarkMode ? (
              <Sun size={24} className="darklight" />
            ) : (
              <Moon size={24} className="darklight" />
            )}
          </button>

          <button className="hamburger-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu size={28} className="hanburger-menu" />
          </button>
        </div>
      </div>

      <nav className={`mobile-menu ${mobileMenuOpen ? "active" : ""}`} aria-label="行動版主選單">
        <ul>
          <li>
            <NavLink to="/products" onClick={() => setMobileMenuOpen(false)}>
              <Briefcase size={20} /> 商品專區
            </NavLink>
          </li>
          <li>
            <NavLink to="/ecatalog" onClick={() => setMobileMenuOpen(false)}>
              <BookOpen size={20} /> 線上 DM
            </NavLink>
          </li>
          <li>
            <NavLink to="/lottery" onClick={() => setMobileMenuOpen(false)}>
              <Gift size={20} /> 幸運轉盤
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart" onClick={() => setMobileMenuOpen(false)}>
              <ShoppingCart size={20} /> 購物車
            </NavLink>
          </li>
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentUser) {
                  void navigate("/member");
                } else {
                  onOpenAuth();
                }
                setMobileMenuOpen(false);
              }}
            >
              <User size={20} /> {currentUser ? "會員中心" : "登入/註冊"}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

import React from "react";
import { Coffee, Utensils, Gift, Store } from "lucide-react";
import { Link } from "react-router-dom";
import { PRODUCTS } from "../data/products";

export default function Home() {
  return (
    <div>
      <section className="hero-banner">
        <div className="hero-content">
          <h1>秋季限定！栗子風味拿鐵新上市</h1>
          <p>
            24小時為您提供最新鮮的熟食、最濃郁的咖啡，以及各項限時優惠活動。現在加入會員再享專屬好禮！
          </p>
          <Link to="/products" className="btn-primary">
            立即選購
          </Link>
        </div>
      </section>

      <div className="container">
        <section className="quick-categories">
          <h2>快速分類</h2>
          <div className="category-grid">
            <Link to="/products/cafe-drinks" className="category-card">
              <Coffee className="material-symbols-outlined" />
              <div>咖啡飲品</div>
            </Link>
            <Link to="/products/fresh-food" className="category-card">
              <Utensils className="material-symbols-outlined" />
              <div>生鮮熟食</div>
            </Link>
            <Link to="/lottery" className="category-card">
              <Gift className="material-symbols-outlined" />
              <div>樂透轉轉</div>
            </Link>
            <Link to="/stores" className="category-card">
              <Store className="material-symbols-outlined" />
              <div>門市據點</div>
            </Link>
          </div>
        </section>

        <section className="recommendations">
          <h2>本月熱銷推薦</h2>
          <div className="scroll-container">
            {/* 動態抓取前3筆商品，並加上點擊跳轉到商品詳情的功能 */}
            {PRODUCTS.slice(0, 3).map((product) => (
              <Link key={product.id} to={`/product/${product.id}`} className="scroll-card">
                <div className="card-img">
                  <img src={product.image} alt={product.name} />
                </div>
                <h3>{product.name}</h3>
                <p className="price">NT$ {product.price}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

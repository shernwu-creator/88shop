import React from "react";
import { Coffee, Utensils, Gift, Store } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PRODUCTS } from "../data/products";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <section className="hero-banner">
        <div className="hero-content">
          <h1>歡迎來到 88shop 鮮食便利網</h1>
          <p>
            24小時為您提供最新鮮的熟食、最濃郁的咖啡，以及各項限時優惠活動。現在加入會員再享專屬好禮！
          </p>
          <button onClick={() => navigate("/products")} className="btn-primary">
            立即選購
          </button>
        </div>
      </section>

      <div className="container">
        <section className="quick-categories">
          <h2>快速分類</h2>
          <div className="category-grid">
            <button className="category-card" onClick={() => navigate("/products/cafe-drinks")}>
              <Coffee className="material-symbols-outlined" />
              <div>咖啡飲品</div>
            </button>
            <button className="category-card" onClick={() => navigate("/products/fresh-food")}>
              <Utensils className="material-symbols-outlined" />
              <div>生鮮熟食</div>
            </button>
            <button className="category-card" onClick={() => navigate("/lottery")}>
              <Gift className="material-symbols-outlined" />
              <div>樂透轉轉</div>
            </button>
            <button className="category-card" onClick={() => navigate("/stores")}>
              <Store className="material-symbols-outlined" />
              <div>門市據點</div>
            </button>
          </div>
        </section>

        <section className="recommendations">
          <h2>本月熱銷推薦</h2>
          <div className="scroll-container">
            {/* 動態抓取前3筆商品，並加上點擊跳轉到商品詳情的功能 */}
            {PRODUCTS.slice(0, 3).map((product) => (
              <div
                key={product.id}
                className="scroll-card"
                onClick={() => navigate(`/product/${product.id}`)}
                style={{ cursor: "pointer" }}
              >
                <div className="card-img">
                  <img src={product.image} alt={product.name} />
                </div>
                <h3>{product.name}</h3>
                <p className="price">NT$ {product.price}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

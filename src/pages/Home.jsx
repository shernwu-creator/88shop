import React from 'react';
import { Coffee, Utensils, Gift, Store, ChevronRight } from 'lucide-react';

export default function Home({ onNavigate }) {
  return (
    <div>
      {/* 英雄區塊 */}
      <section className="hero-banner">
        <div className="hero-content">
          <h1>歡迎來到 88shop 鮮食便利網</h1>
          <p>24小時為您提供最新鮮的熟食、最濃郁的咖啡，以及各項限時優惠活動。現在加入會員再享專屬好禮！</p>
          <button onClick={() => onNavigate('products')} className="btn-primary">
            立即選購
          </button>
        </div>
      </section>

      <div className="container">
        {/* 快速分類 */}
        <section className="quick-categories">
          <h2>快速分類</h2>
          <div className="category-grid">
            <button className="category-card" onClick={() => onNavigate('cafe-drinks')}>
              <Coffee className="material-symbols-outlined" />
              <div>咖啡飲品</div>
            </button>
            <button className="category-card" onClick={() => onNavigate('fresh-food')}>
              <Utensils className="material-symbols-outlined" />
              <div>生鮮熟食</div>
            </button>
            <button className="category-card" onClick={() => onNavigate('lottery')}>
              <Gift className="material-symbols-outlined" />
              <div>樂透轉轉</div>
            </button>
            <button className="category-card" onClick={() => onNavigate('stores')}>
              <Store className="material-symbols-outlined" />
              <div>門市據點</div>
            </button>
          </div>
        </section>

        {/* 推薦商品 */}
        <section className="recommendations">
          <h2>本月熱銷推薦</h2>
          <div className="scroll-container">
            {/* 這裡可改為用 map 渲染陣列 */}
            <div className="scroll-card">
              <div className="card-img">
                <img src="/images/Firefly_Beef_Brisket_Rice_2.jpg" alt="秘製牛腩飯" />
              </div>
              <h3>精選秘製牛腩飯</h3>
              <p className="price">NT$ 120</p>
            </div>
            <div className="scroll-card">
              <div className="card-img">
                <img src="/images/Firefly_Latte_1.jpg" alt="拿鐵咖啡" />
              </div>
              <h3>經典風味拿鐵</h3>
              <p className="price">NT$ 65</p>
            </div>
            <div className="scroll-card">
              <div className="card-img">
                <img src="/images/Firefly_Potato_1.jpg" alt="海苔洋芋片" />
              </div>
              <h3>香脆海苔洋芋片</h3>
              <p className="price">NT$ 40</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
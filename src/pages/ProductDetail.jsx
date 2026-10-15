import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useAppHooks";
import { PRODUCTS } from "../data/products";
import { ShoppingCart } from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();

  // 尋找對應的商品
  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="container content-wrapper">
        <h2 className="title-centered">找不到該商品</h2>
        <button onClick={() => navigate("/products")} className="form-submit-btn">
          返回商品列表
        </button>
      </div>
    );
  }

  return (
    <div className="container page-container">
      <div className="product-detail-layout">
        <div className="product-detail-media">
          <div className="product-detail-image">
            <img src={product.image} alt={product.name} />
          </div>
        </div>
        <div className="product-detail-info">
          <div className="product-badge">熱銷推薦</div>
          <h1 className="product-name">{product.name}</h1>
          <p className="product-desc">{product.description}</p>
          <div className="product-price">NT$ {product.price}</div>

          <div className="product-actions">
            <input
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="product-qty-input"
            />
            <button onClick={() => addToCart(product, qty)} className="product-add-cart-btn">
              <ShoppingCart size={20} className="icon-adjust-inline" />
              加入購物車
            </button>
          </div>
          <p className="product-shipping-note">＊全館滿 500 免運費，24H 快速到貨</p>
        </div>
      </div>
    </div>
  );
}

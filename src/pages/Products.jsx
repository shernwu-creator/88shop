import React from "react";
import { ShoppingBag, Plus } from "lucide-react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { PRODUCTS } from "../data/products";

export default function Products() {
  const { addToCart } = useCart();
  const { category } = useParams();

  // 若網址帶有分類參數，則進行過濾
  const filteredProducts = category ? PRODUCTS.filter((p) => p.category === category) : PRODUCTS;

  const categoryTitle =
    category === "cafe-drinks"
      ? "咖啡飲品"
      : category === "fresh-food"
        ? "生鮮熟食"
        : category === "snacks"
          ? "零食泡麵"
          : "所有商品";

  return (
    <div className="container products-container">
      <h2 className="products-header">
        <ShoppingBag size={28} className="icon-adjust-inline" />
        {categoryTitle}
      </h2>

      <div className="simple-product-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            {/* 包裝 Link 讓圖片和標題可以點擊 */}
            <Link to={`/product/${product.id}`} style={{ display: "block" }}>
              <div className="card-img">
                <img src={product.image} alt={product.name} />
              </div>
              <h3>{product.name}</h3>
            </Link>

            <p className="desc">{product.description}</p>

            <div className="price-row">
              <span className="price">NT$ {product.price}</span>
              <button
                onClick={() => addToCart(product, 1)}
                className="form-secondary-btn btn-add-cart"
              >
                <Plus size={16} /> 加入
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

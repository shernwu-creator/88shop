import React from 'react';
import { ShoppingBag, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

export default function Products() {
  const { addToCart } = useCart();

  return (
    <div className="container products-container">
      <h2 className="products-header">
        <ShoppingBag size={28} />
        商品專區
      </h2>
      
      {/* 使用 product.css 內建的 grid，完美支援 RWD */}
      <div className="simple-product-grid">
        
        {PRODUCTS.map((product) => (
          /* 使用先前在 others.css 定義的 product-card 結構 */
          <div key={product.id} className="product-card">
            <div className="card-img">
              <img src={product.image} alt={product.name} />
            </div>
            
            <h3>{product.name}</h3>
            
            <p className="desc">
              {product.description}
            </p>
            
            <div className="price-row">
              <span className="price">NT$ {product.price}</span>
              <button 
                onClick={() => addToCart(product, 1)} 
                className="btn-primary btn-add-cart"
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
import React from 'react';
import { Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <div className="card-img">
        <img src={product.image} alt={product.name} />
      </div>
      <h3>{product.name}</h3>
      <p className="desc">{product.description}</p>
      
      <div className="price-row">
        <span className="price">${product.price}</span>
        <button
          type="button"
          onClick={() => addToCart(product, 1)}
          className="form-secondary-btn"
          style={{ padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          <Plus size={16} /> 加入
        </button>
      </div>
    </div>
  );
}
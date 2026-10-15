import { Plus } from "lucide-react";
import { useCart } from "../hooks/useAppHooks";

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
          className="form-secondary-btn btn-add-cart"
        >
          <Plus size={16} /> 加入
        </button>
      </div>
    </div>
  );
}

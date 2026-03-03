import type { Product } from "../../types/product"
import "./ProductCard.css";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { name, description, imageUrl, price, category } = product;

  return (
    <div className="product-card">
      <img src={imageUrl} alt={name} />
      <div className="details">
        <div className="name">{name}</div>
        <div className="description">{description}</div>
        <div className="meta">
          <div className="price">${price.toFixed(2)}</div>
          <div className="category">{category.name}</div>
        </div>
      </div>
    </div>
  );
}

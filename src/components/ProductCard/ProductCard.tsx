import styles from './ProductCard.module.scss';
import type { Product } from '../../types/product';

interface ProductCardProps {
  product: Product;
  onClick?: (id: string | number) => void;
}

const ProductCard = ({ product, onClick }: ProductCardProps) => (
  <div
    className={styles.productCard}
    tabIndex={0}
    role="article"
    aria-label={product.title}
    aria-describedby={`product-desc-${product.id}`}
    onClick={() => onClick?.(product.id)}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        onClick?.(product.id);
      }
    }}
  >
    <img
      src={product.image}
      alt={product.title}
      className={styles.productImage}
      loading="lazy"
      aria-label={product.title}
    />
    <div className={styles.productInfo}>
      <h2 className={styles.productName}>{product.title}</h2>
      <p className={styles.productPrice} aria-label={`Price: $${product.price.toFixed(2)}`}>
        ${product.price.toFixed(2)}
      </p>
      {product.description && (
        <p
          className={styles.productDescription}
          id={`product-desc-${product.id}`}
          aria-label="Product description"
        >
          {product.description}
        </p>
      )}
    </div>
  </div>
);

export default ProductCard;

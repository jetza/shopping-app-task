import { useRef } from 'react';
import styles from './ProductCard.module.scss';
import type { Product } from '../../types/product';

interface ProductCardProps {
  product: Product;
  onClick?: (id: string | number) => void;
}

const ProductCard = ({ product, onClick }: ProductCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (el) {
      el.classList.remove(styles.bounce);
      void el.offsetWidth;
      el.classList.add(styles.bounce);
      setTimeout(() => {
        el.classList.remove(styles.bounce);
      }, 380);
    }
  };

  return (
    <div
      ref={cardRef}
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
      onMouseLeave={handleMouseLeave}
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
};

export default ProductCard;

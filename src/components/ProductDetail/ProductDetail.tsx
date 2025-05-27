import styles from './ProductDetail.module.scss';
import type { Product } from '@/types/product';

interface ProductDetailProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

const ProductDetail = ({ product, onAddToCart }: ProductDetailProps) => {
  if (!product) return null;
  return (
    <section className={styles.productDetail} aria-label={product.title}>
      <div className={styles.productDetailImageWrapper}>
        <img
          src={product.image}
          alt={product.title}
          className={styles.productDetailImage}
          loading="eager"
        />
      </div>
      <div className={styles.productDetailInfo}>
        <h1 className={styles.productDetailTitle}>{product.title}</h1>
        <p className={styles.productDetailPrice} aria-label={`Price: $${product.price}`}>
          ${product.price}
        </p>
        <p className={styles.productDetailCategory}>
          <strong>Category:</strong> {product.category}
        </p>
        <p className={styles.productDetailDescription}>{product.description}</p>
        {onAddToCart && (
          <button
            className={styles.productDetailAddToCart}
            onClick={() => onAddToCart(product)}
            aria-label="Add to cart"
          >
            Add to Cart
          </button>
        )}
      </div>
    </section>
  );
};

export default ProductDetail;

import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './ProductCard.module.scss';
import type { Product } from '../../types/product';

interface ProductCardProps {
  product: Product;
  onDetails: (id: string | number) => void;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onDetails, onAddToCart }: ProductCardProps) => {
  const { t } = useTranslation();
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (el) {
      el.classList.remove('bounce');
      void el.offsetWidth;
      el.classList.add('bounce');
      setTimeout(() => {
        el.classList.remove('bounce');
      }, 380);
    }
  };

  const isSingleLineDescription =
    product.description && product.description.length < 50 && !product.description.includes('\n');

  const isSingleLineName =
    product.title && product.title.length < 22 && !product.title.includes('\n');

  return (
    <div ref={cardRef} className={styles.productCard} tabIndex={0} onMouseLeave={handleMouseLeave}>
      <div className={styles.productImageWrapper}>
        <img
          src={product.image}
          alt={product.title}
          className={styles.productImage}
          loading="lazy"
          aria-label={product.title}
        />
      </div>
      <div className={styles.productInfoWrapper}>
        <div className={styles.productInfo}>
          <h2
            className={
              isSingleLineName ? `${styles.productName} ${styles.singleLine}` : styles.productName
            }
          >
            {product.title}
          </h2>
          <p
            className={styles.productPrice}
            aria-label={t('productCard.priceAria', { price: product.price.toFixed(2) })}
          >
            {t('productCard.price', { price: product.price.toFixed(2) })}
          </p>
          {product.description && (
            <p
              className={
                isSingleLineDescription
                  ? `${styles.productDescription} ${styles.singleLine}`
                  : styles.productDescription
              }
              id={`product-desc-${product.id}`}
              aria-label={t('productCard.descriptionAria')}
            >
              {product.description}
            </p>
          )}
        </div>
        <div className={styles.productCardActions}>
          <button
            className={styles.productDetailsBtn}
            onClick={() => onDetails(product.id)}
            type="button"
          >
            {t('productCard.details')}
          </button>
          <button
            className={styles.productAddToCartBtn}
            onClick={() => onAddToCart(product)}
            type="button"
          >
            {t('productCard.addToCart')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductCard);

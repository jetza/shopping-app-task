import { useTranslation } from 'react-i18next';

import styles from './ProductDetail.module.scss';
import type { Product } from '@/types/product';
import { convertUsdToRsd } from '@/utils/currency';

interface ProductDetailProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

const ProductDetail = ({ product, onAddToCart }: ProductDetailProps) => {
  const { t, i18n } = useTranslation();
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
        <p
          className={styles.productDetailPrice}
          aria-label={
            i18n.language === 'sr'
              ? t('productCard.priceAria', { price: convertUsdToRsd(product.price) })
              : t('productCard.priceAria', { price: product.price.toFixed(2) })
          }
        >
          {i18n.language === 'sr'
            ? `${convertUsdToRsd(product.price)} RSD`
            : `$${product.price.toFixed(2)} USD`}
        </p>
        <p className={styles.productDetailCategory}>
          <strong>{t('productDetail.category')}:</strong> {product.category}
        </p>
        <p
          className={styles.productDetailDescription}
          aria-label={t('productCard.descriptionAria')}
        >
          {product.description}
        </p>
        {onAddToCart && (
          <button
            className={styles.productDetailAddToCart}
            onClick={() => onAddToCart(product)}
            aria-label={t('productDetail.addToCartAria')}
          >
            {t('productDetail.addToCart')}
          </button>
        )}
      </div>
    </section>
  );
};

export default ProductDetail;

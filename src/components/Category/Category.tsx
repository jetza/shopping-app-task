import type { Product } from '@/types/product';
import styles from './Category.module.scss';
import ProductCard from '@/components/ProductCard/ProductCard';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import { useState, useCallback, useEffect } from 'react';
import Toast from '../Toast/Toast';
import { useTranslation } from 'react-i18next';

interface CategoryProps {
  name: string;
  products: Product[];
}

const Category = ({ name, products }: CategoryProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showNotif, setShowNotif] = useState(false);

  const handleDetails = useCallback(
    (id: number) => {
      navigate(`/products/${id}`);
    },
    [navigate],
  );

  const handleAddToCart = useCallback(
    (product: Product) => {
      dispatch(addToCart(product));
      setShowNotif(true);
    },
    [dispatch],
  );

  useEffect(() => {
    if (showNotif) {
      const timer = setTimeout(() => setShowNotif(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showNotif]);

  return (
    <section className={styles.categorySection} aria-label={name}>
      {showNotif && <Toast message={t('toast.addedToCart')} />}
      <h2 className={styles.categoryTitle}>{name}</h2>
      <div className={styles.productsGrid}>
        {products.map((product) => (
          <div className={styles.productCardContainer} key={product.id}>
            <ProductCard
              product={product}
              onDetails={() => handleDetails(product.id)}
              onAddToCart={() => handleAddToCart(product)}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Category;

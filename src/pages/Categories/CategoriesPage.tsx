import { useEffect, useState } from 'react';
import Products from '@/components/Products/Products';
import type { Product } from '@/types/product';
import styles from './CategoriesPage.module.scss';
import { fetchProducts } from '@/api/productsAPI';
import Loader from '@/components/Loader/Loader';

const CategoriesPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const categories = products.reduce<Record<string, Product[]>>((acc, product) => {
    if (!acc[product.category]) acc[product.category] = [];
    acc[product.category].push(product);
    return acc;
  }, {});

  if (loading) return <Loader />;

  return (
    <div className={styles.categoriesPage}>
      {Object.entries(categories).map(([category, prods]) => (
        <div key={category} className={styles.categorySection}>
          <h2 className={styles.categoryTitle}>{category}</h2>
          <div className={styles.categoriesFlexGrid}>
            <Products products={prods} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoriesPage;

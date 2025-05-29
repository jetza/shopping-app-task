import { useProductsQuery } from '@/api/useProductsQuery';
import Category from '@/components/Category/Category';
import type { Product } from '@/types/product';
import styles from './CategoriesPage.module.scss';
import Loader from '@/components/Loader/Loader';

const CategoriesPage = () => {
  const { data: products = [], isLoading } = useProductsQuery();

  const categories = products.reduce<Record<string, Product[]>>((acc, product) => {
    if (!acc[product.category]) acc[product.category] = [];
    acc[product.category].push(product);
    return acc;
  }, {});

  if (isLoading) return <Loader />;

  return (
    <div className={styles.categoriesPage}>
      {Object.entries(categories).map(([category, prods]) => (
        <Category key={category} name={category} products={prods} />
      ))}
    </div>
  );
};

export default CategoriesPage;

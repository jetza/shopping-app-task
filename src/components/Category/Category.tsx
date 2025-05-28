import type { Product } from '@/types/product';
import styles from './Category.module.scss';
import ProductCard from '@/components/ProductCard/ProductCard';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/slices/cartSlice';
import { useNavigate } from 'react-router-dom';

interface CategoryProps {
  name: string;
  products: Product[];
}

const Category = ({ name, products }: CategoryProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDetails = (id: number) => {
    navigate(`/products/${id}`);
  };
  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };
  return (
    <section className={styles.categorySection} aria-label={name}>
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

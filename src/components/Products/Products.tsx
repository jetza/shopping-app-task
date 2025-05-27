import ProductCard from '@/components/ProductCard/ProductCard';
import type { Product } from '@/types/product';
import styles from './Products.module.scss';

interface ProductsProps {
  products: Product[];
  onProductClick?: (id: string | number) => void;
}

const Products = ({ products, onProductClick }: ProductsProps) => (
  <div className={styles.productsGrid}>
    {products.map((product) => (
      <ProductCard key={product.id} product={product} onClick={onProductClick} />
    ))}
  </div>
);

export default Products;

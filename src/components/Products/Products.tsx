import ProductCard from '@/components/ProductCard/ProductCard';
import type { Product } from '@/types/product';
import styles from './Products.module.scss';

interface ProductsProps {
  products: Product[];
  onProductDetails?: (id: string | number) => void;
  onAddToCart?: (product: Product) => void;
}

const Products = ({ products, onProductDetails, onAddToCart }: ProductsProps) => (
  <div className={styles.productsGrid}>
    {products.map((product) => (
      <ProductCard
        key={product.id}
        product={product}
        onDetails={onProductDetails || (() => {})}
        onAddToCart={onAddToCart || (() => {})}
      />
    ))}
  </div>
);

export default Products;

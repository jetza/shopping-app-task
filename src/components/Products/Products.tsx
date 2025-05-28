import { useEffect, useRef, useState } from 'react';
import ProductCard from '@/components/ProductCard/ProductCard';
import type { Product } from '@/types/product';
import styles from './Products.module.scss';

interface ProductsProps {
  products: Product[];
  onProductDetails?: (id: string | number) => void;
  onAddToCart?: (product: Product) => void;
}

const BATCH_SIZE = 8;

const Products = ({ products, onProductDetails, onAddToCart }: ProductsProps) => {
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setVisibleCount(BATCH_SIZE);
  }, [products]);

  useEffect(() => {
    if (visibleCount >= products.length) return;
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, products.length));
        }
      },
      { threshold: 1 },
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [visibleCount, products.length]);

  return (
    <div className={styles.productsGrid}>
      {products.slice(0, visibleCount).map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onDetails={onProductDetails || (() => {})}
          onAddToCart={onAddToCart || (() => {})}
        />
      ))}
      {visibleCount < products.length && <div ref={loaderRef} style={{ height: 1 }} />}
    </div>
  );
};

export default Products;

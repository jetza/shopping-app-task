import type { Product } from '@/types/product';
import styles from './Category.module.scss';
import { useState } from 'react';
import ProductCard from '@/components/ProductCard/ProductCard';

interface CategoryProps {
  name: string;
  products: Product[];
}

const VISIBLE_COUNT = 3;

const Category = ({ name, products }: CategoryProps) => {
  const [start, setStart] = useState(0);
  const maxStart = Math.max(0, products.length - VISIBLE_COUNT);

  const handlePrev = () => setStart((s) => Math.max(0, s - 1));
  const handleNext = () => setStart((s) => Math.min(maxStart, s + 1));

  const visibleProducts = products.slice(start, start + VISIBLE_COUNT);

  return (
    <section className={styles.categorySection} aria-label={name}>
      <h2 className={styles.categoryTitle}>{name}</h2>
      <div className={styles.carouselWrapper}>
        <button
          className={styles.carouselArrow}
          onClick={handlePrev}
          disabled={start === 0}
          aria-label="Prethodni proizvodi"
        >
          &#8592;
        </button>
        <div className={styles.carouselTrack}>
          {visibleProducts.map((product) => (
            <div className={styles.productCardContainer} key={product.id}>
              <ProductCard product={product} onDetails={() => {}} onAddToCart={() => {}} />
            </div>
          ))}
        </div>
        <button
          className={styles.carouselArrow}
          onClick={handleNext}
          disabled={start === maxStart}
          aria-label="Sledeći proizvodi"
        >
          &#8594;
        </button>
      </div>
    </section>
  );
};

export default Category;

import useFetch from '@/hooks/useFetch';
import { fetchAllProducts } from '@/api/productsAPI';
import type { Product } from '@/types/product';
import './ProductsPage.module.scss';
import Products from '@/components/Products/Products';
import { useNavigate } from 'react-router-dom';
import Loader from '@/components/Loader/Loader';

const ProductsPage = () => {
  const navigate = useNavigate();
  const { data: products, loading, error } = useFetch<Product[]>(fetchAllProducts);

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;

  const mappedProducts = products || [];

  const handleProductClick = (id: string | number) => {
    navigate(`/products/${id}`);
  };

  return (
    <div>
      <Products products={mappedProducts} onProductClick={handleProductClick} />
    </div>
  );
};

export default ProductsPage;

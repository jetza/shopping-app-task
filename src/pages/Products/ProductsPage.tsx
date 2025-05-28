import useFetch from '@/hooks/useFetch';
import { fetchAllProducts } from '@/api/productsAPI';
import type { Product } from '@/types/product';
import './ProductsPage.module.scss';
import Products from '@/components/Products/Products';
import { useNavigate } from 'react-router-dom';
import Loader from '@/components/Loader/Loader';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/slices/cartSlice';

const ProductsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: products, loading, error } = useFetch<Product[]>(fetchAllProducts);

  if (loading) return <Loader />;
  if (error) return <p>{t('productsPage.error')}</p>;

  const mappedProducts = products || [];

  const handleProductDetails = (id: string | number) => {
    navigate(`/products/${id}`);
  };

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  return (
    <div>
      <Products
        products={mappedProducts}
        onProductDetails={handleProductDetails}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default ProductsPage;

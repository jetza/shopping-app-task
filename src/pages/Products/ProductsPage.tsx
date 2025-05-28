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
import Toast from '@/components/Toast/Toast';
import { useState } from 'react';

const ProductsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: products, loading, error } = useFetch<Product[]>(fetchAllProducts);
  const [showNotif, setShowNotif] = useState(false);

  if (loading) return <Loader />;
  if (error) return <p>{t('productsPage.error')}</p>;

  const mappedProducts = products || [];

  const handleProductDetails = (id: string | number) => {
    navigate(`/products/${id}`);
  };

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
    setShowNotif(true);
    setTimeout(() => setShowNotif(false), 2000);
  };

  return (
    <div>
      {showNotif ? <Toast message={t('toast.addedToCart')} /> : null}
      <Products
        products={mappedProducts}
        onProductDetails={handleProductDetails}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default ProductsPage;

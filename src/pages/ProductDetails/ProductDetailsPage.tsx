import { useParams } from 'react-router-dom';
import { fetchProductById } from '@/api/productsAPI';
import useFetch from '@/hooks/useFetch';
import type { Product } from '@/types/product';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/slices/cartSlice';
import { useCallback, useState } from 'react';
import ProductDetail from '@/components/ProductDetail/ProductDetail';
import Loader from '@/components/Loader/Loader';
import { useTranslation } from 'react-i18next';
import Toast from '@/components/Toast/Toast';

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [showNotif, setShowNotif] = useState(false);

  const fetchProduct = useCallback(() => fetchProductById(id!), [id]);
  const { data: product, loading, error } = useFetch<Product>(fetchProduct);

  if (loading) return <Loader />;
  if (error || !product) return <p>{t('productDetail.error')}</p>;

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setShowNotif(true);
    setTimeout(() => setShowNotif(false), 2000);
  };

  return (
    <>
      {showNotif ? <Toast message={t('toast.addedToCart')} /> : null}
      <ProductDetail product={product} onAddToCart={handleAddToCart} />
    </>
  );
};

export default ProductDetailsPage;

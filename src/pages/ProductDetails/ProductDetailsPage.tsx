import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProductById } from '@/api/productsAPI';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/slices/cartSlice';
import { useCallback, useState } from 'react';
import ProductDetail from '@/components/ProductDetail/ProductDetail';
import Loader from '@/components/Loader/Loader';
import { useTranslation } from 'react-i18next';
import Toast from '@/components/Toast/Toast';

const ProductDetailsPage = () => {
  const { id } = useParams<{ id?: string }>();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [showNotif, setShowNotif] = useState(false);

  const {
    data: product,
    isLoading: loading,
    isError: error,
  } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id!),
    enabled: !!id,
  });

  const handleAddToCart = useCallback(() => {
    if (!product) return;
    dispatch(addToCart(product));
    setShowNotif(true);
    setTimeout(() => setShowNotif(false), 2000);
  }, [dispatch, product]);

  if (loading) return <Loader />;
  if (error || !product) return <Toast message={t('productDetail.error')} error />;

  return (
    <>
      {showNotif && <Toast message={t('toast.addedToCart')} />}
      <ProductDetail product={product} onAddToCart={handleAddToCart} />
    </>
  );
};

export default ProductDetailsPage;

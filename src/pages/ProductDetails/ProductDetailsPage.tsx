import { useParams } from 'react-router-dom';
import { fetchProductById } from '@/api/productsAPI';
import useFetch from '@/hooks/useFetch';
import type { Product } from '@/types/product';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/slices/cartSlice';
import { useCallback } from 'react';
import ProductDetail from '@/components/ProductDetail/ProductDetail';
import Loader from '@/components/Loader/Loader';
import { useTranslation } from 'react-i18next';

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const fetchProduct = useCallback(() => fetchProductById(id!), [id]);
  const { data: product, loading, error } = useFetch<Product>(fetchProduct);

  if (loading) return <Loader />;
  if (error || !product) return <p>{t('productDetail.error')}</p>;

  return <ProductDetail product={product} onAddToCart={() => dispatch(addToCart(product))} />;
};

export default ProductDetailsPage;

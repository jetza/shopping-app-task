import { useParams } from 'react-router-dom';
import { fetchProductById } from '@/api/productsAPI';
import useFetch from '@/hooks/useFetch';
import type { Product } from '@/types/product';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/slices/cartSlice';
import { useCallback } from 'react';
import ProductDetail from '@/components/ProductDetail/ProductDetail';

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  const fetchProduct = useCallback(() => fetchProductById(id!), [id]);
  const { data: product, loading, error } = useFetch<Product>(fetchProduct);

  if (loading) return <p>Loading...</p>;
  if (error || !product) return <p>Error fetching product details.</p>;

  return <ProductDetail product={product} onAddToCart={() => dispatch(addToCart(product))} />;
};

export default ProductDetailsPage;

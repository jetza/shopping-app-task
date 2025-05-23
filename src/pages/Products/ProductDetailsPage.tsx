import { useParams } from 'react-router-dom';
import { fetchProductById } from '@/api/productsAPI';
import useFetch from '@/hooks/useFetch';
import type { Product } from '@/types/product';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/slices/cartSlice';
import { useCallback } from 'react';

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  const fetchProduct = useCallback(() => fetchProductById(id!), [id]);
  const { data: product, loading, error } = useFetch<Product>(fetchProduct);

  if (loading) return <p>Loading...</p>;
  if (error || !product) return <p>Error fetching product details.</p>;

  return (
    <div className="product-details">
      <img src={product.image} alt={product.title} width="200" />
      <h2>{product.title}</h2>
      <p>
        <strong>Price:</strong> {product.price} $
      </p>
      <p>
        <strong>Description:</strong> {product.description}
      </p>
      <p>
        <strong>Category:</strong> {product.category}
      </p>
      <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
    </div>
  );
};

export default ProductDetailsPage;

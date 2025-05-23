import { Link } from 'react-router-dom';
import useFetch from '@/hooks/useFetch';
import { fetchAllProducts } from '@/api/productsAPI';
import type { Product } from '@/types/product';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/slices/cartSlice';
import './ProductsPage.module.scss';

const ProductsPage = () => {
  const { data: products, loading, error } = useFetch<Product[]>(fetchAllProducts);
  const dispatch = useDispatch();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Products</h2>
      <div className="product-grid">
        {products?.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} width="100" />
            <h3>{product.title}</h3>
            <p>{product.description?.slice(0, 80)}...</p>
            <p>
              <strong>{product.price} $</strong>
            </p>
            <button onClick={() => dispatch(addToCart(product))}>Dodaj u korpu</button>
            <Link to={`/products/${product.id}`}>
              <button>Detalji</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;

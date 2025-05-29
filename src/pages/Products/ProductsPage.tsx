import { useProductsQuery } from '@/api/useProductsQuery';
import type { Product } from '@/types/product';
import Products from '@/components/Products/Products';
import { useNavigate } from 'react-router-dom';
import Loader from '@/components/Loader/Loader';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/slices/cartSlice';
import Toast from '@/components/Toast/Toast';
import { useCallback, useState } from 'react';

const ProductsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: products, isLoading: loading, isError: error } = useProductsQuery();
  const [showNotif, setShowNotif] = useState(false);

  const handleProductDetails = useCallback(
    (id: string | number) => {
      navigate(`/products/${id}`);
    },
    [navigate],
  );

  const handleAddToCart = useCallback(
    (product: Product) => {
      dispatch(addToCart(product));
      setShowNotif(true);
      setTimeout(() => setShowNotif(false), 2000);
    },
    [dispatch],
  );

  if (loading) return <Loader />;
  if (error) return <Toast message={t('productsPage.error')} error />;

  const mappedProducts = products || [];

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

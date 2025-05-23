import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '@/pages/Login/LoginPage';
import ProductsPage from '@/pages/Products/ProductsPage';
import CartPage from '@/pages/Cart/CartPage';
import ProductDetailsPage from '@/pages/Products/ProductDetailsPage';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/login" />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/products" element={<ProductsPage />} />
    <Route path="/products/:id" element={<ProductDetailsPage />} />
    <Route path="/cart" element={<CartPage />} />
  </Routes>
);

export default AppRoutes;

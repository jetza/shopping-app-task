import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '@/pages/Login/LoginPage';
import ProductsPage from '@/pages/Products/ProductsPage';
import CartPage from '@/pages/Cart/CartPage';
import ProductDetailsPage from '@/pages/ProductDetails/ProductDetailsPage';
import NotFoundPage from '@/pages/NotFound/NotFoundPage';
import FAQPage from '@/pages/FAQ/FAQPage';
import ContactPage from '@/pages/Contact/ContactPage';
import UserSettings from '@/components/UserSettings/UserSettings';
import BrendsPage from '@/pages/Brends/BrendsPage';
import NewArrivalsPage from '@/pages/NewArrivals/NewArrivalsPage';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/login" />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/products" element={<ProductsPage />} />
    <Route path="/products/:id" element={<ProductDetailsPage />} />
    <Route path="/cart" element={<CartPage />} />
    <Route path="/faq" element={<FAQPage />} />
    <Route path="/contact" element={<ContactPage />} />
    <Route path="/settings" element={<UserSettings />} />
    <Route path="/brends" element={<BrendsPage />} />
    <Route path="/new-arrivals" element={<NewArrivalsPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default AppRoutes;

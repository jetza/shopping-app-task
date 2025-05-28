import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Loader from '@/components/Loader/Loader';

const LoginPage = lazy(() => import('@/pages/Login/LoginPage'));
const ProductsPage = lazy(() => import('@/pages/Products/ProductsPage'));
const CartPage = lazy(() => import('@/pages/Cart/CartPage'));
const ProductDetailsPage = lazy(() => import('@/pages/ProductDetails/ProductDetailsPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFound/NotFoundPage'));
const FAQPage = lazy(() => import('@/pages/FAQ/FAQPage'));
const ContactPage = lazy(() => import('@/pages/Contact/ContactPage'));
const UserSettings = lazy(() => import('@/components/UserSettings/UserSettings'));
const BrendsPage = lazy(() => import('@/pages/Brends/BrendsPage'));
const NewArrivalsPage = lazy(() => import('@/pages/NewArrivals/NewArrivalsPage'));
const CategoriesPage = lazy(() => import('@/pages/Categories/CategoriesPage'));

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/login" />} />
    <Route
      path="/login"
      element={
        <Suspense fallback={<Loader />}>
          <LoginPage />
        </Suspense>
      }
    />
    <Route
      path="/products"
      element={
        <Suspense fallback={<Loader />}>
          <ProductsPage />
        </Suspense>
      }
    />
    <Route
      path="/products/:id"
      element={
        <Suspense fallback={<Loader />}>
          <ProductDetailsPage />
        </Suspense>
      }
    />
    <Route
      path="/cart"
      element={
        <Suspense fallback={<Loader />}>
          <CartPage />
        </Suspense>
      }
    />
    <Route
      path="/faq"
      element={
        <Suspense fallback={<Loader />}>
          <FAQPage />
        </Suspense>
      }
    />
    <Route
      path="/contact"
      element={
        <Suspense fallback={<Loader />}>
          <ContactPage />
        </Suspense>
      }
    />
    <Route
      path="/settings"
      element={
        <Suspense fallback={<Loader />}>
          <UserSettings />
        </Suspense>
      }
    />
    <Route
      path="/brends"
      element={
        <Suspense fallback={<Loader />}>
          <BrendsPage />
        </Suspense>
      }
    />
    <Route
      path="/new-arrivals"
      element={
        <Suspense fallback={<Loader />}>
          <NewArrivalsPage />
        </Suspense>
      }
    />
    <Route
      path="/categories"
      element={
        <Suspense fallback={<Loader />}>
          <CategoriesPage />
        </Suspense>
      }
    />
    <Route
      path="*"
      element={
        <Suspense fallback={<Loader />}>
          <NotFoundPage />
        </Suspense>
      }
    />
  </Routes>
);

export default AppRoutes;

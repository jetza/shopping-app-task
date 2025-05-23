import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/slices/authSlice';
import cartReducer from '@/slices/cartSlice';
import themeReducer from '@/slices/themeSlice';

let initialCart = { items: [] };

try {
  const persistedCart = localStorage.getItem('cart');
  if (persistedCart) {
    initialCart = JSON.parse(persistedCart);
  }
} catch (error) {
  console.error('Failed to parse cart from localStorage:', error);
}

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    theme: themeReducer,
  },
  preloadedState: {
    cart: initialCart,
  },
});

store.subscribe(() => {
  localStorage.setItem('cart', JSON.stringify(store.getState().cart));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

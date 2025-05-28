import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import { Provider, useSelector } from 'react-redux';
import { store } from '@/store/store';
import type { RootState } from '@/store/store';
import './styles/global.scss';
import './i18n';
import { QueryClientProvider, queryClient } from '@/api/reactQueryClient';

function ThemeWrapper() {
  const theme = useSelector((state: RootState) => state.theme.current);

  useEffect(() => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
  }, [theme]);

  return <App />;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeWrapper />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
);

// Service Worker registration for image caching
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((err) => {
      console.warn('Service Worker registration failed:', err);
    });
  });
}

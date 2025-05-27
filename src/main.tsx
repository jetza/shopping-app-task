import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import { Provider, useSelector } from 'react-redux';
import { store } from '@/store/store';
import type { RootState } from '@/store/store';
import './styles/global.scss';

// Komponenta koja reaguje na promenu teme u Redux-u
function ThemeWrapper() {
  const theme = useSelector((state: RootState) => state.theme.current);

  useEffect(() => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
  }, [theme]);

  return <App />;
}

// Render aplikacije
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeWrapper />
    </Provider>
  </React.StrictMode>,
);

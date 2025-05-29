import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import './styles/global.scss';
import './i18n';
import { QueryClientProvider, queryClient } from '@/api/reactQueryClient';
import ThemeWrapper from '@/ThemeWrapper';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeWrapper />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
);

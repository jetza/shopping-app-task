import { BrowserRouter } from 'react-router-dom';
import AppRoutes from '@/routes/AppRoutes';
import MainLayout from '@/layouts/MainLayout';

const App = () => (
  <BrowserRouter>
    <MainLayout>
      <AppRoutes />
    </MainLayout>
  </BrowserRouter>
);

export default App;

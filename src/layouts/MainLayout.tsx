import { useLocation } from 'react-router-dom';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const hideFooter = location.pathname === '/login';
  return (
    <>
      <Header />
      <main>{children}</main>
      {!hideFooter && <Footer />}
    </>
  );
};

export default MainLayout;

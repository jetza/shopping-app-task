import { useLocation } from 'react-router-dom';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import styles from './MainLayout.module.scss';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const hideFooter = location.pathname === '/login';
  return (
    <>
      <Header />
      <main className={styles.main}>{children}</main>
      {!hideFooter && <Footer />}
    </>
  );
};

export default MainLayout;

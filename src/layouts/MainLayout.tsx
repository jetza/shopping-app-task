import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';

const MainLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header />
    <main>{children}</main>
    <Footer />
  </>
);

export default MainLayout;

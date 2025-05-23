import Header from '@/components/Header/Header';

const MainLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header />
    <main>{children}</main>
  </>
);

export default MainLayout;

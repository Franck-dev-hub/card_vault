import { useResponsive } from '../../hooks/useResponsive';
import { Navbar } from '../Navigation/Navbar';
import { FooterNav } from '../Navigation/FooterNav';

export const MainLayout = ({ children }) => {
  const isMobile = useResponsive();

  return (
    <div className="min-h-screen flex flex-col">
      {!isMobile && <Navbar />}
      <main className="flex-1 overflow-auto pb-20 md:pb-0">
        {children}
      </main>
      {isMobile && <FooterNav />}
    </div>
  );
};

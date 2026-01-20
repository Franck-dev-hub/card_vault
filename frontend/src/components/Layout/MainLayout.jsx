import { useState } from 'react';
import { useResponsive } from '../../hooks/useResponsive';
import { User } from 'lucide-react';
import { Navbar } from '../Navigation/Navbar';
import { FooterNav } from '../Navigation/FooterNav';
import { UserMenu } from '../Navigation/UserMenu';

export const MainLayout = ({ children }) => {
  const isMobile = useResponsive();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    // Fond global avec gradient
    <div className="min-h-screen bg-[radial-gradient(circle_at_30%_150px,_#c5e2ff,_#5aa9ff_35%,_#f8fbff_80%)]">
      {/* Bloc interne pour le contenu, SANS bg-white */}
      <div className="min-h-screen flex flex-col">
        {/* Header desktop (Navbar) */}
        {!isMobile && <Navbar />}

        {/* Header mobile */}
        {isMobile && (
          <header style={{ margin: '2rem', marginTop: '3rem' }}>
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
              <button
                className="btn btn-circle"
                onClick={() => setIsUserMenuOpen(true)}
              >
                <User size={24} />
              </button>
            </div>
          </header>
        )}

        {/* Zone de contenu : laisse le gradient visible */}
        <main className="flex-1 overflow-auto pb-20 md:pb-0">
          {children}
        </main>

        {isMobile && <FooterNav />}

        {/* UserMenu mobile qui glisse depuis la droite */}
        {isMobile && (
          <UserMenu isOpen={isUserMenuOpen} onClose={() => setIsUserMenuOpen(false)} />
        )}
      </div>
    </div>
  );
};

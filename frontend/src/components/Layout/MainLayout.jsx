import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useResponsive } from '../../hooks/useResponsive';
import { User, ArrowLeft } from 'lucide-react';
import { Navbar } from '../Navigation/Navbar';
import { FooterNav } from '../Navigation/FooterNav';
import { UserMenu } from '../Navigation/UserMenu';

// Mapping des routes vers les titres de page
const PAGE_TITLES = {
  '/': 'Dashboard',
  '/dashboard': 'Dashboard',
  '/login': 'Login',
  '/create-account': 'Create Account',
  '/statistics': 'Statistics',
  '/scan': 'Scan',
  '/vault': 'Vault',
  '/research': 'Research',
  '/parameter': 'Parameter',
  '/profile': 'Profile',
};

// Pages qui DOIVENT afficher le bouton retour
const PAGES_WITH_BACK_BUTTON = [
  '/statistics',
  '/scan',
  '/vault',
  '/research',
  '/parameter',
  '/profile',
];

export const MainLayout = ({ children }) => {
  const isMobile = useResponsive();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Obtenir le titre de la page actuelle
  const currentPageTitle = PAGE_TITLES[location.pathname] || 'Page';
  
  // Vérifier si on doit afficher le bouton retour
  const showBackButton = PAGES_WITH_BACK_BUTTON.includes(location.pathname);

  return (
    // Fond global avec gradient
    <div className="h-screen bg-app-gradient overflow-hidden">
      {/* Bloc interne pour le contenu, SANS bg-white */}
      <div className="h-full flex flex-col">
        {/* Header desktop (Navbar) */}
        {!isMobile && <Navbar />}

        {/* Header mobile - Style navbar desktop sans burger */}
        {isMobile && (
          <div className="relative z-50">
            {/* Première barre - Logo + Card Vault */}
            <div className="bg-gradient-to-r from-blue-700 to-blue-200 shadow-lg rounded-b-lg">
              <div className="flex items-center justify-center px-4 py-3">
                <img 
                  src="image/logo_card_vault.png" 
                  alt="Logo" 
                  className="h-16 w-16"
                />
                <div style={{ marginLeft: '20px' }}>
                  <h1 className="font-extrabold text-3xl tracking-wide bg-gradient-to-r from-blue-600 to-white bg-clip-text text-transparent [-webkit-text-stroke:0.5px_#ffffff] drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
                    Card Vault
                  </h1>
                </div>
              </div>
            </div>

            {/* Deuxième barre - Bouton retour (conditionnel) + Titre + Avatar */}
            <div className="flex items-center w-full mt-2 px-4 h-16 bg-gradient-to-r from-gray-400 via-gray-200 to-white rounded-full mx-2 shadow-md">
              
              {/* Bouton retour (affiché conditionnellement) */}
              {showBackButton ? (
                <button
                  onClick={() => navigate(-1)}
                  className="btn btn-circle border-2 border-black bg-transparent hover:bg-gray-100"
                  style={{ marginLeft: '10px' }}
                  aria-label="Retour"
                >
                  <ArrowLeft size={24} strokeWidth={1.5} className="text-black" />
                </button>
              ) : (
                // Espace vide à gauche pour équilibrer quand pas de bouton retour
                <div style={{ width: '48px' }}></div>
              )}

              {/* Titre de la page centré */}
              <div className="flex-1 flex justify-center">
                <div className="w-70 h-12.5 flex items-center justify-center bg-linear-to-r from-blue-700 to-blue-200 rounded-full shadow-lg border-4 border-white">
                  <span className="text-xl font-bold text-white tracking-wide drop-shadow-md">{currentPageTitle}</span>
                </div>
              </div>

              {/* Bouton avatar */}
              <button
                className="btn btn-circle border-2 border-black bg-transparent hover:bg-gray-100"
                style={{ marginRight: '10px' }}
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <User size={24} strokeWidth={1.5} className="text-black" />
              </button>
            </div>
          </div>
        )}

        {/* Zone de contenu : laisse le gradient visible */}
        <main className="flex-1 overflow-auto">
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
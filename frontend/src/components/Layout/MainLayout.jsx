import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useResponsive } from '../../hooks/useResponsive';
import { User, ArrowLeft } from 'lucide-react';
import { Navbar } from '../Navigation/Navbar';
import { FooterNav } from '../Navigation/FooterNav';
import { UserMenu } from '../Navigation/UserMenu';
import { useTheme } from '../../contexts/ThemeContext';


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
  '/parameters': 'Parameters',
  '/profile': 'Profile',
  '/about': 'About',
  '/About': 'About',
  '/about/faq': 'FAQ',
  '/about/legal-notices': 'Legal notices',
  '/about/terms': 'Terms',
  '/about/confidentiality': 'Confidentiality',
  '/about/cookies': 'Cookies',
  '/about/contacts': 'Contacts',
};


// Pages qui DOIVENT afficher le bouton retour
const PAGES_WITH_BACK_BUTTON = [
  '/statistics',
  '/scan',
  '/vault',
  '/research',
  '/parameters',
  '/profile',
];


// Pages accessibles uniquement aux utilisateurs authentifiés (affiche le FooterNav)
const AUTHENTICATED_PAGES = [
  '/',
  '/dashboard',
  '/statistics',
  '/scan',
  '/vault',
  '/research',
  '/parameters',
  '/profile',
];


export const MainLayout = ({ children }) => {
  const isMobile = useResponsive();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  
  // Vérifier si on est sur une page /about (insensible à la casse)
  const isAboutPage = location.pathname.toLowerCase().startsWith('/about');

  // Obtenir le titre de la page actuelle
  const currentPageTitle = PAGE_TITLES[location.pathname] || 'Page';

  // Vérifier si on doit afficher le bouton retour
  const showBackButton = PAGES_WITH_BACK_BUTTON.includes(location.pathname) ||
                         location.pathname.toLowerCase().startsWith('/about/');

  // Vérifier si l'utilisateur est sur une page authentifiée (affiche le FooterNav)
  const isOnAuthenticatedPage = AUTHENTICATED_PAGES.includes(location.pathname);

  // Afficher le FooterNav sur les pages authentifiées ET les pages /about
  const showFooterNav = isOnAuthenticatedPage || isAboutPage;


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
            <div className={`shadow-lg rounded-b-lg transition-colors duration-300 ${
              isDark
                ? 'bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900'
                : 'bg-gradient-to-r from-blue-600 via-blue-400 to-purple-500'
            }`}>
              <div className="flex items-center justify-center px-4 py-3">
                <img
                  src="/image/logo_card_vault.png"
                  alt="Logo"
                  className="h-16 w-16"
                />
                <div style={{ marginLeft: '20px' }}>
                  <h1 className="font-extrabold text-3xl tracking-wide bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
                    Card Vault
                  </h1>
                </div>
              </div>
            </div>


            {/* Deuxième barre - Bouton retour (conditionnel) + Titre + Dark Mode + Avatar */}
            <div className={`flex items-center w-full mt-2 px-4 h-16 rounded-full mx-2 shadow-md transition-colors duration-300 ${
              isDark
                ? 'bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600'
                : 'bg-gradient-to-r from-gray-400 via-gray-200 to-white'
            }`}>


              {/* Bouton retour (affiché conditionnellement) */}
              {showBackButton ? (
                <button
                  onClick={() => navigate(-1)}
                  className={`btn btn-circle border-2 bg-transparent transition-colors ${
                    isDark
                      ? 'border-gray-400 hover:bg-gray-600 text-gray-200'
                      : 'border-black hover:bg-gray-100 text-black'
                  }`}
                  style={{ marginLeft: '10px' }}
                  aria-label="Retour"
                >
                  <ArrowLeft size={24} strokeWidth={1.5} />
                </button>
              ) : (
                // Espace vide à gauche pour équilibrer quand pas de bouton retour
                <div style={{ width: '48px' }}></div>
              )}


              {/* Titre de la page centré */}
              <div className="flex-1 flex justify-center">
                <div className={`w-70 h-12.5 flex items-center justify-center rounded-full shadow-lg border-4 transition-colors duration-300 ${
                  isDark
                    ? 'bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 border-gray-600'
                    : 'bg-gradient-to-r from-blue-600 via-blue-400 to-purple-500 border-white'
                }`}>
                  <span className="text-xl font-bold text-white tracking-wide drop-shadow-md">{currentPageTitle}</span>
                </div>
              </div>


              {/* Bouton avatar */}
              <button
                className={`btn btn-circle border-2 bg-transparent transition-colors ${
                  isDark
                    ? 'border-gray-400 hover:bg-gray-600 text-gray-200'
                    : 'border-black hover:bg-gray-100 text-black'
                }`}
                style={{ marginRight: '10px' }}
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <User size={24} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        )}


        {/* Zone de contenu : laisse le gradient visible */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>


        {isMobile && showFooterNav && <FooterNav />}


        {/* UserMenu mobile qui glisse depuis la droite */}
        {isMobile && (
          <UserMenu isOpen={isUserMenuOpen} onClose={() => setIsUserMenuOpen(false)} />
        )}
      </div>
    </div>
  );
};

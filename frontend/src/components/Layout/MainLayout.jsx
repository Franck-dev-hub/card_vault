import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useResponsive } from "../../hooks/useResponsive";
import { User, ArrowLeft } from "lucide-react";
import { Navbar } from "../Navigation/Navbar";
import { FooterNav } from "../Navigation/FooterNav";
import { UserMenu } from "../Navigation/UserMenu";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";

// Mapping des routes vers les titres de page
const PAGE_TITLES = {
  "/": "Dashboard",
  "/dashboard": "Dashboard",
  "/login": "Login",
  "/create-account": "Create Account",
  "/statistics": "Statistics",
  "/scan": "Scan",
  "/vault": "Vault",
  "/search": "Search",
  "/settings": "Settings",
  "/profile": "Profile",
  "/about": "About",
  "/About": "About",
  "/about/faq": "FAQ",
  "/about/legal-notices": "Legal notices",
  "/about/terms": "Terms",
  "/about/confidentiality": "Confidentiality",
  "/about/cookies": "Cookies",
  "/about/contacts": "Contacts",
};

// Pages qui DOIVENT afficher le bouton retour
const PAGES_WITH_BACK_BUTTON = [
  "/statistics",
  "/scan",
  "/vault",
  "/search",
  "/settings",
  "/profile",
];

// Pages accessibles uniquement aux utilisateurs authentifiés (affiche le FooterNav)
const AUTHENTICATED_PAGES = [
  "/",
  "/dashboard",
  "/statistics",
  "/scan",
  "/vault",
  "/search",
  "/settings",
  "/profile",
];

// Pages invité avec header minimal (bouton retour vers /)
const GUEST_PAGES_WITH_BACK = ["/login", "/create-account"];

export const MainLayout = ({ children }) => {
  const isMobile = useResponsive();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const { isAuthenticated } = useAuth();

  // Vérifier si on est sur une page /about (insensible à la casse)
  const isAboutPage = location.pathname.toLowerCase().startsWith("/about");

  // Vérifier si on est sur une page invité avec bouton retour
  const isGuestPageWithBack = GUEST_PAGES_WITH_BACK.includes(location.pathname);

  // Obtenir le titre de la page actuelle
  const currentPageTitle = PAGE_TITLES[location.pathname] || "Page";

  // Vérifier si on doit afficher le bouton retour
  // Inclut les pages /about et les pages invité pour les utilisateurs non authentifiés (retour vers /)
  const showBackButton =
    PAGES_WITH_BACK_BUTTON.includes(location.pathname) ||
    location.pathname.toLowerCase().startsWith("/about/") ||
    (isAboutPage && !isAuthenticated) ||
    isGuestPageWithBack;

  // Vérifier si l'utilisateur est sur une page authentifiée (affiche le FooterNav)
  const isOnAuthenticatedPage = AUTHENTICATED_PAGES.includes(location.pathname);

  // Afficher le FooterNav seulement si l'utilisateur est authentifié
  // Sur les pages /about, on ne montre la nav que si l'utilisateur est connecté
  const showFooterNav =
    isOnAuthenticatedPage || (isAboutPage && isAuthenticated);

  // Afficher la Navbar desktop seulement si l'utilisateur est authentifié ou sur une page authentifiée
  const showNavbar = isOnAuthenticatedPage || (isAboutPage && isAuthenticated);

  return (
    // Fond global avec gradient
    <div className="h-dvh bg-app-gradient overflow-hidden">
      {/* Bloc interne pour le contenu, SANS bg-white */}
      <div className="h-full flex flex-col">
        {/* Header desktop (Navbar) - affiché seulement si authentifié ou sur page authentifiée */}
        {!isMobile && showNavbar && <Navbar />}

        {/* Header desktop minimal pour pages invité (about, login, create-account) quand non authentifié */}
        {!isMobile &&
          ((isAboutPage && !isAuthenticated) || isGuestPageWithBack) && (
            <div
              className={`flex items-center px-6 py-4 shadow-md transition-colors duration-300 ${
                isDark
                  ? "bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900"
                  : "bg-gradient-to-r from-blue-600 via-blue-400 to-purple-500"
              }`}
            >
              <button
                onClick={() => navigate("/")}
                className="btn btn-circle border-2 bg-transparent border-white/50 hover:bg-white/10 text-white transition-colors"
                aria-label="Retour à l'accueil"
              >
                <ArrowLeft size={24} strokeWidth={1.5} />
              </button>
              <div className="flex-1 flex justify-center">
                <h1 className="font-extrabold text-2xl tracking-wide text-white drop-shadow-md">
                  {currentPageTitle}
                </h1>
              </div>
              {/* Espace pour équilibrer */}
              <div style={{ width: "48px" }}></div>
            </div>
          )}

        {/* Header mobile - Style navbar desktop sans burger */}
        {isMobile && (
          <div className="relative z-50">
            {/* Première barre - Logo + Card Vault */}
            <div
              className={`shadow-lg rounded-b-lg transition-colors duration-300 ${
                isDark
                  ? "bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900"
                  : "bg-gradient-to-r from-blue-600 via-blue-400 to-purple-500"
              }`}
            >
              <div className="flex items-center justify-center px-4 py-3">
                <img
                  src="/image/logo_card_vault.png"
                  alt="Logo"
                  className="h-16 w-16"
                />
                <div style={{ marginLeft: "20px" }}>
                  <h1 className="font-extrabold text-3xl tracking-wide bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
                    Card Vault
                  </h1>
                </div>
              </div>
            </div>

            {/* Deuxième barre - Bouton retour (conditionnel) + Titre + Dark Mode + Avatar */}
            <div
              className={`flex items-center w-auto mt-2 px-4 h-16 rounded-full mx-2 shadow-2xl backdrop-blur-md border transition-all duration-300 ${
                isDark
                  ? "bg-gray-900/60 border-white/10 shadow-black/40"
                  : "bg-white/70 border-white/40 shadow-gray-200"
              }`}
            >
              {/* Bouton retour (affiché conditionnellement) */}
              {showBackButton ? (
                <button
                  onClick={() =>
                    (isAboutPage && !isAuthenticated) || isGuestPageWithBack
                      ? navigate("/")
                      : navigate(-1)
                  }
                  className={`btn btn-circle border-2 bg-transparent transition-colors ${
                    isDark
                      ? "border-gray-400 hover:bg-gray-600 text-gray-200"
                      : "border-black hover:bg-gray-100 text-black"
                  }`}
                  style={{ marginLeft: "10px" }}
                  aria-label="Retour"
                >
                  <ArrowLeft size={24} strokeWidth={1.5} />
                </button>
              ) : (
                // Espace vide à gauche pour équilibrer quand pas de bouton retour
                <div style={{ width: "48px" }}></div>
              )}

              {/* Titre de la page centré */}
              <div className="flex-1 flex justify-center">
                <div
                  className={`w-70 h-12.5 flex items-center justify-center rounded-full shadow-lg border-4 transition-colors duration-300 ${
                    isDark
                      ? "bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 border-gray-600"
                      : "bg-gradient-to-r from-blue-600 via-blue-400 to-purple-500 border-white"
                  }`}
                >
                  <span className="text-xl font-bold text-white tracking-wide drop-shadow-md">
                    {currentPageTitle}
                  </span>
                </div>
              </div>

              {/* Bouton avatar */}
              <button
                className={`btn btn-circle border-2 bg-transparent transition-colors ${
                  isDark
                    ? "border-gray-400 hover:bg-gray-600 text-gray-200"
                    : "border-black hover:bg-gray-100 text-black"
                }`}
                style={{ marginRight: "10px" }}
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <User size={24} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        )}

        {/* Zone de contenu : laisse le gradient visible */}
        <main
          className={`flex-1 overflow-auto rounded-t-[30px] transition-colors duration-300 ${
            isDark ? "bg-gray-900/40 backdrop-blur-sm" : "bg-white/20"
          }`}
        >
          {children}
        </main>

        {isMobile && showFooterNav && <FooterNav />}

        {/* UserMenu mobile qui glisse depuis la droite */}
        {isMobile && (
          <UserMenu
            isOpen={isUserMenuOpen}
            onClose={() => setIsUserMenuOpen(false)}
            forceGuestMenu={isAboutPage && !showNavbar}
          />
        )}
      </div>
    </div>
  );
};

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useResponsive } from "../../hooks/useResponsive";
import { User, ArrowLeft } from "lucide-react";
import { Navbar } from "../Navigation/Navbar";
import { FooterNav } from "../Navigation/FooterNav";
import { UserMenu } from "../Navigation/UserMenu";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";

/**
 * Maps every known route to its human-readable page title.
 * Defined at module scope so the object reference is stable across renders.
 * Falls back to "Page" for any unknown path.
 */
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

/**
 * Routes that always show a back button in the header.
 * These are authenticated inner pages where the user navigated away from the
 * dashboard, so going back makes sense as the primary exit action.
 */
const PAGES_WITH_BACK_BUTTON = [
  "/statistics",
  "/scan",
  "/vault",
  "/search",
  "/settings",
  "/profile",
];

/**
 * Routes that belong to the authenticated shell.
 * Used to decide whether to show the full Navbar and FooterNav.
 */
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

/**
 * Guest routes that still need a minimal header with a back-to-home button.
 * Keeps unauthenticated users from feeling stranded on the login or
 * create-account pages.
 */
const GUEST_PAGES_WITH_BACK = ["/login", "/create-account"];

/**
 * Application shell that wraps every page with the appropriate header and
 * footer navigation based on authentication state and viewport size.
 *
 * Layout rules:
 *  - **Desktop authenticated**: full `<Navbar>` at the top, no footer nav.
 *  - **Desktop guest** (about / login / create-account): minimal header with
 *    a back-to-home button and a centred page title.
 *  - **Mobile**: two-part header (branding bar + pill nav bar) and a
 *    `<FooterNav>` bottom tab bar when the user is authenticated.
 *  - **UserMenu** slide-in panel is mounted on mobile for all routes so the
 *    user can always reach their account or guest options.
 *
 * @param {{ children: React.ReactNode }} props
 */
export const MainLayout = ({ children }) => {
  const isMobile = useResponsive();
  // Controls the mobile slide-in user menu visibility.
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const { isAuthenticated } = useAuth();

  // Case-insensitive check so "/About" and "/about" are treated identically.
  const isAboutPage = location.pathname.toLowerCase().startsWith("/about");

  const isGuestPageWithBack = GUEST_PAGES_WITH_BACK.includes(location.pathname);

  // Fall back to "Page" for any route not listed in PAGE_TITLES.
  const currentPageTitle = PAGE_TITLES[location.pathname] || "Page";

  // Show the back button for inner authenticated pages, all /about sub-routes,
  // the top-level /about when unauthenticated, and guest pages like /login.
  const showBackButton =
    PAGES_WITH_BACK_BUTTON.includes(location.pathname) ||
    location.pathname.toLowerCase().startsWith("/about/") ||
    (isAboutPage && !isAuthenticated) ||
    isGuestPageWithBack;

  const isOnAuthenticatedPage = AUTHENTICATED_PAGES.includes(location.pathname);

  // Show bottom tab bar only for authenticated pages; on /about show it only
  // if the user is already logged in (otherwise there is nothing to navigate to).
  const showFooterNav =
    isOnAuthenticatedPage || (isAboutPage && isAuthenticated);

  // Mirror the same logic for the desktop Navbar.
  const showNavbar = isOnAuthenticatedPage || (isAboutPage && isAuthenticated);

  return (
    // Full-viewport container with the global gradient background.
    <div className="h-dvh bg-app-gradient overflow-hidden">
      <div className="h-full flex flex-col">
        {/* Desktop: full navigation bar for authenticated / about pages */}
        {!isMobile && showNavbar && <Navbar />}

        {/* Desktop: minimal header for unauthenticated guest pages */}
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
              {/* Spacer mirrors the button width to keep the title centred */}
              <div style={{ width: "48px" }}></div>
            </div>
          )}

        {/* Mobile: two-row header */}
        {isMobile && (
          <div className="relative z-50">
            {/* Row 1: branding bar with logo and app name */}
            <div
              className={`shadow-lg rounded-b-lg transition-colors duration-300 ${
                isDark
                  ? "bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900"
                  : "bg-gradient-to-r from-blue-600 via-blue-400 to-purple-500"
              }`}
            >
              <div className="flex items-center justify-start pl-4! pr-4 py-0.5!">
                <img
                  src="/image/logo_card_vault.webp"
                  alt="Logo"
                  className="h-16 w-16"
                />
                <div style={{ marginLeft: "5px" }}>
                  <a className="flex flex-col items-start leading-none font-sans font-bold italic uppercase tracking-tighter cursor-pointer text-white leading-none">
                    <span className="text-[2rem]">Card</span>
                    <span className="text-[2rem]">Vault</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Row 2: floating pill bar with back button, page title, and avatar */}
            <div
              className={`flex items-center w-auto mt-2 px-4 h-16 rounded-full mx-2 shadow-2xl backdrop-blur-md border transition-all duration-300 ${
                isDark
                  ? "bg-gray-900/60 border-white/10 shadow-black/40"
                  : "bg-white/70 border-white/40 shadow-gray-200"
              }`}
            >
              {/* Back button — navigate(-1) for inner pages, "/" for guest/about pages */}
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
                // Empty spacer keeps the title centred when no back button is shown.
                <div style={{ width: "48px" }}></div>
              )}

              {/* Centred page title pill */}
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

              {/* Avatar button — opens the slide-in UserMenu */}
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

        {/* Page content — semi-transparent so the app gradient shows through */}
        <main
          className={`flex-1 overflow-auto rounded-t-[30px] transition-colors duration-300 ${
            isDark ? "bg-gray-900/40 backdrop-blur-sm" : "bg-white/20"
          }`}
        >
          {children}
        </main>

        {isMobile && showFooterNav && <FooterNav />}

        {/* Slide-in user menu — always mounted on mobile so it can animate out */}
        {isMobile && (
          <UserMenu
            isOpen={isUserMenuOpen}
            onClose={() => setIsUserMenuOpen(false)}
            // On unauthenticated about pages there is no Navbar, so force the
            // guest variant of the menu regardless of auth state.
            forceGuestMenu={isAboutPage && !showNavbar}
          />
        )}
      </div>
    </div>
  );
};

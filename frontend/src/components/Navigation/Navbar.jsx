import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, ChartColumn, Camera, Vault, Search, User, LogIn, LogOut, UserPlus, Globe, ChevronDown, ChevronUp, Settings, Info, ArrowLeft } from 'lucide-react'; // ⬅️ Ajoute ArrowLeft
import { FaDiscord } from 'react-icons/fa';
import { SiBuymeacoffee } from 'react-icons/si';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import ThemeToggle from '../ThemeToggle';


// Pages accessible only to authenticated users
const AUTHENTICATED_PAGES = [
  '/',
  '/dashboard',
  '/statistics',
  '/scan',
  '/vault',
  '/search',
  '/settings',
  '/profile',
  '/about',
];


// Mapping routes to page titles
const PAGE_TITLES = {
  '/': 'Dashboard',
  '/dashboard': 'Dashboard',
  '/login': 'Login',
  '/create-account': 'Create Account',
  '/profile': 'Profile',
  '/settings': 'Settings',
  '/statistics': 'Statistics',
  '/scan': 'Scan',
  '/vault': 'Vault',
  '/search': 'Search',
  '/about': 'About',
  '/about/faq': 'FAQ',
  '/about/legal-notices': 'Legal notices',
  '/about/terms': 'Terms',
  '/about/confidentiality': 'Confidentiality',
  '/about/cookies': 'Cookies',
  '/about/contacts': 'Contacts',
};


const NAV_ITEMS = [
  { name: 'Dashboard', icon: Home, path: '/dashboard' },
  { name: 'Statistics', icon: ChartColumn, path: '/statistics' },
  { name: 'Scan', icon: Camera, path: '/scan' },
  { name: 'Vault', icon: Vault, path: '/vault' },
  { name: 'Search', icon: Search, path: '/search' },
  { name: 'About', icon: Info, path: '/about' },
];


const LANGUAGES = [
  { code: 'fr', name: 'Français' },
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'de', name: 'Deutsch' },
  { code: 'ja', name: '日本語' },
];


const LanguageSelector = ({ label, selectedLang, onSelect, isDark }) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentLang = LANGUAGES.find(l => l.code === selectedLang) || LANGUAGES[0];


  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group flex items-center justify-between w-full px-5 py-4 rounded-2xl border-2 transition-all duration-200 shadow-sm hover:shadow-md ${
          isDark
            ? 'bg-gray-700 border-gray-600 hover:border-blue-400 hover:bg-gray-600'
            : 'bg-white border-blue-100 hover:border-blue-400 hover:bg-blue-50'
        }`}
      >
        <div className="flex items-center gap-4">
          <div className={`p-2 rounded-xl transition-colors ${isDark ? 'bg-gray-600 group-hover:bg-gray-500' : 'bg-blue-100 group-hover:bg-blue-200'}`}>
            <Globe size={24} className={isDark ? 'text-blue-400' : 'text-blue-600'} strokeWidth={2} />
          </div>
          <div className="text-left">
            <span className={`font-semibold text-lg block ${isDark ? 'text-gray-100 group-hover:text-blue-400' : 'text-gray-800 group-hover:text-blue-700'}`}>{label}</span>
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{currentLang.name}</span>
          </div>
        </div>
        <div className={isDark ? 'text-blue-400' : 'text-blue-600'}>
          {isOpen ? (
            <ChevronUp size={20} strokeWidth={2} />
          ) : (
            <ChevronDown size={20} strokeWidth={2} />
          )}
        </div>
      </button>


      {isOpen && (
        <div className="mt-2 ml-12 flex flex-col gap-1">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                onSelect(lang.code);
                setIsOpen(false);
              }}
              className={`
                text-left px-4 py-3 rounded-xl transition-all duration-200 font-medium
                ${selectedLang === lang.code
                  ? 'bg-blue-500 text-white shadow-md'
                  : isDark
                    ? 'bg-gray-600 text-gray-200 hover:bg-gray-500 hover:text-blue-400 border border-gray-500'
                    : 'bg-white text-gray-700 hover:bg-blue-100 hover:text-blue-700 border border-blue-100'
                }
              `}
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};


export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const [appLanguage, setAppLanguage] = useState('fr');
  const [cardsLanguage, setCardsLanguage] = useState('en');
  const menuRef = useRef(null);
  const avatarMenuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const { logout } = useAuth();


  // Get the title of the current page
  const currentPageTitle = PAGE_TITLES[location.pathname] || 'Page';


  // Check if the user is on an authenticated page
  const isAuthenticated = AUTHENTICATED_PAGES.includes(location.pathname);

   // Display the back button for subpages /about/*
  const showBackButton = location.pathname.startsWith('/about/') ||
                         location.pathname === '/profile' ||
                         location.pathname === '/settings';


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      if (avatarMenuRef.current && !avatarMenuRef.current.contains(event.target)) {
        setIsAvatarOpen(false);
      }
    };


    if (isOpen || isAvatarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, isAvatarOpen]);


  return (
    <div className="relative z-50">
      {/* Navbar */}
      <div className={`navbar shadow-sm rounded-b-lg transition-colors duration-300 ${
        isDark
          ? 'bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900'
          : 'bg-gradient-to-r from-blue-600 via-blue-400 to-purple-500'
      }`}>
        <div className="flex-1 flex items-center">
          <img src="/image/logo_card_vault.png" alt="Logo" className="h-20 w-20 p-200" style={{ marginLeft: '40px' }} />
          <div style={{ marginLeft: '40px' }}>
            <a className="btn btn-ghost p-1 hover:bg-transparent font-sans font-extrabold text-4xl tracking-wide bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
              Card Vault
            </a>
          </div>
        </div>
      </div>


      {/* Burger container + avatar */}
      <div className={`flex items-center w-full mt-2 pl-4 pr-8 h-16 rounded-full mx-4 shadow-md transition-colors duration-300 ${
        isDark
          ? 'bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600'
          : 'bg-gradient-to-r from-gray-400 via-gray-200 to-white'
      }`}>


        {/* Burger button */}
        <div style={{ marginLeft: '20px' }}>
          <button
            className={`btn btn-circle border-2 bg-transparent transition-colors ${
              isDark
                ? 'border-gray-400 hover:bg-gray-600 text-gray-200'
                : 'border-black hover:bg-gray-100 text-black'
            }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Back button (displayed conditionally) */}
        {showBackButton && (
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
        )}


        {/* Centered page title */}
        <div className="flex-1 flex justify-center">
          <div className={`w-[350px] h-[60px] flex items-center justify-center rounded-full shadow-lg border-4 transition-colors duration-300 ${
            isDark
              ? 'bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 border-gray-600'
              : 'bg-gradient-to-r from-blue-600 via-blue-400 to-purple-500 border-white'
          }`}>
            <span className="text-2xl font-bold text-white tracking-wide drop-shadow-md">{currentPageTitle}</span>
          </div>
        </div>


        {/* Avatar button */}
        <div style={{ marginRight: '20px' }}>
          <button
            className={`btn btn-circle border-2 bg-transparent transition-colors ${
              isDark
                ? 'border-gray-400 hover:bg-gray-600 text-gray-200'
                : 'border-black hover:bg-gray-100 text-black'
            }`}
            onClick={() => setIsAvatarOpen(!isAvatarOpen)}
          >
            <User size={24} strokeWidth={1.5} />
          </button>
        </div>


      </div>


      {/* Burger panel sliding in from the left - below the navbar */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}


      <div
        ref={menuRef}
        className={`
          absolute left-0 top-full h-[calc(100vh-0px)] w-80
          transform transition-all duration-300 ease-in-out
          z-40 shadow-2xl overflow-y-auto rounded-tr-3xl rounded-br-3xl border-r-2 border-b-2
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          ${isDark
            ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700'
            : 'bg-gradient-to-br from-blue-50 to-white border-blue-200'
          }
        `}
      >
        {/* Items menu */}
        <nav className="flex flex-col items-center gap-4 p-8">
          <div className="h-8"></div>


          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={`group flex items-center gap-4 px-6 py-4 w-[85%] rounded-2xl border-2 transition-all duration-200 shadow-sm hover:shadow-md ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 hover:border-blue-400 hover:bg-gray-600'
                    : 'bg-white border-blue-100 hover:border-blue-400 hover:bg-blue-50'
                }`}
              >
                <div className={`p-2 rounded-xl transition-colors ${isDark ? 'bg-gray-600 group-hover:bg-gray-500' : 'bg-blue-100 group-hover:bg-blue-200'}`}>
                  <Icon size={24} className={isDark ? 'text-blue-400' : 'text-blue-600'} strokeWidth={2} />
                </div>
                <span className={`font-semibold text-lg ${isDark ? 'text-gray-100 group-hover:text-blue-400' : 'text-gray-800 group-hover:text-blue-700'}`}>{item.name}</span>
              </a>
            );
          })}
        </nav>
      </div>


      {/* Avatar panel sliding in from the right - below the navbar */}
      {isAvatarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 transition-opacity duration-300"
          onClick={() => setIsAvatarOpen(false)}
        />
      )}


      <div
        ref={avatarMenuRef}
        className={`
          absolute right-0 top-[145px] h-[calc(100vh-145px)] w-80
          transform transition-all duration-300 ease-in-out
          z-50 shadow-2xl overflow-y-auto rounded-tl-3xl rounded-bl-3xl border-l-2 border-b-2
          ${isAvatarOpen ? 'translate-x-0' : 'translate-x-full'}
          ${isDark
            ? 'bg-gradient-to-bl from-gray-800 to-gray-900 border-gray-700'
            : 'bg-gradient-to-bl from-blue-50 to-white border-blue-200'
          }
        `}
      >


        {/* Items menu */}
        <nav className="flex flex-col items-center gap-4 p-8 pb-16 h-full">
          <div className="h-4"></div>


          {isAuthenticated ? (
            <>
              {/* Menu for authenticated users */}


              {/* Profile */}
              <a
                href="/profile"
                onClick={() => setIsAvatarOpen(false)}
                className={`group flex items-center gap-4 px-6 py-4 w-[85%] rounded-2xl border-2 transition-all duration-200 shadow-sm hover:shadow-md ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 hover:border-blue-400 hover:bg-gray-600'
                    : 'bg-white border-blue-100 hover:border-blue-400 hover:bg-blue-50'
                }`}
              >
                <div className={`p-2 rounded-xl transition-colors ${isDark ? 'bg-gray-600 group-hover:bg-gray-500' : 'bg-blue-100 group-hover:bg-blue-200'}`}>
                  <User size={24} className={isDark ? 'text-blue-400' : 'text-blue-600'} strokeWidth={2} />
                </div>
                <span className={`font-semibold text-lg ${isDark ? 'text-gray-100 group-hover:text-blue-400' : 'text-gray-800 group-hover:text-blue-700'}`}>Profile</span>
              </a>


              {/* Settings */}
              <a
                href="/settings"
                onClick={() => setIsAvatarOpen(false)}
                className={`group flex items-center gap-4 px-6 py-4 w-[85%] rounded-2xl border-2 transition-all duration-200 shadow-sm hover:shadow-md ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 hover:border-blue-400 hover:bg-gray-600'
                    : 'bg-white border-blue-100 hover:border-blue-400 hover:bg-blue-50'
                }`}
              >
                <div className={`p-2 rounded-xl transition-colors ${isDark ? 'bg-gray-600 group-hover:bg-gray-500' : 'bg-blue-100 group-hover:bg-blue-200'}`}>
                  <Settings size={24} className={isDark ? 'text-blue-400' : 'text-blue-600'} strokeWidth={2} />
                </div>
                <span className={`font-semibold text-lg ${isDark ? 'text-gray-100 group-hover:text-blue-400' : 'text-gray-800 group-hover:text-blue-700'}`}>Settings</span>
              </a>


              {/* Buy me a tea */}
              <a
                href="https://buymeacoffee.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsAvatarOpen(false)}
                style={{
                  backgroundColor: isDark ? 'rgb(31 41 55)' : 'white',
                  borderColor: isDark ? 'rgb(5 150 105)' : 'rgb(167 243 208)',
                }}
                className={`group flex items-center gap-4 px-6 py-4 w-[85%] rounded-2xl border-2 transition-all duration-200 shadow-sm hover:shadow-md ${isDark
                    ? 'hover:border-emerald-500 hover:bg-emerald-900/30'
                    : 'hover:border-emerald-400 hover:bg-emerald-50'
                  }`}
              >
                <div
                  style={{
                    backgroundColor: isDark ? 'rgba(6, 78, 59, 0.5)' : 'rgb(209 250 229)',
                  }}
                  className={`p-2 rounded-xl transition-colors ${isDark
                      ? 'group-hover:bg-emerald-800/50'
                      : 'group-hover:bg-emerald-200'
                    }`}
                >
                  <SiBuymeacoffee size={24} className="text-[#FFDD00]" />
                </div>
                <span
                  className={`font-semibold text-lg ${isDark
                      ? 'text-gray-100 group-hover:text-emerald-400'
                      : 'text-gray-800 group-hover:text-emerald-600'
                    }`}
                >
                  Buy me a tea
                </span>
              </a>


              {/* Discord */}
              <a
                href="https://discord.gg/your-invite"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsAvatarOpen(false)}
                className={`group flex items-center gap-4 px-6 py-4 w-[85%] rounded-2xl border-2 transition-all duration-200 shadow-sm hover:shadow-md ${
                  isDark
                    ? 'bg-gray-700 border-indigo-700 hover:border-indigo-500 hover:bg-indigo-900/30'
                    : 'bg-white border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50'
                }`}
              >
                <div className={`p-2 rounded-xl transition-colors ${isDark ? 'bg-indigo-900/50 group-hover:bg-indigo-800/50' : 'bg-indigo-100 group-hover:bg-indigo-200'}`}>
                  <FaDiscord size={24} className="text-[#5865F2]" />
                </div>
                <span className={`font-semibold text-lg ${isDark ? 'text-gray-100 group-hover:text-indigo-400' : 'text-gray-800 group-hover:text-indigo-600'}`}>Discord</span>
              </a>


              {/* About */}
              <a
                href="/about"
                onClick={() => setIsAvatarOpen(false)}
                className={`group flex items-center gap-4 px-6 py-4 w-[85%] rounded-2xl border-2 transition-all duration-200 shadow-sm hover:shadow-md ${isDark
                    ? 'bg-gray-700 border-gray-600 hover:border-blue-400 hover:bg-gray-600'
                    : 'bg-white border-blue-100 hover:border-blue-400 hover:bg-blue-50'
                  }`}
              >
                <div className={`p-2 rounded-xl transition-colors ${isDark ? 'bg-gray-600 group-hover:bg-gray-500' : 'bg-blue-100 group-hover:bg-blue-200'}`}>
                  <Info size={24} className={isDark ? 'text-blue-400' : 'text-blue-600'} strokeWidth={2} />
                </div>
                <span className={`font-semibold text-lg ${isDark ? 'text-gray-100 group-hover:text-blue-400' : 'text-gray-800 group-hover:text-blue-700'}`}>About</span>
              </a>


              {/* Spacer to push the logout button at the bottom */}
              <div className="grow"></div>


              {/* Log Out */}
              <button
                onClick={() => {
                  const confirmLogout = window.confirm('Are you sure you want to log out?');
                  if (confirmLogout) {
                    logout();
                    navigate('/');
                  }
                  setIsAvatarOpen(false);
                }}
                className={`group flex items-center gap-4 px-6 py-4 w-[85%] rounded-2xl border-2 transition-all duration-200 shadow-sm hover:shadow-md ${
                  isDark
                    ? 'bg-gray-700 border-red-700 hover:border-red-500 hover:bg-red-900/30'
                    : 'bg-white border-red-100 hover:border-red-400 hover:bg-red-50'
                }`}
              >
                <div className={`p-2 rounded-xl transition-colors ${isDark ? 'bg-red-900/50 group-hover:bg-red-800/50' : 'bg-red-100 group-hover:bg-red-200'}`}>
                  <LogOut size={24} className="text-red-500" strokeWidth={2} />
                </div>
                <span className={`font-semibold text-lg ${isDark ? 'text-red-400 group-hover:text-red-300' : 'text-red-600 group-hover:text-red-700'}`}>Log Out</span>
              </button>
            </>
          ) : (
            <>
              {/* Menu for unauthenticated users */}


              {/* Login */}
              <a
                href="/login"
                onClick={() => setIsAvatarOpen(false)}
                className={`group flex items-center gap-4 px-6 py-4 w-[85%] rounded-2xl border-2 transition-all duration-200 shadow-sm hover:shadow-md ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 hover:border-blue-400 hover:bg-gray-600'
                    : 'bg-white border-blue-100 hover:border-blue-400 hover:bg-blue-50'
                }`}
              >
                <div className={`p-2 rounded-xl transition-colors ${isDark ? 'bg-gray-600 group-hover:bg-gray-500' : 'bg-blue-100 group-hover:bg-blue-200'}`}>
                  <LogIn size={24} className={isDark ? 'text-blue-400' : 'text-blue-600'} strokeWidth={2} />
                </div>
                <span className={`font-semibold text-lg ${isDark ? 'text-gray-100 group-hover:text-blue-400' : 'text-gray-800 group-hover:text-blue-700'}`}>Login</span>
              </a>


              {/* Create Account */}
              <a
                href="/create-account"
                onClick={() => setIsAvatarOpen(false)}
                className={`group flex items-center gap-4 px-6 py-4 w-[85%] rounded-2xl border-2 transition-all duration-200 shadow-sm hover:shadow-md ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 hover:border-blue-400 hover:bg-gray-600'
                    : 'bg-white border-blue-100 hover:border-blue-400 hover:bg-blue-50'
                }`}
              >
                <div className={`p-2 rounded-xl transition-colors ${isDark ? 'bg-gray-600 group-hover:bg-gray-500' : 'bg-blue-100 group-hover:bg-blue-200'}`}>
                  <UserPlus size={24} className={isDark ? 'text-blue-400' : 'text-blue-600'} strokeWidth={2} />
                </div>
                <span className={`font-semibold text-lg ${isDark ? 'text-gray-100 group-hover:text-blue-400' : 'text-gray-800 group-hover:text-blue-700'}`}>Create Account</span>
              </a>


              {/* Separator */}
              <div className={`border-t-2 my-3 w-full ${isDark ? 'border-gray-600' : 'border-blue-200'}`}></div>


              {/* App Language */}
              <LanguageSelector
                label="App Language"
                selectedLang={appLanguage}
                onSelect={setAppLanguage}
                isDark={isDark}
              />


              {/* Cards Language */}
              <LanguageSelector
                label="Cards Language"
                selectedLang={cardsLanguage}
                onSelect={setCardsLanguage}
                isDark={isDark}
              />


              {/* Separator */}
              <div className={`border-t-2 my-3 w-full ${isDark ? 'border-gray-600' : 'border-blue-200'}`}></div>


                {/* Buy me a tea */}
                <a
                  href="https://buymeacoffee.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsAvatarOpen(false)}
                  style={{
                    backgroundColor: isDark ? 'rgb(31 41 55)' : 'white',
                    borderColor: isDark ? 'rgb(5 150 105)' : 'rgb(167 243 208)',
                  }}
                  className={`group flex items-center gap-4 px-6 py-4 w-[85%] rounded-2xl border-2 transition-all duration-200 shadow-sm hover:shadow-md ${isDark
                      ? 'hover:border-emerald-500 hover:bg-emerald-900/30'
                      : 'hover:border-emerald-400 hover:bg-emerald-50'
                    }`}
                >
                  <div
                    style={{
                      backgroundColor: isDark ? 'rgba(6, 78, 59, 0.5)' : 'rgb(209 250 229)',
                    }}
                    className={`p-2 rounded-xl transition-colors ${isDark
                        ? 'group-hover:bg-emerald-800/50'
                        : 'group-hover:bg-emerald-200'
                      }`}
                  >
                    <SiBuymeacoffee size={24} className="text-[#FFDD00]" />
                  </div>
                  <span
                    className={`font-semibold text-lg ${isDark
                        ? 'text-gray-100 group-hover:text-emerald-400'
                        : 'text-gray-800 group-hover:text-emerald-600'
                      }`}
                  >
                    Buy me a tea
                  </span>
                </a>


              {/* Discord */}
              <a
                href="https://discord.gg/your-invite"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsAvatarOpen(false)}
                className={`group flex items-center gap-4 px-6 py-4 w-[85%] rounded-2xl border-2 transition-all duration-200 shadow-sm hover:shadow-md ${
                  isDark
                    ? 'bg-gray-700 border-indigo-700 hover:border-indigo-500 hover:bg-indigo-900/30'
                    : 'bg-white border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50'
                }`}
              >
                <div className={`p-2 rounded-xl transition-colors ${isDark ? 'bg-indigo-900/50 group-hover:bg-indigo-800/50' : 'bg-indigo-100 group-hover:bg-indigo-200'}`}>
                  <FaDiscord size={24} className="text-[#5865F2]" />
                </div>
                <span className={`font-semibold text-lg ${isDark ? 'text-gray-100 group-hover:text-indigo-400' : 'text-gray-800 group-hover:text-indigo-600'}`}>Discord</span>
              </a>


                {/* About */}
                <a
                  href="/about"
                  onClick={() => setIsAvatarOpen(false)}
                  className={`group flex items-center gap-4 px-6 py-4 w-[85%] rounded-2xl border-2 transition-all duration-200 shadow-sm hover:shadow-md ${isDark
                      ? 'bg-gray-700 border-gray-600 hover:border-blue-400 hover:bg-gray-600'
                      : 'bg-white border-blue-100 hover:border-blue-400 hover:bg-blue-50'
                    }`}
                >
                  <div className={`p-2 rounded-xl transition-colors ${isDark ? 'bg-gray-600 group-hover:bg-gray-500' : 'bg-blue-100 group-hover:bg-blue-200'}`}>
                    <Info size={24} className={isDark ? 'text-blue-400' : 'text-blue-600'} strokeWidth={2} />
                  </div>
                  <span className={`font-semibold text-lg ${isDark ? 'text-gray-100 group-hover:text-blue-400' : 'text-gray-800 group-hover:text-blue-700'}`}>About</span>
                </a>
            </>
          )}
        </nav>
      </div>
    </div>
  );
};

import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Home, ClipboardList, Camera, Lock, Search, User, LogIn, UserPlus, Globe, ChevronDown, ChevronUp } from 'lucide-react';

// Mapping des routes vers les titres de page
const PAGE_TITLES = {
  '/': 'Dashboard',
  '/dashboard': 'Dashboard',
  '/login': 'Login',
  '/create-account': 'Create Account',
  '/profile': 'Profile',
  '/statistics': 'Statistics',
  '/scan': 'Scan',
  '/vault': 'Vault',
  '/research': 'Research',
};

const NAV_ITEMS = [
  { name: 'Dashboard', icon: Home, path: '/dashboard' },
  { name: 'Statistics', icon: ClipboardList, path: '/statistics' },
  { name: 'Scan', icon: Camera, path: '/scan' },
  { name: 'Vault', icon: Lock, path: '/vault' },
  { name: 'Research', icon: Search, path: '/research' },
];

const LANGUAGES = [
  { code: 'fr', name: 'Français' },
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'de', name: 'Deutsch' },
  { code: 'ja', name: '日本語' },
];

const LanguageSelector = ({ label, selectedLang, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentLang = LANGUAGES.find(l => l.code === selectedLang) || LANGUAGES[0];

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center justify-between w-full px-5 py-4 rounded-2xl bg-white border-2 border-blue-100 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 shadow-sm hover:shadow-md"
      >
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-xl bg-blue-100 group-hover:bg-blue-200 transition-colors">
            <Globe size={24} className="text-blue-600" strokeWidth={2} />
          </div>
          <div className="text-left">
            <span className="text-gray-800 font-semibold text-lg group-hover:text-blue-700 block">{label}</span>
            <span className="text-gray-500 text-sm">{currentLang.name}</span>
          </div>
        </div>
        <div className="text-blue-600">
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

  // Obtenir le titre de la page actuelle
  const currentPageTitle = PAGE_TITLES[location.pathname] || 'Page';

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
      <div className="bg-linear-to-r from-blue-700 to-blue-200 navbar bg-base-100 shadow-sm rounded-b-lg">
        <div className="flex-1 flex items-center">
          <img src="image/logo_card_vault.png" alt="Logo" className="h-20 w-20 p-200" style={{ marginLeft: '40px' }} />
          <div style={{ marginLeft: '40px' }}>
            <a className="btn btn-ghost p-1 hover:bg-transparent font-sans font-extrabold text-4xl tracking-wide bg-gradient-to-r from-blue-600 to-white bg-clip-text text-transparent [-webkit-text-stroke:1px_#ffffff] drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
              Card Vault
            </a>
          </div>
        </div>
      </div>

      {/* Conteneur burger + avatar */}
      <div className="flex items-center w-full mt-2 pl-4 pr-8 h-16 bg-linear-to-r from-gray-400 via-gray-200 to-white rounded-full mx-4 shadow-md">

        {/* Bouton burger */}
        <div style={{ marginLeft: '20px' }}>
          <button
            className="btn btn-circle border-2 border-black bg-transparent hover:bg-gray-100"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-black"
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

        {/* Titre de la page centré */}
        <div className="flex-1 flex justify-center">
          <div className="w-[350px] h-[60px] flex items-center justify-center bg-gradient-to-r from-blue-700 to-blue-200 rounded-full shadow-lg border-4 border-white">
            <span className="text-2xl font-bold text-white tracking-wide drop-shadow-md">{currentPageTitle}</span>
          </div>
        </div>

        {/* Bouton avatar */}
        <div style={{ marginRight: '20px' }}>
          <button
            className="btn btn-circle border-2 border-black bg-transparent hover:bg-gray-1000"
            onClick={() => setIsAvatarOpen(!isAvatarOpen)}
          >
            <User size={24} strokeWidth={1.5} className="text-black" />
          </button>
        </div>

      </div>

      {/* Panneau Burger qui glisse depuis la gauche - sous la navbar */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        ref={menuRef}
        className={`
          absolute left-0 top-full h-[calc(100vh-0px)] w-80 bg-gradient-to-br from-blue-50 to-white
          transform transition-transform duration-300 ease-in-out
          z-40 shadow-2xl overflow-y-auto rounded-tr-3xl rounded-br-3xl border-r-2 border-b-2 border-blue-200
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Menu items */}
        <nav className="flex flex-col items-center gap-4 p-8">
          <div className="h-8"></div>

          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className="group flex items-center gap-4 px-6 py-4 w-[85%] rounded-2xl bg-white border-2 border-blue-100 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 shadow-sm hover:shadow-md "
              >
                <div className="p-2 rounded-xl bg-blue-100 group-hover:bg-blue-200 transition-colors">
                  <Icon size={24} className="text-blue-600" strokeWidth={2} />
                </div>
                <span className="text-gray-800 font-semibold text-lg group-hover:text-blue-700">{item.name}</span>
              </a>
            );
          })}
        </nav>
      </div>

      {/* Panneau Avatar qui glisse depuis la droite - sous la navbar */}
      {isAvatarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 transition-opacity duration-300"
          onClick={() => setIsAvatarOpen(false)}
        />
      )}

      <div
        ref={avatarMenuRef}
        className={`
          absolute right-0 top-[145px] h-[calc(100vh-0px)] w-80 bg-gradient-to-bl from-blue-50 to-white
          transform transition-transform duration-300 ease-in-out
          z-50 shadow-2xl overflow-y-auto rounded-tl-3xl rounded-bl-3xl border-l-2 border-b-2 border-blue-200
          ${isAvatarOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >

        {/* Menu items */}
        <nav className="flex flex-col items-center gap-4 p-8">
          <div className="h-8"></div>

          {/* Login */}
          <a
            href="/login"
            onClick={() => setIsAvatarOpen(false)}
            className="group flex items-center gap-4 px-6 py-4 w-[85%] rounded-2xl bg-white border-2 border-blue-100 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <div className="p-2 rounded-xl bg-blue-100 group-hover:bg-blue-200 transition-colors">
              <LogIn size={24} className="text-blue-600" strokeWidth={2} />
            </div>
            <span className="text-gray-800 font-semibold text-lg group-hover:text-blue-700">Login</span>
          </a>

          {/* Create Account */}
          <a
            href="/create-account"
            onClick={() => setIsAvatarOpen(false)}
            className="group flex items-center gap-4 px-6 py-4 w-[85%] rounded-2xl bg-white border-2 border-blue-100 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <div className="p-2 rounded-xl bg-blue-100 group-hover:bg-blue-200 transition-colors">
              <UserPlus size={24} className="text-blue-600" strokeWidth={2} />
            </div>
            <span className="text-gray-800 font-semibold text-lg group-hover:text-blue-700">Create Account</span>
          </a>

          {/* Séparateur */}
          <div className="border-t-2 border-blue-200 my-3"></div>

          {/* App Language */}
          <LanguageSelector
            label="App Language"
            selectedLang={appLanguage}
            onSelect={setAppLanguage}
          />

          {/* Cards Language */}
          <LanguageSelector
            label="Cards Language"
            selectedLang={cardsLanguage}
            onSelect={setCardsLanguage}
          />
        </nav>
      </div>
    </div>
  );
};

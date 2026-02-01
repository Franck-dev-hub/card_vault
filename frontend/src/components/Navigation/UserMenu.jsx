import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LogIn, LogOut, UserPlus, Globe, ChevronDown, ChevronUp, User, Settings, Info } from 'lucide-react';
import { FaDiscord } from 'react-icons/fa';
import { SiBuymeacoffee } from 'react-icons/si';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

// Pages accessibles uniquement aux utilisateurs authentifiés
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

const LANGUAGES = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
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
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{currentLang.flag} {currentLang.name}</span>
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
                text-left px-4 py-3 rounded-xl transition-all duration-200 font-medium flex items-center gap-2
                ${selectedLang === lang.code
                  ? 'bg-blue-500 text-white shadow-md'
                  : isDark
                    ? 'bg-gray-600 text-gray-200 hover:bg-gray-500 hover:text-blue-400 border border-gray-500'
                    : 'bg-white text-gray-700 hover:bg-blue-100 hover:text-blue-700 border border-blue-100'
                }
              `}
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export const UserMenu = ({ isOpen, onClose }) => {
  const [appLanguage, setAppLanguage] = useState('en');
  const [cardsLanguage, setCardsLanguage] = useState('en');
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const { isDark } = useTheme();

  // Vérifier si l'utilisateur est sur une page authentifiée
  const isOnAuthenticatedPage = AUTHENTICATED_PAGES.includes(location.pathname);

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      logout();
      navigate('/landing');
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop (fond sombre semi-transparent) - entre navbar et footer */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Menu qui glisse depuis la droite - entre navbar et footer */}
      <div
        className={`
          fixed right-0 top-33 bottom-15 w-80
          transform transition-all duration-300 ease-in-out
          z-50 shadow-2xl overflow-y-auto rounded-tl-3xl rounded-bl-3xl border-l-2
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          ${isDark
            ? 'bg-gradient-to-bl from-gray-800 to-gray-900 border-gray-700'
            : 'bg-gradient-to-bl from-blue-50 to-white border-blue-200'
          }
        `}
      >
        {/* Menu items */}
        <nav className="flex flex-col items-center gap-4 p-8 pb-16 h-full">
          <div className="h-4"></div>

          {isAuthenticated && isOnAuthenticatedPage ? (
            <>
              {/* Menu pour utilisateur authentifié */}

              {/* Profile */}
              <button
                onClick={() => {
                  navigate('/profile');
                  onClose();
                }}
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
              </button>

              {/* Parameters */}
              <button
                onClick={() => {
                  navigate('/parameters');
                  onClose();
                }}
                className={`group flex items-center gap-4 px-6 py-4 w-[85%] rounded-2xl border-2 transition-all duration-200 shadow-sm hover:shadow-md ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 hover:border-blue-400 hover:bg-gray-600'
                    : 'bg-white border-blue-100 hover:border-blue-400 hover:bg-blue-50'
                }`}
              >
                <div className={`p-2 rounded-xl transition-colors ${isDark ? 'bg-gray-600 group-hover:bg-gray-500' : 'bg-blue-100 group-hover:bg-blue-200'}`}>
                  <Settings size={24} className={isDark ? 'text-blue-400' : 'text-blue-600'} strokeWidth={2} />
                </div>
                <span className={`font-semibold text-lg ${isDark ? 'text-gray-100 group-hover:text-blue-400' : 'text-gray-800 group-hover:text-blue-700'}`}>Parameters</span>
              </button>

              {/* Buy me a tea */}
              <a
                href="https://buymeacoffee.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                style={{
                  backgroundColor: isDark ? 'rgb(31 41 55)' : 'white',
                  borderColor: isDark ? 'rgb(5 150 105)' : 'rgb(167 243 208)',
                }}
                className={`group flex items-center gap-4 px-6 py-4 w-[85%] rounded-2xl border-2 transition-all duration-200 shadow-sm hover:shadow-md ${
                  isDark
                    ? 'hover:border-emerald-500 hover:bg-emerald-900/30'
                    : 'hover:border-emerald-400 hover:bg-emerald-50'
                }`}
              >
                <div
                  style={{
                    backgroundColor: isDark ? 'rgba(6, 78, 59, 0.5)' : 'rgb(209 250 229)',
                  }}
                  className={`p-2 rounded-xl transition-colors ${
                    isDark
                      ? 'group-hover:bg-emerald-800/50'
                      : 'group-hover:bg-emerald-200'
                  }`}
                >
                  <SiBuymeacoffee size={24} className="text-[#5f9b88]" />
                </div>
                <span className={`font-semibold text-lg ${isDark ? 'text-gray-100 group-hover:text-emerald-400' : 'text-gray-800 group-hover:text-emerald-600'}`}>Buy me a tea</span>
              </a>

              {/* Discord */}
              <a
                href="https://discord.gg/your-invite"
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
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
              <button
                onClick={() => {
                  navigate('/about');
                  onClose();
                }}
                className={`group flex items-center gap-4 px-6 py-4 w-[85%] rounded-2xl border-2 transition-all duration-200 shadow-sm hover:shadow-md ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 hover:border-blue-400 hover:bg-gray-600'
                    : 'bg-white border-blue-100 hover:border-blue-400 hover:bg-blue-50'
                }`}
              >
                <div className={`p-2 rounded-xl transition-colors ${isDark ? 'bg-gray-600 group-hover:bg-gray-500' : 'bg-blue-100 group-hover:bg-blue-200'}`}>
                  <Info size={24} className={isDark ? 'text-blue-400' : 'text-blue-600'} strokeWidth={2} />
                </div>
                <span className={`font-semibold text-lg ${isDark ? 'text-gray-100 group-hover:text-blue-400' : 'text-gray-800 group-hover:text-blue-700'}`}>About</span>
              </button>

              {/* Spacer pour ajouter un peu d'espace avant logout */}
              <div className="h-60"></div>

              {/* Log Out le spacer s'applique en mode mobile mais pas en mode desktop*/}
              <button
                onClick={handleLogout}
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
              {/* Menu pour utilisateur non authentifié */}

              {/* Login */}
              <button
                onClick={() => {
                  navigate('/login');
                  onClose();
                }}
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
              </button>

              {/* Create Account */}
              <button
                onClick={() => {
                  navigate('/create-account');
                  onClose();
                }}
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
              </button>

              {/* Séparateur */}
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

              {/* Séparateur */}
              <div className={`border-t-2 my-3 w-full ${isDark ? 'border-gray-600' : 'border-blue-200'}`}></div>

              {/* Buy me a tea */}
              <a
                href="https://buymeacoffee.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                style={{
                  backgroundColor: isDark ? 'rgb(31 41 55)' : 'white',
                  borderColor: isDark ? 'rgb(5 150 105)' : 'rgb(167 243 208)',
                }}
                className={`group flex items-center gap-4 px-6 py-4 w-[85%] rounded-2xl border-2 transition-all duration-200 shadow-sm hover:shadow-md ${
                  isDark
                    ? 'hover:border-emerald-500 hover:bg-emerald-900/30'
                    : 'hover:border-emerald-400 hover:bg-emerald-50'
                }`}
              >
                <div
                  style={{
                    backgroundColor: isDark ? 'rgba(6, 78, 59, 0.5)' : 'rgb(209 250 229)',
                  }}
                  className={`p-2 rounded-xl transition-colors ${
                    isDark
                      ? 'group-hover:bg-emerald-800/50'
                      : 'group-hover:bg-emerald-200'
                  }`}
                >
                  <SiBuymeacoffee size={24} className="text-[#FFDD00]" />
                </div>
                <span className={`font-semibold text-lg ${isDark ? 'text-gray-100 group-hover:text-emerald-400' : 'text-gray-800 group-hover:text-emerald-600'}`}>Buy me a tea</span>
              </a>

              {/* Discord */}
              <a
                href="https://discord.gg/your-invite"
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
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
              <button
                onClick={() => {
                  navigate('/about');
                  onClose();
                }}
                className={`group flex items-center gap-4 px-6 py-4 w-[85%] rounded-2xl border-2 transition-all duration-200 shadow-sm hover:shadow-md ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 hover:border-blue-400 hover:bg-gray-600'
                    : 'bg-white border-blue-100 hover:border-blue-400 hover:bg-blue-50'
                }`}
              >
                <div className={`p-2 rounded-xl transition-colors ${isDark ? 'bg-gray-600 group-hover:bg-gray-500' : 'bg-blue-100 group-hover:bg-blue-200'}`}>
                  <Info size={24} className={isDark ? 'text-blue-400' : 'text-blue-600'} strokeWidth={2} />
                </div>
                <span className={`font-semibold text-lg ${isDark ? 'text-gray-100 group-hover:text-blue-400' : 'text-gray-800 group-hover:text-blue-700'}`}>About</span>
              </button>
            </>
          )}
        </nav>
      </div>
    </>
  );
};

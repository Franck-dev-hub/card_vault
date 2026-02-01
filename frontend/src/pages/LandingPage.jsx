import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogIn, UserPlus, Globe, ChevronDown, ChevronUp, Moon, Sun, Info } from 'lucide-react';
import { FaDiscord } from 'react-icons/fa';
import { SiBuymeacoffee } from 'react-icons/si';
import { useTheme } from '../contexts/ThemeContext';

const LANGUAGES = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme, isDark } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const menuRef = useRef(null);

  // Fermer le menu quand on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const currentLang = LANGUAGES.find((l) => l.code === selectedLanguage) || LANGUAGES[1];

  return (
    <div className={`relative h-screen w-full overflow-hidden transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' 
        : 'bg-gradient-to-br from-blue-600 via-blue-400 to-purple-500'
    }`}>
      {/* Header avec Logo, Dark Mode et Avatar */}
      <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4">
        {/* Logo à gauche */}
        <div className="flex items-center gap-3">
          <img
            src="/image/logo_card_vault.png"
            alt="Card Vault Logo"
            className="h-12 w-12 drop-shadow-lg"
          />
          <h1 className="text-2xl font-bold text-white drop-shadow-lg">Card Vault</h1>
        </div>

        {/* Dark Mode Toggle + Avatar à droite */}
        <div className="flex items-center gap-3">
          {/* Bouton Dark Mode */}
          <button
            onClick={toggleTheme}
            className="btn btn-circle bg-white/20 backdrop-blur-sm border-2 border-white/40 hover:bg-white/30 transition-all duration-300 shadow-lg"
            aria-label="Toggle dark mode"
          >
            {isDark ? (
              <Sun size={24} className="text-yellow-300" strokeWidth={2} />
            ) : (
              <Moon size={24} className="text-white" strokeWidth={2} />
            )}
          </button>

          {/* Avatar */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="btn btn-circle bg-white/20 backdrop-blur-sm border-2 border-white/40 hover:bg-white/30 transition-all duration-300 shadow-lg"
            aria-label="Menu utilisateur"
          >
            <User size={24} className="text-white" strokeWidth={2} />
          </button>
        </div>
      </header>

      {/* Backdrop (fond sombre semi-transparent) */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Menu qui glisse depuis la droite */}
      <div
        ref={menuRef}
        className={`
          fixed top-0 right-0 h-screen w-80
          transform transition-all duration-300 ease-in-out
          z-50 shadow-2xl rounded-tl-3xl rounded-bl-3xl
          ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          ${isDark 
            ? 'bg-gradient-to-b from-gray-800 to-gray-900' 
            : 'bg-gradient-to-b from-white to-gray-50'
          }
        `}
      >
        {/* Menu items */}
        <div className="flex flex-col p-6 gap-4 h-full">
          {/* Espace en haut */}
          <div className="h-8"></div>

          {/* Login */}
          <button
            onClick={() => {
              navigate('/login');
              setIsMenuOpen(false);
            }}
            className={`flex items-center gap-3 px-5 py-4 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md group ${
              isDark
                ? 'bg-gray-700 hover:bg-gray-600 border border-gray-600'
                : 'bg-white hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <LogIn size={22} className={`${isDark ? 'text-blue-400' : 'text-gray-700'} group-hover:text-blue-600 transition-colors`} strokeWidth={2} />
            <span className={`font-semibold text-lg ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>Login</span>
          </button>

          {/* Create Account */}
          <button
            onClick={() => {
              navigate('/create-account');
              setIsMenuOpen(false);
            }}
            className={`flex items-center gap-3 px-5 py-4 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md group ${
              isDark
                ? 'bg-gray-700 hover:bg-gray-600 border border-gray-600'
                : 'bg-white hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <UserPlus size={22} className={`${isDark ? 'text-blue-400' : 'text-gray-700'} group-hover:text-blue-600 transition-colors`} strokeWidth={2} />
            <span className={`font-semibold text-lg ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>Create account</span>
          </button>

          {/* App Language */}
          <div className="relative">
            <button
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className={`flex items-center justify-between w-full px-5 py-4 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md ${
                isDark
                  ? 'bg-gray-700 hover:bg-gray-600 border border-gray-600'
                  : 'bg-white hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <Globe size={22} className={isDark ? 'text-gray-300' : 'text-gray-700'} strokeWidth={2} />
                <span className={`font-semibold text-lg ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>App language</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">{currentLang.flag} {currentLang.name.split(' ')[0]}</span>
                {isLangDropdownOpen ? (
                  <ChevronUp size={18} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
                ) : (
                  <ChevronDown size={18} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
                )}
              </div>
            </button>

            {/* Language Dropdown */}
            {isLangDropdownOpen && (
              <div className={`mt-2 rounded-xl p-2 shadow-lg max-h-48 overflow-y-auto ${
                isDark 
                  ? 'bg-gray-700 border border-gray-600' 
                  : 'bg-white border border-gray-200'
              }`}>
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setSelectedLanguage(lang.code);
                      setIsLangDropdownOpen(false);
                    }}
                    className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg transition-all duration-200 ${
                      selectedLanguage === lang.code
                        ? 'bg-blue-500 text-white'
                        : isDark
                        ? 'hover:bg-gray-600 text-gray-200'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span className="font-medium">{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Buy me a tea */}
          <a
            href="https://buymeacoffee.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMenuOpen(false)}
            className={`flex items-center gap-3 px-5 py-4 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md group ${
              isDark
                ? 'bg-gray-700 hover:bg-yellow-900/30 border border-gray-600'
                : 'bg-white hover:bg-yellow-50 border border-gray-200'
            }`}
          >
            <div className="flex items-center justify-center w-6 h-6">
              <SiBuymeacoffee size={22} className="text-[#FFDD00] group-hover:scale-110 transition-transform" />
            </div>
            <span className={`font-semibold text-lg ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>Buy me a tea</span>
          </a>

          {/* Discord */}
          <a
            href="https://discord.gg/your-invite"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMenuOpen(false)}
            className={`flex items-center gap-3 px-5 py-4 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md group ${
              isDark
                ? 'bg-gray-700 hover:bg-indigo-900/30 border border-gray-600'
                : 'bg-white hover:bg-indigo-50 border border-gray-200'
            }`}
          >
            <div className="flex items-center justify-center w-6 h-6">
              <FaDiscord size={22} className="text-[#5865F2] group-hover:scale-110 transition-transform" />
            </div>
            <span className={`font-semibold text-lg ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>Discord</span>
          </a>

          {/* About */}
          <button
            onClick={() => {
              navigate('/about');
              setIsMenuOpen(false);
            }}
            className={`flex items-center gap-3 px-5 py-4 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md group ${
              isDark
                ? 'bg-gray-700 hover:bg-gray-600 border border-gray-600'
                : 'bg-white hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <Info size={22} className={`${isDark ? 'text-blue-400' : 'text-gray-700'} group-hover:text-blue-600 transition-colors`} strokeWidth={2} />
            <span className={`font-semibold text-lg ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>About</span>
          </button>
        </div>
      </div>

      {/* Contenu principal centré */}
      <div className="h-full flex flex-col items-center justify-center px-6">
        {/* Slogan et texte */}
        <div className="text-center mb-12 space-y-4 animate-fadeIn">
          <h2 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-2xl tracking-tight">
            Slogan
          </h2>
          <p className="text-xl md:text-2xl text-white/90 font-medium max-w-2xl mx-auto drop-shadow-lg">
            Paragraphe explicatif
          </p>
        </div>

        {/* Bouton Get Started */}
        <button
          onClick={() => navigate('/create-account')}
          className="px-12 py-4 bg-white text-blue-600 text-lg font-bold rounded-full shadow-2xl hover:scale-105 hover:shadow-3xl transition-all duration-300 animate-bounce-slow"
        >
          Get started
        </button>
      </div>

      {/* Styles pour les animations */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounceSlow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }

        .animate-bounce-slow {
          animation: bounceSlow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;

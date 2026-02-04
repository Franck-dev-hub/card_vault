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

      {/* Menu qui glisse depuis la droite - même design que UserMenu */}
      <div
        ref={menuRef}
        className={`
          fixed top-0 right-0 h-screen w-80
          transform transition-all duration-300 ease-in-out
          z-50 shadow-2xl overflow-y-auto rounded-tl-3xl rounded-bl-3xl border-l-2
          ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          ${isDark
            ? 'bg-gradient-to-bl from-gray-800 to-gray-900 border-gray-700'
            : 'bg-gradient-to-bl from-blue-50 to-white border-blue-200'
          }
        `}
      >
        {/* Menu items */}
        <nav className="flex flex-col items-center gap-4 p-8 pb-16 h-full">
          {/* Espace en haut */}
          <div className="h-4"></div>

          {/* Login */}
          <button
            onClick={() => {
              navigate('/login');
              setIsMenuOpen(false);
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
              setIsMenuOpen(false);
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

          {/* Buy me a tea */}
          <a
            href="https://buymeacoffee.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMenuOpen(false)}
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
            onClick={() => setIsMenuOpen(false)}
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
              setIsMenuOpen(false);
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
        </nav>
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

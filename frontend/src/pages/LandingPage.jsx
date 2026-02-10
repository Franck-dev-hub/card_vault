import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogIn, UserPlus, Moon, Sun, Info, Camera, Search, Vault, ChartColumn, ChevronDown } from 'lucide-react';
import { FaDiscord } from 'react-icons/fa';
import { SiBuymeacoffee } from 'react-icons/si';
import { useTheme } from '../contexts/ThemeContext';

const FEATURES = [
  {
    icon: Camera,
    title: 'Scan',
    description: 'Scan your cards with your camera and instantly identify them.',
  },
  {
    icon: Vault,
    title: 'Vault',
    description: 'Build and manage your collection across multiple licenses.',
  },
  {
    icon: Search,
    title: 'Search',
    description: 'Browse thousands of cards from Pokemon, Magic and more.',
  },
  {
    icon: ChartColumn,
    title: 'Statistics',
    description: 'Track the value and distribution of your collection.',
  },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const { toggleTheme, isDark } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState({});
  const menuRef = useRef(null);
  const sectionsRef = useRef([]);

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

  // Intersection Observer pour animer les sections au scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.2 }
    );

    sectionsRef.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`relative w-full overflow-y-auto overflow-x-hidden scroll-smooth transition-colors duration-300 ${
      isDark
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900'
        : 'bg-gradient-to-br from-blue-600 via-blue-400 to-purple-500'
    }`}>

      {/* ========== HEADER ========== */}
      <header className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-black/10">
        <div className="flex items-center gap-3">
          <img
            src="/image/logo_card_vault.png"
            alt="Card Vault Logo"
            className="h-12 w-12 drop-shadow-lg"
          />
          <h1 className="text-2xl font-bold text-white drop-shadow-lg">Card Vault</h1>
        </div>

        <div className="flex items-center gap-3">
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

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="btn btn-circle bg-white/20 backdrop-blur-sm border-2 border-white/40 hover:bg-white/30 transition-all duration-300 shadow-lg"
            aria-label="Menu utilisateur"
          >
            <User size={24} className="text-white" strokeWidth={2} />
          </button>
        </div>
      </header>

      {/* ========== BACKDROP MENU ========== */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* ========== SIDE MENU ========== */}
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
        <nav className="flex flex-col items-center gap-4 p-8 pb-16 h-full">
          <div className="h-4"></div>

          <button
            onClick={() => { navigate('/login'); setIsMenuOpen(false); }}
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

          <button
            onClick={() => { navigate('/create-account'); setIsMenuOpen(false); }}
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
                isDark ? 'group-hover:bg-emerald-800/50' : 'group-hover:bg-emerald-200'
              }`}
            >
              <SiBuymeacoffee size={24} className="text-[#FFDD00]" />
            </div>
            <span className={`font-semibold text-lg ${isDark ? 'text-gray-100 group-hover:text-emerald-400' : 'text-gray-800 group-hover:text-emerald-600'}`}>Buy me a tea</span>
          </a>

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

          <button
            onClick={() => { navigate('/about'); setIsMenuOpen(false); }}
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

      {/* ========== HERO SECTION ========== */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-10 relative">
        <div className="text-center space-y-6 animate-fadeIn">
          <div className="flex justify-center mb-6">
            <img
              src="/image/logo_card_vault.png"
              alt="Card Vault"
              className="h-28 w-28 md:h-36 md:w-36 drop-shadow-2xl animate-bounce-slow"
            />
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-2xl tracking-tight leading-tight">
            Your collection,<br />
            <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent">
              your vault.
            </span>
          </h2>
          <p className="text-lg md:text-xl text-white/85 font-medium max-w-xl mx-auto drop-shadow-lg leading-relaxed">
            Scan, collect and track your trading cards in one place.
            Pokemon, Magic and more.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => navigate('/create-account')}
              className="px-10 py-4 bg-white text-blue-600 text-lg font-bold rounded-full shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Get started
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-10 py-4 bg-white/15 backdrop-blur-sm text-white text-lg font-semibold rounded-full border-2 border-white/40 hover:bg-white/25 transition-all duration-300"
            >
              Sign in
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={scrollToFeatures}
          className="absolute bottom-8 animate-bounce text-white/60 hover:text-white transition-colors"
          aria-label="Scroll down"
        >
          <ChevronDown size={36} />
        </button>
      </section>

      {/* ========== FEATURES SECTION ========== */}
      <section
        id="features"
        ref={(el) => (sectionsRef.current[0] = el)}
        className={`px-6 py-20 transition-all duration-700 ${
          visibleSections['features'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h3 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-4 drop-shadow-lg">
          Everything you need
        </h3>
        <p className="text-white/70 text-center mb-12 max-w-lg mx-auto">
          All the tools to manage your trading card collection.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`p-6 rounded-2xl border-2 backdrop-blur-md transition-all duration-300 hover:scale-[1.03] hover:shadow-xl ${
                  isDark
                    ? 'bg-white/5 border-white/10 hover:border-white/25'
                    : 'bg-white/15 border-white/25 hover:border-white/50'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                  isDark ? 'bg-blue-500/20' : 'bg-white/25'
                }`}>
                  <Icon size={24} className="text-white" strokeWidth={2} />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">{feature.title}</h4>
                <p className="text-white/70 text-sm leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========== LICENSES SECTION ========== */}
      <section
        id="licenses"
        ref={(el) => (sectionsRef.current[1] = el)}
        className={`px-6 py-20 transition-all duration-700 ${
          visibleSections['licenses'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h3 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-4 drop-shadow-lg">
          Multiple licenses
        </h3>
        <p className="text-white/70 text-center mb-12 max-w-lg mx-auto">
          Manage cards from your favorite trading card games.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 max-w-2xl mx-auto">
          <div className={`flex-1 w-full p-8 rounded-2xl border-2 text-center backdrop-blur-md transition-all duration-300 hover:scale-[1.03] ${
            isDark
              ? 'bg-yellow-500/10 border-yellow-500/20 hover:border-yellow-500/40'
              : 'bg-yellow-300/20 border-yellow-300/30 hover:border-yellow-300/60'
          }`}>
            <div className="text-5xl mb-3">&#9889;</div>
            <h4 className="text-2xl font-bold text-white mb-2">Pokemon</h4>
            <p className="text-white/60 text-sm">All sets from Base Set to the latest expansions</p>
          </div>

          <div className={`flex-1 w-full p-8 rounded-2xl border-2 text-center backdrop-blur-md transition-all duration-300 hover:scale-[1.03] ${
            isDark
              ? 'bg-purple-500/10 border-purple-500/20 hover:border-purple-500/40'
              : 'bg-purple-300/20 border-purple-300/30 hover:border-purple-300/60'
          }`}>
            <div className="text-5xl mb-3">&#10052;</div>
            <h4 className="text-2xl font-bold text-white mb-2">Magic</h4>
            <p className="text-white/60 text-sm">The Gathering — thousands of cards available</p>
          </div>
        </div>
      </section>

      {/* ========== CTA SECTION ========== */}
      <section
        id="cta"
        ref={(el) => (sectionsRef.current[2] = el)}
        className={`px-6 py-20 mb-10 transition-all duration-700 ${
          visibleSections['cta'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className={`max-w-2xl mx-auto p-10 rounded-3xl border-2 text-center backdrop-blur-md ${
          isDark
            ? 'bg-white/5 border-white/10'
            : 'bg-white/15 border-white/25'
        }`}>
          <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4 drop-shadow-lg">
            Ready to start?
          </h3>
          <p className="text-white/70 mb-8 max-w-md mx-auto">
            Create your free account and start building your collection today.
          </p>
          <button
            onClick={() => navigate('/create-account')}
            className="px-12 py-4 bg-white text-blue-600 text-lg font-bold rounded-full shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Create my account
          </button>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="px-6 py-8 text-center border-t border-white/10">
        <p className="text-white/40 text-sm">
          &copy; {new Date().getFullYear()} Card Vault. All rights reserved.
        </p>
      </footer>

      {/* ========== ANIMATIONS ========== */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-fadeIn { animation: fadeIn 0.8s ease-out; }
        .animate-bounce-slow { animation: bounceSlow 2s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default LandingPage;

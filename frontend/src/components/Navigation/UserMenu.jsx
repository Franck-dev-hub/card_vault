import { useState } from 'react';
import { X, LogIn, UserPlus, Globe, ChevronDown, ChevronUp } from 'lucide-react';

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
    <div className="mx-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn btn-xl rounded-xl justify-between gap-4 border border-gray-200 bg-white hover:bg-gray-50 w-full"
      >
        <div className="flex items-center gap-4">
          <Globe size={24} className="text-gray-700" strokeWidth={1.5} />
          <div className="text-left">
            <span className="text-gray-800 font-medium block">{label}</span>
            <span className="text-gray-500 text-sm">{currentLang.name}</span>
          </div>
        </div>
        {isOpen ? (
          <ChevronUp size={20} className="text-gray-500" />
        ) : (
          <ChevronDown size={20} className="text-gray-500" />
        )}
      </button>

      {/* Liste des langues */}
      {isOpen && (
        <div className="mt-2 ml-8 flex flex-col gap-1">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                onSelect(lang.code);
                setIsOpen(false);
              }}
              className={`
                text-left px-4 py-2 rounded-lg transition-all duration-200
                ${selectedLang === lang.code
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'hover:bg-gray-100 text-gray-700'
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

export const UserMenu = ({ isOpen, onClose }) => {
  const [appLanguage, setAppLanguage] = useState('fr');
  const [cardsLanguage, setCardsLanguage] = useState('en');

  return (
    <>
      {/* Backdrop (fond sombre semi-transparent) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Menu qui glisse depuis la droite */}
      <div
        className={`
          fixed right-0 top-0 h-screen w-72 bg-white
          transform transition-transform duration-300 ease-in-out
          z-50 shadow-2xl overflow-y-auto
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Header avec bouton fermer */}
        <div className="flex items-center justify-end p-4 pt-6">
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Fermer le menu"
          >
            <X size={24} className="text-gray-700" />
          </button>
        </div>

        {/* Menu items */}
        <nav className="flex flex-col gap-3 px-6 py-4">
          {/* Login */}
          <a
            href="/login"
            onClick={onClose}
            className="btn btn-xl rounded-xl justify-start gap-4 border border-gray-200 bg-white hover:bg-gray-50 mx-2"
          >
            <LogIn size={24} className="text-gray-700" strokeWidth={1.5} />
            <span className="text-gray-800 font-medium">Login</span>
          </a>

          {/* Create Account */}
          <a
            href="/signup"
            onClick={onClose}
            className="btn btn-xl rounded-xl justify-start gap-4 border border-gray-200 bg-white hover:bg-gray-50 mx-2"
          >
            <UserPlus size={24} className="text-gray-700" strokeWidth={1.5} />
            <span className="text-gray-800 font-medium">Create Account</span>
          </a>

          {/* Séparateur */}
          <div className="border-t border-gray-200 my-2 mx-2"></div>

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
    </>
  );
};

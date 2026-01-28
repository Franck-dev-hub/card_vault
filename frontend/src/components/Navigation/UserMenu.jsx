import { useState } from 'react';
import { LogIn, UserPlus, Globe, ChevronDown, ChevronUp } from 'lucide-react';

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

export const UserMenu = ({ isOpen, onClose }) => {
  const [appLanguage, setAppLanguage] = useState('fr');
  const [cardsLanguage, setCardsLanguage] = useState('en');

  return (
    <>
      {/* Backdrop (fond sombre semi-transparent) - entre navbar et footer */}
      {isOpen && (
        <div
          className="fixed inset-0 top-35 bottom-20 bg-black/50 z-30 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Menu qui glisse depuis la droite - entre navbar et footer */}
      <div
        className={`
          fixed right-0 top-33 bottom-19 w-80 bg-linear-to-bl from-blue-50 to-white
          transform transition-transform duration-300 ease-in-out
          z-50 shadow-2xl overflow-y-auto rounded-tl-3xl rounded-bl-3xl border-l-2 border-blue-200
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Menu items */}
        <nav className="flex flex-col items-center gap-4 p-8">
          <div className="h-8"></div>

          {/* Login */}
          <a
            href="/login"
            onClick={onClose}
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
            onClick={onClose}
            className="group flex items-center gap-4 px-6 py-4 w-[85%] rounded-2xl bg-white border-2 border-blue-100 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <div className="p-2 rounded-xl bg-blue-100 group-hover:bg-blue-200 transition-colors">
              <UserPlus size={24} className="text-blue-600" strokeWidth={2} />
            </div>
            <span className="text-gray-800 font-semibold text-lg group-hover:text-blue-700">Create Account</span>
          </a>

          {/* Séparateur */}
          <div className="border-t-2 border-blue-200 my-3 w-full"></div>

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

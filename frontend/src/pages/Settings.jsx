import { useState } from 'react';
import {
  Moon,
  Sun,
  Globe,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { BackgroundGradient } from '../components/ui/background-gradient';
import { useTheme } from '../contexts/ThemeContext';
import styles from './Settings.module.css';


const LANGUAGES = [
  { code: 'fr', name: 'Français' },
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'de', name: 'Deutsch' },
  { code: 'ja', name: '日本語' },
];


export default function Settings() {
  const { isDark, toggleTheme } = useTheme();
  const [appLanguage, setAppLanguage] = useState('fr');
  const [cardLanguage, setCardLanguage] = useState('en');
  const [isAppLangOpen, setIsAppLangOpen] = useState(false);
  const [isCardLangOpen, setIsCardLangOpen] = useState(false);

  const getLanguageName = (code) => {
    return LANGUAGES.find(l => l.code === code)?.name || code;
  };


  return (
    <div className={`flex min-h-screen items-start justify-center px-6 py-8! md:py-8 transition-colors duration-500 ${isDark
        ? 'bg-slate-900' // Fond sombre classique
        : 'bg-gradient-to-br from-[#e0f2fe] to-[#ddd6fe] bg-fixed' // Ton nouveau style
      }`}>
      <BackgroundGradient className="rounded-3xl">
        <div className={`card w-[85vw] max-w-sm shadow-2xl border-2 rounded-3xl max-h-[85vh] md:max-h-[calc(100vh-200px)] flex flex-col ${
          isDark
            ? 'bg-slate-800 border-gray-700'
            : 'bg-base-100 border-gray-100'
        }`}>
          <div className={`card-body flex-1 flex flex-col px-8! py-8! md:px-16! md:py-8! rounded-3xl overflow-y-auto ${
            isDark
              ? 'bg-gradient-to-bl from-slate-800 to-slate-900'
              : 'bg-gradient-to-bl from-blue-50 to-white'
          }`}>


            {/* App Language Selector */}
            <div className="mb-4! md:mb-4">
              <button
                onClick={() => {
                  setIsAppLangOpen(!isAppLangOpen);
                  setIsCardLangOpen(false);
                }}
                className={`group w-full border-2 rounded-2xl py-3 px-4 md:py-5 md:px-4 transition-all duration-200 shadow-sm hover:shadow-md ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 hover:border-blue-400 hover:bg-gray-600'
                    : 'bg-white border-blue-100 hover:border-blue-400 hover:bg-blue-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className={`p-3 md:p-4 rounded-xl transition-colors ${
                      isDark
                        ? 'bg-gray-600 group-hover:bg-gray-500'
                        : 'bg-blue-100 group-hover:bg-blue-200'
                    }`}>
                      <Globe size={24} className={`md:w-8 md:h-8 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className={`font-semibold text-lg md:text-lg transition-colors ${
                        isDark
                          ? 'text-gray-100 group-hover:text-blue-400'
                          : 'text-gray-800 group-hover:text-blue-700'
                      }`}>App Language</span>
                      <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {getLanguageName(appLanguage)}
                      </span>
                    </div>
                  </div>
                  {isAppLangOpen ? (
                    <ChevronUp size={24} className={`md:w-6 md:h-6 transition-colors ${
                      isDark ? 'text-blue-400' : 'text-blue-600'
                    }`} />
                  ) : (
                    <ChevronDown size={24} className={`md:w-6 md:h-6 transition-colors ${
                      isDark ? 'text-blue-400' : 'text-blue-600'
                    }`} />
                  )}
                </div>
              </button>

              {/* App Language Dropdown */}
              {isAppLangOpen && (
                <div className={`mt-2 ml-4 rounded-xl border-2 overflow-hidden ${
                  isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-blue-100'
                }`}>
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setAppLanguage(lang.code);
                        setIsAppLangOpen(false);
                      }}
                      className={`w-full px-4 py-3 text-left transition-colors ${
                        appLanguage === lang.code
                          ? isDark
                            ? 'bg-blue-600 text-white'
                            : 'bg-blue-500 text-white'
                          : isDark
                            ? 'text-gray-200 hover:bg-gray-600'
                            : 'text-gray-700 hover:bg-blue-50'
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>


            {/* Card Language Selector */}
            <div className="mb-4! md:mb-4">
              <button
                onClick={() => {
                  setIsCardLangOpen(!isCardLangOpen);
                  setIsAppLangOpen(false);
                }}
                className={`group w-full border-2 rounded-2xl py-3 px-4 md:py-5 md:px-4 transition-all duration-200 shadow-sm hover:shadow-md ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 hover:border-blue-400 hover:bg-gray-600'
                    : 'bg-white border-blue-100 hover:border-blue-400 hover:bg-blue-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className={`p-3 md:p-4 rounded-xl transition-colors ${
                      isDark
                        ? 'bg-gray-600 group-hover:bg-gray-500'
                        : 'bg-blue-100 group-hover:bg-blue-200'
                    }`}>
                      <Globe size={24} className={`md:w-8 md:h-8 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className={`font-semibold text-lg md:text-lg transition-colors ${
                        isDark
                          ? 'text-gray-100 group-hover:text-blue-400'
                          : 'text-gray-800 group-hover:text-blue-700'
                      }`}>Card Language</span>
                      <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {getLanguageName(cardLanguage)}
                      </span>
                    </div>
                  </div>
                  {isCardLangOpen ? (
                    <ChevronUp size={24} className={`md:w-6 md:h-6 transition-colors ${
                      isDark ? 'text-blue-400' : 'text-blue-600'
                    }`} />
                  ) : (
                    <ChevronDown size={24} className={`md:w-6 md:h-6 transition-colors ${
                      isDark ? 'text-blue-400' : 'text-blue-600'
                    }`} />
                  )}
                </div>
              </button>

              {/* Card Language Dropdown */}
              {isCardLangOpen && (
                <div className={`mt-2 ml-4 rounded-xl border-2 overflow-hidden ${
                  isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-blue-100'
                }`}>
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setCardLanguage(lang.code);
                        setIsCardLangOpen(false);
                      }}
                      className={`w-full px-4 py-3 text-left transition-colors ${
                        cardLanguage === lang.code
                          ? isDark
                            ? 'bg-blue-600 text-white'
                            : 'bg-blue-500 text-white'
                          : isDark
                            ? 'text-gray-200 hover:bg-gray-600'
                            : 'text-gray-700 hover:bg-blue-50'
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>


            {/* Dark Mode Toggle */}
            <div className={`group border-2 rounded-2xl py-3 px-4 md:py-5 md:px-4 shadow-sm hover:shadow-md mb-3 md:mb-4 transition-all duration-200 ${
              isDark
                ? 'bg-gray-700 border-gray-600 hover:border-blue-400 hover:bg-gray-600'
                : 'bg-white border-blue-100 hover:border-blue-400 hover:bg-blue-50'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className={`p-3 md:p-4 rounded-xl transition-colors ${
                    isDark
                      ? 'bg-gray-600 group-hover:bg-gray-500'
                      : 'bg-blue-100 group-hover:bg-blue-200'
                  }`}>
                    {isDark ? (
                      <Moon size={24} className={`md:w-8 md:h-8 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                    ) : (
                      <Sun size={24} className={`md:w-8 md:h-8 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                    )}
                  </div>
                  <span className={`font-semibold text-lg md:text-lg transition-colors ${
                    isDark
                      ? 'text-gray-100 group-hover:text-blue-400'
                      : 'text-gray-800 group-hover:text-blue-700'
                  }`}>Dark Mode</span>
                </div>
                <label className="swap swap-rotate">
                  <input
                    type="checkbox"
                    checked={isDark}
                    onChange={toggleTheme}
                    className="hidden"
                  />
                  <div
                    className={`relative inline-flex h-11 w-20 md:h-9 md:w-16 items-center rounded-full transition-colors ${
                      isDark ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-9 w-9 md:h-7 md:w-7 transform rounded-full bg-white transition-transform ${
                        isDark ? 'translate-x-10 md:translate-x-8' : 'translate-x-1'
                      }`}
                    />
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </BackgroundGradient>
    </div>
  );
}

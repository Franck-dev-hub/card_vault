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


// Supported display and card languages. Defined at module level so the array
// is not recreated on every render.
const LANGUAGES = [
  { code: 'fr', name: 'Français' },
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'de', name: 'Deutsch' },
  { code: 'ja', name: '日本語' },
];


/**
 * Settings page component.
 *
 * Exposes user-configurable preferences:
 *   - App language  — controls the UI locale.
 *   - Card language — controls which language edition is preferred when
 *                     displaying card data from external APIs.
 *   - Dark mode     — delegates to ThemeContext so the preference is shared
 *                     across the whole application.
 *
 * The two language dropdowns are mutually exclusive (opening one closes the
 * other) to prevent the UI from becoming cluttered with multiple open lists.
 */
export default function Settings() {
  // `isDark` and `toggleTheme` come from ThemeContext so theme state is the
  // single source of truth across the app — not duplicated in this component.
  const { isDark, toggleTheme } = useTheme();
  const [appLanguage, setAppLanguage] = useState('fr');
  const [cardLanguage, setCardLanguage] = useState('en');
  // Each dropdown tracks its own open/closed state independently.
  const [isAppLangOpen, setIsAppLangOpen] = useState(false);
  const [isCardLangOpen, setIsCardLangOpen] = useState(false);

  /**
   * Resolves a language code to its human-readable display name.
   * Returns the raw code as a fallback so unknown codes never render as blank.
   *
   * @param {string} code - BCP-47 language code (e.g. 'en', 'fr').
   * @returns {string} Human-readable language name.
   */
  const getLanguageName = (code) => {
    return LANGUAGES.find(l => l.code === code)?.name || code;
  };


  return (
    <div className={`flex min-h-screen items-start justify-center px-6 py-8! md:py-8 transition-colors duration-500 ${isDark
        ? 'bg-slate-900'
        : 'bg-gradient-to-br from-[#e0f2fe] to-[#ddd6fe] bg-fixed'
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
                  // Closing the card language dropdown when opening the app
                  // language dropdown keeps only one list visible at a time.
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
                      {/* Show the current selection as a subtitle so the user
                          can see their choice without opening the dropdown. */}
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
                        // Highlight the currently active language so users can
                        // confirm their existing selection at a glance.
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
                  // Mirror the mutual-exclusion behaviour from above.
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


            {/* Dark Mode Toggle
                The toggle is a custom pill built from a div + span rather than
                a native checkbox so it can be styled independently of the
                browser's default checkbox appearance. The hidden checkbox still
                drives the `onChange` so keyboard accessibility is preserved. */}
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
                  {/* Pill background shifts colour based on theme state.
                      The inner span slides left/right via a translate class
                      to simulate a hardware-style toggle switch. */}
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

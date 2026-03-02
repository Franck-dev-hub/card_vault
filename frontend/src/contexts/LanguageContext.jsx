import { createContext, useContext, useState } from 'react';
import i18n from '../i18n';

const LanguageContext = createContext();

/**
 * Provides the active app language and a setter to the component tree.
 * Persists the user's choice in localStorage so it survives page refreshes.
 * Delegates the actual locale switch to i18next via i18n.changeLanguage()
 * so every component using useTranslation() re-renders automatically.
 *
 * @param {{ children: React.ReactNode }} props
 */
export const LanguageProvider = ({ children }) => {
  // Read the persisted preference once at mount. Falls back to French if
  // no preference has been saved yet.
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('appLanguage') || 'fr';
  });

  /**
   * Changes the active language, persists it, and notifies i18next.
   * Calling i18n.changeLanguage() triggers a re-render for every component
   * that uses the useTranslation() hook — no manual prop drilling needed.
   *
   * @param {string} code - BCP-47 language code (e.g. 'en', 'fr').
   */
  const setLanguage = (code) => {
    setLanguageState(code);
    localStorage.setItem('appLanguage', code);
    i18n.changeLanguage(code);
  };

  const value = {
    language,
    setLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

/**
 * Custom hook for accessing the language context.
 * Throws a descriptive error when called outside of LanguageProvider so
 * misconfigured trees fail loudly instead of silently using the wrong locale.
 *
 * @returns {{ language: string, setLanguage: Function }}
 */
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

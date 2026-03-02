import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import fr from './locales/fr.json';
import en from './locales/en.json';
import es from './locales/es.json';
import de from './locales/de.json';
import ja from './locales/ja.json';

// Read the persisted language before initialising so the first render
// already uses the correct locale without a flash of the wrong language.
const savedLanguage = localStorage.getItem('appLanguage') || 'fr';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: fr },
      en: { translation: en },
      es: { translation: es },
      de: { translation: de },
      ja: { translation: ja },
    },
    lng: savedLanguage,
    // Fall back to English if a key is missing in the active locale,
    // as English is the international reference language.
    fallbackLng: 'en',
    interpolation: {
      // React already escapes output — disable double-escaping.
      escapeValue: false,
    },
  });

export default i18n;

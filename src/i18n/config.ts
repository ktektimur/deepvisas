
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en/translation.json';
import trTranslation from './locales/tr/translation.json';

const resources = {
  en: {
    translation: enTranslation,
  },
  tr: {
    translation: trTranslation,
  },
};

// Get stored language or detect from browser
const getStoredLanguage = (): string => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('language');
    if (stored && ['en', 'tr'].includes(stored)) {
      return stored;
    }
    // Detect from browser
    const browserLang = navigator.language || (navigator as any).userLanguage;
    return browserLang?.startsWith('tr') ? 'tr' : 'en';
  }
  return 'en';
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getStoredLanguage(),
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { en } from './locales/en';
import { ta } from './locales/ta';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ta: { translation: ta },
    },
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false, // React handles XSS
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

// Synchronize document attribute and font classes
i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
  if (lng === 'ta') {
    document.body.classList.add('font-tamil');
  } else {
    document.body.classList.remove('font-tamil');
  }
});

// Set initial document attribute
if (i18n.language === 'ta') {
  document.documentElement.lang = 'ta';
  document.body.classList.add('font-tamil');
} else {
  document.documentElement.lang = 'en';
}

export default i18n;

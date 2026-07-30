import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en } from './locales/en';
import { ta } from './locales/ta';

// Always default to Tamil ('ta') on reload unless explicitly set
const savedLng = localStorage.getItem('i18nextLng');
const initialLang = savedLng === 'en' ? 'en' : 'ta';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ta: { translation: ta },
    },
    lng: 'ta', // Force Tamil default
    fallbackLng: 'ta',
    debug: false,
    interpolation: {
      escapeValue: false,
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

// Set initial document attribute and body font class
document.documentElement.lang = 'ta';
document.body.classList.add('font-tamil');

export default i18n;

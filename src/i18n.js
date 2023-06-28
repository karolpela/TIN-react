import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEnglish from './locales/en.json';
import translationPolish from './locales/pl.json';

const resources = {
  en: {
    translation: translationEnglish
  },
  pl: {
    translation: translationPolish
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'pl',
  // saveMissing: true,
  interpolation: {
    escapeValue: false
  }
});

// eslint-disable-next-line unused-imports/no-unused-vars
i18n.on('missingKey', function (lngs, namespace, key, res) {
  console.log(key);
});

export default i18n;

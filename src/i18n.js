// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translation files
import translationEN from "./locales/en/translation.json";
import translationUA from "./locales/ua/translation.json";

// Initialize i18next
i18n.use(initReactI18next).init({
  resources: {
    en: { translation: translationEN },
    ua: { translation: translationUA },
  },
  lng: "ua", // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;

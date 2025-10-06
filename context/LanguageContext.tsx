
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { en } from '../i18n/en';
import { fr } from '../i18n/fr';

type Language = 'en' | 'fr';

const translations = { en, fr };

export interface LanguageContextType {
  language: Language;
  changeLanguage: (lang: Language) => void;
  t: (key: string, variables?: { [key: string]: string | number }) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const getNestedTranslation = (languageStrings: any, key: string): string | undefined => {
  return key.split('.').reduce((obj, k) => (obj && obj[k] !== 'undefined') ? obj[k] : undefined, languageStrings);
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLang = localStorage.getItem('language');
    return (savedLang === 'en' || savedLang === 'fr') ? savedLang : 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  const t = useCallback((key: string, variables?: { [key: string]: string | number }) => {
    let translation = getNestedTranslation(translations[language], key);

    if (!translation) {
      console.warn(`Translation key not found: ${key}`);
      // Fallback to English if key not found in current language
      translation = getNestedTranslation(translations.en, key);
      if(!translation) return key;
    }

    if (variables) {
      Object.keys(variables).forEach(varKey => {
        const regex = new RegExp(`{{${varKey}}}`, 'g');
        translation = (translation as string).replace(regex, String(variables[varKey]));
      });
    }

    return translation;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

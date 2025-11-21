import React, { createContext, useContext, useMemo, useState } from 'react';
import { translations } from '../i18n/translations';

// Contexto centralizado para manejar el idioma y las traducciones de la app.
const LanguageContext = createContext({
  language: 'es',
  setLanguage: () => {},
  t: (key) => key,
});

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('es');

  // Función de traducción simple: retorna el texto en el idioma activo o la key como fallback.
  const t = useMemo(
    () => (key) => translations[language]?.[key] || translations.es[key] || key,
    [language],
  );

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t,
    }),
    [language, t],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

// Hook conveniente para consumir el contexto.
export const useLanguage = () => useContext(LanguageContext);

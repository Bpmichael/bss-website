import React, { createContext, useContext, useMemo, useState } from "react";
import en from "../i18n/en.json";
import fr from "../i18n/fr.json";

const dictionaries = { en, fr };
const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const saved = typeof window !== "undefined" ? localStorage.getItem("bss_lang") : null;
  const [lang, setLang] = useState(saved || "en");

  const value = useMemo(() => {
    const dict = dictionaries[lang] || dictionaries.en;
    const t = (key) => dict[key] || dictionaries.en[key] || key;
    const setLanguage = (l) => {
      setLang(l);
      try { localStorage.setItem("bss_lang", l); } catch {}
    };
    return { lang, setLanguage, t };
  }, [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

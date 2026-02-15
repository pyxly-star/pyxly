"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "./translations";

type Lang = "de" | "en";

const LanguageContext = createContext<any>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
  if (typeof window !== "undefined") {
    return (localStorage.getItem("lang") as Lang) || "de";
  }
  return "de";
});

useEffect(() => {
  localStorage.setItem("lang", lang);
}, [lang]);

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

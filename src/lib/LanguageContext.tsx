"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { Lang } from "./translations";

interface LangCtx {
  lang: Lang;
  toggle: () => void;
}

const LanguageContext = createContext<LangCtx>({ lang: "en", toggle: () => {} });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  // Persist preference
  useEffect(() => {
    const saved = localStorage.getItem("cf-lang") as Lang | null;
    if (saved === "ar" || saved === "en") setLang(saved);
  }, []);

  const toggle = () => {
    setLang((prev) => {
      const next: Lang = prev === "en" ? "ar" : "en";
      localStorage.setItem("cf-lang", next);
      // Apply RTL to <html>
      document.documentElement.dir  = next === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = next === "ar" ? "ar"  : "en";
      return next;
    });
  };

  // Sync dir on first load after hydration
  useEffect(() => {
    document.documentElement.dir  = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}

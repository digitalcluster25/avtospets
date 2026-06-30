"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type SiteLanguage = "ua" | "en";

type LanguageContextValue = {
  language: SiteLanguage;
  setLanguage: (language: SiteLanguage) => void;
};

const STORAGE_KEY = "avtospets-language";
const COOKIE_KEY = "avtospets-language";

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
  children,
  initialLanguage,
}: {
  children: ReactNode;
  initialLanguage: SiteLanguage;
}) {
  const [language, setLanguageState] = useState<SiteLanguage>(initialLanguage);

  useEffect(() => {
    document.documentElement.lang = language === "ua" ? "uk" : "en";
    window.localStorage.setItem(STORAGE_KEY, language);
    document.cookie = `${COOKIE_KEY}=${language}; path=/; max-age=31536000; samesite=lax`;
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage: setLanguageState,
    }),
    [language],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useSiteLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useSiteLanguage must be used within LanguageProvider");
  }

  return context;
}

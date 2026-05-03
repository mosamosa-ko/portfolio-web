"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { SiteLanguage } from "@/lib/i18n";

type LanguageContextValue = {
  language: SiteLanguage;
  setLanguage: (language: SiteLanguage) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "site-language";

export function LanguageProvider({
  children,
  initialLanguage,
}: {
  children: React.ReactNode;
  initialLanguage: SiteLanguage;
}) {
  const [language, setLanguage] = useState<SiteLanguage>(initialLanguage);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // Ignore storage access failures and still update the UI.
    }

    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    setLanguage(initialLanguage);
  }, [initialLanguage]);

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>;
}

export function useSiteLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useSiteLanguage must be used within LanguageProvider.");
  }

  return context;
}

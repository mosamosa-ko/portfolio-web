"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, withLocale } from "@/lib/i18n";
import { useSiteLanguage } from "./LanguageProvider";

const labels = {
  en: {
    en: "English",
    ja: "Japanese",
  },
  ja: {
    en: "英語",
    ja: "日本語",
  },
} as const;

export function LanguageSwitcher() {
  const { language, setLanguage } = useSiteLanguage();
  const pathname = usePathname();
  const copy = labels[language];
  const pathnameWithoutLocale = (() => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length > 0 && locales.includes(segments[0] as (typeof locales)[number])) {
      return `/${segments.slice(1).join("/")}`;
    }
    return pathname;
  })();

  return (
    <div className="fixed right-5 top-5 z-40 flex items-center gap-2 rounded-2xl border border-black/12 bg-white/88 p-2 shadow-[0_18px_50px_rgba(17,17,17,0.08)] backdrop-blur-md sm:right-8 sm:top-8">
      <Link
        href={withLocale("en", pathnameWithoutLocale)}
        onClick={() => setLanguage("en")}
        className={`rounded-xl px-4 py-2 text-xs font-medium tracking-[0.12em] transition sm:text-sm ${
          language === "en" ? "bg-[#111111] text-white" : "text-black/54 hover:bg-black/6"
        }`}
        aria-pressed={language === "en"}
      >
        {copy.en}
      </Link>
      <Link
        href={withLocale("ja", pathnameWithoutLocale)}
        onClick={() => setLanguage("ja")}
        className={`rounded-xl px-4 py-2 text-xs font-medium tracking-[0.12em] transition sm:text-sm ${
          language === "ja" ? "bg-[#111111] text-white" : "text-black/54 hover:bg-black/6"
        }`}
        aria-pressed={language === "ja"}
      >
        {copy.ja}
      </Link>
    </div>
  );
}

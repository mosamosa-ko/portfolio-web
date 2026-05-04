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
    <div className="fixed right-4 top-4 z-40 rounded-full border border-black/8 bg-white/64 p-1 shadow-[0_10px_30px_rgba(17,17,17,0.06)] backdrop-blur-md sm:right-7 sm:top-7">
      <div className="flex items-center gap-1 rounded-full bg-black/[0.03] p-0.5">
      <Link
        href={withLocale("en", pathnameWithoutLocale)}
        onClick={() => setLanguage("en")}
        className={`rounded-full px-3 py-1.5 text-[11px] font-medium tracking-[0.08em] transition sm:px-3.5 sm:text-xs ${
          language === "en" ? "bg-[#111111] text-white shadow-[0_6px_14px_rgba(17,17,17,0.14)]" : "text-black/46 hover:bg-black/6 hover:text-black/74"
        }`}
        aria-pressed={language === "en"}
      >
        {copy.en}
      </Link>
      <Link
        href={withLocale("ja", pathnameWithoutLocale)}
        onClick={() => setLanguage("ja")}
        className={`rounded-full px-3 py-1.5 text-[11px] font-medium tracking-[0.08em] transition sm:px-3.5 sm:text-xs ${
          language === "ja" ? "bg-[#111111] text-white shadow-[0_6px_14px_rgba(17,17,17,0.14)]" : "text-black/46 hover:bg-black/6 hover:text-black/74"
        }`}
        aria-pressed={language === "ja"}
      >
        {copy.ja}
      </Link>
      </div>
    </div>
  );
}

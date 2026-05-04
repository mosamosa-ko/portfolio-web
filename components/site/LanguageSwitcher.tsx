"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { locales, withLocale } from "@/lib/i18n";
import { useSiteLanguage } from "./LanguageProvider";

const labels = {
  en: {
    trigger: "Language",
    en: "English",
    ja: "Japanese",
  },
  ja: {
    trigger: "Language",
    en: "英語",
    ja: "日本語",
  },
} as const;

export function LanguageSwitcher() {
  const { language, setLanguage } = useSiteLanguage();
  const pathname = usePathname();
  const copy = labels[language];
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const pathnameWithoutLocale = (() => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length > 0 && locales.includes(segments[0] as (typeof locales)[number])) {
      return `/${segments.slice(1).join("/")}`;
    }
    return pathname;
  })();

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    window.addEventListener("mousedown", handlePointerDown);
    return () => window.removeEventListener("mousedown", handlePointerDown);
  }, []);

  return (
    <div ref={rootRef} className="fixed right-4 top-4 z-40 sm:right-7 sm:top-7">
      <div className="rounded-full border border-black/8 bg-white/62 p-1 shadow-[0_10px_30px_rgba(17,17,17,0.06)] backdrop-blur-md">
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          aria-label="Switch language"
          className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-medium tracking-[0.08em] text-black/58 transition hover:bg-black/6 hover:text-black/76 sm:px-3.5 sm:text-xs"
        >
          <span>{copy.trigger}</span>
          <span className="text-[10px] text-black/32">{language.toUpperCase()}</span>
          <svg
            aria-hidden="true"
            viewBox="0 0 12 12"
            className={`h-3 w-3 text-black/34 transition ${open ? "rotate-180" : ""}`}
            fill="none"
          >
            <path d="M3 4.5 6 7.5 9 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {open ? (
        <div className="absolute right-0 top-[calc(100%+0.55rem)] min-w-[148px] rounded-2xl border border-black/8 bg-white/92 p-1.5 shadow-[0_18px_48px_rgba(17,17,17,0.12)] backdrop-blur-xl">
          <Link
            href={withLocale("en", pathnameWithoutLocale)}
            onClick={() => {
              setLanguage("en");
              setOpen(false);
            }}
            className={`flex items-center justify-between rounded-[0.9rem] px-3 py-2 text-xs font-medium tracking-[0.05em] transition ${
              language === "en" ? "bg-[#111111] text-white" : "text-black/62 hover:bg-black/6 hover:text-black"
            }`}
          >
            <span>{copy.en}</span>
            {language === "en" ? <span className="text-[10px] text-white/62">●</span> : null}
          </Link>
          <Link
            href={withLocale("ja", pathnameWithoutLocale)}
            onClick={() => {
              setLanguage("ja");
              setOpen(false);
            }}
            className={`mt-1 flex items-center justify-between rounded-[0.9rem] px-3 py-2 text-xs font-medium tracking-[0.05em] transition ${
              language === "ja" ? "bg-[#111111] text-white" : "text-black/62 hover:bg-black/6 hover:text-black"
            }`}
          >
            <span>{copy.ja}</span>
            {language === "ja" ? <span className="text-[10px] text-white/62">●</span> : null}
          </Link>
        </div>
      ) : null}
    </div>
  );
}

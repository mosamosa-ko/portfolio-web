export const locales = ["en", "ja"] as const;

export type SiteLanguage = (typeof locales)[number];

export const siteUrl = "https://www.koyamasaki.com";
export const terraplotAppUrl = "https://terraplot-chi.vercel.app/en";

export function isLocale(value: string): value is SiteLanguage {
  return locales.includes(value as SiteLanguage);
}

export function withLocale(language: SiteLanguage, path = "") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `/${language}${normalizedPath === "/" ? "" : normalizedPath}`;
}

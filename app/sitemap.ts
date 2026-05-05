import type { MetadataRoute } from "next";
import { locales, siteUrl, withLocale } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-05-04");

  return locales.flatMap((lang) => [
    {
      url: `${siteUrl}${withLocale(lang)}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}${withLocale(lang, "/works/terraplot")}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ]);
}

import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://koyamasaki.com",
      lastModified: new Date("2026-05-02"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}

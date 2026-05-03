import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TerraplotPage } from "@/components/site/TerraplotPage";
import { isLocale, locales, siteUrl, type SiteLanguage, withLocale } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ lang: string }>;
};

function getTerraplotMeta(language: SiteLanguage) {
  if (language === "ja") {
    return {
      title: "Terraplot | 山崎 康 | GPS 陣取りゲーム",
      description:
        "Terraplot は、山崎 康 (Ko Yamasaki) が制作する GPS 陣取りゲームです。位置情報、地図、プロダクト設計、技術スタック、スクリーンショットを `koyamasaki.com` 配下で紹介しています。",
    };
  }

  return {
    title: "Terraplot | Ko Yamasaki | GPS Territory Game",
    description:
      "Terraplot is a GPS territory game by Ko Yamasaki (山崎 康). Explore the concept, screenshots, technical stack, and product context under `koyamasaki.com`.",
  };
}

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const language = isLocale(lang) ? lang : "en";
  const copy = getTerraplotMeta(language);
  const path = withLocale(language, "/works/terraplot");

  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        en: withLocale("en", "/works/terraplot"),
        ja: withLocale("ja", "/works/terraplot"),
        "x-default": "/en/works/terraplot",
      },
    },
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: `${siteUrl}${path}`,
      locale: language === "ja" ? "ja_JP" : "en_US",
      images: [
        {
          url: "/Terraplot_logo.png",
          width: 1200,
          height: 1200,
          alt: "Terraplot",
        },
      ],
    },
  };
}

export default async function LocalizedTerraplotPage({ params }: PageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) {
    notFound();
  }

  return <TerraplotPage language={lang} />;
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomePage } from "@/components/site/HomePage";
import { isLocale, locales, siteUrl, type SiteLanguage, withLocale } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ lang: string }>;
};

function getHomeCopy(language: SiteLanguage) {
  if (language === "ja") {
    return {
      title: "Ko Yamasaki | 山崎 康 | ポートフォリオ",
      description:
        "山崎 康 (Ko Yamasaki) のポートフォリオ。位置情報、グラフデータ、AI、アプリ開発、Web インタラクション、Terraplot の制作と研究を紹介します。",
    };
  }

  return {
    title: "Ko Yamasaki | Portfolio",
    description:
      "Portfolio of Ko Yamasaki (山崎 康): location-based products, graph AI research, app development, interactive web experiences, and Terraplot.",
  };
}

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const language = isLocale(lang) ? lang : "en";
  const copy = getHomeCopy(language);
  const path = withLocale(language);

  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        en: withLocale("en"),
        ja: withLocale("ja"),
        "x-default": "/en",
      },
    },
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: `${siteUrl}${path}`,
      locale: language === "ja" ? "ja_JP" : "en_US",
    },
  };
}

export default async function LocalizedHomePage({ params }: PageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) {
    notFound();
  }

  return <HomePage language={lang} />;
}

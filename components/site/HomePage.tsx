import { AboutSection } from "@/components/portfolio/AboutSection";
import { ContactSection } from "@/components/portfolio/ContactSection";
import { MobileDesktopNote } from "@/components/portfolio/MobileDesktopNote";
import { SkillsSection } from "@/components/portfolio/SkillsSection";
import { WorksSection } from "@/components/portfolio/WorksSection";
import { LanguageProvider } from "@/components/site/LanguageProvider";
import { LanguageSwitcher } from "@/components/site/LanguageSwitcher";
import { XrayPortfolioHero } from "@/components/xray/XrayPortfolioHero";
import { siteUrl, type SiteLanguage, withLocale } from "@/lib/i18n";

export function HomePage({ language }: { language: SiteLanguage }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: "山崎 康",
        alternateName: ["山崎康", "Ko Yamasaki", "Kou Yamasaki", "Koyamasaki"],
        url: `${siteUrl}${withLocale(language)}`,
        sameAs: ["https://github.com/mosamosa-ko", "https://note.com/komosa", "https://x.com/byt3craft3r"],
        jobTitle: language === "ja" ? "コンピュータサイエンス学生" : "Computer Science Student",
        description:
          language === "ja"
            ? "山崎 康 (Ko Yamasaki) のポートフォリオ。位置情報、グラフデータ、AI、アプリ開発、Web インタラクションの制作と研究。"
            : "Portfolio of Ko Yamasaki (山崎 康) covering location-based products, graph AI, app development, and interactive web experiences.",
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: "Ko Yamasaki Portfolio",
        url: `${siteUrl}${withLocale(language)}`,
        inLanguage: language,
        publisher: {
          "@id": `${siteUrl}/#person`,
        },
      },
    ],
  };

  return (
    <LanguageProvider initialLanguage={language}>
      <main className="overflow-x-hidden bg-white text-[#111111]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <LanguageSwitcher />
        <div className="sr-only">
          <h1>Ko Yamasaki</h1>
          <p>山崎 康、山崎康、Ko Yamasaki のポートフォリオサイトです。</p>
          <p>位置情報、グラフデータ、AI、アプリ開発、Web 開発、Terraplot に関する制作と研究を掲載しています。</p>
        </div>
        <XrayPortfolioHero />
        <AboutSection />
        <WorksSection />
        <SkillsSection />
        <ContactSection />
        <MobileDesktopNote />
      </main>
    </LanguageProvider>
  );
}

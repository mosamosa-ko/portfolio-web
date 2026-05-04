import Image from "next/image";
import { LanguageProvider } from "@/components/site/LanguageProvider";
import { LanguageSwitcher } from "@/components/site/LanguageSwitcher";
import { siteUrl, terraplotAppUrl, type SiteLanguage, withLocale } from "@/lib/i18n";

export function TerraplotPage({ language }: { language: SiteLanguage }) {
  const copy =
    language === "ja"
      ? {
          eyebrow: "Works / Terraplot",
          title: "Terraplot",
          subtitle: "歩くことを、地図の上の遊びに変える位置情報プロダクト。",
          intro:
            "Terraplot は、現実の場所を歩いてセルを獲得していく GPS 陣取りゲームです。移動、地図、陣地、軽い競争体験をひとつの流れにまとめています。",
          body:
            "このページでは、山崎 康 (Ko Yamasaki) が制作している Terraplot の考え方、画面、技術スタック、そして何を実装したかをまとめています。指名検索だけでなく、位置情報アプリ、地図プロダクト、GPS ゲームの文脈でも見つけてもらうことを狙っています。",
          cta: "Terraplot を開く",
          github: "GitHub プロフィール",
          overview: "概要",
          stack: "技術スタック",
          outcomes: "実装したこと",
          screenshots: "スクリーンショット",
          related: "関連リンク",
          bulletsOverview: [
            "現実世界を歩く行為を、地図上のセル獲得体験へ変換する設計。",
            "位置情報、地図表示、軽いゲームループを組み合わせた iOS プロダクト。",
            "ポートフォリオ上では、位置情報、プロダクト設計、インタラクション設計の代表作として掲載。",
          ],
          bulletsStack: [
            "SwiftUI",
            "Mapbox",
            "Firebase",
            "GPS / Location Services",
            "Product design and interaction design",
          ],
          bulletsOutcomes: [
            "位置更新とセル占有の基本ループを設計。",
            "地図上で陣地の状態を視覚的に確認できる UI を構成。",
            "プロダクト説明導線を `koyamasaki.com` 配下に分離し、SEO 用のランディングページを追加。",
          ],
          note: "この作品の制作背景や設計意図は、note 記事の下書きにもまとめています。",
          home: "ポートフォリオへ戻る",
        }
      : {
          eyebrow: "Works / Terraplot",
          title: "Terraplot",
          subtitle: "A location-based product that turns walking into play on a map.",
          intro:
            "Terraplot is a GPS territory game where moving through real places captures cells on a map. It connects movement, maps, territory, and lightweight competition in one loop.",
          body:
            "This page documents Terraplot by Ko Yamasaki (山崎 康): the concept, interface, technical stack, and what has been implemented so far. The goal is to rank not only for name searches, but also for queries around location-based apps, map products, and GPS games.",
          cta: "Open Terraplot",
          github: "GitHub Profile",
          overview: "Overview",
          stack: "Tech Stack",
          outcomes: "What Was Built",
          screenshots: "Screenshots",
          related: "Related Links",
          bulletsOverview: [
            "Designed to transform walking through real places into map-based territory capture.",
            "Combines location, mapping, and a lightweight game loop into one iOS product concept.",
            "Featured in the portfolio as a representative project for location systems, product design, and interaction design.",
          ],
          bulletsStack: [
            "SwiftUI",
            "Mapbox",
            "Firebase",
            "GPS / Location Services",
            "Product design and interaction design",
          ],
          bulletsOutcomes: [
            "Designed the core loop around location updates and territory capture.",
            "Built interface patterns for visualizing captured cells and map state.",
            "Added a dedicated SEO landing page under `koyamasaki.com` for discovery and portfolio context.",
          ],
          note: "The project background and design intent are also summarized in a draft note article.",
          home: "Back to Portfolio",
        };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: "Terraplot",
        operatingSystem: "iOS",
        applicationCategory: "GameApplication",
        creator: {
          "@type": "Person",
          name: "山崎 康",
          alternateName: "Ko Yamasaki",
        },
        description: copy.intro,
        url: `${siteUrl}${withLocale(language, "/works/terraplot")}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${siteUrl}${withLocale(language)}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Terraplot",
            item: `${siteUrl}${withLocale(language, "/works/terraplot")}`,
          },
        ],
      },
    ],
  };

  return (
    <LanguageProvider initialLanguage={language}>
      <main className="min-h-screen overflow-x-hidden bg-white text-[#111111]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <LanguageSwitcher />

        <section className="relative overflow-hidden px-6 pb-18 pt-28 sm:px-10 lg:px-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_76%_34%,rgba(143,199,221,0.22),transparent_28%),linear-gradient(135deg,#ffffff_0%,#f6fbfd_58%,#ffffff_100%)]" />
          <div className="relative mx-auto max-w-[1240px]">
            <p className="text-sm font-medium tracking-[-0.01em] text-black/42">{copy.eyebrow}</p>
            <h1 className="mt-4 font-display text-5xl font-semibold leading-[0.96] tracking-[-0.06em] sm:text-7xl">{copy.title}</h1>
            <p className="mt-5 max-w-3xl text-2xl leading-[1.28] tracking-[-0.035em] text-black/72 sm:text-3xl">{copy.subtitle}</p>
            <p className="mt-8 max-w-3xl text-[17px] leading-8 text-black/62">{copy.intro}</p>
            <p className="mt-5 max-w-3xl text-[17px] leading-8 text-black/56">{copy.body}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={terraplotAppUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-full border border-[#2f718a]/18 bg-[#111111] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#2f718a]"
              >
                {copy.cta}
              </a>
              <a
                href={withLocale(language)}
                className="inline-flex rounded-full border border-black/12 bg-white px-5 py-3 text-sm font-medium text-black/74 transition hover:border-black/32 hover:text-black"
              >
                {copy.home}
              </a>
            </div>
          </div>
        </section>

        <section className="px-6 py-12 sm:px-10 lg:px-16">
          <div className="mx-auto grid max-w-[1240px] gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[1.6rem] border border-[#8fc7dd]/18 bg-[#f8fcfd] p-5 shadow-[0_24px_70px_rgba(95,159,186,0.08)] sm:p-7">
              <p className="text-sm font-medium tracking-[-0.01em] text-black/42">{copy.screenshots}</p>
              <div className="mt-5 grid gap-5">
                <div className="overflow-hidden rounded-[1.2rem] border border-[#8fc7dd]/18 bg-white">
                  <Image src="/models/ad.png" alt="Terraplot preview interface" width={1600} height={960} className="h-auto w-full" />
                </div>
                <div className="overflow-hidden rounded-[1.2rem] border border-[#8fc7dd]/18 bg-white p-8">
                  <Image src="/Terraplot_logo.png" alt="Terraplot logo" width={1200} height={1200} className="mx-auto h-auto w-full max-w-[320px]" />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[1.5rem] border border-[#8fc7dd]/18 bg-white p-7 shadow-[0_20px_60px_rgba(95,159,186,0.08)]">
                <h2 className="font-display text-3xl font-semibold tracking-[-0.05em]">{copy.overview}</h2>
                <ul className="mt-5 space-y-3 text-[16px] leading-7 text-black/62">
                  {copy.bulletsOverview.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[1.5rem] border border-[#8fc7dd]/18 bg-white p-7 shadow-[0_20px_60px_rgba(95,159,186,0.08)]">
                <h2 className="font-display text-3xl font-semibold tracking-[-0.05em]">{copy.stack}</h2>
                <div className="mt-5 flex flex-wrap gap-3">
                  {copy.bulletsStack.map((item) => (
                    <span key={item} className="rounded-full border border-[#8fc7dd]/24 bg-[#f7fbfd] px-4 py-2 text-sm text-black/68">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-[#8fc7dd]/18 bg-white p-7 shadow-[0_20px_60px_rgba(95,159,186,0.08)]">
                <h2 className="font-display text-3xl font-semibold tracking-[-0.05em]">{copy.outcomes}</h2>
                <ul className="mt-5 space-y-3 text-[16px] leading-7 text-black/62">
                  {copy.bulletsOutcomes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 pb-20 pt-4 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-[1240px] rounded-[1.6rem] border border-black/10 bg-[#111111] px-7 py-8 text-white sm:px-10 sm:py-10">
            <p className="text-sm font-medium tracking-[-0.01em] text-white/54">{copy.related}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={terraplotAppUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-full border border-white/14 px-5 py-3 text-sm font-medium text-white transition hover:border-white/34"
              >
                {copy.cta}
              </a>
              <a
                href="https://github.com/mosamosa-ko"
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-full border border-white/14 px-5 py-3 text-sm font-medium text-white transition hover:border-white/34"
              >
                {copy.github}
              </a>
            </div>
            <p className="mt-6 max-w-3xl text-sm leading-7 text-white/62">{copy.note}</p>
          </div>
        </section>
      </main>
    </LanguageProvider>
  );
}

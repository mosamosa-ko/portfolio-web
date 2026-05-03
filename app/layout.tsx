import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://koyamasaki.com";
const personNameJa = "山崎 康";
const personNameJaCompact = "山崎康";
const personNameRomaji = "Ko Yamasaki";
const siteTitle = `${personNameJa} | ${personNameRomaji} | Portfolio`;
const siteDescription =
  "Portfolio of 山崎 康 (Ko Yamasaki). App development, interactive web experiences, graph AI research, and product experiments.";
const socialDescription =
  "山崎 康 (Ko Yamasaki) のポートフォリオ。App development, interactive web experiences, graph AI research, and product experiments.";

export const metadata: Metadata = {
  applicationName: `${personNameJa} Portfolio`,
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  keywords: [
    personNameJa,
    personNameJaCompact,
    personNameRomaji,
    "Kou Yamasaki",
    "Koyamasaki",
    "山崎こう",
    "やまさきこう",
    "portfolio",
    "ポートフォリオ",
    "app development",
    "graph AI",
    "web development",
    "Terraplot",
  ],
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: siteTitle,
    description: socialDescription,
    url: siteUrl,
    siteName: `${personNameJa} Portfolio`,
    type: "website",
    images: [
      {
        url: "/name_logo_transparent.png",
        width: 1200,
        height: 630,
        alt: `${personNameJa} Portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: socialDescription,
    images: ["/name_logo_transparent.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  other: {
    "profile:first_name": "康",
    "profile:last_name": "山崎",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: personNameJa,
      alternateName: [personNameRomaji, "Kou Yamasaki", "Koyamasaki", personNameJaCompact, "山崎こう", "やまさきこう"],
      url: siteUrl,
      sameAs: ["https://github.com/mosamosa-ko"],
      jobTitle: "Computer Science Student",
      description: "山崎 康 (Ko Yamasaki) portfolio focused on app development, graph AI, and interactive systems.",
      knowsAbout: [
        "App development",
        "Interactive web experiences",
        "Graph AI",
        "Graph data",
        "Web development",
        "Terraplot",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: `${personNameJa} Portfolio`,
      url: siteUrl,
      inLanguage: ["ja", "en"],
      publisher: {
        "@id": `${siteUrl}/#person`,
      },
      about: {
        "@id": `${siteUrl}/#person`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}

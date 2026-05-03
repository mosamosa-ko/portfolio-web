import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://koyamasaki.com";

export const metadata: Metadata = {
  applicationName: "Ko Yamasaki Portfolio",
  metadataBase: new URL(siteUrl),
  title: "Ko Yamasaki | Portfolio",
  description: "Portfolio of Ko Yamasaki.",
  keywords: ["Ko Yamasaki", "山崎 康", "山崎康", "Kou Yamasaki", "Koyamasaki", "Terraplot"],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AutoAd — Générateur d'annonces auto IA",
  description:
    "Créez des annonces automobiles SEO optimisées en quelques secondes grâce à l'intelligence artificielle. L'outil indispensable des concessionnaires modernes.",
  keywords: "annonce automobile, IA, SEO, concessionnaire, générateur annonce, Leboncoin",
  metadataBase: new URL("https://auto-ad-six.vercel.app"),
  openGraph: {
    title: "AutoAd — Générateur d'annonces auto IA",
    description: "Créez des annonces Leboncoin optimisées SEO en 30 secondes grâce à l'IA.",
    url: "https://auto-ad-six.vercel.app",
    siteName: "AutoAd",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "AutoAd — Générateur d'annonces auto IA",
    description: "Créez des annonces Leboncoin optimisées SEO en 30 secondes grâce à l'IA.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "@fontsource-variable/dm-sans/opsz.css";
import "./globals.css";
import { company, hero } from "@/content/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SITE_URL } from "@/lib/site-url";

/**
 * Link preview image (WhatsApp, LinkedIn, X, iMessage). A plain file with a fixed address and no
 * query string, kept small (WhatsApp skips large images). To change it, add a new file with a new
 * name (e.g. share-v2.jpg) so apps that cached the old preview fetch the new one.
 */
const shareImage = {
  url: "/og/share-v1.jpg",
  width: 1200,
  height: 630,
  type: "image/jpeg",
  alt: "Concepts & Standards. Beirut-based. Handpicking the world’s most reputable music brands since 2015.",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${company.shortName} | ${company.tradingAs}`,
    template: `%s | ${company.shortName}`,
  },
  description: company.tagline,
  openGraph: {
    title: company.legalName,
    description: hero.body,
    type: "website",
    locale: "en_US",
    siteName: company.shortName,
    images: [shareImage],
  },
  twitter: { card: "summary_large_image", images: [shareImage] },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="antialiased">
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

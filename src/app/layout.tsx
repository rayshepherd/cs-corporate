import type { Metadata } from "next";
import "@fontsource-variable/dm-sans/opsz.css";
import "./globals.css";
import { company, hero } from "@/content/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SITE_URL } from "@/lib/site-url";

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
  },
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

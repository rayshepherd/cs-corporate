import type { Metadata } from "next";
import "@fontsource-variable/archivo/wdth.css";
import "./globals.css";
import { company, hero } from "@/content/site";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${company.shortName} | ${company.tradingAs}`,
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
      <body className="min-h-screen">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { About, Brands, Resellers } from "@/components/Sections";
import { LatestNews } from "@/components/LatestNews";
import { Contact } from "@/components/Contact";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Brands />
      <Resellers />
      <LatestNews />
      <Contact />
    </>
  );
}

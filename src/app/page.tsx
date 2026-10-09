import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About, Brands, Resellers } from "@/components/Sections";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Brands />
        <Resellers />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

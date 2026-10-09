import { Hero } from "@/components/Hero";
import { About, Brands, Resellers } from "@/components/Sections";
import { LatestNews } from "@/components/LatestNews";
import { Contact } from "@/components/Contact";

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

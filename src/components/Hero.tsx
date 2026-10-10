import { hero } from "@/content/site";
import { ResellerLink } from "./ResellerLink";
import { HeroVideo } from "./HeroVideo";
import { SignalChain } from "./SignalChain";

export function Hero() {
  return (
    <section id="top" className="relative isolate -mt-16 flex min-h-[100svh] flex-col overflow-hidden border-b border-rule pt-16">
      <HeroVideo />
      <div className="relative mx-auto grid w-full max-w-[1180px] flex-1 content-center gap-14 px-5 pb-20 pt-16 md:grid-cols-[1.2fr_0.8fr] md:gap-16 md:px-8 md:py-24">
        <div className="flex flex-col justify-center">
          <h1 className="display text-balance text-[2.3rem] sm:text-[2.9rem] lg:text-[3.6rem]">
            {hero.heading.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="measure mt-7 text-pretty text-lg text-ink/75">{hero.body}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ResellerLink className="rounded-sm bg-accent px-6 py-3 font-medium text-accent-ink hover:opacity-90">
              {hero.primaryCta}
            </ResellerLink>
            <a
              href="#brands"
              className="rounded-sm border border-ink px-6 py-3 font-medium text-ink hover:bg-ink hover:text-paper"
            >
              {hero.secondaryCta}
            </a>
          </div>
        </div>

        <SignalChain />
      </div>
    </section>
  );
}

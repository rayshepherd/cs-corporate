import { chain, company, hero } from "@/content/site";
import { ResellerLink } from "./ResellerLink";

export function Hero() {
  return (
    <section id="top" className="border-b border-rule">
      <div className="mx-auto grid max-w-[1180px] gap-14 px-5 pb-20 pt-16 md:grid-cols-[1.2fr_0.8fr] md:gap-16 md:px-8 md:pb-28 md:pt-24">
        <div className="flex flex-col justify-center">
          <h1 className="display text-[2.4rem] sm:text-[3.1rem] lg:text-[4rem]">{hero.heading}</h1>
          <p className="measure mt-7 text-lg text-steel">{hero.body}</p>
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

        {/* Signal chain: how products reach the stage */}
        <div className="relative self-center">
          <p className="mb-5 text-sm text-steel">How gear reaches the stage</p>
          <ol className="relative pl-8">
            <span aria-hidden="true" className="absolute bottom-6 left-[7px] top-6 w-px bg-rule">
              <span className="signal-dot absolute -left-[4px] h-[9px] w-[9px] rounded-full bg-accent" />
            </span>
            {chain.map((step, i) => {
              const isUs = step.title === company.shortName;
              return (
                <li key={step.title} className="relative pb-3 last:pb-0">
                  <span
                    aria-hidden="true"
                    className={`absolute -left-8 top-6 h-[15px] w-[15px] rounded-full border-2 ${
                      isUs ? "border-accent bg-accent" : "border-steel bg-paper"
                    }`}
                  />
                  <div
                    className={`chain-node border px-5 py-4 ${
                      isUs ? "border-accent" : "border-rule"
                    }`}
                    style={{ animationDelay: `${0.4 + i * 0.55}s` }}
                  >
                    <p className={`font-semibold ${isUs ? "text-accent" : "text-ink"}`}>{step.title}</p>
                    <p className="mt-1 text-[0.95rem] leading-snug text-steel">{step.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

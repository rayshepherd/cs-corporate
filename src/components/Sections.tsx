import Image from "next/image";
import { about, distributedBrands, journey, ownBrands, resellers, service } from "@/content/site";
import { ResellerLink } from "./ResellerLink";
import { SignalChain } from "./SignalChain";

function SectionHeading({ title, intro }: { title: string; intro?: string }) {
  return (
    <div className="mb-12 md:mb-14">
      <h2 className="display text-[1.9rem] md:text-[2.5rem]">{title}</h2>
      {intro && <p className="measure mt-4 text-steel">{intro}</p>}
    </div>
  );
}

/** Heading for a part of a longer section (About is told in several parts). */
function PartHeading({ title, intro }: { title: string; intro?: string }) {
  return (
    <div className="mb-10 md:mb-12">
      <h3 className="display text-[1.6rem] md:text-[2rem]">{title}</h3>
      {intro && <p className="measure mt-3 text-steel">{intro}</p>}
    </div>
  );
}

/**
 * About is one continuous story: who we are, how we work, how we got here, how we look after
 * products, and the companies behind it.
 */
export function About() {
  return (
    <section id="about" className="border-b border-rule">
      <div className="mx-auto max-w-[1180px] px-5 py-20 md:px-8 md:py-28">
        {/* Who we are */}
        <SectionHeading title={about.heading} />
        <div className="grid gap-12 md:grid-cols-[1.3fr_0.7fr] md:gap-20">
          <div className="measure space-y-5 text-[1.125rem]">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <dl className="border-t border-ink">
            {about.facts.map((f) => (
              <div key={f.label} className="flex justify-between gap-6 border-b border-rule py-4">
                <dt className="text-steel">{f.label}</dt>
                <dd className="text-right font-medium">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-24 md:mt-32">
          <SignalChain />
        </div>

        <div className="mt-24 md:mt-32">
          <Journey />
        </div>

        <div className="mt-24 md:mt-32">
          <Service />
        </div>

        <div className="mt-24 md:mt-32">
          <Group />
        </div>
      </div>
    </section>
  );
}

function Journey() {
  return (
    <div>
      <PartHeading title={journey.heading} />
      <ol className="border-b border-rule">
        {journey.milestones.map((m) => {
          const hasFrame = Boolean(m.photo || m.photoAlt);
          return (
            <li
              key={`${m.year}-${m.title}`}
              className={`grid gap-4 border-t border-rule py-8 md:gap-10 ${
                hasFrame ? "md:grid-cols-[140px_1fr_400px]" : "md:grid-cols-[140px_1fr]"
              }`}
            >
              <p className="display text-[1.8rem] leading-none md:text-[2.2rem]">{m.year}</p>
              <div className="measure md:pt-1">
                <h4 className="text-[1.15rem] font-semibold">{m.title}</h4>
                <p className="mt-2 text-steel">{m.text}</p>
              </div>
              {hasFrame && (
                <div className="group relative aspect-[4/3] w-full overflow-hidden border border-rule bg-[#f4f4f4]">
                  {m.photo ? (
                    <Image
                      src={m.photo}
                      alt={m.photoAlt}
                      fill
                      sizes="(min-width: 768px) 400px, 100vw"
                      className="object-cover grayscale transition-[filter] duration-500 group-hover:grayscale-0"
                    />
                  ) : (
                    <span className="absolute inset-0 grid place-items-center text-sm text-steel">Photo to come</span>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function Service() {
  return (
    <div>
      <PartHeading title={service.heading} intro={service.intro} />
      <ul className="grid gap-x-12 gap-y-10 md:grid-cols-3">
        {service.points.map((pt) => (
          <li key={pt.title} className="border-t border-ink pt-4">
            <h4 className="font-semibold">{pt.title}</h4>
            <p className="mt-2 text-steel">{pt.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Group() {
  return (
    <div>
      <PartHeading title={ownBrands.heading} intro={ownBrands.intro} />
      <ul className="grid gap-px border border-rule bg-rule md:grid-cols-2">
        {ownBrands.items.map((b) => (
          <li key={b.name} className="flex flex-col bg-paper-raised p-8 md:p-10">
            <div className="flex h-16 items-center">
              <BrandMark name={b.name} logo={b.logo} size="lg" />
            </div>
            <p className="measure mt-6 text-steel">{b.text}</p>
            {b.url && (
              <a href={b.url} className="mt-6 font-medium text-accent underline-offset-4 hover:underline">
                Visit {b.name}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function BrandMark({ name, logo, size = "md" }: { name: string; logo: string; size?: "md" | "lg" }) {
  if (logo) {
    return (
      <Image
        src={logo}
        alt={name}
        width={240}
        height={80}
        className={`${size === "lg" ? "h-14" : "h-10"} w-auto max-w-full object-contain`}
      />
    );
  }
  return <span className={`display ${size === "lg" ? "text-2xl" : "text-lg"}`}>{name}</span>;
}

export function Brands() {
  return (
    <section id="brands" className="border-b border-rule">
      {/* Brands we distribute */}
      <div className="mx-auto max-w-[1180px] px-5 py-20 md:px-8 md:py-28">
        <SectionHeading title={distributedBrands.heading} intro={distributedBrands.intro} />
        <div className="space-y-12">
          {distributedBrands.categories.map((cat) => (
            <div key={cat.name} className="grid gap-5 md:grid-cols-[220px_1fr] md:gap-10">
              <h3 className="border-t border-ink pt-3 font-semibold">{cat.name}</h3>
              <ul className="grid grid-cols-2 border-l border-t border-rule sm:grid-cols-3 lg:grid-cols-4">
                {cat.brands.map((b) => {
                  const inner = <BrandMark name={b.name} logo={b.logo} />;
                  return (
                    <li key={b.name} className="flex h-28 items-center justify-center border-b border-r border-rule bg-paper-raised px-4 text-center">
                      {b.url ? (
                        <a href={b.url} target="_blank" rel="noopener noreferrer" aria-label={`${b.name} website`}>
                          {inner}
                        </a>
                      ) : (
                        inner
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Resellers() {
  return (
    <section id="resellers" className="border-b border-rule bg-paper-raised">
      <div className="mx-auto max-w-[1180px] px-5 py-20 md:px-8 md:py-28">
        <SectionHeading title={resellers.heading} intro={resellers.intro} />
        <ul className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {resellers.benefits.map((b) => (
            <li key={b.title} className="border-t border-ink pt-4">
              <h3 className="font-semibold">{b.title}</h3>
              <p className="mt-2 text-steel">{b.text}</p>
            </li>
          ))}
        </ul>
        <ResellerLink className="mt-12 inline-block rounded-sm bg-accent px-6 py-3 font-medium text-accent-ink hover:opacity-90">
          Apply to become a reseller
        </ResellerLink>
      </div>
    </section>
  );
}

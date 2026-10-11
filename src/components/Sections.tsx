import Image from "next/image";
import { about, distributedBrands, journey, ownBrands, resellers, service } from "@/content/site";
import { logoSize } from "@/lib/logo-size";
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
function PartHeading({ title, intro, wide }: { title: string; intro?: string; wide?: boolean }) {
  return (
    <div className="mb-10 md:mb-12">
      <h3 className="display text-[1.6rem] md:text-[2rem]">{title}</h3>
      {intro && <p className={`${wide ? "" : "measure "}mt-3 text-pretty text-steel`}>{intro}</p>}
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
      <ol className="space-y-6 md:space-y-8">
        {journey.milestones.map((m, i) => {
          const right = i % 2 === 1; // alternate corners: left, right, left…
          const words = (
            <>
              <p className="display text-[2.2rem] leading-none md:text-[3.2rem]">{m.year}</p>
              <h4 className="mt-2 text-[1.15rem] font-semibold md:mt-3 md:text-[1.3rem]">{m.title}</h4>
            </>
          );
          if (!m.photo) {
            return (
              <li key={`${m.year}-${m.title}`} className="border-t border-ink pt-6">
                {words}
                <p className="measure mt-2 text-steel">{m.text}</p>
              </li>
            );
          }
          return (
            <li key={`${m.year}-${m.title}`}>
              <figure className="group relative aspect-[4/3] overflow-hidden bg-ink md:aspect-[16/9]">
                <Image
                  src={m.photo}
                  alt={m.photoAlt}
                  fill
                  sizes="(min-width: 1180px) 1116px, 100vw"
                  className="object-cover grayscale transition-[filter] duration-700 group-hover:grayscale-0"
                />
                {/* Fade behind the text so white type stays readable on bright photos */}
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent md:via-transparent ${
                    right ? "md:bg-gradient-to-tl" : "md:bg-gradient-to-tr"
                  }`}
                />
                <figcaption
                  className={`absolute bottom-0 p-5 text-white md:max-w-[46%] md:p-10 ${
                    right ? "left-0 md:left-auto md:right-0 md:text-right" : "left-0"
                  }`}
                >
                  {words}
                  <p className="mt-3 hidden text-[1.05rem] leading-relaxed text-white/85 md:block">{m.text}</p>
                </figcaption>
              </figure>
              {/* On phones the paragraph sits under the photo */}
              <p className="measure mt-3 text-steel md:hidden">{m.text}</p>
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
      <PartHeading title={ownBrands.heading} intro={ownBrands.intro} wide />
      {/* Frameless: logos on a shared baseline, text beneath, no boxes */}
      <ul className="grid gap-x-14 gap-y-14 md:grid-cols-3">
        {ownBrands.items.map((b) => (
          <li key={b.name} className="flex flex-col">
            <div className="flex h-16 items-center">
              {b.url ? (
                <a
                  href={b.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${b.name} website (opens in a new tab)`}
                  className="transition-opacity hover:opacity-60"
                >
                  <BrandMark name={b.name} logo={b.logo} size="lg" />
                </a>
              ) : (
                <BrandMark name={b.name} logo={b.logo} size="lg" />
              )}
            </div>
            <p className="mt-6 text-steel">{b.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Brand logos in the distribution grid are sized by area rather than by height, so a long thin
 * wordmark and a compact badge carry the same visual weight. `scale` nudges a single logo.
 */
const LOGO_AREA = 4200; // px² each logo covers
const LOGO_MAX_W = 160;
const LOGO_MAX_H = 52;
const LOGO_BOX_H = 56; // every square or rectangular badge logo gets exactly this height

function BrandMark({
  name,
  logo,
  size = "md",
  scale = 1,
  boxed = false,
}: {
  name: string;
  logo: string;
  size?: "md" | "lg";
  scale?: number;
  boxed?: boolean;
}) {
  if (logo && size === "md") {
    const { w, h } = logoSize(logo);
    const ratio = w / h;
    let height = Math.sqrt(LOGO_AREA / ratio);
    height = boxed ? LOGO_BOX_H : Math.min(height, LOGO_MAX_H, LOGO_MAX_W / ratio) * scale;
    const width = height * ratio;
    return (
      <Image
        src={logo}
        alt={name}
        width={Math.round(width)}
        height={Math.round(height)}
        style={{ width: Math.round(width), height: Math.round(height) }}
        className="max-w-full object-contain"
      />
    );
  }
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
              {/* Logos flow in rows with the same gap between every pair, whatever each logo's width */}
              <ul className="flex flex-wrap items-center gap-x-12 gap-y-6 md:gap-x-16">
                {cat.brands.map((b) => {
                  const inner = <BrandMark name={b.name} logo={b.logo} scale={b.scale} boxed={b.boxed} />;
                  return (
                    <li key={b.name} className="flex h-20 items-center">
                      {b.url ? (
                        <a
                          href={b.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${b.name} website (opens in a new tab)`}
                          className="transition-opacity hover:opacity-60"
                        >
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

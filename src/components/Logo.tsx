import Image from "next/image";
import { company } from "@/content/site";

/** Company logo, or a typographic wordmark until the logo file is supplied. */
export function Logo({ onDark = false }: { onDark?: boolean }) {
  const src = onDark ? company.logoOnDark || company.logo : company.logo;
  if (src) {
    return (
      <Image
        src={src}
        alt={company.legalName}
        width={180}
        height={44}
        className="h-9 w-auto"
        priority={!onDark}
      />
    );
  }
  return (
    <span className="flex items-baseline gap-2 leading-none">
      <span className="display text-xl">C&amp;S</span>
      <span className={`text-sm ${onDark ? "text-panel-text" : "text-steel"}`}>
        {company.shortName}
      </span>
    </span>
  );
}

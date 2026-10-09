import Link from "next/link";
import { company } from "@/content/site";
import { Logo } from "./Logo";
import { ResellerLink } from "./ResellerLink";
import { Year } from "./Year";

const socialLabels: Record<string, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  linkedin: "LinkedIn",
};

export function Footer() {
  const socials = Object.entries(company.social).filter(([, url]) => url);
  const { address } = company;
  return (
    <footer className="bg-panel text-panel-text">
      <div className="mx-auto grid max-w-[1180px] gap-10 px-5 py-14 sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_0.8fr] md:px-8">
        <div className="space-y-4">
          <Logo onDark />
          <p className="max-w-xs text-sm">
            {company.legalName}, trading as {company.tradingAs}. {company.registration}.
          </p>
        </div>

        <address className="space-y-1 text-sm not-italic">
          <p>{address.line1}</p>
          <p>
            {address.city}, {address.country}
          </p>
          <p className="pt-3">
            <a href={`tel:${company.phone.replace(/[^\d+]/g, "")}`} className="hover:text-white">
              {company.phone}
            </a>
          </p>
          <p>
            <a href={`mailto:${company.email}`} className="hover:text-white">
              {company.email}
            </a>
          </p>
        </address>

        <ul className="space-y-1 text-sm">
          <li>
            <Link href="/news" className="hover:text-white">
              News
            </Link>
          </li>
          <li>
            <ResellerLink className="hover:text-white">Become a reseller</ResellerLink>
          </li>
          {socials.map(([k, url]) => (
            <li key={k}>
              <a href={url} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                {socialLabels[k] ?? k}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-[1180px] px-5 py-5 text-sm md:px-8">
          © <Year /> {company.legalName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

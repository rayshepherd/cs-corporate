import { company } from "@/content/site";
import { Logo } from "./Logo";
import { Year } from "./Year";

const socialLabels: Record<string, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  linkedin: "LinkedIn",
};

export function Footer() {
  const socials = Object.entries(company.social).filter(([, url]) => url);
  return (
    <footer className="bg-panel text-panel-text">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-10 px-5 py-14 md:flex-row md:justify-between md:px-8">
        <div className="space-y-3 text-white">
          <Logo onDark />
          <p className="max-w-sm text-sm text-panel-text">
            {company.legalName}, trading as {company.tradingAs}. {company.registration}.
          </p>
        </div>
        {socials.length > 0 && (
          <ul className="flex gap-6 text-sm">
            {socials.map(([k, url]) => (
              <li key={k}>
                <a href={url} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  {socialLabels[k] ?? k}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-[1180px] px-5 py-5 text-sm md:px-8">
          © <Year /> {company.legalName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

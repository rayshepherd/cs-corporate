"use client";

import { useState } from "react";
import { Logo } from "./Logo";

const links = [
  { href: "#about", label: "About" },
  { href: "#brands", label: "Brands" },
  { href: "#resellers", label: "Resellers" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-rule bg-paper/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-5 md:px-8">
        <a href="#top" aria-label="Back to top" className="text-ink">
          <Logo />
        </a>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-[0.95rem] text-steel hover:text-ink">
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => window.dispatchEvent(new CustomEvent("cs:open-reseller"))}
            className="rounded-sm bg-accent px-4 py-2 text-[0.95rem] font-medium text-accent-ink hover:opacity-90"
          >
            Become a reseller
          </a>
        </nav>

        <button
          type="button"
          className="-mr-2 p-2 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Main" className="border-t border-rule px-5 pb-5 md:hidden">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-rule py-3 text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            onClick={() => {
              setOpen(false);
              window.dispatchEvent(new CustomEvent("cs:open-reseller"));
            }}
            className="mt-4 block rounded-sm bg-accent px-4 py-3 text-center font-medium text-accent-ink"
          >
            Become a reseller
          </a>
        </nav>
      )}
    </header>
  );
}

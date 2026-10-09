"use client";

import type { ReactNode } from "react";

/** A link that scrolls to the contact section and switches the form to the reseller application. */
export function ResellerLink({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <a
      href="#contact"
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent("cs:open-reseller"))}
    >
      {children}
    </a>
  );
}

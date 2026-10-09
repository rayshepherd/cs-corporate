"use client";

import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Link to the reseller application. Goes to /#apply, which scrolls to the contact form and
 * switches it to the reseller tab — also from other pages such as /news.
 */
export function ResellerLink({
  children,
  className,
  onNavigate,
}: {
  children: ReactNode;
  className?: string;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href="/#apply"
      className={className}
      onClick={() => {
        onNavigate?.();
        // Same page: the hash may already be #apply, so tell the form directly too
        window.dispatchEvent(new CustomEvent("cs:open-reseller"));
      }}
    >
      {children}
    </Link>
  );
}

"use client";

import { useEffect, useRef } from "react";

const BUILD_YEAR = 2026;

/** Current year, corrected by the browser so the page itself can stay fully static. */
export function Year() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.textContent = String(new Date().getFullYear());
  }, []);
  return <span ref={ref}>{BUILD_YEAR}</span>;
}

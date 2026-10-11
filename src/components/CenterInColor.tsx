"use client";

import { useEffect, useRef } from "react";

/**
 * On touch screens there is no hover, so the photo crossing the middle of the screen is marked
 * active (data-active="true") and turns to colour while the visitor scrolls. Mouse users keep the
 * hover effect instead.
 */
export function CenterInColor({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = ref.current;
    if (!box || !window.matchMedia("(hover: none)").matches) return;
    const photos = Array.from(box.querySelectorAll<HTMLElement>("[data-center-color]"));
    // A one-pixel band across the middle of the viewport: whichever photo overlaps it is active
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) e.target.setAttribute("data-active", e.isIntersecting ? "true" : "false");
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );
    photos.forEach((p) => io.observe(p));
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

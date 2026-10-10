"use client";

import { useEffect, useRef } from "react";
import { hero } from "@/content/site";

/**
 * Pale black-and-white performance loop behind the hero, with live film grain on top.
 * - Muted, looping, no controls; starts only when the visitor hasn't asked for reduced motion
 *   (they see the still poster instead).
 * - Pauses while scrolled out of view to save battery.
 * Renders nothing until hero.video is set in src/content/site.ts.
 */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const video = hero.video;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const play = () => {
      if (!reduced.matches) el.play().catch(() => {});
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) play();
      else el.pause();
    });
    observer.observe(el);
    const onChange = () => (reduced.matches ? el.pause() : play());
    reduced.addEventListener("change", onChange);
    return () => {
      observer.disconnect();
      reduced.removeEventListener("change", onChange);
    };
  }, []);

  if (!video?.mp4) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <video
        ref={ref}
        tabIndex={-1}
        muted
        loop
        playsInline
        preload="metadata"
        poster={video.poster || undefined}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ opacity: video.opacity ?? 0.16 }}
      >
        <source src={video.mp4} type="video/mp4" />
        {video.webm && <source src={video.webm} type="video/webm" />}
      </video>
      {/* Film grain, drawn by the browser so it adds nothing to the video file */}
      {(video.grain ?? 0.12) > 0 && <div className="film-grain" style={{ opacity: video.grain ?? 0.12 }} />}
    </div>
  );
}

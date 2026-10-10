"use client";

import { useEffect, useRef, useState } from "react";
import { chain, chainTitle } from "@/content/site";
import { LogoMark } from "./LogoMark";

const HOLD = 1300; // ms the pulse rests on each step
const MOVE = 550; // ms to travel to the next step
const STEP = HOLD + MOVE;

const icons: Record<(typeof chain)[number]["icon"], React.ReactNode> = {
  globe: (
    <>
      <circle cx="15" cy="15" r="11" />
      <path d="M4 15h22M15 4c4 4 4 18 0 22M15 4c-4 4-4 18 0 22" />
    </>
  ),
  box: <path d="M5 11l10-5 10 5v10l-10 5-10-5z M5 11l10 5 10-5 M15 16v10" />,
  shop: <path d="M5 12h20l-2-6H7z M6 12v12h18V12 M12 24v-7h6v7" />,
  speaker: (
    <>
      <rect x="8" y="4" width="14" height="22" rx="2" />
      <circle cx="15" cy="18" r="4" />
      <circle cx="15" cy="9" r="1.6" />
    </>
  ),
};

/**
 * "How gear reaches the stage": four steps joined by a patch cable. A signal pulse travels down
 * the cable, resting on each step and lighting it. Static (Concepts & Standards lit) for visitors
 * who prefer reduced motion; paused while off-screen.
 */
export function SignalChain() {
  const usIndex = Math.max(0, chain.findIndex((c) => c.us));
  const [active, setActive] = useState(usIndex);
  const wrap = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLOListElement>(null);
  const cable = useRef<SVGPathElement>(null);
  const pulse = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const box = wrap.current, ol = list.current, path = cable.current, dot = pulse.current;
    if (!box || !ol || !path || !dot) return;
    const items = Array.from(ol.children) as HTMLElement[];
    let pts: [number, number][] = [];

    const place = (len: number) => {
      const p = path.getPointAtLength(Math.max(0, Math.min(len, path.getTotalLength())));
      dot.setAttribute("cx", String(p.x));
      dot.setAttribute("cy", String(p.y));
    };

    // Draw the cable through a "jack" just left of each step, with a gentle sway between steps
    const layout = () => {
      const b = box.getBoundingClientRect();
      pts = items.map((li) => {
        const r = li.getBoundingClientRect();
        return [r.left - b.left - 20, r.top - b.top + r.height / 2];
      });
      let d = `M${pts[0][0]} ${pts[0][1]}`;
      for (let k = 1; k < pts.length; k++) {
        const [x0, y0] = pts[k - 1];
        const [x1, y1] = pts[k];
        const sway = k % 2 ? -14 : 14;
        const my = (y0 + y1) / 2;
        d += ` C ${x0 + sway} ${my}, ${x1 + sway} ${my}, ${x1} ${y1}`;
      }
      path.setAttribute("d", d);
      dot.style.opacity = "1";
    };
    layout();
    const ro = new ResizeObserver(layout);
    ro.observe(ol);

    const segment = () => path.getTotalLength() / Math.max(1, pts.length - 1);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) {
      place(usIndex * segment());
      return () => ro.disconnect();
    }

    let raf = 0;
    let start = 0;
    let last = -1;
    const tick = (now: number) => {
      if (!start) start = now;
      const t = (now - start) % (STEP * items.length);
      const k = Math.floor(t / STEP);
      const within = t - k * STEP;
      const resting = k === items.length - 1 || within < HOLD; // last step rests until the loop restarts
      place(resting ? k * segment() : (k + (within - HOLD) / MOVE) * segment());
      const lit = resting || within < HOLD + 120 ? k : -1;
      if (lit !== last) {
        last = lit;
        setActive(lit);
      }
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf);
      if (e.isIntersecting) raf = requestAnimationFrame(tick);
    });
    io.observe(box);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, [usIndex]);

  return (
    <div className="self-center">
      <h2 className="mb-6 border border-ink bg-paper px-5 py-3 text-center text-[1.05rem] font-medium tracking-[-0.01em]">
        {chainTitle}
      </h2>
      <div ref={wrap} className="relative">
        <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
          <path ref={cable} fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 5" opacity="0.55" />
          <circle ref={pulse} r="5" fill="currentColor" style={{ opacity: 0 }} />
        </svg>
        <ol ref={list} className="grid gap-3 pl-[52px]">
          {chain.map((step, i) => {
            const on = i === active;
            return (
              <li
                key={step.title}
                className={`relative border py-3 pl-[54px] pr-4 transition-colors duration-300 ${
                  on ? "border-ink bg-ink text-paper" : "border-rule bg-paper text-ink"
                } ${step.us && !on ? "ring-2 ring-inset ring-ink" : ""}`}
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 30 30"
                  className="absolute left-[14px] top-[14px] h-[28px] w-[28px] fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:1.5]"
                >
                  {icons[step.icon]}
                </svg>
                {step.us ? (
                  <LogoMark className="h-[30px] w-auto" title={step.title} />
                ) : (
                  <p className="font-semibold">{step.title}</p>
                )}
                <p
                  className={`mt-1 text-[0.95rem] leading-snug transition-colors duration-300 ${
                    on ? "text-panel-text" : "text-steel"
                  }`}
                >
                  {step.text}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

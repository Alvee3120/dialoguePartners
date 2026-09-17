"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { ElementType, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger delay in ms — use for grids of cards revealing in sequence. */
  delay?: number;
  className?: string;
  as?: ElementType;
};

/**
 * Fades + lifts content in as it scrolls into view. Renders visible by
 * default (SSR-safe, no-JS-safe, crawler-safe) and only hides elements
 * that are still off-screen at mount — content already in the viewport
 * on load is never hidden, avoiding a flash-then-reveal.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = el.getBoundingClientRect();
    const alreadyVisible = rect.top < window.innerHeight * 0.92;
    if (!alreadyVisible) setHidden(true);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !hidden) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setHidden(false);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hidden]);

  const Component = Tag as ElementType;

  return (
    <Component
      ref={ref}
      className={`${hidden ? "reveal" : "reveal reveal-visible"} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Component>
  );
}

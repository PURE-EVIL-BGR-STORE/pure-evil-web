"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export type AnimationPhase =
  | "idle"        // before animation starts
  | "drawing"     // SVG sigil is being line-drawn
  | "revealing"   // crossfade from SVG to PNG logo + glow surge
  | "text"        // tagline and subtitle are animating in
  | "complete";   // all done, continuous effects only

interface SigilAnimationState {
  phase: AnimationPhase;
  /** Classes to apply to the SVG sigil container */
  sigilClass: string;
  /** Whether the PNG logo should be visible */
  showLogo: boolean;
  /** Whether ember particles should be active */
  embersActive: boolean;
  /** Classes for tagline reveal */
  taglineClass: string;
  /** Classes for subtitle reveal */
  subtitleClass: string;
  /** Classes for CTA row reveal */
  ctaClass: string;
  /** Classes for scroll indicator */
  scrollClass: string;
  /** Skip to end (for reduced motion) */
  skipToEnd: () => void;
}

/**
 * useSigilAnimation — orchestrates the entire hero entrance sequence.
 *
 * Timeline:
 *  0.0s → Start SVG line-draw (phase: "drawing")
 *  3.0s → SVG complete, crossfade to PNG (phase: "revealing")
 *  3.8s → Embers ignite
 *  4.2s → Tagline reveals (phase: "text")
 *  5.0s → Subtitle fades in
 *  5.5s → CTAs slide up
 *  6.0s → Scroll indicator appears (phase: "complete")
 */
export function useSigilAnimation(): SigilAnimationState {
  const [phase, setPhase] = useState<AnimationPhase>("drawing");
  const [showLogo, setShowLogo] = useState(false);
  const [embersActive, setEmbersActive] = useState(false);
  const [showTagline, setShowTagline] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showCta, setShowCta] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const skipToEnd = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setPhase("complete");
    setShowLogo(true);
    setEmbersActive(true);
    setShowTagline(true);
    setShowSubtitle(true);
    setShowCta(true);
    setShowScroll(true);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = setTimeout(() => {
        skipToEnd();
      }, 0);
      timersRef.current.push(id);
      return;
    }

    const addTimer = (fn: () => void, delay: number) => {
      const id = setTimeout(fn, delay);
      timersRef.current.push(id);
    };

    // SVG drawing is active initially (0.0s)
    
    // 0.6s — SVG drawing complete, crossfade to PNG
    addTimer(() => {
      setPhase("revealing");
      setShowLogo(true);
    }, 600);

    // 0.8s — Embers ignite, brand name and description reveal
    addTimer(() => {
      setEmbersActive(true);
      setPhase("text");
      setShowTagline(true);
      setShowSubtitle(true);
      setShowCta(true);
    }, 800);

    // 1.2s — Complete phase and display scroll indicator
    addTimer(() => {
      setShowScroll(true);
      setPhase("complete");
    }, 1200);

    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, [skipToEnd]);

  // Build CSS class strings based on state
  const sigilClass = [
    "hero__sigil-wrap",
    phase === "drawing" && "is-drawing",
    phase === "revealing" && "is-revealing",
    phase === "complete" && "is-complete",
  ]
    .filter(Boolean)
    .join(" ");

  const taglineClass = showTagline ? "hero__tagline is-visible" : "hero__tagline";
  const subtitleClass = showSubtitle ? "hero__sub is-visible" : "hero__sub";
  const ctaClass = showCta ? "hero__cta-row is-visible" : "hero__cta-row";
  const scrollClass = showScroll ? "hero__scroll is-visible" : "hero__scroll";

  return {
    phase,
    sigilClass,
    showLogo,
    embersActive,
    taglineClass,
    subtitleClass,
    ctaClass,
    scrollClass,
    skipToEnd,
  };
}

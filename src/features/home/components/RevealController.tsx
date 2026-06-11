"use client";

import { useEffect } from "react";

/**
 * Wires the design's scroll behaviours without polluting markup with logic:
 *  - reveal-on-scroll for [data-reveal]
 *  - nav shrink past 60px
 *  - gentle parallax drift for [data-drift]
 */
export function RevealController() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---- scroll reveals ---- */
    const reveals = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    let io: IntersectionObserver | undefined;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              io?.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
      );
      reveals.forEach((el) => io!.observe(el));
    } else {
      reveals.forEach((el) => el.classList.add("in"));
    }

    /* ---- nav shrink on scroll ---- */
    const nav = document.querySelector(".nav");
    const onScroll = () => {
      if (!nav) return;
      nav.classList.toggle("shrunk", window.scrollY > 60);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* ---- gentle parallax drift ---- */
    const drifters = Array.from(document.querySelectorAll<HTMLElement>("[data-drift]"));
    let ticking = false;
    const onDrift = () => {
      if (ticking || reduceMotion) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        drifters.forEach((el) => {
          const speed = parseFloat(el.getAttribute("data-drift") || "0.05") || 0.05;
          el.style.transform = `translate(-50%, calc(-50% + ${y * speed}px))`;
        });
        ticking = false;
      });
    };
    if (drifters.length && !reduceMotion) {
      window.addEventListener("scroll", onDrift, { passive: true });
    }

    return () => {
      io?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", onDrift);
    };
  }, []);

  return null;
}

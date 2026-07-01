"use client";

import { useState, useEffect, useRef } from "react";
import { Link } from "@/i18n/routing";
import { Menu, X, ShoppingBag } from "lucide-react";

export function SiteNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("navMenuToggle", { detail: { open: isMobileMenuOpen } }));
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Update scrolled state for styling
      setIsScrolled(currentScrollY > 40);

      const diff = currentScrollY - lastScrollYRef.current;

      if (currentScrollY <= 100) {
        // Always show near the top
        setIsVisible(true);
      } else if (diff > 5) {
        // Scrolling down clearly -> hide
        setIsVisible(false);
      } else if (diff < -5) {
        // Scrolling up clearly -> show
        setIsVisible(true);
      }

      lastScrollYRef.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Morphing Horizontal Navigation Bar */}
      <header
        className={`nav ${isScrolled ? "shrunk" : ""} ${isMobileMenuOpen ? "shrunk" : ""} ${(!isVisible && !isMobileMenuOpen) ? "nav-hidden" : ""}`}
        data-screen-label="nav"
      >
        <a
          className="nav__mark"
          href="/"
          aria-label="PURE EVIL home"
          onClick={(e) => {
            e.preventDefault();
            setIsMobileMenuOpen(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/PURE_EVIL_LOGO_4.png" alt="PURE EVIL emblem" />
          <span className="nav__wordmark">Pure Evil</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="nav__links">
          <Link href="/collection">Collection</Link>
          <a href="#lookbook">Lookbook</a>
          <a href="#manifesto">Manifesto</a>
        </nav>

        <div className="nav__util">
          <Link href="/login" className="nav__search">
            Sign In
          </Link>
          <a href="#cult" className="nav__cart">
            Bag <span className="nav__cart-count">(0)</span>
          </a>

          {/* Interactive Mobile Burger Trigger */}
          <button
            className="nav__burger"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X size={20} className="text-fg" />
            ) : (
              <Menu size={20} className="text-fg" />
            )}
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Drawer Menu */}
      <div
        className={`mobile-drawer ${isMobileMenuOpen ? "is-open" : ""}`}
        style={{ zIndex: 999 }}
      >
        {/* Mobile Navigation Links */}
        <nav className="flex flex-col items-center gap-8">
          <Link
            href="/collection"
            className="text-2xl font-serif uppercase tracking-[0.2em] text-fg hover:text-red transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Collection
          </Link>
          <a
            href="#lookbook"
            className="text-2xl font-serif uppercase tracking-[0.2em] text-fg hover:text-red transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Lookbook
          </a>
          <a
            href="#manifesto"
            className="text-2xl font-serif uppercase tracking-[0.2em] text-fg hover:text-red transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Manifesto
          </a>
          <Link
            href="/login"
            className="text-2xl font-serif uppercase tracking-[0.2em] text-red hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Sign In
          </Link>
          <a
            href="#cult"
            className="text-lg font-mono tracking-wider text-muted border border-fg/10 px-6 py-2 hover:border-red transition-colors flex items-center gap-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <ShoppingBag size={16} /> Bag (0)
          </a>
        </nav>
      </div>
    </>
  );
}

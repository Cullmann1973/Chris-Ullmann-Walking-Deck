"use client";

import { useState, useEffect } from "react";
import { MenuOverlay } from "./menu-overlay";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-12 h-16">
          {/* Name with styled U */}
          <a
            href="#hero"
            className="text-sm font-mono tracking-wider text-foreground hover:text-foreground/80 transition-colors uppercase"
          >
            Christopher <span className="text-primary">U</span>llmann
          </a>

          {/* Menu button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="text-sm font-mono tracking-wider text-foreground hover:text-primary transition-colors uppercase"
            aria-label="Open menu"
          >
            Menu
          </button>
        </div>
      </header>

      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}

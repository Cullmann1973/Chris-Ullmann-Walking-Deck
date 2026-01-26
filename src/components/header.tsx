"use client";

import { useState, useEffect } from "react";
import { MenuOverlay } from "./menu-overlay";

interface HeaderProps {
  currentSection?: string;
}

export function Header({ currentSection = "Home" }: HeaderProps) {
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
          {/* Section indicator */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono tracking-wider text-muted-foreground uppercase">
              {currentSection}
            </span>
          </div>

          {/* Logo / Name - center (hidden on small screens) */}
          <a
            href="#hero"
            className="hidden md:block absolute left-1/2 -translate-x-1/2 text-sm font-medium tracking-wider text-foreground hover:text-primary transition-colors"
          >
            CU
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

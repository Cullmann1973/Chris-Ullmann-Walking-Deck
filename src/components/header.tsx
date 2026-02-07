"use client";

import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
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

  const openChat = () => {
    window.dispatchEvent(new Event("open-chat-widget"));
  };

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

          {/* Right side: Ask My AI pill + Menu */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Ask My AI pill */}
            <button
              onClick={openChat}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 rounded-full
                         bg-primary/10 hover:bg-primary/20 border border-primary/30 hover:border-primary/50
                         text-primary text-xs font-mono tracking-wider uppercase
                         transition-all duration-300 hover:shadow-[0_0_12px_rgba(0,188,212,0.2)]"
              aria-label="Ask My AI"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ask My AI</span>
            </button>

            {/* Menu button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="text-sm font-mono tracking-wider text-foreground hover:text-primary transition-colors uppercase"
              aria-label="Open menu"
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}

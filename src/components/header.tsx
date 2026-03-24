"use client";

import { useEffect, useState } from "react";
import { Sparkles, Menu } from "lucide-react";
import { MenuOverlay } from "./menu-overlay";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

          {/* Right side: Inline nav (md+) + Ask My AI pill */}
          <div className="flex items-center gap-3 md:gap-6">
            {/* Inline nav links — hidden on mobile, visible on md+ */}
            <nav className="hidden md:flex items-center gap-6">
              {[
                { label: "About", href: "#about" },
                { label: "The Work", href: "#the-work" },
                { label: "Journey", href: "#stack" },
                { label: "Voices", href: "#voices" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-mono tracking-wider text-foreground hover:text-primary transition-colors uppercase"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Ask My AI pill */}
            <button
              onClick={openChat}
              className="inline-flex items-center gap-2 px-5 py-2.5 md:px-7 md:py-3 rounded-full
                         bg-cyan-500/15 hover:bg-cyan-500/25
                         border-2 border-cyan-400/60 hover:border-cyan-300
                         text-cyan-200 font-semibold text-sm tracking-wide uppercase
                         transition-all duration-300
                         shadow-[0_0_0_1px_rgba(0,188,212,0.2)] hover:shadow-[0_0_0_2px_rgba(0,188,212,0.4),_0_0_16px_rgba(0,188,212,0.2)]
                         hover:scale-[1.02] relative overflow-hidden group/ai"
              aria-label="Ask My AI"
            >
              <Sparkles className="w-4 h-4 relative z-10" />
              <span className="hidden sm:inline relative z-10">Ask My AI</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/15 to-transparent animate-[shimmer-once_3s_ease-in-out_1_forwards] group-hover/ai:animate-[shimmer-once_1s_ease-in-out_1_forwards]" />
            </button>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden inline-flex items-center justify-center w-10 h-10 text-foreground hover:text-primary transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

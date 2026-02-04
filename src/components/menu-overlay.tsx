"use client";

import { useEffect, useRef } from "react";
import { X, Mail, Linkedin } from "lucide-react";
import { gsap, ScrollTrigger } from "./gsap-provider";

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { label: "About", href: "#about" },
  { label: "The Stack", href: "#stack" },
  { label: "Beyond Work", href: "#beyond" },
  { label: "Meet My AI", href: "#ai" },
];

export function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLAnchorElement[]>([]);

  useEffect(() => {
    if (!overlayRef.current) return;

    if (isOpen) {
      // Animate in
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );

      // Animate menu items
      gsap.fromTo(
        itemsRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.2,
        }
      );
    }
  }, [isOpen]);

  const handleClose = () => {
    if (!overlayRef.current) {
      onClose();
      return;
    }

    // Animate out
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
      onComplete: onClose,
    });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    handleClose();

    // Wait for menu to close, then scroll
    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) {
        // Use native scroll for smooth behavior
        target.scrollIntoView({ behavior: "smooth" });
        // Refresh ScrollTrigger after scroll
        setTimeout(() => ScrollTrigger.refresh(), 100);
      }
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 glass-overlay flex flex-col"
      style={{ opacity: 0 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 md:px-12 h-16">
        <span className="text-xs font-mono tracking-wider text-muted-foreground uppercase">
          Navigation
        </span>
        <button
          onClick={handleClose}
          className="flex items-center gap-2 text-sm font-mono tracking-wider text-foreground hover:text-primary transition-colors uppercase"
          aria-label="Close menu"
        >
          Close
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Menu content */}
      <div className="flex-1 flex flex-col justify-center items-center px-6">
        <nav className="flex flex-col items-center gap-4 md:gap-6">
          {menuItems.map((item, index) => (
            <a
              key={item.href}
              ref={(el) => {
                if (el) itemsRef.current[index] = el;
              }}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-4xl md:text-6xl lg:text-7xl font-serif text-foreground hover:text-primary transition-all duration-300 hover:translate-x-2"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="px-6 md:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-sm text-muted-foreground">
          <span className="font-serif text-lg text-foreground">Christopher Ullmann</span>
          <br />
          Strategy & Transformation Leader
        </div>

        <div className="flex items-center gap-4">
          <a
            href="mailto:c.ullmann@yahoo.com"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <Mail className="w-4 h-4" />
            Email
          </a>
          <a
            href="https://www.linkedin.com/in/chrisullmann/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}

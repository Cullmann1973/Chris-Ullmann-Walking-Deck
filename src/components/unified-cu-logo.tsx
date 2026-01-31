"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "./gsap-provider";

export function UnifiedCULogo() {
  const logoRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const logo = logoRef.current;
    if (!logo) return;

    // Wait for layout to settle
    const initTimeout = setTimeout(() => {
      setIsReady(true);
    }, 50);

    return () => clearTimeout(initTimeout);
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const logo = logoRef.current;
    if (!logo) return;

    const ctx = gsap.context(() => {
      // ========================================
      // INITIAL STATE: Upper-center on screen, large
      // ========================================
      gsap.set(logo, {
        opacity: 0,
        scale: 0.95,
        xPercent: -50,
        yPercent: -50,
        left: "50%",
        top: "38%",
      });

      gsap.set(".unified-letter-c", { opacity: 0, scale: 0.95 });
      gsap.set(".unified-letter-u", { opacity: 0, scale: 0.95 });

      // ========================================
      // INTRO ANIMATION: Letters construct
      // ========================================
      const introTL = gsap.timeline();

      // Container fades in
      introTL.to(logo, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
      }, 0.2);

      // C constructs
      introTL.to(".unified-letter-c", {
        opacity: 1,
        scale: 1,
        duration: 1.8,
        ease: "power3.out",
      }, 0.2);

      // U constructs (overlapping)
      introTL.to(".unified-letter-u", {
        opacity: 1,
        scale: 1,
        duration: 1.8,
        ease: "power3.out",
      }, 1.5);

      // ========================================
      // SCROLL ANIMATION: Center → Left + Scale down
      // ========================================
      ScrollTrigger.create({
        trigger: "#hero",
        start: "top top",
        end: "+=200%",
        scrub: 2,
        onUpdate: (self) => {
          const progress = self.progress;

          // Scale: 1 → 0.55 (matching final size)
          const startScale = 1;
          const endScale = 0.55;
          const currentScale = startScale - progress * (startScale - endScale);

          // Position: center → left edge
          // Start: left 50%, xPercent -50 (centered)
          // End: left 32px, xPercent 0 (left-anchored)
          const startLeft = 50; // percent
          const endLeft = 2; // percent (roughly 32px on most screens)
          const currentLeft = startLeft - progress * (startLeft - endLeft);

          const startXPercent = -50;
          const endXPercent = 0;
          const currentXPercent = startXPercent - progress * (startXPercent - endXPercent);

          // Top stays at 50% (vertically centered)
          gsap.set(logo, {
            scale: currentScale,
            left: `${currentLeft}%`,
            xPercent: currentXPercent,
          });
        },
      });

      // ========================================
      // BEYOND SECTION: Fade out to avoid overlap
      // ========================================
      ScrollTrigger.create({
        trigger: "#beyond",
        start: "top 60%",
        end: "bottom 40%",
        onEnter: () => {
          gsap.to(logo, { opacity: 0, duration: 0.5, ease: "power2.in" });
        },
        onLeave: () => {
          gsap.to(logo, { opacity: 1, duration: 0.5, ease: "power2.out" });
        },
        onEnterBack: () => {
          gsap.to(logo, { opacity: 0, duration: 0.5, ease: "power2.in" });
        },
        onLeaveBack: () => {
          gsap.to(logo, { opacity: 1, duration: 0.5, ease: "power2.out" });
        },
      });
    });

    return () => ctx.revert();
  }, [isReady]);

  return (
    <div
      ref={logoRef}
      className="fixed z-50 pointer-events-none"
      style={{
        top: "38%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="flex items-end">
        <span
          className="unified-letter-c font-serif text-foreground leading-none select-none"
          style={{ fontSize: "clamp(110px, 24.2vh, 198px)" }}
        >
          C
        </span>
        <span
          className="unified-letter-u font-serif text-primary leading-none select-none"
          style={{ fontSize: "clamp(110px, 24.2vh, 198px)" }}
        >
          U
        </span>
      </div>
    </div>
  );
}

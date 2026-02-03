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
        top: "33%",
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
      // SCROLL ANIMATION: Center → Header position
      // Desktop: stays centered
      // Mobile: moves to RIGHT to avoid overlapping name
      // ========================================
      ScrollTrigger.create({
        trigger: "#hero",
        start: "top top",
        end: "+=100%",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const isMobile = window.innerWidth < 768;

          // Scale: 1 → 0.2 (shrink to fit in header)
          const startScale = 1;
          const endScale = 0.2;
          const currentScale = startScale - progress * (startScale - endScale);

          // Horizontal position
          const startLeft = 50;
          // On mobile: end at 85% (right side), on desktop: stay centered at 50%
          const endLeft = isMobile ? 85 : 50;
          const currentLeft = startLeft + progress * (endLeft - startLeft);

          // xPercent: -50 (centered on position)
          const currentXPercent = -50;

          // Vertical: 33% → 4% (center in header bar)
          const startTop = 33;
          const endTop = 4;
          const currentTop = startTop - progress * (startTop - endTop);

          gsap.set(logo, {
            scale: currentScale,
            left: `${currentLeft}%`,
            top: `${currentTop}%`,
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
        top: "33%",
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

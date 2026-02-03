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
      // SCROLL ANIMATION: Center → Header LEFT, small, STAY FIXED
      // Uses GSAP's x/y for reliable animation
      // ========================================
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      
      // Calculate the X offset needed to move from center to left
      // Start: centered at 50% with xPercent=-50 (visually centered)
      // End: small logo pinned 24px from left edge
      // At scale 0.18, logo is ~40px wide, so center of scaled logo should be at ~44px
      const startCenterX = vw / 2;
      const endCenterX = 44;
      const totalXOffset = endCenterX - startCenterX; // negative, moves left
      
      const startCenterY = vh * 0.33;
      const endCenterY = 24;
      const totalYOffset = endCenterY - startCenterY; // negative, moves up

      ScrollTrigger.create({
        trigger: "#hero",
        start: "top top",
        end: "+=100%",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          // Scale: 1 → 0.18
          const currentScale = 1 - progress * (1 - 0.18);

          // Move using x/y offsets (more reliable than changing left/top)
          const currentX = progress * totalXOffset;
          const currentY = progress * totalYOffset;

          gsap.set(logo, {
            scale: currentScale,
            x: currentX,
            y: currentY,
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

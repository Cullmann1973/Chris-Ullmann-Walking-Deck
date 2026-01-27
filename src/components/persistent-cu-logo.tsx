"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "./gsap-provider";

export function PersistentCULogo() {
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const logo = logoRef.current;
    if (!logo) return;

    // Start hidden
    gsap.set(logo, { opacity: 0 });

    // Create ScrollTrigger to show logo after hero section scrolls away
    // The hero section is pinned, so we check when it's scrolled past
    const heroTrigger = ScrollTrigger.create({
      trigger: "#hero",
      start: "top top",
      end: "+=200%", // Match hero pin duration
      onLeave: () => {
        gsap.to(logo, { opacity: 1, duration: 0.5, ease: "power2.out" });
      },
      onEnterBack: () => {
        gsap.to(logo, { opacity: 0, duration: 0.3, ease: "power2.in" });
      },
    });

    // Fade out CU during Beyond Work section to avoid overlap with content
    const beyondTrigger = ScrollTrigger.create({
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

    return () => {
      heroTrigger.kill();
      beyondTrigger.kill();
    };
  }, []);

  return (
    <div
      ref={logoRef}
      className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 z-40 opacity-0 pointer-events-none"
      style={{ mixBlendMode: "difference" }}
    >
      <span className="text-[60px] md:text-[80px] lg:text-[100px] font-serif text-white leading-none">
        C
      </span>
      <span className="text-[60px] md:text-[80px] lg:text-[100px] font-serif text-primary leading-none">
        U
      </span>
    </div>
  );
}

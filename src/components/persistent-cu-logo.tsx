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

    // Seamless handoff: Fade in as hero CU reaches this position
    // Hero CU starts fading at 85% progress, so we fade in starting at 85%
    const heroTrigger = ScrollTrigger.create({
      trigger: "#hero",
      start: "top top",
      end: "+=200%", // Match hero pin duration
      onUpdate: (self) => {
        const progress = self.progress;
        // Start fading in at 85% progress, fully visible by 100%
        if (progress >= 0.85) {
          const fadeProgress = (progress - 0.85) / 0.15; // 0 to 1 over last 15%
          gsap.set(logo, { opacity: fadeProgress });
        } else {
          gsap.set(logo, { opacity: 0 });
        }
      },
      onLeave: () => {
        // Ensure fully visible when hero section is completely scrolled past
        gsap.to(logo, { opacity: 1, duration: 0.2, ease: "power2.out" });
      },
      onEnterBack: () => {
        // Will be controlled by onUpdate when scrolling back
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

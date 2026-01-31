"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "../gsap-provider";

// Transformation metrics for the ticker
const metrics = [
  { value: "$16M → $200K", label: "inventory turnaround" },
  { value: "12 → 2.7 days", label: "cycle time reduction" },
  { value: "170% ROI", label: "$49M initiative" },
  { value: "1,000+ trained", label: "AI enablement" },
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentMetric, setCurrentMetric] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // ========================================
      // INITIAL STATES - Everything hidden
      // CU letters are now handled by UnifiedCULogo
      // ========================================
      gsap.set(".tagline-line-1", { opacity: 0, y: 20 });
      gsap.set(".tagline-strategy", { opacity: 0 });
      gsap.set(".tagline-or", { opacity: 0 });
      gsap.set(".tagline-operations", { opacity: 0 });
      gsap.set(".tagline-period", { opacity: 0 });
      gsap.set(".tagline-resolution", { opacity: 0, y: 20 });
      gsap.set(".metrics-ticker", { opacity: 0, y: 15 });
      gsap.set(".scroll-indicator", { opacity: 0 });

      // ========================================
      // MASTER TIMELINE
      // CU animation timing handled by UnifiedCULogo
      // ========================================
      const introTL = gsap.timeline({
        onComplete: () => setAnimationComplete(true),
      });

      // ----------------------------------------
      // PHASE 1: Tagline with Tension
      // Starts after CU letters are visible (~3s)
      // ----------------------------------------
      // "Most leaders speak" fades in
      introTL.to(
        ".tagline-line-1",
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
        },
        3.2
      );

      // "strategy" - varied photographer flashes over ~2 secs then stays on
      introTL.to(".tagline-strategy", { opacity: 1, duration: 0.03 }, 3.5);
      introTL.to(".tagline-strategy", { opacity: 0, duration: 0.05 }, 3.53);
      introTL.to(".tagline-strategy", { opacity: 1, duration: 0.02 }, 3.7);
      introTL.to(".tagline-strategy", { opacity: 0, duration: 0.08 }, 3.72);
      introTL.to(".tagline-strategy", { opacity: 1, duration: 0.04 }, 3.95);
      introTL.to(".tagline-strategy", { opacity: 0, duration: 0.03 }, 3.99);
      introTL.to(".tagline-strategy", { opacity: 1, duration: 0.02 }, 4.15);
      introTL.to(".tagline-strategy", { opacity: 0, duration: 0.06 }, 4.17);
      introTL.to(".tagline-strategy", { opacity: 1, duration: 0.03 }, 4.35);
      introTL.to(".tagline-strategy", { opacity: 0, duration: 0.04 }, 4.38);
      introTL.to(".tagline-strategy", { opacity: 1, duration: 0.02 }, 4.55);
      introTL.to(".tagline-strategy", { opacity: 0, duration: 0.03 }, 4.57);
      introTL.to(".tagline-strategy", { opacity: 1, duration: 0.05 }, 4.7);
      introTL.to(".tagline-strategy", { opacity: 0, duration: 0.02 }, 4.75);
      introTL.to(".tagline-strategy", { opacity: 1, duration: 0.03 }, 4.9);
      introTL.to(".tagline-strategy", { opacity: 0, duration: 0.04 }, 4.93);
      introTL.to(".tagline-strategy", { opacity: 1, duration: 0.08 }, 5.1); // stays on

      // "operations" - starts 0.5s after strategy, varied flashes over ~2 secs
      introTL.to(".tagline-operations", { opacity: 1, duration: 0.02 }, 4.0);
      introTL.to(".tagline-operations", { opacity: 0, duration: 0.06 }, 4.02);
      introTL.to(".tagline-operations", { opacity: 1, duration: 0.04 }, 4.2);
      introTL.to(".tagline-operations", { opacity: 0, duration: 0.03 }, 4.24);
      introTL.to(".tagline-operations", { opacity: 1, duration: 0.02 }, 4.4);
      introTL.to(".tagline-operations", { opacity: 0, duration: 0.07 }, 4.42);
      introTL.to(".tagline-operations", { opacity: 1, duration: 0.03 }, 4.65);
      introTL.to(".tagline-operations", { opacity: 0, duration: 0.04 }, 4.68);
      introTL.to(".tagline-operations", { opacity: 1, duration: 0.05 }, 4.85);
      introTL.to(".tagline-operations", { opacity: 0, duration: 0.02 }, 4.9);
      introTL.to(".tagline-operations", { opacity: 1, duration: 0.03 }, 5.1);
      introTL.to(".tagline-operations", { opacity: 0, duration: 0.05 }, 5.13);
      introTL.to(".tagline-operations", { opacity: 1, duration: 0.02 }, 5.3);
      introTL.to(".tagline-operations", { opacity: 0, duration: 0.04 }, 5.32);
      introTL.to(".tagline-operations", { opacity: 1, duration: 0.03 }, 5.5);
      introTL.to(".tagline-operations", { opacity: 0, duration: 0.03 }, 5.53);
      introTL.to(".tagline-operations", { opacity: 1, duration: 0.08 }, 5.7); // stays on

      // "or" appears after both words are lit
      introTL.to(
        ".tagline-or",
        {
          opacity: 1,
          duration: 0.2,
          ease: "power2.out",
        },
        5.3
      );

      // Period appears
      introTL.to(
        ".tagline-period",
        {
          opacity: 1,
          duration: 0.2,
          ease: "power2.out",
        },
        5.8
      );

      // ----------------------------------------
      // PHASE 4: Resolution
      // ----------------------------------------
      // "I translate between both" fades in
      introTL.to(
        ".tagline-resolution",
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
        },
        6.0
      );

      // Ensure words stay solid (flash effect already set them to 1)
      introTL.to(
        ".tagline-strategy",
        {
          opacity: 1,
          duration: 0.1,
          ease: "power2.out",
        },
        6.1
      );
      introTL.to(
        ".tagline-operations",
        {
          opacity: 1,
          duration: 0.1,
          ease: "power2.out",
        },
        6.1
      );

      // ----------------------------------------
      // PHASE 5: Ticker & Scroll Indicator
      // ----------------------------------------
      // Metrics ticker fades in
      introTL.to(
        ".metrics-ticker",
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        7.0
      );

      // Scroll indicator fades in
      introTL.to(
        ".scroll-indicator",
        {
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        7.5
      );

      // ========================================
      // SCROLL INDICATOR - Fade out on scroll
      // ========================================
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=100", // Fade over first 100px of scroll
        scrub: true,
        onUpdate: (self) => {
          // Fade out scroll indicator as user scrolls
          gsap.to(".scroll-indicator", {
            opacity: 1 - self.progress,
            duration: 0.1,
          });
        },
      });

      // ========================================
      // SCROLL-TRIGGERED: Fade out hero content
      // CU animation is handled by UnifiedCULogo
      // ========================================
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=200%",
        pin: true,
        scrub: 2,
        onUpdate: (self) => {
          const progress = self.progress;

          if (progress > 0) {
            // Fade out hero content as user scrolls
            gsap.to(".hero-content", {
              opacity: Math.max(0, 1 - progress * 2.5),
              y: -progress * 80,
              duration: 0.1,
            });
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Metrics ticker cycling - every 3 seconds for comfortable reading
  useEffect(() => {
    if (!animationComplete) return;

    const interval = setInterval(() => {
      setCurrentMetric((prev) => (prev + 1) % metrics.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [animationComplete]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="h-screen bg-dark relative overflow-hidden"
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="h-full flex flex-col justify-center items-center px-8 md:px-16 lg:px-24">
        {/* Spacer for CU letters (now handled by UnifiedCULogo) */}
        <div className="mb-4 md:mb-6" style={{ height: "clamp(80px, 18vh, 150px)" }} />

        {/* Hero Content - Below the letters with proper spacing */}
        <div className="hero-content text-center max-w-3xl">
          {/* Tagline */}
          <h1 className="text-[1.625rem] md:text-2xl lg:text-3xl font-serif text-foreground leading-relaxed mb-6 md:mb-12">
            <span className="tagline-line-1 block mb-2">
              Most leaders speak{" "}
              <span className="tagline-strategy text-foreground/60">
                strategy
              </span>
              <span className="tagline-or"> or </span>
              <span className="tagline-operations text-primary/80">
                operations
              </span>
              <span className="tagline-period">.</span>
            </span>
            <span className="tagline-resolution block text-primary font-medium">
              I translate between both.
            </span>
          </h1>

          {/* Metrics Ticker */}
          <div className="metrics-ticker">
            <div className="flex flex-col items-center gap-2 md:gap-3">
              <div className="flex items-baseline gap-2 md:gap-3 h-10 md:h-14 overflow-hidden">
                <span
                  className="text-lg md:text-4xl font-mono text-primary font-bold animate-fade-in"
                  key={`value-${currentMetric}`}
                  style={{ animation: "fadeSlideIn 0.5s ease-out forwards" }}
                >
                  {metrics[currentMetric].value}
                </span>
                <span 
                  className="text-xs md:text-base text-muted-foreground"
                  key={`label-${currentMetric}`}
                  style={{ animation: "fadeSlideIn 0.5s ease-out 0.1s forwards", opacity: 0 }}
                >
                  {metrics[currentMetric].label}
                </span>
              </div>
              {/* Ticker dots - tiny on mobile, inline styles to guarantee sizing */}
              <div className="flex gap-1 md:gap-2 ticker-dots">
                {metrics.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentMetric(i)}
                    className={`rounded-full transition-all duration-300 cursor-pointer ${
                      i === currentMetric ? "bg-primary" : "bg-muted-foreground/30"
                    }`}
                    style={{
                      height: '4px',
                      width: i === currentMetric ? '14px' : '4px',
                    }}
                    aria-label={`View metric ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SCROLL Indicator - Bright, visible, with animations */}
      <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="text-xs font-mono tracking-widest uppercase text-primary animate-pulse">
          Scroll
        </span>
        <div className="animate-bounce">
          <svg
            className="w-6 h-6 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>

      {/* Digital Twin Teaser - Bottom right */}
      <div className="absolute bottom-8 right-8 flex items-center gap-2 text-muted-foreground/60 hover:text-muted-foreground transition-colors">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
        </span>
        <a href="#ai" className="text-xs font-mono tracking-wide">
          AI assistant online
        </a>
      </div>
    </section>
  );
}

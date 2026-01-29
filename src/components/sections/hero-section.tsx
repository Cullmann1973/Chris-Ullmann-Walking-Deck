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
      // Both letters start in position, just invisible
      // ========================================
      gsap.set(".letter-c", { opacity: 0, scale: 0.95 });
      gsap.set(".letter-u", { opacity: 0, scale: 0.95 }); // NO y offset - stays in place
      gsap.set(".tagline-line-1", { opacity: 0, y: 20 });
      gsap.set(".tagline-strategy", { opacity: 0 });
      gsap.set(".tagline-or", { opacity: 0 });
      gsap.set(".tagline-operations", { opacity: 0 });
      gsap.set(".tagline-period", { opacity: 0 });
      gsap.set(".tagline-resolution", { opacity: 0, y: 20 });
      gsap.set(".metrics-ticker", { opacity: 0, y: 15 });
      gsap.set(".scroll-indicator", { opacity: 0 });

      // ========================================
      // MASTER TIMELINE - 25% faster (0.75x timing)
      // Original: ~18 seconds, Now: ~13.5 seconds
      // ========================================
      const introTL = gsap.timeline({
        onComplete: () => setAnimationComplete(true),
      });

      // ----------------------------------------
      // PHASE 1: "C" Construction (0-3 seconds) [was 0-4s]
      // C constructs in place - fades in and scales to full
      // ----------------------------------------
      introTL.to(
        ".letter-c",
        {
          opacity: 1,
          scale: 1,
          duration: 2.625, // was 3.5 * 0.75
          ease: "power2.out",
        },
        0.375 // was 0.5 * 0.75
      );

      // ----------------------------------------
      // PHASE 2: "U" Construction (3-6 seconds) [was 4-8s]
      // U constructs IN PLACE - same effect as C, no flying
      // ----------------------------------------
      introTL.to(
        ".letter-u",
        {
          opacity: 1,
          scale: 1,
          duration: 2.625, // was 3.5 * 0.75
          ease: "power2.out",
        },
        3 // was 4 * 0.75
      );

      // ----------------------------------------
      // PHASE 3: Tagline with Tension (6-9 seconds) [was 8-12s]
      // ----------------------------------------
      // "Most transformation leaders know" fades in
      introTL.to(
        ".tagline-line-1",
        {
          opacity: 1,
          y: 0,
          duration: 1.125, // was 1.5 * 0.75
          ease: "power2.out",
        },
        6 // was 8 * 0.75
      );

      // "strategy" appears
      introTL.to(
        ".tagline-strategy",
        {
          opacity: 0.6,
          duration: 0.75, // was 1 * 0.75
          ease: "power2.out",
        },
        6.75 // was 9 * 0.75
      );

      // "or" appears
      introTL.to(
        ".tagline-or",
        {
          opacity: 1,
          duration: 0.6, // was 0.8 * 0.75
          ease: "power2.out",
        },
        7.125 // was 9.5 * 0.75
      );

      // "operations" appears
      introTL.to(
        ".tagline-operations",
        {
          opacity: 0.6,
          duration: 0.75, // was 1 * 0.75
          ease: "power2.out",
        },
        7.5 // was 10 * 0.75
      );

      // Period appears
      introTL.to(
        ".tagline-period",
        {
          opacity: 1,
          duration: 0.375, // was 0.5 * 0.75
          ease: "power2.out",
        },
        7.875 // was 10.5 * 0.75
      );

      // Slow flicker on "strategy" (0.75 second per cycle) [was 1s]
      introTL.to(
        ".tagline-strategy",
        {
          opacity: 1,
          duration: 0.75, // was 1 * 0.75
          repeat: 2,
          yoyo: true,
          ease: "sine.inOut",
        },
        7.5 // was 10 * 0.75
      );

      // Slow flicker on "operations" (0.75 second per cycle) [was 1s]
      introTL.to(
        ".tagline-operations",
        {
          opacity: 1,
          duration: 0.75, // was 1 * 0.75
          repeat: 2,
          yoyo: true,
          ease: "sine.inOut",
        },
        7.875 // was 10.5 * 0.75
      );

      // ----------------------------------------
      // PHASE 4: Resolution (9-11.25 seconds) [was 12-15s]
      // ----------------------------------------
      // "I've built at every layer." fades in
      introTL.to(
        ".tagline-resolution",
        {
          opacity: 1,
          y: 0,
          duration: 1.125, // was 1.5 * 0.75
          ease: "power2.out",
        },
        9.375 // was 12.5 * 0.75
      );

      // Stop flickering - both words become solid white
      introTL.to(
        ".tagline-strategy",
        {
          opacity: 1,
          duration: 0.6, // was 0.8 * 0.75
          ease: "power2.out",
        },
        9.75 // was 13 * 0.75
      );
      introTL.to(
        ".tagline-operations",
        {
          opacity: 1,
          duration: 0.6, // was 0.8 * 0.75
          ease: "power2.out",
        },
        9.75 // was 13 * 0.75
      );

      // ----------------------------------------
      // PHASE 5: Ticker & Scroll Indicator (11.25-13.5 seconds) [was 15-18s]
      // ----------------------------------------
      // Metrics ticker fades in
      introTL.to(
        ".metrics-ticker",
        {
          opacity: 1,
          y: 0,
          duration: 1.125, // was 1.5 * 0.75
          ease: "power2.out",
        },
        11.25 // was 15 * 0.75
      );

      // Scroll indicator fades in
      introTL.to(
        ".scroll-indicator",
        {
          opacity: 1,
          duration: 1.125, // was 1.5 * 0.75
          ease: "power2.out",
        },
        12 // was 16 * 0.75
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
      // SCROLL-TRIGGERED: CU slides to left-center position
      // Seamless handoff to persistent CU at the end
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
            // Calculate the final scale to match persistent CU
            // Hero CU: ~180px, Persistent CU: ~100px at lg = 0.55 scale
            const finalScale = 0.55;
            const currentScale = 1 - progress * (1 - finalScale);

            // Move CU to left-center position (matching persistent CU)
            // Final position: left ~32px from edge, vertically centered
            // From center, that's about -45vw horizontally, 0 vertically
            const targetX = -45; // vw units from center

            // CU moves to left-center, staying vertically centered
            gsap.to(".letters-container", {
              scale: Math.max(finalScale, currentScale),
              x: progress * targetX + "vw",
              y: 0, // Stay vertically centered
              opacity: progress < 0.85 ? 1 : Math.max(0, 1 - (progress - 0.85) * 6.67), // Fade out in last 15%
              duration: 0.1,
            });

            // Fade out hero content faster
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

  // Metrics ticker cycling - every 2.25 seconds (was 3s * 0.75)
  useEffect(() => {
    if (!animationComplete) return;

    const interval = setInterval(() => {
      setCurrentMetric((prev) => (prev + 1) % metrics.length);
    }, 2250);

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
        {/* CU Letters - CLEAN, NO SHADOWS - 10% LARGER */}
        <div className="letters-container origin-center mb-8 md:mb-12">
          <div className="flex items-end">
            {/* Letter C - Clean, solid white - 10% larger */}
            <span
              className="letter-c font-serif text-foreground leading-none select-none"
              style={{ fontSize: "clamp(110px, 24.2vh, 198px)" }}
            >
              C
            </span>
            {/* Letter U - Clean, solid cyan - 10% larger */}
            <span
              className="letter-u font-serif text-primary leading-none select-none"
              style={{ fontSize: "clamp(110px, 24.2vh, 198px)" }}
            >
              U
            </span>
          </div>
        </div>

        {/* Hero Content - Below the letters with proper spacing */}
        <div className="hero-content text-center max-w-3xl">
          {/* Tagline */}
          <h1 className="text-lg md:text-2xl lg:text-3xl font-serif text-foreground leading-relaxed mb-8 md:mb-12">
            <span className="tagline-line-1 block mb-2">
              Most transformation leaders know{" "}
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
              I&apos;ve built at every layer.
            </span>
          </h1>

          {/* Metrics Ticker */}
          <div className="metrics-ticker">
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-baseline gap-3 h-12">
                <span
                  className="text-2xl md:text-4xl font-mono text-primary font-bold transition-all duration-500"
                  key={currentMetric}
                >
                  {metrics[currentMetric].value}
                </span>
                <span className="text-sm md:text-base text-muted-foreground transition-all duration-500">
                  {metrics[currentMetric].label}
                </span>
              </div>
              {/* Ticker dots */}
              <div className="flex gap-2 mt-2">
                {metrics.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-375 ${
                      i === currentMetric
                        ? "bg-primary w-6"
                        : "bg-muted-foreground/30 w-1.5"
                    }`}
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

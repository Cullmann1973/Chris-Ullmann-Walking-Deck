"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "../gsap-provider";
import { FOCUS_CONFIGS, parseFocusMode, type FocusMode } from "@/lib/focus-config";

// Default metrics (used if no focus prop)
const defaultMetrics = [
  { value: "$16M → $200K", label: "inventory turnaround" },
  { value: "12 → 2.7 days", label: "cycle time reduction" },
  { value: "170% ROI", label: "$49M initiative" },
  { value: "1,000+ engaged", label: "AI enablement" },
];

export function HeroSection({ focus }: { focus?: string }) {
  const focusMode = (focus as FocusMode) || "general";
  const focusConfig = FOCUS_CONFIGS[focusMode] || FOCUS_CONFIGS.general;
  const metrics = focusConfig.metrics || defaultMetrics;
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
      gsap.set(".tagline-business", { opacity: 0 });
      gsap.set(".tagline-ai", { opacity: 0 });
      gsap.set(".tagline-bridge", { opacity: 0 });
      gsap.set(".bridge-left", { x: -20, opacity: 0 });
      gsap.set(".bridge-right", { x: 20, opacity: 0 });
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

      // Flash effect styles
      const whiteFlashOn = { opacity: 1, color: "#ffffff", textShadow: "0 0 20px #fff, 0 0 40px #fff" };
      const whiteFlashOff = { opacity: 0, color: "#ffffff", textShadow: "none" };
      const whiteStayOn = { opacity: 1, color: "#ffffff", textShadow: "none" };
      
      const cyanFlashOn = { opacity: 1, color: "#00bcd4", textShadow: "0 0 20px #00bcd4, 0 0 40px #00bcd4" };
      const cyanFlashOff = { opacity: 0, color: "#00bcd4", textShadow: "none" };
      const cyanStayOn = { opacity: 1, color: "#00bcd4", textShadow: "none" };

      // "Business" - varied photographer flashes over ~2 secs
      introTL.to(".tagline-business", { ...whiteFlashOn, duration: 0.03 }, 3.5);
      introTL.to(".tagline-business", { ...whiteFlashOff, duration: 0.05 }, 3.53);
      introTL.to(".tagline-business", { ...whiteFlashOn, duration: 0.02 }, 3.7);
      introTL.to(".tagline-business", { ...whiteFlashOff, duration: 0.08 }, 3.72);
      introTL.to(".tagline-business", { ...whiteFlashOn, duration: 0.04 }, 3.95);
      introTL.to(".tagline-business", { ...whiteFlashOff, duration: 0.03 }, 3.99);
      introTL.to(".tagline-business", { ...whiteFlashOn, duration: 0.02 }, 4.15);
      introTL.to(".tagline-business", { ...whiteFlashOff, duration: 0.06 }, 4.17);
      introTL.to(".tagline-business", { ...whiteFlashOn, duration: 0.03 }, 4.35);
      introTL.to(".tagline-business", { ...whiteFlashOff, duration: 0.04 }, 4.38);
      introTL.to(".tagline-business", { ...whiteFlashOn, duration: 0.02 }, 4.55);
      introTL.to(".tagline-business", { ...whiteFlashOff, duration: 0.03 }, 4.57);
      introTL.to(".tagline-business", { ...whiteFlashOn, duration: 0.05 }, 4.7);
      introTL.to(".tagline-business", { ...whiteFlashOff, duration: 0.02 }, 4.75);
      introTL.to(".tagline-business", { ...whiteFlashOn, duration: 0.03 }, 4.9);
      introTL.to(".tagline-business", { ...whiteFlashOff, duration: 0.04 }, 4.93);
      introTL.to(".tagline-business", { ...whiteStayOn, duration: 0.08 }, 5.1);

      // "AI" - starts 0.5s after Business
      introTL.to(".tagline-ai", { ...cyanFlashOn, duration: 0.02 }, 4.0);
      introTL.to(".tagline-ai", { ...cyanFlashOff, duration: 0.06 }, 4.02);
      introTL.to(".tagline-ai", { ...cyanFlashOn, duration: 0.04 }, 4.2);
      introTL.to(".tagline-ai", { ...cyanFlashOff, duration: 0.03 }, 4.24);
      introTL.to(".tagline-ai", { ...cyanFlashOn, duration: 0.02 }, 4.4);
      introTL.to(".tagline-ai", { ...cyanFlashOff, duration: 0.07 }, 4.42);
      introTL.to(".tagline-ai", { ...cyanFlashOn, duration: 0.03 }, 4.65);
      introTL.to(".tagline-ai", { ...cyanFlashOff, duration: 0.04 }, 4.68);
      introTL.to(".tagline-ai", { ...cyanFlashOn, duration: 0.05 }, 4.85);
      introTL.to(".tagline-ai", { ...cyanFlashOff, duration: 0.02 }, 4.9);
      introTL.to(".tagline-ai", { ...cyanFlashOn, duration: 0.03 }, 5.1);
      introTL.to(".tagline-ai", { ...cyanFlashOff, duration: 0.05 }, 5.13);
      introTL.to(".tagline-ai", { ...cyanFlashOn, duration: 0.02 }, 5.3);
      introTL.to(".tagline-ai", { ...cyanFlashOff, duration: 0.04 }, 5.32);
      introTL.to(".tagline-ai", { ...cyanFlashOn, duration: 0.03 }, 5.5);
      introTL.to(".tagline-ai", { ...cyanFlashOff, duration: 0.03 }, 5.53);
      introTL.to(".tagline-ai", { ...cyanStayOn, duration: 0.08 }, 5.7);

      // "bridge" - bridge construction animation (two sides meet in middle)
      // Make container visible first
      introTL.to(".tagline-bridge", { opacity: 1, duration: 0.01 }, 6.2);
      
      // Left side (BRI) slides in from left with glow
      introTL.to(".bridge-left", { 
        x: 0, 
        opacity: 1, 
        duration: 0.5, 
        ease: "power2.out",
        textShadow: "0 0 10px #00bcd4"
      }, 6.2);
      
      // Right side (DGE) slides in from right with glow
      introTL.to(".bridge-right", { 
        x: 0, 
        opacity: 1, 
        duration: 0.5, 
        ease: "power2.out",
        textShadow: "0 0 10px #00bcd4"
      }, 6.2);
      
      // Connection flash when they meet - bright glow pulse
      introTL.to(".tagline-bridge", { 
        textShadow: "0 0 30px #00bcd4, 0 0 60px #00bcd4",
        duration: 0.15,
        ease: "power2.in"
      }, 6.7);
      
      // Settle to subtle glow
      introTL.to(".tagline-bridge", { 
        textShadow: "none",
        duration: 0.4,
        ease: "power2.out"
      }, 6.85);
      
      // Remove individual glows
      introTL.to([".bridge-left", ".bridge-right"], {
        textShadow: "none",
        duration: 0.3
      }, 6.85);

      // ----------------------------------------
      // PHASE 4: Resolution
      // ----------------------------------------
      // "I translate between both" fades in
      // "I'm the bridge between" line fades in (bridge flashes separately)
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
        7.8
      );

      // Scroll indicator fades in
      introTL.to(
        ".scroll-indicator",
        {
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        8.3
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
        end: "+=150%",
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
          <h1 className="text-[1.625rem] md:text-2xl lg:text-3xl font-serif text-foreground/80 leading-relaxed mb-6 md:mb-12">
            <span className="tagline-line-1 block mb-2">
              <span className="tagline-business text-foreground">Business</span>{" "}
              challenges.{" "}
              <span className="tagline-ai text-primary">AI</span>{" "}
              possibilities.
            </span>
            <span className="tagline-resolution block text-foreground/80 font-medium">
              {focusMode === "general" ? (
                <>
                  I&apos;m the{" "}
                  <span className="tagline-bridge text-primary inline-flex">
                    <span className="bridge-left">BRI</span>
                    <span className="bridge-right">DGE</span>
                  </span>{" "}
                  between.
                </>
              ) : (
                <>
                  I&apos;m the{" "}
                  <span className="tagline-bridge text-primary inline-flex">
                    <span className="bridge-left">BRI</span>
                    <span className="bridge-right">DGE</span>
                  </span>{" "}
                  {focusConfig.heroResolution.replace("I'm the BRIDGE ", "")}
                </>
              )}
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
      <div className="scroll-indicator absolute bottom-20 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
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

      {/* Meet My AI trigger moved to ChatWidget (floating, always visible) */}
    </section>
  );
}

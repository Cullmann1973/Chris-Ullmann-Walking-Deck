"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "../gsap-provider";
import { FOCUS_CONFIGS, type FocusMode } from "@/lib/focus-config";

// Default metrics (used if no focus prop)
const defaultMetrics = [
  { value: "1,000+", label: "people activated on AI" },
  { value: "100+", label: "AI Community of Practice members" },
  { value: "37x", label: "growth in active AI users" },
  { value: "8", label: "global plants transformed" },
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
      gsap.set(".tagline-line", { opacity: 0, y: 20 });
      gsap.set(".tagline-flash-strategy", { opacity: 0 });
      gsap.set(".tagline-flash-execution", { opacity: 0 });
      gsap.set(".tagline-flash-ai", { opacity: 0 });
      gsap.set(".metrics-ticker", { opacity: 0, y: 15 });
      gsap.set(".scroll-indicator", { opacity: 0 });

      // ========================================
      // MASTER TIMELINE
      // CU animation timing handled by UnifiedCULogo
      // ========================================
      const introTL = gsap.timeline({
        onComplete: () => setAnimationComplete(true),
      });

      // Staggered three-line tagline reveal
      introTL.to(
        ".tagline-line-1",
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
        },
        2.3
      );

      const cyanFlashOn = {
        opacity: 1,
        color: "#00bcd4",
        textShadow: "0 0 20px #00bcd4, 0 0 40px #00bcd4",
      };
      const cyanFlashOff = { opacity: 0, color: "#00bcd4", textShadow: "none" };
      const cyanStayOn = { opacity: 1, color: "#00bcd4", textShadow: "none" };

      introTL.to(".tagline-flash-strategy", { ...cyanFlashOn, duration: 0.03 }, 2.6);
      introTL.to(".tagline-flash-strategy", { ...cyanFlashOff, duration: 0.05 }, 2.63);
      introTL.to(".tagline-flash-strategy", { ...cyanFlashOn, duration: 0.02 }, 2.8);
      introTL.to(".tagline-flash-strategy", { ...cyanFlashOff, duration: 0.07 }, 2.82);
      introTL.to(".tagline-flash-strategy", { ...cyanFlashOn, duration: 0.03 }, 3.0);
      introTL.to(".tagline-flash-strategy", { ...cyanFlashOff, duration: 0.04 }, 3.03);
      introTL.to(".tagline-flash-strategy", { ...cyanFlashOn, duration: 0.02 }, 3.2);
      introTL.to(".tagline-flash-strategy", { ...cyanFlashOff, duration: 0.05 }, 3.22);
      introTL.to(".tagline-flash-strategy", { ...cyanFlashOn, duration: 0.03 }, 3.4);
      introTL.to(".tagline-flash-strategy", { ...cyanFlashOff, duration: 0.04 }, 3.43);
      introTL.to(".tagline-flash-strategy", { ...cyanFlashOn, duration: 0.02 }, 3.6);
      introTL.to(".tagline-flash-strategy", { ...cyanFlashOff, duration: 0.03 }, 3.62);
      introTL.to(".tagline-flash-strategy", { ...cyanStayOn, duration: 0.08 }, 3.8);

      introTL.to(
        ".tagline-line-2",
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
        },
        2.75
      );

      introTL.to(".tagline-flash-execution", { ...cyanFlashOn, duration: 0.02 }, 3.3);
      introTL.to(".tagline-flash-execution", { ...cyanFlashOff, duration: 0.05 }, 3.32);
      introTL.to(".tagline-flash-execution", { ...cyanFlashOn, duration: 0.03 }, 3.5);
      introTL.to(".tagline-flash-execution", { ...cyanFlashOff, duration: 0.04 }, 3.53);
      introTL.to(".tagline-flash-execution", { ...cyanFlashOn, duration: 0.02 }, 3.7);
      introTL.to(".tagline-flash-execution", { ...cyanFlashOff, duration: 0.06 }, 3.72);
      introTL.to(".tagline-flash-execution", { ...cyanFlashOn, duration: 0.03 }, 3.95);
      introTL.to(".tagline-flash-execution", { ...cyanFlashOff, duration: 0.04 }, 3.98);
      introTL.to(".tagline-flash-execution", { ...cyanFlashOn, duration: 0.02 }, 4.15);
      introTL.to(".tagline-flash-execution", { ...cyanFlashOff, duration: 0.03 }, 4.17);
      introTL.to(".tagline-flash-execution", { ...cyanStayOn, duration: 0.08 }, 4.4);

      introTL.to(".tagline-flash-ai", { ...cyanFlashOn, duration: 0.02 }, 3.8);
      introTL.to(".tagline-flash-ai", { ...cyanFlashOff, duration: 0.05 }, 3.82);
      introTL.to(".tagline-flash-ai", { ...cyanFlashOn, duration: 0.03 }, 4.0);
      introTL.to(".tagline-flash-ai", { ...cyanFlashOff, duration: 0.04 }, 4.03);
      introTL.to(".tagline-flash-ai", { ...cyanFlashOn, duration: 0.02 }, 4.2);
      introTL.to(".tagline-flash-ai", { ...cyanFlashOff, duration: 0.06 }, 4.22);
      introTL.to(".tagline-flash-ai", { ...cyanFlashOn, duration: 0.03 }, 4.45);
      introTL.to(".tagline-flash-ai", { ...cyanFlashOff, duration: 0.04 }, 4.48);
      introTL.to(".tagline-flash-ai", { ...cyanFlashOn, duration: 0.02 }, 4.65);
      introTL.to(".tagline-flash-ai", { ...cyanFlashOff, duration: 0.03 }, 4.67);
      introTL.to(".tagline-flash-ai", { ...cyanStayOn, duration: 0.08 }, 4.8);

      introTL.to(
        ".tagline-line-3",
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
        },
        3.2
      );

      // Metrics ticker fades in
      introTL.to(
        ".metrics-ticker",
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
        },
        5.0
      );

      // Scroll indicator fades in
      introTL.to(
        ".scroll-indicator",
        {
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
        },
        5.3
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
        end: "+=80%",
        pin: true,
        scrub: 1.5,
        onUpdate: (self) => {
          const progress = self.progress;

          if (progress > 0) {
            // Fade out hero content as user scrolls
            gsap.to(".hero-content", {
              opacity: Math.max(0, 1 - progress * 2.5),
              y: -progress * 60,
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
  }, [animationComplete, metrics.length]);

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
        <div className="mb-4 md:mb-6" style={{ height: "clamp(120px, 25vh, 200px)" }} />

        {/* Hero Content - Below the letters with proper spacing */}
        <div className="hero-content text-center max-w-3xl">
          {/* Tagline */}
          <h1 className="text-[1.625rem] md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-serif text-foreground/80 leading-relaxed mb-6 md:mb-12">
            <span className="tagline-line tagline-line-1 block mb-2">
              People Drive <span className="tagline-flash-strategy">Transformation.</span>
            </span>
            <span className="tagline-line tagline-line-2 block mb-2">
              AI <span className="tagline-flash-execution">Accelerates</span> It.
            </span>
            <span className="tagline-line tagline-line-3 block mb-2">
              Culture Makes It <span className="tagline-flash-ai">Last.</span>
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
                  className="text-xs md:text-base text-[#ced4da]"
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
                      height: '8px',
                      width: i === currentMetric ? '20px' : '8px',
                      padding: '0',
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

"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../gsap-provider";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Set initial state - C visible, U hidden (will reveal on scroll)
      gsap.set(".letter-c", { opacity: 1, y: 0 });
      gsap.set(".letter-u", { clipPath: "inset(100% 0 0 0)" });

      // Timeline for the hero animation tied to scroll
      // Longer scroll distance for more gradual animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%",
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Phase 1: Reveal the U (draw up from bottom) - 0% to 25%
      tl.to(".letter-u", {
        clipPath: "inset(0% 0 0 0)",
        duration: 0.25,
        ease: "none",
      });

      // Small pause to appreciate the full CU
      tl.to({}, { duration: 0.1 });

      // Phase 2: Shrink both letters and move to top-left corner - stays visible like marchanslin
      tl.to(
        ".initials-container",
        {
          scale: 0.08,
          x: "-42vw",
          y: "-42vh",
          duration: 0.3,
          ease: "none",
        }
      );

      // Headline animation - fade in after CU shrinks (at 50%), out at 85%
      tl.fromTo(
        ".hero-headline",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.15, ease: "none" },
        0.5
      );
      tl.to(
        ".hero-headline",
        { opacity: 0, y: -20, duration: 0.1, ease: "none" },
        0.85
      );

      // Subtitle animation - slightly after headline
      tl.fromTo(
        ".hero-subtitle",
        { opacity: 0 },
        { opacity: 1, duration: 0.1, ease: "none" },
        0.55
      );
      tl.to(
        ".hero-subtitle",
        { opacity: 0, duration: 0.1, ease: "none" },
        0.85
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="h-screen bg-dark relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div
        ref={containerRef}
        className="h-full flex flex-col justify-center px-8 md:px-16 lg:px-24"
      >
        {/* CU Initials - LEFT aligned like marchanslin */}
        <div className="initials-container origin-top-left">
          <div className="flex items-end gap-0">
            <span className="letter-c initials text-[35vh] md:text-[45vh] lg:text-[55vh] text-foreground leading-none">
              C
            </span>
            <span className="letter-u initials text-[35vh] md:text-[45vh] lg:text-[55vh] text-primary leading-none">
              U
            </span>
          </div>
        </div>

        {/* Headline - appears during scroll */}
        <h1 className="hero-headline absolute bottom-32 left-8 md:left-16 lg:left-24 right-8 max-w-3xl text-2xl md:text-3xl lg:text-4xl font-serif text-foreground leading-snug opacity-0">
          Most transformation leaders know{" "}
          <span className="text-muted-foreground">strategy</span> or{" "}
          <span className="text-muted-foreground">operations</span>.
          <br />
          <span className="text-primary">I&apos;ve built at every layer.</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle absolute bottom-16 left-8 md:left-16 lg:left-24 text-sm md:text-base text-muted-foreground opacity-0">
          Christopher Ullmann
          <span className="mx-3 text-border">|</span>
          Executive Director, AI Transformation
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2 text-muted-foreground">
        <span className="text-xs font-mono tracking-wider uppercase">Scroll</span>
        <svg
          className="w-4 h-4 animate-bounce"
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
    </section>
  );
}

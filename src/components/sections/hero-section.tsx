"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../gsap-provider";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const initialsRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !initialsRef.current) return;

    const ctx = gsap.context(() => {
      // Set initials visible immediately
      gsap.set(".initials-letter", { y: 0, opacity: 1 });

      // Gentle entrance animation for initials (scale up slightly)
      gsap.fromTo(
        ".initials-letter",
        { scale: 0.9 },
        {
          scale: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power2.out",
        }
      );

      // Headline animation
      gsap.fromTo(
        headlineRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          delay: 0.4,
        }
      );

      // Subtitle animation
      gsap.fromTo(
        subtitleRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.7,
        }
      );

      // Scroll-triggered parallax for initials (fade out as you scroll)
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set(".initials-letter", {
            y: -100 * progress,
            opacity: 1 - progress * 0.8,
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="section-full bg-dark relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="section-padding flex flex-col items-center justify-center min-h-screen">
        {/* CU Initials */}
        <div
          ref={initialsRef}
          className="flex items-center justify-center gap-2 md:gap-4 mb-12 md:mb-16"
        >
          <span className="initials-letter initials text-[6rem] md:text-[10rem] lg:text-[14rem] text-foreground">
            C
          </span>
          <span className="initials-letter initials text-[6rem] md:text-[10rem] lg:text-[14rem] text-primary">
            U
          </span>
        </div>

        {/* Main headline */}
        <h1
          ref={headlineRef}
          className="max-w-4xl text-center text-2xl md:text-3xl lg:text-4xl font-serif text-foreground leading-snug"
        >
          Most transformation leaders know{" "}
          <span className="text-muted-foreground">strategy</span> or{" "}
          <span className="text-muted-foreground">operations</span>.
          <br />
          <span className="text-primary">I&apos;ve built at every layer.</span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="mt-8 text-center text-sm md:text-base text-muted-foreground max-w-xl"
        >
          Christopher Ullmann
          <span className="mx-3 text-border">|</span>
          Executive Director, AI Transformation
        </p>
      </div>
    </section>
  );
}

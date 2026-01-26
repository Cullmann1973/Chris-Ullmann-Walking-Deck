"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "../gsap-provider";

const expertiseWords = [
  "STRATEGY",
  "OPERATIONS",
  "QUALITY",
  "TRANSFORMATION",
  "AI",
];

const stats = [
  { value: "$30M+", label: "Annual working capital released" },
  { value: "170%", label: "ROI on $49M initiative" },
  { value: "600+", label: "Employees trained in AI" },
  { value: "20+", label: "GenAI use cases piloted" },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Large "About" title flies in from right (scrubbed to scroll)
      gsap.fromTo(
        titleRef.current,
        { x: "100vw", opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
          },
        }
      );

      // Photo reveal
      gsap.fromTo(
        photoRef.current,
        { scale: 1.1, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: photoRef.current,
            start: "top 85%",
            end: "top 50%",
            scrub: 1,
          },
        }
      );

      // Expertise words fly in from right, staggered
      expertiseWords.forEach((_, index) => {
        gsap.fromTo(
          `.expertise-word-${index}`,
          { x: "50vw", opacity: 0 },
          {
            x: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: wordsRef.current,
              start: `top ${85 - index * 5}%`,
              end: `top ${55 - index * 5}%`,
              scrub: 1,
            },
          }
        );
      });

      // Content reveal
      gsap.fromTo(
        contentRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 90%",
            end: "top 60%",
            scrub: 1,
          },
        }
      );

      // Stats animation
      gsap.fromTo(
        ".stat-item",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 90%",
            end: "top 60%",
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="bg-dark-alt relative min-h-screen"
    >
      {/* Large "About" title - flies in from right */}
      <h2
        ref={titleRef}
        className="absolute top-16 md:top-20 lg:top-24 right-4 md:right-16 lg:right-24 text-4xl md:text-7xl lg:text-8xl font-serif text-foreground/40 pointer-events-none select-none"
      >
        About
      </h2>

      <div className="section-padding pt-32">
        <div className="max-w-6xl mx-auto">
          {/* Main content grid */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left column - Photo and words */}
            <div className="space-y-12">
              {/* Photo */}
              <div
                ref={photoRef}
                className="relative aspect-square max-w-md mx-auto lg:mx-0"
              >
                <div className="absolute -inset-4 rounded-2xl border border-primary/20" />
                <div className="relative w-full h-full rounded-xl overflow-hidden">
                  <Image
                    src="/headshot.png"
                    alt="Christopher Ullmann"
                    fill
                    className="object-cover photo-treatment"
                    priority
                  />
                </div>
              </div>

              {/* Expertise words - fly in from right */}
              <div ref={wordsRef} className="space-y-2">
                {expertiseWords.map((word, index) => (
                  <div
                    key={word}
                    className={`expertise-word-${index} text-2xl md:text-4xl lg:text-5xl font-serif ${
                      index === expertiseWords.length - 1
                        ? "text-primary"
                        : "text-foreground"
                    }`}
                  >
                    {word}
                  </div>
                ))}
              </div>
            </div>

            {/* Right column - Content */}
            <div ref={contentRef} className="space-y-8 lg:pt-12">
              <div className="content-card p-8">
                <h3 className="text-2xl md:text-3xl font-serif text-foreground mb-6">
                  From Air Force flight lines to Fortune 500 boardrooms
                </h3>

                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    I&apos;ve operated as a technician, scientist, quality leader,
                    program manager, and now AI strategist. That range isn&apos;t a
                    winding career: it&apos;s what makes me effective at connecting
                    strategy to execution.
                  </p>

                  <p>
                    When I lead AI transformation, I&apos;m not guessing what the floor
                    needs. <span className="text-primary">I&apos;ve been on the floor.</span>
                  </p>

                  <p>
                    When I present to the board, I&apos;m not abstracting:{" "}
                    <span className="text-primary">
                      I&apos;m translating from systems I&apos;ve personally built.
                    </span>
                  </p>
                </div>
              </div>

              {/* Current role badge */}
              <div className="content-card p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1">
                      Current Role
                    </p>
                    <p className="text-foreground font-medium">
                      Executive Director, AI Transformation
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Manufacturing PMO • Supply Chain • The Estée Lauder Companies
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-3 py-1 rounded-full text-xs font-mono bg-primary/10 text-primary border border-primary/30">
                      GenAI Strategy
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-mono bg-secondary text-muted-foreground">
                      Stanford AI
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div ref={statsRef} className="grid grid-cols-2 gap-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="stat-item text-center">
                    <div className="text-2xl md:text-3xl font-bold text-primary gauge-number mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

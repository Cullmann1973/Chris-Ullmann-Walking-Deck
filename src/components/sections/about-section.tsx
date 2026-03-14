"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "../gsap-provider";
import { FOCUS_CONFIGS, type FocusMode } from "@/lib/focus-config";

const expertiseWords = [
  "SUPPLY CHAIN DIGITALIZATION",
  "PROCESS REDESIGN",
  "CHANGE LEADERSHIP",
  "QUALITY SYSTEMS",
  "AI INTEGRATION",
];

const stats = [
  { value: "$49M+", label: "Enterprise transformation, 170% ROI" },
  { value: "$500M+", label: "Roadmap authored" },
  { value: "1,000+", label: "People activated on AI" },
  { value: "25+", label: "Years across regulated industries" },
];

export function AboutSection({ focus }: { focus?: string }) {
  const focusMode = (focus as FocusMode) || "general";
  const focusConfig = FOCUS_CONFIGS[focusMode] || FOCUS_CONFIGS.general;
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Large "About" title flies in from right
      gsap.fromTo(
        titleRef.current,
        { x: "60vw", opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "top 55%",
            scrub: 1.5,
          },
        }
      );

      // Photo reveal
      gsap.fromTo(
        photoRef.current,
        { scale: 1.05, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: photoRef.current,
            start: "top 85%",
            end: "top 55%",
            scrub: 1.5,
          },
        }
      );

      // Expertise words fly in with separated scroll windows
      gsap.utils.toArray<HTMLElement>(".expertise-word").forEach((word, index) => {
        gsap.fromTo(
          word,
          { x: "100vw", opacity: 0 },
          {
            x: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: wordsRef.current,
              start: `top ${90 - index * 3}%`,
              end: `top ${70 - index * 3}%`,
              scrub: 0.8,
            },
          }
        );
      });

      // Content reveal
      gsap.fromTo(
        contentRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
            end: "top 55%",
            scrub: 1.5,
          },
        }
      );

      // Stats animation
      gsap.fromTo(
        ".stat-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
            end: "top 55%",
            scrub: 1.5,
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
        className="absolute top-16 md:top-20 lg:top-24 right-4 md:right-16 lg:right-24 z-10 text-4xl md:text-7xl lg:text-8xl font-serif text-foreground/40 pointer-events-none select-none"
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
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 448px"
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
                    className={`expertise-word text-2xl md:text-4xl lg:text-5xl font-serif ${
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
                  From regulated manufacturing floors to enterprise AI transformation
                </h3>

                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    I&apos;ve spent 25 years building and fixing complex systems
                    in regulated manufacturing environments.
                  </p>
                  <p>
                    I built quality systems from scratch across pharmaceutical,
                    OTC, cosmetic, and nutraceutical manufacturing, then led
                    multi-site plant consolidations and full organization
                    restructures.
                  </p>
                  <p>
                    I&apos;ve navigated FDA, GMP, and evolving regulatory landscapes
                    while driving performance with Lean Six Sigma discipline and
                    Kotter change leadership.
                  </p>
                  <p>
                    Lean Six Sigma certified. Kotter Change Management facilitator.
                    Work featured in Harvard Business Review.
                  </p>
                  <p>
                    Today I lead AI transformation at enterprise scale, bringing
                    that same rigor to emerging technology.
                  </p>
                  <p>
                    Most AI leaders come from pure tech. Most operations leaders
                    never touch AI.{" "}
                    <span className="text-primary">
                      I do both, and that&apos;s what makes the work stick.
                    </span>
                  </p>

                  {focusMode !== "general" && (
                    <p className="text-foreground/90 font-medium mt-2">
                      {focusConfig.positioningLine}
                    </p>
                  )}
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
                    {focusMode === "supply-chain" ? (
                      <>
                        <span className="px-3 py-1 rounded-full text-xs font-mono bg-primary/10 text-primary border border-primary/30">
                          Digital Transformation
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-mono bg-secondary text-muted-foreground">
                          $500M+ Roadmap
                        </span>
                      </>
                    ) : focusMode === "quality" ? (
                      <>
                        <span className="px-3 py-1 rounded-full text-xs font-mono bg-primary/10 text-primary border border-primary/30">
                          Quality Systems
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-mono bg-secondary text-muted-foreground">
                          FDA / GMP
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="px-3 py-1 rounded-full text-xs font-mono bg-primary/10 text-primary border border-primary/30">
                          AI Strategy, Development and Delivery
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-mono bg-secondary text-muted-foreground">
                          Stanford AI
                        </span>
                      </>
                    )}
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

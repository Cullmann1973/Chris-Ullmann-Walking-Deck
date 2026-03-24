"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "../gsap-provider";
import { FOCUS_CONFIGS, type FocusMode } from "@/lib/focus-config";

const expertiseWords = [
  "BUSINESS STRATEGY",
  "PEOPLE SYSTEMS BRIDGE",
  "ENTERPRISE TRANSLATOR",
  "ADOPTION AT SCALE",
  "GOVERNANCE & DELIVERY",
];

const stats = [
  { value: "50+", label: "AI use cases assessed and prioritized" },
  { value: "1,000+", label: "People activated on AI daily" },
  { value: "37x", label: "Community growth (3 to 100+ members)" },
  { value: "25+", label: "Years in transformation leadership" },
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
                  {/* TODO: Replace headshot.png with a higher-res source (min 896x896 for 2x retina). Current source is ~191x212px, displayed at 448x448. */}
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
                  The strategic bridge between People leaders and People Systems
                </h3>

                <div className="space-y-4 text-[#ced4da] leading-relaxed">
                  <p>
                    I have spent my career leading transformation where execution matters most: operations, quality, supply chain, PMO, and enterprise change. Over time, one thing has become clear to me. Technology can enable progress, but people, process, and disciplined execution are what actually deliver it.
                  </p>
                  <p>
                    Today, much of my work is focused on AI transformation. Not as a theory, and not as a side conversation, but as a practical lever to improve how work gets done. My role is to identify where AI can solve real business problems, align the right stakeholders, build the path to adoption, and make sure it scales in a responsible and useful way.
                  </p>
                  <p>
                    At Estée Lauder, I work across business and IT to turn opportunity into action. The goal is simple: move beyond pilots, create measurable value, and build the kind of capability that sticks.
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
                    <p className="text-xs font-mono text-[#ced4da] uppercase tracking-wider mb-1">
                      Current Role
                    </p>
                    <p className="text-foreground font-medium">
                      Executive Director, AI Transformation
                    </p>
                    <p className="text-sm text-[#ced4da]">
                      Manufacturing PMO • Supply Chain • The Estée Lauder Companies
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {focusMode === "supply-chain" ? (
                      <>
                        <span className="px-3 py-1 rounded-full text-xs font-mono bg-primary/10 text-primary border border-primary/30">
                          Digital Transformation
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-mono bg-secondary text-[#ced4da]">
                          $500M+ Roadmap
                        </span>
                      </>
                    ) : focusMode === "quality" ? (
                      <>
                        <span className="px-3 py-1 rounded-full text-xs font-mono bg-primary/10 text-primary border border-primary/30">
                          Quality Systems
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-mono bg-secondary text-[#ced4da]">
                          FDA / GMP
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="px-3 py-1 rounded-full text-xs font-mono bg-primary/10 text-primary border border-primary/30">
                          People Systems Integration & AI Adoption
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-mono bg-secondary text-[#ced4da]">
                          Stanford HAI
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-mono bg-secondary text-[#ced4da]">Kotter Certified</span>
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
                    <div className="text-xs text-[#ced4da]">
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

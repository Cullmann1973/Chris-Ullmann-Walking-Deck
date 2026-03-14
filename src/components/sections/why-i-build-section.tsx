"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "../gsap-provider";

interface StackLayer {
  title: string;
  period: string;
  role: string;
  description: string;
}

const stackLayers: StackLayer[] = [
  {
    title: "Strategy",
    period: "2024-Present",
    role: "Executive Director, AI Transformation",
    description:
      "Leading AI transformation across global manufacturing. 60 projects, ~$100M annually, 5 plants. Built governance frameworks with Legal and Compliance before scaling. Established a 100+ member AI Community of Practice. ELLA, our line-level manufacturing assistant, presented at Microsoft Ignite.",
  },
  {
    title: "Programs",
    period: "2018-2024",
    role: "Executive Director, PMO, Supply Chain and Digital Transformation",
    description:
      "Managed Program Runway: $49M+ enterprise value chain transformation at 170% ROI across MAC, Clinique, Estée Lauder, Bobbi Brown, and Tom Ford. Authored the $500M+ Integrated Manufacturing Transformation roadmap. Program managed $13.3M Engineering Tech Center build.",
  },
  {
    title: "Quality",
    period: "2015-2018",
    role: "Executive Director, Quality Assurance",
    description:
      "Initiated and drove a global Quality organization restructure. Transformed reactive quality control into proactive quality assurance across the largest regulated manufacturing site in North America. Built continuous improvement programs using Kotter and Lean methodologies. Released $45M/year in working capital through systems redesign.",
  },
  {
    title: "Operations",
    period: "2002-2015",
    role: "Manufacturing & Operations Leadership",
    description:
      "Built quality systems from scratch across pharmaceutical, OTC, cosmetic, and nutraceutical manufacturing. Led $21.7M multi-site plant consolidation delivering $39M first-year savings. Restructured 70-person quality organization. Work featured in Harvard Business Review. Lean Six Sigma, Kaizen, PDCA daily management.",
  },
  {
    title: "Foundation",
    period: "1992-2002",
    role: "USAF Veteran + B.S. Biology",
    description:
      "USAF Aerospace Ground Equipment technician. Operation Provide Comfort II. Two Achievement Medals. Then B.S. Biology while working full-time. The zero-defect mentality and systematic thinking that everything else is built on.",
  },
];

export function WhyIBuildSection({ focus }: { focus?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const boxContentRef = useRef<HTMLDivElement>(null);
  const titleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const box = boxRef.current;
    const boxContent = boxContentRef.current;
    if (!section || !box || !boxContent) return;

    const ctx = gsap.context(() => {
      // Total scroll distance for entire animation
      const totalScrollLength = "400%";

      // Pin the section
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: `+=${totalScrollLength}`,
        pin: true,
        scrub: 1.5,
      });

      // Create a single master timeline for all animations
      const masterTL = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${totalScrollLength}`,
          scrub: 1.5,
        },
      });

      // PHASE 1: Fade out box content FIRST (0% - 5%)
      // Content fades out BEFORE any box rotation
      masterTL.to(
        boxContent,
        {
          opacity: 0,
          duration: 0.05,
          ease: "power2.out",
        },
        0
      );

      // PHASE 2: Box morph animation (6% - 20%)
      // Box starts rotating AFTER content is gone
      // Compressed to give more room for rotating titles
      masterTL
        .to(
          box,
          {
            rotation: 45,
            scale: 1.5,
            borderRadius: "40%",
            boxShadow: "0 0 100px 50px rgba(0,0,0,0.5)",
            duration: 0.05,
            ease: "power2.inOut",
          },
          0.06
        )
        .to(
          box,
          {
            rotation: 30,
            scale: 4,
            borderRadius: "30%",
            duration: 0.05,
            ease: "power2.inOut",
          },
          0.11
        )
        .to(
          box,
          {
            rotation: 0,
            scale: 10,
            borderRadius: "0%",
            boxShadow: "none",
            duration: 0.05,
            ease: "power2.out",
          },
          0.16
        );

      // PHASE 3: Rotating titles - ONE AT A TIME (22% - 98%)
      // MASSIVE scroll range for each title - users can read comfortably
      const titlesStartProgress = 0.22;
      const titlesEndProgress = 0.98;
      const titlesRange = titlesEndProgress - titlesStartProgress; // 0.76 = 76% of scroll
      const perTitleRange = titlesRange / stackLayers.length; // ~0.152 per title (15.2% of scroll each)

      // Set initial state for ALL titles (hidden, rotated down)
      titleRefs.current.forEach((titleEl) => {
        if (titleEl) {
          gsap.set(titleEl, { rotationZ: 45, opacity: 0, y: 50 });
        }
      });
      contentRefs.current.forEach((contentEl) => {
        if (contentEl) {
          gsap.set(contentEl, { opacity: 0, y: 20 });
        }
      });

      // Animate each title in sequence
      stackLayers.forEach((_, index) => {
        const titleEl = titleRefs.current[index];
        const contentEl = contentRefs.current[index];
        if (!titleEl || !contentEl) return;

        // Calculate this title's dedicated scroll range
        // Divide into: enter (15%), hold (70%), exit (15%)
        // VERY long hold phase = maximum reading time
        const itemStart = titlesStartProgress + index * perTitleRange;
        const enterEnd = itemStart + perTitleRange * 0.15; // End of rotate-in phase (15%)
        const holdEnd = itemStart + perTitleRange * 0.85; // End of hold phase (70% hold)
        const itemEnd = itemStart + perTitleRange;

        // Title: Rotate IN (45° → 0°) with smooth ease
        masterTL.to(
          titleEl,
          {
            rotationZ: 0,
            opacity: 1,
            y: 0,
            duration: perTitleRange * 0.15,
            ease: "power2.out",
          },
          itemStart
        );

        // Title: HOLD at exactly 0° - explicit keyframe to ensure horizontal
        // This is the main reading phase - takes 70% of the title's scroll range
        masterTL.to(
          titleEl,
          {
            rotationZ: 0,
            opacity: 1,
            y: 0,
            duration: perTitleRange * 0.70,
            ease: "none",
          },
          enterEnd
        );

        // Title: Rotate OUT (0° → -45°) with smooth ease
        masterTL.to(
          titleEl,
          {
            rotationZ: -45,
            opacity: 0,
            y: -100,
            duration: perTitleRange * 0.15,
            ease: "power2.in",
          },
          holdEnd
        );

        // Content: Fade in after title reaches horizontal
        masterTL.to(
          contentEl,
          {
            opacity: 1,
            y: 0,
            duration: perTitleRange * 0.12,
            ease: "power2.out",
          },
          enterEnd + perTitleRange * 0.01 // Slight delay after title settles
        );

        // Content: Fade out slightly before title exits
        masterTL.to(
          contentEl,
          {
            opacity: 0,
            y: -40,
            duration: perTitleRange * 0.12,
            ease: "power2.in",
          },
          holdEnd - perTitleRange * 0.03 // Start fading slightly before title exits
        );
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-i-build"
      className="relative min-h-screen bg-dark overflow-hidden"
    >
      {/* Morphing box - ONLY the visual box, no content inside */}
      <div
        ref={boxRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                   w-[90vw] max-w-[500px] h-[400px] md:h-[500px] bg-dark-alt rounded-2xl z-10
                   border border-primary/30"
        style={{ transformOrigin: "center center" }}
      />

      {/* Box content - SEPARATE from box, positioned over it */}
      {/* This allows content to fade out without rotating with the box */}
      <div
        ref={boxContentRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                   w-[90vw] max-w-[500px] h-[400px] md:h-[500px] z-15
                   flex flex-col justify-start p-6 md:p-10 pointer-events-none"
      >
        <h3 className="text-lg md:text-xl font-semibold text-primary mb-6 md:mb-8">
          My Approach
        </h3>
        <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
          Walk into the complexity. Assess it honestly. Align the people. Build the
          structure. Execute. That pattern has delivered a $21.7M manufacturing
          consolidation, built full FDA audit readiness from the ground up,

          and authored a $500M+ transformation roadmap across 4 workstreams and
          20+ projects. The problems change. The playbook works.
        </p>
      </div>

      {/* Rotating titles - positioned to avoid persistent CU logo */}
      <div className="absolute left-4 sm:left-[90px] md:left-[140px] lg:left-[180px] top-1/2 -translate-y-1/2 z-30 min-h-[50px] min-w-[120px] lg:min-h-[100px] lg:min-w-[300px]">
        {stackLayers.map((item, index) => (
          <div
            key={item.title}
            ref={(el) => {
              titleRefs.current[index] = el;
            }}
            className="absolute left-0 whitespace-nowrap"
            style={{
              transformOrigin: "left center",
              top: "50%",
              transform: "translateY(-50%)",
              // First title visible by default as fallback if GSAP doesn't load
              ...(index === 0 ? { opacity: 1 } : {}),
            }}
          >
            <span className="text-[36px] sm:text-[48px] md:text-[64px] lg:text-[88px] xl:text-[110px] font-serif text-foreground leading-none">
              {item.title}
            </span>
          </div>
        ))}
      </div>

      {/* Content text - positioned on right side, or below title on mobile */}
      <div
        className="absolute z-30 
                   bottom-[22%] left-4 right-4
                   sm:bottom-auto sm:left-auto sm:top-1/2 sm:-translate-y-1/2 
                   sm:right-[5%] sm:w-[280px]
                   md:right-[8%] md:w-[320px]
                   lg:right-[10%] lg:w-[380px]
                   xl:right-[12%] xl:w-[420px]"
      >
        <div className="relative w-full">
          {stackLayers.map((item, index) => (
            <div
              key={`content-${item.title}`}
              ref={(el) => {
                contentRefs.current[index] = el;
              }}
              className={index === 0 ? "relative" : "absolute inset-x-0 top-0"}
            >
              <p className="text-xs md:text-sm text-primary mb-1 sm:mb-2 uppercase tracking-wider font-mono">
                {item.period}
              </p>
              <h4 className="text-sm md:text-base lg:text-lg font-medium text-foreground mb-1.5 sm:mb-2 md:mb-3 leading-snug">
                {item.role}
              </h4>
              <p className="text-xs md:text-sm lg:text-base text-foreground/70 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "../gsap-provider";

interface ContentItem {
  title: string;
  content: string;
}

const contentItems: ContentItem[] = [
  {
    title: "Strategy",
    content:
      "I build strategies that translate vision into action. From market entry to digital transformation, I focus on what matters most: creating sustainable competitive advantage.",
  },
  {
    title: "Operations",
    content:
      "I build operational excellence through process optimization, technology integration, and team empowerment. Every system should work for the people using it.",
  },
  {
    title: "Growth",
    content:
      "I build sustainable growth engines that scale with your ambitions while maintaining quality and culture. Growth should never come at the cost of what makes you great.",
  },
  {
    title: "Teams",
    content:
      "I build high-performing teams by identifying talent, fostering collaboration, and creating environments where people thrive and do their best work.",
  },
];

export function WhyIBuildSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const boxContentRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionTitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const box = boxRef.current;
    const boxContent = boxContentRef.current;
    const logo = logoRef.current;
    if (!section || !box || !boxContent || !logo) return;

    const ctx = gsap.context(() => {
      // Total scroll distance for entire animation
      const totalScrollLength = "400%";

      // Pin the section
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: `+=${totalScrollLength}`,
        pin: true,
        scrub: 1,
      });

      // PHASE 1: Fade out box content (0% - 15%)
      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: `+=${totalScrollLength}`,
            scrub: 1,
          },
        })
        .to(
          boxContent,
          {
            opacity: 0,
            duration: 0.15,
          },
          0
        );

      // PHASE 2: Box morph animation (15% - 50%)
      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: `+=${totalScrollLength}`,
            scrub: 1,
          },
        })
        // Rotate and scale up
        .to(
          box,
          {
            rotation: 45,
            scale: 1.5,
            borderRadius: "40%",
            filter: "blur(0px)",
            boxShadow: "0 0 100px 50px rgba(0,0,0,0.5)",
            duration: 0.15,
            ease: "power2.inOut",
          },
          0.15
        )
        // Continue rotation and scale to fill screen
        .to(
          box,
          {
            rotation: 30,
            scale: 4,
            borderRadius: "30%",
            duration: 0.15,
            ease: "power2.inOut",
          },
          0.3
        )
        // Final expansion to fill viewport
        .to(
          box,
          {
            rotation: 0,
            scale: 10,
            borderRadius: "0%",
            boxShadow: "none",
            duration: 0.1,
            ease: "power2.out",
          },
          0.45
        );

      // PHASE 2b: Show logo as box morphs (40% - 55%)
      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: `+=${totalScrollLength}`,
            scrub: 1,
          },
        })
        .set(logo, { opacity: 0 })
        .to(
          logo,
          {
            opacity: 1,
            duration: 0.1,
            ease: "power2.out",
          },
          0.45
        );

      // PHASE 3: Rotating titles (55% - 100%)
      const titlesStartProgress = 0.55;
      const titlesEndProgress = 1.0;
      const titlesRange = titlesEndProgress - titlesStartProgress;
      const perTitleRange = titlesRange / contentItems.length;

      contentItems.forEach((_, index) => {
        const titleEl = titleRefs.current[index];
        const contentEl = contentRefs.current[index];
        if (!titleEl || !contentEl) return;

        const itemStart = titlesStartProgress + index * perTitleRange;
        const itemMid = itemStart + perTitleRange * 0.5;
        const itemEnd = itemStart + perTitleRange;

        // Title rotation animation
        gsap
          .timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: `+=${totalScrollLength}`,
              scrub: 1,
            },
          })
          // Start: rotated and transparent, coming from right
          .set(titleEl, {
            rotationZ: 45,
            opacity: 0,
            x: 200,
          })
          // Rotate in and become visible
          .to(
            titleEl,
            {
              rotationZ: 0,
              opacity: 1,
              x: 0,
              ease: "power2.out",
            },
            itemStart
          )
          // Hold position
          .to(
            titleEl,
            {
              rotationZ: 0,
              opacity: 1,
            },
            itemMid - 0.02
          )
          // Rotate out
          .to(
            titleEl,
            {
              rotationZ: -45,
              opacity: 0,
              x: -200,
              ease: "power2.in",
            },
            itemEnd - 0.05
          );

        // Content text fade
        gsap
          .timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: `+=${totalScrollLength}`,
              scrub: 1,
            },
          })
          .set(contentEl, { opacity: 0, y: 30 })
          .to(contentEl, { opacity: 1, y: 0 }, itemStart + 0.02)
          .to(contentEl, { opacity: 1 }, itemMid)
          .to(contentEl, { opacity: 0, y: -30 }, itemEnd - 0.05);
      });

      // Update section title during rotating titles
      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${totalScrollLength}`,
          scrub: 1,
          onUpdate: (self) => {
            if (sectionTitleRef.current) {
              if (self.progress < 0.55) {
                sectionTitleRef.current.textContent = "Why I Build";
              } else {
                sectionTitleRef.current.textContent = "Spectrum";
              }
            }
          },
        },
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
      {/* Section title - top left */}
      <div
        ref={sectionTitleRef}
        className="absolute top-8 left-4 md:left-8 text-lg md:text-xl text-foreground/60 z-20 font-mono uppercase tracking-wider"
      >
        Why I Build
      </div>

      {/* Morphing box */}
      <div
        ref={boxRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                   w-[90vw] max-w-[500px] h-[400px] md:h-[500px] bg-dark-alt rounded-2xl z-10
                   flex flex-col justify-between p-6 md:p-10 border border-border/20"
        style={{ transformOrigin: "center center" }}
      >
        {/* Box content - fades out first */}
        <div ref={boxContentRef}>
          <h3 className="text-lg md:text-xl font-semibold text-primary mb-6 md:mb-8">
            My Approach
          </h3>
          <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
            I am a versatile professional. I can adapt easily, am open to change
            and to new ideas. At the same time, I trust my principles and
            values, follow my path and have performed well under pressure. I am
            honest and straight forward, enjoy collaboration, and try to bring
            out the best in everyone I work with.
          </p>
        </div>
      </div>

      {/* Logo - appears during morph, stays fixed */}
      <div
        ref={logoRef}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 opacity-0"
      >
        <span className="text-[80px] md:text-[120px] font-serif text-foreground leading-none">
          C
        </span>
        <span className="text-[80px] md:text-[120px] font-serif text-primary leading-none">
          U
        </span>
      </div>

      {/* Rotating titles container */}
      <div className="absolute left-[120px] md:left-[250px] top-1/2 -translate-y-1/2 z-30">
        {contentItems.map((item, index) => (
          <div
            key={item.title}
            ref={(el) => {
              titleRefs.current[index] = el;
            }}
            className="absolute whitespace-nowrap opacity-0"
            style={{ transformOrigin: "left center" }}
          >
            <span className="text-[60px] md:text-[100px] lg:text-[140px] font-serif text-foreground">
              {item.title}
            </span>
          </div>
        ))}
      </div>

      {/* Content text - right side */}
      <div className="absolute right-4 md:right-8 lg:right-16 top-1/2 -translate-y-1/2 max-w-[280px] md:max-w-md z-30">
        {contentItems.map((item, index) => (
          <div
            key={`content-${item.title}`}
            ref={(el) => {
              contentRefs.current[index] = el;
            }}
            className="absolute inset-0 opacity-0"
          >
            <p className="text-sm md:text-lg lg:text-xl text-foreground/80 leading-relaxed">
              {item.content}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

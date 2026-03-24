"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../gsap-provider";
import { Brain, Users, Shield, type LucideIcon } from "lucide-react";

const roles = [
  { title: "Floor to Boardroom Fluency", align: "right" },
  { title: "Builds, Not Just Advises", align: "left" },
  { title: "Scales Through People", align: "center" },
  { title: "Translates Complexity", align: "right" },
  { title: "People Systems Bridge", align: "center", highlight: true },
];

interface Pillar {
  title: string;
  body: string;
  icon: LucideIcon;
}

const pillars: Pillar[] = [
  {
    icon: Brain,
    title: "Stanford HAI Foundation",
    body: "Trained through Stanford's Human-Centered AI Institute. Technical Fundamentals of Generative AI and Business Applications, covering not just how AI works, but its impact on individuals, communities, and society. Trust frameworks. Legal risks. Workforce transformation. Intelligence augmentation: human + AI, not replacement. Trust frameworks and bias mitigation especially critical for HR AI: compensation, hiring, performance, and promotion decisions.",
  },
  {
    icon: Users,
    title: "Grassroots, Not Mandates",
    body: "AI Community of Practice: 3 members to 100+, grown organically across Manufacturing, Marketing, R&D, and Global Supply Chain. Monthly showcases. Peer champions. Prompt libraries built by the people who use them. 37x growth in active AI users, not from IT rollouts, but from making it genuinely useful.",
  },
  {
    icon: Shield,
    title: "Governance That Enables",
    body: "Legal, Compliance, and Privacy engaged before the first tool was deployed. Responsible AI isn't a checkbox, it's the foundation that lets people move faster. Built access models, usage guidelines, and adoption tracking. When you've run GMP-regulated operations, you know: governance done right accelerates, not blocks.",
  },
];

const credentials =
  "Stanford HAI · Kotter Change Leadership (Harvard) · Microsoft Ignite · M365 Conference Panelist · Harvard Business Review";

/* ═══ Approach Carousel — portal opening + rotating word carousel ═══ */

interface ApproachItem {
  word: string;
  period: string;
  role: string;
  description: string;
}

const APPROACH_ITEMS: ApproachItem[] = [
  {
    word: "Foundation",
    period: "Stanford HAI",
    role: "Human-Centered AI Training",
    description:
      "Trained through Stanford's Human-Centered AI Institute. Generative AI fundamentals, trust frameworks, bias mitigation, workforce transformation. Intelligence augmentation: human + AI, not replacement.",
  },
  {
    word: "Community",
    period: "3 → 100+ Members",
    role: "Grassroots Adoption at Scale",
    description:
      "AI Community of Practice grown organically across Manufacturing, Marketing, R&D, and Global Supply Chain. Monthly showcases. Peer champions. Prompt libraries built by the people who use them. 37x growth in active AI users.",
  },
  {
    word: "Governance",
    period: "Before Scaling",
    role: "Responsible by Design",
    description:
      "Legal, Compliance, and Privacy engaged before the first tool was deployed. Built access models, usage guidelines, and adoption tracking. Governance done right accelerates, not blocks.",
  },
];

function ApproachCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLDivElement | null)[]>([]);
  const descsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !cardRef.current) return;

    const ctx = gsap.context(() => {
      const N = APPROACH_ITEMS.length;
      const sliceSize = 0.78 / N;

      // Initialize: hide all words and descriptions
      wordsRef.current.forEach((el) => {
        if (el) gsap.set(el, { rotationZ: 45, opacity: 0, y: 50 });
      });
      descsRef.current.forEach((el) => {
        if (el) gsap.set(el, { opacity: 0, y: 20 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=350%",
          scrub: 1.5,
          pin: true,
        },
      });

      // ── Portal opening: center card morphs to fill screen ──

      // Phase 1 (0→0.05): card content fades out
      tl.to(
        contentRef.current,
        { opacity: 0, duration: 0.05, ease: "none" },
        0
      );

      // Phase 2 (0.06→0.11): card rotates 45°, scales 1.5x
      tl.to(
        cardRef.current,
        {
          rotation: 45,
          scale: 1.5,
          borderRadius: "40%",
          boxShadow: "0 0 100px 50px rgba(0,0,0,0.5)",
          duration: 0.05,
          ease: "none",
        },
        0.06
      );

      // Phase 3 (0.11→0.16): card rotates 30°, scales 4x
      tl.to(
        cardRef.current,
        {
          rotation: 30,
          scale: 4,
          borderRadius: "30%",
          duration: 0.05,
          ease: "none",
        },
        0.11
      );

      // Phase 4 (0.16→0.21): card rotates 0°, scales 10x, fills screen
      tl.to(
        cardRef.current,
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

      // ── Word carousel begins at 0.22 ──

      APPROACH_ITEMS.forEach((_, i) => {
        const wordEl = wordsRef.current[i];
        const descEl = descsRef.current[i];
        if (!wordEl || !descEl) return;

        const s = 0.20 + i * sliceSize;
        const c = s + 0.15 * sliceSize;       // word fully entered
        const d = s + 0.85 * sliceSize;       // word starts exiting

        // Word enters: rotationZ 45→0, opacity 0→1, y +50→0
        tl.to(
          wordEl,
          { rotationZ: 0, opacity: 1, y: 0, duration: 0.15 * sliceSize, ease: "power2.out" },
          s
        );

        // Word holds: keep visible
        tl.to(
          wordEl,
          { rotationZ: 0, opacity: 1, y: 0, duration: 0.70 * sliceSize, ease: "none" },
          c
        );

        // Word exits: rotationZ 0→-45, opacity 1→0, y 0→-100
        tl.to(
          wordEl,
          { rotationZ: -45, opacity: 0, y: -100, duration: 0.15 * sliceSize, ease: "power2.in" },
          d
        );

        // Description enters shortly after word settles
        tl.to(
          descEl,
          { opacity: 1, y: 0, duration: 0.12 * sliceSize, ease: "power2.out" },
          c + 0.01 * sliceSize
        );

        // Description exits before word exits
        tl.to(
          descEl,
          { opacity: 0, y: -40, duration: 0.12 * sliceSize, ease: "power2.in" },
          d - 0.03 * sliceSize
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="approach"
      className="relative min-h-screen bg-dark-alt overflow-hidden"
    >
      {/* Center card (portal visual) */}
      <div
        ref={cardRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[500px] h-[400px] md:h-[500px] bg-dark rounded-2xl z-10 border border-primary/30"
        style={{ transformOrigin: "center center" }}
      />

      {/* Card content overlay (fades out during portal) */}
      <div
        ref={contentRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[500px] h-[400px] md:h-[500px] z-[15] flex flex-col justify-start p-6 md:p-10 pointer-events-none"
      >
        <h3 className="text-lg md:text-xl font-semibold text-primary mb-6 md:mb-8">
          Human-Centered AI
        </h3>
        <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
          Technology serves people. Not the other way around. What follows is the framework
          behind 1,000+ people activated on AI: Stanford training, grassroots community building,
          and governance that enables instead of blocks.
        </p>
      </div>

      {/* Big rotating words — left side */}
      <div className="absolute left-4 sm:left-[90px] md:left-[140px] lg:left-[180px] top-1/2 -translate-y-1/2 z-30 min-h-[50px] min-w-[120px] lg:min-h-[100px] lg:min-w-[300px]">
        {APPROACH_ITEMS.map((item, i) => (
          <div
            key={`word-${i}`}
            ref={(el) => { wordsRef.current[i] = el; }}
            className="absolute left-0 whitespace-nowrap"
            style={{
              transformOrigin: "left center",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <span className="text-[36px] sm:text-[48px] md:text-[64px] lg:text-[88px] xl:text-[110px] font-serif text-foreground leading-none">
              {item.word}
            </span>
          </div>
        ))}
      </div>

      {/* Description panels — right side */}
      <div className="absolute z-30 bottom-[22%] left-4 right-4 sm:bottom-auto sm:left-auto sm:top-1/2 sm:-translate-y-1/2 sm:right-[5%] sm:w-[280px] md:right-[8%] md:w-[320px] lg:right-[10%] lg:w-[380px] xl:right-[12%] xl:w-[420px]">
        <div className="relative w-full">
          {APPROACH_ITEMS.map((item, i) => (
            <div
              key={`desc-${i}`}
              ref={(el) => { descsRef.current[i] = el; }}
              className={i === 0 ? "relative" : "absolute inset-x-0 top-0"}
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

      {/* Credentials bar at bottom */}
      <div className="absolute bottom-8 left-0 right-0 text-center z-20 pointer-events-none">
        <p className="text-xs font-mono tracking-wider text-[#ced4da]/40">
          {credentials}
        </p>
      </div>
    </section>
  );
}

export function RolesRevealSection({ focus }: { focus?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (!sectionRef.current || !boxRef.current) return;

    const ctx = gsap.context(() => {
      // Pin the section while we reveal content
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=375%",
          scrub: 1.5,
          pin: true,
        },
      });

      // Reveal each role one by one (spread across 0-0.40)
      roles.forEach((_, index) => {
        tl.fromTo(
          `.role-${index}`,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.08, ease: "none" },
          index * 0.10
        );
      });

      // Finally reveal the full paragraph (at 0.45, done by 0.55)
      tl.fromTo(
        ".roles-paragraph",
        { opacity: 0 },
        { opacity: 1, duration: 0.10, ease: "none" },
        0.45
      );

      // HOLD: 0.55 to 0.92 is pure reading time (37% of 450% = ~166vh of scroll)

      // Exit animation: morph boxRef to fill viewport
      // Step 1: Fade out all box content
      tl.to(
        ".roles-box-content",
        { opacity: 0, duration: 0.03, ease: "none" },
        0.92
      );

      // Step 2–4: Box morphs outward
      tl.to(
        boxRef.current,
        { rotation: 45, scale: 1.5, borderRadius: "40%", boxShadow: "0 0 100px 50px rgba(0,0,0,0.5)", duration: 0.04, ease: "none" },
        0.95
      );
      tl.to(
        boxRef.current,
        { rotation: 30, scale: 4, borderRadius: "30%", duration: 0.03, ease: "none" },
        0.97
      );
      tl.to(
        boxRef.current,
        { rotation: 0, scale: 10, borderRadius: "0%", boxShadow: "none", duration: 0.04, ease: "none" },
        1.0
      );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        id="roles"
        className="min-h-screen bg-dark flex items-center justify-center py-20 px-4"
      >
        <div
          ref={boxRef}
          className="bg-dark-alt border border-primary/30 rounded-lg p-6 md:p-8 lg:p-12 max-w-2xl w-full"
          style={{ transformOrigin: "center center" }}
        >
          <div className="roles-box-content">
            {/* Title */}
            <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground mb-8 md:mb-12">
              What Sets Me Apart
            </h3>

            {/* Roles - staggered positions */}
            <div className="space-y-4 md:space-y-6 mb-8 md:mb-12">
              {roles.map((role, index) => (
                <div
                  key={role.title}
                  className={`role-${index} opacity-0 ${
                    role.align === "left"
                      ? "text-left"
                      : role.align === "right"
                      ? "text-right"
                      : "text-center"
                  }`}
                >
                  <span
                    className={`text-xl md:text-2xl lg:text-3xl font-serif ${
                      role.highlight ? "text-primary" : "text-[#ced4da]"
                    }`}
                  >
                    {role.title}
                  </span>
                </div>
              ))}
            </div>

            {/* Full paragraph (reveals last) */}
            <div className="roles-paragraph opacity-0 text-sm md:text-base text-[#ced4da] leading-relaxed">
              Results create trust. Trust opens doors to bigger challenges. From
              Kaizen events on the floor to $500M transformation roadmaps in the
              boardroom, that&apos;s not a career philosophy: it&apos;s a pattern you
              can trace through{" "}
              <span className="text-primary font-semibold">25 years of outcomes</span>.
            </div>
          </div>
        </div>
      </section>

      {/* Approach — full-screen pinned section with portal + rotating word carousel */}
      <ApproachCarousel />

    </>
  );
}

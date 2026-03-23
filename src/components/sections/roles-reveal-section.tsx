"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../gsap-provider";
import { Brain, Users, Shield, type LucideIcon } from "lucide-react";

const roles = [
  { title: "Floor to Boardroom Fluency", align: "right" },
  { title: "Builds, Not Just Advises", align: "left" },
  { title: "Scales Through People", align: "center" },
  { title: "Translates Complexity", align: "right", highlight: true },
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
    body: "Trained through Stanford's Human-Centered AI Institute. Technical Fundamentals of Generative AI and Business Applications, covering not just how AI works, but its impact on individuals, communities, and society. Trust frameworks. Legal risks. Workforce transformation. Intelligence augmentation: human + AI, not replacement.",
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
          end: "+=300%",
          scrub: 1.5,
          pin: true,
        },
      });

      // Reveal each role one by one
      roles.forEach((_, index) => {
        tl.fromTo(
          `.role-${index}`,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.15, ease: "none" },
          index * 0.15
        );
      });

      // Finally reveal the full paragraph
      tl.fromTo(
        ".roles-paragraph",
        { opacity: 0 },
        { opacity: 1, duration: 0.2, ease: "none" },
        0.75
      );

      // Exit animation: morph boxRef to fill viewport
      // Hold for reading time before exit begins (was 0.80, now 0.88)
      // Step 1: Fade out all box content
      tl.to(
        ".roles-box-content",
        { opacity: 0, duration: 0.04, ease: "none" },
        0.88
      );

      // Step 2–4: Box morphs outward
      tl.to(
        boxRef.current,
        { rotation: 45, scale: 1.5, borderRadius: "40%", boxShadow: "0 0 100px 50px rgba(0,0,0,0.5)", duration: 0.04, ease: "none" },
        0.92
      );
      tl.to(
        boxRef.current,
        { rotation: 30, scale: 4, borderRadius: "30%", duration: 0.04, ease: "none" },
        0.96
      );
      tl.to(
        boxRef.current,
        { rotation: 0, scale: 10, borderRadius: "0%", boxShadow: "none", duration: 0.04, ease: "none" },
        1.0
      );
    }, sectionRef);

    // Approach pillar animations (outside pin, scroll-triggered normally)
    const ctx2 = gsap.context(() => {
      gsap.fromTo(
        ".approach-pillars-title",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".approach-pillars-title",
            start: "top 85%",
            end: "top 55%",
            scrub: 1.5,
          },
        }
      );

      gsap.fromTo(
        ".approach-card",
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: ".approach-pillars-grid",
            start: "top 85%",
            end: "top 55%",
            scrub: 1.5,
          },
        }
      );

      gsap.fromTo(
        ".approach-credentials",
        { opacity: 0 },
        {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".approach-credentials",
            start: "top 90%",
            end: "top 65%",
            scrub: 1.5,
          },
        }
      );
    });

    return () => {
      ctx.revert();
      ctx2.revert();
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
                      role.highlight ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {role.title}
                  </span>
                </div>
              ))}
            </div>

            {/* Full paragraph (reveals last) */}
            <div className="roles-paragraph opacity-0 text-sm md:text-base text-muted-foreground leading-relaxed">
              Results create trust. Trust opens doors to bigger challenges. From
              Kaizen events on the floor to $500M transformation roadmaps in the
              boardroom, that&apos;s not a career philosophy: it&apos;s a pattern you
              can trace through{" "}
              <span className="text-primary font-semibold">25 years of outcomes</span>.
            </div>
          </div>
        </div>
      </section>

      {/* Approach pillars — merged inline after the roles pin section */}
      <section className="bg-dark-alt relative">
        <div className="section-padding">
          <div className="max-w-6xl mx-auto">
            <div className="approach-pillars-title mb-12 max-w-4xl">
              <span className="text-xs font-mono tracking-wider text-muted-foreground uppercase">
                Philosophy
              </span>
              <h2 className="text-section font-serif text-foreground mt-4">
                Human-Centered AI
              </h2>
              <p className="text-muted-foreground mt-4">
                Technology serves people. Not the other way around.
              </p>
            </div>

            <div className="approach-pillars-grid grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <article
                    key={pillar.title}
                    className="approach-card rounded-xl border border-white/10 bg-dark/80 p-6"
                  >
                    <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 border border-primary/25 mb-4">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className="text-lg font-serif text-foreground mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {pillar.body}
                    </p>
                  </article>
                );
              })}
            </div>

            <div className="approach-credentials mt-10 py-5 border-t border-white/10 text-center">
              <p className="text-xs font-mono tracking-wider text-muted-foreground/70">
                {credentials}
              </p>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}

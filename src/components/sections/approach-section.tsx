"use client";

import { useEffect, useRef } from "react";
import { gsap } from "../gsap-provider";
import { Brain, Users, Shield, type LucideIcon } from "lucide-react";

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

export function ApproachSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".approach-title",
        { y: 30, opacity: 0 },
        {
          y: 0,
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

      gsap.fromTo(
        ".approach-card",
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: ".approach-grid",
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="approach" className="bg-dark-alt relative">
      <div className="section-padding">
        <div className="max-w-6xl mx-auto">
          <div className="approach-title mb-12 max-w-4xl">
            <span className="text-xs font-mono tracking-wider text-[#ced4da] uppercase">
              Philosophy
            </span>
            <h2 className="text-section font-serif text-foreground mt-4">
              Human-Centered AI
            </h2>
            <p className="text-[#ced4da] mt-4">
              Technology serves people. Not the other way around.
            </p>
          </div>

          <div className="approach-grid grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
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
                  <p className="text-sm text-[#ced4da] leading-relaxed">
                    {pillar.body}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="approach-credentials mt-10 py-5 border-t border-white/10 text-center">
            <p className="text-xs font-mono tracking-wider text-[#ced4da]/70">
              {credentials}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

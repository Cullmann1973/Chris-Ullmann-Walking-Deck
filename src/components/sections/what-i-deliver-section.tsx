"use client";

import { useEffect, useRef } from "react";
import { gsap } from "../gsap-provider";
import {
  Boxes,
  ShieldCheck,
  UsersRound,
  Bot,
  Workflow,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

interface Capability {
  title: string;
  description: string;
  icon: LucideIcon;
}

const capabilities: Capability[] = [
  {
    title: "Business Case to Funding",
    description: "I identify where AI creates measurable value, build the financial case, and get executive sign-off. Every project ties to a real P&L outcome.",
    icon: TrendingUp,
  },
  {
    title: "Governance That Accelerates",
    description: "Legal, Privacy, and Compliance engaged before the first line of code. Guardrails that let teams move faster, not slower.",
    icon: ShieldCheck,
  },
  {
    title: "Agentic AI, Shipped Daily",
    description: "ELLA, Plant Perfect, Cognex Vision, QC Copilot. Working tools built for operators and managers. I write the code, not the deck.",
    icon: Bot,
  },
  {
    title: "Full-Stack AI Architecture",
    description: "From LLM orchestration and RAG pipelines to production deployment. GitHub, Vercel, Next.js, Python. Hands on keyboard every day.",
    icon: Workflow,
  },
  {
    title: "Community of Practice at Scale",
    description: "3 members to 100+, one department to company-wide. Organic growth driven by tools worth using. Kotter methodology, real results.",
    icon: UsersRound,
  },
  {
    title: "1,000+ Trained and Using AI",
    description: "Not a training program. An adoption engine. Champions teach champions. People use it because it solves their actual problems.",
    icon: Boxes,
  },
];

export function WhatIDeliverSection({ focus }: { focus?: string }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".deliver-title",
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
        ".deliver-card",
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: ".deliver-grid",
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
    <section ref={sectionRef} id="what-i-deliver" className="bg-dark relative">
      <div className="section-padding">
        <div className="max-w-6xl mx-auto">
          <div className="deliver-title mb-12 max-w-4xl">
            <span className="text-xs font-mono tracking-wider text-muted-foreground uppercase">
              Capabilities
            </span>
            <h2 className="text-section font-serif text-foreground mt-4">
              What I Deliver
            </h2>
            <p className="text-muted-foreground mt-4">
              I build the business case, build the tool, and build the team that adopts it.
            </p>
          </div>

          <div className="deliver-grid grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
            {capabilities.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="deliver-card rounded-xl border border-white/10 bg-dark-alt/80 p-6"
                >
                  <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 border border-primary/25 mb-4">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="text-lg font-serif text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

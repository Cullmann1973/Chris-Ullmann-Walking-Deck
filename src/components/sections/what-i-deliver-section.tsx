"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Drag to scroll state
  const [isDragging, setIsDragging] = useState(false);
  
  const stateRef = useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
    velocity: 0,
    timestamp: 0,
    animationFrameId: 0,
  });

  const stopMomentum = useCallback(() => {
    if (stateRef.current.animationFrameId) {
      cancelAnimationFrame(stateRef.current.animationFrameId);
      stateRef.current.animationFrameId = 0;
    }
  }, []);

  const momentumLoop = useCallback(() => {
    if (!scrollContainerRef.current) return;
    
    // Apply friction
    stateRef.current.velocity *= 0.95; 
    
    // Stop if velocity is very low
    if (Math.abs(stateRef.current.velocity) < 0.5) {
      stopMomentum();
      return;
    }
    
    scrollContainerRef.current.scrollLeft -= stateRef.current.velocity;
    stateRef.current.animationFrameId = requestAnimationFrame(momentumLoop);
  }, [stopMomentum]);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    
    stopMomentum();
    stateRef.current.isDown = true;
    setIsDragging(true);
    
    stateRef.current.startX = e.pageX - scrollContainerRef.current.offsetLeft;
    stateRef.current.scrollLeft = scrollContainerRef.current.scrollLeft;
    stateRef.current.velocity = 0;
    stateRef.current.timestamp = performance.now();
  }, [stopMomentum]);

  const onMouseLeave = useCallback(() => {
    if (stateRef.current.isDown) {
      stateRef.current.isDown = false;
      setIsDragging(false);
      stateRef.current.animationFrameId = requestAnimationFrame(momentumLoop);
    }
  }, [momentumLoop]);

  const onMouseUp = useCallback(() => {
    if (stateRef.current.isDown) {
      stateRef.current.isDown = false;
      setIsDragging(false);
      stateRef.current.animationFrameId = requestAnimationFrame(momentumLoop);
    }
  }, [momentumLoop]);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!stateRef.current.isDown || !scrollContainerRef.current) return;
    e.preventDefault();
    
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - stateRef.current.startX); // distance moved
    
    // Calculate velocity based on delta movement / delta time
    const now = performance.now();
    const dt = now - stateRef.current.timestamp;
    
    // update position
    const newScrollLeft = stateRef.current.scrollLeft - walk;
    const dx = scrollContainerRef.current.scrollLeft - newScrollLeft;
    
    if (dt > 0) {
      // smooth velocity
      const instantVelocity = dx; 
      stateRef.current.velocity = 0.8 * stateRef.current.velocity + 0.2 * instantVelocity;
    }
    
    scrollContainerRef.current.scrollLeft = newScrollLeft;
    stateRef.current.timestamp = now;
  }, []);

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
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: ".deliver-carousel-wrapper",
            start: "top 85%",
            end: "top 55%",
            scrub: 1.5,
          },
        }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
      stopMomentum();
    };
  }, [stopMomentum]);

  return (
    <section ref={sectionRef} id="what-i-deliver" className="bg-dark relative">
      <div className="pt-24 pb-12 md:pt-32 md:pb-16">
        <div className="max-w-6xl mx-auto px-6 md:px-8 xl:px-0">
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
        </div>

        {/* Full width carousel container */}
        <div className="deliver-carousel-wrapper w-full overflow-hidden">
          <div 
            ref={scrollContainerRef}
            className={`flex gap-5 px-6 md:px-8 xl:px-[calc((100vw-72rem)/2)] overflow-x-auto select-none no-scrollbar touch-pan-x ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            onMouseDown={onMouseDown}
            onMouseLeave={onMouseLeave}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {capabilities.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="deliver-card shrink-0 w-[320px] md:w-[360px] rounded-xl border border-white/10 bg-dark-alt/80 p-6 pointer-events-none"
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
            
            {/* Spacer for right padding on scroll */}
            <div className="shrink-0 w-1 md:w-2 xl:w-[calc((100vw-72rem)/2)]"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

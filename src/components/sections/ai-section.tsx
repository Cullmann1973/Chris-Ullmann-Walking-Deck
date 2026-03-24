"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger } from "../gsap-provider";
import { ExternalLink, Cpu, MessageCircle, ArrowRight } from "lucide-react";

interface AgentDemo {
  id: string;
  name: string;
  description: string;
  preview: string;
  demoUrl: string;
  color: string;
  borderColor: string;
  hoverBorderColor: string;
  glowColor: string;
  badge?: string;
}

const agentDemos: AgentDemo[] = [
  {
    id: "bella",
    name: "ELLA",
    description:
      "Equipment Line-Level Assistant for operator setups, troubleshooting, and SOPs. Presented at Microsoft Ignite.",
    preview: "Ask ELLA about batch setup procedures or equipment troubleshooting steps.",
    demoUrl: "/ella",
    color: "from-pink-500/15 to-rose-500/15",
    borderColor: "border-pink-500/25",
    hoverBorderColor: "hover:border-pink-500/50",
    glowColor: "rgba(236,72,153,0.12)",
    badge: "Featured at Microsoft Ignite",
  },
  {
    id: "supplier-intel",
    name: "Supplier Intel",
    description:
      "Real-time supplier risk monitoring using public news, financial signals, and regulatory data.",
    preview: "Monitor supplier risk scores, news alerts, and financial health in real time.",
    demoUrl: "/supplier-intel",
    color: "from-sky-500/20 to-indigo-500/20",
    borderColor: "border-sky-500/30",
    hoverBorderColor: "hover:border-sky-500/50",
    glowColor: "rgba(14,165,233,0.12)",
  },
  {
    id: "plant-perfect",
    name: "Plant Perfect",
    description:
      "AI strategic planning assistant for manufacturing intelligence. Chat interface for retrospective analysis, strategic planning, schedule optimization, and performance benchmarking.",
    preview: "Ask strategic questions and get data-driven insights for operational reviews, fiscal planning, and performance improvement.",
    demoUrl: "/plant-perfect",
    color: "from-cyan-500/20 to-sky-500/20",
    borderColor: "border-cyan-500/30",
    hoverBorderColor: "hover:border-cyan-500/50",
    glowColor: "rgba(6,182,212,0.12)",
  },
  {
    id: "consumer-pulse",
    name: "Consumer Pulse",
    description:
      "Voice of Customer translator that uncovers quality signals in consumer feedback.",
    preview: "Analyze consumer sentiment and surface hidden quality signals from reviews.",
    demoUrl: "/consumer-pulse",
    color: "from-emerald-500/20 to-green-500/20",
    borderColor: "border-emerald-500/30",
    hoverBorderColor: "hover:border-emerald-500/50",
    glowColor: "rgba(16,185,129,0.12)",
  },
  {
    id: "cognex-vision",
    name: "Cognex Vision",
    description:
      "Vision system troubleshooting copilot for camera setup, OCR, and PLC diagnostics.",
    preview: "Troubleshoot vision cameras, OCR configurations, and PLC integration issues.",
    demoUrl: "/cognex-vision",
    color: "from-cyan-500/20 to-blue-500/20",
    borderColor: "border-cyan-500/30",
    hoverBorderColor: "hover:border-cyan-500/50",
    glowColor: "rgba(6,182,212,0.12)",
  },
  {
    id: "slide-maestro",
    name: "Slide Maestro",
    description:
      "AI presentation co-pilot that transforms ideas into polished slides in minutes.",
    preview: "Turn rough ideas into polished presentation decks with AI assistance.",
    demoUrl: "/qc-copilot",
    color: "from-purple-500/20 to-violet-500/20",
    borderColor: "border-purple-500/30",
    hoverBorderColor: "hover:border-purple-500/50",
    glowColor: "rgba(168,85,247,0.12)",
  },
  {
    id: "inlite-designer",
    name: "in-lite AI Designer",
    description:
      "Upload a yard photo and get a complete outdoor lighting plan: AI vision analysis, product recommendations, electrical calculations, and a dusk render preview.",
    preview: "Try it live: upload any yard photo and get an instant professional lighting design.",
    demoUrl: "/inlite-designer",
    color: "from-amber-500/20 to-yellow-500/20",
    borderColor: "border-amber-500/30",
    hoverBorderColor: "hover:border-amber-500/50",
    glowColor: "rgba(245,158,11,0.12)",
  },
];

function AgentCard({ agent, isHero = false, className = "" }: { agent: AgentDemo; isHero?: boolean; className?: string }) {
  const isInternal = agent.demoUrl.startsWith("/");
  
  const cardContent = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center justify-center rounded-lg bg-gradient-to-br ${agent.color} border ${agent.borderColor} transition-transform duration-300 group-hover:scale-110 ${
              isHero ? "w-10 h-10" : "w-8 h-8"
            }`}
          >
            <Cpu className={`${isHero ? "w-5 h-5" : "w-4 h-4"} text-[#f8f9fa]`} />
          </div>
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-[#f8f9fa] text-sm tracking-tight">
              {agent.name}
            </h4>
            {isInternal && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" title="Try it live" />
            )}
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          {!isInternal && (
            <ExternalLink className="w-4 h-4 text-[#adb5bd] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          )}
          {agent.badge && isHero && (
            <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-mono tracking-wide uppercase border border-pink-500/30 bg-pink-500/10 text-pink-300">
              {agent.badge}
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex-1">
        <p className="text-sm text-[#ced4da] leading-relaxed">
          {agent.description}
        </p>
        <p className="text-[11px] text-[#adb5bd] italic mt-2">
          {agent.preview}
        </p>
      </div>

      {/* Footer / Arrow */}
      <div className="mt-4 flex justify-end overflow-hidden">
        <ArrowRight className="w-4 h-4 text-[#e9ecef] -translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
      </div>
    </div>
  );

  const baseClasses = `group relative p-6 rounded-xl border bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-300 hover:-translate-y-1 block h-full ${agent.borderColor} ${agent.hoverBorderColor} ${className}`;
  const inlineStyle = {
    "--hover-glow": agent.glowColor,
  } as React.CSSProperties;

  return (
    <>
      <style jsx>{`
        .glow-card-${agent.id}:hover {
          box-shadow: 0 8px 32px var(--hover-glow);
        }
      `}</style>
      {isInternal ? (
        <Link
          href={agent.demoUrl}
          className={`${baseClasses} glow-card-${agent.id}`}
          style={inlineStyle}
        >
          {cardContent}
        </Link>
      ) : (
        <a
          href={agent.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${baseClasses} glow-card-${agent.id}`}
          style={inlineStyle}
        >
          {cardContent}
        </a>
      )}
    </>
  );
}

export function AISection({ focus }: { focus?: string }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Section title animation
      gsap.fromTo(
        ".ai-title",
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

      // ELLA hero card animation
      gsap.fromTo(
        ".hero-card",
        { scale: 0.97, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero-card-container",
            start: "top 85%",
            end: "top 60%",
            scrub: 1.5,
          },
        }
      );

      // Row 1 remaining cards sweep in from left
      gsap.fromTo(
        ".row-1-card",
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: ".row-1-container",
            start: "top 85%",
            end: "top 65%",
            scrub: 1.5,
          },
        }
      );

      // Row 2 cards sweep in from right
      gsap.fromTo(
        ".row-2-card",
        { x: 20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: ".row-2-container",
            start: "top 85%",
            end: "top 65%",
            scrub: 1.5,
          },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const openChat = () => {
    window.dispatchEvent(new Event("open-chat-widget"));
  };

  const ellaAgent = agentDemos[0];
  const row1Agents = agentDemos.slice(1, 4);
  const row2Agents = agentDemos.slice(4);

  return (
    <section ref={sectionRef} id="ai" className="bg-dark relative overflow-hidden">
      {/* Subtle tech background for ELLA card area */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          background: "radial-gradient(ellipse at 50% 20%, rgba(212,168,67,0.04) 0%, transparent 60%)"
        }}
      />
      
      <div className="section-padding relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <div className="ai-title mb-12">
            <span className="text-xs font-mono tracking-wider text-[#e9ecef] uppercase">
              From Idea to Production
            </span>
            <h2 className="text-section font-serif text-[#f8f9fa] mt-4">
              Built from Scratch
            </h2>
            <p className="text-[#ced4da] mt-4 max-w-2xl">
              Every solution here started as an idea I had, designed,
              prototyped, and piloted. The ones that proved value earned
              enterprise sponsorship. Some are in production. Others are proofs
              of concept. All of them solve real problems.
            </p>
            
            <div className="mt-8 flex flex-col items-start">
              <div className="relative inline-flex">
                <div className="absolute inset-0 rounded-xl bg-primary/30 animate-ping opacity-75 duration-1000"></div>
                <button
                  onClick={openChat}
                  className="relative inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium z-10 shadow-lg"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat with My AI
                </button>
              </div>
              <span className="text-[10px] text-[#adb5bd] font-mono uppercase tracking-wider mt-3">
                Powered by RAG pipeline
              </span>
            </div>
          </div>

          {/* Bento Grid */}
          <div className="flex flex-col gap-4">
            {/* Row 0: ELLA Hero */}
            <div className="hero-card-container">
              <div className="hero-card">
                <AgentCard 
                  agent={ellaAgent} 
                  isHero={true} 
                  className="min-h-[200px]" 
                />
              </div>
            </div>

            {/* Row 1: Next 3 cards */}
            <div className="row-1-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {row1Agents.map((agent) => (
                <div key={agent.id} className="row-1-card">
                  <AgentCard agent={agent} />
                </div>
              ))}
            </div>

            {/* Row 2: Remaining cards */}
            <div className="row-2-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {row2Agents.map((agent, index) => {
                // Last card spans 2 columns if odd number of cards in this row on larger screens
                // In this case we have 3 cards, so 3rd card can span 2 cols on lg, or 1 on sm
                // Wait, if it's 3 cards, lg:grid-cols-3 handles it perfectly (1 each).
                // But the instructions said "last card spanning 2 columns if there's an odd number".
                // Since 3 is an odd number, maybe it spans 2? If it spans 2, it would overflow a 3-col grid unless we adjust.
                // Let's just make it col-span-1 sm:col-span-2 lg:col-span-1 to match 3 cols exactly on lg, and 2 cols on sm.
                const isLastInOdd = index === row2Agents.length - 1 && row2Agents.length % 2 !== 0;
                return (
                  <div 
                    key={agent.id} 
                    className={`row-2-card ${isLastInOdd ? "sm:col-span-2 lg:col-span-1" : ""}`}
                  >
                    <AgentCard agent={agent} />
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

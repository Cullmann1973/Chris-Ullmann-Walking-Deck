"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger } from "../gsap-provider";
import { ExternalLink, Cpu, MessageCircle } from "lucide-react";

interface AgentDemo {
  id: string;
  name: string;
  description: string;
  preview: string;
  demoUrl: string;
  color: string;
  borderColor: string;
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
    color: "from-pink-500/20 to-rose-500/20",
    borderColor: "border-pink-500/30",
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
  },
];

function AgentCard({ agent }: { agent: AgentDemo }) {
  const isInternal = agent.demoUrl.startsWith("/");
  const cardContent = (
    <>
      {/* Icon + Name */}
      <div className="mb-3">
        <div className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-lg bg-gradient-to-br ${agent.color} flex items-center justify-center border ${agent.borderColor}`}
          >
            <Cpu className="w-4 h-4 text-foreground/80" />
          </div>
          <h4 className="font-medium text-foreground text-sm tracking-tight">
            {agent.name}
          </h4>
          {!isInternal && (
            <ExternalLink className="w-3 h-3 text-muted-foreground/50 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
          )}
        </div>
        {agent.badge && (
          <span className="mt-2 inline-flex px-2 py-0.5 rounded-full text-[10px] font-mono tracking-wide uppercase border border-primary/30 bg-primary/10 text-primary">
            {agent.badge}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-xs text-muted-foreground leading-relaxed">
        {agent.description}
      </p>
    </>
  );

  if (isInternal) {
    return (
      <Link
        href={agent.demoUrl}
        className="agent-card group relative p-5 rounded-xl border border-white/10 bg-white/[0.03] 
                   hover:bg-white/[0.06] hover:border-primary/30 
                   transition-all duration-300 block"
      >
        {cardContent}
      </Link>
    );
  }

  return (
    <a
      href={agent.demoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="agent-card group relative p-5 rounded-xl border border-white/10 bg-white/[0.03] 
                 hover:bg-white/[0.06] hover:border-primary/30 
                 transition-all duration-300 block"
    >
      {cardContent}
    </a>
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

      // Agent cards stagger
      gsap.fromTo(
        ".agent-card",
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: ".agents-grid",
            start: "top 85%",
            end: "top 55%",
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

  return (
    <section ref={sectionRef} id="ai" className="bg-dark relative">
      <div className="section-padding">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <div className="ai-title mb-12">
            <span className="text-xs font-mono tracking-wider text-muted-foreground uppercase">
              From Idea to Production
            </span>
            <h2 className="text-section font-serif text-foreground mt-4">
              Built from Scratch
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl">
              Every solution here started as an idea I had, designed,
              prototyped, and piloted. The ones that proved value earned
              enterprise sponsorship. Some are in production. Others are proofs
              of concept. All of them solve real problems.
            </p>
            <button
              onClick={openChat}
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium"
            >
              <MessageCircle className="w-4 h-4" />
              Chat with My AI
            </button>
          </div>

          {/* Agent tiles grid */}
          <div className="agents-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {agentDemos.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

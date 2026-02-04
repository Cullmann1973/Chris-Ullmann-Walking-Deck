"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "../gsap-provider";
import { ExternalLink, Cpu, MessageCircle } from "lucide-react";

const agentDemos = [
  {
    id: "ella",
    name: "ELLA",
    description:
      "Line assistant for manufacturing operations. Helps operators with setups, troubleshooting, and SOPs.",
    demoUrl: "https://ella-dark.vercel.app",
    color: "from-pink-500/20 to-rose-500/20",
    borderColor: "border-pink-500/30",
  },
  {
    id: "gold-nugget",
    name: "Gold Nugget",
    description:
      "Benchmarking engine that identifies Golden SKUs and closes performance gaps using the Gold Standard method.",
    demoUrl: "https://cc-gold-standard.vercel.app",
    color: "from-amber-500/20 to-yellow-500/20",
    borderColor: "border-amber-500/30",
  },
  {
    id: "plant-perfect",
    name: "Plant Perfect",
    description:
      "HAL 9000-themed manufacturing KPI dashboard for operational reviews, OEE analysis, and plant strategy planning.",
    demoUrl: "https://cc-plant-perfect.vercel.app",
    color: "from-red-500/20 to-rose-500/20",
    borderColor: "border-red-500/30",
  },
  {
    id: "consumer-pulse",
    name: "Consumer Pulse",
    description:
      "Voice of Customer translator that uncovers product quality signals hidden in consumer feedback.",
    demoUrl: "https://cc-consumer-pulse.vercel.app",
    color: "from-emerald-500/20 to-green-500/20",
    borderColor: "border-emerald-500/30",
  },
  {
    id: "cognex-vision",
    name: "Cognex Vision",
    description:
      "Vision system troubleshooting copilot for camera setup, OCR configuration, and PLC diagnostics.",
    demoUrl: "https://cc-cognex-vision.vercel.app",
    color: "from-cyan-500/20 to-blue-500/20",
    borderColor: "border-cyan-500/30",
  },
  {
    id: "slide-maestro",
    name: "Slide Maestro",
    description:
      "AI presentation co-pilot that transforms ideas into polished slides in minutes.",
    demoUrl: "https://cc-slide-maestro.vercel.app",
    color: "from-purple-500/20 to-violet-500/20",
    borderColor: "border-purple-500/30",
  },
];

export function AISection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Section title animation
      gsap.fromTo(
        ".ai-title",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Agent cards stagger
      gsap.fromTo(
        ".agent-card",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".agents-grid",
            start: "top 85%",
            toggleActions: "play none none reverse",
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
              Meet My AI
            </span>
            <h2 className="text-section font-serif text-foreground mt-4">
              Digital Twin
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl">
              AI-powered agents I&apos;ve built for manufacturing operations.
              Have a question? Chat with my digital twin.
            </p>
            <button
              onClick={openChat}
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium"
            >
              <MessageCircle className="w-4 h-4" />
              Chat with My AI
            </button>
          </div>

          {/* Agent demos grid */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center">
                <Cpu className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-serif text-foreground">
                AI Agents I&apos;ve Built
              </h3>
            </div>

            <div className="agents-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {agentDemos.map((agent) => (
                <div
                  key={agent.id}
                  className={`agent-card relative p-5 rounded-xl border ${agent.borderColor} bg-gradient-to-br ${agent.color} transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-black/20`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-foreground">{agent.name}</h4>
                    <a
                      href={agent.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors"
                    >
                      Live
                    </a>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    {agent.description}
                  </p>
                  <a
                    href={agent.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    Try Demo <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

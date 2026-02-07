"use client";

import { useRef, useEffect, useState } from "react";
import { gsap, ScrollTrigger } from "../gsap-provider";
import { ExternalLink, Cpu, MessageCircle, Play } from "lucide-react";

const agentDemos = [
  {
    id: "bella",
    name: "BELLA",
    description:
      "Batch & Equipment Line-Level Assistant for operator setups, troubleshooting, and SOPs.",
    preview: "Ask BELLA about batch setup procedures or equipment troubleshooting steps.",
    demoUrl: "https://ella-demo-app.vercel.app",
    color: "from-pink-500/20 to-rose-500/20",
    borderColor: "border-pink-500/30",
  },
  {
    id: "supplier-intel",
    name: "Supplier Intel",
    description:
      "Real-time supplier risk monitoring using public news, financial signals, and regulatory data.",
    preview: "Monitor supplier risk scores, news alerts, and financial health in real time.",
    demoUrl: "https://supplier-intel-bot.vercel.app",
    color: "from-sky-500/20 to-indigo-500/20",
    borderColor: "border-sky-500/30",
  },
  {
    id: "plant-perfect",
    name: "Plant Perfect",
    description:
      "HAL 9000-themed manufacturing KPI dashboard for OEE analysis and plant strategy.",
    preview: "Explore OEE metrics, downtime analysis, and plant performance dashboards.",
    demoUrl: "https://cc-plant-perfect.vercel.app",
    color: "from-red-500/20 to-rose-500/20",
    borderColor: "border-red-500/30",
  },
  {
    id: "consumer-pulse",
    name: "Consumer Pulse",
    description:
      "Voice of Customer translator that uncovers quality signals in consumer feedback.",
    preview: "Analyze consumer sentiment and surface hidden quality signals from reviews.",
    demoUrl: "https://cc-consumer-pulse.vercel.app",
    color: "from-emerald-500/20 to-green-500/20",
    borderColor: "border-emerald-500/30",
  },
  {
    id: "cognex-vision",
    name: "Cognex Vision",
    description:
      "Vision system troubleshooting copilot for camera setup, OCR, and PLC diagnostics.",
    preview: "Troubleshoot vision cameras, OCR configurations, and PLC integration issues.",
    demoUrl: "https://cc-cognex-vision.vercel.app",
    color: "from-cyan-500/20 to-blue-500/20",
    borderColor: "border-cyan-500/30",
  },
  {
    id: "slide-maestro",
    name: "Slide Maestro",
    description:
      "AI presentation co-pilot that transforms ideas into polished slides in minutes.",
    preview: "Turn rough ideas into polished presentation decks with AI assistance.",
    demoUrl: "https://cc-slide-maestro.vercel.app",
    color: "from-purple-500/20 to-violet-500/20",
    borderColor: "border-purple-500/30",
  },
];

function AgentCard({ agent }: { agent: typeof agentDemos[number] }) {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div
      className={`agent-card group relative p-4 rounded-xl border ${agent.borderColor} bg-gradient-to-br ${agent.color} transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-black/20 overflow-hidden`}
      onMouseEnter={() => setShowPreview(true)}
      onMouseLeave={() => setShowPreview(false)}
      onClick={() => setShowPreview((prev) => !prev)}
    >
      <div className="flex items-center justify-between mb-1.5 gap-2">
        <h4 className="font-semibold text-foreground text-sm">{agent.name}</h4>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed mb-3">
        {agent.description}
      </p>

      {/* Preview tooltip - shows on hover (desktop) or tap (mobile) */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${
          showPreview ? "max-h-20 opacity-100 mb-3" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-3 py-2 rounded-lg bg-black/30 border border-white/5">
          <p className="text-xs text-foreground/70 italic leading-relaxed">
            💡 {agent.preview}
          </p>
        </div>
      </div>

      {/* Prominent Try Demo button */}
      <a
        href={agent.demoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg
                   bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/40
                   text-xs font-medium text-primary hover:text-primary/90
                   transition-all duration-200 group/btn"
      >
        <Play className="w-3 h-3 transition-transform duration-200 group-hover/btn:scale-110" />
        Try Demo
        <ExternalLink className="w-3 h-3 opacity-50" />
      </a>
    </div>
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
              AI agents I&apos;ve ideated and developed for manufacturing operations.
              Some deployed, others in active development. Have a question? Chat with my digital twin.
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
                AI Agents I&apos;ve Created
              </h3>
            </div>

            <div className="agents-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {agentDemos.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

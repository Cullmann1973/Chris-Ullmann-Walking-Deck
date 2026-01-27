"use client";

import { useState, useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "../gsap-provider";
import { Bot, Send, User, Sparkles, ExternalLink, Cpu } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const suggestedQueries = [
  "How did you save $16M at Leiner?",
  "Tell me about your military service.",
  "Tell me about your family.",
  "What makes you a 'builder'?",
];

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

// Fallback responses
const getResponse = (query: string): string => {
  const q = query.toLowerCase();

  if (
    q.includes("16m") ||
    q.includes("leiner") ||
    q.includes("quarantine") ||
    q.includes("inventory")
  ) {
    return "At Leiner Health Products (2002-2007), I identified a critical inefficiency: $16 million in 'quarantine inventory': products held pending quality release. This represented dead cash and wasted warehouse space. As Master Planner III, I re-engineered the entire release process by streamlining batch record reviews and validating faster testing methods. The result? Quarantine inventory dropped to under $200,000, releasing $15.8 million in working capital. This wasn't just cost reduction; it proved that Quality can be a financial asset, not just a compliance function.";
  }

  if (
    q.includes("military") ||
    q.includes("air force") ||
    q.includes("usaf") ||
    q.includes("gulf") ||
    q.includes("veteran") ||
    q.includes("service")
  ) {
    return "I served in the U.S. Air Force from 1992-1996 as an Aerospace Ground Equipment (AGE) Technician. My primary deployment was Operation Provide Comfort II, protecting Kurdish refugees in northern Iraq by enforcing a No-Fly Zone. AGE technicians are the 'unsung mechanics' of air superiority; modern combat aircraft are dormant shells without our external ground support for power, hydraulics, and cooling. I earned two Air Force Achievement Medals. The core tenets of that service (SOPs, preventative maintenance, zero-defect mentality) became the permanent operating system for my entire career.";
  }

  if (
    q.includes("family") ||
    q.includes("personal") ||
    q.includes("wife") ||
    q.includes("daughter") ||
    q.includes("leslie") ||
    q.includes("bella") ||
    q.includes("emmi")
  ) {
    return "Family is where I apply the same precision I bring to work. My wife Leslie is my true partner: we manage life, career, real estate, and family as a coordinated team. I have two daughters: Isabella 'Bella' (born 2009) lives in North Carolina, and being present for her despite the distance required turning logistics into a love language. Emilia 'Emmi' (born 2019) attends the Long Island School for the Gifted. In 2024, Leslie and I established a home in Mililani, Hawaii, a sanctuary where the 'Builder' can rest.";
  }

  if (
    q.includes("builder") ||
    q.includes("maker") ||
    q.includes("3d print") ||
    q.includes("build")
  ) {
    return "I call it the 'builder mindset': the urge to construct and optimize that transcends any single role. Whether it's a supply chain governance model, a Python automation script, or a 3D-printed prototype, I'm driven to create. I taught myself 3D modeling (Shapr3D), 3D printing (FDM & resin), hardware integration, and Python scripting. This continuous learning keeps my 'hands dirty' with real making. Every technical skill I have is self-taught.";
  }

  return "My career bridges industrial discipline with digital innovation. From Air Force avionics to Fortune 500 quality leadership to GenAI strategy, I've spent 25+ years building systems that deliver measurable results. I'm a builder at heart, whether it's a $500M transformation roadmap or a 3D-printed prototype. What specific aspect of my experience would you like to explore?";
};

export function AISection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

      // Chat container animation
      gsap.fromTo(
        ".chat-container",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".chat-container",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingContent]);

  const handleSubmit = async (query: string) => {
    if (!query.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: query.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    setStreamingContent("");

    // Try AI-powered response
    try {
      const response = await fetch("/api/ask-chris", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullContent = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ") && line !== "data: [DONE]") {
              try {
                const data = JSON.parse(line.slice(6));
                if (data.text) {
                  fullContent += data.text;
                  setStreamingContent(fullContent);
                }
              } catch {
                // Skip invalid JSON
              }
            }
          }
        }
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          fullContent ||
          "I apologize, I could not generate a response. Please try again.",
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setStreamingContent("");
      setIsTyping(false);
      return;
    } catch {
      // Fall back to hardcoded responses
      setTimeout(() => {
        const response = getResponse(query);
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: response,
        };
        setMessages((prev) => [...prev, assistantMessage]);
        setIsTyping(false);
      }, 800);
    }
  };

  return (
    <section ref={sectionRef} id="ai" className="bg-dark relative">
      <div className="section-padding">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <div className="ai-title mb-12">
            <span className="text-xs font-mono tracking-wider text-muted-foreground uppercase">
              Ask Chris
            </span>
            <h2 className="text-section font-serif text-foreground mt-4">
              Digital Twin
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl">
              AI-powered agents I&apos;ve built for manufacturing operations, plus an
              interactive chat with my digital twin.
            </p>
          </div>

          {/* Agent demos grid */}
          <div className="mb-16">
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
                  className={`agent-card relative p-5 rounded-xl border ${agent.borderColor} bg-gradient-to-br ${agent.color} transition-transform hover:scale-[1.02]`}
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

          {/* Chat interface */}
          <div className="chat-container content-card overflow-hidden">
            {/* Chat header */}
            <div className="bg-gradient-to-r from-primary to-primary/80 px-6 py-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Ask Chris</h3>
                <p className="text-xs text-white/70">AI-powered digital twin</p>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-white/70">Online</span>
              </div>
            </div>

            {/* Messages area */}
            <div className="p-6 space-y-6 min-h-[350px] max-h-[500px] overflow-y-auto">
              {/* Welcome message */}
              {messages.length === 0 && (
                <div className="text-center py-8">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-7 h-7 text-primary" />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">
                    Welcome to the Digital Twin
                  </h4>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
                    Ask me anything about my career, achievements, or leadership
                    philosophy.
                  </p>

                  {/* Suggested queries */}
                  <div className="flex flex-wrap justify-center gap-2">
                    {suggestedQueries.map((query, index) => (
                      <button
                        key={index}
                        onClick={() => handleSubmit(query)}
                        className="px-4 py-2 rounded-lg text-sm bg-secondary/50 text-foreground border border-border hover:border-primary/50 hover:bg-primary/10 transition-all"
                      >
                        {query}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Messages */}
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-4 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-xl px-4 py-3 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary border border-border"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                  {message.role === "user" && (
                    <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-muted-foreground" />
                    </div>
                  )}
                </div>
              ))}

              {/* Typing indicator / Streaming */}
              {isTyping && (
                <div className="flex gap-4">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-secondary border border-border rounded-xl px-4 py-3 max-w-[80%]">
                    {streamingContent ? (
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {streamingContent}
                        <span className="animate-pulse">|</span>
                      </p>
                    ) : (
                      <div className="flex gap-1">
                        <span
                          className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        />
                        <span
                          className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        />
                        <span
                          className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="border-t border-border bg-secondary/30 px-6 py-4">
              {/* Quick suggestions (when in conversation) */}
              {messages.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {suggestedQueries.map((query) => (
                    <button
                      key={query}
                      onClick={() => handleSubmit(query)}
                      className="px-3 py-1.5 rounded-full text-xs font-mono bg-background text-foreground border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors"
                    >
                      {query}
                    </button>
                  ))}
                </div>
              )}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(input);
                }}
                className="flex gap-3"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question..."
                  className="flex-1 px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="px-5 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>

            {/* Footer */}
            <div className="bg-secondary/50 px-6 py-3 text-center">
              <p className="text-xs text-muted-foreground">
                Not a generic chatbot. Built by Chris, grounded in verified
                career data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

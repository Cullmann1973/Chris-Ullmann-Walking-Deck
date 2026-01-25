"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, User, Sparkles, Terminal, ExternalLink, Cpu } from "lucide-react";

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

// Agent demos data
const agentDemos = [
  {
    id: "ella",
    name: "ELLA",
    description: "Line assistant for manufacturing operations. Helps operators with setups, troubleshooting, and SOPs.",
    status: "live" as const,
    demoUrl: "https://ella-demo-lni6jjbh0-chris-ullmanns-projects.vercel.app/",
    color: "from-pink-500/20 to-rose-500/20",
    borderColor: "border-pink-500/30",
  },
  {
    id: "gold-nugget",
    name: "Gold Nugget",
    description: "Benchmarking engine that identifies Golden SKUs and closes performance gaps using the Gold Standard method.",
    status: "coming-soon" as const,
    demoUrl: null,
    color: "from-amber-500/20 to-yellow-500/20",
    borderColor: "border-amber-500/30",
  },
  {
    id: "consumer-pulse",
    name: "Consumer Pulse",
    description: "Voice of Customer translator that uncovers product quality signals hidden in consumer feedback.",
    status: "coming-soon" as const,
    demoUrl: null,
    color: "from-emerald-500/20 to-green-500/20",
    borderColor: "border-emerald-500/30",
  },
  {
    id: "slide-maestro",
    name: "Slide Maestro",
    description: "Presentation generator that turns ideas into polished slides in minutes.",
    status: "coming-soon" as const,
    demoUrl: null,
    color: "from-purple-500/20 to-violet-500/20",
    borderColor: "border-purple-500/30",
  },
];

// Enhanced responses based on the full biography
const getResponse = (query: string): string => {
  const q = query.toLowerCase();

  // Leiner / $16M / Inventory
  if (q.includes("16m") || q.includes("leiner") || q.includes("quarantine") || q.includes("inventory")) {
    return "At Leiner Health Products (2002-2007), I identified a critical inefficiency: $16 million in 'quarantine inventory' -products held pending quality release. This represented dead cash and wasted warehouse space. As Master Planner III, I re-engineered the entire release process by streamlining batch record reviews and validating faster testing methods. The result? Quarantine inventory dropped to under $200,000 -releasing $15.8 million in working capital. This wasn't just cost reduction; it proved that Quality can be a financial asset, not just a compliance function.";
  }

  // Military / Air Force / Gulf War
  if (q.includes("military") || q.includes("air force") || q.includes("usaf") || q.includes("gulf") || q.includes("veteran") || q.includes("service")) {
    return "I served in the U.S. Air Force from 1992-1996 as an Aerospace Ground Equipment (AGE) Technician. My primary deployment was Operation Provide Comfort II -protecting Kurdish refugees in northern Iraq by enforcing a No-Fly Zone. AGE technicians are the 'unsung mechanics' of air superiority; modern combat aircraft are dormant shells without our external ground support for power, hydraulics, and cooling. I earned two Air Force Achievement Medals, which in military terms indicates consistently exceeding standards. The core tenets of that service -SOPs, preventative maintenance, zero-defect mentality -became the permanent operating system for my entire career.";
  }

  // AI / GenAI / Strategy / Stanford
  if (q.includes("ai") || q.includes("genai") || q.includes("artificial intelligence") || q.includes("stanford") || q.includes("transformation")) {
    return "My AI strategy is practical and value-driven. At Estée Lauder, I'm piloting 20+ GenAI use cases focused on real problems: automating SOP generation, creating real-time KPI dashboards, and using AI to diagnose line stoppages from historical data. I've trained 600+ employees through our 'AI Core Tech Team' enablement program -democratizing AI by putting tools in the hands of engineers and scientists, not siloing it in IT. My Stanford certification (XFM110) covers Transformers, LLMs, Chain-of-Thought reasoning, and the HELM framework for evaluating model bias and accuracy. The key insight: AI is a force multiplier for human expertise, not a replacement.";
  }

  // Builder / Maker / 3D Printing
  if (q.includes("builder") || q.includes("maker") || q.includes("3d print") || q.includes("build") || q.includes("craftsman")) {
    return "I call it the 'builder mindset' -the urge to construct and optimize that transcends any single role. Whether it's a supply chain governance model, a Python automation script, or a 3D-printed prototype, I'm driven to create. I taught myself 3D modeling (Shapr3D), 3D printing (FDM & resin), hardware integration, and Python scripting. This continuous learning keeps my 'hands dirty' with real making -the same curiosity that drove me to understand hydraulics in the Air Force now drives me to understand AI architectures. Every technical skill I have is self-taught.";
  }

  // Leadership / Philosophy
  if (q.includes("leadership") || q.includes("philosophy") || q.includes("manage") || q.includes("style")) {
    return "My leadership philosophy centers on 'Integrated Architecture' -bridging disciplines that traditionally operate in silos. I speak the languages of the shop floor (mechanics), the lab (biology), the boardroom (strategy), and the code repository (AI). From the Air Force, I learned that zero-defect thinking isn't about perfection -it's about building systems that catch errors before they become failures. I use Kotter's 8-Step Change Model to drive transformation 'from the floor up,' not just top-down. At ELC, a grassroots continuous improvement program I launched generated $1 million in savings in just 90 days by empowering frontline teams.";
  }

  // Estée Lauder / ELC / Current Role
  if (q.includes("estee") || q.includes("elc") || q.includes("lauder") || q.includes("current") || q.includes("beauty")) {
    return "I joined The Estée Lauder Companies in 2015 and currently serve as Executive Director, PMO, Strategy & Transformation for North America. My journey here started in Quality Assurance, where I reduced lab testing turnaround from 12 days to 2.7 days, releasing over $30 million annually in inventory working capital. I then led 'Leading Beauty Forward,' managing a $49M budget and delivering 170% ROI. Now I'm focused on integrating GenAI into our operations. ELC is the global leader in prestige beauty, and I'm helping architect its transition into the Fourth Industrial Revolution -bridging our industrial heritage with cutting-edge AI capabilities.";
  }

  // Education / Biology / Queens College
  if (q.includes("education") || q.includes("biology") || q.includes("degree") || q.includes("queens") || q.includes("college")) {
    return "After my Air Force service, I earned a B.S. in Biology from Queens College (CUNY) in 2002. This was a strategic pivot: my military experience was electromechanical, but my degree focused on biological sciences. This synthesis is rare and valuable in manufacturing. I can talk to scientists about bacterial growth AND to engineers about HVAC filtration. Understanding microbiology and sterility is essential in pharma and cosmetics where contamination is the primary risk. Combined with my mechanical background, I became a 'technical biologist' -fluent in both the lab and the production floor.";
  }

  // Quality / FDA / Regulatory
  if (q.includes("quality") || q.includes("fda") || q.includes("regulatory") || q.includes("gmp") || q.includes("compliance")) {
    return "Quality isn't just compliance -it's competitive advantage. At EI Pharmaceutical (2008-2010), I led the transformation from cosmetic to pharmaceutical manufacturing, serving as primary FDA liaison and validating water systems, HVAC, and equipment to GMP standards. At Coty, I cut non-moving inventory from $1.5M to under $200K and reduced supplier quality incidents by 60%. At ELC, I revolutionized lab testing turnaround times from 12 to 2.7 days. The common thread: treating Quality as a business enabler that unlocks cash flow, not a cost center that slows things down.";
  }

  // ROI / Results / Metrics
  if (q.includes("roi") || q.includes("result") || q.includes("metric") || q.includes("achieve") || q.includes("impact")) {
    return "I measure success in hard numbers: $16M→$200K quarantine inventory reduction at Leiner. 12→2.7 days lab turnaround at ELC (freeing $45M annually). 170% ROI on a $49M transformation initiative. 60% reduction in supplier quality incidents at Coty. 600+ employees trained in AI enablement. $1M saved in 90 days through grassroots improvement. 20+ GenAI use cases piloted. I've learned that the best way to earn trust for the next initiative is to deliver measurable results on the current one.";
  }

  // Hawaii / Real Estate / Investment
  if (q.includes("hawaii") || q.includes("real estate") || q.includes("investment") || q.includes("asset")) {
    return "Beyond my corporate role, I actively manage real estate investments. In 2024, my wife Leslie and I acquired a property in Mililani, Hawaii -a $1.3M single-family residence currently leased for $4,200/month. I handle all asset management remotely: negotiating lease extensions, managing capital improvements, coordinating maintenance across time zones. It demonstrates my ability to run operations regardless of geography and apply the same systematic approach I use professionally to personal investments.";
  }

  // Family / Personal
  if (q.includes("family") || q.includes("personal") || q.includes("wife") || q.includes("daughter") || q.includes("leslie") || q.includes("bella") || q.includes("isabella") || q.includes("emmi") || q.includes("emilia")) {
    return "Family is where I apply the same precision I bring to work. My wife Leslie is my true partner -we manage life, career, real estate, and family as a coordinated team. I have two daughters: Isabella 'Bella' (born 2009) lives in North Carolina, and being present for her despite the distance required turning logistics into a love language -managing Track Out schedules, unaccompanied minor flights, and maximizing every moment together. Emilia 'Emmi' (born 2019) attends the Long Island School for the Gifted. In 2024, Leslie and I established a home in Mililani, Hawaii -a sanctuary where the 'Builder' can rest. The Pacific chapter represents a strategic pivot toward balance.";
  }

  // Maker / Design Philosophy / Building
  if (q.includes("maker") || q.includes("bench") || q.includes("design philosophy") || q.includes("why") || q.includes("tinkering") || q.includes("prototype")) {
    return "I build things at every level, not metaphorically: physically. My workbench has a 3D printer running Shapr3D designs, Python scripts automating processes, and hardware prototypes in various states of completion. Every skill I have is self-taught, driven by a simple rule: if I need it, I'll learn to make it. That same instinct applies to my professional work. The governance frameworks, AI agents, and transformation roadmaps I create are just different materials on a different bench. Most executives either strategize or operate. I do both because I never stopped being a maker.";
  }

  // Community / JBN / Volunteering
  if (q.includes("community") || q.includes("jbn") || q.includes("jewish") || q.includes("volunteer") || q.includes("mentor") || q.includes("mental health")) {
    return "I believe business success should be a vehicle for community impact. I'm active in the Jewish Business Network (JBN) of Long Island, participating in executive roundtables and the Giving Pledge initiative. At work, I've championed mental health as a priority -launching Wellbeing and Employee Resource Groups because I recognize that true strength involves acknowledging and supporting psychological safety. As a disabled Gulf War veteran, I stay connected to the military community. And I mentor others, whether guiding newcomers through technical decisions or advocating for women in supply chain roles. The knowledge I've accumulated is meant to lift others up.";
  }

  // Default response
  return "My career bridges industrial discipline with digital innovation. From Air Force avionics to Fortune 500 quality leadership to GenAI strategy, I've spent 25+ years building systems that deliver measurable results. I'm a builder at heart -whether it's a $500M transformation roadmap or a 3D-printed prototype. What specific aspect of my experience would you like to explore?";
};

export default function AICopilotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const [useAI, setUseAI] = useState(true); // Toggle between AI and fallback
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

    // Try AI-powered response first
    if (useAI) {
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

        // Add completed message
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: fullContent || "I apologize, I could not generate a response. Please try again.",
        };
        setMessages((prev) => [...prev, assistantMessage]);
        setStreamingContent("");
        setIsTyping(false);
        return;
      } catch (error) {
        console.error("AI response error:", error);
        // Fall back to hardcoded responses
      }
    }

    // Fallback to hardcoded responses
    setTimeout(() => {
      const response = getResponse(query);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 800 + Math.random() * 800);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="px-6 pt-20 pb-6 lg:px-12 border-b border-border">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-6">
              <Bot className="w-4 h-4 text-primary" />
              <span className="text-xs font-mono tracking-wider text-primary uppercase">
                Digital Twin Interface
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
              AI Co-Pilot
            </h1>
            <p className="text-muted-foreground">
              Ask Chris&apos;s digital twin about his experience, philosophy, and achievements.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Agent Demos Section */}
      <div className="px-6 py-8 lg:px-12 border-b border-border bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Cpu className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">AI Agents I&apos;ve Built</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Production AI systems designed to solve real manufacturing challenges.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {agentDemos.map((agent) => (
                <motion.div
                  key={agent.id}
                  whileHover={{ scale: 1.02 }}
                  className={`relative p-4 rounded-xl border ${agent.borderColor} bg-gradient-to-br ${agent.color} backdrop-blur-sm`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-foreground">{agent.name}</h3>
                    {agent.status === "live" ? (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        Live Demo
                      </span>
                    ) : (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{agent.description}</p>
                  {agent.demoUrl ? (
                    <a
                      href={agent.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      Try Demo <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span className="text-sm text-muted-foreground/60">Demo in development</span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-6 py-6 lg:px-12">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Welcome Message */}
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-6">
                <Terminal className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Welcome to the Command Interface
              </h2>
              <p className="text-muted-foreground text-sm max-w-md mx-auto mb-8">
                I&apos;m Chris&apos;s digital twin. Ask me anything about his career,
                achievements, or leadership philosophy.
              </p>

              {/* Suggested Queries */}
              <div className="flex flex-wrap justify-center gap-3">
                {suggestedQueries.map((query) => (
                  <button
                    key={query}
                    onClick={() => handleSubmit(query)}
                    className="px-4 py-2 rounded-lg glass-card text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
                  >
                    <Sparkles className="w-3 h-3 inline mr-2 text-primary" />
                    {query}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Messages */}
          <AnimatePresence mode="popLayout">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex gap-4 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-primary" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-xl p-4 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border shadow-sm"
                  }`}
                >
                  <p className={`text-sm leading-relaxed ${message.role === "assistant" ? "text-foreground" : ""}`}>{message.content}</p>
                </div>
                {message.role === "user" && (
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-muted-foreground" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator / Streaming Content */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-4"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <div className="bg-card border border-border shadow-sm rounded-xl p-4 max-w-[80%]">
                {streamingContent ? (
                  <p className="text-sm leading-relaxed whitespace-pre-wrap text-foreground">{streamingContent}<span className="animate-pulse">|</span></p>
                ) : (
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                )}
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-border px-6 py-4 lg:px-12">
        <div className="max-w-3xl mx-auto">
          {/* Suggested Queries (when in conversation) */}
          {messages.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {suggestedQueries.map((query) => (
                <button
                  key={query}
                  onClick={() => handleSubmit(query)}
                  className="px-3 py-1.5 rounded-full text-xs font-mono bg-muted text-muted-foreground hover:text-foreground border border-transparent hover:border-border transition-colors"
                >
                  {query}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(input);
            }}
            className="flex gap-3"
          >
            <div className="flex-1 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary font-mono text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="px-4 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>

          <p className="text-xs text-muted-foreground text-center mt-3">
            Not a generic chatbot. This AI was built by Chris, grounded in verified career data using modern LLM architecture.
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, Send, User, Sparkles, X } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const suggestedQueries = [
  "What's your background?",
  "How did you save $16M at Leiner?",
  "Tell me about your military service.",
  "What makes you a 'translator'?",
  "Tell me about the Coty consolidation.",
  "What AI tools have you built?",
];

// Fallback responses
const getResponse = (query: string): string => {
  const q = query.toLowerCase();

  if (q.includes("16m") || q.includes("leiner") || q.includes("quarantine") || q.includes("inventory")) {
    return "At Leiner Health Products, I reduced quarantine inventory from $16M to under $200K across 5 U.S. plants by re-engineering the release process. Would you like to hear more about how I did it?";
  }

  if (q.includes("military") || q.includes("air force") || q.includes("usaf") || q.includes("gulf") || q.includes("veteran") || q.includes("service")) {
    return "I served in the U.S. Air Force from 1992-1996 as an Aerospace Ground Equipment (AGE) Technician, deployed to Incirlik Air Base, Turkey for Operation Provide Comfort II. Two Air Force Achievement Medals. Would you like to hear more about how that shaped my career?";
  }

  if (q.includes("family") || q.includes("personal") || q.includes("wife") || q.includes("daughter") || q.includes("leslie")) {
    return "I keep family details private, but I'm happy to talk about my work and career. My wife Leslie is my partner in everything, and I have two daughters who remind me why I build. What else would you like to know?";
  }

  if (q.includes("translator") || q.includes("translate") || q.includes("bridge") || q.includes("connect")) {
    return "I bridge the gap between what AI can do and what operations actually needs. I speak both strategy and shop-floor fluently. Leaders at Microsoft and ELC senior leadership have called this a rare skill. Would you like to hear more about how that works in practice?";
  }

  if (q.includes("coty") || q.includes("consolidat") || q.includes("phoenix") || q.includes("sanford")) {
    return "I led Quality and Compliance through Coty's Phoenix-to-Sanford manufacturing consolidation, delivering $39M in first-year savings with zero compliance disruption. The work was featured in Harvard Business Review. Would you like to hear more about the approach?";
  }

  if (q.includes("ai") || q.includes("agent") || q.includes("tool") || q.includes("bella") || q.includes("ella") || q.includes("genai")) {
    return "I'm piloting 20+ GenAI use cases at Estee Lauder across manufacturing, quality, and supply chain. I've created tools like BELLA (Business Enabled Line-Level Assistant), Plant Perfect (OEE analytics), and Gold Nugget (benchmarking). Would you like to hear more about any of these?";
  }

  return "I've spent 25+ years bridging industrial discipline with digital innovation, from Air Force technician to Fortune 500 AI transformation leader. What specific aspect of my experience would you like to explore?";
};

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close on escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Listen for custom event to open chat (from other components)
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-chat-widget", handleOpen);
    return () => window.removeEventListener("open-chat-widget", handleOpen);
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

      if (!response.ok) throw new Error("API request failed");

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
        content: fullContent || "I could not generate a response. Please try again.",
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setStreamingContent("");
      setIsTyping(false);
    } catch {
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
    <>
      {/* Floating chat bubble trigger */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-4 sm:right-6 z-50 flex items-center justify-center
                     w-14 h-14 rounded-full
                     bg-primary/10 hover:bg-primary/20 border border-primary/30
                     transition-all duration-300
                     hover:scale-105 hover:shadow-[0_0_20px_rgba(0,188,212,0.3)]
                     backdrop-blur-sm"
          aria-label="Open Meet My AI chat"
        >
          <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
          </span>
        </button>
      )}

      {/* Chat overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Chat window */}
          <div className="relative w-full max-w-2xl h-[90vh] max-h-[700px] bg-background rounded-2xl border border-border shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-primary/80 px-5 py-4 flex items-center gap-3 flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white">Meet My AI</h3>
                <p className="text-xs text-white/70">Ask me about my career and experience</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs text-white/70">Online</span>
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {/* Welcome */}
              {messages.length === 0 && (
                <div className="text-center py-6">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground mb-1">
                    Hi, I&apos;m Chris&apos;s digital twin.
                  </h4>
                  <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-5">
                    Ask me anything about my career, accomplishments, or how I approach transformation.
                  </p>

                  <div className="flex flex-wrap justify-center gap-2">
                    {suggestedQueries.map((query, index) => (
                      <button
                        key={index}
                        onClick={() => handleSubmit(query)}
                        className="px-3 py-1.5 rounded-lg text-sm bg-secondary/50 text-foreground border border-border hover:border-primary/50 hover:bg-primary/10 transition-all"
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
                  className={`flex gap-3 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0 mt-0.5">
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
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  </div>
                  {message.role === "user" && (
                    <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                      <User className="w-4 h-4 text-muted-foreground" />
                    </div>
                  )}
                </div>
              ))}

              {/* Typing / Streaming */}
              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-secondary border border-border rounded-xl px-4 py-3 max-w-[80%]">
                    {streamingContent ? (
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {streamingContent}
                        <span className="animate-pulse">|</span>
                      </p>
                    ) : (
                      <div className="flex gap-1 py-1">
                        <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="border-t border-border bg-secondary/30 px-5 py-4 flex-shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(input);
                }}
                className="flex gap-3"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
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
          </div>
        </div>
      )}
    </>
  );
}

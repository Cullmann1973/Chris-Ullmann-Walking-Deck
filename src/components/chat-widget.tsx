"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";

type ChatMessage = {
  id: number;
  role: "assistant" | "user";
  content: string;
  isVerificationExchange?: boolean;
};

const GREETING =
  "Hi, I am Chris Ullmann AI assistant. Ask me anything about his background, experience, or approach to AI transformation.";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verified, setVerified] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 0,
      role: "assistant",
      content: GREETING,
    },
  ]);

  const nextIdRef = useRef(1);
  const inputRef = useRef<HTMLInputElement>(null);
  const streamAbortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isTyping = useMemo(() => {
    const last = messages[messages.length - 1];
    return isSending && last?.role === "assistant" && last.content.length === 0;
  }, [messages, isSending]);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-chat-widget", handleOpen);
    return () => window.removeEventListener("open-chat-widget", handleOpen);
  }, []);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  useEffect(() => {
    return () => {
      streamAbortRef.current?.abort();
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const question = input.trim();
    if (!question || isSending) {
      return;
    }

    setError(null);
    setInput("");
    setIsOpen(true);
    setIsSending(true);

    const userMessage: ChatMessage = {
      id: nextIdRef.current++,
      role: "user",
      content: question,
    };
    const assistantMessage: ChatMessage = {
      id: nextIdRef.current++,
      role: "assistant",
      content: "",
    };

    // Filter out verification exchange messages from LLM history
    const messageHistory = [...messages, userMessage]
      .filter((m) => !m.isVerificationExchange)
      .map((message) => ({
        role: message.role,
        content: message.content,
      }));

    setMessages((current) => [...current, userMessage, assistantMessage]);

    try {
      const abortController = new AbortController();
      streamAbortRef.current = abortController;

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: messageHistory, verified }),
        signal: abortController.signal,
      });

      if (!response.ok) {
        const body = await response.text();
        let errorMessage = "Unable to reach AI assistant right now.";

        if (body) {
          try {
            const parsed = JSON.parse(body) as { error?: string };
            if (parsed.error) {
              errorMessage = parsed.error;
            }
          } catch {
            errorMessage = body;
          }
        }

        throw new Error(errorMessage);
      }

      if (!response.body) {
        throw new Error("Empty response body from chat API.");
      }

      // Check if this response is a verification confirmation
      const isVerificationResponse =
        response.headers.get("X-Chat-Verified") === "true" && !verified;

      if (isVerificationResponse) {
        setVerified(true);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let combined = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }

        combined += decoder.decode(value, { stream: true });

        setMessages((current) =>
          current.map((message) =>
            message.id === assistantMessage.id
              ? { ...message, content: combined }
              : message
          )
        );
      }

      combined += decoder.decode();
      if (combined) {
        setMessages((current) =>
          current.map((message) =>
            message.id === assistantMessage.id
              ? { ...message, content: combined }
              : message
          )
        );
      }

      // Mark verification exchange messages so they are excluded from future LLM history
      if (isVerificationResponse) {
        setMessages((current) =>
          current.map((message) =>
            message.id === userMessage.id || message.id === assistantMessage.id
              ? { ...message, isVerificationExchange: true }
              : message
          )
        );
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Unable to reach AI assistant right now.";

      setError(errorMessage);
      setMessages((current) =>
        current.map((message) =>
          message.id === assistantMessage.id
            ? {
                ...message,
                content:
                  "I hit a temporary issue and couldn't respond. Please try again in a moment.",
              }
            : message
        )
      );
    } finally {
      streamAbortRef.current = null;
      setIsSending(false);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-[90] flex flex-col items-end gap-3">
      {isOpen && (
        <section
          id="chat-widget"
          aria-label="Chat assistant"
          className="overflow-hidden rounded-2xl border border-[rgba(212,168,67,0.35)] bg-[rgba(30,36,50,0.75)] text-white shadow-[0_20px_50px_rgba(0,0,0,0.45)] backdrop-blur-xl"
          style={{
            width: "min(380px, calc(100vw - 1.5rem))",
            height: "min(560px, 72vh)",
          }}
        >
          <header className="flex items-center justify-between border-b border-[rgba(212,168,67,0.28)] bg-[linear-gradient(135deg,rgba(30,36,50,0.95),rgba(19,24,34,0.92))] px-4 py-3">
            <div>
              <div className="flex items-center gap-2">
                <p className="font-serif text-[15px] leading-none text-[rgba(212,168,67,0.95)]">
                  Ask Chris AI
                </p>
                {verified && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span className="text-[9px] font-mono uppercase tracking-wider text-emerald-400">
                      Verified
                    </span>
                  </span>
                )}
              </div>
              <p className="mt-1 text-[11px] font-mono uppercase tracking-[0.14em] text-white/60">
                Portfolio Assistant
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-md p-1.5 text-white/70 transition hover:bg-white/10 hover:text-white"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </header>

          <div
            ref={scrollRef}
            className="h-[calc(100%-124px)] space-y-3 overflow-y-auto bg-[rgba(10,13,20,0.35)] px-3.5 py-3"
          >
            {messages.map((message) => {
              const isAssistant = message.role === "assistant";
              return (
                <div
                  key={message.id}
                  className={`flex ${isAssistant ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl border px-3 py-2.5 text-sm leading-relaxed ${
                      isAssistant
                        ? "border-[rgba(212,168,67,0.2)] bg-[rgba(16,20,29,0.72)] text-white/90"
                        : "border-[rgba(212,168,67,0.5)] bg-[rgba(212,168,67,0.16)] text-[#f8e8bc]"
                    }`}
                  >
                    {isTyping && message.content.length === 0 ? (
                      <span className="inline-flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#D4A843]" />
                        <span
                          className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#D4A843]"
                          style={{ animationDelay: "140ms" }}
                        />
                        <span
                          className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#D4A843]"
                          style={{ animationDelay: "280ms" }}
                        />
                        <span className="ml-1 text-xs uppercase tracking-wide text-[#d6bf80]">
                          typing
                        </span>
                      </span>
                    ) : (
                      message.content
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <form
            onSubmit={handleSubmit}
            className="border-t border-[rgba(212,168,67,0.25)] bg-[rgba(14,18,26,0.9)] p-3"
          >
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about impact, leadership, or AI strategy..."
                className="h-10 w-full rounded-xl border border-[rgba(212,168,67,0.35)] bg-[rgba(8,10,15,0.85)] px-3 text-sm text-white placeholder:text-white/45 outline-none transition focus:border-[#D4A843]"
                disabled={isSending}
              />
              <button
                type="submit"
                disabled={isSending || input.trim().length === 0}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#D4A843] text-[#1E2432] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            {error && (
              <p className="mt-2 text-xs text-[#efc1c1]" role="status" aria-live="polite">
                {error}
              </p>
            )}
          </form>
        </section>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls="chat-widget"
        className="group relative inline-flex h-14 w-14 items-center justify-center rounded-full border border-[rgba(212,168,67,0.65)] bg-[radial-gradient(circle_at_30%_25%,rgba(212,168,67,0.35),rgba(30,36,50,0.95)_65%)] text-[#f5d680] shadow-[0_12px_30px_rgba(0,0,0,0.55)] transition duration-300 hover:scale-[1.03] hover:border-[#D4A843]"
      >
        <span className="pointer-events-none absolute inset-0 rounded-full bg-[conic-gradient(from_200deg,rgba(212,168,67,0.5),transparent,rgba(212,168,67,0.4))] opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100" />
        {isOpen ? <X className="relative h-5 w-5" /> : <MessageCircle className="relative h-5 w-5" />}
      </button>
    </div>
  );
}

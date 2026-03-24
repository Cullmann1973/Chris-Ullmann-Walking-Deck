"use client";

import { useState, useEffect, useRef } from "react";
import { Lock } from "lucide-react";

const PASSWORD = "purplesquirrel";

export function PasswordGate({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [checking, setChecking] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  // Check sessionStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("blueprint-auth");
      if (stored === "true") {
        setAuthenticated(true);
      }
      setChecking(false);
    }
  }, []);

  // Auto-focus input
  useEffect(() => {
    if (!authenticated && !checking && inputRef.current) {
      inputRef.current.focus();
    }
  }, [authenticated, checking]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.toLowerCase() === PASSWORD) {
      sessionStorage.setItem("blueprint-auth", "true");
      setAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setInput("");
      setTimeout(() => setError(false), 2000);
    }
  };

  // Don't flash anything while checking
  if (checking) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (authenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* CU Logo */}
        <div className="flex items-end justify-center mb-12">
          <span
            className="cu-logo-font text-foreground leading-none select-none"
            style={{ fontSize: "clamp(60px, 14vh, 110px)" }}
          >
            C
          </span>
          <span
            className="cu-logo-font text-primary leading-none select-none"
            style={{ fontSize: "clamp(60px, 14vh, 110px)" }}
          >
            U
          </span>
        </div>

        {/* Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#ced4da]/50" />
            <input
              ref={inputRef}
              type="password"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter password"
              className={`w-full pl-11 pr-4 py-3.5 rounded-xl bg-dark-alt/80 border text-foreground text-sm font-mono placeholder:text-[#ced4da]/30 focus:outline-none focus:ring-2 transition-all duration-300 ${
                error
                  ? "border-red-500/50 focus:ring-red-500/20 shake"
                  : "border-white/10 focus:ring-primary/30 focus:border-primary/40"
              }`}
              autoComplete="off"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-primary/10 hover:bg-primary/20 border border-primary/30 hover:border-primary/50 text-primary text-sm font-mono tracking-wider uppercase transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,188,212,0.15)]"
          >
            Enter
          </button>
        </form>

        {/* Error message */}
        <div className={`mt-4 text-center text-xs font-mono transition-opacity duration-300 ${error ? "opacity-100 text-red-400" : "opacity-0"}`}>
          Incorrect password
        </div>

        {/* Subtle footer */}
        <p className="mt-12 text-center text-xs text-[#ced4da]/30 font-mono">
          Christopher Ullmann — Confidential
        </p>
      </div>

      {/* Shake animation */}
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
        .shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>
    </div>
  );
}

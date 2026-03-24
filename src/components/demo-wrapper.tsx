"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface DemoWrapperProps {
  title: string;
  badge?: string;
  description: string;
  externalUrl: string;
}

export function DemoWrapper({ title, badge, description, externalUrl }: DemoWrapperProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={cn(
        "min-h-screen bg-background text-foreground transition-opacity duration-700",
        isVisible ? "opacity-100" : "opacity-0"
      )}
    >
      {/* Header — matches ELLA's design language */}
      <div className="mx-auto w-full max-w-[1800px] px-4 pt-8 sm:px-6 lg:px-8">
        <header className="relative overflow-hidden rounded-t-3xl border border-b-0 border-white/10 bg-gradient-to-br from-[#0b1f24] via-[#0a0a0a] to-[#101417] p-6 shadow-2xl shadow-black/40 sm:p-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,188,212,0.18),transparent_45%)]" />
          <div className="relative space-y-5">
            <Link
              href="/#ai"
              className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.18em] text-primary/90 hover:text-primary"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Blueprint
            </Link>

            <div className="space-y-2">
              {badge && (
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.12em] text-primary">
                  {badge}
                </div>
              )}
              <h1 className="font-serif text-3xl leading-tight text-foreground sm:text-4xl">
                {title}
              </h1>
              <p className="max-w-2xl text-sm leading-relaxed text-[#ced4da]">
                {description}
              </p>
            </div>
          </div>
        </header>
      </div>

      {/* Iframe container */}
      <div className="mx-auto w-full max-w-[1800px] px-4 pb-8 sm:px-6 lg:px-8">
        <div className="relative rounded-b-3xl border border-t-0 border-white/10 bg-[#0a0a0a] overflow-hidden">
          {/* Loading state */}
          {!iframeLoaded && (
            <div className="flex h-[80vh] items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
                <p className="text-xs uppercase tracking-[0.15em] text-[#ced4da]">
                  Loading demo
                </p>
              </div>
            </div>
          )}
          <iframe
            src={externalUrl}
            className={cn(
              "w-full border-0 transition-opacity duration-500",
              iframeLoaded ? "opacity-100" : "opacity-0 h-0"
            )}
            style={iframeLoaded ? { height: "80vh" } : undefined}
            onLoad={() => setIframeLoaded(true)}
            allow="clipboard-write"
            title={title}
          />
        </div>
      </div>

      {/* Footer back link */}
      <div className="mx-auto w-full max-w-[1800px] px-4 pb-12 sm:px-6 lg:px-8">
        <Link
          href="/#ai"
          className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.18em] text-primary/90 hover:text-primary"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Blueprint
        </Link>
      </div>
    </div>
  );
}

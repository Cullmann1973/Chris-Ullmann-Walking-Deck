"use client";

import { useRef, useEffect } from "react";
import { gsap } from "./gsap-provider";
import { Sparkles } from "lucide-react";

export function ProofCallout() {
  const calloutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!calloutRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        calloutRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: calloutRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, calloutRef);

    return () => ctx.revert();
  }, []);

  const openChat = () => {
    window.dispatchEvent(new Event("open-chat-widget"));
  };

  return (
    <div ref={calloutRef} className="bg-dark relative">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 md:px-12 py-10 md:py-14">
        <div
          onClick={openChat}
          className="relative rounded-xl border border-border bg-secondary/30 px-6 py-5 md:px-8 md:py-6
                     cursor-pointer group hover:border-primary/30 transition-all duration-300
                     hover:shadow-[0_0_24px_rgba(0,188,212,0.06)]"
        >
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm md:text-base text-foreground/90 leading-relaxed">
                This portfolio was built with the same AI-first approach I deploy in manufacturing.{" "}
                <span className="text-primary font-medium group-hover:underline underline-offset-2">
                  Chat with it →
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

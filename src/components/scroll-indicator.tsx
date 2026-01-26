"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

export function ScrollIndicator() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Hide after scrolling 100px
      setIsVisible(window.scrollY < 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 right-8 z-30 flex flex-col items-center gap-2 text-muted-foreground">
      <span className="text-xs font-mono tracking-wider uppercase">Scroll</span>
      <ChevronDown className="w-4 h-4 animate-bounce-gentle" />
    </div>
  );
}

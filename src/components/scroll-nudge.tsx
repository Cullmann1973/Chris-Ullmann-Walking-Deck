"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";

export function ScrollNudge() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if already shown this session
    if (sessionStorage.getItem("scroll-nudge-shown")) {
      setIsDismissed(true);
      return;
    }

    const handleScroll = () => {
      const aboutSection = document.getElementById("about");
      if (!aboutSection) return;

      const rect = aboutSection.getBoundingClientRect();
      // Trigger when user has scrolled past the about section
      if (rect.bottom < 0 && !isDismissed) {
        setIsVisible(true);
        sessionStorage.setItem("scroll-nudge-shown", "true");
        // Remove scroll listener once triggered
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);

  // Auto-dismiss after 7 seconds
  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 7000);
    return () => clearTimeout(timer);
  }, [isVisible]);

  const openChat = () => {
    window.dispatchEvent(new Event("open-chat-widget"));
    setIsVisible(false);
  };

  const dismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);
    setIsDismissed(true);
  };

  if (!isVisible || isDismissed) return null;

  return (
    <div
      onClick={openChat}
      className="fixed bottom-24 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-40
                 bg-background/95 backdrop-blur-md border border-border rounded-xl
                 px-4 py-3 shadow-2xl shadow-black/40 cursor-pointer
                 animate-in slide-in-from-bottom-4 fade-in duration-500
                 hover:border-primary/30 transition-colors"
      role="alert"
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0 mt-0.5">
          <MessageCircle className="w-4 h-4 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-foreground leading-relaxed">
            💬 Have questions? My AI twin knows my whole career story.
          </p>
          <p className="text-xs text-primary mt-1 font-medium">
            Click to chat →
          </p>
        </div>
        <button
          onClick={dismiss}
          className="w-6 h-6 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors flex-shrink-0"
          aria-label="Dismiss"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

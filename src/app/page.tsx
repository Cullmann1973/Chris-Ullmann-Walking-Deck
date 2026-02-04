"use client";

import { useEffect } from "react";
import { Header } from "@/components/header";
import { UnifiedCULogo } from "@/components/unified-cu-logo";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { RolesRevealSection } from "@/components/sections/roles-reveal-section";
import { WhyIBuildSection } from "@/components/sections/why-i-build-section";
import { StackSection } from "@/components/sections/stack-section";
import { BeyondSection } from "@/components/sections/beyond-section";
import { AISection } from "@/components/sections/ai-section";
import { ContactSection } from "@/components/sections/contact-section";
import { ChatWidget } from "@/components/chat-widget";
import { ScrollTrigger } from "@/components/gsap-provider";

export default function HomePage() {
  // Force scroll to top on page load/refresh and replay animations
  useEffect(() => {
    // Disable browser's automatic scroll restoration
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // Immediate scroll to top (catches most browsers)
    window.scrollTo(0, 0);

    // Delayed scroll to top (catches mobile Safari which restores scroll after paint)
    const scrollTimer1 = setTimeout(() => window.scrollTo(0, 0), 0);
    const scrollTimer2 = setTimeout(() => window.scrollTo(0, 0), 50);
    const scrollTimer3 = setTimeout(() => {
      window.scrollTo(0, 0);
      // Refresh ScrollTrigger after everything has settled
      ScrollTrigger.refresh();
    }, 150);

    // Handle bfcache (back-forward cache) on mobile Safari
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        window.scrollTo(0, 0);
        ScrollTrigger.refresh();
      }
    };
    window.addEventListener("pageshow", handlePageShow);

    // Scroll to top before page unloads
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Clear any hash from URL on load (prevents scroll-to-anchor on refresh)
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname);
    }

    return () => {
      clearTimeout(scrollTimer1);
      clearTimeout(scrollTimer2);
      clearTimeout(scrollTimer3);
      window.removeEventListener("pageshow", handlePageShow);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <>
      <Header />
      <UnifiedCULogo />

      <main>
        <HeroSection />
        <AboutSection />
        <RolesRevealSection />
        <WhyIBuildSection />
        <StackSection />
        <BeyondSection />
        <AISection />
        <ContactSection />
      </main>

      <ChatWidget />
    </>
  );
}

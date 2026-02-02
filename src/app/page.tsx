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
import { ScrollTrigger } from "@/components/gsap-provider";

export default function HomePage() {
  // Force scroll to top on page load/refresh and replay animations
  useEffect(() => {
    // Disable browser's automatic scroll restoration
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    
    // Check for hash in URL
    const hash = window.location.hash;
    
    if (hash) {
      // If there's a hash, scroll to that element after a short delay
      const timeout = setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "instant" });
        }
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      // No hash - scroll to top for fresh start
      window.scrollTo(0, 0);
    }
    
    // Also scroll to top before page unloads (so browser doesn't save scroll position)
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    
    // Refresh ScrollTrigger after initial render
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(refreshTimeout);
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
    </>
  );
}

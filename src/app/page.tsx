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
  // Refresh ScrollTrigger after initial render
  useEffect(() => {
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timeout);
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

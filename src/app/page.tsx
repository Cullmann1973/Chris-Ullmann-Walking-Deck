"use client";

import { useEffect, Suspense } from "react";
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
import { useFocus } from "@/hooks/use-focus";

// Map section IDs to components
const SECTION_MAP: Record<string, React.FC<{ focus?: string }>> = {
  hero: HeroSection,
  about: AboutSection,
  roles: RolesRevealSection,
  "why-i-build": WhyIBuildSection,
  stack: StackSection,
  beyond: BeyondSection,
  ai: AISection,
  contact: ContactSection,
};

function HomeContent() {
  const { mode, config } = useFocus();

  // Force scroll to top on page load/refresh and replay animations
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);

    const scrollTimer1 = setTimeout(() => window.scrollTo(0, 0), 0);
    const scrollTimer2 = setTimeout(() => window.scrollTo(0, 0), 50);
    const scrollTimer3 = setTimeout(() => {
      window.scrollTo(0, 0);
      ScrollTrigger.refresh();
    }, 150);

    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        window.scrollTo(0, 0);
        ScrollTrigger.refresh();
      }
    };
    window.addEventListener("pageshow", handlePageShow);

    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    if (window.location.hash) {
      history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }

    return () => {
      clearTimeout(scrollTimer1);
      clearTimeout(scrollTimer2);
      clearTimeout(scrollTimer3);
      window.removeEventListener("pageshow", handlePageShow);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // Render sections in focus-determined order
  const sections = config.sectionOrder.map((id) => {
    const Component = SECTION_MAP[id];
    if (!Component) return null;
    return <Component key={id} focus={mode} />;
  });

  return (
    <>
      <Header />
      <UnifiedCULogo />
      <main>{sections}</main>
      <ChatWidget />
    </>
  );
}

export default function HomePage() {
  return (
    <Suspense>
      <HomeContent />
    </Suspense>
  );
}

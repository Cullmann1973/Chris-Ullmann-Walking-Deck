"use client";

import { useEffect, Suspense } from "react";
import { Header } from "@/components/header";
import { UnifiedCULogo } from "@/components/unified-cu-logo";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { WhatIDeliverSection } from "@/components/sections/what-i-deliver-section";
import { RolesRevealSection } from "@/components/sections/roles-reveal-section";
import { StackSection } from "@/components/sections/stack-section";
import { BeyondSection } from "@/components/sections/beyond-section";
import { AISection } from "@/components/sections/ai-section";
import { ContactSection } from "@/components/sections/contact-section";
import { TheWorkSection } from "@/components/sections/the-work-section";
import { VoicesSection } from "@/components/sections/voices-section";
import { ChatWidget } from "@/components/chat-widget";
import { ScrollNudge } from "@/components/scroll-nudge";
import { CircularCursor } from "@/components/circular-cursor";
import { ProofCallout } from "@/components/proof-callout";
import { PasswordGate } from "@/components/password-gate";
import { ScrollTrigger } from "@/components/gsap-provider";
import { useFocus } from "@/hooks/use-focus";

// Map section IDs to components
const SECTION_MAP: Record<string, React.FC<{ focus?: string }>> = {
  hero: HeroSection,
  about: AboutSection,
  roles: RolesRevealSection,
  stack: StackSection,
  beyond: BeyondSection,
  ai: AISection,
  contact: ContactSection,
};

function HomeContent() {
  const { mode, config } = useFocus();

  // Force scroll to top on page load/refresh — but respect hash anchors (e.g. /#ai from demo back buttons)
  useEffect(() => {
    const hash = window.location.hash;
    const hasAnchor = hash && hash.length > 1;

    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    if (hasAnchor) {
      // Coming back from a demo — scroll to the anchor after a brief delay for render
      const scrollToAnchor = setTimeout(() => {
        const el = document.getElementById(hash.slice(1));
        if (el) {
          el.scrollIntoView({ behavior: "instant" });
          ScrollTrigger.refresh();
        }
      }, 200);
      return () => clearTimeout(scrollToAnchor);
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
        const currentHash = window.location.hash;
        if (currentHash && currentHash.length > 1) {
          const el = document.getElementById(currentHash.slice(1));
          if (el) {
            el.scrollIntoView({ behavior: "instant" });
            ScrollTrigger.refresh();
            return;
          }
        }
        window.scrollTo(0, 0);
        ScrollTrigger.refresh();
      }
    };
    window.addEventListener("pageshow", handlePageShow);

    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      clearTimeout(scrollTimer1);
      clearTimeout(scrollTimer2);
      clearTimeout(scrollTimer3);
      window.removeEventListener("pageshow", handlePageShow);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // Render sections in focus-determined order, with injected sections
  const sections: React.ReactNode[] = [];
  config.sectionOrder.forEach((id) => {
    const Component = SECTION_MAP[id];
    if (!Component) return;
    sections.push(<Component key={id} focus={mode} />);
    if (id === "about") {
      sections.push(<ProofCallout key="proof-callout" />);
      sections.push(<WhatIDeliverSection key="what-i-deliver" focus={mode} />);
    }
    if (id === "roles") {
      sections.push(<TheWorkSection key="the-work" />);
    }
    if (id === "ai") {
      sections.push(<VoicesSection key="voices" />);
    }
  });

  return (
    <PasswordGate>
      <Header />
      <UnifiedCULogo />
      <main>{sections}</main>
      <ChatWidget />
      <ScrollNudge />
      <CircularCursor />
    </PasswordGate>
  );
}

export default function HomePage() {
  return (
    <Suspense>
      <HomeContent />
    </Suspense>
  );
}

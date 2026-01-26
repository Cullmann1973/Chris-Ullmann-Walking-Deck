"use client";

import { useEffect, useState, useRef } from "react";
import { Header } from "@/components/header";
import { ScrollIndicator } from "@/components/scroll-indicator";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { StackSection } from "@/components/sections/stack-section";
import { BeyondSection } from "@/components/sections/beyond-section";
import { AISection } from "@/components/sections/ai-section";
import { ContactSection } from "@/components/sections/contact-section";
import { ScrollTrigger } from "@/components/gsap-provider";

const sections = [
  { id: "hero", name: "Home" },
  { id: "about", name: "About" },
  { id: "stack", name: "The Stack" },
  { id: "beyond", name: "Beyond Work" },
  { id: "ai", name: "Ask Chris" },
  { id: "contact", name: "Contact" },
];

export default function HomePage() {
  const [currentSection, setCurrentSection] = useState("Home");
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Set up scroll-based section tracking
    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id, name }) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
              setCurrentSection(name);
            }
          });
        },
        {
          threshold: [0.3, 0.5, 0.7],
          rootMargin: "-10% 0px -10% 0px",
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  // Refresh ScrollTrigger after initial render
  useEffect(() => {
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <Header currentSection={currentSection} />
      <ScrollIndicator />

      <main ref={mainRef}>
        <HeroSection />
        <AboutSection />
        <StackSection />
        <BeyondSection />
        <AISection />
        <ContactSection />
      </main>
    </>
  );
}

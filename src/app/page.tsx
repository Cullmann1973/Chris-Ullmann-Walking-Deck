"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { StackSection } from "@/components/sections/stack-section";
import { BeyondSection } from "@/components/sections/beyond-section";
import { AISection } from "@/components/sections/ai-section";
import { ContactSection } from "@/components/sections/contact-section";
import { ScrollTrigger } from "@/components/gsap-provider";

const sections = [
  { id: "hero", name: "Christopher Ullmann" },
  { id: "about", name: "About" },
  { id: "stack", name: "The Stack" },
  { id: "beyond", name: "Beyond Work" },
  { id: "ai", name: "Ask Chris" },
  { id: "contact", name: "Contact" },
];

export default function HomePage() {
  const [currentSection, setCurrentSection] = useState("Christopher Ullmann");

  useEffect(() => {
    // Set up scroll-based section tracking
    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id, name }) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.2) {
              setCurrentSection(name);
            }
          });
        },
        {
          threshold: [0.2, 0.5],
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

      <main>
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

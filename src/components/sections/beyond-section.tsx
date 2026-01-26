"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../gsap-provider";

const sections = [
  {
    title: "Leslie and the Girls",
    content: [
      "Leslie is my co-pilot in every sense. We share a love of travel, a tolerance for complexity, and an understanding that life rarely follows a neat plan. Together we're raising Emilia (Emmi), who attends the Long Island School for the Gifted and reminds me daily that curiosity is hereditary.",
      "And then there's Isabella (Bella), my daughter in North Carolina. She was born in 2009, and our story has been one of distance, determination, and a lot of unaccompanied minor flights. When you can't be there every day, you learn to show up in other ways.",
      "Parenting across geographies isn't what I imagined, but it taught me something I use every day at work: presence doesn't require proximity.",
    ],
  },
  {
    title: "The Hawaii Chapter",
    content: [
      "In late 2024, Leslie and I made a decision that surprised some people: we bought a home in Mililani, on Oahu. Not as a vacation property, but as a sanctuary. A place where the \"Builder\" can stop building for a while.",
      "After decades of high-velocity work, having a place designed for stillness feels less like luxury and more like necessary infrastructure.",
    ],
  },
  {
    title: "Still Building Things",
    content: [
      "I can't seem to stop tinkering. My garage has a 3D printer (FDM and resin), Shapr3D running on my iPad, and an ever-growing collection of half-finished projects.",
      "The Air Force gave me hydraulics, pneumatics, and a zero-defect mentality. Queens College gave me biology and chemistry. Everything since then has been self-taught: Python scripting, hardware integration, electronics.",
      "That's probably the through-line of my whole life: I don't consume technology, I master it.",
    ],
  },
  {
    title: "Giving Back",
    content: [
      "I'm active in the Jewish Business Network of Long Island, where I participate in executive roundtables and community giving initiatives. At work, I've championed mental health programs and launched Wellbeing ERGs.",
      "I'm a disabled Gulf War veteran, which keeps me connected to veterans advocacy. Service doesn't end when you take off the uniform.",
      "Business success should be a vehicle for community impact, not the destination.",
    ],
  },
];

export function BeyondSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Section title animation
      gsap.fromTo(
        ".beyond-title",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Content blocks stagger
      gsap.fromTo(
        ".beyond-block",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".beyond-content",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Quote animation
      gsap.fromTo(
        ".beyond-quote",
        { scale: 0.95, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".beyond-quote",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="beyond" className="bg-dark-alt relative">
      <div className="section-padding">
        <div className="max-w-3xl mx-auto">
          {/* Section header */}
          <div className="beyond-title mb-16">
            <span className="text-xs font-mono tracking-wider text-muted-foreground uppercase">
              Beyond Work
            </span>
            <h2 className="text-section font-serif text-foreground mt-4">
              Why I build
            </h2>
            <p className="text-xl text-muted-foreground mt-4">
              The professional pages tell you what I&apos;ve built. This one tells you why.
            </p>
          </div>

          {/* Content blocks */}
          <div className="beyond-content space-y-16">
            {sections.map((section) => (
              <div key={section.title} className="beyond-block">
                <h3 className="text-2xl font-serif text-foreground mb-6">
                  {section.title}
                </h3>
                <div className="space-y-4">
                  {section.content.map((paragraph, i) => (
                    <p key={i} className="text-muted-foreground leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Quote */}
          <div className="beyond-quote mt-20 pt-12 border-t border-border text-center">
            <p className="text-2xl md:text-3xl font-serif text-primary/80 italic max-w-2xl mx-auto">
              &quot;The pursuit of understanding is its own reward.&quot;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

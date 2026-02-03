"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../gsap-provider";

interface BeyondSection {
  id: string;
  title: string;
  photoLabel: string;
  image: string;
  content: string[];
  pullQuote?: string;
  afterQuote?: string;
}

const sections: BeyondSection[] = [
  {
    id: "family",
    title: "Leslie and the Girls",
    photoLabel: "Photo: Family",
    image: "", // Add family photo path here
    content: [
      "Leslie is my co-pilot in every sense. We share a love of travel, a tolerance for complexity, and an understanding that life rarely follows a neat plan.",
      "I have two daughters who keep me grounded. After decades of transformations, deadlines, and high-stakes decisions, family is where I remember why any of it matters.",
    ],
    pullQuote: "Balance isn't a goal. It's a practice.",
  },
  {
    id: "hawaii",
    title: "The Hawaii Chapter",
    photoLabel: "Photo: Hawaii",
    image: "", // Add Hawaii photo path here
    content: [
      "In late 2024, Leslie and I made a decision that surprised some people: we bought a home in Mililani, on Oahu. Not as a vacation property. As a sanctuary.",
      "After decades of high-velocity work, rebuilding systems while they're running, managing hundreds of millions in capital, driving transformations that never slow down... having a place designed for stillness feels less like luxury and more like necessary infrastructure.",
      "Turns out even the Translator needs a place where nothing needs translating.",
    ],
  },
  {
    id: "why-i-build",
    title: "The Drive",
    photoLabel: "Photo: Workshop",
    image: "", // Add workshop photo path here
    content: [
      "I've never been satisfied just using tools. I need to understand how they work, then make them work better.",
      "The Air Force gave me hydraulics, pneumatics, and a zero-defect mentality. Queens College gave me biology and chemistry. Everything since then has been self-taught: Python scripting, hardware integration, AI architecture. At 50+, I enrolled in Stanford's Generative AI program. Not because I had to. Because I wanted to understand the technology I was deploying at enterprise scale.",
      "My garage has a 3D printer, Shapr3D running on my iPad, and an ever-growing collection of half-finished projects. That's probably the through-line of my whole life:",
    ],
    pullQuote: "I don't consume technology. I master it.",
  },
];

export function BeyondSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Section title animation with underline draw
      gsap.fromTo(
        ".beyond-main-title",
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

      // Main title underline draw animation
      gsap.fromTo(
        ".main-title-underline",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".beyond-main-title",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate each subsection
      sections.forEach((section, index) => {
        const sectionEl = `.beyond-subsection-${index}`;
        const photoEl = photoRefs.current[index];

        // Subsection header with underline
        gsap.fromTo(
          `${sectionEl} .subsection-title`,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionEl,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Underline draw animation
        gsap.fromTo(
          `${sectionEl} .title-underline`,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionEl,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Staggered paragraph fade-ins
        gsap.fromTo(
          `${sectionEl} .content-paragraph`,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionEl,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Pull quote animation (if exists)
        const pullQuoteEl = document.querySelector(`${sectionEl} .pull-quote`);
        if (pullQuoteEl) {
          gsap.fromTo(
            pullQuoteEl,
            { y: 20, opacity: 0, scale: 0.98 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: pullQuoteEl,
                start: "top 90%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // After-quote paragraph (if exists)
        const afterQuoteEl = document.querySelector(`${sectionEl} .after-quote`);
        if (afterQuoteEl) {
          gsap.fromTo(
            afterQuoteEl,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: afterQuoteEl,
                start: "top 90%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // Photo placeholder animation - Apple-style scale + fade
        if (photoEl) {
          // Initial photo reveal with subtle animation
          gsap.fromTo(
            photoEl,
            { scale: 0.92, opacity: 0, y: 30 },
            {
              scale: 1,
              opacity: 1,
              y: 0,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: photoEl,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );

          // Gentle parallax scroll effect
          gsap.to(photoEl, {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: photoEl,
              start: "top bottom",
              end: "bottom top",
              scrub: 2,
            },
          });
        }
      });

      // Final quote animation
      gsap.fromTo(
        ".beyond-final-quote",
        { scale: 0.95, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".beyond-final-quote",
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
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <div className="beyond-main-title mb-16 max-w-3xl">
            <span className="text-xs font-mono tracking-wider text-muted-foreground uppercase">
              Beyond Work
            </span>
            <h2 className="text-section font-serif text-foreground mt-4 relative inline-block">
              The Drive
              <span className="main-title-underline absolute bottom-0 left-0 w-full h-[2px] bg-primary origin-left" />
            </h2>
            <p className="text-xl text-muted-foreground mt-6">
              The professional pages tell you what I&apos;ve built. This one
              tells you why.
            </p>
          </div>

          {/* Subsections with photos */}
          <div className="space-y-32">
            {sections.map((section, index) => (
              <div
                key={section.id}
                className={`beyond-subsection-${index} grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start`}
              >
                {/* Photo placeholder - alternates left/right */}
                <div
                  ref={(el) => {
                    photoRefs.current[index] = el;
                  }}
                  className={`relative aspect-[4/3] rounded-xl overflow-hidden ${
                    index % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  {/* Photo or placeholder */}
                  {section.image ? (
                    <img 
                      src={section.image} 
                      alt={section.title}
                      className="absolute inset-0 w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[#1a1a1a] border border-primary/30 rounded-xl flex items-center justify-center">
                      <span className="text-muted-foreground/70 text-sm font-mono">
                        {section.photoLabel}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <h3 className="subsection-title text-2xl md:text-3xl font-serif text-foreground mb-2 relative inline-block">
                    {section.title}
                    <span className="title-underline absolute -bottom-1 left-0 w-full h-[1px] bg-primary origin-left" />
                  </h3>

                  <div className="space-y-4 mt-6">
                    {section.content.map((paragraph, i) => (
                      <p
                        key={i}
                        className="content-paragraph text-muted-foreground leading-relaxed"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Pull quote if exists */}
                  {section.pullQuote && (
                    <div className="pull-quote my-8 py-6 px-6 border-l-4 border-primary bg-primary/5 rounded-r-lg">
                      <p className="text-xl md:text-2xl font-serif text-primary leading-relaxed">
                        &quot;{section.pullQuote}&quot;
                      </p>
                    </div>
                  )}

                  {/* After quote paragraph if exists */}
                  {section.afterQuote && (
                    <p className="after-quote text-muted-foreground leading-relaxed">
                      {section.afterQuote}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Final Quote */}
          <div className="beyond-final-quote mt-24 pt-12 border-t border-border text-center max-w-3xl mx-auto">
            <p className="text-2xl md:text-3xl font-serif text-primary/80 italic max-w-2xl mx-auto">
              &quot;The pursuit of understanding is its own reward.&quot;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

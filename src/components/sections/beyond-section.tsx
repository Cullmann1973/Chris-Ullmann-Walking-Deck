"use client";

import { useEffect, useRef } from "react";
import { gsap } from "../gsap-provider";

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
    title: "Home Base",
    photoLabel: "Photo: Family",
    image: "/images/family.jpg",
    content: [
      "Everything I build starts and ends here. My wife is my partner in every sense. My family reminds me daily why any of it matters.",
      "The travel, the deadlines, the transformations: they only work because this is what I come home to.",
    ],
    pullQuote: "They're the reason it all works.",
  },
  {
    id: "early-riser",
    title: "The 4:30 Club",
    photoLabel: "Air Force Achievement Medal, ~1994",
    image: "/images/air-force-award.jpg",
    content: [
      "My alarm goes off at 4:30 AM. Not because someone told me to. Because the two hours before the world wakes up are the most productive hours I have.",
      "That's when I learn. New models, new frameworks, new ways to connect AI to problems nobody's solved yet. I taught myself vibe coding in those hours. Built agents. Read papers. Enrolled in Stanford's Generative AI program at 50+ because I couldn't deploy technology I didn't deeply understand.",
      "The Air Force taught me that discipline isn't a personality trait. It's infrastructure. You build the routine, and the routine builds everything else.",
    ],
    pullQuote: "The routine builds everything else.",
  },
  {
    id: "why-i-build",
    title: "The Drive",
    photoLabel: "Photo: Workshop",
    image: "/images/watch-movement.jpg",
    content: [
      "I've never been satisfied just using machines. I need to understand how they work so I can make them faster, more reliable, more efficient.",
      "Cars, 3D printers, watches, the human body: everything is a system. Biology was just another way to learn how things work. My garage is where I take things apart, figure out what makes them tick, and put them back together better. Same instinct that drives how I approach AI.",
    ],
    pullQuote: "I don't consume technology. I master it.",
  },
];

export function BeyondSection({ focus }: { focus?: string }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Main title animation
      gsap.from(".beyond-main-title", {
        y: 30,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ".beyond-main-title",
          start: "top 85%",
          end: "top 55%",
          scrub: 1.5,
        },
      });

      gsap.from(".main-title-underline", {
        scaleX: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ".beyond-main-title",
          start: "top 85%",
          end: "top 55%",
          scrub: 1.5,
        },
      });

      // Subsections
      sections.forEach((_, index) => {
        const sectionEl = `.beyond-subsection-${index}`;
        
        gsap.from(`${sectionEl} .subsection-title`, {
          y: 25,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionEl,
            start: "top 85%",
            end: "top 60%",
            scrub: 1.5,
          },
        });

        gsap.from(`${sectionEl} .title-underline`, {
          scaleX: 0,
          transformOrigin: "left center",
          ease: "none",
          scrollTrigger: {
            trigger: sectionEl,
            start: "top 85%",
            end: "top 60%",
            scrub: 1.5,
          },
        });

        gsap.from(`${sectionEl} .content-paragraph`, {
          y: 20,
          opacity: 0,
          stagger: 0.15,
          ease: "none",
          scrollTrigger: {
            trigger: sectionEl,
            start: "top 80%",
            end: "top 50%",
            scrub: 1.5,
          },
        });

        const pullQuoteEl = document.querySelector(`${sectionEl} .pull-quote`);
        if (pullQuoteEl) {
          gsap.from(pullQuoteEl, {
            y: 15,
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: pullQuoteEl,
              start: "top 85%",
              end: "top 60%",
              scrub: 1.5,
            },
          });
        }

        const afterQuoteEl = document.querySelector(`${sectionEl} .after-quote`);
        if (afterQuoteEl) {
          gsap.from(afterQuoteEl, {
            y: 15,
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: afterQuoteEl,
              start: "top 85%",
              end: "top 60%",
              scrub: 1.5,
            },
          });
        }

        const photoEl = document.querySelector(`${sectionEl} .photo-container`);
        if (photoEl) {
          gsap.from(photoEl, {
            scale: 0.95,
            opacity: 0,
            y: 20,
            ease: "none",
            scrollTrigger: {
              trigger: photoEl,
              start: "top 85%",
              end: "top 55%",
              scrub: 1.5,
            },
          });

          gsap.to(`${sectionEl} .parallax-photo`, {
            yPercent: 14,
            ease: "none",
            scrollTrigger: {
              trigger: photoEl,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          });
        }

        const textContainer = document.querySelector(`${sectionEl} .text-container`);
        if (textContainer) {
          gsap.to(textContainer, {
            yPercent: -3,
            ease: "none",
            scrollTrigger: {
              trigger: sectionEl,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          });
        }
      });

      // Final quote animation
      gsap.from(".beyond-final-quote", {
        opacity: 0,
        y: 20,
        ease: "none",
        scrollTrigger: {
          trigger: ".beyond-final-quote",
          start: "top 85%",
          end: "top 60%",
          scrub: 1.5,
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="beyond" className="bg-dark-alt relative">
      <div className="section-padding">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <div className="beyond-main-title mb-16 max-w-3xl">
            <span className="block text-xs font-mono tracking-wider text-[#adb5bd] uppercase">
              Beyond Work
            </span>
            <h2 className="text-section font-serif text-[#f8f9fa] relative inline-block" style={{ marginTop: '40px' }}>
              The Drive
              <span className="main-title-underline absolute bottom-0 left-0 w-full h-[2px] bg-primary origin-left" />
            </h2>
            <p className="text-xl text-[#adb5bd] mt-6">
              The professional pages tell you what I've built. This one
              tells you why.
            </p>
          </div>

          <div className="space-y-32">
            {/* FAMILY (index 0) — side-by-side layout like The Drive */}
            <div className={`beyond-subsection-0`}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
                {/* Left: Image — no crop */}
                <div className="photo-container group relative rounded-xl overflow-hidden border border-primary/20">
                  {sections[0].image ? (
                    <img 
                      src={sections[0].image} 
                      alt={sections[0].title}
                      className="parallax-photo w-full h-auto grayscale transition-all duration-700 group-hover:grayscale-0"
                    />
                  ) : (
                    <div className="aspect-[4/3] bg-[#1a1a1a] flex items-center justify-center">
                      <span className="text-[#adb5bd] text-sm font-mono">
                        {sections[0].photoLabel}
                      </span>
                    </div>
                  )}
                </div>

                {/* Right: Title + text */}
                <div className="text-container">
                  <h3 className="subsection-title text-3xl md:text-4xl font-serif text-[#f8f9fa] mb-6 relative inline-block">
                    {sections[0].title}
                    <span className="title-underline absolute -bottom-2 left-0 w-full h-[2px] bg-primary origin-left" />
                  </h3>
                  <div className="space-y-4">
                    {sections[0].content.map((paragraph, i) => (
                      <p key={i} className="content-paragraph text-[#ced4da] text-lg leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {/* Pull quote inline */}
                  <div className="pull-quote relative mt-8 pt-6 border-t border-white/10">
                    <p className="text-xl md:text-2xl font-serif text-primary italic">
                      &ldquo;{sections[0].pullQuote}&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 4:30 CLUB (index 1) */}
            <div className={`beyond-subsection-1`}>
              <div className="max-w-4xl mx-auto text-container">
                <h3 className="subsection-title text-3xl md:text-4xl font-serif text-[#f8f9fa] mb-8 relative inline-block">
                  {sections[1].title}
                  <span className="title-underline absolute -bottom-2 left-0 w-full h-[2px] bg-primary origin-left" />
                </h3>
                
                <div className="clearfix">
                  <div className="photo-container group float-right w-48 h-48 ml-8 mb-6 rounded-xl overflow-hidden relative cursor-pointer">
                    {sections[1].image ? (
                      <img 
                        src={sections[1].image} 
                        alt={sections[1].title}
                        className="parallax-photo absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-[#1a1a1a] flex items-center justify-center text-center p-4">
                        <span className="text-[#adb5bd] text-xs font-mono">
                          {sections[1].photoLabel}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-6">
                    {sections[1].content.map((paragraph, i) => (
                      <p key={i} className="content-paragraph text-[#ced4da] text-lg leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="pull-quote relative mt-16 py-8 text-center">
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 text-7xl font-serif text-primary/15 leading-none select-none">"</span>
                  <p className="text-3xl font-serif text-primary relative z-10">
                    {sections[1].pullQuote}
                  </p>
                </div>
              </div>
            </div>

            {/* THE DRIVE (index 2) */}
            <div className={`beyond-subsection-2 grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12 lg:gap-16 items-start`}>
              <div className="photo-container group relative aspect-[4/3] lg:aspect-square rounded-xl overflow-hidden ring-2 ring-primary/20">
                {sections[2].image ? (
                  <img 
                    src={sections[2].image} 
                    alt={sections[2].title}
                    className="parallax-photo absolute inset-0 w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[#1a1a1a] flex items-center justify-center">
                    <span className="text-[#adb5bd] text-sm font-mono">
                      {sections[2].photoLabel}
                    </span>
                  </div>
                )}
              </div>

              <div className="text-container">
                <h3 className="subsection-title text-3xl md:text-4xl font-serif text-[#f8f9fa] mb-8 relative inline-block">
                  {sections[2].title}
                  <span className="title-underline absolute -bottom-2 left-0 w-full h-[2px] bg-primary origin-left" />
                </h3>

                <div className="space-y-6">
                  {sections[2].content.map((paragraph, i) => (
                    <p key={i} className="content-paragraph text-[#ced4da] text-lg leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="pull-quote relative mt-12 py-8">
                  <span className="absolute top-0 left-8 -translate-y-4 text-7xl font-serif text-primary/15 leading-none select-none">"</span>
                  <p className="text-2xl md:text-3xl font-serif text-primary relative z-10 ml-8">
                    {sections[2].pullQuote}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Final Quote */}
          <div className="beyond-final-quote mt-32 pt-16 border-t border-primary/20 text-center max-w-4xl mx-auto">
            <p className="text-3xl md:text-5xl font-serif text-primary/80 italic">
              "The pursuit of understanding is its own reward."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

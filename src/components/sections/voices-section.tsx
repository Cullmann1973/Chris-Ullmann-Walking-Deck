"use client";

import { useEffect, useRef } from "react";
import { gsap } from "../gsap-provider";
import { Linkedin } from "lucide-react";

interface Voice {
  name: string;
  title: string;
  company: string;
  speaksTo: string;
  linkedIn?: string;
  initials: string;
  gradient: string;
}

const voices: Voice[] = [
  {
    name: "Reference Available",
    title: "VP, Manufacturing Operations",
    company: "Fortune 500 CPG",
    speaksTo: "Enterprise AI transformation and cross-functional program leadership",
    initials: "RA",
    gradient: "from-cyan-500 to-blue-600",
    linkedIn: "#",
  },
  {
    name: "Reference Available",
    title: "Senior Director, IT",
    company: "Global Manufacturing",
    speaksTo: "Business-technology bridge and governance framework development",
    initials: "RA",
    gradient: "from-indigo-500 to-purple-600",
    linkedIn: "#",
  },
  {
    name: "Reference Available",
    title: "Managing Director",
    company: "Kotter Inc.",
    speaksTo: "Change management methodology and enterprise transformation execution",
    initials: "RA",
    gradient: "from-emerald-500 to-teal-600",
    linkedIn: "#",
  },
  {
    name: "Reference Available",
    title: "Director, AI & Analytics",
    company: "Microsoft",
    speaksTo: "AI product partnership and enterprise deployment at scale",
    initials: "RA",
    gradient: "from-sky-500 to-indigo-600",
    linkedIn: "#",
  },
  {
    name: "Reference Available",
    title: "SVP, Global Quality",
    company: "Fortune 500 Beauty",
    speaksTo: "Quality systems transformation and regulatory compliance leadership",
    initials: "RA",
    gradient: "from-rose-500 to-pink-600",
    linkedIn: "#",
  },
  {
    name: "Reference Available",
    title: "Chief Digital Officer",
    company: "Enterprise Manufacturing",
    speaksTo: "Digital transformation roadmap development and stakeholder alignment",
    initials: "RA",
    gradient: "from-amber-500 to-orange-600",
    linkedIn: "#",
  },
];

export function VoicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Title reveal
      gsap.fromTo(
        ".voices-title",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".voices-title",
            start: "top 85%",
            end: "top 55%",
            scrub: 1.5,
          },
        }
      );

      // Cards slide in from right with elastic easing
      gsap.fromTo(
        ".voice-card",
        { x: 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "elastic.out(1, 0.75)",
          scrollTrigger: {
            trigger: ".voices-scroll",
            start: "top 80%",
          },
        }
      );

      // Subtle floating animation on cards
      document.querySelectorAll(".voice-card").forEach((card, i) => {
        gsap.to(card, {
          y: -3,
          duration: 3 + i * 0.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.3,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="voices" className="bg-dark-alt relative overflow-hidden">
      <div className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 md:px-8 xl:px-0">
          {/* Section Header */}
          <div className="voices-title mb-14 max-w-4xl">
            <span className="text-xs font-mono tracking-wider text-[#ced4da] uppercase">
              Social Proof
            </span>
            <h2 className="text-section font-serif text-foreground mt-4">
              Voices
            </h2>
            <p className="text-[#ced4da] mt-4 max-w-2xl">
              People who&apos;ve seen the work firsthand. Available upon request.
            </p>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div
          ref={scrollRef}
          className="voices-scroll flex gap-5 overflow-x-auto px-6 md:px-8 xl:px-[calc((100vw-72rem)/2)] pb-6 snap-x snap-mandatory scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {voices.map((voice, i) => (
            <div
              key={i}
              className="voice-card flex-shrink-0 w-[300px] md:w-[340px] snap-start"
            >
              <div className="h-full rounded-xl border border-white/10 bg-dark/80 p-6 transition-all duration-500 hover:border-primary/25 hover:shadow-[0_12px_40px_rgba(0,188,212,0.06)]">
                {/* Header: Avatar + Name */}
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    {/* Initials Avatar */}
                    <div
                      className={`w-12 h-12 rounded-full bg-gradient-to-br ${voice.gradient} flex items-center justify-center flex-shrink-0`}
                    >
                      <span className="text-sm font-bold text-white">
                        {voice.initials}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-foreground leading-tight">
                        {voice.name}
                      </h4>
                      <p className="text-xs text-[#ced4da] mt-0.5">
                        {voice.title}
                      </p>
                    </div>
                  </div>
                  {voice.linkedIn && voice.linkedIn !== "#" && (
                    <a
                      href={voice.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#ced4da]/40 hover:text-primary transition-colors mt-1"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                </div>

                {/* Company */}
                <p className="text-xs font-mono text-primary/60 mb-4 tracking-wider uppercase">
                  {voice.company}
                </p>

                {/* What they speak to */}
                <p className="text-sm text-[#ced4da] leading-relaxed">
                  Can speak to:{" "}
                  <span className="text-foreground/90">{voice.speaksTo}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "../gsap-provider";
// Official LinkedIn logo (filled) as inline SVG
function LinkedInLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

interface Voice {
  name: string;
  title: string;
  company: string;
  speaksTo: string;
  linkedIn?: string;
  initials: string;
  gradient: string;
  photo?: string;
  brandColor: string;
  logo?: string;
}

const voices: Voice[] = [
  {
    name: "Denise Kulikowsky",
    title: "Chief People Officer",
    company: "Tapestry",
    speaksTo: "Leadership development, cross-functional collaboration, and professional growth",
    initials: "DK",
    gradient: "from-cyan-500 to-blue-600",
    linkedIn: "https://www.linkedin.com/in/humanresourcesexecutive/",
    photo: "/references/denise-kulikowsky.jpg",
    brandColor: "#000000",
    logo: "/logos/tapestry.png",
  },
  {
    name: "Saverio Marcario",
    title: "Global EHS Lead",
    company: "The Estée Lauder Companies",
    speaksTo: "Manufacturing operations leadership, transformation execution, and team development",
    initials: "SM",
    gradient: "from-indigo-500 to-purple-600",
    linkedIn: "https://www.linkedin.com/in/saverio-marcario-4432794b/",
    photo: "/references/saverio-marcario.jpg",
    brandColor: "#1B365D",
    logo: "/logos/elc.png",
  },
  {
    name: "Jane Koh",
    title: "Principal Product Manager, Copilot Extensibility",
    company: "Microsoft",
    speaksTo: "AI product partnership, enterprise deployment, and the ELLA case study presented at Microsoft Ignite",
    initials: "JK",
    gradient: "from-emerald-500 to-teal-600",
    linkedIn: "https://www.linkedin.com/in/janekohmicrosoft/",
    photo: "/references/jane-koh.jpg",
    brandColor: "#00A4EF",
    logo: "/logos/microsoft.png",
  },
  {
    name: "Adriana Uribe",
    title: "VP, Transformation & PMO, IT",
    company: "Tiffany & Co.",
    speaksTo: "Enterprise program management, supply chain transformation, and PMO development",
    initials: "AU",
    gradient: "from-sky-500 to-indigo-600",
    linkedIn: "https://www.linkedin.com/in/adriana-uribe-pmp-pfmp-mba/",
    photo: "/references/adriana-uribe.jpg",
    brandColor: "#0ABAB5",
    logo: "/logos/tiffany.png",
  },
  {
    name: "Ester Jimenez",
    title: "EVP & CTIO",
    company: "PVH Corp",
    speaksTo: "Enterprise technology transformation, SAP implementation, and cross-functional program execution",
    initials: "EJ",
    gradient: "from-amber-500 to-orange-600",
    linkedIn: "https://www.linkedin.com/in/esterjimenez/",
    photo: "/references/ester-jimenez.jpg",
    brandColor: "#000000",
    logo: "/logos/pvh.png",
  },
  {
    name: "Kathy Gersch",
    title: "CEO & Co-Founder",
    company: "Kotter",
    speaksTo: "Change management methodology, enterprise transformation execution, and Kotter partnership",
    initials: "KG",
    gradient: "from-rose-500 to-pink-600",
    linkedIn: "https://www.linkedin.com/in/kathy-gersch-639916/",
    photo: "/references/kathy-gersch.jpg",
    brandColor: "#E8490F",
    logo: "/logos/kotter.png",
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
              People who&apos;ve seen the work firsthand. They&apos;re expecting your call: connect with them directly on LinkedIn.
            </p>
          </div>
        </div>

        {/* 3x2 Grid */}
        <div
          ref={scrollRef}
          className="voices-scroll grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-6 md:px-8 xl:px-[calc((100vw-72rem)/2)] pb-6"
        >
          {voices.map((voice, i) => (
            <a
              key={i}
              href={voice.linkedIn || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="voice-card block cursor-pointer"
            >
              <div className="group h-full rounded-xl border border-white/10 bg-dark/80 p-6 transition-all duration-500 hover:scale-[1.25] hover:z-50 hover:border-primary/25 hover:shadow-[0_20px_60px_rgba(0,188,212,0.12)] origin-center">
                {/* Header: Avatar + Name */}
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    {/* Avatar — photo with B&W→color hover, or initials fallback */}
                    <div
                      className={`w-12 h-12 rounded-full flex-shrink-0 overflow-hidden ring-[3px] ring-white/50 ${!voice.photo ? `bg-gradient-to-br ${voice.gradient} flex items-center justify-center` : ""}`}
                    >
                      {voice.photo ? (
                        <img
                          src={voice.photo}
                          alt={voice.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-sm font-bold text-white">
                          {voice.initials}
                        </span>
                      )}
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
                    <div className="text-[#0A66C2] mt-1">
                      <LinkedInLogo className="w-6 h-6" />
                    </div>
                  )}
                </div>

                {/* Company logo + name */}
                <div className="mb-4 h-8 flex items-center gap-2.5">
                  {voice.logo && (
                    <img
                      src={voice.logo}
                      alt={voice.company}
                      className="h-7 w-7 object-contain rounded flex-shrink-0"
                    />
                  )}
                  <p className="text-sm font-semibold text-foreground/80 tracking-wide">
                    {voice.company}
                  </p>
                </div>

                {/* What they speak to */}
                <p className="text-sm text-[#ced4da] leading-relaxed">
                  Can speak to:{" "}
                  <span className="text-foreground/90">{voice.speaksTo}</span>
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

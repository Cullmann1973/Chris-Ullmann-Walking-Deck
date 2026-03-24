"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../gsap-provider";
import { Play, FileText, Users, ExternalLink } from "lucide-react";

interface WorkItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  badgeColor: string;
  metric: string;
  metricLabel: string;
  icon: typeof Play;
  link?: string;
  image?: string;
}

const workItems: WorkItem[] = [
  {
    id: "kotter",
    title: "Kotter Change Leadership",
    subtitle: "2-Year Direct Partnership with Kotter Inc.",
    description:
      "Applied the 8-step methodology at enterprise scale across two Fortune 500 companies. Not a certification exercise: a hands-on partnership with John Kotter's team to drive real organizational transformation.",
    badge: "Case Study",
    badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    metric: "1,000+",
    metricLabel: "people activated",
    icon: FileText,
    link: "#",
  },
  {
    id: "ignite",
    title: "Microsoft Ignite: ELLA",
    subtitle: "Featured Case Study — Session PBRK394",
    description:
      "ELLA, the Estée Lauder Line Assistant, was presented by Microsoft as a featured AI adoption case study at Ignite. Built with Copilot Studio, Dataverse, and AI Builder. Chris's demo starts at 37:45.",
    badge: "Presentation",
    badgeColor: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    metric: "Global",
    metricLabel: "audience",
    icon: Play,
    link: "https://ignite.microsoft.com/en-US/sessions/PBRK394",
    image: "/references/ignite-ella-frame.jpg",
  },
  {
    id: "orlando",
    title: "Up & Coming AI Leadership",
    subtitle: "Orlando Industry Panel",
    description:
      "Selected as a panelist for emerging AI leadership in enterprise transformation. Discussed practical approaches to scaling AI adoption beyond pilot projects.",
    badge: "Panel",
    badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    metric: "Industry",
    metricLabel: "recognition",
    icon: Users,
    link: "#",
  },
];

export function TheWorkSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Title reveal
      gsap.fromTo(
        ".work-title",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".work-title",
            start: "top 85%",
            end: "top 55%",
            scrub: 1.5,
          },
        }
      );

      // Stagger cards from bottom
      gsap.fromTo(
        ".work-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".work-cards-container",
            start: "top 80%",
          },
        }
      );

      // Badges slide in after cards
      gsap.fromTo(
        ".work-badge",
        { x: 20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.5,
          ease: "power2.out",
          delay: 0.3,
          scrollTrigger: {
            trigger: ".work-cards-container",
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="the-work" className="bg-dark relative overflow-hidden">
      <div className="section-padding">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="work-title mb-16 max-w-4xl">
            <span className="text-xs font-mono tracking-wider text-[#ced4da] uppercase">
              Proof Points
            </span>
            <h2 className="text-section font-serif text-foreground mt-4">
              The Work
            </h2>
            <p className="text-[#ced4da] mt-4 max-w-2xl">
              Not slides about transformation. The actual work, on stage and in practice.
            </p>
          </div>

          {/* Staggered Cards */}
          <div className="work-cards-container grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {workItems.map((item, i) => {
              const Icon = item.icon;
              const offsets = ["lg:mt-0", "lg:mt-12", "lg:mt-6"];
              return (
                <div
                  key={item.id}
                  className={`work-card group relative ${offsets[i]}`}
                >
                  {/* Card */}
                  <div className="relative rounded-2xl border border-white/10 bg-dark-alt/80 overflow-hidden transition-all duration-500 hover:translate-y-[-8px] hover:border-primary/30 hover:shadow-[0_20px_60px_rgba(0,188,212,0.08)]">
                    {/* Badge */}
                    <div className="work-badge absolute top-4 right-4 z-10">
                      <span
                        className={`px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider border ${item.badgeColor}`}
                      >
                        {item.badge}
                      </span>
                    </div>

                    {/* Media */}
                    <div className="relative h-48 bg-gradient-to-br from-dark-alt to-dark flex items-center justify-center border-b border-white/5 overflow-hidden">
                      {item.image ? (
                        <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                      ) : (
                        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/30 transition-all duration-500">
                          <Icon className="w-7 h-7 text-[#ced4da] group-hover:text-primary transition-colors duration-500" />
                        </div>
                      )}
                      {/* Ambient metric */}
                      <div className="absolute bottom-4 right-4 text-right">
                        <div className="text-3xl font-bold text-primary/15 font-serif">
                          {item.metric}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-serif text-foreground mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm font-mono text-primary/70 mb-4">
                        {item.subtitle}
                      </p>
                      <p className="text-sm text-[#ced4da] leading-relaxed mb-5">
                        {item.description}
                      </p>

                      {/* Metric bar */}
                      <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-primary font-mono">
                            {item.metric}
                          </span>
                          <span className="text-xs text-[#ced4da]">
                            {item.metricLabel}
                          </span>
                        </div>
                        {item.link && item.link !== "#" && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-mono text-primary/60 hover:text-primary transition-colors"
                          >
                            View <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "../gsap-provider";
import { ChevronDown, CheckCircle2, ArrowUp, MessageCircle } from "lucide-react";

interface StackLayer {
  id: string;
  title: string;
  period: string;
  role: string;
  context: string;
  whatIBuilt: string[];
  whatItUnlocked: string;
  keyMetric?: string;
}

const stackLayers: StackLayer[] = [
  {
    id: "strategy",
    title: "Strategy & AI",
    period: "2024–Present",
    role: "Executive Director, AI Transformation & Manufacturing PMO, The Estée Lauder Companies",
    context:
      "Leading the integration of Generative AI into global operations. Internal AI catalyst: directly piloting and scaling capabilities across the supply chain and beyond.",
    whatIBuilt: [
      "20+ GenAI use cases deployed across manufacturing and supply chain",
      "AI enablement: 1,000+ people trained with adoption networks and change management",
      "Transformation Office: 60 projects, ~$100M annually, 5 plants",
      "Stanford AI program, Microsoft partnership, external innovation pipeline",
    ],
    whatItUnlocked:
      "Enterprise-wide AI transformation leadership. Fluent in both the technical and business languages.",
  },
  {
    id: "program",
    title: "Supply Chain Digitalization & Programs",
    period: "2018–2024",
    role: "Executive Director, Program Management, Global Supply Chain, The Estée Lauder Companies",
    context:
      "Owned the transformation portfolio connecting business process redesign with IT systems delivery. $49M restructuring, $500M+ integrated roadmap. Inherited a fragmented MFG digital transformation and rebuilt it from scratch.",
    whatIBuilt: [
      "Leading Beauty Forward: $49M program, 170% ROI",
      "Runway: $16.1M enterprise platform integrating business PMO with Agile IT",
      "Co-authored $500M+ digital and operational excellence roadmap",
      "MFG Digital Transformation: drove EY vendor selection, aligned senior leadership, authored E2E roadmap across 4 workstreams and 20+ projects",
      "Cross-functional governance eliminating silos across strategy, manufacturing, and IT",
    ],
    whatItUnlocked:
      "Credibility to lead transformation at enterprise scale. Proved I could walk into organizational chaos, build structure, and deliver at scale.",
    keyMetric: "170% ROI",
  },
  {
    id: "quality",
    title: "Quality Systems",
    period: "2015–2018",
    role: "Executive Director, Quality Assurance, The Estée Lauder Companies",
    context:
      "Modernized ELC's largest regulated manufacturing site. Quality wasn't just compliance: it was a cash flow lever.",
    whatIBuilt: [
      "Lab cycle time: 12 days → 2.7 days",
      "$3.75M annual inventory savings",
      "Kotter change model: grassroots continuous improvement",
      "$1M saved in 90 days through frontline empowerment",
    ],
    whatItUnlocked:
      "Quality as a business driver, not a cost center. Earned the trust to move into enterprise transformation.",
    keyMetric: "$3.75M savings",
  },
  {
    id: "manufacturing",
    title: "Manufacturing & Operations",
    period: "2002–2015",
    role: "Quality & Operations Leadership at Coty, EI Pharma, Leiner Health Products",
    context:
      "13 years across cosmetics, pharmaceuticals, and nutraceuticals. Led a $21.7M North American manufacturing consolidation, built and optimized a 70-person quality organization, and took a facility from 10% FDA compliance to audit-ready.",
    whatIBuilt: [
      "Coty consolidation: $21.7M capex, $14.5M annual savings, 70→42 person org (40% reduction, 39% productivity gain)",
      "FDA readiness: took Sanford facility from ~10% to full 21 CFR 210/211 compliance",
      "QVC quality: $300M+ channel revenue, drove returns from 9.3% to 7.8%",
      "Supplier management redesign: incidents down 60%",
      "Leiner: quarantine inventory $16M → $200K across 5 plants",
    ],
    whatItUnlocked:
      "Deep operational credibility, HBR-recognized change leadership, and a repeatable playbook: chaos → assessment → alignment → structure → execution.",
    keyMetric: "$14.5M/yr savings",
  },
  {
    id: "foundation",
    title: "Technical Foundation",
    period: "1992–2002",
    role: "USAF Veteran (AGE Technician) + B.S. Biology, Queens College",
    context:
      "Military discipline plus scientific literacy. The foundation everything else is built on.",
    whatIBuilt: [
      "USAF: Aerospace Ground Equipment, 24/7 ops, zero-defect mentality",
      "Operation Provide Comfort II: two Achievement Medals",
      "B.S. Biology: bridged electromechanical skills with life sciences",
    ],
    whatItUnlocked:
      "A permanent operating system: precision under pressure, systematic thinking, dual technical literacy.",
  },
];

export function StackSection({ focus }: { focus?: string }) {
  // Auto-expand the most relevant accordion item based on focus mode
  const defaultOpen = focus === "ai" ? 0
    : focus === "supply-chain" ? 1
    : focus === "quality" ? 2
    : null;
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen);
  const accordionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Section title animation
      gsap.fromTo(
        ".stack-title",
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

      // Accordion items stagger
      gsap.fromTo(
        ".accordion-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".accordion-container",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Handle accordion animation
  useEffect(() => {
    accordionRefs.current.forEach((ref, index) => {
      if (!ref) return;

      const content = ref.querySelector(".accordion-content") as HTMLElement;
      if (!content) return;

      if (index === openIndex) {
        // Open animation
        gsap.to(content, {
          height: "auto",
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        });
      } else {
        // Close animation
        gsap.to(content, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        });
      }
    });

    // Refresh ScrollTrigger after accordion change
    setTimeout(() => ScrollTrigger.refresh(), 500);
  }, [openIndex]);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={sectionRef} id="stack" className="bg-dark relative">
      <div className="section-padding">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="stack-title mb-12">
            <span className="text-xs font-mono tracking-wider text-muted-foreground uppercase">
              The Journey
            </span>
            <h2 className="text-section font-serif text-foreground mt-4">
              From floor to boardroom
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl">
              Each chapter taught me a new language. Quality, operations, programs, strategy, AI: 
              fluency in each one unlocked the next transformation.
            </p>
          </div>

          {/* Accordion */}
          <div className="accordion-container space-y-3">
            {stackLayers.map((layer, index) => (
              <div
                key={layer.id}
                ref={(el) => {
                  accordionRefs.current[index] = el;
                }}
                className={`accordion-item content-card ${
                  index === 0 ? "border-primary/30" : ""
                }`}
              >
                {/* Accordion header - sticky when open so content scrolls below it */}
                <button
                  onClick={() => toggleAccordion(index)}
                  className={`w-full p-6 flex items-center justify-between text-left hover:bg-secondary/20 transition-colors ${
                    openIndex === index
                      ? "sticky top-0 z-20 bg-dark-alt border-b border-border rounded-t-xl"
                      : ""
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-mono text-muted-foreground">
                        {layer.period}
                      </span>
                      {index === 0 && (
                        <span className="px-2 py-0.5 rounded text-xs font-mono bg-primary/20 text-primary">
                          Current
                        </span>
                      )}
                    </div>
                    <h3
                      className={`text-xl font-serif ${
                        index === 0 ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {layer.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {layer.role}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 ml-4">
                    {layer.keyMetric && (
                      <span className="text-sm sm:text-lg font-bold text-primary gauge-number">
                        {layer.keyMetric}
                      </span>
                    )}
                    <ChevronDown
                      className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                {/* Accordion content */}
                <div
                  className="accordion-content"
                  style={{ height: 0, opacity: 0 }}
                >
                  <div className="px-6 pb-6 space-y-6 border-t border-border pt-6">
                    {/* Context */}
                    <p className="text-muted-foreground leading-relaxed">
                      {layer.context}
                    </p>

                    {/* What I Built */}
                    <div>
                      <h4 className="text-xs font-mono text-muted-foreground tracking-wider uppercase mb-3">
                        What I Built
                      </h4>
                      <ul className="space-y-2">
                        {layer.whatIBuilt.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* What It Unlocked */}
                    <div className="p-4 rounded-lg bg-secondary/30 border border-border">
                      <div className="flex items-start gap-3">
                        <ArrowUp className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="text-sm font-semibold text-foreground mb-1">
                            What It Unlocked
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {layer.whatItUnlocked}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Ask AI CTA */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.dispatchEvent(new Event("open-chat-widget"));
                      }}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors text-sm text-primary"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Want details? Ask my AI about this chapter
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

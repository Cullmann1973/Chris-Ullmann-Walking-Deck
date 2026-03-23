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
      "Leading AI transformation across global manufacturing with governance, capability building, and enterprise execution.",
    whatIBuilt: [
      "Transformation Office: 60 projects, ~$100M annually, 5 plants",
      "Governance frameworks built with Legal and Compliance before scaling",
      "Activated 1,000+ people on AI through structured adoption programs",
      "100+ member AI Community of Practice established for peer-led capability growth",
      "ELLA (line-level manufacturing assistant) presented at Microsoft Ignite as enterprise AI adoption case study",
      "Stanford HAI coursework (XFM110 + XFM111): human-centered AI training covering ethics, bias mitigation, legal risk, trust frameworks, and workforce transformation",
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
      "Managed Program Runway across global brands and functions, connecting portfolio strategy to measurable enterprise value.",
    whatIBuilt: [
      "Program Runway delivered $49M+ enterprise value chain transformation at 170% ROI",
      "Authored the $500M+ Integrated Manufacturing Transformation roadmap across four workstreams",
      "Program managed the $13.3M Engineering Tech Center build",
      "Aligned MAC, Clinique, Estée Lauder, Bobbi Brown, and Tom Ford teams around shared digital operating models",
    ],
    whatItUnlocked:
      "Enterprise-scale transformation credibility. Proved I could take a $49M+ portfolio from chaos to 170% ROI, build permanent manufacturing capabilities, and align C-suite sponsors across the biggest beauty brands in the world.",
    keyMetric: "170% ROI",
  },
  {
    id: "quality",
    title: "Quality Systems",
    period: "2015–2018",
    role: "Executive Director, Quality Assurance, The Estée Lauder Companies",
    context:
      "Initiated and led a global Quality organization restructure, shifting quality from reactive control to proactive assurance.",
    whatIBuilt: [
      "Global quality organization restructure aligned teams to risk, compliance, and business priorities",
      "Regulatory compliance buildout across FDA and GMP expectations at enterprise scale",
      "Continuous improvement program built with Kotter change management and Lean methodologies",
      "$45M/year working capital released through quality systems redesign",
    ],
    whatItUnlocked:
      "Quality as a business driver, not a cost center. Earned the trust to move into enterprise transformation.",
    keyMetric: "$45M/yr released",
  },
  {
    id: "manufacturing",
    title: "Manufacturing & Operations",
    period: "2002–2015",
    role: "Quality & Operations Leadership at Coty, EI Pharma, Leiner Health Products",
    context:
      "Built and led manufacturing quality systems across pharmaceutical, OTC, cosmetic, and nutraceutical operations.",
    whatIBuilt: [
      "$21.7M multi-site consolidation and plant closure program delivered $39M first-year savings",
      "Quality management systems built from scratch across regulated manufacturing environments",
      "Lean and Kaizen practices embedded into day-to-day operating rhythms",
      "Supplier quality program redesigned to improve reliability and risk visibility",
      "Transformation work featured in Harvard Business Review",
    ],
    whatItUnlocked:
      "Deep operational credibility, HBR-recognized change leadership, and a repeatable playbook: chaos → assessment → alignment → structure → execution.",
    keyMetric: "$39M 1st-yr savings",
  },
  {
    id: "foundation",
    title: "Technical Foundation",
    period: "1992–2002",
    role: "USAF Veteran (AGE Technician) + B.S. Biology, Queens University of Charlotte",
    context:
      "USAF service and scientific training established the zero-defect mentality and systems thinking behind every later transformation.",
    whatIBuilt: [
      "USAF Aerospace Ground Equipment technician in 24/7 mission-critical operations",
      "Operation Provide Comfort II service with two Achievement Medals",
      "Completed B.S. Biology while working full-time, blending technical and life-science rigor",
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
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "top 55%",
            scrub: 1.5,
          },
        }
      );

      // Accordion items stagger
      gsap.fromTo(
        ".accordion-item",
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: ".accordion-container",
            start: "top 85%",
            end: "top 55%",
            scrub: 1.5,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Track which accordion is being animated (to avoid useEffect double-firing)
  const isAnimatingRef = useRef(false);

  // Handle accordion animation on initial render only (for defaultOpen)
  useEffect(() => {
    if (isAnimatingRef.current) return;
    accordionRefs.current.forEach((ref, index) => {
      if (!ref) return;
      const content = ref.querySelector(".accordion-content") as HTMLElement;
      if (!content) return;
      if (index === openIndex) {
        gsap.set(content, { height: "auto", opacity: 1 });
      } else {
        gsap.set(content, { height: 0, opacity: 0 });
      }
    });
    setTimeout(() => ScrollTrigger.refresh(), 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleAccordion = (index: number) => {
    const isClosing = openIndex === index;
    const newIndex = isClosing ? null : index;
    const clickedRef = accordionRefs.current[index];

    if (!clickedRef) {
      setOpenIndex(newIndex);
      return;
    }

    // Save the clicked header's viewport Y before any animation
    const savedTop = clickedRef.getBoundingClientRect().top;

    // Compensate scroll on every GSAP tick so the header stays pinned
    const compensate = () => {
      const drift = clickedRef.getBoundingClientRect().top - savedTop;
      if (Math.abs(drift) > 1) {
        window.scrollTo({ top: window.scrollY + drift, behavior: "instant" as ScrollBehavior });
      }
    };

    isAnimatingRef.current = true;

    // Close the previously open accordion (if different from clicked)
    if (openIndex !== null && openIndex !== index) {
      const prevRef = accordionRefs.current[openIndex];
      if (prevRef) {
        const prevContent = prevRef.querySelector(".accordion-content") as HTMLElement;
        if (prevContent) {
          gsap.to(prevContent, {
            height: 0,
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            onUpdate: compensate,
          });
        }
      }
    }

    // Open or close the clicked accordion
    const clickedContent = clickedRef.querySelector(".accordion-content") as HTMLElement;
    if (clickedContent) {
      if (isClosing) {
        gsap.to(clickedContent, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
          onUpdate: compensate,
          onComplete: () => {
            isAnimatingRef.current = false;
            ScrollTrigger.refresh();
          },
        });
      } else {
        gsap.to(clickedContent, {
          height: "auto",
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          onUpdate: compensate,
          onComplete: () => {
            isAnimatingRef.current = false;
            ScrollTrigger.refresh();
          },
        });
      }
    } else {
      isAnimatingRef.current = false;
    }

    setOpenIndex(newIndex);
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

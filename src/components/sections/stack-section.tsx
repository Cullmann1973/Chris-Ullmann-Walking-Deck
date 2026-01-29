"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "../gsap-provider";
import { ChevronDown, CheckCircle2, ArrowUp } from "lucide-react";

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
      "Leading the integration of Generative AI into North America operations. Not advising from the sidelines: directly piloting and scaling AI capabilities across the supply chain.",
    whatIBuilt: [
      "20+ GenAI use cases: SOP automation, real-time KPI dashboards, predictive line diagnostics",
      "AI Core Tech Team enablement program: trained 1,000+ people",
      "Stanford AI certification (XFM110): Transformers, LLMs, Chain-of-Thought, HELM framework",
    ],
    whatItUnlocked:
      "Positioned to lead enterprise-wide AI transformation. Can speak both the technical language (model architecture, prompt engineering) and the business language (ROI, change management).",
  },
  {
    id: "program",
    title: "Program Management",
    period: "2018–2024",
    role: "Program Director, Leading Beauty Forward Initiative",
    context:
      "Managed a $49M budget within ELC's global restructuring initiative. Responsible for 'Runway Transformation' and the Integrated Manufacturing Transformation roadmap ($500M+).",
    whatIBuilt: [
      "Delivered 170% ROI on committed benefits ($29M committed vs. significantly higher realized)",
      "Engineering Tech Center: a sandbox for testing new manufacturing technologies",
      "Supply chain resilience playbook during COVID-19 disruptions",
      "Cross-functional governance model connecting strategy to floor execution",
    ],
    whatItUnlocked:
      "Credibility to lead transformation at enterprise scale. Proved I could manage P&L-level budgets while maintaining operational excellence.",
    keyMetric: "170% ROI",
  },
  {
    id: "quality",
    title: "Quality Systems",
    period: "2015–2018",
    role: "Executive Director, Quality Assurance, The Estée Lauder Companies",
    context:
      "Modernized the largest regulated cosmetic manufacturing facility in ELC's network (Melville, NY). Quality wasn't just compliance: it was a cash flow lever.",
    whatIBuilt: [
      "Lab testing turnaround: 12 days → 2.7 days",
      "$3.75M annual inventory savings",
      "Kotter's 8-Step Change Model implementation: grassroots CI program",
      "$1M saved in 90 days through frontline empowerment",
    ],
    whatItUnlocked:
      "Demonstrated that Quality can be a business driver, not a cost center. Earned the trust to move into Program Management.",
    keyMetric: "$3.75M savings",
  },
  {
    id: "manufacturing",
    title: "Manufacturing Floor",
    period: "2002–2015",
    role: "Quality & Operations Leadership at Leiner, EI Pharma, Coty",
    context:
      "13 years of progressive leadership across nutraceuticals, pharmaceuticals, and cosmetics. Each role required building systems that directly touched production.",
    whatIBuilt: [
      "Leiner: Quarantine inventory $16M → $200K (released $15.8M in working capital)",
      "EI Pharma: Led cosmetic → pharmaceutical transition, primary FDA liaison",
      "Coty: Non-moving inventory $1.5M → $200K, supplier incidents down 60%",
      "SAP QM implementations and tech transfer validations across multiple sites",
    ],
    whatItUnlocked:
      "Deep operational credibility. When I talk about 'the floor,' I'm not abstracting: I've run batch records, validated equipment, and negotiated with FDA inspectors.",
    keyMetric: "$16M → $200K",
  },
  {
    id: "foundation",
    title: "Technical Foundation",
    period: "1992–2002",
    role: "USAF Veteran (AGE Technician) + B.S. Biology, Queens College",
    context:
      "The foundation that everything else built upon. Military discipline plus scientific literacy created a rare 'technical biologist' profile.",
    whatIBuilt: [
      "USAF: Aerospace Ground Equipment maintenance: 24/7 ops, zero-defect mentality",
      "Operation Provide Comfort II: Combat support, earned 2 Achievement Medals",
      "Queens College: B.S. Biology: bridged electromechanical skills with life sciences",
      "Dual literacy: Can talk bacterial growth with scientists AND HVAC systems with engineers",
    ],
    whatItUnlocked:
      "A permanent operating system: SOPs, preventative maintenance, precision under pressure. The military doesn't tolerate 'good enough': that standard followed me into every civilian role.",
  },
];

export function StackSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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
              The Stack
            </span>
            <h2 className="text-section font-serif text-foreground mt-4">
              Built at every layer
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl">
              Each layer represents a phase of building. Click any layer to see what
              I constructed there, and how skills from lower layers enabled success
              at higher ones.
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
                className={`accordion-item content-card overflow-hidden ${
                  index === 0 ? "border-primary/30" : ""
                }`}
              >
                {/* Accordion header */}
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-secondary/20 transition-colors"
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

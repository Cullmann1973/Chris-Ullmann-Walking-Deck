"use client";

import { motion } from "framer-motion";
import { ArrowUp, CheckCircle2 } from "lucide-react";

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
    role: "Executive Director, PMO & Strategy, The Estée Lauder Companies",
    context:
      "Leading the integration of Generative AI into North America operations. Not advising from the sidelines -directly piloting and scaling AI capabilities across the supply chain.",
    whatIBuilt: [
      "20+ GenAI use cases: SOP automation, real-time KPI dashboards, predictive line diagnostics",
      "AI Core Tech Team enablement program -trained 600+ employees",
      "Fusion Teams model: 3 power users → 100+ practitioners",
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
      "Engineering Tech Center -a sandbox for testing new manufacturing technologies",
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
      "Modernized the largest regulated cosmetic manufacturing facility in ELC's network (Melville, NY). Quality wasn't just compliance -it was a cash flow lever.",
    whatIBuilt: [
      "Lab testing turnaround: 12 days → 2.7 days",
      "Released $30-35M annually in inventory working capital",
      "Kotter's 8-Step Change Model implementation -grassroots CI program",
      "$1M saved in 90 days through frontline empowerment",
    ],
    whatItUnlocked:
      "Demonstrated that Quality can be a business driver, not a cost center. Earned the trust to move into Program Management.",
    keyMetric: "$30M+ released",
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
      "Deep operational credibility. When I talk about 'the floor,' I'm not abstracting -I've run batch records, validated equipment, and negotiated with FDA inspectors.",
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
      "USAF: Aerospace Ground Equipment maintenance -24/7 ops, zero-defect mentality",
      "Operation Provide Comfort II: Combat support, earned 2 Achievement Medals",
      "Queens College: B.S. Biology -bridged electromechanical skills with life sciences",
      "Dual literacy: Can talk bacterial growth with scientists AND HVAC systems with engineers",
    ],
    whatItUnlocked:
      "A permanent operating system: SOPs, preventative maintenance, precision under pressure. The military doesn't tolerate 'good enough' -that standard followed me into every civilian role.",
  },
];

export default function TheStackPage() {
  return (
    <div className="min-h-screen px-6 py-20 lg:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
            The Stack
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Each layer represents a phase of building. Click any layer to see what I
            constructed there -and how skills from lower layers enabled success at
            higher ones.
          </p>
        </motion.div>

        {/* Stack Visualization */}
        <div className="space-y-6">
          {stackLayers.map((layer, index) => (
            <motion.div
              key={layer.id}
              id={layer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="scroll-mt-24"
            >
              <div
                className={`rounded-xl border overflow-hidden ${
                  index === 0
                    ? "border-primary/50 bg-primary/5"
                    : "border-border bg-card"
                }`}
              >
                {/* Layer Header */}
                <div className="p-6 border-b border-border">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-mono text-muted-foreground">
                          {layer.period}
                        </span>
                        {index === 0 && (
                          <span className="px-2 py-0.5 rounded text-xs font-mono bg-primary/20 text-primary">
                            Current
                          </span>
                        )}
                      </div>
                      <h2
                        className={`text-xl font-bold ${
                          index === 0 ? "text-primary" : "text-foreground"
                        }`}
                      >
                        {layer.title}
                      </h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        {layer.role}
                      </p>
                    </div>
                    {layer.keyMetric && (
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary gauge-number">
                          {layer.keyMetric}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Layer Content */}
                <div className="p-6 space-y-6">
                  {/* Context */}
                  <p className="text-muted-foreground leading-relaxed">
                    {layer.context}
                  </p>

                  {/* What I Built */}
                  <div>
                    <h3 className="text-sm font-mono text-muted-foreground tracking-wider uppercase mb-3">
                      What I Built
                    </h3>
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
                  <div className="p-4 rounded-lg bg-muted/50 border border-border">
                    <div className="flex items-start gap-3">
                      <ArrowUp className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="text-sm font-semibold text-foreground mb-1">
                          What It Unlocked
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {layer.whatItUnlocked}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Connector Line */}
              {index < stackLayers.length - 1 && (
                <div className="flex justify-center py-2">
                  <div className="w-px h-6 bg-border" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground mb-4">
            Want to explore a specific layer in more depth?
          </p>
          <a
            href="/ai-copilot"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            Ask My Digital Twin
          </a>
        </motion.div>
      </div>
    </div>
  );
}

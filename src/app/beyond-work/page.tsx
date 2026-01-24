"use client";

import { motion } from "framer-motion";
import { Wrench, Heart, Car, Users, MapPin, Plane } from "lucide-react";

interface LifeSection {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  items: string[];
  quote: string;
}

const lifeSections: LifeSection[] = [
  {
    id: "maker",
    title: "The Maker",
    subtitle: "Self-taught engineering and digital fabrication",
    icon: Wrench,
    items: [
      "Self-taught: Fusion 360, 3D modeling, CAD design",
      "3D printing (FDM & resin) for prototyping and production",
      "Python scripting and automation for personal projects",
      "Hardware integration and electronics tinkering",
      "Continuous learner: from Air Force hydraulics to AI architectures",
    ],
    quote: "Every technical skill I have is self-taught. I don't consume technology -I master it.",
  },
  {
    id: "family",
    title: "The Family",
    subtitle: "Building across geographies",
    icon: Heart,
    items: [
      "Leslie -partner and co-pilot in adventure, shared love of travel",
      "Isabella 'Bella' (2009) -NC-based, logistics turned into a love language",
      "Emilia 'Emmi' (2019) -Long Island School for the Gifted",
      "Hawaii chapter -Mililani sanctuary, a strategic pivot toward balance",
    ],
    quote: "Parenting across distances required turning logistics into a triumph -and a bond.",
  },
  {
    id: "philosophy",
    title: "The Philosophy",
    subtitle: "Porsche 911 as design inspiration",
    icon: Car,
    items: [
      "Evolution over revolution -refine, don't replace",
      "Engineering integrity without excess",
      "Performance with purpose, not performance for show",
      "The 911 GT3: uncompromising, precise, connected",
    ],
    quote: "The pursuit of understanding is its own reward.",
  },
  {
    id: "community",
    title: "The Community",
    subtitle: "People first, always",
    icon: Users,
    items: [
      "Jewish Business Network (JBN) of Long Island -executive roundtables",
      "Mental Health Champion -launched Wellbeing & ERG programs",
      "Veterans advocacy -connected to service as a disabled Gulf War veteran",
      "Mentorship -using accumulated knowledge to lift others up",
    ],
    quote: "Business success should be a vehicle for community impact.",
  },
];

export default function BeyondWorkPage() {
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
            Beyond Work
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            The systems I build at home mirror the ones I build at work.
            Precision, purpose, and continuous improvement -whether it&apos;s a
            3D-printed prototype or a cross-country custody schedule.
          </p>
        </motion.div>

        {/* Life Sections */}
        <div className="space-y-8">
          {lifeSections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="scroll-mt-24"
              >
                <div className="rounded-xl border border-border bg-card overflow-hidden">
                  {/* Section Header */}
                  <div className="p-6 border-b border-border">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-foreground">
                          {section.title}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          {section.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Section Content */}
                  <div className="p-6 space-y-4">
                    <ul className="space-y-3">
                      {section.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span className="text-sm text-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Quote */}
                    <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border">
                      <p className="text-sm text-muted-foreground italic">
                        &ldquo;{section.quote}&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Hawaii Feature */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <div className="rounded-xl border border-primary/30 bg-primary/5 overflow-hidden">
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-lg bg-primary/20 border border-primary/30">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-primary">
                    The Pacific Chapter
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Mililani, Oahu • 2024–Present
                  </p>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-4">
                In late 2024, Leslie and I initiated a transformative life change:
                establishing a home in Hawaii. Mililani is a planned community in
                Central Oahu known for its orderly, suburban atmosphere and lush
                greenery. It&apos;s a choice that reflects a desire for community and
                tranquility -a sanctuary where the &ldquo;Builder&rdquo; can rest.
              </p>

              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Plane className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">Biannual pilgrimages</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">Family sanctuary</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground mb-4">
            Want to know more about any of these areas?
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

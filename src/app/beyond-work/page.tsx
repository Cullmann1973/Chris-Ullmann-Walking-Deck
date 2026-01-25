"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function BeyondWorkPage() {
  return (
    <div className="min-h-screen">
      {/* Warm gradient header - breaks from the dark industrial theme */}
      <div className="bg-gradient-to-b from-amber-950/20 via-background to-background">
        <div className="px-6 pt-20 pb-12 lg:px-12">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-3xl md:text-4xl font-serif font-normal tracking-tight text-foreground mb-6">
                Beyond Work
              </h1>
              <p className="text-xl text-amber-200/80 leading-relaxed">
                The professional pages tell you what I&apos;ve built. This one tells you why I build.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content - narrative prose style */}
      <div className="px-6 py-12 lg:px-12">
        <div className="max-w-3xl mx-auto space-y-16">

          {/* Leslie and the Girls */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-serif text-amber-100 mb-6">Leslie and the Girls</h2>

            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-6">
                Leslie is my co-pilot in every sense. We share a love of travel, a tolerance for complexity, and an understanding that life rarely follows a neat plan. Together we&apos;re raising Emilia (Emmi), who at five already attends the Long Island School for the Gifted and reminds me daily that curiosity is hereditary.
              </p>

              <p className="text-muted-foreground leading-relaxed mb-6">
                And then there&apos;s Isabella (Bella), my daughter in North Carolina. She was born in 2009, and our story has been one of distance, determination, and a lot of unaccompanied minor flights. When you can&apos;t be there every day, you learn to show up in other ways: tracking Track Out schedules, coordinating across state lines, turning logistics into a love language.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Parenting across geographies isn&apos;t what I imagined, but it taught me something I use every day at work: presence doesn&apos;t require proximity. You can lead, support, and love from anywhere if you&apos;re intentional about it.
              </p>
            </div>
          </motion.section>

          {/* Hawaii */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-serif text-amber-100 mb-6">The Hawaii Chapter</h2>

            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-6">
                In late 2024, Leslie and I made a decision that surprised some people: we bought a home in Mililani, on Oahu. Not as a vacation property, but as a sanctuary. A place where the &quot;Builder&quot; can stop building for a while.
              </p>

              <p className="text-muted-foreground leading-relaxed mb-6">
                Mililani is a planned community in Central Oahu, known for its orderly suburban atmosphere and lush greenery. It&apos;s quiet. It&apos;s green. It&apos;s 5,000 miles from the nearest boardroom. That&apos;s the point.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                We visit on biannual pilgrimages now, with the long-term vision of spending more time there as the years go on. After decades of high-velocity work, having a place designed for stillness feels less like luxury and more like necessary infrastructure.
              </p>
            </div>
          </motion.section>

          {/* The Maker */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-serif text-amber-100 mb-6">Still Building Things</h2>

            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-6">
                I can&apos;t seem to stop tinkering. My garage has a 3D printer (FDM and resin), Shapr3D running on my iPad, and an ever-growing collection of half-finished projects. I taught myself CAD the same way I taught myself everything else: by needing to solve a problem and refusing to pay someone else to solve it.
              </p>

              <p className="text-muted-foreground leading-relaxed mb-6">
                The Air Force gave me hydraulics, pneumatics, and a zero-defect mentality. Queens College gave me biology and chemistry. Everything since then has been self-taught: Python scripting, hardware integration, electronics. Every skill I have came from curiosity plus necessity.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                That&apos;s probably the through-line of my whole life: I don&apos;t consume technology, I master it. Whether it&apos;s a new manufacturing process at work or a new fabrication technique at home, I want to understand how it works from the inside out.
              </p>
            </div>
          </motion.section>

          {/* The Maker's Bench */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-serif text-amber-100 mb-6">The Maker&apos;s Bench</h2>

            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-6">
                I build things at every level. Not metaphorically: physically. My workbench has a 3D printer running Shapr3D designs, Python scripts automating processes, and hardware prototypes in various states of completion. Every skill I have is self-taught, driven by a simple rule: if I need it, I&apos;ll learn to make it.
              </p>

              <p className="text-muted-foreground leading-relaxed mb-6">
                That same instinct applies to my professional work. The governance frameworks, AI agents, and transformation roadmaps I create are just different materials on a different bench. The approach is identical: understand the problem deeply, prototype solutions, iterate until it works.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Most executives either strategize or operate. I do both because I never stopped being a maker. Whether it&apos;s a $500M transformation roadmap or a custom 3D-printed bracket, the satisfaction comes from the same place: something that didn&apos;t exist now does, and it solves a real problem.
              </p>
            </div>
          </motion.section>

          {/* Community */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-serif text-amber-100 mb-6">Giving Back</h2>

            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-6">
                I&apos;m active in the Jewish Business Network of Long Island, where I participate in executive roundtables and community giving initiatives. At work, I&apos;ve championed mental health programs and launched Wellbeing ERGs because I&apos;ve seen what happens when people don&apos;t have support systems.
              </p>

              <p className="text-muted-foreground leading-relaxed mb-6">
                I&apos;m a disabled Gulf War veteran, which keeps me connected to veterans advocacy. Service doesn&apos;t end when you take off the uniform. The people I served with taught me that community isn&apos;t optional; it&apos;s load-bearing infrastructure for a meaningful life.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Business success should be a vehicle for community impact, not the destination. The accumulation of resources only matters if you&apos;re using them to lift others up.
              </p>
            </div>
          </motion.section>

          {/* Closing */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="pt-8 border-t border-amber-900/30"
          >
            <p className="text-lg text-amber-200/70 italic leading-relaxed text-center max-w-2xl mx-auto">
              &quot;The pursuit of understanding is its own reward.&quot;
            </p>
          </motion.section>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center pt-8"
          >
            <p className="text-muted-foreground mb-4">
              Want to know more?
            </p>
            <Link
              href="/ai-copilot"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-amber-900/50 text-amber-100 font-medium hover:bg-amber-900/70 transition-colors border border-amber-800/50"
            >
              Ask Me Anything
            </Link>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

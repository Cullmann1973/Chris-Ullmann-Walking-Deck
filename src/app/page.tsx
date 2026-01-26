"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Layers, Mail, Linkedin, User } from "lucide-react";

const stackLayers = [
  { id: "strategy", label: "STRATEGY & AI", current: true },
  { id: "program", label: "PROGRAM MANAGEMENT", current: false },
  { id: "quality", label: "QUALITY SYSTEMS", current: false },
  { id: "manufacturing", label: "MANUFACTURING FLOOR", current: false },
  { id: "foundation", label: "TECHNICAL FOUNDATION", current: false },
];

export default function HomePage() {
  // Headshot image at /public/headshot.png
  const hasHeadshot = true;

  return (
    <div className="min-h-screen">
      {/* Hero Section - Insight First */}
      <section className="px-6 pt-20 pb-16 lg:pt-28 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex-1"
            >
              <p className="text-sm font-mono text-primary tracking-wider uppercase mb-6">
                Christopher Ullmann
              </p>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight mb-8">
                Most transformation leaders know strategy{" "}
                <span className="text-muted-foreground">or</span> operations.
                <br />
                <span className="text-primary">I&apos;ve built at every layer.</span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-2xl mb-8 leading-relaxed">
                From Air Force flight lines to Fortune 500 boardrooms, I&apos;ve operated
                as a technician, scientist, quality leader, program manager, and now
                AI strategist. That range isn&apos;t a winding career -it&apos;s what makes
                me effective at connecting strategy to execution.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/the-stack"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                >
                  <Layers className="w-4 h-4" />
                  Explore The Stack
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/ai-copilot"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-muted transition-colors"
                >
                  Ask My Digital Twin
                </Link>
              </div>
            </motion.div>

            {/* Headshot */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 lg:mt-0 flex-shrink-0"
            >
              <div className="relative w-48 h-48 lg:w-56 lg:h-56 mx-auto lg:mx-0">
                {hasHeadshot ? (
                  <Image
                    src="/headshot.png"
                    alt="Christopher Ullmann"
                    fill
                    className="object-cover rounded-2xl"
                    priority
                  />
                ) : (
                  <div className="w-full h-full rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-border flex items-center justify-center">
                    <User className="w-20 h-20 text-muted-foreground/50" />
                  </div>
                )}
                {/* Decorative frame */}
                <div className="absolute -inset-2 rounded-2xl border border-primary/20 -z-10" />
                <div className="absolute -inset-4 rounded-3xl border border-primary/10 -z-20" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Current Role Badge */}
      <section className="px-6 py-8 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="p-4 rounded-xl bg-card border border-border"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1">
                  Current Role
                </p>
                <p className="text-foreground font-medium">
                  Executive Director, AI Transformation
                </p>
                <p className="text-sm text-muted-foreground">
                  Manufacturing PMO • Supply Chain • The Estée Lauder Companies
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-primary/10 text-primary border border-primary/30">
                  GenAI Strategy
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-muted text-muted-foreground">
                  Stanford AI
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Stack Preview */}
      <section className="px-6 py-16 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-sm font-mono text-muted-foreground tracking-wider uppercase mb-8">
              The Full Stack
            </h2>

            <div className="space-y-2">
              {stackLayers.map((layer, index) => (
                <motion.div
                  key={layer.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                >
                  <Link
                    href={`/the-stack#${layer.id}`}
                    className={`block p-4 rounded-lg border transition-all duration-200 group ${
                      layer.current
                        ? "bg-primary/10 border-primary/50 hover:bg-primary/15"
                        : "bg-card border-border hover:border-primary/30 hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            layer.current ? "bg-primary" : "bg-muted-foreground/50"
                          }`}
                        />
                        <span
                          className={`font-mono text-sm tracking-wider ${
                            layer.current ? "text-primary" : "text-foreground"
                          }`}
                        >
                          {layer.label}
                        </span>
                        {layer.current && (
                          <span className="text-xs text-primary/70 font-mono">
                            ← Current
                          </span>
                        )}
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <p className="text-sm text-muted-foreground mt-6">
              Click any layer to see what I built there -and how it unlocked the next.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The "So What?" Section */}
      <section className="px-6 py-16 lg:px-12 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-mono text-muted-foreground tracking-wider uppercase mb-6">
              Why This Matters
            </h2>

            <div className="space-y-6">
              <p className="text-lg text-foreground leading-relaxed">
                When I lead AI transformation, I&apos;m not guessing what the floor needs.{" "}
                <span className="text-primary">I&apos;ve been on the floor.</span>
              </p>

              <p className="text-lg text-foreground leading-relaxed">
                When I present to the board, I&apos;m not abstracting -
                <span className="text-primary">I&apos;m translating from systems I&apos;ve personally built.</span>
              </p>

              <p className="text-lg text-foreground leading-relaxed">
                When I train teams on GenAI, I&apos;m not teaching theory -
                <span className="text-primary">I&apos;m showing them what I use every day.</span>
              </p>
            </div>

            <div className="mt-8 p-6 rounded-xl glass-card">
              <p className="text-muted-foreground text-sm leading-relaxed">
                Most executives either came up through operations and learned strategy,
                or came from consulting and learned to manage operations. I literally
                built things at each level: wrenching hydraulics → running labs →
                managing P&Ls → architecting AI strategy. Every skill is self-taught.
                Every layer informs the next.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Numbers - Simplified */}
      <section className="px-6 py-16 lg:px-12 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-mono text-muted-foreground tracking-wider uppercase mb-8">
              Selected Results
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: "$30M+", label: "Annual working capital released" },
                { value: "170%", label: "ROI on $49M initiative" },
                { value: "600+", label: "Employees trained in AI" },
                { value: "20+", label: "GenAI use cases piloted" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary gauge-number mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="px-6 py-16 lg:px-12 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Let&apos;s Connect
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Looking for a transformation leader who understands both the boardroom
              and the production floor? Let&apos;s talk.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:c.ullmann@yahoo.com"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                <Mail className="w-4 h-4" />
                c.ullmann@yahoo.com
              </a>
              <a
                href="https://www.linkedin.com/in/chrisullmann/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-muted transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

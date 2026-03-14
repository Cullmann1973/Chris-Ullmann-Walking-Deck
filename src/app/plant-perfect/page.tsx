"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ChevronLeft } from "lucide-react";
import {
  goldenStandardHalSummary,
  goldenStandardProducts,
  packagingComparisonRows,
  plantLines,
  plantPerfectHero,
  plantProducts,
  strategyHalIntro,
  strategyImpact,
  strategyInitiatives,
  strategyInputExample,
  strategyInputPlaceholder,
  technicalCapabilities,
  technicalIntegrations,
  useCaseCards,
  useCaseExamples,
} from "@/lib/plant-perfect-data";

const STRATEGY_TYPING_SPEED_MS = 11;

export default function PlantPerfectPage() {
  const [strategyInput, setStrategyInput] = useState(strategyInputExample);
  const [strategyAnalyzed, setStrategyAnalyzed] = useState(false);
  const [typedCharacters, setTypedCharacters] = useState(0);
  const [goldenLoaded, setGoldenLoaded] = useState(false);

  useEffect(() => {
    const revealTimer = window.setTimeout(() => setGoldenLoaded(true), 60);
    return () => window.clearTimeout(revealTimer);
  }, []);

  useEffect(() => {
    if (!strategyAnalyzed) return;

    const fullLength = strategyHalIntro.length;
    const interval = window.setInterval(() => {
      setTypedCharacters((previous) => {
        if (previous >= fullLength) {
          window.clearInterval(interval);
          return previous;
        }

        return previous + 1;
      });
    }, STRATEGY_TYPING_SPEED_MS);

    return () => window.clearInterval(interval);
  }, [strategyAnalyzed]);

  const strategyPreview = useMemo(
    () => strategyHalIntro.slice(0, typedCharacters),
    [typedCharacters]
  );

  const strategyTypingComplete = typedCharacters >= strategyHalIntro.length;

  const handleAnalyze = () => {
    setTypedCharacters(0);
    setStrategyAnalyzed(true);
  };

  return (
    <main className="min-h-screen bg-[#030303] text-[#f2f2f2]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <header className="relative overflow-hidden rounded-3xl border border-red-500/30 bg-gradient-to-br from-[#140505] via-[#090909] to-[#110808] px-6 py-8 shadow-[0_24px_80px_rgba(0,0,0,0.55)] sm:px-8 sm:py-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,68,68,0.18),transparent_45%)]" />
          <div className="pointer-events-none absolute right-5 top-5">
            <div className="hal-eye h-8 w-8 rounded-full bg-[#ff4444]" />
          </div>

          <div className="relative space-y-5">
            <Link
              href="/#ai"
              className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.18em] text-[#ff7a7a] transition-colors hover:text-[#ffd0d0]"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Blueprint
            </Link>

            <div>
              <p className="text-xs font-mono uppercase tracking-[0.16em] text-[#ff7a7a]">
                {plantPerfectHero.company} | {plantPerfectHero.plant}
              </p>
              <h1 className="mt-2 font-serif text-4xl leading-tight sm:text-5xl">
                {plantPerfectHero.title}
              </h1>
              <p className="mt-2 text-sm font-mono uppercase tracking-[0.14em] text-[#ff9b9b] sm:text-base">
                {plantPerfectHero.subtitle}
              </p>
            </div>

            <p className="max-w-3xl text-sm text-[#d0d0d0] sm:text-base">
              {plantPerfectHero.tagline}
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-red-500/20 bg-black/30 p-3">
                <p className="text-xs font-mono uppercase tracking-[0.12em] text-[#ff9b9b]">
                  Active Lines
                </p>
                <ul className="mt-2 space-y-1 text-sm text-[#dddddd]">
                  {plantLines.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-red-500/20 bg-black/30 p-3">
                <p className="text-xs font-mono uppercase tracking-[0.12em] text-[#ff9b9b]">
                  Product Portfolio
                </p>
                <ul className="mt-2 space-y-1 text-sm text-[#dddddd]">
                  {plantProducts.map((product) => (
                    <li key={product}>{product}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </header>

        <section className="rounded-3xl border border-white/10 bg-[#090909] p-6 sm:p-8">
          <div className="mb-5 flex items-end justify-between">
            <h2 className="font-serif text-2xl">Use Cases</h2>
            <p className="text-xs font-mono uppercase tracking-[0.12em] text-[#a8a8a8]">
              Manufacturing Intelligence
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {useCaseCards.map((card) => (
              <article
                key={card.id}
                className="rounded-2xl border border-white/10 bg-[#0f0f0f] p-5 transition-all duration-300 hover:border-red-400/50 hover:shadow-[0_0_24px_rgba(255,68,68,0.16)]"
              >
                <p className="text-2xl leading-none">{card.icon}</p>
                <h3 className="mt-3 text-lg font-semibold text-[#ffecec]">{card.title}</h3>
                <p className="mt-2 text-sm text-[#c8c8c8]">{card.description}</p>
                {card.actionLabel && card.actionTarget && (
                  <a
                    href={card.actionTarget}
                    className="hal-button mt-4 inline-flex rounded-lg border border-red-500/50 bg-red-500/10 px-3 py-2 text-xs font-mono uppercase tracking-[0.1em] text-[#ff8e8e] transition-all"
                  >
                    {card.actionLabel}
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>

        <section
          id="strategy-integration"
          className="rounded-3xl border border-red-500/20 bg-[#080808] p-6 sm:p-8"
        >
          <div className="space-y-2">
            <p className="text-xs font-mono uppercase tracking-[0.14em] text-[#ff8f8f]">
              Use Case 2
            </p>
            <h2 className="font-serif text-3xl">Strategy Integration Demo</h2>
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <article className="rounded-2xl border border-white/10 bg-[#101010] p-4 sm:p-5">
              <p className="text-xs font-mono uppercase tracking-[0.12em] text-[#ff9b9b]">
                Input Panel
              </p>
              <label htmlFor="strategy-input" className="sr-only">
                Strategy Input
              </label>
              <textarea
                id="strategy-input"
                value={strategyInput}
                onChange={(event) => setStrategyInput(event.target.value)}
                placeholder={strategyInputPlaceholder}
                className="mt-3 min-h-[160px] w-full rounded-xl border border-red-500/25 bg-black/40 p-3 text-sm text-[#f0f0f0] outline-none transition focus:border-red-400/60 focus:ring-2 focus:ring-red-400/20"
              />
              <button
                type="button"
                onClick={handleAnalyze}
                className="hal-button mt-4 inline-flex rounded-lg border border-red-500/55 bg-red-500/10 px-4 py-2 text-xs font-mono uppercase tracking-[0.11em] text-[#ff8f8f] transition-all"
              >
                Analyze Strategy
              </button>
            </article>

            <article className="rounded-2xl border border-red-500/30 bg-[#110a0a] p-4 sm:p-5">
              <div className="mb-4 inline-flex rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.12em] text-[#ff8f8f]">
                HAL Response Stream
              </div>

              {!strategyAnalyzed ? (
                <p className="text-sm text-[#a8a8a8]">
                  Awaiting strategy input. Press <span className="font-mono">Analyze Strategy</span>{" "}
                  to generate initiative recommendations.
                </p>
              ) : (
                <div className="space-y-5">
                  <p className="font-mono text-sm text-[#ff7676]">
                    {strategyPreview}
                    {!strategyTypingComplete && (
                      <span className="ml-1 inline-block h-4 w-2 animate-pulse bg-[#ff5e5e] align-middle" />
                    )}
                  </p>

                  <div className="space-y-3">
                    <h3 className="font-mono text-xs uppercase tracking-[0.12em] text-[#ff9b9b]">
                      Recommended Initiatives
                    </h3>
                    <ol className="space-y-3 text-sm text-[#ececec]">
                      {strategyInitiatives.map((initiative, index) => (
                        <li
                          key={initiative.title}
                          className="rounded-xl border border-white/10 bg-black/30 px-3 py-3"
                        >
                          <span className="font-mono text-[#ff8f8f]">{index + 1}. </span>
                          <span className="font-semibold text-[#ffeaea]">
                            {initiative.title}
                          </span>{" "}
                          - {initiative.details}
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="space-y-2 rounded-xl border border-red-500/25 bg-black/25 p-3">
                    <h3 className="font-mono text-xs uppercase tracking-[0.12em] text-[#ff9b9b]">
                      Strategic Impact Projection
                    </h3>
                    <ul className="space-y-2 text-sm">
                      {strategyImpact.map((metric) => (
                        <li
                          key={metric.label}
                          className="flex flex-col gap-1 rounded-lg border border-white/10 bg-[#100d0d] px-3 py-2 sm:flex-row sm:items-center sm:justify-between"
                        >
                          <span className="text-[#d4d4d4]">{metric.label}</span>
                          <span className="font-mono text-[#ff7a7a]">{metric.value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </article>
          </div>
        </section>

        <section
          id="golden-standard"
          className="rounded-3xl border border-red-500/20 bg-[#080808] p-6 sm:p-8"
        >
          <div className="space-y-2">
            <p className="text-xs font-mono uppercase tracking-[0.14em] text-[#ff8f8f]">
              Use Case 4
            </p>
            <h2 className="font-serif text-3xl">Golden Standard Analysis Demo</h2>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {goldenStandardProducts.map((product) => (
              <article
                key={product.role}
                className="rounded-2xl border border-white/10 bg-[#0f0f0f] p-4"
              >
                <p className="text-xs font-mono uppercase tracking-[0.12em] text-[#ff8f8f]">
                  {product.role}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-[#fff0f0]">{product.name}</h3>
                <p className="text-sm font-mono text-[#ff9e9e]">{product.sku}</p>
                <div className="mt-3 flex min-h-[145px] items-center justify-center rounded-xl border border-red-500/25 bg-[#141414] p-4">
                  <p className="max-w-xs text-center text-xs text-[#c8c8c8]">{product.description}</p>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-3 text-xs text-[#a5a5a5]">
            Product images are illustrative examples for demo purposes.
          </p>

          <div className="mt-5 overflow-x-auto rounded-2xl border border-white/10 bg-[#0f0f0f]">
            <table className="min-w-[700px] w-full border-collapse text-left text-sm">
              <thead className="bg-[#151515] text-[#ffc6c6]">
                <tr>
                  <th className="px-3 py-3 font-mono text-xs uppercase tracking-[0.1em]">
                    Attribute
                  </th>
                  <th className="px-3 py-3 font-mono text-xs uppercase tracking-[0.1em]">
                    Daily Moisture Cream
                  </th>
                  <th className="px-3 py-3 font-mono text-xs uppercase tracking-[0.1em]">
                    Vitamin C Serum
                  </th>
                  <th className="px-3 py-3 font-mono text-xs uppercase tracking-[0.1em]">
                    Impact
                  </th>
                </tr>
              </thead>
              <tbody>
                {packagingComparisonRows.map((row, index) => (
                  <tr
                    key={row.attribute}
                    className="golden-row border-t border-white/10"
                    style={
                      goldenLoaded
                        ? { animationDelay: `${index * 110}ms` }
                        : undefined
                    }
                  >
                    <td className="px-3 py-3 text-[#fff0f0]">{row.attribute}</td>
                    <td className="px-3 py-3 text-[#dcdcdc]">{row.dailyMoistureCream}</td>
                    <td className="px-3 py-3 text-[#dcdcdc]">{row.vitaminCSerum}</td>
                    <td className="px-3 py-3 font-mono text-[#ff8d8d]">{row.impact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5 space-y-3 rounded-2xl border border-red-500/25 bg-[#120b0b] p-4">
            <h3 className="font-mono text-xs uppercase tracking-[0.12em] text-[#ff9b9b]">
              HAL Intelligence Summary
            </h3>
            <blockquote className="border-l-2 border-red-500/60 pl-3 text-sm text-[#ffe0e0]">
              &ldquo;{goldenStandardHalSummary}&rdquo;
            </blockquote>

            <div>
              <h4 className="font-mono text-xs uppercase tracking-[0.12em] text-[#ff9b9b]">
                Recommended Improvements
              </h4>
              <ul className="mt-2 space-y-2 text-sm text-[#e8e8e8]">
                <li className="rounded-lg border border-white/10 bg-black/25 px-3 py-2">
                  Standardize pump threading geometry to reduce fit variability.
                </li>
                <li className="rounded-lg border border-white/10 bg-black/25 px-3 py-2">
                  Consolidate front/back/pump labels into a single wraparound format.
                </li>
                <li className="rounded-lg border border-white/10 bg-black/25 px-3 py-2">
                  Align fill-head setup kit for 30ml pump SKUs to cut changeover prep.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-6 sm:p-8">
          <div className="grid gap-4 md:grid-cols-2">
            <article className="rounded-2xl border border-white/10 bg-[#111111] p-4">
              <p className="text-xs font-mono uppercase tracking-[0.12em] text-[#ff9b9b]">
                Use Case 1 Example
              </p>
              <p className="mt-3 border-l-2 border-red-500/60 pl-3 text-sm text-[#dedede]">
                &ldquo;{useCaseExamples.retrospective}&rdquo;
              </p>
            </article>

            <article className="rounded-2xl border border-white/10 bg-[#111111] p-4">
              <p className="text-xs font-mono uppercase tracking-[0.12em] text-[#ff9b9b]">
                Use Case 3 Example
              </p>
              <p className="mt-3 border-l-2 border-red-500/60 pl-3 text-sm text-[#dedede]">
                &ldquo;{useCaseExamples.schedule}&rdquo;
              </p>
            </article>
          </div>
        </section>

        <section className="rounded-3xl border border-red-500/25 bg-[#090707] p-6 sm:p-8">
          <h2 className="font-serif text-3xl text-[#fff3f3]">Technical Stack</h2>
          <p className="mt-2 font-mono text-sm uppercase tracking-[0.12em] text-[#ff8f8f]">
            Powered by OpenAI GPT-4
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <article className="rounded-2xl border border-white/10 bg-[#111111] p-4">
              <h3 className="font-mono text-xs uppercase tracking-[0.12em] text-[#ff9b9b]">
                Key Capabilities
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-[#dedede]">
                {technicalCapabilities.map((capability) => (
                  <li key={capability} className="rounded-lg border border-white/10 bg-black/25 px-3 py-2">
                    {capability}
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-2xl border border-white/10 bg-[#111111] p-4">
              <h3 className="font-mono text-xs uppercase tracking-[0.12em] text-[#ff9b9b]">
                Data Integration
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-[#dedede]">
                {technicalIntegrations.map((integration) => (
                  <li
                    key={integration}
                    className="rounded-lg border border-white/10 bg-black/25 px-3 py-2"
                  >
                    {integration}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <footer className="pb-4">
          <Link
            href="/#ai"
            className="inline-flex items-center gap-1 font-mono text-sm text-[#ff8e8e] transition-colors hover:text-[#ffd0d0]"
          >
            <ChevronLeft className="h-4 w-4" />
            ← Back to Blueprint
          </Link>
        </footer>
      </div>

      <style jsx>{`
        .hal-eye {
          box-shadow: 0 0 18px rgba(255, 68, 68, 0.85), 0 0 42px rgba(255, 68, 68, 0.45);
          animation: halEyePulse 2.8s ease-in-out infinite;
        }

        .hal-button:hover {
          box-shadow: 0 0 24px rgba(255, 68, 68, 0.35);
          border-color: rgba(255, 120, 120, 0.8);
          color: #ffd6d6;
        }

        .golden-row {
          opacity: 0;
          transform: translateY(12px);
          animation: rowIn 460ms ease forwards;
        }

        @keyframes halEyePulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.82;
          }
          50% {
            transform: scale(1.12);
            opacity: 1;
          }
        }

        @keyframes rowIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}

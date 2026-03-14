"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, ChevronLeft, Globe, X } from "lucide-react";
import {
  beaconDashboardTabs,
  beaconGoldenActions,
  beaconGoldenRows,
  beaconGoldenSummary,
  beaconOperationalActions,
  beaconOperationalMetrics,
  beaconScheduleRows,
  beaconStrategyImpact,
  beaconStrategyInitiatives,
  globalKpis,
  globalPlants,
  plantPerfectHero,
  strategyInputExample,
  strategyInputPlaceholder,
  strategyResponseIntro,
  type PlantId,
} from "@/lib/plant-perfect-data";

const STRATEGY_TYPING_SPEED_MS = 10;
const BEACON_HILL_ID: PlantId = "beacon-hill";

const markerLabelOffsets: Record<PlantId, { x: number; y: number }> = {
  "beacon-hill": { x: 16, y: -16 },
  "milano-operations": { x: 16, y: -16 },
  "singapore-hub": { x: 16, y: -16 },
  "sao-paulo-plant": { x: 16, y: 16 },
};

const projectToMap = (lat: number, lng: number) => {
  const x = ((lng + 180) / 360) * 100;
  const y = ((90 - lat) / 180) * 100;
  return { x, y };
};

export default function PlantPerfectPage() {
  const [selectedPlantId, setSelectedPlantId] = useState<PlantId | null>(null);
  const [hoveredPlantId, setHoveredPlantId] = useState<PlantId | null>(null);
  const [dashboardPlantId, setDashboardPlantId] = useState<PlantId | null>(null);
  const [activeTab, setActiveTab] = useState<"opreviews" | "strategy" | "schedule" | "golden-standard">(
    "opreviews"
  );

  const [strategyInput, setStrategyInput] = useState(strategyInputExample);
  const [strategyAnalyzed, setStrategyAnalyzed] = useState(false);
  const [typedCharacters, setTypedCharacters] = useState(0);

  const beaconPlant = useMemo(
    () => globalPlants.find((plant) => plant.id === BEACON_HILL_ID) ?? null,
    []
  );

  const selectedPlant = useMemo(
    () => globalPlants.find((plant) => plant.id === selectedPlantId) ?? null,
    [selectedPlantId]
  );

  const hoveredPlant = useMemo(
    () => globalPlants.find((plant) => plant.id === hoveredPlantId) ?? null,
    [hoveredPlantId]
  );

  const mapFocusPlant = hoveredPlant ?? selectedPlant ?? globalPlants[0];
  const isDashboardView = dashboardPlantId === BEACON_HILL_ID;

  useEffect(() => {
    if (!strategyAnalyzed) return;

    const fullLength = strategyResponseIntro.length;
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
    () => strategyResponseIntro.slice(0, typedCharacters),
    [typedCharacters]
  );

  const strategyTypingComplete = typedCharacters >= strategyResponseIntro.length;
  const strategyProgress = strategyResponseIntro.length
    ? Math.min(100, Math.round((typedCharacters / strategyResponseIntro.length) * 100))
    : 0;

  const handleAnalyzeStrategy = () => {
    setTypedCharacters(0);
    setStrategyAnalyzed(true);
  };

  const handleEnterDashboard = () => {
    if (!selectedPlant || selectedPlant.id !== BEACON_HILL_ID) return;

    setDashboardPlantId(BEACON_HILL_ID);
    setSelectedPlantId(null);
    setHoveredPlantId(null);
    setActiveTab("opreviews");
  };

  const handleBackToGlobal = () => {
    setDashboardPlantId(null);
    setActiveTab("opreviews");
  };

  if (!beaconPlant) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#0f172a] text-[#f1f5f9]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <header className="relative overflow-hidden rounded-3xl border border-[#334155] bg-gradient-to-br from-[#0f172a] via-[#111c33] to-[#1e293b] px-6 py-8 shadow-[0_24px_80px_rgba(2,8,20,0.55)] sm:px-8 sm:py-10">
          <div className="pointer-events-none absolute -left-16 top-0 h-56 w-56 rounded-full bg-[#0891b2]/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 right-0 h-64 w-64 rounded-full bg-[#06b6d4]/15 blur-3xl" />

          <div className="relative space-y-6">
            <Link
              href="/#ai"
              className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.18em] text-[#67e8f9] transition-colors hover:text-[#a5f3fc]"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Blueprint
            </Link>

            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-[#67e8f9]">
                {plantPerfectHero.company}
              </p>
              <h1 className="mt-2 text-4xl font-semibold leading-tight sm:text-5xl">
                {plantPerfectHero.title}
              </h1>
              <p className="mt-2 text-sm uppercase tracking-[0.14em] text-[#a5f3fc] sm:text-base">
                {plantPerfectHero.subtitle}
              </p>
            </div>

            <p className="max-w-4xl text-sm text-[#cbd5e1] sm:text-base">{plantPerfectHero.tagline}</p>

            <div className="inline-flex w-fit items-center rounded-full border border-[#0e7490]/70 bg-[#0f172a]/60 px-4 py-2 text-xs uppercase tracking-[0.14em] text-[#67e8f9]">
              {plantPerfectHero.networkSummary}
            </div>
          </div>
        </header>

        {!isDashboardView ? (
          <>
            <section className="rounded-3xl border border-[#334155] bg-[#1e293b]/60 p-6 sm:p-8">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Global Statistics Overview</h2>
                <p className="text-xs uppercase tracking-[0.14em] text-[#94a3b8]">Enterprise KPIs</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {globalKpis.map((kpi) => (
                  <article
                    key={kpi.label}
                    className="rounded-2xl border border-[#334155] bg-[#0f172a]/85 p-4 transition-all duration-300 hover:border-[#0891b2]/70 hover:shadow-[0_0_28px_rgba(8,145,178,0.2)]"
                  >
                    <p className="text-xs uppercase tracking-[0.12em] text-[#94a3b8]">{kpi.label}</p>
                    <p className="mt-2 text-3xl font-semibold text-[#f1f5f9]">{kpi.value}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.1em] text-[#67e8f9]">{kpi.trend}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-[#334155] bg-[#1e293b]/60 p-6 sm:p-8">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-semibold">Interactive World Map</h2>
                  <p className="mt-1 text-sm text-[#94a3b8]">
                    Select any manufacturing site to open local intelligence panels.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#0e7490]/70 bg-[#0f172a]/70 px-3 py-1 text-xs uppercase tracking-[0.1em] text-[#67e8f9]">
                  <Globe className="h-3.5 w-3.5" />
                  Live Network View
                </div>
              </div>

              <div className="grid gap-4 xl:grid-cols-[1.45fr_0.95fr]">
                <div className="relative overflow-hidden rounded-2xl border border-[#334155] bg-[#0b1324]">
                  <svg
                    viewBox="0 0 1000 500"
                    className="h-auto w-full"
                    role="img"
                    aria-label="Global manufacturing world map"
                  >
                    <defs>
                      <pattern
                        id="grid-lines"
                        width="50"
                        height="50"
                        patternUnits="userSpaceOnUse"
                      >
                        <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#1e293b" strokeWidth="1" />
                      </pattern>
                    </defs>
                    <rect width="1000" height="500" fill="#0b1324" />
                    <rect width="1000" height="500" fill="url(#grid-lines)" opacity="0.45" />

                    <g fill="#1e3a4b" stroke="#0e7490" strokeWidth="1.5" opacity="0.85">
                      <path d="M78 103 L130 80 L201 92 L238 125 L221 174 L174 206 L121 195 L88 162 Z" />
                      <path d="M232 223 L261 241 L279 286 L264 354 L240 417 L206 431 L178 380 L188 318 Z" />
                      <path d="M444 107 L494 99 L537 113 L531 148 L483 156 L443 145 Z" />
                      <path d="M470 164 L532 182 L571 243 L561 313 L521 372 L456 361 L434 302 L447 233 Z" />
                      <path d="M548 119 L616 92 L705 98 L774 137 L802 186 L778 236 L712 243 L643 221 L573 179 Z" />
                      <path d="M705 284 L771 301 L806 334 L793 367 L739 374 L688 352 L676 319 Z" />
                    </g>
                  </svg>

                  <div className="absolute inset-0">
                    {globalPlants.map((plant) => {
                      const { x, y } = projectToMap(plant.map.lat, plant.map.lng);
                      const isSelected = selectedPlantId === plant.id;
                      const isHovered = hoveredPlantId === plant.id;
                      const labelOffset = markerLabelOffsets[plant.id];

                      return (
                        <button
                          key={plant.id}
                          type="button"
                          onClick={() => setSelectedPlantId(plant.id)}
                          onMouseEnter={() => setHoveredPlantId(plant.id)}
                          onMouseLeave={() => setHoveredPlantId((current) => (current === plant.id ? null : current))}
                          onFocus={() => setHoveredPlantId(plant.id)}
                          onBlur={() => setHoveredPlantId(null)}
                          className="plant-marker group absolute"
                          style={{ left: `${x}%`, top: `${y}%` }}
                          aria-label={`Open ${plant.name} intelligence panel`}
                        >
                          <span className={`marker-orbit ${isSelected ? "marker-orbit-selected" : ""}`} />
                          <span className={`marker-core ${isSelected || isHovered ? "marker-core-active" : ""}`} />
                          <span
                            className="pointer-events-none absolute whitespace-nowrap rounded-full border border-[#155e75] bg-[#0f172a]/95 px-2 py-1 text-[10px] uppercase tracking-[0.08em] text-[#a5f3fc]"
                            style={{ transform: `translate(${labelOffset.x}px, ${labelOffset.y}px)` }}
                          >
                            {plant.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="pointer-events-none absolute bottom-3 left-3 max-w-xs rounded-xl border border-[#334155] bg-[#0f172a]/88 p-3">
                    <p className="text-xs uppercase tracking-[0.12em] text-[#67e8f9]">Map Focus</p>
                    <p className="mt-1 text-sm font-medium text-[#f1f5f9]">{mapFocusPlant.name}</p>
                    <p className="text-xs text-[#94a3b8]">{mapFocusPlant.mapLabel}</p>
                    <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                      <span className="rounded-lg border border-[#334155] bg-[#1e293b]/75 px-2 py-1 text-[#cbd5e1]">
                        OEE {mapFocusPlant.liveMetrics[0]?.value}
                      </span>
                      <span className="rounded-lg border border-[#334155] bg-[#1e293b]/75 px-2 py-1 text-[#cbd5e1]">
                        {mapFocusPlant.capacityUtilization} utilization
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {globalPlants.map((plant) => {
                    const isSelected = selectedPlantId === plant.id;

                    return (
                      <button
                        key={plant.id}
                        type="button"
                        onClick={() => setSelectedPlantId(plant.id)}
                        className={`w-full rounded-2xl border p-4 text-left transition-all duration-300 ${
                          isSelected
                            ? "border-[#06b6d4] bg-[#0f172a] shadow-[0_0_25px_rgba(6,182,212,0.25)]"
                            : "border-[#334155] bg-[#0f172a]/70 hover:border-[#0891b2]/80"
                        }`}
                      >
                        <p className="text-sm font-semibold text-[#f1f5f9]">{plant.name}</p>
                        <p className="mt-1 text-xs text-[#94a3b8]">{plant.location}</p>
                        <div className="mt-3 flex items-center justify-between text-xs">
                          <span className="text-[#67e8f9]">{plant.liveMetrics[0]?.value} OEE</span>
                          <span className="text-[#cbd5e1]">{plant.productionLines} lines</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>
          </>
        ) : (
          <section className="space-y-5">
            <article className="rounded-3xl border border-[#334155] bg-[#1e293b]/65 p-6 sm:p-8">
              <button
                type="button"
                onClick={handleBackToGlobal}
                className="inline-flex items-center gap-2 rounded-full border border-[#155e75] bg-[#0f172a]/75 px-4 py-2 text-xs uppercase tracking-[0.12em] text-[#67e8f9] transition-colors hover:border-[#06b6d4] hover:text-[#a5f3fc]"
              >
                <ChevronLeft className="h-4 w-4" />
                Back to Global Map
              </button>

              <div className="mt-5 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-[#67e8f9]">Plant Dashboard</p>
                  <h2 className="mt-2 text-3xl font-semibold text-[#f8fafc]">{beaconPlant.name}</h2>
                  <p className="mt-2 text-sm text-[#cbd5e1]">
                    {beaconPlant.location} • {beaconPlant.timezone} • {beaconPlant.currentShift}
                  </p>
                  <p className="mt-2 text-sm text-[#94a3b8]">{beaconPlant.primaryFocus}</p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-[#334155] bg-[#0f172a]/80 p-3">
                    <p className="text-xs uppercase tracking-[0.1em] text-[#94a3b8]">Current Status</p>
                    <p className="mt-1 text-base font-medium text-[#f1f5f9]">{beaconPlant.currentStatus}</p>
                  </div>
                  <div className="rounded-xl border border-[#334155] bg-[#0f172a]/80 p-3">
                    <p className="text-xs uppercase tracking-[0.1em] text-[#94a3b8]">Monthly Output</p>
                    <p className="mt-1 text-base font-medium text-[#f1f5f9]">{beaconPlant.monthlyOutput}</p>
                  </div>
                </div>
              </div>
            </article>

            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {beaconDashboardTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-xl border px-3 py-3 text-left transition-colors ${
                    activeTab === tab.id
                      ? "border-[#06b6d4] bg-[#0f172a] text-[#a5f3fc]"
                      : "border-[#334155] bg-[#1e293b]/60 text-[#cbd5e1] hover:border-[#0891b2]/70"
                  }`}
                >
                  <p className="text-sm font-medium">{tab.label}</p>
                  <p className="mt-1 text-xs text-[#94a3b8]">{tab.description}</p>
                </button>
              ))}
            </div>

            <article className="rounded-3xl border border-[#334155] bg-[#1e293b]/60 p-6 sm:p-8">
              {activeTab === "opreviews" && (
                <div>
                  <h3 className="text-2xl font-semibold text-[#f8fafc]">Operational Reviews</h3>
                  <p className="mt-2 text-sm text-[#94a3b8]">
                    Monthly command review of Beacon Hill line reliability, throughput, and quality loss.
                  </p>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {beaconOperationalMetrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="rounded-xl border border-[#334155] bg-[#0f172a]/75 p-4"
                      >
                        <p className="text-xs uppercase tracking-[0.1em] text-[#94a3b8]">{metric.label}</p>
                        <p className="mt-2 text-2xl font-semibold text-[#f1f5f9]">{metric.value}</p>
                        <p className="mt-1 text-xs text-[#67e8f9]">{metric.benchmark}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-2xl border border-[#334155] bg-[#0f172a]/75 p-4">
                    <h4 className="text-sm uppercase tracking-[0.12em] text-[#67e8f9]">Priority Actions</h4>
                    <ul className="mt-3 space-y-2 text-sm text-[#cbd5e1]">
                      {beaconOperationalActions.map((action) => (
                        <li key={action} className="rounded-lg border border-[#334155] bg-[#1e293b]/70 px-3 py-2">
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "strategy" && (
                <div>
                  <h3 className="text-2xl font-semibold text-[#f8fafc]">Strategy Integration</h3>
                  <p className="mt-2 text-sm text-[#94a3b8]">
                    Enter strategic priorities and convert them into line-level Beacon Hill initiatives.
                  </p>

                  <div className="mt-5 grid gap-4 lg:grid-cols-2">
                    <article className="rounded-2xl border border-[#334155] bg-[#0f172a]/75 p-4">
                      <p className="text-xs uppercase tracking-[0.1em] text-[#67e8f9]">Strategy Input</p>
                      <label htmlFor="strategy-input" className="sr-only">
                        Strategy Input
                      </label>
                      <textarea
                        id="strategy-input"
                        value={strategyInput}
                        onChange={(event) => setStrategyInput(event.target.value)}
                        placeholder={strategyInputPlaceholder}
                        className="mt-3 min-h-[180px] w-full rounded-xl border border-[#155e75] bg-[#0b1324] p-3 text-sm text-[#f1f5f9] outline-none transition focus:border-[#06b6d4] focus:ring-2 focus:ring-[#0891b2]/30"
                      />
                      <button
                        type="button"
                        onClick={handleAnalyzeStrategy}
                        className="mt-4 inline-flex items-center gap-2 rounded-lg border border-[#0891b2] bg-[#0891b2]/20 px-4 py-2 text-xs uppercase tracking-[0.12em] text-[#a5f3fc] transition-colors hover:bg-[#0891b2]/30"
                      >
                        Analyze Strategy
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </article>

                    <article className="rounded-2xl border border-[#155e75] bg-[#0b1324] p-4">
                      <div className="inline-flex rounded-full border border-[#155e75] bg-[#0891b2]/15 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-[#67e8f9]">
                        Beacon Hill AI Brief
                      </div>

                      {!strategyAnalyzed ? (
                        <p className="mt-4 text-sm text-[#94a3b8]">
                          Awaiting strategic input. Run analysis to generate initiative recommendations.
                        </p>
                      ) : (
                        <div className="mt-4 space-y-4">
                          <div>
                            <div className="mb-2 flex items-center justify-between text-[11px] uppercase tracking-[0.1em] text-[#94a3b8]">
                              <span>Processing</span>
                              <span>{strategyProgress}%</span>
                            </div>
                            <div className="h-1.5 overflow-hidden rounded-full bg-[#1e293b]">
                              <div
                                className="h-full rounded-full bg-[#06b6d4] transition-all duration-150"
                                style={{ width: `${strategyProgress}%` }}
                              />
                            </div>
                          </div>

                          <p className="text-sm text-[#cffafe]">
                            {strategyPreview}
                            {!strategyTypingComplete && (
                              <span className="ml-1 inline-block h-4 w-2 animate-pulse bg-[#22d3ee] align-middle" />
                            )}
                          </p>

                          <div>
                            <h4 className="text-xs uppercase tracking-[0.12em] text-[#67e8f9]">
                              Recommended Initiatives
                            </h4>
                            <ol className="mt-2 space-y-2 text-sm text-[#dbeafe]">
                              {beaconStrategyInitiatives.map((initiative, index) => (
                                <li
                                  key={initiative.title}
                                  className="rounded-lg border border-[#334155] bg-[#1e293b]/75 px-3 py-2"
                                >
                                  <span className="mr-1 text-[#22d3ee]">{index + 1}.</span>
                                  <span className="font-medium text-[#f1f5f9]">{initiative.title}</span> -{" "}
                                  {initiative.details}
                                </li>
                              ))}
                            </ol>
                          </div>

                          <div className="rounded-xl border border-[#334155] bg-[#1e293b]/75 p-3">
                            <h4 className="text-xs uppercase tracking-[0.12em] text-[#67e8f9]">
                              Strategic Impact Projection
                            </h4>
                            <ul className="mt-2 space-y-2 text-sm">
                              {beaconStrategyImpact.map((metric) => (
                                <li
                                  key={metric.label}
                                  className="flex flex-col gap-1 rounded-lg border border-[#334155] bg-[#0f172a]/70 px-3 py-2 sm:flex-row sm:items-center sm:justify-between"
                                >
                                  <span className="text-[#cbd5e1]">{metric.label}</span>
                                  <span className="text-[#a5f3fc]">{metric.value}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </article>
                  </div>
                </div>
              )}

              {activeTab === "schedule" && (
                <div>
                  <h3 className="text-2xl font-semibold text-[#f8fafc]">Schedule Optimization</h3>
                  <p className="mt-2 text-sm text-[#94a3b8]">
                    Next-run simulation for Beacon Hill with recommendations to reduce setup loss.
                  </p>

                  <div className="mt-5 overflow-x-auto rounded-2xl border border-[#334155] bg-[#0f172a]/75">
                    <table className="min-w-[720px] w-full border-collapse text-left text-sm">
                      <thead className="bg-[#1e293b] text-[#a5f3fc]">
                        <tr>
                          <th className="px-3 py-3 text-xs uppercase tracking-[0.1em]">Line</th>
                          <th className="px-3 py-3 text-xs uppercase tracking-[0.1em]">SKU</th>
                          <th className="px-3 py-3 text-xs uppercase tracking-[0.1em]">Window</th>
                          <th className="px-3 py-3 text-xs uppercase tracking-[0.1em]">Recommendation</th>
                          <th className="px-3 py-3 text-xs uppercase tracking-[0.1em]">Projected Gain</th>
                        </tr>
                      </thead>
                      <tbody>
                        {beaconScheduleRows.map((row) => (
                          <tr key={`${row.line}-${row.sku}`} className="border-t border-[#334155]">
                            <td className="px-3 py-3 text-[#f1f5f9]">{row.line}</td>
                            <td className="px-3 py-3 text-[#cbd5e1]">{row.sku}</td>
                            <td className="px-3 py-3 text-[#cbd5e1]">{row.window}</td>
                            <td className="px-3 py-3 text-[#dbeafe]">{row.recommendation}</td>
                            <td className="px-3 py-3 text-[#67e8f9]">{row.projectedGain}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === "golden-standard" && (
                <div>
                  <h3 className="text-2xl font-semibold text-[#f8fafc]">Golden Standard Comparison</h3>
                  <p className="mt-2 text-sm text-[#94a3b8]">
                    Best vs worst Beacon Hill SKUs with packaging and quality complexity drivers.
                  </p>

                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    <article className="rounded-2xl border border-[#334155] bg-[#0f172a]/75 p-4">
                      <p className="text-xs uppercase tracking-[0.12em] text-[#67e8f9]">Best Performer</p>
                      <h4 className="mt-2 text-lg font-semibold text-[#f1f5f9]">
                        {beaconPlant.goldenStandard.best.name}
                      </h4>
                      <p className="text-sm text-[#a5f3fc]">{beaconPlant.goldenStandard.best.sku}</p>
                      <p className="mt-2 text-sm text-[#cbd5e1]">{beaconPlant.goldenStandard.best.note}</p>
                    </article>

                    <article className="rounded-2xl border border-[#334155] bg-[#0f172a]/75 p-4">
                      <p className="text-xs uppercase tracking-[0.12em] text-[#67e8f9]">Needs Improvement</p>
                      <h4 className="mt-2 text-lg font-semibold text-[#f1f5f9]">
                        {beaconPlant.goldenStandard.worst.name}
                      </h4>
                      <p className="text-sm text-[#a5f3fc]">{beaconPlant.goldenStandard.worst.sku}</p>
                      <p className="mt-2 text-sm text-[#cbd5e1]">{beaconPlant.goldenStandard.worst.note}</p>
                    </article>
                  </div>

                  <div className="mt-5 overflow-x-auto rounded-2xl border border-[#334155] bg-[#0f172a]/75">
                    <table className="min-w-[700px] w-full border-collapse text-left text-sm">
                      <thead className="bg-[#1e293b] text-[#a5f3fc]">
                        <tr>
                          <th className="px-3 py-3 text-xs uppercase tracking-[0.1em]">Attribute</th>
                          <th className="px-3 py-3 text-xs uppercase tracking-[0.1em]">Best SKU</th>
                          <th className="px-3 py-3 text-xs uppercase tracking-[0.1em]">Worst SKU</th>
                          <th className="px-3 py-3 text-xs uppercase tracking-[0.1em]">Impact</th>
                        </tr>
                      </thead>
                      <tbody>
                        {beaconGoldenRows.map((row, index) => (
                          <tr
                            key={row.attribute}
                            className="golden-row border-t border-[#334155]"
                            style={{ animationDelay: `${index * 105}ms` }}
                          >
                            <td className="px-3 py-3 text-[#f1f5f9]">{row.attribute}</td>
                            <td className="px-3 py-3 text-[#cbd5e1]">{row.bestSku}</td>
                            <td className="px-3 py-3 text-[#cbd5e1]">{row.worstSku}</td>
                            <td className="px-3 py-3 text-[#67e8f9]">{row.impact}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-5 rounded-2xl border border-[#155e75] bg-[#0b1324] p-4">
                    <h4 className="text-xs uppercase tracking-[0.12em] text-[#67e8f9]">Beacon Summary</h4>
                    <p className="mt-2 text-sm text-[#dbeafe]">{beaconGoldenSummary}</p>
                    <ul className="mt-3 space-y-2 text-sm text-[#cbd5e1]">
                      {beaconGoldenActions.map((item) => (
                        <li key={item} className="rounded-lg border border-[#334155] bg-[#1e293b]/70 px-3 py-2">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </article>
          </section>
        )}

        <footer>
          <Link
            href="/#ai"
            className="inline-flex items-center gap-1 text-sm text-[#67e8f9] transition-colors hover:text-[#a5f3fc]"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Blueprint
          </Link>
        </footer>
      </div>

      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ${
          selectedPlant && !isDashboardView ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!selectedPlant || isDashboardView}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-[#020617]/70 transition-opacity duration-300 ${
            selectedPlant && !isDashboardView ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setSelectedPlantId(null)}
          aria-label="Close plant panel"
        />

        <aside
          className={`absolute right-0 top-0 h-full w-full max-w-md overflow-y-auto border-l border-[#334155] bg-[#0f172a] shadow-[-18px_0_42px_rgba(2,8,23,0.45)] transition-transform duration-300 ${
            selectedPlant && !isDashboardView ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {selectedPlant && (
            <div className="p-5 sm:p-6">
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-[#67e8f9]">Plant Intelligence Panel</p>
                  <h2 className="mt-1 text-2xl font-semibold text-[#f8fafc]">{selectedPlant.name}</h2>
                  <p className="text-sm text-[#94a3b8]">{selectedPlant.region}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedPlantId(null)}
                  className="rounded-full border border-[#334155] p-2 text-[#94a3b8] transition-colors hover:border-[#06b6d4] hover:text-[#a5f3fc]"
                  aria-label="Close panel"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <section className="space-y-3 rounded-2xl border border-[#334155] bg-[#1e293b]/60 p-4">
                <h3 className="text-xs uppercase tracking-[0.12em] text-[#67e8f9]">Plant Overview</h3>
                <ul className="space-y-2 text-sm text-[#cbd5e1]">
                  <li>
                    <span className="text-[#94a3b8]">Location:</span> {selectedPlant.location}
                  </li>
                  <li>
                    <span className="text-[#94a3b8]">Capacity:</span> {selectedPlant.capacity}
                  </li>
                  <li>
                    <span className="text-[#94a3b8]">Primary Focus:</span> {selectedPlant.primaryFocus}
                  </li>
                  <li>
                    <span className="text-[#94a3b8]">Current Status:</span> {selectedPlant.currentStatus}
                  </li>
                </ul>

                <div>
                  <p className="text-xs uppercase tracking-[0.1em] text-[#94a3b8]">Key Products</p>
                  <ul className="mt-2 space-y-1 text-sm text-[#dbeafe]">
                    {selectedPlant.keyProducts.map((product) => (
                      <li key={product} className="rounded-lg border border-[#334155] bg-[#0f172a]/75 px-2 py-1.5">
                        {product}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section className="mt-4 rounded-2xl border border-[#334155] bg-[#1e293b]/60 p-4">
                <h3 className="text-xs uppercase tracking-[0.12em] text-[#67e8f9]">Live Metrics</h3>
                <div className="mt-3 grid gap-2">
                  {selectedPlant.liveMetrics.map((metric) => (
                    <div key={metric.label} className="rounded-lg border border-[#334155] bg-[#0f172a]/75 p-3">
                      <p className="text-xs uppercase tracking-[0.1em] text-[#94a3b8]">{metric.label}</p>
                      <p className="mt-1 text-lg font-semibold text-[#f1f5f9]">{metric.value}</p>
                      <p className="text-xs text-[#67e8f9]">{metric.context}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mt-4 rounded-2xl border border-[#334155] bg-[#1e293b]/60 p-4">
                <h3 className="text-xs uppercase tracking-[0.12em] text-[#67e8f9]">Strategic Initiatives</h3>
                <ul className="mt-3 space-y-2 text-sm text-[#cbd5e1]">
                  {selectedPlant.strategicInitiatives.map((initiative) => (
                    <li key={initiative.title} className="rounded-lg border border-[#334155] bg-[#0f172a]/75 p-3">
                      <p className="font-medium text-[#f1f5f9]">{initiative.title}</p>
                      <p className="mt-1 text-xs text-[#cbd5e1]">{initiative.details}</p>
                      <p className="mt-2 text-xs uppercase tracking-[0.1em] text-[#67e8f9]">
                        Target: {initiative.target}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="mt-4 rounded-2xl border border-[#334155] bg-[#1e293b]/60 p-4">
                <h3 className="text-xs uppercase tracking-[0.12em] text-[#67e8f9]">Golden Standard Comparison</h3>
                <div className="mt-3 grid gap-2">
                  <div className="rounded-lg border border-[#334155] bg-[#0f172a]/75 p-3">
                    <p className="text-[11px] uppercase tracking-[0.1em] text-[#94a3b8]">Best SKU</p>
                    <p className="mt-1 text-sm font-medium text-[#f1f5f9]">{selectedPlant.goldenStandard.best.name}</p>
                    <p className="text-xs text-[#67e8f9]">{selectedPlant.goldenStandard.best.sku}</p>
                    <p className="mt-1 text-xs text-[#cbd5e1]">{selectedPlant.goldenStandard.best.note}</p>
                  </div>

                  <div className="rounded-lg border border-[#334155] bg-[#0f172a]/75 p-3">
                    <p className="text-[11px] uppercase tracking-[0.1em] text-[#94a3b8]">Worst SKU</p>
                    <p className="mt-1 text-sm font-medium text-[#f1f5f9]">{selectedPlant.goldenStandard.worst.name}</p>
                    <p className="text-xs text-[#67e8f9]">{selectedPlant.goldenStandard.worst.sku}</p>
                    <p className="mt-1 text-xs text-[#cbd5e1]">{selectedPlant.goldenStandard.worst.note}</p>
                  </div>
                </div>
              </section>

              <div className="mt-6 space-y-2">
                <button
                  type="button"
                  onClick={handleEnterDashboard}
                  disabled={selectedPlant.id !== BEACON_HILL_ID}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#0891b2] bg-[#0891b2]/20 px-4 py-3 text-xs uppercase tracking-[0.12em] text-[#a5f3fc] transition-all enabled:hover:bg-[#0891b2]/30 disabled:cursor-not-allowed disabled:border-[#334155] disabled:bg-[#1e293b] disabled:text-[#64748b]"
                >
                  Enter Plant Dashboard
                  <ArrowRight className="h-4 w-4" />
                </button>

                {selectedPlant.id !== BEACON_HILL_ID && (
                  <p className="text-xs text-[#94a3b8]">
                    Sample full dashboard is currently configured for Beacon Hill.
                  </p>
                )}
              </div>
            </div>
          )}
        </aside>
      </div>

      <style jsx>{`
        .plant-marker {
          transform: translate(-50%, -50%);
          height: 18px;
          width: 18px;
        }

        .marker-orbit {
          position: absolute;
          inset: -8px;
          border-radius: 9999px;
          background: rgba(6, 182, 212, 0.24);
          animation: pulseOrbit 2.4s ease-in-out infinite;
        }

        .marker-orbit-selected {
          animation: rippleOrbit 1.6s ease-out infinite;
          background: rgba(34, 211, 238, 0.35);
        }

        .marker-core {
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          border: 2px solid rgba(8, 145, 178, 0.95);
          background: #0891b2;
          box-shadow: 0 0 0 0 rgba(34, 211, 238, 0.25);
          transition: transform 200ms ease, box-shadow 200ms ease, background 200ms ease;
        }

        .plant-marker:hover .marker-core,
        .marker-core-active {
          transform: scale(1.14);
          background: #22d3ee;
          box-shadow: 0 0 0 8px rgba(34, 211, 238, 0.15);
        }

        .golden-row {
          opacity: 0;
          transform: translateY(10px);
          animation: goldenRowIn 420ms ease forwards;
        }

        @keyframes pulseOrbit {
          0%,
          100% {
            transform: scale(0.92);
            opacity: 0.45;
          }
          50% {
            transform: scale(1.12);
            opacity: 0.9;
          }
        }

        @keyframes rippleOrbit {
          0% {
            transform: scale(0.95);
            opacity: 0.95;
          }
          70% {
            transform: scale(1.45);
            opacity: 0.22;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        @keyframes goldenRowIn {
          from {
            opacity: 0;
            transform: translateY(10px);
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

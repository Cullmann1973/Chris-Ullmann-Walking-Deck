"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CheckCircle2, ChevronLeft, X } from "lucide-react";
import {
  defaultEllaScenarioId,
  ellaScenarioMap,
  ellaScenarios,
  type EllaScenarioId,
} from "@/lib/ella-scenarios";
import { cn } from "@/lib/utils";

const TYPING_SPEED_MS = 8;
const TOUR_STOP_DURATION_MS = 4000;
const TOUR_TRANSITION_MS = 300;
const TOUR_RESTART_MS = 15000;
const TOUR_GAP_PX = 12;
const TOUR_MARGIN_PX = 12;
const MOBILE_BREAKPOINT_PX = 768;

type TourPlacement = "above" | "below" | "left" | "right";
type TourArrowSide = "top" | "bottom" | "left" | "right";

type TourStop = {
  target: string;
  text: string;
  position: TourPlacement;
  mobilePosition?: "above" | "below";
};

const TOUR_STOPS: TourStop[] = [
  {
    target: "status-bar",
    text: "Connected to your plant in real-time",
    position: "below",
  },
  {
    target: "scenario-grid",
    text: "Choose a real-world scenario",
    position: "above",
  },
  {
    target: "operator-message",
    text: "Operators ask in plain language",
    position: "left",
    mobilePosition: "above",
  },
  {
    target: "ella-response",
    text: "Answers grounded in your actual data",
    position: "right",
    mobilePosition: "above",
  },
  {
    target: "citation-pill",
    text: "Every answer cites its source",
    position: "above",
  },
  {
    target: "follow-up-button",
    text: "Drill deeper with one tap",
    position: "above",
  },
];

type TourBubbleProps = {
  top: number;
  left: number;
  text: string;
  visible: boolean;
  arrowSide: TourArrowSide;
  onDismiss: () => void;
  bubbleRef: { current: HTMLDivElement | null };
};

function TourBubble({
  top,
  left,
  text,
  visible,
  arrowSide,
  onDismiss,
  bubbleRef,
}: TourBubbleProps) {
  const arrowClassMap: Record<TourArrowSide, string> = {
    top: "top-[-7px] left-1/2 -translate-x-1/2 border-x-[7px] border-b-[7px] border-t-0 border-x-transparent border-b-amber-500",
    bottom:
      "bottom-[-7px] left-1/2 -translate-x-1/2 border-x-[7px] border-t-[7px] border-b-0 border-x-transparent border-t-amber-500",
    left: "left-[-7px] top-1/2 -translate-y-1/2 border-y-[7px] border-r-[7px] border-l-0 border-y-transparent border-r-amber-500",
    right:
      "right-[-7px] top-1/2 -translate-y-1/2 border-y-[7px] border-l-[7px] border-r-0 border-y-transparent border-l-amber-500",
  };

  return (
    <div
      ref={bubbleRef}
      className={cn(
        "tour-bubble pointer-events-auto fixed z-50 w-[min(22rem,calc(100vw-1.5rem))] rounded-xl border border-amber-400 bg-amber-500 px-5 py-12 text-base text-black transition-all duration-300 ease-out",
        visible ? "opacity-100" : "translate-y-1 opacity-0"
      )}
      style={{ top, left }}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-start justify-between gap-2">
        <p className="pr-1 font-medium leading-snug">{text}</p>
        <button
          type="button"
          onClick={onDismiss}
          className="rounded-md p-0.5 text-black/60 transition-colors hover:bg-black/10 hover:text-black"
          aria-label="Dismiss tour"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className={cn("absolute h-0 w-0 border-solid", arrowClassMap[arrowSide])} />
    </div>
  );
}

export default function EllaDemoPage() {
  const [activeScenarioId, setActiveScenarioId] =
    useState<EllaScenarioId>(defaultEllaScenarioId);
  const [typedChars, setTypedChars] = useState(0);
  const [isSwitching, setIsSwitching] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [currentTourStop, setCurrentTourStop] = useState(0);
  const [tourActive, setTourActive] = useState(false);
  const [tourDismissed, setTourDismissed] = useState(false);
  const [tourVisible, setTourVisible] = useState(false);
  const [tourHasPosition, setTourHasPosition] = useState(false);
  const [tourPosition, setTourPosition] = useState({ top: 0, left: 0 });
  const [tourArrowSide, setTourArrowSide] = useState<TourArrowSide>("top");
  const [initialTypingComplete, setInitialTypingComplete] = useState(false);
  const tourBubbleRef = useRef<HTMLDivElement | null>(null);

  const activeScenario = useMemo(
    () => ellaScenarioMap[activeScenarioId],
    [activeScenarioId]
  );

  useEffect(() => {
    const revealTimer = window.setTimeout(() => setIsVisible(true), 30);
    return () => window.clearTimeout(revealTimer);
  }, []);

  useEffect(() => {
    const fullText = activeScenario.ellaResponse.typedText;
    if (typedChars >= fullText.length) return;

    const interval = window.setInterval(() => {
      setTypedChars((prev) => {
        if (prev >= fullText.length) {
          window.clearInterval(interval);
          return prev;
        }
        const next = prev + 1;
        if (next >= fullText.length && !initialTypingComplete) {
          setInitialTypingComplete(true);
        }
        return next;
      });
    }, TYPING_SPEED_MS);

    return () => window.clearInterval(interval);
  }, [activeScenario, initialTypingComplete, typedChars]);

  const displayedEllaText = activeScenario.ellaResponse.typedText.slice(0, typedChars);
  const typingComplete = typedChars >= activeScenario.ellaResponse.typedText.length;
  const activeTourStop = TOUR_STOPS[currentTourStop];

  const switchScenario = (scenarioId: EllaScenarioId) => {
    if (scenarioId === activeScenarioId || isSwitching) return;

    setIsSwitching(true);
    window.setTimeout(() => {
      setTypedChars(0);
      setActiveScenarioId(scenarioId);
      setIsSwitching(false);
    }, 180);
  };

  const getTourTarget = useCallback((stopIndex: number) => {
    const stop = TOUR_STOPS[stopIndex];
    if (!stop) return null;
    return document.querySelector<HTMLElement>(`[data-tour="${stop.target}"]`);
  }, []);

  const getNextAvailableStop = useCallback(
    (startIndex: number) => {
      for (let offset = 0; offset < TOUR_STOPS.length; offset += 1) {
        const candidate = (startIndex + offset) % TOUR_STOPS.length;
        if (getTourTarget(candidate)) return candidate;
      }
      return startIndex;
    },
    [getTourTarget]
  );

  const calculateTourPosition = useCallback(
    (stopIndex: number) => {
      const target = getTourTarget(stopIndex);
      if (!target) {
        setTourHasPosition(false);
        return false;
      }

      const targetRect = target.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const isMobile = viewportWidth < MOBILE_BREAKPOINT_PX;
      const fallbackWidth = Math.min(288, viewportWidth - TOUR_MARGIN_PX * 2);
      const bubbleWidth = tourBubbleRef.current?.offsetWidth ?? fallbackWidth;
      const bubbleHeight = tourBubbleRef.current?.offsetHeight ?? 80;
      const stop = TOUR_STOPS[stopIndex];

      let placement = stop.position;
      if (isMobile && (placement === "left" || placement === "right")) {
        placement = stop.mobilePosition ?? "above";
      }

      const canFitAbove =
        targetRect.top - bubbleHeight - TOUR_GAP_PX >= TOUR_MARGIN_PX;
      const canFitBelow =
        targetRect.bottom + bubbleHeight + TOUR_GAP_PX <=
        viewportHeight - TOUR_MARGIN_PX;
      const canFitLeft =
        targetRect.left - bubbleWidth - TOUR_GAP_PX >= TOUR_MARGIN_PX;
      const canFitRight =
        targetRect.right + bubbleWidth + TOUR_GAP_PX <=
        viewportWidth - TOUR_MARGIN_PX;

      if (placement === "left" && !canFitLeft) {
        placement = canFitAbove ? "above" : canFitBelow ? "below" : "right";
      } else if (placement === "right" && !canFitRight) {
        placement = canFitAbove ? "above" : canFitBelow ? "below" : "left";
      } else if (placement === "above" && !canFitAbove) {
        placement = canFitBelow ? "below" : "above";
      } else if (placement === "below" && !canFitBelow) {
        placement = canFitAbove ? "above" : "below";
      }

      if (isMobile && (placement === "left" || placement === "right")) {
        placement = canFitAbove ? "above" : "below";
      }

      let top = TOUR_MARGIN_PX;
      let left = TOUR_MARGIN_PX;
      let arrowSide: TourArrowSide = "top";

      if (placement === "above") {
        top = targetRect.top - bubbleHeight - TOUR_GAP_PX;
        left = targetRect.left + targetRect.width / 2 - bubbleWidth / 2;
        arrowSide = "bottom";
      } else if (placement === "below") {
        top = targetRect.bottom + TOUR_GAP_PX;
        left = targetRect.left + targetRect.width / 2 - bubbleWidth / 2;
        arrowSide = "top";
      } else if (placement === "left") {
        top = targetRect.top + targetRect.height / 2 - bubbleHeight / 2;
        left = targetRect.left - bubbleWidth - TOUR_GAP_PX;
        arrowSide = "right";
      } else if (placement === "right") {
        top = targetRect.top + targetRect.height / 2 - bubbleHeight / 2;
        left = targetRect.right + TOUR_GAP_PX;
        arrowSide = "left";
      }

      const maxLeft = Math.max(
        TOUR_MARGIN_PX,
        viewportWidth - bubbleWidth - TOUR_MARGIN_PX
      );
      const maxTop = Math.max(
        TOUR_MARGIN_PX,
        viewportHeight - bubbleHeight - TOUR_MARGIN_PX
      );

      setTourPosition({
        top: Math.min(Math.max(top, TOUR_MARGIN_PX), maxTop),
        left: Math.min(Math.max(left, TOUR_MARGIN_PX), maxLeft),
      });
      setTourArrowSide(arrowSide);
      setTourHasPosition(true);
      return true;
    },
    [getTourTarget]
  );

  const dismissTour = useCallback(() => {
    setTourVisible(false);
    setTourHasPosition(false);
    setTourActive(false);
    setTourDismissed(true);
  }, []);

  useEffect(() => {
    if (!initialTypingComplete || tourDismissed || tourActive) return;
    const frameId = window.requestAnimationFrame(() => {
      setCurrentTourStop(getNextAvailableStop(0));
      setTourHasPosition(false);
      setTourActive(true);
      setTourVisible(true);
    });
    return () => window.cancelAnimationFrame(frameId);
  }, [getNextAvailableStop, initialTypingComplete, tourActive, tourDismissed]);

  useEffect(() => {
    if (!tourActive) return;

    let transitionTimer: number | undefined;
    const interval = window.setInterval(() => {
      setTourVisible(false);
      transitionTimer = window.setTimeout(() => {
        setCurrentTourStop((previous) =>
          getNextAvailableStop((previous + 1) % TOUR_STOPS.length)
        );
        setTourHasPosition(false);
        setTourVisible(true);
      }, TOUR_TRANSITION_MS);
    }, TOUR_STOP_DURATION_MS);

    return () => {
      window.clearInterval(interval);
      if (transitionTimer) window.clearTimeout(transitionTimer);
    };
  }, [getNextAvailableStop, tourActive]);

  useEffect(() => {
    if (!tourDismissed || !initialTypingComplete) return;

    let restartTimer: number | undefined;
    const scheduleRestart = () => {
      if (restartTimer) window.clearTimeout(restartTimer);
      restartTimer = window.setTimeout(() => {
        setCurrentTourStop(getNextAvailableStop(0));
        setTourHasPosition(false);
        setTourDismissed(false);
        setTourActive(true);
        setTourVisible(true);
      }, TOUR_RESTART_MS);
    };

    scheduleRestart();
    const restartEvents: Array<keyof WindowEventMap> = [
      "pointerdown",
      "keydown",
      "touchstart",
    ];
    restartEvents.forEach((eventName) =>
      window.addEventListener(eventName, scheduleRestart)
    );

    return () => {
      if (restartTimer) window.clearTimeout(restartTimer);
      restartEvents.forEach((eventName) =>
        window.removeEventListener(eventName, scheduleRestart)
      );
    };
  }, [getNextAvailableStop, initialTypingComplete, tourDismissed]);

  useEffect(() => {
    if (!tourActive) return;

    let frameId = 0;
    const recalculate = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(() => {
        const positioned = calculateTourPosition(currentTourStop);
        if (positioned) return;

        const fallback = getNextAvailableStop(
          (currentTourStop + 1) % TOUR_STOPS.length
        );
        if (fallback !== currentTourStop) setCurrentTourStop(fallback);
      });
    };

    recalculate();
    window.addEventListener("resize", recalculate);
    window.addEventListener("scroll", recalculate, true);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", recalculate);
      window.removeEventListener("scroll", recalculate, true);
    };
  }, [
    activeScenarioId,
    calculateTourPosition,
    currentTourStop,
    getNextAvailableStop,
    tourActive,
    typingComplete,
  ]);

  return (
    <main
      className={cn(
        "min-h-screen bg-background text-foreground transition-opacity duration-700",
        isVisible ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <header className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0b1f24] via-[#0a0a0a] to-[#101417] p-6 shadow-2xl shadow-black/40 sm:p-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,188,212,0.18),transparent_45%)]" />
          <div className="relative space-y-5">
            <Link
              href="/#ai"
              className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.18em] text-primary/90 hover:text-primary"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Blueprint
            </Link>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.12em] text-primary">
                Featured at Microsoft Ignite
              </div>
              <h1 className="font-serif text-4xl leading-tight text-foreground sm:text-5xl">
                ELLA
              </h1>
              <p className="text-sm font-mono uppercase tracking-[0.18em] text-primary/90 sm:text-base">
                Line-Level Manufacturing Intelligence
              </p>
            </div>

            <p className="max-w-3xl text-sm text-[#ced4da] sm:text-base">
              Institutional memory that talks back. Troubleshooting, changeovers,
              quality history, and consumer insights - all at the point of work.
            </p>
          </div>
        </header>

        <section className="space-y-4">
          <div className="flex items-end justify-between gap-3">
            <h2 className="font-serif text-2xl text-foreground">Choose a Scenario</h2>
            <p className="text-xs font-mono uppercase tracking-[0.12em] text-[#ced4da]">
              Live demo flow
            </p>
          </div>

          <div data-tour="scenario-grid" className="grid grid-cols-2 gap-3 xl:grid-cols-4">
            {ellaScenarios.map((scenario) => {
              const isActive = scenario.id === activeScenarioId;
              return (
                <button
                  key={scenario.id}
                  onClick={() => switchScenario(scenario.id)}
                  className={cn(
                    "group rounded-2xl border p-4 text-left transition-all duration-300",
                    "bg-white/[0.04] backdrop-blur-sm",
                    "hover:-translate-y-0.5 hover:border-primary/40 hover:bg-white/[0.07] hover:shadow-[0_0_20px_rgba(0,188,212,0.18)]",
                    isActive
                      ? "border-primary/60 bg-primary/[0.10] shadow-[0_0_20px_rgba(0,188,212,0.22)]"
                      : "border-white/10"
                  )}
                >
                  <p className="text-lg leading-none">{scenario.icon}</p>
                  <p className="mt-3 text-sm font-semibold text-foreground">{scenario.title}</p>
                  <p className="mt-1 text-sm text-[#ced4da]">{scenario.summary}</p>
                </button>
              );
            })}
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-[#0b0f12] p-3 shadow-2xl shadow-black/40 sm:p-5">
          <div
            className={cn(
              "overflow-hidden rounded-2xl border border-white/10 bg-[#090c0f] transition-opacity duration-300",
              isSwitching ? "opacity-0" : "opacity-100"
            )}
          >
            <div
              data-tour="status-bar"
              className="flex items-center justify-between border-b border-white/10 bg-[#0f1519] px-4 py-2 font-mono text-[11px] text-[#ced4da] sm:px-6 sm:text-xs"
            >
              <div className="inline-flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                Connected to: {activeScenario.contextLine}
              </div>
              <span className="text-primary">ELLA Session Active</span>
            </div>

            <div className="space-y-5 px-4 py-5 sm:px-6 sm:py-7">
              <div className="flex justify-end">
                <div
                  data-tour="operator-message"
                  className="ella-message-in w-full max-w-3xl rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-right sm:p-5"
                >
                  <div className="mb-2 text-xs font-mono text-[#ced4da]">
                    {activeScenario.operatorMessage.operator}, {activeScenario.operatorMessage.shift} -{" "}
                    {activeScenario.operatorMessage.timestamp}
                  </div>
                  <p className="text-sm text-foreground sm:text-[15px]">
                    {activeScenario.operatorMessage.text}
                  </p>
                </div>
              </div>

              <div className="flex justify-start">
                <div
                  key={activeScenario.id}
                  data-tour="ella-response"
                  className="ella-message-in w-full max-w-3xl rounded-2xl border border-primary/20 bg-primary/[0.08] p-4 sm:p-5"
                  style={{ animationDelay: "90ms" }}
                >
                  <div className="mb-2 flex items-center gap-2 text-xs font-mono text-primary">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-primary/40 bg-[#0d1e23] text-[10px] font-bold tracking-[0.1em]">
                      E
                    </span>
                    ELLA - {activeScenario.ellaResponse.timestamp}
                  </div>

                  <p className="whitespace-pre-wrap text-sm text-foreground sm:text-[15px]">
                    {displayedEllaText}
                    {!typingComplete && (
                      <span className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-primary/70 align-middle" />
                    )}
                  </p>

                  {typingComplete && activeScenario.ellaResponse.setpoints && (
                    <div className="mt-5 overflow-hidden rounded-xl border border-white/10">
                      <table className="w-full border-collapse text-left text-xs sm:text-sm">
                        <thead className="bg-white/[0.04] text-[#ced4da]">
                          <tr>
                            <th className="px-3 py-2 font-mono">Parameter</th>
                            <th className="px-3 py-2 font-mono">VGF-2240</th>
                            <th className="px-3 py-2 font-mono">HSM-1180</th>
                            <th className="px-3 py-2 font-mono">Change</th>
                          </tr>
                        </thead>
                        <tbody>
                          {activeScenario.ellaResponse.setpoints.map((row) => (
                            <tr key={row.parameter} className="border-t border-white/10">
                              <td className="px-3 py-2 text-foreground">{row.parameter}</td>
                              <td className="px-3 py-2 font-mono text-[#ced4da]">
                                {row.from}
                              </td>
                              <td className="px-3 py-2 font-mono text-foreground">
                                {row.to}
                              </td>
                              <td className="px-3 py-2 font-mono text-primary">{row.change}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {typingComplete && activeScenario.ellaResponse.changeParts && (
                    <div className="mt-4 space-y-2">
                      <p className="text-xs font-mono uppercase tracking-[0.12em] text-[#ced4da]">
                        Change parts required
                      </p>
                      <ul className="space-y-1 text-sm text-foreground">
                        {activeScenario.ellaResponse.changeParts.map((part) => (
                          <li key={part} className="flex items-start gap-2">
                            <CheckCircle2 className="mt-[2px] h-3.5 w-3.5 flex-none text-primary" />
                            <span>{part}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {typingComplete && activeScenario.ellaResponse.alertNote && (
                    <div className="mt-4 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-200">
                      {activeScenario.ellaResponse.alertNote}
                    </div>
                  )}

                  {typingComplete && (
                    <>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {activeScenario.ellaResponse.citations.map((citation) => (
                          <span
                            key={citation}
                            data-tour="citation-pill"
                            className="ella-citation rounded-full border border-primary/40 bg-primary/15 px-2.5 py-1 font-mono text-[11px] text-primary"
                          >
                            [{citation}]
                          </span>
                        ))}
                      </div>

                      <p className="mt-4 text-xs font-mono text-[#ced4da]">
                        Source: {activeScenario.ellaResponse.source}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {activeScenario.ellaResponse.followUps.map((suggestion) => (
                          <button
                            key={suggestion}
                            type="button"
                            data-tour="follow-up-button"
                            className="rounded-full border border-white/15 bg-white/[0.05] px-3 py-1.5 text-xs text-foreground transition-colors hover:border-primary/50 hover:bg-primary/10"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-5 rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
          <h2 className="font-serif text-2xl text-foreground">How It Works</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <article className="rounded-2xl border border-white/10 bg-[#0d0f12] p-4">
              <h3 className="text-sm font-semibold text-primary">Grounded in Your Data</h3>
              <p className="mt-2 text-sm text-[#ced4da]">
                ELLA connects to SOPs, OEM manuals, quality records, CAPAs,
                deviation history, consumer complaints, and equipment data. Every
                answer cites its source.
              </p>
            </article>

            <article className="rounded-2xl border border-white/10 bg-[#0d0f12] p-4">
              <h3 className="text-sm font-semibold text-primary">Built for the Floor</h3>
              <p className="mt-2 text-sm text-[#ced4da]">
                Designed for operators on tablets at the line. No training required.
                Ask a question in plain language, get an answer with context.
              </p>
            </article>

            <article className="rounded-2xl border border-white/10 bg-[#0d0f12] p-4">
              <h3 className="text-sm font-semibold text-primary">Learns from History</h3>
              <p className="mt-2 text-sm text-[#ced4da]">
                The more events your plant records, the smarter ELLA gets. It
                surfaces patterns humans miss across shifts, lines, and time.
              </p>
            </article>
          </div>
        </section>

        <footer className="pb-4">
          <Link
            href="/#ai"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Blueprint
          </Link>
        </footer>
      </div>

      {tourActive && activeTourStop && (
        <div className="pointer-events-none fixed inset-0 z-50">
          <TourBubble
            bubbleRef={tourBubbleRef}
            top={tourPosition.top}
            left={tourPosition.left}
            text={activeTourStop.text}
            arrowSide={tourArrowSide}
            visible={tourVisible && tourHasPosition}
            onDismiss={dismissTour}
          />
        </div>
      )}

      <style jsx>{`
        .ella-message-in {
          opacity: 0;
          transform: translateY(12px);
          animation: ellaMessageIn 420ms ease forwards;
        }

        .ella-citation {
          animation: ellaCitationPulse 1.6s ease-in-out;
        }

        .tour-bubble {
          box-shadow: 0 12px 34px rgba(0, 0, 0, 0.3);
          animation: tourBubbleBorderPulse 2.4s ease-in-out infinite;
        }

        @keyframes ellaMessageIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes ellaCitationPulse {
          0% {
            box-shadow: 0 0 0 0 rgba(0, 188, 212, 0.45);
          }
          70% {
            box-shadow: 0 0 0 8px rgba(0, 188, 212, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(0, 188, 212, 0);
          }
        }

        @keyframes tourBubbleBorderPulse {
          0%,
          100% {
            box-shadow: 0 12px 34px rgba(0, 0, 0, 0.3), 0 0 0 0 rgba(245, 158, 11, 0.14);
          }
          50% {
            box-shadow: 0 12px 34px rgba(0, 0, 0, 0.3), 0 0 0 3px rgba(245, 158, 11, 0.25);
          }
        }
      `}</style>
    </main>
  );
}

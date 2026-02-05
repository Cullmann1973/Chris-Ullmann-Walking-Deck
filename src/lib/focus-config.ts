/**
 * Focus Mode Configuration
 * 
 * Allows the portfolio to present different emphases via URL parameter:
 *   ?focus=ai              → AI Transformation lead
 *   ?focus=supply-chain    → Supply Chain / Digital Transformation lead
 *   ?focus=quality         → Quality + Operations lead
 *   (default)              → General / balanced presentation
 */

export type FocusMode = "general" | "ai" | "supply-chain" | "quality";

export interface FocusConfig {
  label: string;
  heroResolution: string;
  metrics: { value: string; label: string }[];
  sectionOrder: string[];
  /** Optional descriptor shown in About section */
  positioningLine: string;
}

export const FOCUS_CONFIGS: Record<FocusMode, FocusConfig> = {
  general: {
    label: "General",
    heroResolution: "I'm the BRIDGE between.",
    metrics: [
      { value: "$16M → $200K", label: "inventory turnaround" },
      { value: "12 → 2.7 days", label: "cycle time reduction" },
      { value: "170% ROI", label: "$49M initiative" },
      { value: "1,000+ engaged", label: "AI enablement" },
    ],
    sectionOrder: [
      "hero",
      "about",
      "roles",
      "why-i-build",
      "stack",
      "beyond",
      "ai",
      "contact",
    ],
    positioningLine:
      "25 years across supply chain, manufacturing, and quality. Now building the bridge between business and AI.",
  },
  ai: {
    label: "AI Transformation",
    heroResolution: "I'm the BRIDGE between vision and adoption.",
    metrics: [
      { value: "1,000+", label: "people engaged and empowered" },
      { value: "20+", label: "GenAI use cases deployed" },
      { value: "30%", label: "month-over-month adoption growth" },
      { value: "170% ROI", label: "transformation programs" },
    ],
    sectionOrder: [
      "hero",
      "about",
      "ai",
      "stack",
      "roles",
      "why-i-build",
      "beyond",
      "contact",
    ],
    positioningLine:
      "I don't just strategize about AI. I build POCs, train thousands, and scale adoption from the plant floor to the CEO.",
  },
  "supply-chain": {
    label: "Supply Chain Transformation",
    heroResolution: "I'm the BRIDGE between strategy and execution.",
    metrics: [
      { value: "$500M+", label: "transformation roadmap" },
      { value: "170% ROI", label: "$49M program" },
      { value: "$39M", label: "first-year consolidation savings" },
      { value: "12 → 2.7 days", label: "process cycle time" },
    ],
    sectionOrder: [
      "hero",
      "about",
      "stack",
      "roles",
      "why-i-build",
      "ai",
      "beyond",
      "contact",
    ],
    positioningLine:
      "I design cross-functional operating models that eliminate silos and waste, then embed digital and AI capabilities that scale.",
  },
  quality: {
    label: "Quality & Operations",
    heroResolution:
      "I'm the BRIDGE between compliance and competitive advantage.",
    metrics: [
      { value: "90%", label: "audit observation reduction" },
      { value: "12 → 2.7 days", label: "lab cycle time" },
      { value: "$3.75M", label: "annual inventory savings" },
      { value: "$16M → $200K", label: "quarantine recovery" },
    ],
    sectionOrder: [
      "hero",
      "about",
      "stack",
      "roles",
      "why-i-build",
      "beyond",
      "ai",
      "contact",
    ],
    positioningLine:
      "Quality isn't just compliance: it's a cash flow lever. I've turned quality functions into business drivers across FDA, GMP, and global manufacturing.",
  },
};

export function parseFocusMode(param: string | null): FocusMode {
  if (param && param in FOCUS_CONFIGS) {
    return param as FocusMode;
  }
  return "general";
}

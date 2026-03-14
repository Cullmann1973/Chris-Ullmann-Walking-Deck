export interface PlantPerfectUseCase {
  id: string;
  icon: string;
  title: string;
  description: string;
  actionLabel?: string;
  actionTarget?: string;
}

export interface StrategyInitiative {
  title: string;
  details: string;
}

export interface ImpactMetric {
  label: string;
  value: string;
}

export interface ProductCard {
  role: string;
  name: string;
  sku: string;
  description: string;
}

export interface PackagingComparisonRow {
  attribute: string;
  dailyMoistureCream: string;
  vitaminCSerum: string;
  impact: string;
}

export const plantPerfectHero = {
  company: "Lumiere Cosmetics",
  plant: "Beacon Hill Manufacturing Facility",
  title: "Plant Perfect",
  subtitle: "Manufacturing Intelligence & Golden Standard Analysis",
  tagline:
    "From historical performance to strategic planning. See what's working, predict what's coming, optimize what's next.",
};

export const plantLines = [
  "Line 5 (Filling/Skincare)",
  "Line 8 (Packaging)",
  "Line 12 (Premium Products)",
];

export const plantProducts = [
  "LUXE BOTANICALS Daily Moisture Cream (LB-DMC-50)",
  "LUXE BOTANICALS Vitamin C Serum (LB-VCS-30)",
  "LUXE BOTANICALS Cleansing Oil (LB-CLO-100)",
  "LUXE BOTANICALS Night Treatment (LB-NTX-25)",
];

export const useCaseCards: PlantPerfectUseCase[] = [
  {
    id: "retrospective",
    icon: "📊",
    title: "Performance Reviews",
    description:
      "Analyze previous months' performance, identify losses and opportunities, generate tactical actions for operational reviews.",
  },
  {
    id: "strategy",
    icon: "🎯",
    title: "Strategy Integration",
    description:
      "Input your fiscal strategy, get specific initiative recommendations for lines and products.",
    actionLabel: "Try Strategy Demo",
    actionTarget: "#strategy-integration",
  },
  {
    id: "schedule",
    icon: "📅",
    title: "Look-Ahead Scheduling",
    description:
      "Analyze next week's schedule, identify efficiency improvements and scrap reduction opportunities.",
  },
  {
    id: "golden-standard",
    icon: "⚖️",
    title: "Golden Standard Comparison",
    description:
      "Compare best vs worst performers, understand packaging complexity impacts, get improvement recommendations.",
    actionLabel: "Try Golden Standard Demo",
    actionTarget: "#golden-standard",
  },
];

export const strategyInputPlaceholder =
  "Enter your strategic objectives for FY2026...";

export const strategyInputExample =
  "Increase overall plant efficiency by 12%, reduce quality costs by 20%, optimize premium product line performance, improve changeover times on filling lines";

export const strategyHalIntro =
  "Analysis complete. Strategic objectives mapped to Beacon Hill Manufacturing Facility priorities.";

export const strategyInitiatives: StrategyInitiative[] = [
  {
    title: "Line 5 Optimization",
    details:
      "Focus on LUXE BOTANICALS Vitamin C Serum (LB-VCS-30). Current OEE: 67%, Target: 79%. Packaging complexity scoring shows 8/10 difficulty.",
  },
  {
    title: "Changeover Reduction",
    details:
      "Lines 5 and 8 changeover times 23% above target. Priority SKUs: LB-DMC-50 -> LB-VCS-30 transitions.",
  },
  {
    title: "Quality Cost Reduction",
    details:
      "Premium line rejection rate 4.2% vs target 2.1%. Root cause analysis needed on pump testing failures.",
  },
];

export const strategyImpact: ImpactMetric[] = [
  {
    label: "Efficiency gain potential",
    value: "+8.4% (Line 5), +5.2% (Line 8)",
  },
  {
    label: "Quality cost reduction",
    value: "$2.1M annually if pump issues resolved",
  },
  {
    label: "ROI Timeline",
    value: "4-6 months for changeover improvements",
  },
];

export const goldenStandardProducts: ProductCard[] = [
  {
    role: "Best Performer",
    name: "LUXE BOTANICALS Daily Moisture Cream",
    sku: "LB-DMC-50",
    description:
      "White frosted jar with silver cap - LUXE BOTANICALS Daily Moisture Cream",
  },
  {
    role: "Poor Performer",
    name: "LUXE BOTANICALS Vitamin C Serum",
    sku: "LB-VCS-30",
    description:
      "Clear pump bottle with multi-label design - LUXE BOTANICALS Vitamin C Serum",
  },
];

export const packagingComparisonRows: PackagingComparisonRow[] = [
  {
    attribute: "Package Type",
    dailyMoistureCream: "Frosted glass jar",
    vitaminCSerum: "Pump bottle",
    impact: "Higher changeover complexity",
  },
  {
    attribute: "Closure",
    dailyMoistureCream: "Screw cap",
    vitaminCSerum: "Pump mechanism",
    impact: "+15% quality testing time",
  },
  {
    attribute: "Labels",
    dailyMoistureCream: "Single wraparound",
    vitaminCSerum: "Front + back + pump label",
    impact: "+8 min changeover",
  },
  {
    attribute: "Fill Volume",
    dailyMoistureCream: "50ml",
    vitaminCSerum: "30ml",
    impact: "Different fill head setup",
  },
  {
    attribute: "Testing Required",
    dailyMoistureCream: "Visual inspection",
    vitaminCSerum: "Pump function test",
    impact: "+12% cycle time",
  },
  {
    attribute: "Complexity Score",
    dailyMoistureCream: "3/10 (Simple)",
    vitaminCSerum: "8/10 (Complex)",
    impact: "45% OEE difference",
  },
];

export const goldenStandardHalSummary =
  "Analysis complete. The Vitamin C Serum's pump mechanism and multi-label configuration contribute to 23-minute longer changeovers and 15% higher reject rates. Recommended optimization: Redesign pump housing to standard threading, consolidate to single wraparound label. Projected OEE improvement: +12% to reach 79% target.";

export const useCaseExamples = {
  retrospective:
    "February Performance Summary: Line 5 efficiency down 8% vs January. Primary loss: unplanned downtime (pump mechanism issues on LB-VCS-30). Tactical actions: 1) Implement weekly pump maintenance cycle, 2) Add pump backup inventory, 3) Cross-train operators on rapid pump replacement.",
  schedule:
    "Week of March 18th Schedule Analysis: Move LB-CLO-100 run from Line 8 to Line 5 on Tuesday. Historical data shows 12% better performance on Line 5 for oil-based products. Estimated efficiency gain: 2.3 hours, scrap reduction: 47 units.",
};

export const technicalCapabilities = [
  "Historical analysis",
  "Predictive modeling",
  "Material intelligence",
  "Golden standard benchmarking",
];

export const technicalIntegrations = [
  "OEE systems",
  "Quality databases",
  "Production schedules",
  "Material specifications",
];

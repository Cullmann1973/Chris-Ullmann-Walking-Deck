export type PlantId =
  | "beacon-hill"
  | "milano-operations"
  | "singapore-hub"
  | "sao-paulo-plant";

export interface GlobalKpi {
  label: string;
  value: string;
  trend: string;
}

export interface PlantMetric {
  label: string;
  value: string;
  context: string;
}

export interface StrategicInitiative {
  title: string;
  details: string;
  target: string;
}

export interface SkuPerformance {
  name: string;
  sku: string;
  oee: string;
  quality: string;
  note: string;
}

export interface GoldenStandardComparison {
  best: SkuPerformance;
  worst: SkuPerformance;
  summary: string;
  opportunities: string[];
}

export interface GlobalPlant {
  id: PlantId;
  name: string;
  mapLabel: string;
  location: string;
  region: string;
  timezone: string;
  currentShift: string;
  capacity: string;
  capacityUtilization: string;
  primaryFocus: string;
  currentStatus: string;
  keyProducts: string[];
  productionLines: number;
  skus: number;
  monthlyOutput: string;
  map: {
    lat: number;
    lng: number;
  };
  liveMetrics: PlantMetric[];
  strategicInitiatives: StrategicInitiative[];
  goldenStandard: GoldenStandardComparison;
}

export interface DashboardTab {
  id: "opreviews" | "strategy" | "schedule" | "golden-standard";
  label: string;
  description: string;
}

export interface StrategyRecommendation {
  title: string;
  details: string;
}

export interface ImpactMetric {
  label: string;
  value: string;
}

export interface OperationalMetric {
  label: string;
  value: string;
  benchmark: string;
}

export interface ScheduleOptimizationRow {
  line: string;
  sku: string;
  window: string;
  recommendation: string;
  projectedGain: string;
}

export interface GoldenStandardRow {
  attribute: string;
  bestSku: string;
  worstSku: string;
  impact: string;
}

export const plantPerfectHero = {
  company: "Lumière Cosmetics",
  title: "Plant Perfect Global Command",
  subtitle: "Manufacturing Intelligence Across Four Continents",
  tagline:
    "Real-time insights from Beacon Hill to São Paulo. Select any facility to dive into plant-specific analytics, strategy integration, and golden standard benchmarking.",
  networkSummary: "4 Plants • 12 Production Lines • 47 SKUs • 24/7 Monitoring",
};

export const globalKpis: GlobalKpi[] = [
  {
    label: "Global OEE",
    value: "82.4%",
    trend: "+2.3% YoY",
  },
  {
    label: "Total Production",
    value: "2.8M units",
    trend: "This month",
  },
  {
    label: "Quality Score",
    value: "97.2%",
    trend: "First-pass yield",
  },
  {
    label: "Active Initiatives",
    value: "23",
    trend: "Across 4 plants",
  },
];

export const globalPlants: GlobalPlant[] = [
  {
    id: "beacon-hill",
    name: "Beacon Hill",
    mapLabel: "Boston, USA",
    location: "Boston Metro, Massachusetts USA",
    region: "North America",
    timezone: "America/New_York (UTC-5)",
    currentShift: "Shift 2 active",
    capacity: "1.2M units/month",
    capacityUtilization: "94%",
    primaryFocus: "Premium skincare, anti-aging formulations",
    currentStatus: "94% capacity, Shift 2 active",
    keyProducts: [
      "LUXE BOTANICALS Daily Moisture Cream",
      "LUXE BOTANICALS Vitamin C Serum",
    ],
    productionLines: 3,
    skus: 11,
    monthlyOutput: "1.13M units",
    map: {
      lat: 42.3,
      lng: -71,
    },
    liveMetrics: [
      {
        label: "OEE",
        value: "84.8%",
        context: "+1.6 pts vs last month",
      },
      {
        label: "Current Production",
        value: "39.1K units/day",
        context: "Line 5 and 8 fully staffed",
      },
      {
        label: "Quality",
        value: "98.1% FPY",
        context: "Pump failures down 11%",
      },
    ],
    strategicInitiatives: [
      {
        title: "Pump mechanism optimization",
        details:
          "Redesign pump housing tolerance and standardize torque settings on premium serum runs.",
        target: "8% OEE improvement",
      },
      {
        title: "Changeover playbook",
        details:
          "Apply pre-staged component kits on Line 5 for serum-to-cream transitions.",
        target: "-16 minutes per changeover",
      },
    ],
    goldenStandard: {
      best: {
        name: "LUXE BOTANICALS Daily Moisture Cream",
        sku: "LB-DMC-50",
        oee: "91.4%",
        quality: "99.1% FPY",
        note: "Stable jar format with low changeover loss.",
      },
      worst: {
        name: "LUXE BOTANICALS Vitamin C Serum",
        sku: "LB-VCS-30",
        oee: "72.8%",
        quality: "95.4% FPY",
        note: "Pump alignment and multi-label application drive loss.",
      },
      summary:
        "The premium serum underperforms due to pump setup variability and label complexity during short campaigns.",
      opportunities: [
        "Standardize pump threading and inline torque validation",
        "Shift to a single wraparound label format",
        "Pre-qualify fill-head settings for 30ml transitions",
      ],
    },
  },
  {
    id: "milano-operations",
    name: "Milano Operations",
    mapLabel: "Milan, Italy",
    location: "Milan, Lombardy, Italy",
    region: "Europe",
    timezone: "Europe/Rome (UTC+1)",
    currentShift: "Night shift active",
    capacity: "800K units/month",
    capacityUtilization: "87%",
    primaryFocus: "European luxury market, limited editions",
    currentStatus: "87% capacity, Night shift active",
    keyProducts: [
      "Prestige collection",
      "Seasonal limited releases",
    ],
    productionLines: 2,
    skus: 10,
    monthlyOutput: "696K units",
    map: {
      lat: 45.4,
      lng: 9.2,
    },
    liveMetrics: [
      {
        label: "OEE",
        value: "79.6%",
        context: "Limited edition setup loss",
      },
      {
        label: "Current Production",
        value: "24.8K units/day",
        context: "Campaign-based scheduling",
      },
      {
        label: "Quality",
        value: "97.7% FPY",
        context: "Artwork inspection improvements",
      },
    ],
    strategicInitiatives: [
      {
        title: "Multi-label reduction project",
        details:
          "Unify regional label variants and reduce manual adjustments during campaign swaps.",
        target: "Golden standard optimization",
      },
      {
        title: "Luxury line balance",
        details:
          "Shift high-variability SKUs to protected windows to stabilize nighttime throughput.",
        target: "+4.2 pts OEE",
      },
    ],
    goldenStandard: {
      best: {
        name: "Prestige Repair Essence",
        sku: "MO-PRE-40",
        oee: "88.9%",
        quality: "98.8% FPY",
        note: "Consistent bill of materials and low inspection fallout.",
      },
      worst: {
        name: "Seasonal Velvet Elixir",
        sku: "MO-SVE-30",
        oee: "68.1%",
        quality: "94.6% FPY",
        note: "Frequent format swaps and artisanal packaging checks.",
      },
      summary:
        "Short seasonal campaigns create setup volatility, especially on custom label and cap combinations.",
      opportunities: [
        "Consolidate three cap variants into one standard",
        "Stage artwork verification before line release",
        "Batch seasonal SKUs in fewer, longer runs",
      ],
    },
  },
  {
    id: "singapore-hub",
    name: "Singapore Hub",
    mapLabel: "Singapore",
    location: "Singapore, Southeast Asia",
    region: "Asia-Pacific",
    timezone: "Asia/Singapore (UTC+8)",
    currentShift: "24/7 operation",
    capacity: "3.2M units/month",
    capacityUtilization: "98%",
    primaryFocus: "High-volume production, cost optimization",
    currentStatus: "98% capacity, 24/7 operation",
    keyProducts: [
      "Mass market skincare",
      "High-volume cleansers",
    ],
    productionLines: 4,
    skus: 16,
    monthlyOutput: "3.14M units",
    map: {
      lat: 1.3,
      lng: 103.8,
    },
    liveMetrics: [
      {
        label: "OEE",
        value: "86.3%",
        context: "High-volume lines running at target",
      },
      {
        label: "Current Production",
        value: "114K units/day",
        context: "Weekend demand surge support",
      },
      {
        label: "Quality",
        value: "96.8% FPY",
        context: "Foam cleanser viscosity tuning",
      },
    ],
    strategicInitiatives: [
      {
        title: "Automated changeover deployment",
        details:
          "Roll out recipe-driven format adjustments across Lines 1-4.",
        target: "-22% changeover duration",
      },
      {
        title: "Energy intensity reduction",
        details:
          "Coordinate CIP cycles with production windows to cut utility overlap.",
        target: "-9% energy per unit",
      },
    ],
    goldenStandard: {
      best: {
        name: "Hydra Daily Cleanser",
        sku: "SG-HDC-150",
        oee: "92.1%",
        quality: "98.3% FPY",
        note: "High repeatability on bottle and cap geometry.",
      },
      worst: {
        name: "Glow Boost Scrub",
        sku: "SG-GBS-120",
        oee: "74.5%",
        quality: "95.1% FPY",
        note: "Abrasive dosing and nozzle wear increase downtime.",
      },
      summary:
        "Automated transitions reduce losses, but abrasive products still cause repeat micro-stops.",
      opportunities: [
        "Install wear monitoring on abrasive dosing heads",
        "Adjust preventative maintenance cadence",
        "Convert scrub SKU to extended campaign sequencing",
      ],
    },
  },
  {
    id: "sao-paulo-plant",
    name: "São Paulo Plant",
    mapLabel: "São Paulo, Brazil",
    location: "São Paulo, Brazil",
    region: "Latin America",
    timezone: "America/Sao_Paulo (UTC-3)",
    currentShift: "Day shift active",
    capacity: "650K units/month",
    capacityUtilization: "76%",
    primaryFocus: "Latin America market, local formulations",
    currentStatus: "76% capacity, Day shift active",
    keyProducts: [
      "Climate-adapted formulations",
      "Local ingredient skincare",
    ],
    productionLines: 3,
    skus: 10,
    monthlyOutput: "494K units",
    map: {
      lat: -23.5,
      lng: -46.6,
    },
    liveMetrics: [
      {
        label: "OEE",
        value: "73.9%",
        context: "Material availability constraints",
      },
      {
        label: "Current Production",
        value: "18.2K units/day",
        context: "Local demand spike preparations",
      },
      {
        label: "Quality",
        value: "95.9% FPY",
        context: "Stability tests on humid-weather SKUs",
      },
    ],
    strategicInitiatives: [
      {
        title: "Supply chain localization",
        details:
          "Increase regional component sourcing for bottles and closures.",
        target: "-14 days inbound lead time",
      },
      {
        title: "Climate formula resilience",
        details:
          "Tune viscosity setpoints for warm-weather transport and storage conditions.",
        target: "+1.8 pts FPY",
      },
    ],
    goldenStandard: {
      best: {
        name: "Hydra Tropical Lotion",
        sku: "SP-HTL-180",
        oee: "84.2%",
        quality: "97.4% FPY",
        note: "Strong local sourcing and stable process windows.",
      },
      worst: {
        name: "Urban Shield Gel",
        sku: "SP-USG-120",
        oee: "63.7%",
        quality: "92.8% FPY",
        note: "Imported pump assemblies create frequent delays.",
      },
      summary:
        "The worst-performing SKU is limited by imported component variability and extended lead times.",
      opportunities: [
        "Dual-source pump suppliers within Mercosur",
        "Introduce inbound quality checks for closures",
        "Use campaign planning around port lead-time risk",
      ],
    },
  },
];

export const beaconDashboardTabs: DashboardTab[] = [
  {
    id: "opreviews",
    label: "OpReviews",
    description: "Performance review of active Beacon Hill lines.",
  },
  {
    id: "strategy",
    label: "Strategy Integration",
    description: "Translate strategic goals into line-level initiatives.",
  },
  {
    id: "schedule",
    label: "Schedule Optimization",
    description: "Optimize upcoming runs and reduce changeover loss.",
  },
  {
    id: "golden-standard",
    label: "Golden Standard",
    description: "Compare top and low performing Beacon Hill SKUs.",
  },
];

export const strategyInputPlaceholder =
  "Paste Beacon Hill strategic priorities for next quarter...";

export const strategyInputExample =
  "Increase premium skincare throughput by 8%, reduce pump-related quality incidents by 30%, and cut changeover loss between LB-DMC-50 and LB-VCS-30.";

export const strategyResponseIntro =
  "Command center analysis complete. Beacon Hill priorities mapped to current line constraints and quality risk signals.";

export const beaconStrategyInitiatives: StrategyRecommendation[] = [
  {
    title: "Pump mechanism optimization",
    details:
      "Focus on LB-VCS-30 on Line 5. Add inline torque verification and standardize pump preload setup.",
  },
  {
    title: "Changeover compression",
    details:
      "Deploy pre-staged conversion kits for LB-DMC-50 to LB-VCS-30 transitions to remove manual prep delays.",
  },
  {
    title: "Quality containment sprint",
    details:
      "Run a 30-day defect pareto with quality engineering to isolate recurring pump leak and label skew causes.",
  },
];

export const beaconStrategyImpact: ImpactMetric[] = [
  {
    label: "Projected OEE uplift",
    value: "+8.1% over 2 quarters",
  },
  {
    label: "Quality incident reduction",
    value: "-31% pump-related defects",
  },
  {
    label: "Annualized savings",
    value: "$2.4M from scrap and downtime recovery",
  },
];

export const beaconOperationalMetrics: OperationalMetric[] = [
  {
    label: "Line 5 OEE",
    value: "82.2%",
    benchmark: "+3.4 pts vs Q4 baseline",
  },
  {
    label: "Premium fill rate",
    value: "98.7%",
    benchmark: "Within target band",
  },
  {
    label: "Downtime loss",
    value: "6.1 hours/week",
    benchmark: "-1.9 hours vs prior month",
  },
  {
    label: "Scrap",
    value: "1.8%",
    benchmark: "0.4 pts above best-in-class",
  },
];

export const beaconOperationalActions = [
  "Expand autonomous maintenance on pump stations during Shift 2 handoff.",
  "Protect premium serum campaigns with dedicated quality technician coverage.",
  "Increase spare pump kit inventory to absorb supplier variance.",
];

export const beaconScheduleRows: ScheduleOptimizationRow[] = [
  {
    line: "Line 5",
    sku: "LB-VCS-30",
    window: "Mon 06:00-14:00",
    recommendation: "Move preheat and pump calibration to prior shift staging.",
    projectedGain: "+45 mins runtime",
  },
  {
    line: "Line 8",
    sku: "LB-DMC-50",
    window: "Tue 14:00-22:00",
    recommendation: "Combine two short campaigns into one continuous run.",
    projectedGain: "-12% setup loss",
  },
  {
    line: "Line 12",
    sku: "LB-CLO-100",
    window: "Thu 22:00-06:00",
    recommendation: "Shift to Line 5 where historical speed is consistently higher.",
    projectedGain: "+2.1K units/week",
  },
];

export const beaconGoldenRows: GoldenStandardRow[] = [
  {
    attribute: "Package Format",
    bestSku: "Frosted jar with screw cap",
    worstSku: "Pump bottle with multi-part assembly",
    impact: "Higher mechanical setup risk",
  },
  {
    attribute: "Label Architecture",
    bestSku: "Single wraparound",
    worstSku: "Front + back + pump labels",
    impact: "+9 min average changeover",
  },
  {
    attribute: "Quality Checks",
    bestSku: "Visual + weight verification",
    worstSku: "Leak, torque, and actuation tests",
    impact: "+14% inspection time",
  },
  {
    attribute: "Complexity Score",
    bestSku: "3/10",
    worstSku: "8/10",
    impact: "18.6 point OEE spread",
  },
];

export const beaconGoldenSummary =
  "Beacon Hill's strongest SKU remains LB-DMC-50, while LB-VCS-30 drives most stop events due to pump complexity and label variance.";

export const beaconGoldenActions = [
  "Adopt standardized pump threading and torque windows.",
  "Consolidate three labels into one wrap format.",
  "Pre-stage 30ml setup kits to reduce startup drift.",
];

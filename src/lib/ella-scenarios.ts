export type EllaScenarioId =
  | "troubleshooting"
  | "changeover"
  | "consumer-insight"
  | "quality-history";

export interface EllaSetpointRow {
  parameter: string;
  from: string;
  to: string;
  change: string;
}

export interface EllaOperatorMessage {
  operator: string;
  shift: string;
  timestamp: string;
  text: string;
}

export interface EllaResponse {
  timestamp: string;
  typedText: string;
  source: string;
  citations: string[];
  followUps: string[];
  setpoints?: EllaSetpointRow[];
  changeParts?: string[];
  alertNote?: string;
}

export interface EllaScenario {
  id: EllaScenarioId;
  icon: string;
  title: string;
  summary: string;
  contextLine: string;
  operatorMessage: EllaOperatorMessage;
  ellaResponse: EllaResponse;
}

export const ellaScenarios: EllaScenario[] = [
  {
    id: "troubleshooting",
    icon: "🔧",
    title: "Troubleshooting",
    summary: "Equipment alarm on Line 3",
    contextLine: "Beacon Hill Facility, Line 3 | Shift 2",
    operatorMessage: {
      operator: "Alex",
      shift: "Shift 2",
      timestamp: "06:42 AM",
      text: "Filler on Line 3 is alarming high torque on cap application. Already checked the chuck - looks fine.",
    },
    ellaResponse: {
      timestamp: "06:42 AM",
      typedText:
        "I found 3 similar high-torque cap events on Line 3 in the past 18 months:\n\n• Nov 2024 - Root cause: Cap liner thickness out of spec from supplier (Lot #BX-4410). Resolution: Supplier corrective action, incoming inspection updated.\n\n• Jun 2024 - Root cause: Capping head bearing wear after 14,000 hours. Resolution: Bearing replacement, PM schedule updated to 12,000 hr interval.\n\n• Feb 2024 - Root cause: Bottle neck dimension variance (new mold). Resolution: Tooling adjustment by vendor, dimensional check added to incoming.\n\nRecommended first check: Verify current cap liner lot against approved spec (last supplier NCR was liner-related). Then check capping head hours - current reading: 11,847 hrs.",
      source: "OEM-FL300-Manual, Section 7.4 | Quality Events DB",
      citations: ["CAPA-2024-0847", "WO-2024-1293", "CAPA-2024-0216"],
      followUps: [
        "Would you like the full CAPA-2024-0847 report?",
        "Show me the OEM torque adjustment procedure",
        "Check current supplier lot status",
      ],
    },
  },
  {
    id: "changeover",
    icon: "🔄",
    title: "Changeover",
    summary: "SKU switch on Line 7",
    contextLine: "Beacon Hill Facility, Line 7 | Shift 1",
    operatorMessage: {
      operator: "Maria",
      shift: "Shift 1",
      timestamp: "07:15 AM",
      text: "Starting changeover on Line 7 from Velvet Glow Foundation to HydraShield Moisturizer.",
    },
    ellaResponse: {
      timestamp: "07:15 AM",
      typedText:
        "Changeover checklist for Line 7: VGF-2240 -> HSM-1180.\n\nSetpoints and required swaps are loaded below.\n\nHistorical note: Last changeover on this line (Feb 12) had a 22-minute delay due to a missed gasket swap on the fill manifold. Gasket swap is required for viscosity changes greater than 1,000 cP.",
      source: "Line 7 Changeover Matrix | Equipment Setup DB",
      citations: ["CO-2025-0087"],
      followUps: [
        "Show me the gasket swap procedure",
        "What was the last run performance for HSM-1180?",
        "Start changeover timer",
      ],
      setpoints: [
        {
          parameter: "Fill volume",
          from: "30.0 mL",
          to: "50.0 mL",
          change: "+20 mL",
        },
        {
          parameter: "Fill speed",
          from: "42 units/min",
          to: "38 units/min",
          change: "-4",
        },
        {
          parameter: "Viscosity setting",
          from: "3,200 cP",
          to: "1,800 cP",
          change: "-1,400",
        },
        {
          parameter: "Nozzle type",
          from: "4mm standard",
          to: "6mm wide",
          change: "Swap required",
        },
      ],
      changeParts: [
        "6mm wide-bore nozzles (Bin C-14)",
        "HSM-1180 bottle guides (Bin D-22)",
        "50 mL volume cam",
      ],
      alertNote:
        "Historical note: Last Line 7 changeover (Feb 12) lost 22 minutes due to a missed gasket swap.",
    },
  },
  {
    id: "consumer-insight",
    icon: "📊",
    title: "Consumer Insight",
    summary: "Top complaints on Velvet Glow",
    contextLine: "Beacon Hill Facility, Line 3 | Shift 2",
    operatorMessage: {
      operator: "Alex",
      shift: "Shift 2",
      timestamp: "10:30 AM",
      text: "What are the top consumer complaints on Velvet Glow Foundation this quarter?",
    },
    ellaResponse: {
      timestamp: "10:30 AM",
      typedText:
        "Top consumer complaints for VGF-2240 (Q1 2025):\n\n1) Pump dispenser sticking - 34% of complaints (up 12% vs Q4). Correlation: Lines 3 and 7 both affected. Possible link: New pump supplier onboarded Nov 2024.\n\n2) Color inconsistency between batches - 22% of complaints. Concentrated in shade 'Porcelain 102'. Compounding variance noted in pigment dispersion step.\n\n3) Separation in bottle after 60 days - 18% of complaints. Stability data shows marginal pass at 40C / 75% RH. Compounding team is reviewing emulsifier ratio.\n\nTrending: Pump complaints are accelerating. 47 complaints in the last 30 days vs 28 in the prior 30 days.",
      source: "Consumer Insights DB | Quality Events DB",
      citations: ["NCR-2025-0034", "CAPA-2025-0112"],
      followUps: [
        "Show me the pump supplier change timeline",
        "Pull up NCR-2025-0034",
        "What lines produced the affected lots?",
      ],
    },
  },
  {
    id: "quality-history",
    icon: "📋",
    title: "Quality History",
    summary: "Fill weight variance investigation",
    contextLine: "Beacon Hill Facility, Line 12 | Shift 3",
    operatorMessage: {
      operator: "James",
      shift: "Shift 3",
      timestamp: "02:15 PM",
      text: "We're seeing fill weight variance on Line 12 for Silk Touch Serum. Running about 2% over target. Have we seen this before?",
    },
    ellaResponse: {
      timestamp: "02:15 PM",
      typedText:
        "Yes - Line 12 has had 4 fill weight variance events for STS-3350 in the past 24 months:\n\n• Sep 2024 - 1.8% over target. Root cause: Temperature drift in holding tank affecting viscosity. Fix: Recalibrated temperature controller. Resolved same shift.\n\n• May 2024 - 2.3% over target. Root cause: Worn piston seals on fill heads 3 and 4. Fix: Seal replacement and added to 6-month PM cycle.\n\n• Jan 2024 - 1.5% over target. Root cause: Raw material lot variance (jojoba oil viscosity higher than spec). Fix: Adjusted fill speed by -2 units/min to compensate.\n\n• Aug 2023 - 3.1% over target. Root cause: Incorrect volume cam installed after changeover. Fix: Operator retraining and added cam verification to checklist.\n\nPattern: 3 of 4 events are viscosity-related. Recommend checking holding tank temperature first - current reading: 24.8C (spec: 23 +/- 1C). You are 0.8C over.",
      source: "Quality Events DB | Line 12 Sensor Data",
      citations: ["DEV-2024-0934", "WO-2024-0812", "DEV-2024-0087", "CAPA-2023-0445"],
      followUps: [
        "Show me the temperature trend for the last 4 hours",
        "Pull up the piston seal PM schedule",
        "What's the current raw material lot for jojoba oil?",
      ],
    },
  },
];

export const defaultEllaScenarioId: EllaScenarioId = "troubleshooting";

export const ellaScenarioMap = Object.fromEntries(
  ellaScenarios.map((scenario) => [scenario.id, scenario])
) as Record<EllaScenarioId, EllaScenario>;

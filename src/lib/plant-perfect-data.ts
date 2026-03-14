// Plant Perfect - AI Strategic Planning Assistant Data
// Single plant focus: Beacon Hill Manufacturing (Boston, MA)
// Core capabilities: Retrospective analysis, strategic planning, schedule optimization, golden standard analysis

export interface StrategicScenario {
  id: string;
  title: string;
  description: string;
  sampleQuestions: string[];
  keyInsights: string[];
}

export interface PlantContext {
  name: string;
  location: string;
  productionLines: {
    filling: number;
    packaging: number;
    compounding: number;
  };
  keyProducts: string[];
  operationalFocus: string[];
  performanceMetrics: {
    avgOEE: number;
    qualityScore: number;
    onTimeDelivery: number;
  };
}

export const plantContext: PlantContext = {
  name: "Beacon Hill Manufacturing",
  location: "Boston, MA",
  productionLines: {
    filling: 3,
    packaging: 2,
    compounding: 1
  },
  keyProducts: [
    "Premium Skincare",
    "Color Cosmetics", 
    "Anti-Aging Serums",
    "Luxury Foundation Lines"
  ],
  operationalFocus: [
    "Quality Excellence",
    "Manufacturing Efficiency", 
    "Process Innovation",
    "Lean Operations"
  ],
  performanceMetrics: {
    avgOEE: 84.8,
    qualityScore: 97.2,
    onTimeDelivery: 94.1
  }
};

export const strategicScenarios: StrategicScenario[] = [
  {
    id: "retrospective",
    title: "Retrospective Analysis",
    description: "Review past performance for operational reviews and lessons learned",
    sampleQuestions: [
      "What were our top 3 downtime events last quarter and how can we prevent them?",
      "Which initiatives from last year had the biggest impact on OEE?",
      "What patterns do you see in our quality holds over the past 6 months?",
      "How did our changeover times improve after the Lean implementation?"
    ],
    keyInsights: [
      "Filler Line 3 sensor calibration issues caused 47 hours downtime in Q3",
      "Packaging Line 1 humidity control during changeovers reduced efficiency by 12%", 
      "Steam valve actuator replacements should move to 18-month vs 24-month cycles",
      "Visual inspection automation reduced quality holds by 23% year-over-year"
    ]
  },
  {
    id: "strategic",
    title: "Strategic Planning", 
    description: "Integrate plant data into next fiscal year initiatives and capital planning",
    sampleQuestions: [
      "How should next year's automation investment be prioritized based on performance data?",
      "Which production lines are best positioned for capacity expansion?",
      "What's the ROI case for upgrading our packaging automation?",
      "How do we align FY26 capital projects with Plant Excellence goals?"
    ],
    keyInsights: [
      "Packaging Line 1 auto-reject system shows 18-month payback based on quality costs",
      "Filler Line 2 vision inspection could eliminate 3.2% manual holds",
      "Material handling conveyor upgrade enables lights-out night shift operation",
      "Strategic alignment with sustainability goals requires energy monitoring upgrades"
    ]
  },
  {
    id: "schedule",
    title: "Schedule Optimization",
    description: "Look-ahead analysis for next week's production schedule and resource allocation", 
    sampleQuestions: [
      "Which production lines should we schedule for high-complexity jobs next week?",
      "How should we sequence changeovers to minimize total downtime?",
      "What's the optimal batch sizing for the anti-aging serum campaign?",
      "Which maintenance windows create the least production impact?"
    ],
    keyInsights: [
      "Line 3 shows 15% better performance on complex SKUs vs. Line 1",
      "Grouping similar color families reduces changeover time by 40 minutes average",
      "Tuesday-Thursday windows minimize impact on weekly delivery commitments",
      "Batch sizes above 2,500 units show diminishing efficiency returns"
    ]
  },
  {
    id: "golden",
    title: "Golden Standard Analysis",
    description: "Compare best vs worst performers and identify improvement opportunities",
    sampleQuestions: [
      "What separates our best OEE days from our worst, and how do we replicate the best?",
      "Which operators consistently achieve the highest quality scores?",
      "What setup conditions lead to the fastest changeover times?", 
      "How do environmental factors affect our premium product quality?"
    ],
    keyInsights: [
      "Best OEE days correlate with pre-shift equipment warm-up protocols",
      "Top-performing operators use consistent visual inspection patterns",
      "Changeovers under 45 minutes require specific tool staging procedures",
      "Humidity below 45% during filling improves consistency by 8%"
    ]
  }
];

export const exampleQuestions = [
  "What were our top 3 downtime events last quarter and how can we prevent them?",
  "How should next year's automation investment be prioritized based on performance data?",
  "Which production lines should we schedule for high-complexity jobs next week?", 
  "What separates our best OEE days from our worst, and how do we replicate the best?"
];

// Sample AI responses for demo purposes
export const sampleResponses = {
  retrospective: {
    question: "What were our top 3 downtime events last quarter and how can we prevent them?",
    response: `Based on Q3 performance data, the top 3 downtime events were:

**1. Filler Line 3 - Sensor Calibration Issues (47 hours total)**
- Root cause: Inadequate preventive maintenance schedule
- Prevention: Implement weekly sensor calibration protocol
- Est. savings: $94K annually in downtime costs

**2. Packaging Line 1 - Label Web Breaks (31 hours total)**
- Root cause: Humidity control during changeovers  
- Prevention: Climate conditioning 30min before changeover
- Est. savings: $62K annually in lost throughput

**3. Mixing Tank B - Temperature Control Failures (28 hours total)**
- Root cause: Steam valve actuator wear
- Prevention: Replace actuators on 18-month cycle vs current 24-month
- Est. savings: $56K annually plus quality improvement

*Sources: Maximo work orders Q3, OEE logs, maintenance reports*`
  },
  strategic: {
    question: "How should next year's automation investment be prioritized based on performance data?",
    response: `FY26 automation investment priority ranking:

**Priority 1: Packaging Line 1 Auto-Reject System ($280K)**
- ROI: 18 months based on quality cost reduction
- Impact: Eliminate 3.2% manual quality holds
- Strategic alignment: Plant Excellence initiative

**Priority 2: Filler Line 2 Vision Inspection ($195K)**
- ROI: 24 months based on reduced customer complaints
- Impact: Catch fill-level variations before shipping  
- Strategic alignment: Zero defect manufacturing

**Priority 3: Material Handling Conveyor Upgrade ($150K)**
- ROI: 36 months based on labor reduction
- Impact: Enable lights-out operation during night shift
- Strategic alignment: Operational efficiency goals

*Analysis includes payback calculations, risk assessment, and strategic alignment with Plant Excellence initiative.*`
  },
  schedule: {
    question: "Which production lines should we schedule for high-complexity jobs next week?",
    response: `Next week scheduling recommendations:

**Line 3: Complex Color Cosmetics (Recommended)**
- 15% better yield on multi-color products vs Line 1
- Operator team has advanced training on precision filling
- Equipment calibrated for tight tolerance work

**Line 1: Standard SKUs Only (Avoid Complex Jobs)**
- Recent sensor drift requires recalibration
- New operator training in progress
- Better suited for high-volume, simple formulations

**Optimal Sequencing:**
- Monday: Line 3 warm-up with medium complexity
- Tue-Thu: High complexity campaigns on Line 3
- Friday: Line 1 for weekend production buffer

*Based on historical yield data, operator skill matrix, and equipment status*`
  },
  golden: {
    question: "What separates our best OEE days from our worst, and how do we replicate the best?",
    response: `Golden standard analysis (top 10% vs bottom 10% OEE days):

**Key Differentiators:**

**Equipment Preparation**
- Best days: 30-min pre-shift warm-up completed
- Worst days: Cold start-ups or rushed preparations
- Impact: 12% difference in first-hour efficiency

**Environmental Conditions** 
- Best days: Humidity 40-45%, Temperature 68-72°F
- Worst days: Humidity >50% or temperature variation >3°F
- Impact: 8% difference in quality metrics

**Operator Behaviors**
- Best days: Standard visual inspection checklist followed
- Worst days: Abbreviated or inconsistent inspections  
- Impact: 6% difference in catch-rate for quality issues

**Replication Strategy:**
1. Mandate 30-minute equipment warm-up (Est. +7% OEE)
2. Install environmental monitoring alerts (Est. +5% OEE) 
3. Digitize inspection checklists with compliance tracking (Est. +4% OEE)

*Analysis of 90-day performance window, 247 production days*`
  }
};

// Tour stops for the guided experience
export const tourStops = [
  {
    id: "hero",
    title: "AI Strategic Planning Assistant",
    description: "Plant Perfect analyzes performance data and provides strategic insights for manufacturing optimization"
  },
  {
    id: "scenarios", 
    title: "Four Core Capabilities",
    description: "Retrospective analysis, strategic planning, schedule optimization, and golden standard benchmarking"
  },
  {
    id: "chat",
    title: "Intelligent Conversations", 
    description: "Ask strategic questions and get data-driven insights with citations from your plant's performance history"
  },
  {
    id: "examples",
    title: "Example Questions",
    description: "Start with these common strategic planning questions or ask anything about plant performance"
  },
  {
    id: "context",
    title: "Plant Context Aware",
    description: "All insights are tailored to Beacon Hill facility's specific equipment, processes, and performance patterns"
  }
];
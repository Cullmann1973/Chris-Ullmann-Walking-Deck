# GitHub HR AI Blueprint Rebrand Spec

This document defines exact copy changes for rebranding the Blueprint toward a people-first AI transformation narrative. Do NOT change layout, animations, styles, or structure — ONLY change text content.

---

## 1. Hero Tagline (hero-section.tsx)

CURRENT:
```
From Vision to Strategy.
Execution with Discipline.
Scaling AI.
```

CHANGE TO:
```
People Drive Transformation.
AI Accelerates It.
Culture Makes It Last.
```

Keep the same class names (tagline-flash-strategy on "Transformation", tagline-flash-execution on "Accelerates", tagline-flash-ai on "Last"). Just update the text.

## 2. Hero Metrics Ticker (hero-section.tsx)

CURRENT defaultMetrics:
```
{ value: "$49M+", label: "program, 170% ROI" },
{ value: "$500M+", label: "transformation roadmap" },
{ value: "1,000+", label: "people activated on AI" },
{ value: "$45M/year", label: "working capital released" },
```

CHANGE TO:
```
{ value: "1,000+", label: "people activated on AI" },
{ value: "100+", label: "AI Community of Practice members" },
{ value: "37x", label: "growth in active AI users" },
{ value: "8", label: "global plants transformed" },
```

## 3. About Section — Expertise Words (about-section.tsx)

CURRENT expertiseWords:
```
"SUPPLY CHAIN DIGITALIZATION",
"PROCESS REDESIGN",
"CHANGE LEADERSHIP",
"QUALITY SYSTEMS",
"AI INTEGRATION",
```

CHANGE TO:
```
"PEOPLE-FIRST TRANSFORMATION",
"GRASSROOTS AI ADOPTION",
"CHANGE LEADERSHIP",
"COMMUNITY BUILDING",
"AI INTEGRATION",
```

## 4. About Section — Stats (about-section.tsx)

CURRENT stats:
```
{ value: "$49M+", label: "Enterprise transformation, 170% ROI" },
{ value: "$500M+", label: "Roadmap authored" },
{ value: "1,000+", label: "People activated on AI" },
{ value: "25+", label: "Years across regulated industries" },
```

CHANGE TO:
```
{ value: "1,000+", label: "People activated on AI" },
{ value: "100+", label: "AI Community of Practice" },
{ value: "37x", label: "Growth in AI adoption" },
{ value: "25+", label: "Years leading transformation" },
```

## 5. About Section — Bio Paragraphs (about-section.tsx)

REPLACE the existing bio paragraphs (the div with class "space-y-4 text-muted-foreground leading-relaxed") with:

```
<p>
  AI adoption is a people problem, not a technology problem.
  I&apos;ve spent 25 years proving that.
</p>
<p>
  I built an AI Community of Practice from 3 members to 100+,
  growing it organically from Manufacturing into Marketing, R&amp;D,
  and Global Supply Chain. Not by mandate. By making it useful.
</p>
<p>
  Trained through a direct partnership with John Kotter at Harvard.
  Presented at Microsoft Ignite. Panelist at the Microsoft 365
  Community Conference alongside a CDO and CIO, in a session led
  by Srini Raghavan, CVP of Microsoft 365 Copilot Ecosystem.
</p>
<p>
  My approach: find the people closest to the work, give them
  tools that solve real problems, and let them teach each other.
  Champions, not mandates. Culture change, not rollouts.
</p>
<p>
  Today I lead AI transformation across 8 global plants,
  with 1,000+ people using AI in their daily work.
</p>
```

## 6. About Section — Certifications line (about-section.tsx)

FIND: "Lean Six Sigma certified. Kotter Change Management facilitator. Work featured in Harvard Business Review."

REPLACE WITH: "Kotter Change Leadership (Harvard workshop, direct partnership). Lean Six Sigma. Work featured in Harvard Business Review. Microsoft Ignite presenter. M365 Conference panelist."

## 7. What I Deliver Cards (what-i-deliver-section.tsx)

REPLACE ALL 5 cards:

```
{
  title: "Grassroots AI Adoption",
  description: "Community of Practice that grew 37x. Peer champions, not IT mandates. People teaching people.",
  icon: UsersRound,
},
{
  title: "Governance That Enables",
  description: "Legal, Compliance, and Privacy engaged early. Guardrails that let people move faster, not slower.",
  icon: ShieldCheck,
},
{
  title: "Culture Change at Scale",
  description: "From 3 to 1,000+ AI users. Organic growth across departments. Tools people actually use.",
  icon: Boxes,
},
{
  title: "Tools People Actually Use",
  description: "ELLA, Plant Perfect, Cognex Vision. Built for operators and managers, not demos.",
  icon: Bot,
},
{
  title: "From Champions to Movement",
  description: "One manufacturing CoP became company-wide. Kotter methodology. HBR-featured results.",
  icon: Workflow,
},
```

---

## IMPORTANT CONSTRAINTS
- Do NOT change any CSS, animations, layout, or component structure
- Do NOT change any imports or component names
- Only change text strings, array contents, and JSX text nodes
- Keep all existing class names and animation targets exactly as they are
- Run npm run build when done to verify compilation

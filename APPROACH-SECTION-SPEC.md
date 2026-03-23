# New "My Approach" Section — Build Spec

Create a new section component and wire it into the page between "What I Deliver" and "Roles Reveal".

## 1. Create src/components/sections/approach-section.tsx

Design language: Match the existing sections (dark bg, serif headings, muted-foreground body text, GSAP scroll animations).

### Section structure:

```
Section label: "Philosophy" (small mono text, like other section labels)
Section title: "Human-Centered AI" (large serif heading)
Subtitle: "Technology serves people. Not the other way around."

Three pillars displayed as cards (similar to what-i-deliver cards):

PILLAR 1:
Icon: Brain (from lucide-react)
Title: "Stanford HAI Foundation"
Body: "Trained through Stanford's Human-Centered AI Institute. Technical Fundamentals of Generative AI and Business Applications — covering not just how AI works, but its impact on individuals, communities, and society. Trust frameworks. Legal risks. Workforce transformation. Intelligence augmentation — human + AI, not replacement."

PILLAR 2:
Icon: Users (from lucide-react)  
Title: "Grassroots, Not Mandates"
Body: "AI Community of Practice: 3 members to 100+, grown organically across Manufacturing, Marketing, R&D, and Global Supply Chain. Monthly showcases. Peer champions. Prompt libraries built by the people who use them. 37x growth in active AI users — not from IT rollouts, but from making it genuinely useful."

PILLAR 3:
Icon: Shield (from lucide-react)
Title: "Governance That Enables"
Body: "Legal, Compliance, and Privacy engaged before the first tool was deployed. Responsible AI isn't a checkbox — it's the foundation that lets people move faster. Built access models, usage guidelines, and adoption tracking. When you've run GMP-regulated operations, you know: governance done right accelerates, not blocks."
```

Below the three pillars, add a credentials strip (horizontal, subtle):
```
Stanford HAI · Kotter Change Leadership (Harvard) · Microsoft Ignite · M365 Conference Panelist · Harvard Business Review
```

### Animation:
- Section label and title: fade in + slide up on scroll (like other sections)
- Three pillar cards: stagger in from bottom on scroll (like what-i-deliver cards)
- Credentials strip: fade in last

### Responsive:
- Desktop: 3 columns for pillar cards
- Tablet: 2 columns
- Mobile: 1 column, stacked

## 2. Wire into page.tsx

Import the new component:
```
import { ApproachSection } from "@/components/sections/approach-section";
```

Insert it after WhatIDeliverSection in the section rendering. Find this code:
```
if (id === "about") {
  sections.push(<ProofCallout key="proof-callout" />);
  sections.push(<WhatIDeliverSection key="what-i-deliver" focus={mode} />);
}
```

Change to:
```
if (id === "about") {
  sections.push(<ProofCallout key="proof-callout" />);
  sections.push(<WhatIDeliverSection key="what-i-deliver" focus={mode} />);
  sections.push(<ApproachSection key="approach" />);
}
```

## 3. Update About section credentials line (about-section.tsx)

Find: "Kotter Change Leadership (Harvard workshop, direct partnership). Lean Six Sigma. Work featured in Harvard Business Review. Microsoft Ignite presenter. M365 Conference panelist."

Replace with: "Stanford HAI (Human-Centered AI). Kotter Change Leadership (Harvard, direct partnership). Lean Six Sigma. Harvard Business Review. Microsoft Ignite. M365 Conference panelist (April 2026)."

## 4. Run npm run build to verify

## CONSTRAINTS
- Match existing design language exactly (colors, fonts, spacing, border styles)
- Use GSAP + ScrollTrigger for animations (already imported via gsap-provider)
- Use lucide-react for icons (already installed)
- Keep it responsive — test mental model for 390px, 768px, 1440px
- Do NOT modify any other sections

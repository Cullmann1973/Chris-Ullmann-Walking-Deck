# The Ullmann Blueprint

An interactive portfolio site showcasing Christopher Ullmann's career in AI transformation, quality leadership, and operational excellence. Built with Next.js, TypeScript, Tailwind CSS, GSAP, and Framer Motion.

**Live:** [ullmann-blueprint.vercel.app](https://ullmann-blueprint.vercel.app)

## Sections

- **Hero:** Animated tagline ("From Vision to Strategy. Execution with Discipline. Scaling AI.") with cycling metrics ticker
- **About:** Headshot, expertise keywords, bio, current role, and stats
- **What I Deliver:** Capability cards (Transformation, Regulatory, Adoption, Digital/AI, Change Leadership)
- **Roles / What Sets Me Apart:** Pinned scroll revealing 4 qualities
- **Why I Build / My Approach:** Rotating discipline words with career descriptions
- **The Journey (Stack):** Accordion timeline with 5 career eras
- **Beyond Work:** Family, 4:30 Club, The Drive sections with images and quotes
- **AI Projects:** ELLA, Supplier Intel, Plant Perfect, Cognex Vision, QC Copilot, in-lite Designer
- **Contact:** Email, LinkedIn, resume download

## Interactive Features

- **CU Logo:** Floating animated logo with GSAP entrance
- **Custom Cursor:** SVG arrow with 10-dot glowing trail (desktop)
- **Chat Widget:** AI copilot for Q&A about Chris's background
- **ELLA Demo:** Interactive tour at `/ella`
- **Plant Perfect Demo:** AI strategic planning assistant at `/plant-perfect`
- **Scroll Nudge:** Animated prompt to scroll
- **Focus Mode:** URL params to highlight specific sections

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** GSAP + ScrollTrigger, Framer Motion
- **Icons:** Lucide React
- **Analytics:** Vercel Analytics + Speed Insights

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Main page (all sections)
│   ├── layout.tsx            # Root layout (Inter, Playfair Display, JetBrains Mono)
│   ├── globals.css           # Theme variables and base styles
│   ├── api/chat/             # AI chat API route
│   ├── ella/                 # ELLA demo page
│   └── plant-perfect/        # Plant Perfect demo page
├── components/
│   ├── header.tsx            # Fixed nav bar
│   ├── unified-cu-logo.tsx   # Animated CU logo
│   ├── chat-widget.tsx       # AI chat interface
│   ├── gsap-provider.tsx     # GSAP context + ScrollTrigger
│   ├── menu-overlay.tsx      # Mobile menu
│   ├── scroll-nudge.tsx      # Scroll prompt animation
│   ├── proof-callout.tsx     # Proof point callout
│   └── sections/             # All page sections
│       ├── hero-section.tsx
│       ├── about-section.tsx
│       ├── what-i-deliver-section.tsx
│       ├── roles-reveal-section.tsx
│       ├── why-i-build-section.tsx
│       ├── stack-section.tsx
│       ├── beyond-section.tsx
│       ├── ai-section.tsx
│       └── contact-section.tsx
├── hooks/
│   └── use-focus.ts          # Focus mode hook
└── lib/
    └── utils.ts              # Utilities
```

## Theme

Dark theme with teal accents:
- Background: `#0a0a0a`
- Primary: `#00bcd4` (teal)
- Fonts: Inter (body), Playfair Display (display), JetBrains Mono (code)

## Getting Started

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## Deployment

Deployed to Vercel via CLI:
```bash
vercel --prod
```

## License

Private - All rights reserved.

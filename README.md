# The Ullmann Blueprint

An interactive portfolio app showcasing Christopher Ullmann's career journey, achievements, and expertise. Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **Cockpit (Home):** HUD-style hero section with animated performance metrics
- **Mission Log:** Interactive timeline of career milestones
- **Builder's Lab:** Technical showcase with sim rig specs and code samples
- **AI Co-Pilot:** Chat interface (ready for AI integration)

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui
- **Animations:** Framer Motion
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ (installed via fnm)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd ullmann-blueprint
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel

### Option 1: Vercel CLI

1. Install Vercel CLI (already installed):
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. For production deployment:
```bash
vercel --prod
```

### Option 2: GitHub Integration

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Next.js settings
6. Click "Deploy"

## Adding AI Integration (Optional)

To enable the AI Co-Pilot with real responses:

1. Create a `.env.local` file:
```bash
OPENAI_API_KEY=your-openai-api-key-here
```

2. Install the Vercel AI SDK:
```bash
npm install ai @ai-sdk/openai
```

3. Create an API route at `src/app/api/chat/route.ts`:
```typescript
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai('gpt-4-turbo'),
    system: `You are Chris Ullmann's digital twin. Answer questions based on his biography and achievements...`,
    messages,
  });

  return result.toDataStreamResponse();
}
```

4. Update the AI Co-Pilot page to use the `useChat` hook from the AI SDK.

### Environment Variables for Vercel

When deploying to Vercel with AI features, add these environment variables in your Vercel dashboard:

- `OPENAI_API_KEY`: Your OpenAI API key

## Customization

### Adding Your Content

1. **Biography:** Update the AI system prompt with your full biography
2. **Timeline:** Edit `src/app/mission-log/page.tsx` with your career events
3. **Metrics:** Update the numbers in `src/app/page.tsx`
4. **Sim Rig Photo:** Replace the placeholder in Builder's Lab with your actual image

### Changing the Theme

The "Industrial Digital" theme colors are defined in `src/app/globals.css`. Key variables:

- `--gauge-amber`: Primary accent (warm amber)
- `--gauge-blue`: Secondary accent (electric blue)
- `--gauge-green`: Success/active states

## Project Structure

```
src/
├── app/
│   ├── page.tsx           # Cockpit (Home)
│   ├── mission-log/       # Timeline
│   ├── builder-lab/       # Projects
│   ├── ai-copilot/        # Chat
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Theme & styles
├── components/
│   ├── sidebar.tsx        # Navigation
│   └── animated-counter.tsx
└── lib/
    └── utils.ts           # Utilities
```

## License

Private - All rights reserved.

---

Built with precision by The Ullmann Blueprint

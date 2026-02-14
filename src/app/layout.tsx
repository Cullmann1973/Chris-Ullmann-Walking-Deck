import type { Metadata } from "next";
import "./globals.css";
import { GSAPProvider } from "@/components/gsap-provider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Christopher Ullmann | AI Transformation Leader",
  description:
    "Executive Director leading AI transformation at The Estée Lauder Companies. 25+ years bridging strategy and operations, from Air Force flight lines to Fortune 500 boardrooms.",
  keywords: [
    "Christopher Ullmann",
    "AI Transformation",
    "Digital Transformation",
    "GenAI Strategy",
    "Manufacturing Excellence",
    "Supply Chain",
    "Leadership",
    "Estée Lauder",
    "Stanford AI",
  ],
  authors: [{ name: "Christopher Ullmann" }],
  openGraph: {
    title: "Christopher Ullmann | AI Transformation Leader",
    description:
      "Executive Director leading AI transformation at The Estée Lauder Companies. 25+ years bridging strategy and operations.",
    type: "website",
    url: "https://ullmann-blueprint.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Christopher Ullmann | AI Transformation Leader",
    description:
      "Executive Director leading AI transformation at The Estée Lauder Companies.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (history.scrollRestoration) {
                history.scrollRestoration = 'manual';
              }
              // Only scroll to top if no hash in URL (allow #ai etc to work)
              if (!window.location.hash) {
                window.scrollTo(0, 0);
              }
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <GSAPProvider>{children}</GSAPProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

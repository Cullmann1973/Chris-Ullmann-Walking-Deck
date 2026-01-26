import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { GSAPProvider } from "@/components/gsap-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Christopher Ullmann | Strategy & Transformation",
  description:
    "Most transformation leaders know strategy or operations. I've built at every layer.",
  keywords: [
    "Christopher Ullmann",
    "Strategy",
    "Digital Transformation",
    "GenAI",
    "AI Strategy",
    "Manufacturing",
    "Leadership",
  ],
  authors: [{ name: "Christopher Ullmann" }],
  openGraph: {
    title: "Christopher Ullmann | Strategy & Transformation",
    description:
      "Most transformation leaders know strategy or operations. I've built at every layer.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} antialiased`}
      >
        <GSAPProvider>{children}</GSAPProvider>
      </body>
    </html>
  );
}

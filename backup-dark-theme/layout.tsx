import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Ullmann Blueprint",
  description: "Interactive Dossier of Christopher Ullmann - Strategy & Transformation Leader",
  keywords: ["Christopher Ullmann", "Strategy", "Digital Transformation", "GenAI", "Quality", "Leadership"],
  authors: [{ name: "Christopher Ullmann" }],
  openGraph: {
    title: "The Ullmann Blueprint",
    description: "Interactive Dossier of Christopher Ullmann - Strategy & Transformation Leader",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <Sidebar />
        <main className="lg:ml-[280px] min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}

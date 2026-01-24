"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Layers,
  Bot,
  Menu,
  X,
  Mail,
  Linkedin,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "HOME", icon: Home, description: "The Premise" },
  { href: "/the-stack", label: "THE STACK", icon: Layers, description: "Career Layers" },
  { href: "/ai-copilot", label: "ASK CHRIS", icon: Bot, description: "Digital Twin" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-sidebar border border-sidebar-border lg:hidden"
        aria-label="Toggle navigation"
      >
        {isMobileOpen ? (
          <X className="w-6 h-6 text-sidebar-foreground" />
        ) : (
          <Menu className="w-6 h-6 text-sidebar-foreground" />
        )}
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isMobileOpen ? 0 : typeof window !== "undefined" && window.innerWidth < 1024 ? -280 : 0,
        }}
        className={cn(
          "fixed left-0 top-0 h-full w-[280px] bg-sidebar border-r border-sidebar-border z-50",
          "flex flex-col",
          "lg:translate-x-0"
        )}
      >
        {/* Header */}
        <div className="p-6 border-b border-sidebar-border">
          <Link href="/" className="block">
            <h1 className="text-lg font-bold tracking-tight text-foreground">
              CHRISTOPHER
            </h1>
            <h2 className="text-2xl font-bold tracking-tight text-primary">
              ULLMANN
            </h2>
            <p className="text-xs text-muted-foreground mt-2">
              Strategy & Transformation Leader
            </p>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={cn(
                  "group flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200",
                  "border border-transparent",
                  isActive
                    ? "bg-sidebar-accent border-primary/30"
                    : "hover:bg-sidebar-accent/50 hover:border-sidebar-border"
                )}
              >
                <div
                  className={cn(
                    "p-2 rounded-md transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground group-hover:bg-muted/80"
                  )}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span
                    className={cn(
                      "font-mono text-sm tracking-wider",
                      isActive ? "text-primary" : "text-sidebar-foreground"
                    )}
                  >
                    {item.label}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {item.description}
                  </span>
                </div>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="ml-auto w-1.5 h-8 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Contact Footer */}
        <div className="p-4 border-t border-sidebar-border space-y-3">
          <p className="text-xs font-mono text-muted-foreground tracking-wider uppercase">
            Connect
          </p>
          <div className="flex gap-2">
            <a
              href="mailto:c.ullmann@yahoo.com"
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors text-sm"
            >
              <Mail className="w-4 h-4" />
              Email
            </a>
            <a
              href="https://linkedin.com/in/christopherullmann"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors text-sm"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
          </div>
        </div>
      </motion.aside>
    </>
  );
}

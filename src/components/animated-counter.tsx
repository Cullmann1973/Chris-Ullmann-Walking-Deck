"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  subLabel?: string;
  duration?: number;
  colorClass?: string;
}

export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  label,
  subLabel,
  duration = 2,
  colorClass = "text-gauge-amber",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hasAnimated, setHasAnimated] = useState(false);

  const spring = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  });

  const display = useTransform(spring, (current) =>
    Math.floor(current).toLocaleString()
  );

  useEffect(() => {
    if (isInView && !hasAnimated) {
      spring.set(value);
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated, spring, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="relative p-6 rounded-xl glass-card group hover:glow-amber transition-shadow duration-300"
    >
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-primary/50 rounded-tl-xl" />
      <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-primary/50 rounded-tr-xl" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-primary/50 rounded-bl-xl" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-primary/50 rounded-br-xl" />

      <div className="text-center">
        <div className={`gauge-number text-4xl md:text-5xl lg:text-6xl font-bold ${colorClass}`}>
          {prefix}
          <motion.span>{display}</motion.span>
          {suffix}
        </div>
        <div className="mt-3 text-sm font-medium text-foreground tracking-wide uppercase">
          {label}
        </div>
        {subLabel && (
          <div className="mt-1 text-xs text-muted-foreground">
            {subLabel}
          </div>
        )}
      </div>

      {/* Animated pulse indicator */}
      <div className="absolute -top-1 -right-1">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
        </span>
      </div>
    </motion.div>
  );
}

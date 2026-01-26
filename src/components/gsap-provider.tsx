"use client";

import { useEffect, useLayoutEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Use useLayoutEffect on client, useEffect on server
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface GSAPProviderProps {
  children: ReactNode;
}

export function GSAPProvider({ children }: GSAPProviderProps) {
  const contextRef = useRef<gsap.Context | null>(null);

  useIsomorphicLayoutEffect(() => {
    // Create GSAP context for cleanup
    contextRef.current = gsap.context(() => {});

    // Set default ease
    gsap.defaults({
      ease: "power2.out",
      duration: 0.8,
    });

    // Refresh ScrollTrigger on resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      contextRef.current?.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return <>{children}</>;
}

// Export GSAP utilities for use in components
export { gsap, ScrollTrigger };

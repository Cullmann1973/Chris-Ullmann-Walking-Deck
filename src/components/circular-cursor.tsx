"use client";

import { useEffect, useRef, useState } from "react";

interface CircularCursorProps {
  text?: string;
  size?: number;
}

export function CircularCursor({
  text = "PEOPLE FIRST · AI POWERED · TRANSFORM · ",
  size = 80,
}: CircularCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -200, y: -200 });
  const targetRef = useRef({ x: -200, y: -200 });
  const rafRef = useRef<number>(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      posRef.current.x = lerp(posRef.current.x, targetRef.current.x, 0.12);
      posRef.current.y = lerp(posRef.current.y, targetRef.current.y, 0.12);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${posRef.current.x - size / 2}px, ${posRef.current.y - size / 2}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    rafRef.current = requestAnimationFrame(animate);

    // Hide default cursor
    document.body.style.cursor = "none";

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(rafRef.current);
      document.body.style.cursor = "";
    };
  }, [visible, size]);

  const repeatedText = text.repeat(2);
  const isVisible = visible;

  return (
    <div
      ref={cursorRef}
      className="circular-cursor"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: size,
        height: size,
        pointerEvents: "none",
        zIndex: 99999,
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.5s ease",
        willChange: "transform",
      }}
    >
      {/* Inner circle with CU initials */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: size * 0.38,
          height: size * 0.38,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          backgroundColor: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-playfair), serif",
            fontSize: size * 0.14,
            fontWeight: 700,
            color: "#0a0a0a",
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          C
        </span>
        <span
          style={{
            fontFamily: "var(--font-playfair), serif",
            fontSize: size * 0.14,
            fontWeight: 700,
            color: "#00bcd4",
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          U
        </span>
      </div>

      {/* Spinning text ring */}
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="animate-spin-slow"
      >
        <defs>
          <path
            id="circlePath"
            d={`M ${size / 2}, ${size / 2} m -${size * 0.4}, 0 a ${size * 0.4},${size * 0.4} 0 1,1 ${size * 0.8},0 a ${size * 0.4},${size * 0.4} 0 1,1 -${size * 0.8},0`}
          />
        </defs>
        <text
          fill="#fff"
          fontSize={size * 0.09}
          fontFamily="var(--font-inter), sans-serif"
          letterSpacing="0.15em"
          style={{ textTransform: "uppercase" }}
        >
          <textPath href="#circlePath" startOffset="0%">
            {repeatedText}
          </textPath>
        </text>
      </svg>
    </div>
  );
}

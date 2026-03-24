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
  const ringRef = useRef<SVGSVGElement>(null);
  const posRef = useRef({ x: -200, y: -200 });
  const targetRef = useRef({ x: -200, y: -200 });
  const prevTargetRef = useRef({ x: -200, y: -200 });
  const rafRef = useRef<number>(0);
  const spinRef = useRef({ velocity: 0, angle: 0 });
  const [visible, setVisible] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pointing, setPointing] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    const interactiveSelector =
      "a, button, [role='button'], input, textarea, select, [onclick], label[for], .cursor-focus";

    const pointerSelector = "";

    const handleOverInteractive = () => setFocused(true);
    const handleOutInteractive = () => { setFocused(false); setPointing(false); };
    const handleOverPointer = () => setPointing(true);
    const handleOutPointer = () => setPointing(false);

    const attachListeners = () => {
      document.querySelectorAll(interactiveSelector).forEach((el) => {
        el.addEventListener("mouseenter", handleOverInteractive);
        el.addEventListener("mouseleave", handleOutInteractive);
      });
      document.querySelectorAll(pointerSelector).forEach((el) => {
        el.addEventListener("mouseenter", handleOverPointer);
        el.addEventListener("mouseleave", handleOutPointer);
      });
    };

    attachListeners();
    const observer = new MutationObserver(() => attachListeners());
    observer.observe(document.body, { childList: true, subtree: true });

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      // Smooth cursor position
      posRef.current.x = lerp(posRef.current.x, targetRef.current.x, 0.12);
      posRef.current.y = lerp(posRef.current.y, targetRef.current.y, 0.12);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${posRef.current.x - size / 2}px, ${posRef.current.y - size / 2}px)`;
      }

      // Calculate mouse speed from delta between frames
      const dx = targetRef.current.x - prevTargetRef.current.x;
      const dy = targetRef.current.y - prevTargetRef.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);
      prevTargetRef.current = { ...targetRef.current };

      // Map speed to spin velocity (capped)
      const targetVelocity = Math.min(speed * 0.8, 12);

      // Add speed to velocity (accumulate, don't set)
      if (targetVelocity > Math.abs(spinRef.current.velocity) * 0.5) {
        spinRef.current.velocity += targetVelocity * 0.3;
      }

      // Apply friction (inertia decay)
      spinRef.current.velocity *= 0.96;

      // Stop tiny movements
      if (Math.abs(spinRef.current.velocity) < 0.01) {
        spinRef.current.velocity = 0;
      }

      // Update angle
      spinRef.current.angle += spinRef.current.velocity;

      // Apply rotation to SVG ring
      if (ringRef.current) {
        ringRef.current.style.transform = `rotate(${spinRef.current.angle}deg)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    rafRef.current = requestAnimationFrame(animate);

    document.body.style.cursor = "none";

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
      document.querySelectorAll(interactiveSelector).forEach((el) => {
        el.removeEventListener("mouseenter", handleOverInteractive);
        el.removeEventListener("mouseleave", handleOutInteractive);
      });
      document.querySelectorAll(pointerSelector).forEach((el) => {
        el.removeEventListener("mouseenter", handleOverPointer);
        el.removeEventListener("mouseleave", handleOutPointer);
      });
      document.body.style.cursor = "";
    };
  }, [visible, size, focused]);

  const repeatedText = text.repeat(2);

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: size,
        height: size,
        pointerEvents: "none",
        zIndex: 99999,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.5s ease",
        willChange: "transform",
      }}
    >
      {/* Pointer arrow (visible on hover cards) */}
      {pointing && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
            transition: "opacity 0.2s ease",
          }}
        >
          <svg width="24" height="28" viewBox="0 0 24 28" fill="none">
            <path d="M5.5 1L5.5 21.5L10.5 16.5L15.5 25L18.5 23.5L13.5 14.5L20 13.5L5.5 1Z" fill="white" stroke="#0a0a0a" strokeWidth="1.5"/>
          </svg>
        </div>
      )}
      {/* Whole cursor scales down on focus, hides ring on pointing */}
      <div
        style={{
          width: size,
          height: size,
          transition: "transform 0.2s ease, opacity 0.2s ease",
          transform: focused && !pointing ? "scale(0.25)" : pointing ? "scale(0.6)" : "scale(1)",
          opacity: pointing ? 0 : 1,
          transformOrigin: "center center",
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

        {/* Text ring - rotation driven by mouse velocity */}
        <svg
          ref={ringRef}
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          style={{
            opacity: focused ? 0 : 1,
            transition: "opacity 0.2s ease",
            willChange: "transform",
          }}
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
    </div>
  );
}

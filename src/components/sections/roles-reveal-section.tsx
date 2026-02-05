"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../gsap-provider";

const roles = [
  { title: "Floor to Boardroom Fluency", align: "right" },
  { title: "Builds, Not Just Advises", align: "left" },
  { title: "Scales Through People", align: "center" },
  { title: "Translates Complexity", align: "right", highlight: true },
];

export function RolesRevealSection({ focus }: { focus?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !boxRef.current) return;

    const ctx = gsap.context(() => {
      // Pin the section while we reveal content
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%",
          scrub: 1,
          pin: true,
        },
      });

      // Reveal each role one by one
      roles.forEach((_, index) => {
        tl.fromTo(
          `.role-${index}`,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.15, ease: "none" },
          index * 0.12
        );
      });

      // Finally reveal the full paragraph
      tl.fromTo(
        ".roles-paragraph",
        { opacity: 0 },
        { opacity: 1, duration: 0.2, ease: "none" },
        0.7
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="roles"
      className="min-h-screen bg-dark flex items-center justify-center py-20 px-4"
    >
      <div
        ref={boxRef}
        className="bg-dark-alt border border-primary/30 rounded-lg p-6 md:p-8 lg:p-12 max-w-2xl w-full"
      >
        {/* Title */}
        <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground mb-8 md:mb-12">
          What Sets Me Apart
        </h3>

        {/* Roles - staggered positions */}
        <div className="space-y-4 md:space-y-6 mb-8 md:mb-12">
          {roles.map((role, index) => (
            <div
              key={role.title}
              className={`role-${index} opacity-0 ${
                role.align === "left"
                  ? "text-left"
                  : role.align === "right"
                  ? "text-right"
                  : "text-center"
              }`}
            >
              <span
                className={`text-xl md:text-2xl lg:text-3xl font-serif ${
                  role.highlight ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {role.title}
              </span>
            </div>
          ))}
        </div>

        {/* Full paragraph (reveals last) */}
        <div className="roles-paragraph opacity-0 text-sm md:text-base text-muted-foreground leading-relaxed">
          Results create trust. Trust opens doors to bigger challenges.
          That&apos;s not a career philosophy: it&apos;s a pattern you can trace
          through{" "}
          <span className="text-primary font-semibold">25 years of outcomes</span>.
        </div>
      </div>
    </section>
  );
}

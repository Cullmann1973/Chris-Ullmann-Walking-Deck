"use client";

import { useEffect, useRef } from "react";
import { gsap } from "../gsap-provider";
import { Mail, Linkedin, ArrowUp, FileDown } from "lucide-react";

export function ContactSection({ focus }: { focus?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const words = "I build things that work. Let's build something".split(" ");

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (textRef.current) {
        const wordElements = textRef.current.querySelectorAll(".word");
        gsap.from(wordElements, {
          y: 20,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
          },
        });
      }

      if (cardRef.current) {
        gsap.from(cardRef.current, {
          y: 40,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
          },
        });

        const options = cardRef.current.querySelectorAll(".contact-option");
        gsap.from(options, {
          y: 20,
          stagger: 0.15,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-[#0b0f19] text-[#adb5bd] overflow-hidden"
    >
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(212,168,67,0.04) 0%, transparent 50%)"
        }}
      />

      {/* Part 1: Centered Text */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
        <div ref={textRef} className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl md:text-6xl text-[#f8f9fa] leading-tight">
            {words.map((word, i) => (
              <span key={i} className="word inline-block mr-[0.25em]">
                {word}
              </span>
            ))}
            <span className="word inline-block text-primary">
              together.
            </span>
          </h2>
        </div>
      </div>

      {/* Part 2: Glassmorphism Card */}
      <div className="relative z-10 px-6 pb-24">
        <div 
          ref={cardRef}
          className="max-w-2xl mx-auto rounded-2xl border border-primary/25 bg-[rgba(30,36,50,0.6)] backdrop-blur-xl p-8 md:p-12 shadow-2xl"
        >
          <div className="w-16 h-[2px] bg-primary mx-auto mb-10" />
          
          <div className="space-y-4 flex flex-col items-center">
            <a
              href="mailto:c.ullmann@yahoo.com"
              className="contact-option group flex items-center justify-between w-full max-w-sm gap-4 p-4 rounded-xl hover:bg-white/10 transition-all duration-300 cursor-pointer text-[#f8f9fa]"
            >
              <div className="flex items-center gap-4">
                <Mail className="w-5 h-5 group-hover:text-primary transition-colors duration-300" />
                <span className="font-medium group-hover:text-primary transition-colors duration-300">
                  Email Me
                </span>
              </div>
            </a>
            
            <a
              href="https://www.linkedin.com/in/chrisullmann/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-option group flex items-center justify-between w-full max-w-sm gap-4 p-4 rounded-xl hover:bg-white/10 transition-all duration-300 cursor-pointer text-[#f8f9fa]"
            >
              <div className="flex items-center gap-4">
                <Linkedin className="w-5 h-5 group-hover:text-primary transition-colors duration-300" />
                <span className="font-medium group-hover:text-primary transition-colors duration-300">
                  LinkedIn
                </span>
              </div>
            </a>
            
            <a
              href="/Chris-Ullmann-Resume.pdf"
              download
              className="contact-option group flex items-center justify-between w-full max-w-sm gap-4 p-4 rounded-xl hover:bg-white/10 transition-all duration-300 cursor-pointer text-[#f8f9fa]"
            >
              <div className="flex items-center gap-4">
                <FileDown className="w-5 h-5 group-hover:text-primary transition-colors duration-300" />
                <span className="font-medium group-hover:text-primary transition-colors duration-300">
                  Resume
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Part 3: Footer */}
      <div className="relative z-10 pb-12 px-6 text-center">
        <div className="flex flex-col items-center justify-center gap-6 text-sm text-[#adb5bd]">
          <div className="font-medium tracking-wide">
            Christopher Ullmann | Strategy & Transformation
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 hover:text-primary transition-colors duration-300 group font-medium"
          >
            Back to top
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
          </button>
        </div>
        
        <div className="text-[10px] font-mono text-[#868e96] uppercase tracking-wider mt-16 opacity-70">
          Built with Next.js, GSAP, and AI
        </div>
      </div>
    </section>
  );
}

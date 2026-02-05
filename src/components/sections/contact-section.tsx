"use client";

import { useEffect, useRef } from "react";
import { gsap } from "../gsap-provider";
import { Mail, Linkedin, ArrowUp } from "lucide-react";

export function ContactSection({ focus }: { focus?: string }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-content",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
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
      className="bg-dark-alt border-t border-border"
    >
      <div className="section-padding">
        <div className="max-w-4xl mx-auto">
          <div className="contact-content text-center">
            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
              Let&apos;s Connect
            </h2>
            <p className="text-muted-foreground mb-10 max-w-md mx-auto">
              Looking for a transformation leader who understands both the
              boardroom and the production floor?
            </p>

            {/* Contact links */}
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 mb-16">
              <a
                href="mailto:c.ullmann@yahoo.com"
                className="btn-primary inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
                c.ullmann@yahoo.com
              </a>
              <a
                href="https://www.linkedin.com/in/chrisullmann/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl border-2 border-border text-foreground font-medium hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
                LinkedIn
              </a>
            </div>

            {/* Divider */}
            <div className="section-divider mb-10" />

            {/* Footer */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground">
              <div>
                <span className="font-serif text-foreground">
                  Christopher Ullmann
                </span>
                <span className="mx-2">|</span>
                Strategy & Transformation
              </div>

              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                Back to top
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

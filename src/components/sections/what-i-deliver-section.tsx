"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "../gsap-provider";
import {
  Boxes,
  ShieldCheck,
  UsersRound,
  Bot,
  Workflow,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

interface Capability {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  image: string;
}

const capabilities: Capability[] = [
  {
    title: "Opportunity Assessment & Roadmapping",
    description: "I assess where AI creates real value, identify integration points across existing systems, and build roadmaps that connect business needs to technical solutions. Same methodology proven across manufacturing, supply chain, and enterprise platforms.",
    icon: TrendingUp,
    gradient: "from-blue-600 to-indigo-900",
    image: "/carousel/business-case.png",
  },
  {
    title: "Governance That Accelerates",
    description: "Legal, Privacy, and Compliance engaged before the first tool deploys. I build frameworks that let teams move faster, not slower. When you start with governance, scaling doesn't stall.",
    icon: ShieldCheck,
    gradient: "from-teal-500 to-emerald-900",
    image: "/carousel/governance.png",
  },
  {
    title: "Adoption at Scale",
    description: "Training programs that grow champions, not mandates. Peer-led adoption where people use AI because it solves their actual problems. 37x growth in active users through structured enablement, not top-down rollouts.",
    icon: UsersRound,
    gradient: "from-cyan-500 to-blue-900",
    image: "/carousel/agentic-ai.png",
  },
  {
    title: "From PoC to Production",
    description: "I take AI from prototype to enterprise scale. Build the proof of concept, validate with users, then partner with engineering teams to deploy. Clear ownership, clear outcomes, concept through delivery.",
    icon: Workflow,
    gradient: "from-indigo-500 to-purple-900",
    image: "/carousel/architecture.png",
  },
  {
    title: "Community of Practice at Scale",
    description: "3 members to 100+, one department to company-wide. Organic growth driven by tools worth using. Kotter methodology applied to enterprise AI adoption. The model scales to any function.",
    icon: UsersRound,
    gradient: "from-sky-500 to-indigo-900",
    image: "/carousel/community.png",
  },
  {
    title: "Change Management Methodology",
    description: "Kotter 8-step methodology in practice: Assessment, Urgency, Coalition, Vision, Enablement, Wins, Acceleration, Institutionalization. The actual playbook used to activate 1,000+ people on AI.",
    icon: Boxes,
    gradient: "from-emerald-500 to-teal-900",
    image: "/carousel/training.png",
  },
];

const CARD_COUNT = 6;
const ANGLE_STEP = 360 / CARD_COUNT;

// Normalizes an angle to [-180, 180]
function normalizeAngle(angle: number) {
  let a = angle % 360;
  if (a < -180) a += 360;
  if (a > 180) a -= 360;
  return a;
}

export function WhatIDeliverSection({ focus }: { focus?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // State
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Animation & Drag state refs
  const state = useRef({
    angle: 0,
    velocity: 0,
    isDown: false,
    startX: 0,
    lastX: 0,
    rafId: 0,
    snapTween: null as gsap.core.Tween | null,
    radiusX: 0,
    radiusY: 0,
  });

  // Calculate dynamic radii based on window size
  const updateRadii = useCallback(() => {
    if (typeof window !== "undefined") {
      const vw = window.innerWidth;
      // Approx 40vw for Rx, 4vw for Ry. Max constraints for ultra-wide.
      state.current.radiusX = Math.min(vw * 0.4, 600);
      state.current.radiusY = Math.min(vw * 0.04, 50);
    }
  }, []);

  // Update card positions based on current global angle
  const renderCards = useCallback(() => {
    const { angle, radiusX, radiusY } = state.current;
    
    // Determine active index based on current angle
    const normalizedGlobal = normalizeAngle(angle);
    // Find the card whose local angle is closest to 0 (top/center)
    let closestIdx = 0;
    let minDist = Infinity;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      
      const cardBaseAngle = i * ANGLE_STEP;
      // Subtract global angle so dragging left (positive global angle)
      // moves cards counter-clockwise
      const currentAngle = normalizeAngle(cardBaseAngle - angle);
      
      if (Math.abs(currentAngle) < minDist) {
        minDist = Math.abs(currentAngle);
        closestIdx = i;
      }

      // Convert angle to radians for math
      const rad = currentAngle * (Math.PI / 180);
      
      // Calculate transforms
      const tx = radiusX * Math.sin(rad);
      const ty = radiusY * (1 - Math.cos(rad));
      
      // Scale: 1 at center (0 rad), smaller at edges
      const scale = 0.7 + 0.3 * Math.cos(rad);
      
      // Z-index based on scale/position
      const zIndex = Math.round(scale * 100);

      gsap.set(card, {
        x: tx,
        y: ty,
        xPercent: -50,
        yPercent: -50,
        rotationZ: currentAngle * 0.15,
        scale: scale,
        zIndex: zIndex,
        opacity: scale > 0.75 ? 1 : (scale - 0.4) * 2, // Fade out cards far in the back
      });
    });

    setActiveCardIndex(closestIdx);
  }, []);

  // Main animation loop
  const tick = useCallback(() => {
    if (!state.current.isDown) {
      // Apply inertia
      state.current.angle += state.current.velocity;
      state.current.velocity *= 0.95; // Friction

      if (Math.abs(state.current.velocity) < 0.1) {
        state.current.velocity = 0;
        
        // Snap to nearest card if not already snapping
        if (!state.current.snapTween) {
          const remainder = state.current.angle % ANGLE_STEP;
          let snapAngle = state.current.angle - remainder;
          if (remainder > ANGLE_STEP / 2) snapAngle += ANGLE_STEP;
          else if (remainder < -ANGLE_STEP / 2) snapAngle -= ANGLE_STEP;

          if (Math.abs(state.current.angle - snapAngle) > 0.1) {
            state.current.snapTween = gsap.to(state.current, {
              angle: snapAngle,
              duration: 0.4,
              ease: "power2.out",
              onUpdate: renderCards,
              onComplete: () => {
                state.current.snapTween = null;
              }
            });
            return; // let tween handle render
          }
        }
      }
    }

    renderCards();
    
    if (state.current.isDown || Math.abs(state.current.velocity) >= 0.1) {
      state.current.rafId = requestAnimationFrame(tick);
    }
  }, [renderCards]);

  // Pointer Events
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (state.current.snapTween) {
      state.current.snapTween.kill();
      state.current.snapTween = null;
    }
    if (state.current.rafId) {
      cancelAnimationFrame(state.current.rafId);
    }
    
    state.current.isDown = true;
    setIsDragging(true);
    state.current.startX = e.clientX;
    state.current.lastX = e.clientX;
    state.current.velocity = 0;
    
    // Ensure capture
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!state.current.isDown) return;
    
    const deltaX = e.clientX - state.current.lastX;
    state.current.lastX = e.clientX;
    
    // Map pixels to degrees (sensitivity factor)
    const angleDelta = deltaX * 0.2;
    state.current.angle -= angleDelta; // Drag left -> cards rotate CCW
    
    // Estimate velocity for inertia
    state.current.velocity = -angleDelta;
    
    renderCards();
  }, [renderCards]);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    state.current.isDown = false;
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    
    // Start inertia loop
    state.current.rafId = requestAnimationFrame(tick);
  }, [tick]);

  // Initialization & Resize
  useEffect(() => {
    updateRadii();
    renderCards();

    const handleResize = () => {
      updateRadii();
      renderCards();
    };

    window.addEventListener("resize", handleResize);

    // Initial entrance animation
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".deliver-title",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "top 55%",
            scrub: 1.5,
          },
        }
      );
      
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }
        }
      )
    }, sectionRef);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (state.current.rafId) cancelAnimationFrame(state.current.rafId);
      if (state.current.snapTween) state.current.snapTween.kill();
      ctx.revert();
    };
  }, [updateRadii, renderCards]);

  return (
    <section ref={sectionRef} id="what-i-deliver" className="bg-dark relative overflow-hidden">
      <div className="pt-16 pb-4 md:pt-24 md:pb-8">
        <div className="max-w-6xl mx-auto px-6 md:px-8 xl:px-0">
          <div className="deliver-title mb-8 max-w-4xl relative z-10">
            <span className="text-xs font-mono tracking-wider text-[#ced4da] uppercase">
              Capabilities
            </span>
            <h2 className="text-section font-serif text-foreground mt-4">
              What I Deliver
            </h2>
            <p className="text-[#ced4da] mt-4">
              I assess the opportunity, build the case, and scale adoption through people.
            </p>
          </div>
        </div>

        {/* Carousel Area */}
        <div className="w-full relative select-none" style={{ touchAction: 'none' }}>
          
          {/* Arc Container */}
          <div 
            ref={containerRef}
            className={`relative mx-auto w-full h-[350px] md:h-[420px] flex items-center justify-center ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            {/* Cards */}
            {capabilities.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  ref={(el) => { cardsRef.current[i] = el; }}
                  className="absolute w-[260px] h-[320px] md:w-[300px] md:h-[380px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl origin-bottom"
                  style={{ 
                    transformStyle: 'preserve-3d',
                    left: '50%',
                    top: '50%',
                  }}
                >
                  
                  {/* Card Image */}
                  <Image src={item.image} alt={item.title} fill className={`object-cover transition-all duration-500 ${activeCardIndex === i ? 'opacity-90' : 'text-[#ced4da] mix-blend-overlay'}`} />
                  <div className={`absolute inset-0 transition-all duration-500 ${activeCardIndex === i ? 'bg-dark-alt/10' : 'bg-dark-alt/40 backdrop-blur-[3px]'}`} />
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                    <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    
                    <div className="mt-auto pt-16 bg-gradient-to-t from-dark-alt via-dark-alt/80 to-transparent -mx-6 -mb-6 p-6">
                      <h3 className="text-xl md:text-2xl font-serif text-white leading-tight">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Label Crossfade Area */}
          <div className="max-w-3xl mx-auto px-6 text-center h-24 relative mt-4 md:mt-8 pointer-events-none">
            {capabilities.map((item, i) => (
              <div 
                key={`label-${i}`}
                className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${activeCardIndex === i ? 'opacity-100' : 'opacity-0'}`}
              >
                <h4 className="text-lg md:text-xl font-medium text-foreground mb-3">{item.title}</h4>
                <p className="text-sm md:text-base text-[#ced4da] max-w-2xl mx-auto leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

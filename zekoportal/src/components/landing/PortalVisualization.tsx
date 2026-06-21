"use client";

import React, { useEffect, useRef } from "react";
import {
  Send,
  Layers,
  LayoutDashboard,
  CheckCircle2,
  Truck,
} from "lucide-react";

const steps = [
  {
    icon: Send,
    label: "Client Request",
    description: "Submit briefs & assets",
    color: "text-sky-400",
    bg: "bg-sky-500/10",
    border: "border-sky-500/30",
  },
  {
    icon: Layers,
    label: "Portal Core",
    description: "Centralise & organise",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/30",
    highlight: true,
  },
  {
    icon: LayoutDashboard,
    label: "Team Dashboard",
    description: "Assign & track work",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/30",
  },
  {
    icon: CheckCircle2,
    label: "Approval",
    description: "Review & approve",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
  },
  {
    icon: Truck,
    label: "Delivery",
    description: "Ship & archive",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
  },
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

export default function PortalVisualization() {
  const revealRef = useReveal();

  return (
    <section id="demo" className="py-24 md:py-32 relative overflow-hidden">
      <div className="glow-orb w-[500px] h-[500px] bg-primary/5 top-[20%] left-[-10%] absolute" />

      <div ref={revealRef} className="reveal max-w-6xl mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <p className="text-[11px] font-semibold text-primary uppercase tracking-widest mb-3">
            How it works
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            One portal, every workflow
          </h2>
          <p className="text-[#A1A1AA] text-base md:text-lg max-w-xl mx-auto">
            From request to delivery — your entire client workflow flows through
            a single connected system.
          </p>
        </div>

        {/* Desktop: horizontal flow */}
        <div className="hidden md:flex items-center justify-between relative">
          {/* Connecting line */}
          <div className="absolute top-1/2 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#27272A] to-transparent -translate-y-1/2 z-0" />

          {/* Flowing dots */}
          <div className="absolute top-1/2 left-[10%] right-[10%] h-px -translate-y-1/2 z-[1] overflow-hidden">
            <div
              className="absolute h-1 w-6 rounded-full bg-primary/60"
              style={{
                animation: "flowHorizontal 4s linear infinite",
              }}
            />
            <div
              className="absolute h-1 w-6 rounded-full bg-cyan-400/40"
              style={{
                animation: "flowHorizontal 4s linear infinite 2s",
              }}
            />
          </div>

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.label}
                className="relative z-10 flex flex-col items-center text-center w-[18%]"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div
                  className={`h-16 w-16 rounded-2xl border ${step.border} ${step.bg} flex items-center justify-center mb-4 transition-all duration-300 hover:scale-110 ${
                    step.highlight ? "animate-pulse-node" : ""
                  }`}
                >
                  <Icon className={`h-7 w-7 ${step.color}`} />
                </div>
                <h3 className="text-sm font-semibold text-white mb-1">
                  {step.label}
                </h3>
                <p className="text-[11px] text-[#71717A] leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Mobile: vertical flow */}
        <div className="flex flex-col md:hidden items-center gap-0">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <React.Fragment key={step.label}>
                <div className="flex items-center gap-4 w-full max-w-xs">
                  <div
                    className={`h-12 w-12 shrink-0 rounded-xl border ${step.border} ${step.bg} flex items-center justify-center transition-all ${
                      step.highlight ? "animate-pulse-node" : ""
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${step.color}`} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      {step.label}
                    </h3>
                    <p className="text-[11px] text-[#71717A]">
                      {step.description}
                    </p>
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <div className="w-px h-8 bg-[#27272A] ml-6 relative overflow-hidden">
                    <div
                      className="absolute w-px h-3 bg-primary/50 left-0"
                      style={{
                        animation: "flowVertical 2s linear infinite",
                        animationDelay: `${i * 0.4}s`,
                      }}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Inline keyframes for flow animations */}
      <style jsx>{`
        @keyframes flowHorizontal {
          0% { left: -5%; }
          100% { left: 105%; }
        }
        @keyframes flowVertical {
          0% { top: -20%; }
          100% { top: 120%; }
        }
      `}</style>
    </section>
  );
}

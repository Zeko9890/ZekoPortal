"use client";

import React, { useEffect, useRef } from "react";

const testimonials = [
  {
    initials: "SC",
    name: "Sarah Connor",
    role: "Product Director",
    company: "Skynet Solutions",
    quote:
      "ZekoPortal completely transformed how we collaborate with our agency. We went from weekly status emails to real-time visibility across every project.",
    bgColor: "bg-sky-500/15",
    borderColor: "border-sky-500/30",
  },
  {
    initials: "JK",
    name: "James Kirk",
    role: "VP Engineering",
    company: "Enterprise Corp",
    quote:
      "The approval workflow alone saved us 12 hours per week. Our team ships faster and clients are happier — it's a win across the board.",
    bgColor: "bg-emerald-500/15",
    borderColor: "border-emerald-500/30",
  },
  {
    initials: "AR",
    name: "Alex Rivera",
    role: "Design Lead",
    company: "Creative Studio",
    quote:
      "I've used every project management tool out there. ZekoPortal is the first one that actually feels built for agency-client relationships.",
    bgColor: "bg-primary/15",
    borderColor: "border-primary/30",
  },
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add("visible");
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

export default function Testimonials() {
  const revealRef = useReveal();

  return (
    <section id="testimonials" className="py-24 md:py-32 relative">
      <div ref={revealRef} className="reveal max-w-6xl mx-auto px-5 md:px-8">
        <div className="text-center mb-14">
          <p className="text-[11px] font-semibold text-primary uppercase tracking-widest mb-3">
            Testimonials
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Loved by teams worldwide
          </h2>
          <p className="text-[#A1A1AA] text-base md:text-lg max-w-xl mx-auto">
            See what teams are saying about working through ZekoPortal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-xl border border-[#27272A] bg-[#111827] p-6 hover:border-[#3F3F46] transition-all duration-200 flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4 text-amber-400 text-xs">
                {"★★★★★"}
              </div>

              <p className="text-[13px] text-[#D4D4D8] leading-relaxed flex-1 mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-[#1F2937]">
                <div
                  className={`h-9 w-9 rounded-full ${t.bgColor} border ${t.borderColor} flex items-center justify-center font-bold text-[10px] text-white`}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-white">
                    {t.name}
                  </p>
                  <p className="text-[10px] text-[#71717A]">
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

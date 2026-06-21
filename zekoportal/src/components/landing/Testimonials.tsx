"use client";

import React, { useEffect, useRef } from "react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Product Lead",
    company: "Acme Design",
    avatar: "SC",
    avatarBg: "bg-blue-500/20 text-blue-300",
    quote:
      "We replaced three different tools with ZekoPortal. Our clients love the transparency and we've cut status meeting time in half.",
  },
  {
    name: "James Park",
    role: "Engineering Manager",
    company: "Globex Tech",
    avatar: "JP",
    avatarBg: "bg-emerald-500/20 text-emerald-300",
    quote:
      "The approval workflows alone saved us 10+ hours a week. Everything is tracked, timestamped, and accountable. Exactly what we needed.",
  },
  {
    name: "Maya Rodriguez",
    role: "Agency Director",
    company: "Creative Studio",
    avatar: "MR",
    avatarBg: "bg-violet-500/20 text-violet-300",
    quote:
      "Our clients used to email us constantly for updates. Now they log into ZekoPortal and see everything. It's changed how we run projects.",
  },
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
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
    <section id="testimonials" className="py-20 md:py-28 relative">
      <div ref={revealRef} className="reveal max-w-5xl mx-auto px-5 md:px-8">
        <div className="text-center mb-12">
          <p className="text-[11px] font-semibold text-blue-400/70 uppercase tracking-widest mb-3">
            Testimonials
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-3">
            Teams love working in ZekoPortal
          </h2>
          <p className="text-[14px] text-white/40 max-w-lg mx-auto">
            Hear from the teams who&apos;ve made it their daily workspace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-xl bg-white/[0.02] border border-white/[0.05] p-5 hover:bg-white/[0.035] hover:border-white/[0.08] transition-all duration-200 flex flex-col"
            >
              {/* Quote */}
              <p className="text-[12px] text-white/50 leading-relaxed flex-1 mb-5">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-2.5 pt-4 border-t border-white/[0.04]">
                <div
                  className={`h-8 w-8 rounded-full ${t.avatarBg} flex items-center justify-center font-bold text-[10px]`}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-white/75">
                    {t.name}
                  </p>
                  <p className="text-[10px] text-white/25">
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

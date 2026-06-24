"use client";

import React, { useEffect, useRef } from "react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "VP Engineering",
    company: "Acme Corp",
    avatar: "SC",
    quote: "ZekoPortal replaced Jira, Slack, and our scattered Google Docs. The density of information and speed of the UI is unmatched.",
  },
  {
    name: "James Park",
    role: "Director of Product",
    company: "Globex",
    avatar: "JP",
    quote: "We don't do status meetings anymore. Clients log in, approve the work, and we ship. It's fundamentally changed our velocity.",
  },
  {
    name: "Maya Rodriguez",
    role: "Agency Lead",
    company: "Studio X",
    avatar: "MR",
    quote: "The visual automations alone are worth the price. When a file is uploaded, the exact right people are notified instantly.",
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
    <section id="testimonials" className="py-20 bg-muted/50 relative">
      <div ref={revealRef} className="reveal max-w-6xl mx-auto px-5 md:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-2">
              Built for top-tier teams.
            </h2>
            <p className="text-[14px] text-muted-foreground max-w-md font-medium">
              Don't take our word for it. Here's what engineering and product leads say.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="glass-panel bg-card rounded-xl border-border p-6 flex flex-col relative overflow-hidden group hover:border-border transition-colors shadow-sm"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-foreground"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
              </div>

              <p className="text-[13px] text-gray-700 leading-relaxed flex-1 mb-6 font-medium relative z-10">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3 relative z-10">
                <div className="h-8 w-8 rounded-[6px] bg-muted flex items-center justify-center font-bold text-[10px] text-foreground">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-[11px] font-bold text-foreground">
                    {t.name}
                  </p>
                  <p className="text-[10px] text-muted-foreground font-medium">
                    {t.role} @ {t.company}
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

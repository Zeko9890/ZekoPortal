"use client";

import React, { useEffect, useRef, useState } from "react";

const stats = [
  { value: 10000, suffix: "+", label: "Projects Delivered" },
  { value: 99.9, suffix: "%", label: "Uptime SLA", decimals: 1 },
  { value: 500, suffix: "+", label: "Teams Active" },
  { value: 4.9, suffix: "★", label: "Average Rating", decimals: 1 },
];

function AnimatedNumber({
  target,
  suffix,
  decimals = 0,
  active,
}: {
  target: number;
  suffix: string;
  decimals?: number;
  active: boolean;
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!active) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let frame = 0;
    const timer = setInterval(() => {
      frame++;
      if (frame >= steps) {
        setCurrent(target);
        clearInterval(timer);
      } else {
        setCurrent(Math.min(increment * frame, target));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [active, target]);

  const display = decimals > 0 ? current.toFixed(decimals) : Math.floor(current).toLocaleString();

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
}

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          el.classList.add("visible");
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 md:py-20 border-y border-[#27272A] bg-[#111827]/30 relative overflow-hidden">
      <div className="glow-orb w-[400px] h-[400px] bg-primary/4 top-[-30%] right-[20%] absolute" />
      <div
        ref={ref}
        className="reveal max-w-5xl mx-auto px-5 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4"
      >
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-1">
              <AnimatedNumber
                target={stat.value}
                suffix={stat.suffix}
                decimals={stat.decimals}
                active={active}
              />
            </div>
            <p className="text-[11px] font-medium text-[#71717A] uppercase tracking-wider">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

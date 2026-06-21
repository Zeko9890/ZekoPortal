"use client";

import React, { useEffect, useRef, useState } from "react";

const stats = [
  { value: 10000, suffix: "+", label: "Projects Delivered" },
  { value: 99.9, suffix: "%", label: "Uptime Guarantee", decimals: 1 },
  { value: 500, suffix: "+", label: "Teams Active" },
  { value: 4.9, suffix: "/5", label: "Average Rating", decimals: 1 },
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
    const duration = 1800;
    const steps = 50;
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

  const display =
    decimals > 0
      ? current.toFixed(decimals)
      : Math.floor(current).toLocaleString();

  return (
    <span>
      {display}
      <span className="text-blue-500">{suffix}</span>
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
    <section className="py-12 bg-black border-y border-white/5 relative">
      <div
        ref={ref}
        className="reveal max-w-5xl mx-auto px-5 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-8"
      >
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-3xl md:text-4xl font-bold tracking-tight mb-1 text-white">
              <AnimatedNumber
                target={stat.value}
                suffix={stat.suffix}
                decimals={stat.decimals}
                active={active}
              />
            </div>
            <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

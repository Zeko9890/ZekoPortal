"use client";

import React, { useEffect, useRef, useState } from "react";

const stats = [
  { value: 10000, suffix: "+", label: "Projects delivered" },
  { value: 99.9, suffix: "%", label: "Uptime guarantee", decimals: 1 },
  { value: 500, suffix: "+", label: "Teams collaborating" },
  { value: 4.9, suffix: "/5", label: "Average rating", decimals: 1 },
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
    <section className="py-14 md:py-16 border-y border-white/[0.04] relative">
      <div
        ref={ref}
        className="reveal max-w-4xl mx-auto px-5 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4"
      >
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-1">
              <AnimatedNumber
                target={stat.value}
                suffix={stat.suffix}
                decimals={stat.decimals}
                active={active}
              />
            </div>
            <p className="text-[11px] font-medium text-white/25">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

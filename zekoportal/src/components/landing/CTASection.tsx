"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

export default function CTASection() {
  const revealRef = useReveal();

  return (
    <section className="py-24 md:py-32 bg-background relative border-y border-border overflow-hidden transition-colors duration-500">
      <div className="absolute inset-0 bg-grid-dense opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background pointer-events-none z-10" />

      <div ref={revealRef} className="reveal max-w-2xl mx-auto px-5 md:px-8 text-center relative z-20">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
          Ready to build faster?
        </h2>
        <p className="text-[15px] text-muted-foreground max-w-md mx-auto mb-8 font-medium">
          Join the engineering and product teams who have already moved their workflows to ZekoPortal.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/signup"
            className="btn-interactive group flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-[13px] px-6 py-3 rounded-[6px] transition-colors duration-200"
          >
            Start Building
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="/login"
            className="btn-interactive text-[13px] font-bold text-muted-foreground hover:text-foreground px-6 py-3 rounded-[6px] border border-border hover:bg-muted transition-all duration-200"
          >
            Sign In
          </Link>
        </div>
      </div>
    </section>
  );
}

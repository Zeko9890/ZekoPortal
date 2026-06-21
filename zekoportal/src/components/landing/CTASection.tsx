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
    <section className="py-24 md:py-32 bg-black relative border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-grid-dense opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none z-10" />

      <div ref={revealRef} className="reveal max-w-2xl mx-auto px-5 md:px-8 text-center relative z-20">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
          Ready to build faster?
        </h2>
        <p className="text-[15px] text-white/40 max-w-md mx-auto mb-8 font-medium">
          Join the engineering and product teams who have already moved their workflows to ZekoPortal.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/signup"
            className="group flex items-center gap-2 bg-white hover:bg-white/90 text-black font-bold text-[13px] px-6 py-3 rounded-[6px] transition-all duration-200"
          >
            Start Building
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="/login"
            className="text-[13px] font-bold text-white/60 hover:text-white px-6 py-3 rounded-[6px] border border-white/10 hover:bg-white/5 transition-all duration-200"
          >
            Sign In
          </Link>
        </div>
      </div>
    </section>
  );
}

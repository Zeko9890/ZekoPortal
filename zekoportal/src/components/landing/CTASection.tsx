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
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add("visible");
      },
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
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="glow-orb w-[600px] h-[600px] bg-primary/6 top-[-20%] left-[30%] absolute" />
      <div className="glow-orb w-[300px] h-[300px] bg-cyan-500/5 bottom-[10%] right-[15%] absolute" />

      <div ref={revealRef} className="reveal max-w-3xl mx-auto px-5 md:px-8 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-5">
          Ready to streamline
          <br />
          <span className="text-gradient-blue">your client workflow?</span>
        </h2>
        <p className="text-[#A1A1AA] text-base md:text-lg max-w-lg mx-auto mb-10">
          Join hundreds of teams already using ZekoPortal to deliver projects
          faster, communicate better, and keep clients happy.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link
            href="/signup"
            className="group flex items-center gap-2 bg-primary hover:bg-[#0EA5E9] text-white font-semibold text-sm px-6 py-3 rounded-lg transition-all duration-200 shadow-lg shadow-primary/20"
          >
            Get Started Free
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="/login"
            className="text-[13px] font-medium text-[#A1A1AA] hover:text-white px-6 py-3 rounded-lg border border-[#27272A] hover:border-[#3F3F46] transition-all duration-200"
          >
            Log in to your portal
          </Link>
        </div>
      </div>
    </section>
  );
}

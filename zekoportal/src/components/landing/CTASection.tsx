"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";

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
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Gentle background gradient instead of glowing orbs */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-500/[0.02] via-transparent to-transparent pointer-events-none" />

      <div ref={revealRef} className="reveal max-w-2xl mx-auto px-5 md:px-8 text-center relative z-10">
        <div className="flex justify-center mb-5">
          <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
            <Users className="h-5 w-5 text-blue-400" />
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4">
          Better together.
          <br />
          <span className="text-white/35">Start building your workspace.</span>
        </h2>
        <p className="text-[14px] text-white/40 max-w-md mx-auto mb-8 leading-relaxed">
          Join 500+ teams who already manage their projects, communicate
          with clients, and ship work faster through ZekoPortal.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/signup"
            className="group flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium text-sm px-5 py-2.5 rounded-lg transition-all duration-200"
          >
            Get started free
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="/login"
            className="text-[13px] font-medium text-white/40 hover:text-white/60 px-5 py-2.5 rounded-lg border border-white/[0.06] hover:border-white/[0.1] transition-all duration-200"
          >
            Sign in to your workspace
          </Link>
        </div>
      </div>
    </section>
  );
}

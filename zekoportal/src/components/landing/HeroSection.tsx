"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background effects */}
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="glow-orb w-[600px] h-[600px] bg-primary/8 top-[-10%] left-[20%] absolute" />
      <div className="glow-orb w-[400px] h-[400px] bg-cyan-500/6 bottom-[10%] right-[10%] absolute" />

      <div className="relative z-10 max-w-5xl mx-auto px-5 md:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#27272A] bg-[#111827]/60 mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-[11px] font-medium text-[#A1A1AA] tracking-wide">
            Now in public beta
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] mb-6">
          The client portal
          <br />
          <span className="text-gradient-blue">your team deserves</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed mb-10">
          Track projects, collaborate in real time, and deliver work through
          a single connected workspace. Built for agencies, studios, and
          product teams.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link
            href="/signup"
            className="group flex items-center gap-2 bg-primary hover:bg-[#0EA5E9] text-white font-semibold text-sm px-6 py-3 rounded-lg transition-all duration-200 shadow-lg shadow-primary/20 hover:shadow-primary/30"
          >
            Start Free
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <a
            href="#demo"
            className="flex items-center gap-2 text-[#A1A1AA] hover:text-white font-medium text-sm px-6 py-3 rounded-lg border border-[#27272A] hover:border-[#3F3F46] bg-[#111827]/40 hover:bg-[#111827]/80 transition-all duration-200"
          >
            <Play className="h-3.5 w-3.5" />
            See Demo
          </a>
        </div>

        {/* Trust bar */}
        <div className="mt-16 md:mt-20 flex flex-col items-center gap-3">
          <p className="text-[11px] font-medium text-[#71717A] uppercase tracking-widest">
            Trusted by teams at
          </p>
          <div className="flex items-center gap-6 md:gap-10 flex-wrap justify-center">
            {["Skynet Corp", "Cyberdyne", "Wayne Tech", "Stark Labs", "Oscorp"].map(
              (name) => (
                <span
                  key={name}
                  className="text-sm font-semibold text-[#3F3F46] tracking-wide select-none"
                >
                  {name}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

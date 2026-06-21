"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Users, BarChart3, MessageSquare, CheckSquare, FolderKanban } from "lucide-react";

/* Fake dashboard mockup rendered inside the hero */
function DashboardMockup() {
  return (
    <div className="workspace-frame shadow-soft-lg">
      {/* Title bar */}
      <div className="workspace-frame-titlebar">
        <div className="workspace-frame-dot bg-[#FF5F57]" />
        <div className="workspace-frame-dot bg-[#FFBD2E]" />
        <div className="workspace-frame-dot bg-[#28C840]" />
        <span className="ml-3 text-[10px] text-white/25 font-medium select-none">
          ZekoPortal — Skynet Redesign
        </span>
      </div>

      {/* Dashboard body */}
      <div className="flex min-h-[240px] sm:min-h-[300px]">
        {/* Mini sidebar */}
        <div className="hidden sm:flex w-[52px] bg-[hsl(240_6%_8%)] border-r border-white/[0.04] flex-col items-center py-3 gap-3">
          <div className="h-6 w-6 rounded-md bg-blue-500/20 flex items-center justify-center">
            <FolderKanban className="h-3 w-3 text-blue-400" />
          </div>
          <div className="h-6 w-6 rounded-md bg-white/[0.04] flex items-center justify-center">
            <MessageSquare className="h-3 w-3 text-white/25" />
          </div>
          <div className="h-6 w-6 rounded-md bg-white/[0.04] flex items-center justify-center">
            <BarChart3 className="h-3 w-3 text-white/25" />
          </div>
          <div className="h-6 w-6 rounded-md bg-white/[0.04] flex items-center justify-center">
            <CheckSquare className="h-3 w-3 text-white/25" />
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 p-4 sm:p-5 space-y-4">
          {/* Top bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-white/80">Projects</span>
              <span className="text-[9px] text-white/25 font-medium bg-white/[0.04] px-1.5 py-0.5 rounded">3 active</span>
            </div>
            <div className="flex -space-x-1.5">
              <div className="h-5 w-5 rounded-full bg-blue-500/30 border border-[hsl(240_6%_10%)] text-[7px] font-bold text-blue-300 flex items-center justify-center">S</div>
              <div className="h-5 w-5 rounded-full bg-emerald-500/30 border border-[hsl(240_6%_10%)] text-[7px] font-bold text-emerald-300 flex items-center justify-center">J</div>
              <div className="h-5 w-5 rounded-full bg-violet-500/30 border border-[hsl(240_6%_10%)] text-[7px] font-bold text-violet-300 flex items-center justify-center">A</div>
            </div>
          </div>

          {/* Project rows */}
          <div className="space-y-2.5">
            {[
              { name: "Skynet Redesign", status: "In Progress", pct: 78, color: "bg-blue-400", statusColor: "text-blue-400 bg-blue-500/10" },
              { name: "Mobile App v2", status: "In Review", pct: 92, color: "bg-amber-400", statusColor: "text-amber-400 bg-amber-500/10" },
              { name: "API Documentation", status: "Active", pct: 45, color: "bg-emerald-400", statusColor: "text-emerald-400 bg-emerald-500/10" },
            ].map((p) => (
              <div key={p.name} className="flex items-center gap-3 bg-white/[0.02] rounded-lg px-3 py-2.5 border border-white/[0.04]">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[11px] font-medium text-white/80 truncate">{p.name}</span>
                    <span className={`text-[8px] font-semibold px-1.5 py-0.5 rounded-full ${p.statusColor}`}>{p.status}</span>
                  </div>
                  <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
                    <div className={`h-full rounded-full ${p.color} transition-all duration-700`} style={{ width: `${p.pct}%` }} />
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-white/40 shrink-0">{p.pct}%</span>
              </div>
            ))}
          </div>

          {/* Comment thread preview */}
          <div className="flex items-start gap-2 pt-1">
            <div className="h-5 w-5 rounded-full bg-violet-500/25 flex items-center justify-center text-[7px] font-bold text-violet-300 shrink-0 mt-0.5">A</div>
            <div className="bg-white/[0.03] rounded-lg rounded-tl-none px-3 py-1.5 border border-white/[0.04]">
              <span className="text-[10px] text-white/50">Updated wireframes for the dashboard. Ready for review! 🎨</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Subtle warm background — no harsh glow orbs */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/[0.03] via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-5 md:px-8">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06]">
            <Sparkles className="h-3 w-3 text-amber-400" />
            <span className="text-[11px] font-medium text-white/50">
              Your team&apos;s workspace, connected
            </span>
          </div>
        </div>

        {/* Headline — cleaner, product-focused */}
        <h1 className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold tracking-tight leading-[1.12] mb-5">
          <span className="text-white">Where teams manage</span>
          <br />
          <span className="text-gradient-warm">projects together</span>
        </h1>

        {/* Subtitle */}
        <p className="text-center text-[15px] sm:text-base md:text-lg text-white/45 max-w-xl mx-auto leading-relaxed mb-8">
          A collaborative workspace for agencies and teams. Track projects,
          share files, get approvals, and keep clients in the loop — all in
          one place.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14 md:mb-20">
          <Link
            href="/signup"
            className="group flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium text-sm px-5 py-2.5 rounded-lg transition-all duration-200"
          >
            <Users className="h-3.5 w-3.5" />
            Start collaborating — it&apos;s free
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <a
            href="#demo"
            className="flex items-center gap-2 text-white/45 hover:text-white/70 font-medium text-sm px-5 py-2.5 rounded-lg border border-white/[0.06] hover:border-white/[0.1] hover:bg-white/[0.02] transition-all duration-200"
          >
            See how it works
          </a>
        </div>

        {/* Product-first: Dashboard mockup */}
        <DashboardMockup />

        {/* Trust — simpler, friendlier */}
        <div className="mt-12 flex flex-col items-center gap-3">
          <p className="text-[11px] font-medium text-white/20 tracking-wide">
            Used by teams at
          </p>
          <div className="flex items-center gap-5 md:gap-8 flex-wrap justify-center">
            {["Acme Inc", "Globex", "Initech", "Massive Dynamic", "Pied Piper"].map(
              (name) => (
                <span
                  key={name}
                  className="text-[13px] font-medium text-white/15 select-none"
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

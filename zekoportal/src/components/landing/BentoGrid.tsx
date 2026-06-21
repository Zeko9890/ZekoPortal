"use client";

import React, { useEffect, useRef } from "react";
import {
  BarChart3,
  MessageSquare,
  FileUp,
  Target,
  CheckSquare,
  Users,
} from "lucide-react";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add("visible");
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

const features = [
  {
    icon: BarChart3,
    title: "Real-time Project Tracking",
    description:
      "Monitor every project phase with live dashboards. Progress bars, milestones, and timeline views update instantly across your entire team.",
    size: "large",
    color: "text-sky-400",
    mockup: (
      <div className="mt-4 space-y-2.5">
        {[
          { label: "Skynet Redesign", pct: 78, color: "bg-sky-400" },
          { label: "Mobile App v2", pct: 45, color: "bg-cyan-400" },
          { label: "API Integration", pct: 92, color: "bg-emerald-400" },
        ].map((p) => (
          <div key={p.label} className="space-y-1">
            <div className="flex justify-between text-[10px]">
              <span className="text-[#A1A1AA] font-medium">{p.label}</span>
              <span className="text-white font-semibold">{p.pct}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-[#1F2937] overflow-hidden">
              <div
                className={`h-full rounded-full ${p.color} transition-all duration-1000`}
                style={{ width: `${p.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: MessageSquare,
    title: "Team Messaging",
    description:
      "Threaded conversations per project. No more lost emails — every discussion lives next to the work.",
    size: "medium",
    color: "text-primary",
    mockup: (
      <div className="mt-4 space-y-2">
        <div className="flex gap-2 items-end">
          <div className="h-5 w-5 rounded-full bg-sky-500/20 border border-sky-500/30 shrink-0" />
          <div className="bg-[#1F2937] rounded-lg rounded-bl-none px-3 py-1.5 text-[10px] text-[#A1A1AA]">
            Updated the wireframes ✓
          </div>
        </div>
        <div className="flex gap-2 items-end justify-end">
          <div className="bg-primary/20 rounded-lg rounded-br-none px-3 py-1.5 text-[10px] text-sky-300">
            Looks great, approved!
          </div>
          <div className="h-5 w-5 rounded-full bg-emerald-500/20 border border-emerald-500/30 shrink-0" />
        </div>
      </div>
    ),
  },
  {
    icon: FileUp,
    title: "File Sharing",
    description: "Upload, version, and share deliverables in one place.",
    size: "small",
    color: "text-cyan-400",
  },
  {
    icon: Target,
    title: "Milestone Tracking",
    description: "Set goals, assign deadlines, and track every deliverable.",
    size: "small",
    color: "text-amber-400",
  },
  {
    icon: CheckSquare,
    title: "Client Approvals",
    description:
      "Built-in approval workflows so nothing ships without sign-off. Track pending, approved, and revision statuses at a glance.",
    size: "medium",
    color: "text-emerald-400",
    mockup: (
      <div className="mt-4 flex gap-2">
        {[
          { label: "Approved", count: 12, c: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25" },
          { label: "Pending", count: 3, c: "bg-amber-500/15 text-amber-400 border-amber-500/25" },
          { label: "Revision", count: 1, c: "bg-red-500/15 text-red-400 border-red-500/25" },
        ].map((s) => (
          <div
            key={s.label}
            className={`flex-1 rounded-lg border px-2.5 py-2 text-center ${s.c}`}
          >
            <div className="text-lg font-bold">{s.count}</div>
            <div className="text-[9px] font-medium uppercase tracking-wider">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: Users,
    title: "Team Workspace",
    description: "Invite unlimited team members. Role-based access control keeps everyone in their lane.",
    size: "small-wide",
    color: "text-violet-400",
  },
];

export default function BentoGrid() {
  const revealRef = useReveal();

  return (
    <section id="features" className="py-24 md:py-32 relative">
      <div ref={revealRef} className="reveal max-w-6xl mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[11px] font-semibold text-primary uppercase tracking-widest mb-3">
            Features
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Everything you need to deliver
          </h2>
          <p className="text-[#A1A1AA] text-base md:text-lg max-w-xl mx-auto">
            A purpose-built platform for managing client projects from kickoff
            to delivery.
          </p>
        </div>

        {/* Bento layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {features.map((f) => {
            const Icon = f.icon;
            const spanClass =
              f.size === "large"
                ? "md:col-span-2 md:row-span-1"
                : f.size === "small-wide"
                ? "md:col-span-2"
                : f.size === "medium"
                ? "md:col-span-1"
                : "md:col-span-1";

            return (
              <div
                key={f.title}
                className={`group rounded-xl border border-[#27272A] bg-[#111827] p-5 md:p-6 hover:border-[#3F3F46] hover:bg-[#111827]/90 transition-all duration-200 ${spanClass}`}
              >
                <div className="flex items-start gap-3 mb-2">
                  <div
                    className={`h-8 w-8 shrink-0 rounded-lg bg-[#1F2937] border border-[#27272A] flex items-center justify-center ${f.color}`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-white mb-1">
                      {f.title}
                    </h3>
                    <p className="text-[12px] text-[#71717A] leading-relaxed">
                      {f.description}
                    </p>
                  </div>
                </div>
                {f.mockup && f.mockup}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

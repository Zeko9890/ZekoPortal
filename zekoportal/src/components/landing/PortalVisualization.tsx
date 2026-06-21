"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  FolderKanban,
  MessageSquare,
  CheckCircle2,
  BarChart3,
  Users,
  ArrowRight,
} from "lucide-react";

const tabs = [
  {
    id: "projects",
    label: "Projects",
    icon: FolderKanban,
    content: {
      title: "Organize everything in one workspace",
      description:
        "Create projects, assign tasks, and track milestones. Every team member sees exactly what's happening.",
      mockup: (
        <div className="space-y-2">
          {[
            { name: "Brand Redesign", team: "Design", tasks: "12/18", color: "bg-blue-400" },
            { name: "API Integration", team: "Engineering", tasks: "8/10", color: "bg-emerald-400" },
            { name: "Launch Campaign", team: "Marketing", tasks: "5/14", color: "bg-violet-400" },
          ].map((p) => (
            <div key={p.name} className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
              <div className={`h-2 w-2 rounded-full ${p.color} shrink-0`} />
              <div className="flex-1 min-w-0">
                <span className="text-[11px] font-medium text-white/80 block truncate">{p.name}</span>
                <span className="text-[9px] text-white/30">{p.team}</span>
              </div>
              <span className="text-[10px] text-white/30 font-medium">{p.tasks} tasks</span>
            </div>
          ))}
        </div>
      ),
    },
  },
  {
    id: "chat",
    label: "Chat",
    icon: MessageSquare,
    content: {
      title: "Keep conversations next to the work",
      description:
        "Threaded messaging per project. Tag teammates, share files, and never lose context again.",
      mockup: (
        <div className="space-y-2.5">
          <div className="flex items-start gap-2">
            <div className="h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center text-[8px] font-bold text-blue-300 shrink-0">S</div>
            <div className="space-y-0.5">
              <div className="flex items-baseline gap-2">
                <span className="text-[10px] font-semibold text-white/60">Sarah</span>
                <span className="text-[8px] text-white/20">2 min ago</span>
              </div>
              <div className="bg-white/[0.03] rounded-lg rounded-tl-sm px-3 py-1.5 border border-white/[0.04] text-[10px] text-white/50 max-w-[85%]">
                Just uploaded the new wireframes for the dashboard. Check the files tab! 📎
              </div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="h-6 w-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-[8px] font-bold text-emerald-300 shrink-0">J</div>
            <div className="space-y-0.5">
              <div className="flex items-baseline gap-2">
                <span className="text-[10px] font-semibold text-white/60">James</span>
                <span className="text-[8px] text-white/20">1 min ago</span>
              </div>
              <div className="bg-white/[0.03] rounded-lg rounded-tl-sm px-3 py-1.5 border border-white/[0.04] text-[10px] text-white/50 max-w-[85%]">
                Looks great! Moving to review ✅
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
            <span className="text-[10px] text-white/20 flex-1">Type a message...</span>
            <ArrowRight className="h-3 w-3 text-white/15" />
          </div>
        </div>
      ),
    },
  },
  {
    id: "approvals",
    label: "Approvals",
    icon: CheckCircle2,
    content: {
      title: "Get sign-off without the back-and-forth",
      description:
        "Built-in approval workflows. Clients review, approve, or request changes — all tracked in one place.",
      mockup: (
        <div className="space-y-2">
          {[
            { item: "Homepage Design v3", status: "Approved", icon: "✅", bg: "bg-emerald-500/8 border-emerald-500/15" },
            { item: "Logo Concepts", status: "Pending Review", icon: "⏳", bg: "bg-amber-500/8 border-amber-500/15" },
            { item: "Mobile Wireframes", status: "Changes Requested", icon: "🔄", bg: "bg-blue-500/8 border-blue-500/15" },
          ].map((a) => (
            <div key={a.item} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border ${a.bg}`}>
              <span className="text-sm shrink-0">{a.icon}</span>
              <div className="flex-1 min-w-0">
                <span className="text-[11px] font-medium text-white/70 block truncate">{a.item}</span>
                <span className="text-[9px] text-white/30">{a.status}</span>
              </div>
            </div>
          ))}
        </div>
      ),
    },
  },
  {
    id: "analytics",
    label: "Insights",
    icon: BarChart3,
    content: {
      title: "See how your team is performing",
      description:
        "Track project velocity, team workload, and delivery timelines. Data-driven decisions, no guesswork.",
      mockup: (
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Delivered", val: "142", color: "text-emerald-400" },
              { label: "In Progress", val: "23", color: "text-blue-400" },
              { label: "Overdue", val: "2", color: "text-red-400" },
            ].map((m) => (
              <div key={m.label} className="text-center px-2 py-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                <div className={`text-lg font-bold ${m.color}`}>{m.val}</div>
                <div className="text-[8px] text-white/25 font-medium mt-0.5">{m.label}</div>
              </div>
            ))}
          </div>
          {/* Mini bar chart */}
          <div className="flex items-end gap-1.5 h-16 px-2">
            {[40, 65, 55, 80, 70, 90, 75, 85, 60, 95, 80, 70].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm bg-blue-500/20 hover:bg-blue-500/35 transition-colors"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between text-[8px] text-white/15 px-2">
            <span>Jan</span><span>Jun</span><span>Dec</span>
          </div>
        </div>
      ),
    },
  },
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

export default function PortalVisualization() {
  const [activeTab, setActiveTab] = useState("projects");
  const revealRef = useReveal();
  const active = tabs.find((t) => t.id === activeTab)!;

  return (
    <section id="demo" className="py-20 md:py-28 relative overflow-hidden">
      <div ref={revealRef} className="reveal max-w-5xl mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[11px] font-semibold text-blue-400/70 uppercase tracking-widest mb-3">
            How it works
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-3">
            Everything your team needs,
            <br className="hidden md:block" />
            <span className="text-white/40"> in one workspace</span>
          </h2>
        </div>

        {/* Interactive workspace demo */}
        <div className="workspace-frame shadow-soft-lg max-w-3xl mx-auto">
          {/* Title bar */}
          <div className="workspace-frame-titlebar">
            <div className="workspace-frame-dot bg-[#FF5F57]" />
            <div className="workspace-frame-dot bg-[#FFBD2E]" />
            <div className="workspace-frame-dot bg-[#28C840]" />
          </div>

          {/* Tab bar */}
          <div className="flex border-b border-white/[0.06] px-4 gap-0">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-2.5 text-[11px] font-medium transition-all cursor-pointer relative ${
                    activeTab === tab.id
                      ? "text-white/90 tab-active"
                      : "text-white/30 hover:text-white/50"
                  }`}
                >
                  <Icon className="h-3 w-3" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div className="p-5 sm:p-6 min-h-[280px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="space-y-3">
                <h3 className="text-[15px] font-semibold text-white/90">
                  {active.content.title}
                </h3>
                <p className="text-[12px] text-white/40 leading-relaxed">
                  {active.content.description}
                </p>
              </div>
              <div>{active.content.mockup}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useEffect, useRef } from "react";
import {
  BarChart3,
  MessageSquare,
  FileUp,
  Target,
  CheckSquare,
  Users,
  Zap,
  Globe,
} from "lucide-react";

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

const features = [
  {
    icon: BarChart3,
    title: "Live Dashboards",
    description: "See every project's progress in real time. No more \"what's the status?\" emails.",
    span: "md:col-span-2",
    color: "text-blue-400",
    colorBg: "bg-blue-500/10",
    extra: (
      <div className="flex items-center gap-3 mt-3">
        <div className="flex -space-x-1.5">
          <div className="h-5 w-5 rounded-full bg-blue-500/25 border-2 border-[hsl(240_6%_10%)] text-[7px] font-bold text-blue-300 flex items-center justify-center">S</div>
          <div className="h-5 w-5 rounded-full bg-emerald-500/25 border-2 border-[hsl(240_6%_10%)] text-[7px] font-bold text-emerald-300 flex items-center justify-center">J</div>
          <div className="h-5 w-5 rounded-full bg-violet-500/25 border-2 border-[hsl(240_6%_10%)] text-[7px] font-bold text-violet-300 flex items-center justify-center">A</div>
        </div>
        <span className="text-[10px] text-white/25">3 teammates online</span>
      </div>
    ),
  },
  {
    icon: MessageSquare,
    title: "Threaded Messaging",
    description: "Conversations live next to the work. Context is never lost.",
    color: "text-violet-400",
    colorBg: "bg-violet-500/10",
  },
  {
    icon: CheckSquare,
    title: "Approval Workflows",
    description: "Clients review and sign off. Tracked, timestamped, done.",
    color: "text-emerald-400",
    colorBg: "bg-emerald-500/10",
  },
  {
    icon: FileUp,
    title: "File Sharing",
    description: "Upload, version, and organize deliverables in shared folders.",
    color: "text-amber-400",
    colorBg: "bg-amber-500/10",
  },
  {
    icon: Target,
    title: "Milestones",
    description: "Set deadlines, track deliverables, and celebrate when you ship.",
    color: "text-pink-400",
    colorBg: "bg-pink-500/10",
  },
  {
    icon: Users,
    title: "Team Management",
    description: "Invite your whole team. Role-based permissions keep everyone in their lane.",
    span: "md:col-span-2",
    color: "text-cyan-400",
    colorBg: "bg-cyan-500/10",
    extra: (
      <div className="flex flex-wrap gap-1.5 mt-3">
        {["Admin", "Editor", "Viewer", "Client"].map((role) => (
          <span key={role} className="text-[9px] font-medium text-white/25 bg-white/[0.04] px-2 py-0.5 rounded-full border border-white/[0.04]">
            {role}
          </span>
        ))}
      </div>
    ),
  },
  {
    icon: Zap,
    title: "Automations",
    description: "Auto-assign tasks, send notifications, and trigger workflows without lifting a finger.",
    color: "text-yellow-400",
    colorBg: "bg-yellow-500/10",
  },
  {
    icon: Globe,
    title: "Client Portal",
    description: "A branded, client-facing view. They see what they need — nothing more.",
    color: "text-blue-400",
    colorBg: "bg-blue-500/10",
  },
];

export default function BentoGrid() {
  const revealRef = useReveal();

  return (
    <section id="features" className="py-20 md:py-28 relative">
      <div ref={revealRef} className="reveal max-w-5xl mx-auto px-5 md:px-8">
        <div className="text-center mb-12">
          <p className="text-[11px] font-semibold text-blue-400/70 uppercase tracking-widest mb-3">
            Features
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-3">
            Built for how teams actually work
          </h2>
          <p className="text-[14px] text-white/40 max-w-lg mx-auto leading-relaxed">
            Every feature is designed around collaboration — not just task management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className={`group rounded-xl bg-white/[0.02] border border-white/[0.05] p-5 hover:bg-white/[0.035] hover:border-white/[0.08] transition-all duration-200 ${f.span || ""}`}
              >
                <div className={`inline-flex h-8 w-8 items-center justify-center rounded-lg ${f.colorBg} mb-3`}>
                  <Icon className={`h-4 w-4 ${f.color}`} />
                </div>
                <h3 className="text-[13px] font-semibold text-white/85 mb-1">
                  {f.title}
                </h3>
                <p className="text-[11px] text-white/35 leading-relaxed">
                  {f.description}
                </p>
                {f.extra}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

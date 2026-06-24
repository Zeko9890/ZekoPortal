"use client";

import React, { useEffect, useRef } from "react";
import { Zap, ArrowRight, CheckCircle2, Bell, FolderOpen, Mail } from "lucide-react";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

const automationExamples = [
  {
    trigger: "Client submits feedback",
    icon: Mail,
    color: "#6366F1",
    steps: [
      { label: "Notify @design-lead", icon: Bell, color: "#38BDF8" },
      { label: "Create revision task", icon: CheckCircle2, color: "#10B981" },
      { label: "Update project status → In Review", icon: FolderOpen, color: "#F59E0B" },
    ],
  },
  {
    trigger: "File uploaded to project",
    icon: FolderOpen,
    color: "#10B981",
    steps: [
      { label: "Notify client portal", icon: Bell, color: "#38BDF8" },
      { label: "Request approval", icon: CheckCircle2, color: "#6366F1" },
    ],
  },
  {
    trigger: "Approval received",
    icon: CheckCircle2,
    color: "#F59E0B",
    steps: [
      { label: "Mark deliverable as done", icon: CheckCircle2, color: "#10B981" },
      { label: "Notify @dev-team", icon: Bell, color: "#38BDF8" },
      { label: "Archive client thread", icon: FolderOpen, color: "#EC4899" },
    ],
  },
];

const processSteps = [
  { label: "Task Created", status: "done", color: "#10B981" },
  { label: "Assigned to Team", status: "done", color: "#10B981" },
  { label: "File Uploaded", status: "done", color: "#10B981" },
  { label: "Client Notified", status: "active", color: "#38BDF8" },
  { label: "Awaiting Approval", status: "active", color: "#F59E0B" },
  { label: "Approved → Done", status: "pending", color: "#6366F1" },
];

export default function WorkflowAutomation() {
  const revealRef = useReveal();

  return (
    <section id="workflow" className="py-24 bg-background border-y border-border relative overflow-hidden transition-colors duration-500">
      {/* Glow */}
      <div className="absolute pointer-events-none inset-0"
        style={{ background: "radial-gradient(ellipse 50% 50% at 80% 50%, rgba(99,102,241,0.06) 0%, transparent 70%)" }} />

      <div ref={revealRef} className="reveal max-w-[1100px] mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="mb-14 max-w-xl">
          <p className="text-[11px] font-semibold text-blue-500 uppercase tracking-widest mb-3">Workflow Automation</p>
          <h2 className="text-[30px] md:text-[38px] font-bold tracking-tight text-foreground leading-tight mb-4">
            Automate the work
            <br />
            <span className="text-muted-foreground">between the work.</span>
          </h2>
          <p className="text-[13px] text-muted-foreground leading-relaxed font-medium">
            Build powerful if/then automations without writing code. Connect your workflow stages and let ZekoPortal handle the repetitive coordination.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Left: Automation builder panel */}
          <div className="flex flex-col gap-4">
            <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
              {/* Header */}
              <div className="px-4 py-3 border-b border-border flex items-center gap-2">
                <Zap className="h-3.5 w-3.5 text-blue-500" />
                <span className="text-[11px] font-semibold text-card-foreground">Automation Builder</span>
                <span className="ml-auto text-[8px] font-semibold bg-blue-500/15 text-blue-400 px-1.5 py-0.5 rounded-[3px]">Live</span>
              </div>

              {/* Automation flows */}
              <div className="p-4 space-y-5">
                {automationExamples.map((auto, i) => {
                  const TriggerIcon = auto.icon;
                  return (
                    <div key={i} className="group">
                      {/* Trigger node */}
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className="h-6 w-6 rounded-[5px] flex items-center justify-center shrink-0"
                          style={{ backgroundColor: `${auto.color}18`, border: `1px solid ${auto.color}30` }}
                        >
                          <TriggerIcon className="h-3 w-3" style={{ color: auto.color }} />
                        </div>
                        <div className="text-[10px] font-bold text-card-foreground px-2.5 py-1 rounded-[5px] bg-muted border border-border">
                          WHEN: {auto.trigger}
                        </div>
                      </div>

                      {/* Then nodes */}
                      <div className="ml-3 border-l border-border pl-5 space-y-2">
                        {auto.steps.map((step, j) => {
                          const StepIcon = step.icon;
                          return (
                            <div key={j} className="flex items-center gap-2">
                              <div
                                className="h-5 w-5 rounded-[4px] flex items-center justify-center shrink-0"
                                style={{ backgroundColor: `${step.color}15`, border: `1px solid ${step.color}25` }}
                              >
                                <StepIcon className="h-2.5 w-2.5" style={{ color: step.color }} />
                              </div>
                              <div
                                className="text-[9.5px] font-semibold px-2 py-1 rounded-[4px] border"
                                style={{
                                  backgroundColor: `${step.color}0D`,
                                  borderColor: `${step.color}20`,
                                  color: step.color,
                                }}
                              >
                                THEN: {step.label}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      {i < automationExamples.length - 1 && <div className="mt-4 border-t border-border" />}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Process diagram + stat cards */}
          <div className="flex flex-col gap-4">

            {/* Process pipeline */}
            <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-[11px] font-semibold text-muted-foreground">Delivery Pipeline</span>
              </div>
              <div className="space-y-2.5">
                {processSteps.map((step, i) => (
                  <div key={i} className="flex items-center gap-3">
                    {/* Line connector */}
                    <div className="flex flex-col items-center w-6 shrink-0">
                      <div
                        className="h-4 w-4 rounded-full flex items-center justify-center border-2 transition-all"
                        style={{
                          borderColor: step.status === "pending" ? "rgba(255,255,255,0.1)" : step.color,
                          backgroundColor: step.status === "done" ? step.color : step.status === "active" ? `${step.color}20` : "transparent",
                        }}
                      >
                        {step.status === "done" && (
                          <svg className="h-2 w-2 text-black" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                        {step.status === "active" && (
                          <div className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: step.color }} />
                        )}
                      </div>
                      {i < processSteps.length - 1 && (
                        <div
                          className="w-px flex-1 mt-1 bg-border"
                          style={{ height: 12 }}
                        />
                      )}
                    </div>
                    <span
                      className={`text-[10px] font-semibold ${step.status === "pending" ? "text-muted-foreground/50" : step.status === "active" ? "text-foreground" : "text-muted-foreground"}`}
                      style={step.status === "active" ? { color: step.color } : {}}
                    >
                      {step.label}
                    </span>
                    {step.status === "active" && (
                      <span className="ml-auto text-[8px] font-semibold px-1.5 py-0.5 rounded-[3px]"
                        style={{ backgroundColor: `${step.color}15`, color: step.color }}>
                        Now
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: "83%", label: "Avg. time saved on coordination", color: "#38BDF8" },
                { value: "12×", label: "Faster client approvals", color: "#6366F1" },
                { value: "Zero", label: "Missed follow-ups reported", color: "#10B981" },
                { value: "100+", label: "Pre-built automation templates", color: "#F59E0B" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[9px] border border-border bg-card p-4 hover:border-border/60 transition-colors shadow-sm"
                >
                  <div className="text-[22px] font-bold tracking-tight mb-1" style={{ color: stat.color }}>{stat.value}</div>
                  <p className="text-[9.5px] text-muted-foreground font-medium leading-relaxed">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

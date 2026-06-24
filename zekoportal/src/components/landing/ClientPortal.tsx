"use client";

import React, { useEffect, useRef } from "react";
import {
  Globe,
  CheckCircle2,
  Paperclip,
  ChevronRight,
  Lock,
  Eye,
  LayoutGrid,
  ThumbsUp,
  Clock,
} from "lucide-react";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

const sharedDocs = [
  { name: "Homepage_v4_Final.fig", type: "Figma", version: "v4", status: "Approved", time: "Today" },
  { name: "Brand Color System.pdf", type: "PDF", version: "v2", status: "In Review", time: "Yesterday" },
  { name: "App Wireframes.sketch", type: "Sketch", version: "v1", status: "Shared", time: "Jun 20" },
  { name: "Q3 Creative Brief.docx", type: "Word", version: "v3", status: "Approved", time: "Jun 18" },
];

const approvalSteps = [
  { label: "Submitted", icon: Paperclip, done: true, color: "#10B981" },
  { label: "In Review", icon: Eye, done: true, color: "#0EA5E9" },
  { label: "Client Notified", icon: Globe, done: true, color: "#6366F1" },
  { label: "Approved", icon: ThumbsUp, done: false, color: "#F59E0B" },
];

const clientNavItems = [
  { icon: LayoutGrid, label: "Dashboard", active: true },
  { icon: CheckCircle2, label: "Approvals", active: false, badge: 2 },
  { icon: Paperclip, label: "Documents", active: false },
  { icon: Clock, label: "Activity", active: false },
];

export default function ClientPortal() {
  const revealRef = useReveal();

  return (
    <section id="clients" className="py-24 bg-background border-y border-border relative overflow-hidden transition-colors duration-500">
      <div className="absolute pointer-events-none inset-0"
        style={{ background: "radial-gradient(ellipse 55% 45% at 50% 100%, rgba(99,102,241,0.06) 0%, transparent 70%)" }} />

      <div ref={revealRef} className="reveal max-w-[1100px] mx-auto px-6 md:px-10 relative z-10">

        {/* Header */}
        <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold text-blue-500 uppercase tracking-widest mb-3">Client Portal</p>
            <h2 className="text-[30px] md:text-[38px] font-bold tracking-tight text-foreground leading-tight">
              Your clients love it.
              <br />
              <span className="text-muted-foreground">No more email chains.</span>
            </h2>
          </div>
          <p className="text-[13px] text-muted-foreground max-w-[310px] leading-relaxed font-medium">
            Give clients a branded portal to review deliverables, approve work, and track progress — without giving them access to your internal workspace.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* Left: Team internal view */}
          <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
            <div className="px-4 py-2.5 border-b border-border flex items-center gap-2 bg-muted/50">
              <Lock className="h-3 w-3 text-muted-foreground" />
              <span className="text-[10px] font-semibold text-muted-foreground">Internal workspace</span>
              <div className="ml-auto flex items-center gap-1.5">
                <div className="h-4 w-4 rounded-full bg-indigo-500 flex items-center justify-center text-[6px] font-bold text-white shadow-sm">SC</div>
                <div className="h-4 w-4 rounded-full bg-sky-500 flex items-center justify-center text-[6px] font-bold text-white shadow-sm">JP</div>
                <div className="h-4 w-4 rounded-full bg-emerald-500 flex items-center justify-center text-[6px] font-bold text-white shadow-sm">MR</div>
              </div>
            </div>

            <div className="flex" style={{ minHeight: 380 }}>
              {/* Sidebar */}
              <div className="w-[140px] border-r border-border bg-card p-3 shrink-0">
                <div className="flex items-center gap-1.5 mb-4 px-1">
                  <div className="h-4 w-4 rounded-[3px] bg-foreground flex items-center justify-center shadow-sm"><span className="text-white font-bold text-[7px]">Z</span></div>
                  <span className="text-[10px] font-semibold text-foreground">Team view</span>
                </div>
                {[
                  { label: "Projects", active: false },
                  { label: "Clients", active: true },
                  { label: "Approvals", active: false },
                  { label: "Internal notes", active: false },
                  { label: "Automations", active: false },
                ].map(({ label, active }) => (
                  <div key={label} className={`text-[9px] font-medium px-2 py-1.5 rounded-[4px] mb-0.5 transition-colors ${active ? "bg-indigo-50 text-indigo-600 border-l-2 border-indigo-500" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`}
                    style={active ? { paddingLeft: "calc(0.5rem - 2px)" } : {}}>
                    {label}
                  </div>
                ))}
              </div>

              {/* Main content */}
              <div className="flex-1 p-4 bg-muted/50/50">
                <div className="text-[10px] font-bold text-foreground mb-3">Acme Corp — Project Files</div>

                {/* Shared docs table */}
                <div className="space-y-1.5 mb-4">
                  {sharedDocs.map((doc, i) => (
                    <div key={i} className="flex items-center gap-2.5 p-2 rounded-[6px] bg-card border border-border hover:border-border hover:shadow-sm transition-all group">
                      <Paperclip className="h-3 w-3 text-muted-foreground shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-[9px] font-semibold text-foreground truncate">{doc.name}</div>
                        <div className="text-[7.5px] text-muted-foreground mt-0.5">{doc.type} · {doc.time}</div>
                      </div>
                      <span className="text-[7px] font-semibold text-muted-foreground bg-muted px-1.5 py-0.5 rounded-[3px]">{doc.version}</span>
                      <span className={`text-[7.5px] font-semibold px-1.5 py-0.5 rounded-[3px] ${
                        doc.status === "Approved" ? "bg-blue-50 text-blue-600" :
                        doc.status === "In Review" ? "bg-orange-50 text-orange-600" :
                        "bg-muted text-muted-foreground"
                      }`}>{doc.status}</span>
                    </div>
                  ))}
                </div>

                {/* Internal note */}
                <div className="rounded-[6px] border border-orange-200 bg-orange-50/50 p-2.5">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Lock className="h-2.5 w-2.5 text-orange-500" />
                    <span className="text-[8px] font-bold text-orange-600">Internal note (hidden from client)</span>
                  </div>
                  <p className="text-[8.5px] text-muted-foreground leading-relaxed">
                    Waiting on client feedback re: mobile nav. Don&apos;t push v4 until approved. — Sarah
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Client portal view */}
          <div className="rounded-xl border border-indigo-100 bg-card overflow-hidden shadow-premium"
            style={{ boxShadow: "0 0 0 1px rgba(99,102,241,0.1), 0 24px 48px rgba(0,0,0,0.06)" }}>
            <div className="px-4 py-2.5 border-b border-indigo-100 flex items-center gap-2 bg-indigo-50/30">
              <Globe className="h-3 w-3 text-indigo-500" />
              <span className="text-[10px] font-semibold text-indigo-700">Client portal — Acme Corp</span>
              <div className="ml-auto flex items-center gap-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-sky-500 animate-pulse" />
                <span className="text-[8px] text-sky-600 font-medium">Live</span>
              </div>
            </div>

            <div className="flex" style={{ minHeight: 380 }}>
              {/* Client nav */}
              <div className="w-[140px] border-r border-indigo-50 bg-card p-3 shrink-0">
                <div className="flex items-center gap-1.5 mb-4 px-1">
                  <div className="h-4 w-4 rounded-[3px] flex items-center justify-center shadow-sm bg-indigo-500">
                    <span className="text-white font-bold text-[7px]">A</span>
                  </div>
                  <span className="text-[10px] font-semibold text-foreground">Acme Corp</span>
                </div>
                {clientNavItems.map(({ icon: Icon, label, active, badge }) => (
                  <div key={label} className={`flex items-center gap-1.5 text-[9px] font-medium px-2 py-1.5 rounded-[4px] mb-0.5 transition-colors ${
                    active ? "text-indigo-600 bg-indigo-50 border-l-2 border-indigo-500" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`} style={active ? { paddingLeft: "calc(0.5rem - 2px)" } : {}}>
                    <Icon className="h-2.5 w-2.5 shrink-0" />
                    {label}
                    {badge && (
                      <span className="ml-auto text-[7px] font-bold bg-orange-400 text-white rounded-full h-3.5 w-3.5 flex items-center justify-center shadow-sm">
                        {badge}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Client content */}
              <div className="flex-1 p-4 bg-muted/50/50">
                <div className="text-[10px] font-bold text-foreground mb-1">Welcome back, Alex 👋</div>
                <div className="text-[8.5px] text-muted-foreground mb-4">1 item awaiting your approval</div>

                {/* Approval flow */}
                <div className="rounded-[8px] border border-border bg-card shadow-sm p-3 mb-3">
                  <div className="text-[9px] font-bold text-foreground mb-3">Homepage v4 — Approval Flow</div>
                  <div className="flex items-center gap-0">
                    {approvalSteps.map((step, i) => {
                      const Icon = step.icon;
                      return (
                        <React.Fragment key={step.label}>
                          <div className="flex flex-col items-center gap-1">
                            <div
                              className="h-7 w-7 rounded-full flex items-center justify-center border-2 transition-colors"
                              style={{
                                borderColor: step.done ? step.color : "rgba(0,0,0,0.1)",
                                backgroundColor: step.done ? `${step.color}15` : "transparent",
                              }}
                            >
                              <Icon className="h-3 w-3" style={{ color: step.done ? step.color : "rgba(0,0,0,0.2)" }} />
                            </div>
                            <span className="text-[7px] text-center font-medium" style={{ color: step.done ? step.color : "rgba(0,0,0,0.4)" }}>
                              {step.label}
                            </span>
                          </div>
                          {i < approvalSteps.length - 1 && (
                            <div className="flex-1 h-px mx-1 mb-4" style={{ backgroundColor: step.done ? `${step.color}40` : "rgba(0,0,0,0.08)" }} />
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>

                {/* Shared file */}
                <div className="rounded-[8px] border border-border bg-card shadow-sm p-3 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-[5px] bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                      <Paperclip className="h-3.5 w-3.5 text-indigo-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[9.5px] font-semibold text-foreground">Homepage_v4_Final.fig</div>
                      <div className="text-[8px] text-muted-foreground">Figma · 12.4 MB · Shared by Sarah</div>
                    </div>
                    <button className="flex items-center gap-1 text-[8.5px] font-semibold bg-indigo-50 text-indigo-600 border border-indigo-100 px-2 py-1 rounded-[4px] hover:bg-indigo-100 transition-colors shadow-sm">
                      View <ChevronRight className="h-2.5 w-2.5" />
                    </button>
                  </div>
                </div>

                {/* Approve button */}
                <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-[7px] font-semibold text-[10px] text-white transition-all hover:opacity-90 shadow-md hover:shadow-lg"
                  style={{ background: "linear-gradient(135deg, #6366F1, #38BDF8)" }}>
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Approve Homepage v4
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useEffect, useRef, useState } from "react";
import { MessageSquare, AtSign, ThumbsUp, Zap, Smile, ChevronRight } from "lucide-react";

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

const comments = [
  {
    user: "Sarah Chen",
    avatar: "SC",
    color: "#6366F1",
    role: "Design Lead",
    time: "10:32 AM",
    text: "Just updated the hero section. The gradient feels much more on-brand now — see annotation on frame 3.",
    reactions: [{ emoji: "👍", count: 3 }, { emoji: "🔥", count: 2 }],
    mentions: [],
    internal: false,
  },
  {
    user: "James Park",
    avatar: "JP",
    color: "#0EA5E9",
    role: "Product",
    time: "10:38 AM",
    text: "Looks great. @MayaRodriguez can you review the mobile breakpoint before we send to the client?",
    reactions: [{ emoji: "✅", count: 1 }],
    mentions: ["@MayaRodriguez"],
    internal: true,
  },
  {
    user: "Maya Rodriguez",
    avatar: "MR",
    color: "#10B981",
    role: "Dev",
    time: "10:51 AM",
    text: "On it! Breakpoint looks solid on 375px. Sending approval request to Alex now.",
    reactions: [],
    mentions: [],
    internal: false,
  },
];

const approvalFlow = [
  { label: "Submitted for Review", done: true, by: "Sarah" },
  { label: "Internal QA", done: true, by: "Maya" },
  { label: "Sent to Client", done: true, by: "Auto" },
  { label: "Client Approved", done: false, by: "Alex" },
];

const liveUsers = [
  { initials: "SC", color: "#6366F1", action: "Editing frame 3" },
  { initials: "JP", color: "#0EA5E9", action: "Viewing timeline" },
  { initials: "MR", color: "#10B981", action: "Left a comment" },
];

export default function TeamCollaboration() {
  const revealRef = useReveal();
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setTyping((p) => !p), 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="collaboration" className="py-24 bg-muted border-y border-border relative overflow-hidden transition-colors duration-500">
      <div className="absolute pointer-events-none inset-0"
        style={{ background: "radial-gradient(ellipse 50% 50% at 20% 50%, rgba(16,185,129,0.05) 0%, transparent 70%)" }} />

      <div ref={revealRef} className="reveal max-w-[1100px] mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold text-green-500 uppercase tracking-widest mb-3">Team Collaboration</p>
            <h2 className="text-[30px] md:text-[38px] font-bold tracking-tight text-foreground leading-tight">
              Your team, in sync.
              <br />
              <span className="text-muted-foreground">Always.</span>
            </h2>
          </div>
          <p className="text-[13px] text-muted-foreground max-w-[300px] leading-relaxed font-medium">
            Comments, mentions, approvals, and live presence — woven directly into your projects.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

          {/* Left: Comments thread (3 cols) */}
          <div className="lg:col-span-3 rounded-xl border border-border bg-card overflow-hidden shadow-sm">
            {/* Header */}
            <div className="px-4 py-3 border-b border-border flex items-center gap-2">
              <MessageSquare className="h-3.5 w-3.5 text-green-500" />
              <span className="text-[11px] font-semibold text-card-foreground">Project Comments</span>
              <div className="ml-auto flex items-center gap-1.5">
                {liveUsers.map((u) => (
                  <div key={u.initials} className="relative">
                    <div
                      className="h-5 w-5 rounded-full flex items-center justify-center text-[7px] font-bold text-white"
                      style={{ backgroundColor: u.color }}
                    >{u.initials}</div>
                    <div className="absolute -bottom-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-blue-400 border border-card" />
                  </div>
                ))}
                <span className="text-[8px] text-muted-foreground ml-1">{liveUsers.length} active</span>
              </div>
            </div>

            {/* Thread */}
            <div className="p-4 space-y-4">
              {comments.map((c, i) => (
                <div key={i} className="group">
                  <div className="flex items-start gap-2.5">
                    <div
                      className="h-6 w-6 rounded-full shrink-0 flex items-center justify-center text-[8px] font-bold text-white mt-0.5"
                      style={{ backgroundColor: c.color }}
                    >{c.avatar}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold text-card-foreground">{c.user}</span>
                        <span className="text-[8.5px] text-muted-foreground font-medium">{c.role}</span>
                        {c.internal && (
                          <span className="text-[7.5px] font-semibold bg-orange-500/12 text-orange-400 border border-orange-500/20 px-1.5 py-0.5 rounded-[3px]">
                            Internal
                          </span>
                        )}
                        <span className="ml-auto text-[8px] text-muted-foreground/60">{c.time}</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground leading-relaxed">
                        {c.text.split(/(@\w+)/).map((part, j) =>
                          part.startsWith("@") ? (
                            <span key={j} className="text-blue-500 font-semibold bg-blue-500/10 px-1 rounded-[3px]">{part}</span>
                          ) : part
                        )}
                      </p>
                      {c.reactions.length > 0 && (
                        <div className="flex items-center gap-1.5 mt-2">
                          {c.reactions.map((r, j) => (
                            <div
                              key={j}
                              className="flex items-center gap-1 text-[9px] bg-muted border border-border rounded-full px-2 py-0.5 hover:bg-muted/80 transition-colors cursor-default"
                            >
                              <span>{r.emoji}</span>
                              <span className="text-muted-foreground font-medium">{r.count}</span>
                            </div>
                          ))}
                          <button className="flex items-center gap-1 text-[9px] text-muted-foreground hover:text-foreground transition-colors">
                            <Smile className="h-2.5 w-2.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              <div className={`flex items-center gap-2 transition-opacity duration-500 ${typing ? "opacity-100" : "opacity-0"}`}>
                <div className="h-6 w-6 rounded-full bg-orange-500 flex items-center justify-center text-[8px] font-bold text-black shrink-0">AL</div>
                <div className="text-[9px] text-muted-foreground flex items-center gap-1.5">
                  <span>Alex is typing</span>
                  <div className="flex gap-0.5">
                    {[0, 1, 2].map((n) => (
                      <div key={n} className="h-1 w-1 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: `${n * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Reply bar */}
              <div className="flex items-center gap-2 mt-2">
                <AtSign className="h-3 w-3 text-muted-foreground shrink-0" />
                <div className="flex-1 bg-muted/50 border border-border rounded-[6px] px-3 py-1.5 text-[9px] text-muted-foreground">
                  Reply or mention someone...
                </div>
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
            </div>
          </div>

          {/* Right: Approval flow + live presence (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-4">

            {/* Approval flow card */}
            <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
              <div className="px-4 py-3 border-b border-border flex items-center gap-2">
                <ThumbsUp className="h-3.5 w-3.5 text-orange-500" />
                <span className="text-[11px] font-semibold text-card-foreground">Approval Status</span>
              </div>
              <div className="p-4 space-y-1.5">
                {approvalFlow.map((step, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className={`h-4 w-4 rounded-full flex items-center justify-center shrink-0 border-2 ${
                      step.done
                        ? "border-[#10B981] bg-[#10B981]"
                        : "border-[#F59E0B] bg-[#F59E0B]/10"
                    }`}>
                      {step.done ? (
                        <svg className="h-2 w-2 text-black" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : (
                        <div className="h-1.5 w-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
                      )}
                    </div>
                    <div className="flex-1">
                      <span className={`text-[9.5px] font-semibold ${step.done ? "text-muted-foreground" : "text-orange-500"}`}>
                        {step.label}
                      </span>
                    </div>
                    <span className="text-[8px] text-muted-foreground/60">{step.by}</span>
                  </div>
                ))}
                <div className="mt-4 flex">
                  <button className="flex-1 text-center text-[10px] font-semibold py-2 rounded-[6px] bg-orange-500/10 text-orange-500 border border-orange-500/20 hover:bg-orange-500/15 transition-colors">
                    Remind Client
                  </button>
                </div>
              </div>
            </div>

            {/* Live presence card */}
            <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="h-3.5 w-3.5 text-blue-500" />
                <span className="text-[11px] font-semibold text-card-foreground">Live Presence</span>
                <div className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
              </div>
              <div className="space-y-2">
                {liveUsers.map((u) => (
                  <div key={u.initials} className="flex items-center gap-2.5 p-2 rounded-[6px] bg-muted/50 border border-border">
                    <div className="relative">
                      <div className="h-6 w-6 rounded-full flex items-center justify-center text-[8px] font-bold text-white"
                        style={{ backgroundColor: u.color }}>{u.initials}</div>
                      <div className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-blue-400 border-2 border-card" />
                    </div>
                    <span className="text-[9px] text-muted-foreground font-medium truncate">{u.action}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mini stat */}
            <div className="rounded-xl border border-border bg-card p-4 text-center shadow-sm">
              <div className="text-[28px] font-bold text-card-foreground tracking-tight mb-1">4.9<span className="text-muted-foreground/50 text-[14px]">/5</span></div>
              <p className="text-[9px] text-muted-foreground font-semibold uppercase tracking-wider">Client satisfaction score</p>
              <div className="flex justify-center gap-1 mt-2">
                {[1,2,3,4,5].map(n => (
                  <div key={n} className={`h-1.5 w-4 rounded-full ${n <= 4 ? "bg-orange-500" : "bg-muted"}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

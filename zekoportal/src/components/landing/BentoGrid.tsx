"use client";

import React, { useEffect, useRef } from "react";
import { Zap, ShieldCheck, Database, GitBranch } from "lucide-react";

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

export default function BentoGrid() {
  const revealRef = useReveal();

  return (
    <section id="features" className="py-20 bg-black relative border-t border-white/5">
      <div ref={revealRef} className="reveal max-w-6xl mx-auto px-5 md:px-8">
        
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-3">
            Engineered for scale.
          </h2>
          <p className="text-[14px] text-white/40 max-w-lg font-medium">
            Advanced features built right in. No plugins, no complex setups. Just raw productivity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Automation Node UI */}
          <div className="md:col-span-2 glass-panel rounded-xl border-crisp p-0 overflow-hidden flex flex-col md:flex-row group">
            <div className="p-6 md:w-1/2 flex flex-col justify-center">
              <div className="h-8 w-8 rounded-[6px] bg-yellow-500/10 flex items-center justify-center mb-4">
                <Zap className="h-4 w-4 text-yellow-400" />
              </div>
              <h3 className="text-[15px] font-bold text-white mb-2">Visual Automations</h3>
              <p className="text-[12px] text-white/40 font-medium leading-relaxed">
                Trigger workflows automatically. When a design is approved, immediately notify the engineering team and update the project status without lifting a finger.
              </p>
            </div>
            
            <div className="md:w-1/2 bg-[#050505] border-t md:border-t-0 md:border-l border-white/5 p-6 relative min-h-[200px] flex items-center justify-center">
              <div className="absolute inset-0 bg-grid-dense opacity-30" />
              <div className="relative z-10 flex flex-col items-center gap-2">
                <div className="bg-[#111] border border-white/10 px-3 py-2 rounded-[6px] text-[10px] font-bold text-white shadow-premium">
                  IF Status = Approved
                </div>
                <div className="h-4 w-px bg-white/20" />
                <div className="bg-[#111] border border-yellow-500/30 px-3 py-2 rounded-[6px] text-[10px] font-bold text-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.15)]">
                  THEN Notify @engineering
                </div>
                <div className="h-4 w-px bg-white/20" />
                <div className="bg-[#111] border border-emerald-500/30 px-3 py-2 rounded-[6px] text-[10px] font-bold text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                  AND Move to "Ready for Dev"
                </div>
              </div>
            </div>
          </div>

          {/* Role Based Access UI */}
          <div className="md:col-span-1 glass-panel rounded-xl border-crisp p-6 flex flex-col">
            <div className="h-8 w-8 rounded-[6px] bg-blue-500/10 flex items-center justify-center mb-4">
              <ShieldCheck className="h-4 w-4 text-blue-400" />
            </div>
            <h3 className="text-[15px] font-bold text-white mb-2">Granular Access</h3>
            <p className="text-[12px] text-white/40 font-medium mb-6">
              Control exactly who sees what. Keep internal discussions private while giving clients full visibility into deliverables.
            </p>
            
            <div className="mt-auto space-y-2">
              <div className="flex items-center justify-between p-2 rounded-[6px] bg-[#0A0A0A] border border-white/5">
                <span className="text-[10px] font-bold text-white/70">Client View</span>
                <div className="h-2 w-6 rounded-full bg-blue-500" />
              </div>
              <div className="flex items-center justify-between p-2 rounded-[6px] bg-[#0A0A0A] border border-white/5">
                <span className="text-[10px] font-bold text-white/70">Internal Comments</span>
                <div className="h-2 w-6 rounded-full bg-white/10" />
              </div>
            </div>
          </div>

          {/* Connected Data */}
          <div className="md:col-span-1 glass-panel rounded-xl border-crisp p-6">
            <div className="h-8 w-8 rounded-[6px] bg-violet-500/10 flex items-center justify-center mb-4">
              <Database className="h-4 w-4 text-violet-400" />
            </div>
            <h3 className="text-[15px] font-bold text-white mb-2">Single Source of Truth</h3>
            <p className="text-[12px] text-white/40 font-medium">
              Files, feedback, and tasks are tightly coupled. No more digging through Slack to find the latest asset link.
            </p>
          </div>

          {/* Audit Log UI */}
          <div className="md:col-span-2 glass-panel rounded-xl border-crisp p-6 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="h-8 w-8 rounded-[6px] bg-emerald-500/10 flex items-center justify-center mb-4">
                <GitBranch className="h-4 w-4 text-emerald-400" />
              </div>
              <h3 className="text-[15px] font-bold text-white mb-2">Comprehensive Audit Trails</h3>
              <p className="text-[12px] text-white/40 font-medium">
                Every action is logged and timestamped. Absolute accountability across your entire workspace.
              </p>
            </div>
            
            <div className="flex-1 w-full bg-[#050505] rounded-[8px] border border-white/10 p-4 space-y-3">
              {[
                { user: "Sarah", action: "approved", target: "Homepage v4", time: "2m ago" },
                { user: "James", action: "uploaded", target: "Brand_Assets.zip", time: "15m ago" },
                { user: "System", action: "created task", target: "Update Auth Flow", time: "1h ago" }
              ].map((log, i) => (
                <div key={i} className="flex justify-between items-center text-[9px] font-mono">
                  <span className="text-white/60"><span className="text-white font-bold">{log.user}</span> {log.action} <span className="text-blue-400">{log.target}</span></span>
                  <span className="text-white/30">{log.time}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

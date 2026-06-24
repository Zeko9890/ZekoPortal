"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, MousePointer2, BellRing } from "lucide-react";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative pt-32 pb-0 overflow-hidden bg-black">
      {/* Dense Grid Background */}
      <div className="absolute inset-0 bg-grid-dense opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/80 to-black pointer-events-none z-10" />
      
      {/* Radial Premium Glow */}
      <div className="bg-radial-glow absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] pointer-events-none" />

      <div className="relative z-20 max-w-6xl mx-auto px-5 md:px-8 flex flex-col items-center">
        
        {/* Copy - Highly compressed, high impact */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-white/10 bg-white/5 mb-6 shadow-premium">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[10px] font-medium text-white/70 tracking-wide uppercase">
              ZekoPortal 2.0 is live
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.05] text-white mb-5">
            The workspace for
            <br />
            <span className="text-gradient-premium">high-velocity teams.</span>
          </h1>

          <p className="text-[15px] md:text-[17px] text-white/40 leading-relaxed max-w-xl mx-auto mb-8 font-medium">
            Unify your projects, client approvals, and team communication in a single, insanely fast portal.
          </p>

          <div className="flex items-center justify-center gap-3">
            <Link
              href="/signup"
              className="group flex items-center gap-2 bg-white text-black font-semibold text-[13px] px-5 py-2.5 rounded-[6px] hover:bg-white/90 transition-all"
            >
              Start Building
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/login"
              className="flex items-center gap-2 text-[13px] font-medium text-white/60 hover:text-white px-5 py-2.5 rounded-[6px] border border-white/10 hover:bg-white/5 transition-all"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Product UI - Above the fold, massive overlap */}
        <div className={`relative w-full max-w-[1000px] transition-all duration-1000 ease-out transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'}`}>
          
          {/* Mockup Container */}
          <div className="mockup-container relative z-10 w-full aspect-[16/9] md:aspect-[21/9] flex flex-col">
            <div className="mockup-header">
              <div className="mockup-dot bg-white/20" />
              <div className="mockup-dot bg-white/20" />
              <div className="mockup-dot bg-white/20" />
              <div className="mx-auto text-[10px] text-white/30 font-medium font-mono">zekoportal.com/workspace</div>
            </div>
            
            {/* Mockup Body - High Density Data */}
            <div className="flex-1 bg-[#050505] relative overflow-hidden flex">
              {/* Sidebar */}
              <div className="w-[60px] md:w-[200px] border-r border-white/5 bg-[#0A0A0A] p-3 hidden sm:block">
                <div className="h-6 w-full bg-white/10 rounded-[4px] mb-6" />
                <div className="space-y-2">
                  <div className="h-4 w-full bg-white/5 rounded-[3px]" />
                  <div className="h-4 w-[80%] bg-white/5 rounded-[3px]" />
                  <div className="h-4 w-[90%] bg-white/5 rounded-[3px]" />
                </div>
              </div>
              
              {/* Main Content Area */}
              <div className="flex-1 p-6 relative">
                <div className="flex justify-between items-center mb-6">
                  <div className="h-6 w-32 bg-white/10 rounded-[4px]" />
                  <div className="flex -space-x-2">
                    <div className="h-6 w-6 rounded-full border border-black bg-blue-500" />
                    <div className="h-6 w-6 rounded-full border border-black bg-orange-500" />
                    <div className="h-6 w-6 rounded-full border border-black bg-slate-400" />
                  </div>
                </div>

                {/* Dense Rows */}
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-12 w-full bg-white/5 border border-white/5 rounded-[6px] flex items-center px-4 justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-3 w-3 rounded-full bg-blue-400/20 border border-blue-400/50" />
                        <div className="h-3 w-24 bg-white/20 rounded-[2px]" />
                      </div>
                      <div className="h-1.5 w-32 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: `${80 - (i * 10)}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Floating Collaboration Cursor */}
          <div className="absolute top-[30%] left-[25%] z-30 animate-float-up" style={{ animationDelay: '0.4s' }}>
            <div className="relative">
              <MousePointer2 className="h-4 w-4 text-orange-500 fill-orange-500 -rotate-12" />
              <div className="absolute top-4 left-4 bg-orange-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-[3px] shadow-lg whitespace-nowrap">
                Sarah is editing
              </div>
            </div>
          </div>

          {/* Floating Notification */}
          <div className="absolute top-[15%] right-[-2%] md:right-[-5%] z-30 animate-float-up glass-panel p-3 rounded-[8px] flex items-center gap-3 w-[220px]" style={{ animationDelay: '0.6s' }}>
            <div className="h-8 w-8 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0">
              <BellRing className="h-3.5 w-3.5 text-orange-500" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-white/90">Client Approval</div>
              <div className="text-[9px] text-white/50">Landing page v3 approved.</div>
            </div>
          </div>

          {/* Bottom fade out to blend with next section */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}

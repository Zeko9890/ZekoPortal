"use client";

import React, { useEffect, useRef } from "react";
import { CheckCircle2, MessageSquare, Zap, Target } from "lucide-react";

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
  const revealRef = useReveal();

  return (
    <section id="workflow" className="py-20 bg-white relative">
      <div ref={revealRef} className="reveal max-w-6xl mx-auto px-5 md:px-8">
        
        <div className="flex flex-col md:flex-row gap-8 items-center mb-16">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4">
              Everything in one view.
            </h2>
            <p className="text-[15px] text-gray-500 leading-relaxed max-w-md font-medium">
              We eliminated the tabs, the context switching, and the lost emails. 
              Your entire project workflow is compressed into a single, high-performance interface.
            </p>
          </div>
          
          <div className="flex gap-4">
            <div className="flex flex-col gap-1 border-l border-gray-200 pl-4">
              <span className="text-2xl font-bold text-gray-900">10x</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Faster Approvals</span>
            </div>
            <div className="flex flex-col gap-1 border-l border-gray-200 pl-4">
              <span className="text-2xl font-bold text-gray-900">0</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Lost Messages</span>
            </div>
          </div>
        </div>

        {/* High-Density Functional Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* Main Task List Widget (Spans 8) */}
          <div className="md:col-span-8 glass-panel rounded-xl p-5 border-crisp flex flex-col h-[340px]">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-sky-500" />
                <span className="text-[13px] font-semibold text-gray-900">Active Sprint</span>
              </div>
              <div className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-[4px]">
                Q3 Delivery
              </div>
            </div>
            
            <div className="flex-1 space-y-2 overflow-hidden">
              {[
                { task: "Finalize branding guidelines", status: "Done", sColor: "text-gray-600 bg-gray-50 border-gray-200", priority: "High" },
                { task: "Implement authentication flow", status: "In Progress", sColor: "text-sky-600 bg-sky-50 border-sky-200", priority: "High" },
                { task: "Design system audit", status: "Review", sColor: "text-orange-600 bg-orange-50 border-orange-200", priority: "Medium" },
                { task: "Copywriting for landing page", status: "Todo", sColor: "text-gray-500 bg-gray-100 border-transparent", priority: "Low" },
                { task: "Client kick-off meeting", status: "Done", sColor: "text-gray-600 bg-gray-50 border-gray-200", priority: "High" },
              ].map((t, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 rounded-[6px] border border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm transition-all cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-sm border border-gray-300 group-hover:border-gray-400" />
                    <span className="text-[12px] text-gray-800 font-medium">{t.task}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] text-gray-400 uppercase font-bold hidden sm:block">{t.priority}</span>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-[4px] border ${t.sColor}`}>
                      {t.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Side Widgets (Spans 4) */}
          <div className="md:col-span-4 flex flex-col gap-4">
            
            {/* Approvals Widget */}
            <div className="flex-1 glass-panel rounded-xl p-5 border-crisp flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="h-4 w-4 text-orange-500" />
                <span className="text-[12px] font-semibold text-gray-900">Client Sign-off</span>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-[8px] p-3">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="text-[11px] font-bold text-gray-900 mb-0.5">Homepage v4.fig</div>
                    <div className="text-[9px] text-gray-500">Awaiting approval from Sarah</div>
                  </div>
                  <div className="h-6 w-6 rounded-full bg-orange-100 text-[8px] font-bold text-orange-600 flex items-center justify-center">SC</div>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 bg-white hover:bg-gray-50 border border-gray-200 text-gray-900 text-[10px] font-bold py-1.5 rounded-[4px] shadow-sm transition-all">Approve</button>
                  <button className="flex-1 bg-transparent hover:bg-gray-100 text-gray-600 text-[10px] font-bold py-1.5 rounded-[4px] transition-colors">Request Changes</button>
                </div>
              </div>
            </div>

            {/* Quick Chat Widget */}
            <div className="flex-1 glass-panel rounded-xl p-5 border-crisp flex flex-col justify-end relative overflow-hidden">
              <div className="absolute top-5 left-5 flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-sky-500" />
                <span className="text-[12px] font-semibold text-gray-900">Instant Context</span>
              </div>
              
              <div className="space-y-2 mt-8">
                <div className="bg-white border border-gray-200 p-2 rounded-[6px] rounded-tl-none w-[85%] shadow-sm">
                  <p className="text-[10px] text-gray-600">Are we clear to deploy the new auth flow?</p>
                </div>
                <div className="bg-sky-50 border border-sky-200 p-2 rounded-[6px] rounded-tr-none w-[75%] ml-auto shadow-sm">
                  <p className="text-[10px] text-sky-800">Yes, tests passed. Deploying now 🚀</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

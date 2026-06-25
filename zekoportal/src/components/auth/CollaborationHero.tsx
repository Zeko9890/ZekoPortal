"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Check, 
  MessageSquare, 
  Calendar, 
  MoreHorizontal,
  Star,
  BarChart2
} from "lucide-react";

export default function CollaborationHero() {
  return (
    <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
      
      {/* AMBIENT GLOWS */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#60A5FA]/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-[rgba(251,146,60,0.2)] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] bg-[#3B82F6]/10 rounded-full blur-[80px] pointer-events-none" />

      {/* ABSTRACT FLOWING LINES */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-80" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M-100,150 C150,300 300,50 850,250" stroke="rgba(96,165,250,0.4)" strokeWidth="1.5" />
        <path d="M-50,550 C200,800 500,200 900,450" stroke="rgba(251,146,60,0.4)" strokeWidth="2" />
        <path d="M100,850 C300,500 600,700 800,-50" stroke="rgba(96,165,250,0.3)" strokeWidth="1" />
        <path d="M200,-100 C400,200 600,50 900,600" stroke="rgba(59,130,246,0.2)" strokeWidth="1.5" />
        
        {/* Abstract nodes */}
        <circle cx="280" cy="320" r="4" fill="rgba(251,146,60,0.8)" className="animate-pulse" />
        <circle cx="620" cy="180" r="3" fill="rgba(96,165,250,0.7)" />
        <circle cx="220" cy="610" r="5" fill="rgba(59,130,246,0.8)" className="animate-pulse" />
        <circle cx="750" cy="450" r="4" fill="rgba(251,146,60,0.6)" />
      </svg>

      <div className="relative w-[600px] h-[600px] flex items-center justify-center">
        
        {/* 1. Website Redesign (Project Progress) */}
        <motion.div 
          animate={{ y: [-6, 6, -6] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-12 left-0 z-20 w-[340px] bg-white border border-[#E5E7EB] shadow-[0_20px_60px_rgba(15,23,42,0.08)] rounded-[24px] p-5 flex flex-col gap-4 pointer-events-auto hover:-translate-y-1 transition-transform"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-blue-50 text-[#3B82F6]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M2 12l10-6 10 6-10 6-10-6z" />
                  <path d="M2 17l10 6 10-6" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[15px] font-bold text-[#0F172A] leading-tight">Website Redesign</span>
                <span className="text-[12px] font-medium text-[#64748B] leading-tight">Active Project</span>
              </div>
            </div>
            {/* Avatar Stack */}
            <div className="flex -space-x-2">
              <div className="w-7 h-7 rounded-full bg-slate-200 border-2 border-white overflow-hidden"><img src="https://i.pravatar.cc/100?img=1" alt="Avatar" /></div>
              <div className="w-7 h-7 rounded-full bg-slate-200 border-2 border-white overflow-hidden"><img src="https://i.pravatar.cc/100?img=2" alt="Avatar" /></div>
              <div className="w-7 h-7 rounded-full bg-slate-200 border-2 border-white overflow-hidden"><img src="https://i.pravatar.cc/100?img=3" alt="Avatar" /></div>
              <div className="w-7 h-7 rounded-full bg-[#3B82F6] border-2 border-white flex items-center justify-center text-[9px] font-bold text-white">+2</div>
            </div>
          </div>
          
          <div className="flex flex-col gap-2 pt-2">
            <div className="flex justify-between items-end">
              <div className="flex flex-col">
                 <span className="text-[11px] text-[#64748B] font-medium mb-1">Overall Progress</span>
                 <span className="text-2xl font-bold text-[#0F172A] leading-none">72%</span>
              </div>
              <div className="h-2 w-48 bg-[#F1F5F9] rounded-full overflow-hidden relative mb-1">
                <motion.div 
                  animate={{ width: ["0%", "72%"] }}
                  transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                  className="absolute top-0 left-0 h-full bg-[#3B82F6] rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-1 pt-4 border-t border-[#F1F5F9]">
            <div className="flex items-center gap-1.5 text-[12px] text-[#64748B] font-medium">
               <Calendar className="w-3.5 h-3.5" /> Due in 12 days
            </div>
            <div className="px-2.5 py-1 rounded-full bg-blue-50 text-[#3B82F6] text-[11px] font-bold">
               In Progress
            </div>
          </div>
        </motion.div>

        {/* 2. Design Approval */}
        <motion.div 
          animate={{ y: [8, -8, 8] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute top-24 -right-12 z-10 w-[240px] bg-white border border-[#E5E7EB] shadow-[0_20px_60px_rgba(15,23,42,0.06)] rounded-[20px] p-4 flex flex-col gap-3 pointer-events-auto hover:-translate-y-1 transition-transform"
        >
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center h-7 w-7 rounded-lg bg-orange-50 text-[#FB923C] shrink-0">
              <Check className="w-4 h-4 stroke-[3]" />
            </div>
            <span className="text-[14px] font-bold text-[#0F172A] leading-tight">Design Approval</span>
          </div>
          <span className="text-[12px] font-medium text-[#64748B] leading-tight mb-2">Homepage v2</span>
          
          <div className="flex items-center gap-3">
             <div className="h-1.5 w-full bg-[#F1F5F9] rounded-full overflow-hidden relative">
                <motion.div 
                  animate={{ width: ["0%", "75%"] }}
                  transition={{ duration: 2, ease: "easeOut", delay: 0.8 }}
                  className="absolute top-0 left-0 h-full bg-[#FB923C] rounded-full shadow-[0_0_8px_rgba(251,146,60,0.5)]"
                />
             </div>
             <span className="text-[11px] font-bold text-[#64748B]">3/4</span>
          </div>
          
          <div className="mt-1">
             <span className="inline-block px-2.5 py-1 rounded-md bg-orange-50 text-[#FB923C] text-[10px] font-bold uppercase tracking-wider">
               Pending Review
             </span>
          </div>
        </motion.div>

        {/* 3. Team Activity */}
        <motion.div 
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-12 left-10 z-30 w-[280px] bg-white border border-[#E5E7EB] shadow-[0_20px_60px_rgba(15,23,42,0.08)] rounded-[24px] p-5 flex flex-col gap-4 pointer-events-auto hover:-translate-y-1 transition-transform"
        >
          <div className="flex justify-between items-center mb-1">
             <span className="text-[13px] font-bold text-[#0F172A]">Team Activity</span>
             <span className="text-[12px] font-medium text-[#3B82F6] cursor-pointer">View all</span>
          </div>

          <div className="flex flex-col gap-4">
             {/* Item 1 */}
             <div className="flex items-center gap-3">
                <img src="https://i.pravatar.cc/100?img=4" className="w-8 h-8 rounded-full bg-slate-200" alt="Sarah" />
                <div className="flex flex-col flex-1">
                   <p className="text-[12px] text-[#64748B] leading-tight"><span className="font-bold text-[#0F172A]">Sarah</span> commented</p>
                   <p className="text-[11px] text-[#94A3B8]">on Dashboard UI</p>
                </div>
                <div className="flex items-center gap-1.5">
                   <span className="text-[10px] text-[#94A3B8]">2m ago</span>
                   <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                </div>
             </div>
             {/* Item 2 */}
             <div className="flex items-center gap-3">
                <img src="https://i.pravatar.cc/100?img=5" className="w-8 h-8 rounded-full bg-slate-200" alt="James" />
                <div className="flex flex-col flex-1">
                   <p className="text-[12px] text-[#64748B] leading-tight"><span className="font-bold text-[#0F172A]">James</span> uploaded</p>
                   <p className="text-[11px] text-[#94A3B8]">Analytics Report.pdf</p>
                </div>
                <div className="flex items-center gap-1.5">
                   <span className="text-[10px] text-[#94A3B8]">15m ago</span>
                   <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                </div>
             </div>
             {/* Item 3 */}
             <div className="flex items-center gap-3">
                <img src="https://i.pravatar.cc/100?img=6" className="w-8 h-8 rounded-full bg-slate-200" alt="Maya" />
                <div className="flex flex-col flex-1">
                   <p className="text-[12px] text-[#64748B] leading-tight"><span className="font-bold text-[#0F172A]">Maya</span> approved</p>
                   <p className="text-[11px] text-[#94A3B8]">Brand Guidelines</p>
                </div>
                <div className="flex items-center gap-1.5">
                   <span className="text-[10px] text-[#94A3B8]">1h ago</span>
                   <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                </div>
             </div>
          </div>
        </motion.div>

        {/* 4. Client Feedback */}
        <motion.div 
          animate={{ y: [7, -7, 7] }}
          transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
          className="absolute top-1/2 right-0 -translate-y-10 z-20 w-[270px] bg-white border border-[#E5E7EB] shadow-[0_20px_60px_rgba(15,23,42,0.08)] rounded-[20px] p-5 flex flex-col gap-4 pointer-events-auto hover:-translate-y-1 transition-transform"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center h-7 w-7 rounded-lg bg-indigo-50 text-indigo-500">
                <MessageSquare className="w-3.5 h-3.5" />
              </div>
              <span className="text-[13px] font-bold text-[#0F172A]">Client Feedback</span>
            </div>
            <MoreHorizontal className="w-4 h-4 text-[#94A3B8]" />
          </div>
          
          <p className="text-[13px] text-[#0F172A] font-medium leading-relaxed">
             "Looks great! The new layout is much cleaner."
          </p>

          <div className="flex items-center justify-between mt-1 pt-3 border-t border-slate-50">
             <div className="flex items-center gap-2">
                <img src="https://i.pravatar.cc/100?img=7" className="w-7 h-7 rounded-full bg-slate-200" alt="Alex" />
                <div className="flex flex-col">
                   <span className="text-[11px] font-bold text-[#0F172A] leading-tight">Alex Thompson</span>
                   <span className="text-[9px] text-[#64748B]">CEO, Acme Corp</span>
                </div>
             </div>
             <div className="flex items-center gap-0.5">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
             </div>
          </div>
        </motion.div>

        {/* 5. Project Overview */}
        <motion.div 
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-8 right-12 z-10 w-[280px] bg-white border border-[#E5E7EB] shadow-[0_20px_60px_rgba(15,23,42,0.08)] rounded-[20px] p-5 flex flex-col gap-5 pointer-events-auto hover:-translate-y-1 transition-transform"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
               <div className="flex items-center justify-center h-6 w-6 rounded bg-[#3B82F6] text-white">
                 <BarChart2 className="w-3.5 h-3.5" />
               </div>
               <span className="text-[13px] font-bold text-[#0F172A]">Project Overview</span>
            </div>
            <span className="text-[11px] font-medium text-[#3B82F6] cursor-pointer hover:underline">View Report</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
             <div className="flex flex-col gap-1 border-r border-[#F1F5F9] pr-2">
                <span className="text-[10px] font-semibold text-[#64748B]">Tasks Completed</span>
                <div className="flex items-baseline gap-1.5">
                   <span className="text-[20px] font-bold text-[#0F172A] leading-none">48</span>
                   <span className="text-[9px] font-bold text-emerald-500 bg-emerald-50 px-1 py-0.5 rounded">+12%</span>
                </div>
             </div>
             <div className="flex flex-col gap-1 border-r border-[#F1F5F9] px-2">
                <span className="text-[10px] font-semibold text-[#64748B]">In Progress</span>
                <div className="flex items-baseline gap-1.5">
                   <span className="text-[20px] font-bold text-[#0F172A] leading-none">12</span>
                   <span className="text-[9px] font-bold text-red-500 bg-red-50 px-1 py-0.5 rounded">-3%</span>
                </div>
             </div>
             <div className="flex flex-col gap-1 pl-2">
                <span className="text-[10px] font-semibold text-[#64748B]">Pending</span>
                <div className="flex items-baseline gap-1.5">
                   <span className="text-[20px] font-bold text-[#0F172A] leading-none">5</span>
                   <span className="text-[9px] font-bold text-amber-500 bg-amber-50 px-1 py-0.5 rounded">+5%</span>
                </div>
             </div>
          </div>
        </motion.div>
        
      </div>
    </div>
  );
}

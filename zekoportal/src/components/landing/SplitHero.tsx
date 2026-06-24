"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  MessageSquare,
  Bell,
  Zap,
  Users,
  FolderOpen,
  LayoutGrid,
  ChevronRight,
  Circle,
  Search,
  Plus,
  ArrowUp,
  BarChart2,
  MoreHorizontal,
  FileText
} from "lucide-react";

const trustAvatars = [
  { initials: "SC", color: "#6366F1" }, // Indigo
  { initials: "JP", color: "#0EA5E9" }, // Sky blue
  { initials: "MR", color: "#64748B" }, // Slate
  { initials: "AL", color: "#F97316" }, // Orange
  { initials: "KP", color: "#94A3B8" }, // Slate light
];

const projectCards = [
  { name: "Website Redesign", status: "In Progress", progress: 72, color: "#0EA5E9", assignee: "SC" },
  { name: "Mobile App v3", status: "Review", progress: 45, color: "#F97316", assignee: "JP" },
  { name: "Brand Guidelines", status: "Completed", progress: 100, color: "#64748B", assignee: "MR" },
  { name: "Q3 Campaign", status: "In Progress", progress: 28, color: "#38BDF8", assignee: "AL" },
];

const activityFeed = [
  { user: "Sarah", action: "updated a project", time: "2m", avatar: "SC", color: "#6366F1" },
  { user: "James", action: "uploaded a file", time: "10m", avatar: "JP", color: "#0EA5E9" },
  { user: "Maya", action: "completed a task", time: "1h", avatar: "MR", color: "#64748B" },
  { user: "Alex", action: "left a comment", time: "2h", avatar: "AL", color: "#F97316" },
];

export default function SplitHero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-screen bg-background overflow-hidden flex items-center pt-24 pb-20 transition-colors duration-500">
      {/* Subtle background effects */}
      <div className="absolute inset-0 bg-grid-dense opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 60%)" }} />
      <div className="absolute top-1/3 right-[-5%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.04) 0%, transparent 60%)" }} />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-16 lg:gap-14 xl:gap-20 items-center">

        {/* ── LEFT COLUMN: Copy ───────────────────────── */}
        <div
          className={`flex flex-col transition-all duration-700 ease-out pr-0 lg:pr-0 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Section label */}
          <div className="inline-flex items-center gap-2 mb-6 w-fit">
            <span className="h-px w-8 bg-foreground/20" />
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">
              Project & Client Workspace
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-[48px] md:text-[60px] lg:text-[68px] font-bold tracking-tighter leading-[1.05] text-foreground mb-5 max-w-[560px]">
            Where teams<br className="hidden md:block" />
            and <span className="text-gradient-accent">clients</span> get<br className="hidden md:block" />
            work done.
          </h1>

          {/* Subheadline */}
          <p className="text-[17px] md:text-[18px] text-muted-foreground leading-relaxed max-w-[460px] mb-8 font-medium">
            Manage projects, collect approvals, and communicate — all in a single portal your clients can access directly.
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center gap-4 mb-10">
            <Link
              href="/signup"
              className="btn-interactive group inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold text-[14px] px-7 py-3.5 rounded-[8px] hover:bg-primary/90 transition-colors shadow-sm"
            >
              Start for free
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/login"
              className="btn-interactive group inline-flex items-center gap-2 text-[14px] font-semibold text-foreground bg-white hover:bg-gray-50 px-6 py-3.5 rounded-[8px] border border-gray-200 shadow-sm transition-all duration-200"
            >
              <Circle className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              Watch Demo
            </Link>
          </div>

          {/* Floating Trust/Feature Card (Replaces the inline stats) */}
          <div className={`glass-panel p-5 rounded-xl border-crisp shadow-premium max-w-[420px] transition-all duration-700 delay-300 ease-out ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex -space-x-2">
                {trustAvatars.slice(0, 4).map((a) => (
                  <div
                    key={a.initials}
                    className="h-8 w-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white shadow-sm"
                    style={{ backgroundColor: a.color }}
                  >
                    {a.initials}
                  </div>
                ))}
              </div>
              <div className="flex-1">
                <p className="text-[13px] text-muted-foreground font-medium leading-tight">
                  <span className="text-foreground font-bold">500+ teams</span> shipping with ZekoPortal
                </p>
              </div>
            </div>
            
            <div className="h-px w-full bg-border my-4" />
            
            <div className="grid grid-cols-2 gap-y-3 gap-x-2">
              {[
                "Visual project boards",
                "Client approval flows",
                "Team chat & mentions",
                "Workflow automations",
              ].map((feat) => (
                <div key={feat} className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-sky-500 shrink-0" />
                  <span className="text-[11.5px] text-muted-foreground font-medium">{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN: Reconstructed Dashboard Mockup ─── */}
        <div className="relative w-full h-[640px] flex items-center justify-center">
          
          {/* Main Dashboard Container */}
          <div 
            className={`absolute top-0 right-0 w-[115%] h-[580px] bg-card border border-border/80 rounded-[14px] shadow-[0_40px_100px_rgba(15,23,42,0.12)] dark:shadow-[0_40px_100px_rgba(0,0,0,0.5)] overflow-hidden flex transition-all duration-1000 ease-out delay-200 transform origin-right hover:-translate-y-1.5 hover:shadow-[0_50px_120px_rgba(15,23,42,0.15)] dark:hover:shadow-[0_50px_120px_rgba(0,0,0,0.6)] ${
              mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            {/* Glass reflection overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none z-50"></div>

            {/* Sidebar */}
            <div className="w-[180px] border-r border-border bg-muted/30 flex flex-col shrink-0 py-4 px-3">
              <div className="flex items-center gap-2.5 mb-8 px-2">
                <div className="h-6 w-6 rounded-[5px] bg-foreground flex items-center justify-center shadow-sm">
                  <span className="text-background font-extrabold text-[11px]">Z</span>
                </div>
                <span className="text-[13px] font-bold text-foreground">ZekoPortal</span>
              </div>

              <div className="space-y-1">
                {[
                  { icon: LayoutGrid, label: "Overview", active: true },
                  { icon: FolderOpen, label: "Projects", active: false },
                  { icon: CheckCircle2, label: "Tasks", active: false },
                  { icon: Users, label: "Clients", active: false },
                  { icon: Users, label: "Team", active: false },
                  { icon: Bell, label: "Messages", badge: "2" },
                  { icon: FileText, label: "Files", active: false },
                  { icon: BarChart2, label: "Reports", active: false },
                ].map(({ icon: Icon, label, active, badge }) => (
                  <div
                    key={label}
                    className={`flex items-center justify-between px-3 py-2 rounded-[6px] cursor-default transition-colors ${
                      active ? "bg-background border border-border/60 shadow-sm text-foreground" : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`h-4 w-4 ${active ? "text-sky-500" : "text-muted-foreground"}`} />
                      <span className="text-[12px] font-medium">{label}</span>
                    </div>
                    {badge && (
                      <span className="bg-sky-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                        {badge}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Main Workspace Area */}
            <div className="flex-1 flex flex-col bg-card relative z-0">
              
              {/* Topbar */}
              <div className="h-16 border-b border-border flex items-center justify-between px-8 bg-card/80 backdrop-blur-md">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MoreHorizontal className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-6">
                  <div className="relative hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                    <input 
                      disabled
                      placeholder="Search anything..." 
                      className="bg-muted/50 border border-border rounded-full h-8 w-48 pl-8 pr-4 text-[11px] text-foreground focus:outline-none"
                    />
                  </div>
                  <div className="flex -space-x-1.5">
                    {trustAvatars.slice(0, 3).map((a) => (
                      <div key={a.initials} className="h-6 w-6 rounded-full border-2 border-background text-[7px] font-bold text-white flex items-center justify-center shadow-sm"
                        style={{ backgroundColor: a.color }}>
                        {a.initials}
                      </div>
                    ))}
                    <div className="h-6 w-6 rounded-full border border-dashed border-border bg-muted/50 flex items-center justify-center text-muted-foreground">
                      <Plus className="h-3 w-3" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Scrollable Content Area */}
              <div className="flex-1 p-8 overflow-hidden">
                <div className="mb-8">
                  <h2 className="text-[22px] font-bold text-foreground mb-1">Good morning, Alex 👋</h2>
                  <p className="text-[12px] text-muted-foreground">Here's what's happening with your workspace today.</p>
                </div>

                {/* 4 Stat Cards Row */}
                <div className="grid grid-cols-4 gap-4 mb-8">
                  {[
                    { label: "Projects", value: "24", trend: "+12%", color: "text-sky-500" },
                    { label: "Tasks", value: "68", trend: "+8%", color: "text-orange-500" },
                    { label: "In Progress", value: "12", trend: "+18%", color: "text-indigo-500" },
                    { label: "Completed", value: "36", trend: "+24%", color: "text-slate-500" },
                  ].map((stat, i) => (
                    <div key={i} className="bg-card border border-border/80 rounded-[10px] p-4 flex flex-col shadow-sm card-hover">
                      <div className="flex items-center gap-2 mb-3">
                        <FolderOpen className={`h-3.5 w-3.5 ${stat.color}`} />
                        <span className="text-[11px] font-medium text-muted-foreground">{stat.label}</span>
                      </div>
                      <div className="flex items-end gap-3">
                        <span className="text-2xl font-bold text-foreground leading-none">{stat.value}</span>
                        <span className={`text-[10px] font-semibold flex items-center ${stat.color}`}>
                          <ArrowUp className="h-2.5 w-2.5 mr-0.5" />
                          {stat.trend}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-[1.5fr_1fr] gap-8">
                  
                  {/* Recent Projects */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-[13px] font-bold text-foreground">Recent Projects</h3>
                      <span className="text-[11px] text-sky-500 font-semibold cursor-pointer">View all</span>
                    </div>
                    <div className="space-y-2.5">
                      {projectCards.slice(0, 4).map((proj, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-[8px] bg-card border border-border shadow-sm hover:border-muted-foreground/30 hover:shadow-md transition-all">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-[6px] flex items-center justify-center shrink-0" style={{ backgroundColor: `${proj.color}15` }}>
                              <LayoutGrid className="h-4 w-4" style={{ color: proj.color }} />
                            </div>
                            <span className="text-[12px] font-semibold text-foreground">{proj.name}</span>
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-1 rounded-[4px] ${
                            proj.status === "Completed" ? "bg-slate-100 text-slate-600 dark:bg-slate-500/20 dark:text-slate-300" :
                            proj.status === "Review" ? "bg-orange-50 text-orange-600 dark:bg-orange-500/20 dark:text-orange-300" :
                            "bg-sky-50 text-sky-600 dark:bg-sky-500/20 dark:text-sky-300"
                          }`}>
                            {proj.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Team Activity */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-[13px] font-bold text-foreground">Team Activity</h3>
                      <span className="text-[11px] text-sky-500 font-semibold cursor-pointer">View all</span>
                    </div>
                    <div className="space-y-4">
                      {activityFeed.map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="h-7 w-7 rounded-full flex items-center justify-center text-[9px] font-bold text-white shrink-0 shadow-sm" style={{ backgroundColor: item.color }}>
                            {item.avatar}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[12px] text-muted-foreground font-medium">
                              <span className="text-foreground font-bold">{item.user}</span> {item.action}
                            </span>
                            <span className="text-[10px] text-muted-foreground">{item.time} ago</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* ── FLOATING DEPTH ELEMENTS ───────────────── */}
          
          {/* 1. Team Productivity Chart (Floating Right) */}
          <div 
            className={`absolute top-[25%] -right-[5%] w-[160px] glass-panel bg-card/95 backdrop-blur-xl border border-border/80 rounded-[12px] p-4 shadow-premium transition-all duration-700 delay-500 ease-out z-20 hover:-translate-y-1 hover:shadow-2xl ${
              mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <h4 className="text-[11px] font-bold text-foreground mb-1">Team Productivity</h4>
            <div className="flex items-end gap-1 mb-4">
              <span className="text-xl font-bold text-foreground">+24%</span>
              <span className="text-[9px] text-muted-foreground mb-1">vs last week</span>
            </div>
            <div className="flex items-end gap-1.5 h-10 w-full">
              {[30, 50, 40, 60, 45, 80, 100].map((h, i) => (
                <div key={i} className="flex-1 bg-sky-500/80 rounded-sm" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>

          {/* 2. Upcoming Deadlines (Floating Bottom Right) */}
          <div 
            className={`absolute -bottom-[5%] right-[10%] w-[220px] glass-panel bg-card/95 backdrop-blur-xl border border-border/80 rounded-[12px] p-4 shadow-premium transition-all duration-700 delay-[600ms] ease-out z-20 hover:-translate-y-1 hover:shadow-2xl ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-[11px] font-bold text-foreground">Upcoming Deadlines</h4>
              <span className="text-[9px] text-sky-500 font-semibold cursor-pointer">View all</span>
            </div>
            <div className="space-y-3">
              {[
                { label: "Landing Page Design", date: "May 24, 2024", color: "border-sky-500" },
                { label: "Client Review Meeting", date: "May 25, 2024", color: "border-orange-500" },
                { label: "API Integration", date: "May 28, 2024", color: "border-slate-500" },
              ].map((task, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`h-2.5 w-2.5 rounded-full border-[2px] bg-transparent ${task.color}`} />
                    <span className="text-[11px] text-foreground font-medium">{task.label}</span>
                  </div>
                  <span className="text-[9px] text-muted-foreground">{task.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Integrations Dock (Floating Bottom Center) */}
          <div 
            className={`absolute -bottom-[8%] left-[30%] glass-panel bg-card/95 backdrop-blur-xl border border-border/80 rounded-[12px] p-2 flex items-center gap-2 shadow-premium transition-all duration-700 delay-[700ms] ease-out z-20 hover:-translate-y-1 hover:shadow-2xl ${
              mounted ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
            }`}
          >
            {[
              { name: "Slack", color: "#E5A929", initial: "S" },
              { name: "Notion", color: "#F9FAFB", initial: "N", text: "#111827", border: "border-gray-200" },
              { name: "Drive", color: "#1FA463", initial: "D" },
              { name: "Figma", color: "#F24E1E", initial: "F" },
            ].map((app, i) => (
              <div key={i} className={`h-8 w-8 rounded-[8px] flex items-center justify-center text-[12px] font-black shadow-sm ${app.border ? `border ${app.border}` : ''}`} style={{ backgroundColor: app.color, color: app.text || "#FFF" }}>
                {app.initial}
              </div>
            ))}
            <div className="h-8 w-8 rounded-[8px] bg-muted/50 border border-border flex items-center justify-center cursor-pointer hover:bg-muted transition-colors">
              <Plus className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>

        </div>
      </div>
</section>
  );
}

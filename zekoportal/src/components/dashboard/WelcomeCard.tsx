"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, TrendingUp, FolderKanban, ArrowRight } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useProjects } from "@/lib/projects-context";

export default function WelcomeCard() {
  const { user } = useAuth();
  const { projects, loading } = useProjects();
  
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const activeCount = projects.filter((p) => p.status === "active").length;
  const reviewCount = projects.filter((p) => p.status === "in_review").length;
  const totalProgress = projects.length > 0
    ? Math.round(projects.reduce((a, p) => a + p.progress, 0) / projects.length)
    : 0;

  return (
    <div className="relative w-full rounded-xl border border-white/8 overflow-hidden">
      {/* Gradient background layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/12 via-primary/4 to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-primary/10 blur-[80px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-violet-600/8 blur-[60px] translate-y-1/2 pointer-events-none" />

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      {/* Content */}
      <div className="relative px-6 py-7 md:px-8 md:py-8 z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Left: greeting & summary */}
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-primary/25 bg-primary/10 text-[10px] font-bold text-primary uppercase tracking-widest">
                <Sparkles className="h-3 w-3" />
                Client Portal Active
              </div>
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                {greeting},{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400">
                  {user?.displayName?.split(" ")[0] || "User"}
                </span>
              </h2>
              {loading ? (
                 <div className="h-4 w-48 bg-white/10 rounded animate-pulse mt-2" />
              ) : (
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
                  You have{" "}
                  <span className="font-semibold text-white">{activeCount} active project{activeCount !== 1 ? "s" : ""}</span>{" "}
                  in development
                  {reviewCount > 0 && (
                    <>
                      {" "}and{" "}
                      <span className="font-semibold text-amber-400">
                        {reviewCount} awaiting your review
                      </span>
                    </>
                  )}
                  . Your portfolio is{" "}
                  <span className="font-semibold text-white">{totalProgress}% complete</span> overall.
                </p>
              )}
            </div>

            {/* Inline mini stat pills */}
            <div className="flex flex-wrap gap-2 pt-1">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/8 text-xs font-medium text-zinc-300">
                <TrendingUp className="h-3 w-3 text-primary" />
                {activeCount} Active
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/8 text-xs font-medium text-zinc-300">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                {reviewCount} In Review
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/8 text-xs font-medium text-zinc-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {totalProgress}% Portfolio Progress
              </div>
            </div>
          </div>

          {/* Right: CTA buttons */}
          <div className="flex flex-row md:flex-col gap-2.5 shrink-0">
            <Link href="/projects">
              <button className="flex items-center gap-2 h-9 px-4 rounded-lg border border-border/80 bg-white/5 text-xs font-semibold text-white hover:bg-white/10 hover:border-border active:scale-95 transition-all cursor-pointer whitespace-nowrap">
                <FolderKanban className="h-3.5 w-3.5 text-primary" />
                Browse Projects
              </button>
            </Link>
            <Link href="/messages">
              <button className="flex items-center gap-2 h-9 px-4 rounded-lg bg-primary text-xs font-semibold text-white hover:bg-primary/90 shadow-md shadow-primary/25 active:scale-95 transition-all cursor-pointer whitespace-nowrap">
                Send Message
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

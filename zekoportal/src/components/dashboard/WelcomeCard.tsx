"use client";

import React from "react";
import Link from "next/link";
import { TrendingUp, FolderKanban, ArrowRight } from "lucide-react";
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
  const totalProgress =
    projects.length > 0
      ? Math.round(
          projects.reduce((a, p) => a + p.progress, 0) / projects.length
        )
      : 0;

  return (
    <div className="w-full rounded-lg border border-[#27272A] bg-[#111827] overflow-hidden">
      <div className="px-6 py-6 md:px-7 md:py-7">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          {/* Left: greeting & summary */}
          <div className="space-y-3 max-w-2xl">
            {/* Status pill */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#27272A] bg-[#09090B] text-[10px] font-semibold text-[#A1A1AA] uppercase tracking-wider">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
              Client Portal
            </div>

            <div className="space-y-1">
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-white">
                {greeting},{" "}
                <span className="text-[#A1A1AA]">
                  {user?.displayName?.split(" ")[0] || "User"}
                </span>
              </h2>
              {loading ? (
                <div className="h-4 w-52 skeleton rounded mt-1" />
              ) : (
                <p className="text-sm text-[#A1A1AA] leading-relaxed">
                  You have{" "}
                  <span className="font-medium text-white">
                    {activeCount} active project{activeCount !== 1 ? "s" : ""}
                  </span>{" "}
                  in development
                  {reviewCount > 0 && (
                    <>
                      {" "}and{" "}
                      <span className="font-medium text-orange-500">
                        {reviewCount} awaiting review
                      </span>
                    </>
                  )}
                  . Portfolio is{" "}
                  <span className="font-medium text-white">
                    {totalProgress}% complete
                  </span>
                  .
                </p>
              )}
            </div>

            {/* Stat pills */}
            <div className="flex flex-wrap gap-2 pt-0.5">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[#27272A] bg-[#09090B] text-xs font-medium text-[#A1A1AA]">
                <TrendingUp className="h-3 w-3 text-primary" />
                {activeCount} Active
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[#27272A] bg-[#09090B] text-xs font-medium text-[#A1A1AA]">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                {reviewCount} In Review
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[#27272A] bg-[#09090B] text-xs font-medium text-[#A1A1AA]">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                {totalProgress}% Overall
              </div>
            </div>
          </div>

          {/* Right: CTA buttons */}
          <div className="flex flex-row md:flex-col gap-2 shrink-0">
            <Link href="/projects">
              <button className="flex items-center gap-2 h-8 px-3.5 rounded-md border border-[#27272A] bg-[#09090B] text-xs font-medium text-white hover:bg-[#1F2937] hover:border-[#3F3F46] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap">
                <FolderKanban className="h-3.5 w-3.5 text-[#A1A1AA]" />
                Browse Projects
              </button>
            </Link>
            <Link href="/messages">
              <button className="flex items-center gap-2 h-8 px-3.5 rounded-md bg-primary text-xs font-medium text-white hover:bg-primary/90 active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap">
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

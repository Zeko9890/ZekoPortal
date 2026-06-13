"use client";

import React from "react";
import Link from "next/link";
import { Clock, CalendarDays, AlertCircle, ArrowUpRight } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { useProjects } from "@/lib/projects-context";

export default function UpcomingDeadlines() {
  const { loading } = useProjects();

  const upcomingDeadlines: any[] = [];

  const getUrgency = (dateStr: string) => {
    const days =
      (new Date(dateStr).getTime() - new Date().getTime()) / (1000 * 3600 * 24);
    if (days < 0)
      return { label: "Overdue", color: "text-red-400", bg: "bg-red-500/8 border-red-500/20" };
    if (days <= 3)
      return { label: "Urgent", color: "text-amber-400", bg: "bg-amber-500/8 border-amber-500/20" };
    if (days <= 7)
      return { label: "Upcoming", color: "text-sky-400", bg: "bg-sky-500/8 border-sky-500/20" };
    return { label: "On Track", color: "text-emerald-400", bg: "bg-emerald-500/8 border-emerald-500/20" };
  };

  return (
    <div className="rounded-lg border border-[#262626] bg-[#111111] p-5 h-full flex flex-col">
      <div className="flex justify-between items-center pb-4 mb-4 border-b border-[#262626]">
        <h3 className="text-[12px] font-semibold text-white uppercase tracking-wider flex items-center gap-2">
          <CalendarDays className="h-3.5 w-3.5 text-primary" />
          Deadlines
        </h3>
        <Link href="/projects">
          <button className="text-[10px] font-medium text-[#737373] hover:text-white uppercase tracking-wider transition-colors flex items-center gap-1 cursor-pointer">
            View All <ArrowUpRight className="h-3 w-3" />
          </button>
        </Link>
      </div>

      {loading ? (
        <div className="flex-1 flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 skeleton rounded-md" />
          ))}
        </div>
      ) : upcomingDeadlines.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center gap-2 p-6">
          <div className="h-8 w-8 rounded-md bg-[#1a1a1a] border border-[#262626] flex items-center justify-center mb-1">
            <Clock className="h-4 w-4 text-[#525252]" />
          </div>
          <p className="text-sm font-medium text-white">All clear</p>
          <p className="text-xs text-[#737373] max-w-[180px] leading-relaxed">
            No pending deadlines. All milestones are on track.
          </p>
        </div>
      ) : (
        <div className="space-y-3 flex-1">
          {upcomingDeadlines.map((deadline) => {
            const urgency = getUrgency(deadline.dueDate);

            return (
              <div
                key={deadline.id}
                className="flex flex-col gap-2.5 p-3.5 rounded-md border border-[#262626] bg-[#0A0A0A] hover:border-[#404040] hover:bg-[#141414] transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-0.5 min-w-0 flex-1">
                    <p className="text-[13px] font-medium text-white truncate leading-tight">
                      {deadline.title}
                    </p>
                    <Link
                      href={`/projects/${deadline.projectId}`}
                      className="text-[11px] text-[#737373] hover:text-white flex items-center gap-1 mt-0.5 transition-colors"
                    >
                      {deadline.projectName}
                    </Link>
                  </div>
                  <div
                    className={cn(
                      "flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium tracking-wide shrink-0 border",
                      urgency.color,
                      urgency.bg
                    )}
                  >
                    {urgency.label === "Overdue" && (
                      <AlertCircle className="h-3 w-3" />
                    )}
                    {urgency.label}
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-1.5 text-[#737373]">
                    <Clock className="h-3 w-3" />
                    {formatDate(deadline.dueDate)}
                  </div>
                  <span className="text-[#737373]">
                    {deadline.progress}%{" "}
                    <span className="text-white font-medium">complete</span>
                  </span>
                </div>

                <Progress value={deadline.progress} className="h-1" />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

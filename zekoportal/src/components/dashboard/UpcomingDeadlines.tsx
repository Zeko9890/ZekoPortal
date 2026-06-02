"use client";

import React from "react";
import Link from "next/link";
import { Clock, CalendarDays, AlertCircle, ArrowUpRight } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { useProjects } from "@/lib/projects-context";

export default function UpcomingDeadlines() {
  const { projects, loading } = useProjects();

  // Firestore projects don't currently support nested milestones.
  // We'll leave this empty for now or populate if we add a milestones subcollection later.
  const upcomingDeadlines: any[] = [];

  const getUrgency = (dateStr: string) => {
    const days = (new Date(dateStr).getTime() - new Date().getTime()) / (1000 * 3600 * 24);
    if (days < 0) return { label: "Overdue", color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20" };
    if (days <= 3) return { label: "Urgent", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" };
    if (days <= 7) return { label: "Upcoming", color: "text-sky-400", bg: "bg-sky-500/10", border: "border-sky-500/20" };
    return { label: "On Track", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" };
  };

  return (
    <div className="rounded-xl border border-border/80 bg-card p-6 shadow-md h-full flex flex-col">
      <div className="flex justify-between items-center pb-5 mb-5 border-b border-border/50">
        <h3 className="text-[13px] font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-primary" />
          Milestone Deadlines
        </h3>
        <Link href="/projects">
          <button className="text-[10px] font-bold text-muted-foreground hover:text-white uppercase tracking-widest transition-colors flex items-center gap-1 cursor-pointer">
            View All <ArrowUpRight className="h-3 w-3" />
          </button>
        </Link>
      </div>

      {loading ? (
        <div className="flex-1 flex flex-col items-center justify-center space-y-2 text-muted-foreground p-6">
           <div className="h-6 w-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      ) : upcomingDeadlines.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-2 text-muted-foreground p-6">
          <div className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-2">
            <Clock className="h-5 w-5 opacity-50" />
          </div>
          <p className="text-sm font-semibold text-white">No pending deadlines</p>
          <p className="text-xs max-w-[200px] leading-relaxed">All milestones are currently up to date.</p>
        </div>
      ) : (
        <div className="space-y-4 flex-1">
          {upcomingDeadlines.map(deadline => {
            const urgency = getUrgency(deadline.dueDate);
            
            return (
              <div 
                key={deadline.id} 
                className="group flex flex-col gap-2.5 p-3.5 rounded-lg border border-border/40 bg-white/[0.02] hover:bg-white/[0.04] hover:border-border transition-all cursor-default"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-0.5 min-w-0 flex-1">
                    <p className="text-[13px] font-bold text-white truncate leading-tight group-hover:text-primary transition-colors">
                      {deadline.title}
                    </p>
                    <Link href={`/projects/${deadline.projectId}`} className="text-[11px] font-medium text-muted-foreground hover:text-white hover:underline flex items-center gap-1 mt-1 truncate max-w-fit transition-colors">
                       {deadline.projectName}
                    </Link>
                  </div>
                  <div className={cn("flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide shrink-0 border", urgency.bg, urgency.color, urgency.border)}>
                    {urgency.label === "Overdue" && <AlertCircle className="h-3 w-3" />}
                    {urgency.label}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-1 text-[11px] font-medium">
                   <div className="flex items-center gap-1.5 text-zinc-300 bg-white/5 px-2 py-1 rounded border border-white/5">
                     <Clock className="h-3 w-3 text-muted-foreground" />
                     {formatDate(deadline.dueDate)}
                   </div>
                   
                   <span className="text-muted-foreground flex items-center gap-1.5">
                     Progress
                     <span className="text-white font-bold">{deadline.progress}%</span>
                   </span>
                </div>
                
                <Progress value={deadline.progress} className="h-1.5 mt-1" />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

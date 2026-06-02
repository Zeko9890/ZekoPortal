"use client";

import React from "react";
import Link from "next/link";
import { 
  FileText, 
  MessageSquare, 
  Trophy, 
  CircleDot,
  ToggleLeft,
  Calendar,
  Sparkles,
  ArrowUpRight
} from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import { useProjects } from "@/lib/projects-context";

export default function RecentActivity() {
  const { projects, loading } = useProjects();

  // Firestore projects don't currently support nested activities.
  // We'll leave this empty for now or populate if we add an activities subcollection later.
  const allActivities: any[] = [];

  const getIconDetails = (type: string) => {
    switch (type) {
      case "document":
        return { icon: FileText, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" };
      case "message":
        return { icon: MessageSquare, color: "text-sky-400", bg: "bg-sky-500/10", border: "border-sky-500/20" };
      case "milestone":
        return { icon: Trophy, color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/20" };
      case "status":
        return { icon: ToggleLeft, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" };
      default:
        return { icon: CircleDot, color: "text-zinc-400", bg: "bg-zinc-500/10", border: "border-zinc-500/20" };
    }
  };

  return (
    <div className="rounded-xl border border-border/80 bg-card p-6 shadow-md h-full flex flex-col">
      <div className="flex justify-between items-center pb-5 mb-5 border-b border-border/50">
        <h3 className="text-[13px] font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          Recent Activity Feed
        </h3>
        <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-semibold px-2 py-1 rounded-md bg-white/5 border border-white/5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Live Sync
        </span>
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
           <div className="h-6 w-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      ) : allActivities.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-xs text-muted-foreground p-6">
           <CircleDot className="h-6 w-6 mb-2 opacity-20" />
           No recent activities found.
        </div>
      ) : (
        <div className="relative pl-5 border-l-2 border-border/60 space-y-7 flex-1">
          {allActivities.map((act) => {
            const { icon: Icon, color, bg, border } = getIconDetails(act.type);

            return (
              <div key={act.id} className="relative group">
                {/* Timeline node */}
                <div className={cn(
                  "absolute -left-[29px] top-0.5 h-6 w-6 rounded-full border flex items-center justify-center bg-card shrink-0 transition-all duration-200 group-hover:scale-110 group-hover:shadow-lg",
                  color, bg, border
                )}>
                  <Icon className="h-3 w-3" />
                </div>

                <div className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <span className="text-[13px] font-bold text-white group-hover:text-primary transition-colors duration-200">
                      {act.title}
                    </span>
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1.5 font-medium shrink-0">
                      <Calendar className="h-3 w-3 shrink-0" />
                      {formatDate(act.timestamp)}
                    </span>
                  </div>

                  <p className="text-[12px] text-zinc-400 leading-relaxed max-w-xl">
                    {act.description}
                  </p>

                  <div className="flex items-center gap-3 pt-1 text-[10px] font-semibold">
                    <span className="text-muted-foreground">Project:</span>
                    <Link href={`/projects/${act.projectId}`} className="flex items-center gap-1 text-white hover:text-primary hover:underline transition-colors">
                      {act.projectName}
                      <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      
      {allActivities.length > 0 && (
        <div className="mt-6 pt-4 border-t border-border/40 text-center">
           <button className="text-[11px] font-semibold text-muted-foreground hover:text-white transition-colors cursor-pointer">
             Load More Activity
           </button>
        </div>
      )}
    </div>
  );
}

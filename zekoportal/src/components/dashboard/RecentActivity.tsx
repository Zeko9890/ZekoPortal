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
  ArrowUpRight,
} from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import { useProjects } from "@/lib/projects-context";

export default function RecentActivity() {
  const { loading } = useProjects();

  const allActivities: any[] = [];

  const getIconDetails = (type: string) => {
    switch (type) {
      case "document":
        return { icon: FileText, color: "text-emerald-400", bg: "bg-emerald-500/10" };
      case "message":
        return { icon: MessageSquare, color: "text-sky-400", bg: "bg-sky-500/10" };
      case "milestone":
        return { icon: Trophy, color: "text-orange-400", bg: "bg-orange-500/10" };
      case "status":
        return { icon: ToggleLeft, color: "text-amber-400", bg: "bg-amber-500/10" };
      default:
        return { icon: CircleDot, color: "text-[#525252]", bg: "bg-[#1a1a1a]" };
    }
  };

  return (
    <div className="rounded-lg border border-[#262626] bg-[#111111] p-5 h-full flex flex-col">
      <div className="flex justify-between items-center pb-4 mb-4 border-b border-[#262626]">
        <h3 className="text-[12px] font-semibold text-white uppercase tracking-wider">
          Activity Feed
        </h3>
        <span className="flex items-center gap-1.5 text-[10px] text-[#737373] font-medium px-2 py-1 rounded-md bg-[#0A0A0A] border border-[#262626]">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Live
        </span>
      </div>

      {loading ? (
        <div className="flex-1 flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-14 skeleton rounded-md" />
          ))}
        </div>
      ) : allActivities.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center gap-2 p-6">
          <div className="h-8 w-8 rounded-md bg-[#1a1a1a] border border-[#262626] flex items-center justify-center mb-1">
            <CircleDot className="h-4 w-4 text-[#525252]" />
          </div>
          <p className="text-sm font-medium text-white">No activity yet</p>
          <p className="text-xs text-[#737373] max-w-[180px] leading-relaxed">
            Activity will appear here as you work on projects.
          </p>
        </div>
      ) : (
        <div className="relative pl-5 border-l border-[#262626] space-y-6 flex-1">
          {allActivities.map((act) => {
            const { icon: Icon, color, bg } = getIconDetails(act.type);

            return (
              <div key={act.id} className="relative group">
                <div
                  className={cn(
                    "absolute -left-[21px] top-0.5 h-5 w-5 rounded-md border border-[#262626] flex items-center justify-center bg-[#111111] shrink-0 transition-colors",
                    color, bg
                  )}
                >
                  <Icon className="h-3 w-3" />
                </div>

                <div className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <span className="text-[13px] font-medium text-white">
                      {act.title}
                    </span>
                    <span className="text-[10px] text-[#737373] flex items-center gap-1.5 shrink-0">
                      <Calendar className="h-3 w-3 shrink-0" />
                      {formatDate(act.timestamp)}
                    </span>
                  </div>

                  <p className="text-[12px] text-[#737373] leading-relaxed">
                    {act.description}
                  </p>

                  <div className="flex items-center gap-2 pt-0.5 text-[10px]">
                    <span className="text-[#525252]">Project:</span>
                    <Link
                      href={`/projects/${act.projectId}`}
                      className="flex items-center gap-1 text-[#A3A3A3] hover:text-white transition-colors"
                    >
                      {act.projectName}
                      <ArrowUpRight className="h-2.5 w-2.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {allActivities.length > 0 && (
        <div className="mt-5 pt-4 border-t border-[#262626] text-center">
          <button className="text-[11px] font-medium text-[#737373] hover:text-white transition-colors cursor-pointer">
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

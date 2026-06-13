"use client";

import React from "react";
import {
  Layers,
  Clock,
  CheckCircle2,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import { mockConversations } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useProjects } from "@/lib/projects-context";

export default function StatsGrid() {
  const { projects, loading } = useProjects();

  const activeCount = projects.filter((p) => p.status === "active").length;
  const reviewCount = projects.filter((p) => p.status === "in_review").length;
  const completedCount = projects.filter((p) => p.status === "completed").length;

  const totalUnreadMessages = mockConversations.reduce(
    (acc, curr) => acc + curr.unreadCount,
    0
  );

  const stats = [
    {
      title: "Active Projects",
      value: activeCount,
      description: "Under development",
      icon: Layers,
      iconColor: "text-sky-400",
      accentColor: "bg-sky-400",
      link: "/projects?status=active",
    },
    {
      title: "Pending Review",
      value: reviewCount,
      description: "Awaiting feedback",
      icon: Clock,
      iconColor: "text-amber-400",
      accentColor: "bg-amber-400",
      link: "/projects?status=in_review",
    },
    {
      title: "Completed",
      value: completedCount,
      description: "Delivered & archived",
      icon: CheckCircle2,
      iconColor: "text-emerald-400",
      accentColor: "bg-emerald-400",
      link: "/projects?status=completed",
    },
    {
      title: "Unread Messages",
      value: totalUnreadMessages,
      description: "From product team",
      icon: MessageSquare,
      iconColor: "text-sky-400",
      accentColor: "bg-sky-400",
      link: "/messages",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
      {stats.map((stat, i) => {
        const Icon = stat.icon;

        return (
          <Link key={i} href={stat.link} className="block group">
            <div className="h-full rounded-lg border border-[#27272A] bg-[#111827] p-4 relative overflow-hidden hover:border-[#3F3F46] hover:bg-[#1F2937] transition-all duration-150">
              {/* Top accent line */}
              <div className={cn("absolute top-0 left-0 right-0 h-[1px] opacity-60", stat.accentColor)} />

              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] font-semibold text-[#A1A1AA] uppercase tracking-wider">
                  {stat.title}
                </span>
                <div className={cn("h-7 w-7 rounded-md bg-[#1F2937] border border-[#27272A] flex items-center justify-center shrink-0", stat.iconColor)}>
                  <Icon className="h-3.5 w-3.5" />
                </div>
              </div>

              <div className="text-[28px] font-semibold text-white tracking-tight leading-none mb-3">
                {loading ? (
                  <div className="h-7 w-10 skeleton rounded" />
                ) : (
                  stat.value
                )}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#1F2937]">
                <span className="text-[11px] text-[#A1A1AA]">
                  {stat.description}
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-[#71717A] group-hover:text-white group-hover:translate-x-0.5 transition-all duration-150" />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

"use client";

import React from "react";
import { 
  Layers, 
  Clock, 
  CheckCircle2, 
  MessageSquare,
  TrendingUp,
  ArrowRight
} from "lucide-react";
import { mockConversations } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useProjects } from "@/lib/projects-context";

export default function StatsGrid() {
  const { projects, loading } = useProjects();
  
  const activeCount = projects.filter(p => p.status === "active").length;
  const reviewCount = projects.filter(p => p.status === "in_review").length;
  const completedCount = projects.filter(p => p.status === "completed").length;
  
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
      color: "text-violet-400",
      bgColor: "bg-violet-500/10",
      borderColor: "border-violet-500/20",
      trend: "+1 this month",
      link: "/projects?status=active"
    },
    {
      title: "Pending Review",
      value: reviewCount,
      description: "Awaiting feedback",
      icon: Clock,
      color: "text-amber-400",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/20",
      trend: "2 steps remaining",
      link: "/projects?status=in_review"
    },
    {
      title: "Completed Projects",
      value: completedCount,
      description: "Delivered & archived",
      icon: CheckCircle2,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
      trend: "100% SLA score",
      link: "/projects?status=completed"
    },
    {
      title: "Unread Messages",
      value: totalUnreadMessages,
      description: "From product team",
      icon: MessageSquare,
      color: "text-sky-400",
      bgColor: "bg-sky-500/10",
      borderColor: "border-sky-500/20",
      trend: "< 1h response",
      link: "/messages"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, i) => {
        const Icon = stat.icon;

        return (
          <Link key={i} href={stat.link} className="block group">
            <div
              className="card-interactive h-full rounded-xl border border-border/80 bg-card p-5 relative overflow-hidden"
            >
              {/* Subtle top gradient line corresponding to stat color */}
              <div className={cn("absolute top-0 left-0 right-0 h-[2px] opacity-50", stat.bgColor.replace('/10', ''))} />
              
              <div className="flex justify-between items-start mb-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    {stat.title}
                  </span>
                  <div className="text-3xl font-bold text-white tracking-tight flex items-baseline gap-1.5 pt-0.5">
                    {loading ? (
                       <div className="h-8 w-12 bg-white/10 rounded animate-pulse" />
                    ) : (
                       stat.value
                    )}
                  </div>
                </div>
                <div className={cn("h-9 w-9 rounded-lg border flex items-center justify-center shrink-0 shadow-inner", stat.color, stat.bgColor, stat.borderColor)}>
                  <Icon className="h-4.5 w-4.5" />
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/40">
                <div className="flex flex-col">
                   <span className="text-[11px] text-muted-foreground font-medium">{stat.description}</span>
                   <span className="text-[10px] text-zinc-300 font-semibold flex items-center gap-1 mt-0.5">
                     <TrendingUp className={cn("h-3 w-3 shrink-0", stat.color)} />
                     {stat.trend}
                   </span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-white transition-colors translate-x-0 group-hover:translate-x-1 duration-200" />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

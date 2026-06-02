"use client";

import React from "react";
import WelcomeCard from "@/components/dashboard/WelcomeCard";
import StatsGrid from "@/components/dashboard/StatsGrid";
import RecentActivity from "@/components/dashboard/RecentActivity";
import UpcomingDeadlines from "@/components/dashboard/UpcomingDeadlines";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Personalized Welcome Card */}
      <WelcomeCard />

      {/* Overview Analytics Stats Grid */}
      <StatsGrid />

      {/* Double Column Layout for feeds */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left side: Timeline updates Feed */}
        <div className="lg:col-span-3">
          <RecentActivity />
        </div>

        {/* Right side: Urgent Deadlines list */}
        <div className="lg:col-span-2">
          <UpcomingDeadlines />
        </div>
      </div>
    </div>
  );
}

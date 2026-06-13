"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Briefcase,
  MessageSquare,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { mockUserProfile } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth-context";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
}

const menuItems: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Projects", href: "/projects", icon: Briefcase },
  { name: "Messages", href: "/messages", icon: MessageSquare, badge: 2 },
  { name: "Settings", href: "/settings", icon: Settings },
];

const recentProjects = [
  { name: "Skynet Redesign", id: "proj-1", color: "bg-orange-400" },
  { name: "AI Engine API", id: "proj-2", color: "bg-emerald-400" },
  { name: "Mobile App", id: "proj-3", color: "bg-amber-400" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col h-screen bg-[#0A0A0A] border-r border-[#262626] transition-all duration-200 relative z-20 shrink-0",
        isCollapsed ? "w-[68px]" : "w-60"
      )}
    >
      {/* ── Brand Header ── */}
      <div className="h-[56px] flex items-center px-4 border-b border-[#262626] shrink-0">
        <Link href="/dashboard" className="flex items-center gap-2.5 min-w-0">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary font-bold text-xs text-white select-none">
            Z
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                key="brand"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="font-semibold tracking-tight text-white text-sm whitespace-nowrap"
              >
                Zeko<span className="text-primary">Portal</span>
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* ── Navigation ── */}
      <div className="flex-1 py-4 px-2 flex flex-col gap-5 overflow-y-auto">
        {/* Main nav */}
        <div className="flex flex-col gap-0.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <Link key={item.name} href={item.href}>
                <div
                  className={cn(
                    "group relative flex items-center gap-2.5 px-3 py-2 rounded-md text-[13px] font-medium transition-all duration-100 cursor-pointer nav-item",
                    isActive
                      ? "nav-active text-white"
                      : "text-[#737373] hover:bg-white/4 hover:text-[#FAFAFA]"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4 shrink-0 transition-colors duration-100",
                      isActive ? "text-primary" : "group-hover:text-[#FAFAFA]"
                    )}
                  />

                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.span
                        key={item.name}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.12 }}
                        className="flex-1 truncate"
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* Badge */}
                  {item.badge && !isCollapsed && (
                    <span className="ml-auto flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-primary/15 px-1 text-[10px] font-semibold text-primary leading-none">
                      {item.badge}
                    </span>
                  )}
                  {item.badge && isCollapsed && (
                    <span className="absolute top-1 right-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
                  )}

                  {/* Tooltip */}
                  {isCollapsed && (
                    <div className="pointer-events-none absolute left-[calc(100%+10px)] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md bg-[#111111] border border-[#262626] px-2.5 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-xl z-50">
                      {item.name}
                      <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[#262626]" />
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Recent Projects */}
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              key="recent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex flex-col gap-0.5"
            >
              <p className="heading-section px-3 mb-1.5">Recent</p>
              {recentProjects.map((project) => (
                <Link key={project.id} href={`/projects/${project.id}`}>
                  <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-md text-[12px] font-medium text-[#737373] hover:bg-white/4 hover:text-[#FAFAFA] transition-colors cursor-pointer">
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full shrink-0",
                        project.color
                      )}
                    />
                    <span className="truncate">{project.name}</span>
                  </div>
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── User Footer ── */}
      <div className="shrink-0 border-t border-[#262626] p-2 space-y-0.5">
        <div
          className={cn(
            "flex items-center gap-2.5 px-3 py-2 rounded-md",
            isCollapsed && "justify-center px-0"
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={user?.photoURL || mockUserProfile.avatar}
            alt={user?.displayName || "User"}
            className="h-6 w-6 shrink-0 rounded-full border border-[#262626] object-cover"
          />
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                key="user"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.12 }}
                className="flex flex-col min-w-0"
              >
                <span className="text-[12px] font-medium text-white truncate leading-tight">
                  {user?.displayName || "Portal User"}
                </span>
                <span className="text-[10px] text-[#737373] truncate mt-0.5">
                  {user?.email || "No email"}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              key="logout"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
            >
              <button
                onClick={handleLogout}
                className="flex items-center w-full gap-2.5 px-3 py-2 rounded-md text-[12px] font-medium text-[#737373] hover:bg-red-500/6 hover:text-red-400 transition-colors cursor-pointer"
              >
                <LogOut className="h-3.5 w-3.5 shrink-0" />
                <span>Sign out</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Collapse Toggle ── */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-[68px] flex h-5 w-5 items-center justify-center rounded-full border border-[#262626] bg-[#111111] text-[#737373] hover:text-white shadow-md hover:border-[#404040] cursor-pointer transition-colors z-30"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </button>
    </aside>
  );
}

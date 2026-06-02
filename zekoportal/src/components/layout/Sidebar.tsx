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
  ShieldCheck,
  Circle,
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
  { name: "Skynet Redesign", id: "proj-1", color: "bg-violet-500" },
  { name: "AI Engine API", id: "proj-2", color: "bg-emerald-500" },
  { name: "Mobile App", id: "proj-3", color: "bg-amber-500" },
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
        "hidden md:flex flex-col h-screen bg-[hsl(240_10%_3%)] border-r border-border/60 transition-all duration-300 relative z-20 shrink-0",
        isCollapsed ? "w-[72px]" : "w-64"
      )}
    >
      {/* ── Brand Header ───────────────────────────────────────── */}
      <div className="h-[60px] flex items-center px-4 border-b border-border/60 shrink-0">
        <Link href="/dashboard" className="flex items-center gap-3 min-w-0">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary shadow-lg shadow-primary/30 font-bold text-sm text-white select-none">
            Z
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                key="brand"
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.18 }}
                className="font-bold tracking-tight text-white text-[15px] whitespace-nowrap"
              >
                Zeko<span className="text-primary">Portal</span>
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* ── Navigation ─────────────────────────────────────────── */}
      <div className="flex-1 py-5 px-3 flex flex-col gap-6 overflow-y-auto">
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
                    "group relative flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-150 cursor-pointer nav-item",
                    isActive
                      ? "nav-active text-white"
                      : "text-[hsl(240_5%_58%)] hover:bg-white/5 hover:text-zinc-200"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4 shrink-0 transition-colors duration-150",
                      isActive ? "text-primary" : "group-hover:text-zinc-300"
                    )}
                  />

                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.span
                        key={item.name}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="flex-1 truncate"
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* Badge */}
                  {item.badge && !isCollapsed && (
                    <span className="ml-auto flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white leading-none">
                      {item.badge}
                    </span>
                  )}
                  {item.badge && isCollapsed && (
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary ring-2 ring-[hsl(240_10%_3%)]" />
                  )}

                  {/* Tooltip in collapsed mode */}
                  {isCollapsed && (
                    <div className="pointer-events-none absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md bg-zinc-900 border border-border px-2.5 py-1.5 text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-xl z-50">
                      {item.name}
                      <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-zinc-900" />
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
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-1"
            >
              <p className="heading-section px-3 mb-1">Recent Projects</p>
              {recentProjects.map((project) => (
                <Link key={project.id} href={`/projects/${project.id}`}>
                  <div className="flex items-center gap-2.5 px-3 py-2 rounded-md text-[11px] font-medium text-[hsl(240_5%_52%)] hover:bg-white/5 hover:text-zinc-300 transition-colors cursor-pointer">
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

      {/* ── User Footer ────────────────────────────────────────── */}
      <div className="shrink-0 border-t border-border/60 p-3 space-y-1">
        <div
          className={cn(
            "flex items-center gap-3 p-2 rounded-md",
            isCollapsed && "justify-center"
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={user?.photoURL || mockUserProfile.avatar}
            alt={user?.displayName || "User"}
            className="h-7 w-7 shrink-0 rounded-full border border-border/80 object-cover"
          />
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                key="user"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex flex-col min-w-0"
              >
                <span className="text-xs font-semibold text-white truncate leading-tight">
                  {user?.displayName || "Portal User"}
                </span>
                <span className="flex items-center gap-1 text-[10px] text-muted-foreground mt-0.5">
                  <ShieldCheck className="h-2.5 w-2.5 text-primary shrink-0" />
                  <span className="truncate">{user?.email || "No email"}</span>
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
              transition={{ duration: 0.15 }}
            >
              <button onClick={handleLogout} className="flex items-center w-full gap-2.5 px-3 py-2 rounded-md text-xs font-medium text-muted-foreground hover:bg-red-500/8 hover:text-red-400 transition-colors cursor-pointer">
                <LogOut className="h-3.5 w-3.5 shrink-0" />
                <span>Log out</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Collapse Toggle ─────────────────────────────────────── */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-[72px] flex h-6 w-6 items-center justify-center rounded-full border border-border bg-[hsl(240_10%_6%)] text-muted-foreground hover:text-white shadow-md hover:bg-zinc-900 cursor-pointer transition-colors z-30"
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

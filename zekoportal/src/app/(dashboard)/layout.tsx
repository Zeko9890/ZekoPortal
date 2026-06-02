"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  LayoutDashboard,
  Briefcase,
  MessageSquare,
  Settings,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { mockUserProfile } from "@/lib/mock-data";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import { ProjectsProvider } from "@/lib/projects-context";
import { useAuth } from "@/lib/auth-context";

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Projects", href: "/projects", icon: Briefcase },
  { name: "Messages", href: "/messages", icon: MessageSquare, badge: 2 },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();

  React.useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[hsl(240_10%_3.5%)] text-white">
        <div className="flex flex-col items-center gap-4">
          <span className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground font-medium animate-pulse">Authenticating...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[hsl(240_10%_3.5%)] text-foreground font-sans">
      <ProjectsProvider>
        {/* Desktop sidebar */}
        <Sidebar />

        {/* Mobile Drawer */}
        <AnimatePresence>
          {isMobileOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsMobileOpen(false)}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
              />
              <motion.nav
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 28, stiffness: 220 }}
                className="fixed top-0 bottom-0 left-0 w-72 bg-[hsl(240_10%_3%)] border-r border-border/60 z-50 md:hidden flex flex-col"
              >
                {/* Header */}
                <div className="h-[60px] flex items-center justify-between px-4 border-b border-border/60 shrink-0">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2.5"
                    onClick={() => setIsMobileOpen(false)}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-lg shadow-primary/30 font-bold text-sm text-white">
                      Z
                    </div>
                    <span className="font-bold tracking-tight text-white text-[15px]">
                      Zeko<span className="text-primary">Portal</span>
                    </span>
                  </Link>
                  <button
                    onClick={() => setIsMobileOpen(false)}
                    className="p-1.5 rounded-md text-muted-foreground hover:text-white hover:bg-white/6 cursor-pointer transition-colors"
                  >
                    <X className="h-4.5 w-4.5" />
                  </button>
                </div>

                {/* Nav links */}
                <div className="flex-1 py-4 px-3 flex flex-col gap-0.5 overflow-y-auto">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive =
                      pathname === item.href ||
                      pathname.startsWith(item.href + "/");
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMobileOpen(false)}
                      >
                        <div
                          className={cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all nav-item cursor-pointer",
                            isActive
                              ? "nav-active text-white"
                              : "text-muted-foreground hover:bg-white/5 hover:text-zinc-200"
                          )}
                        >
                          <Icon
                            className={cn(
                              "h-4 w-4 shrink-0",
                              isActive ? "text-primary" : ""
                            )}
                          />
                          <span className="flex-1">{item.name}</span>
                          {item.badge && (
                            <span className="h-[18px] min-w-[18px] flex items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white">
                              {item.badge}
                            </span>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>

                {/* User footer */}
                <div className="shrink-0 border-t border-border/60 p-3 space-y-1">
                  <div className="flex items-center gap-3 p-2 rounded-md">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={mockUserProfile.avatar}
                      alt={mockUserProfile.name}
                      className="h-8 w-8 rounded-full border border-border/70 object-cover shrink-0"
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-semibold text-white truncate">
                        {mockUserProfile.name}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] text-muted-foreground mt-0.5">
                        <ShieldCheck className="h-2.5 w-2.5 text-primary shrink-0" />
                        <span className="truncate">{mockUserProfile.company}</span>
                      </span>
                    </div>
                  </div>
                  <Link href="/login" onClick={() => setIsMobileOpen(false)}>
                    <button className="flex items-center w-full gap-2.5 px-3 py-2 rounded-md text-xs font-medium text-muted-foreground hover:bg-red-500/8 hover:text-red-400 transition-colors cursor-pointer">
                      <LogOut className="h-3.5 w-3.5 shrink-0" />
                      <span>Log out</span>
                    </button>
                  </Link>
                </div>
              </motion.nav>
            </>
          )}
        </AnimatePresence>

        {/* Main area */}
        <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
          <Topbar onMenuClick={() => setIsMobileOpen(true)} />
          <main className="flex-1 overflow-y-auto bg-[hsl(240_10%_4.2%)] relative">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-7xl mx-auto p-5 md:p-8 min-h-full"
            >
              {children}
            </motion.div>
          </main>
        </div>
      </ProjectsProvider>
    </div>
  );
}

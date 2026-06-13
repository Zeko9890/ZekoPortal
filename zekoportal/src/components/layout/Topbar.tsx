"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  Menu,
  Search,
  User,
  LogOut,
  Settings,
  CheckCheck,
} from "lucide-react";
import { mockUserProfile } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth-context";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

interface TopbarProps {
  onMenuClick: () => void;
}

const notificationItems = [
  {
    id: 1,
    icon: "🏆",
    title: "Milestone Completed",
    desc: "Skynet Web Platform Redesign: wireframes approved.",
    time: "2 hrs ago",
    unread: true,
  },
  {
    id: 2,
    icon: "💬",
    title: "New Message from Alex Rivera",
    desc: '"I\'ve updated the login screens and added Framer Motion…"',
    time: "4 hrs ago",
    unread: true,
  },
  {
    id: 3,
    icon: "📄",
    title: "Document Uploaded",
    desc: "Technical Architecture Specs.md was added to Skynet Redesign.",
    time: "Yesterday",
    unread: false,
  },
];

const breadcrumbMap: Record<string, string> = {
  dashboard: "Dashboard",
  projects: "Projects",
  messages: "Messages",
  settings: "Settings",
};

export default function Topbar({ onMenuClick }: TopbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notifications, setNotifications] = useState(notificationItems);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0] ?? "dashboard";
  const pageTitle = breadcrumbMap[firstSegment] ?? firstSegment;
  const isDetailPage = firstSegment === "projects" && segments.length > 1;

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));

  return (
    <header className="h-[56px] border-b border-[#27272A] bg-[#09090B] sticky top-0 z-30 flex items-center justify-between px-5 shrink-0">
      {/* ── Left: hamburger + breadcrumb ── */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden p-1.5 -ml-1 rounded-md text-[#A1A1AA] hover:text-white hover:bg-white/5 cursor-pointer transition-colors"
          aria-label="Open menu"
        >
          <Menu className="h-4 w-4" />
        </button>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[13px]">
          {isDetailPage ? (
            <>
              <Link
                href="/projects"
                className="text-[#A1A1AA] hover:text-white transition-colors font-medium"
              >
                Projects
              </Link>
              <span className="text-[#3F3F46] text-sm leading-none">/</span>
              <span className="text-white font-semibold">Detail</span>
            </>
          ) : (
            <span className="text-white font-semibold">{pageTitle}</span>
          )}
        </div>

        {/* Live badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-[10px] font-medium text-emerald-400 tracking-wide">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Live
        </div>
      </div>

      {/* ── Right: search + notifications + profile ── */}
      <div className="flex items-center gap-1.5">
        {/* Search */}
        <div className="relative hidden lg:block">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#A1A1AA] pointer-events-none" />
          <input
            type="text"
            placeholder="Search..."
            className="h-7 w-44 xl:w-56 pl-8 pr-3 rounded-md border border-[#27272A] bg-[#111827] text-xs text-white placeholder:text-[#A1A1AA] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
          />
        </div>

        <div className="hidden lg:block h-4 w-px bg-[#27272A] mx-1" />

        {/* Notification bell */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="relative p-2 rounded-md text-[#A1A1AA] hover:text-white hover:bg-white/5 cursor-pointer transition-colors"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-[320px] rounded-lg border border-[#27272A] bg-[#111827] shadow-2xl z-50 overflow-hidden animate-fade-in">
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#27272A]">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-semibold text-white">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="flex h-4 min-w-[16px] items-center justify-center rounded-full bg-primary/15 px-1 text-[9px] font-bold text-primary">
                      {unreadCount}
                    </span>
                  )}
                </div>
                <button
                  onClick={markAllRead}
                  className="flex items-center gap-1 text-[10px] text-primary hover:text-primary/80 font-medium cursor-pointer transition-colors"
                >
                  <CheckCheck className="h-3 w-3" />
                  Mark all read
                </button>
              </div>

              <div className="divide-y divide-[#1F2937] max-h-[280px] overflow-y-auto">
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    className={`flex gap-3 px-4 py-3 hover:bg-white/5 cursor-pointer transition-colors ${
                      item.unread ? "bg-primary/5" : ""
                    }`}
                  >
                    <div className="text-sm shrink-0 mt-0.5">{item.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-[11px] font-medium text-white leading-tight">
                          {item.title}
                        </p>
                        <span className="text-[9px] text-[#A1A1AA] shrink-0 mt-0.5">
                          {item.time}
                        </span>
                      </div>
                      <p className="text-[10px] text-[#A1A1AA] mt-0.5 leading-relaxed line-clamp-2">
                        {item.desc}
                      </p>
                    </div>
                    {item.unread && (
                      <div className="h-1.5 w-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                    )}
                  </div>
                ))}
              </div>

              <div className="px-4 py-2.5 border-t border-[#27272A] text-center">
                <button className="text-[10px] text-primary hover:text-primary/80 font-medium cursor-pointer transition-colors">
                  View all
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 p-1 rounded-md hover:bg-white/5 transition-colors cursor-pointer focus:outline-none"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={user?.photoURL || mockUserProfile.avatar}
              alt={user?.displayName || "User"}
              className="h-6 w-6 rounded-full border border-[#27272A] object-cover"
            />
            <div className="hidden xl:flex flex-col text-left">
              <span className="text-[11px] font-medium text-white leading-tight">
                {user?.displayName?.split(" ")[0] || user?.email?.split("@")[0] || "User"}
              </span>
            </div>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-[188px] rounded-lg border border-[#27272A] bg-[#111827] shadow-2xl z-50 overflow-hidden animate-fade-in">
              <div className="px-3 py-3 border-b border-[#27272A]">
                <p className="text-[11px] font-semibold text-white truncate">
                  {user?.displayName || "Portal User"}
                </p>
                <p className="text-[10px] text-[#A1A1AA] truncate mt-0.5">
                  {user?.email || "No email"}
                </p>
                <p className="text-[10px] text-primary truncate mt-0.5 font-medium">
                  {mockUserProfile.company}
                </p>
              </div>

              <div className="p-1.5 space-y-0.5">
                <Link href="/settings" onClick={() => setShowProfileMenu(false)}>
                  <div className="flex items-center gap-2.5 px-3 py-2 rounded-md text-xs text-[#A1A1AA] hover:bg-white/5 hover:text-white transition-colors cursor-pointer">
                    <User className="h-3.5 w-3.5 shrink-0" />
                    <span>My Profile</span>
                  </div>
                </Link>
                <Link href="/settings" onClick={() => setShowProfileMenu(false)}>
                  <div className="flex items-center gap-2.5 px-3 py-2 rounded-md text-xs text-[#A1A1AA] hover:bg-white/5 hover:text-white transition-colors cursor-pointer">
                    <Settings className="h-3.5 w-3.5 shrink-0" />
                    <span>Settings</span>
                  </div>
                </Link>
              </div>

              <div className="p-1.5 border-t border-[#27272A]">
                <button
                  onClick={() => { setShowProfileMenu(false); handleLogout(); }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-xs text-[#A1A1AA] hover:bg-red-500/6 hover:text-red-400 transition-colors cursor-pointer"
                >
                  <LogOut className="h-3.5 w-3.5 shrink-0" />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

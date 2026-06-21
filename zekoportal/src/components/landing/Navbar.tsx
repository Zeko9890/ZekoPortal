"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#demo" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
        scrolled
          ? "bg-[#0F0F12]/95 backdrop-blur-lg border-b border-white/[0.06]"
          : "bg-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Brand — unique workspace style */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 font-bold text-[11px] text-white select-none shadow-sm">
              Z
            </div>
            <div className="flex items-baseline gap-0.5">
              <span className="font-semibold tracking-tight text-[15px] text-white">
                ZekoPortal
              </span>
              <span className="text-[9px] font-medium text-white/30 ml-1 hidden sm:inline">
                workspace
              </span>
            </div>
          </Link>

          {/* Desktop Nav — clean centered links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[13px] font-medium text-white/50 hover:text-white/90 px-3 py-1.5 rounded-md hover:bg-white/[0.04] transition-all duration-150"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTAs — distinct from typical SaaS */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/login"
              className="text-[13px] font-medium text-white/50 hover:text-white/90 px-3 py-1.5 rounded-md hover:bg-white/[0.04] transition-all duration-150"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="text-[13px] font-medium text-white bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.08] px-4 py-1.5 rounded-lg transition-all duration-150"
            >
              Get started free
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-1.5 text-white/50 hover:text-white transition-colors rounded-md"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu — slide-down panel */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0F0F12] border-t border-white/[0.06] animate-fade-in">
          <div className="px-5 py-3 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-[14px] font-medium text-white/60 hover:text-white hover:bg-white/[0.04] px-3 py-2.5 rounded-lg transition-all"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 mt-2 border-t border-white/[0.06] space-y-1.5">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="block text-[14px] font-medium text-white/60 hover:text-white px-3 py-2.5 rounded-lg transition-all"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileOpen(false)}
                className="block text-[14px] font-medium text-white bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.08] px-3 py-2.5 rounded-lg transition-all text-center"
              >
                Get started free
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

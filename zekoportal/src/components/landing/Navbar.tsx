"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#09090B]/90 backdrop-blur-md border-b border-[#27272A]"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary font-bold text-xs text-white select-none">
              Z
            </div>
            <span className="font-semibold tracking-tight text-sm text-white">
              Zeko<span className="text-primary">Portal</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[13px] font-medium text-[#A1A1AA] hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="text-[13px] font-medium text-[#A1A1AA] hover:text-white transition-colors px-3 py-1.5"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="text-[13px] font-semibold text-white bg-primary hover:bg-[#0EA5E9] px-4 py-2 rounded-md transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-[#A1A1AA] hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#09090B]/95 backdrop-blur-md border-t border-[#27272A]">
          <div className="px-5 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-sm font-medium text-[#A1A1AA] hover:text-white transition-colors py-2"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-[#27272A] flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-[#A1A1AA] hover:text-white transition-colors py-2"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileOpen(false)}
                className="text-sm font-semibold text-white bg-primary hover:bg-[#0EA5E9] px-4 py-2.5 rounded-md transition-colors text-center"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

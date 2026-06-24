"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const navLinks = [
  { label: "Workspace", href: "#features" },
  { label: "Workflow", href: "#workflow" },
  { label: "Clients", href: "#clients" },
  { label: "Pricing", href: "#pricing" },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="flex items-center justify-between h-[52px]">
          {/* Brand - Sharp & Premium */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <div className="flex h-6 w-6 items-center justify-center bg-gray-900 text-white font-bold text-[10px] select-none rounded-[4px] shadow-sm">
              Z
            </div>
            <span className="font-semibold tracking-tight text-[14px] text-gray-900 transition-colors">
              ZekoPortal
            </span>
          </Link>

          {/* Desktop Nav - Ultra dense, high contrast hover */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[13px] font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100 px-3 py-1.5 rounded-md transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/login"
              className="text-[13px] font-medium text-gray-500 hover:text-gray-900 px-3 py-1.5 transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="btn-interactive text-[12px] font-medium text-primary-foreground bg-primary hover:bg-primary/90 px-3.5 py-1.5 rounded-[4px] transition-all shadow-sm"
            >
              Start Free
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-1 text-gray-500 hover:text-gray-900"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 animate-fade-in shadow-md">
          <div className="px-5 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-[14px] font-medium text-gray-600 hover:text-gray-900 py-2"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 mt-2 border-t border-gray-100 flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="text-[14px] font-medium text-gray-600 hover:text-gray-900 py-2"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileOpen(false)}
                className="btn-interactive text-[14px] font-medium text-primary-foreground bg-primary hover:bg-primary/90 px-4 py-2 rounded-[4px] text-center transition-all shadow-sm"
              >
                Start Free
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Workflow", href: "#workflow" },
  { label: "Pricing", href: "#pricing" },
  { label: "Customers", href: "#testimonials" },
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
        scrolled ? "glass-panel" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="flex items-center justify-between h-[52px]">
          {/* Brand - Sharp & Premium */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <div className="flex h-6 w-6 items-center justify-center bg-white text-black font-bold text-[10px] select-none rounded-[4px]">
              Z
            </div>
            <span className="font-semibold tracking-tight text-[14px] text-white/90 group-hover:text-white transition-colors">
              ZekoPortal
            </span>
          </Link>

          {/* Desktop Nav - Ultra dense, high contrast hover */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[13px] font-medium text-white/50 hover:text-white hover:bg-white/10 px-3 py-1.5 rounded-md transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/login"
              className="text-[13px] font-medium text-white/50 hover:text-white px-3 py-1.5 transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="text-[12px] font-medium text-black bg-white hover:bg-white/90 px-3.5 py-1.5 rounded-[4px] transition-all"
            >
              Start Free
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-1 text-white/50 hover:text-white"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass-panel border-t-0 animate-fade-in">
          <div className="px-5 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-[14px] font-medium text-white/60 hover:text-white py-2"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 mt-2 border-t border-white/10 flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="text-[14px] font-medium text-white/60 hover:text-white py-2"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileOpen(false)}
                className="text-[14px] font-medium text-black bg-white px-4 py-2 rounded-[4px] text-center"
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

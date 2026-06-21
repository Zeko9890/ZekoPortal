import React from "react";
import Link from "next/link";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Changelog", href: "#" },
    { label: "Roadmap", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Security", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-[#27272A] bg-[#09090B]">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12">
          {/* Brand column */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary font-bold text-xs text-white select-none">
                Z
              </div>
              <span className="font-semibold tracking-tight text-sm text-white">
                Zeko<span className="text-primary">Portal</span>
              </span>
            </Link>
            <p className="text-[12px] text-[#71717A] leading-relaxed max-w-xs">
              The modern client portal platform for agencies, studios, and
              product teams. Built to streamline collaboration and delivery.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-[11px] font-semibold text-[#A1A1AA] uppercase tracking-wider mb-3">
                {category}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[12px] text-[#71717A] hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[#1F2937] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-[#52525B]">
            © {new Date().getFullYear()} Zeko Labs. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {["Twitter", "GitHub", "LinkedIn"].map((s) => (
              <a
                key={s}
                href="#"
                className="text-[11px] text-[#52525B] hover:text-[#A1A1AA] transition-colors"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

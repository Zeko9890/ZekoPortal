import React from "react";
import Link from "next/link";

const footerSections = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Integrations", href: "#" },
    { label: "Changelog", href: "#" },
    { label: "Roadmap", href: "#" },
  ],
  Resources: [
    { label: "Documentation", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "Community", href: "#" },
    { label: "Blog", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
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
    <footer className="border-t border-white/[0.04]">
      <div className="max-w-5xl mx-auto px-5 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8">
          {/* Brand column — spans 2 */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-blue-500 to-indigo-500 font-bold text-[9px] text-white select-none">
                Z
              </div>
              <span className="font-semibold tracking-tight text-[13px] text-white/80">
                ZekoPortal
              </span>
            </Link>
            <p className="text-[11px] text-white/25 leading-relaxed max-w-[220px] mb-5">
              The collaborative workspace for teams that ship together.
              Manage projects, communicate with clients, and deliver work.
            </p>
            {/* Newsletter micro-form */}
            <div className="flex items-center gap-2 max-w-[240px]">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 h-7 px-2.5 text-[11px] bg-white/[0.03] border border-white/[0.06] rounded-md text-white/60 placeholder:text-white/15 focus:outline-none focus:border-white/[0.12] transition-colors"
              />
              <button className="h-7 px-3 text-[10px] font-medium bg-white/[0.06] hover:bg-white/[0.1] text-white/50 rounded-md border border-white/[0.06] transition-colors cursor-pointer">
                Subscribe
              </button>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerSections).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-[10px] font-semibold text-white/30 uppercase tracking-wider mb-3">
                {category}
              </h4>
              <ul className="space-y-1.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[11px] text-white/20 hover:text-white/45 transition-colors"
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
        <div className="mt-10 pt-5 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[10px] text-white/15">
            © {new Date().getFullYear()} Zeko Labs. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {["Twitter", "GitHub", "Discord"].map((s) => (
              <a
                key={s}
                href="#"
                className="text-[10px] text-white/15 hover:text-white/30 transition-colors"
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

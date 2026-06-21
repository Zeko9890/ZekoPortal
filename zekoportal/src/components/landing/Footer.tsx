import React from "react";
import Link from "next/link";

const footerSections = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Integrations", href: "#" },
    { label: "Pricing", href: "#pricing" },
    { label: "Changelog", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Security", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          
          {/* Brand */}
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-5 w-5 items-center justify-center bg-white text-black font-bold text-[9px] rounded-[3px]">
                Z
              </div>
              <span className="font-bold tracking-tight text-[13px] text-white">
                ZekoPortal
              </span>
            </Link>
            <p className="text-[11px] text-white/40 max-w-[200px] leading-relaxed font-medium">
              The high-velocity workspace for teams that demand performance.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerSections).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-[10px] font-bold text-white mb-4 uppercase tracking-wider">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[11px] text-white/40 hover:text-white transition-colors font-medium"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 gap-4">
          <p className="text-[10px] text-white/30 font-medium">
            © {new Date().getFullYear()} Zeko Labs Inc.
          </p>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-[10px] text-white/40 font-medium">All systems operational</span>
            </div>
            <div className="h-3 w-px bg-white/10 mx-2" />
            {["Twitter", "GitHub"].map((s) => (
              <a
                key={s}
                href="#"
                className="text-[10px] text-white/40 hover:text-white transition-colors font-medium"
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

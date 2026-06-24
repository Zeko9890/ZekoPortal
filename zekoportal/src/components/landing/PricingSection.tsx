"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Check, Zap } from "lucide-react";

const tiers = [
  {
    name: "Starter",
    monthly: "$0",
    annual: "$0",
    period: "/forever",
    description: "Perfect for evaluating ZekoPortal or running a single small project.",
    features: [
      "1 active project",
      "Up to 3 team members",
      "Core messaging",
      "1 GB storage limit",
      "Community support",
    ],
    missing: ["Automations", "Client portal", "Priority support"],
    cta: "Start Free",
    highlight: false,
    badge: null,
  },
  {
    name: "Professional",
    monthly: "$49",
    annual: "$39",
    period: "/mo",
    description: "For agencies and high-velocity teams running multiple client projects.",
    features: [
      "Unlimited projects",
      "Unlimited team members",
      "Advanced automations",
      "Client approval workflows",
      "100 GB storage",
      "Priority email support",
    ],
    missing: [],
    cta: "Start 14-Day Trial",
    highlight: true,
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    monthly: "Custom",
    annual: "Custom",
    period: "",
    description: "For large organizations requiring maximum security and control.",
    features: [
      "Everything in Professional",
      "SSO & SAML integration",
      "Custom data retention",
      "Dedicated success manager",
      "Unlimited storage",
      "24/7 phone support",
    ],
    missing: [],
    cta: "Contact Sales",
    highlight: false,
    badge: null,
  },
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

export default function PricingSection() {
  const revealRef = useReveal();
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="py-24 md:py-32 bg-muted relative border-y border-border overflow-hidden transition-colors duration-500">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(56,189,248,0.05) 0%, transparent 70%)" }} />

      <div ref={revealRef} className="reveal max-w-[1000px] mx-auto px-6 md:px-10 relative z-10">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[11px] font-semibold text-blue-500 uppercase tracking-widest mb-3">Pricing</p>
          <h2 className="text-[30px] md:text-[38px] font-bold tracking-tight text-foreground mb-4">
            Start free. Scale when ready.
          </h2>
          <p className="text-[13px] text-muted-foreground max-w-md mx-auto font-medium mb-8">
            No hidden limits. No setup fees. Upgrade only when your team needs more.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 bg-background border border-border rounded-full p-1 shadow-sm">
            <button
              onClick={() => setAnnual(false)}
              className={`cursor-pointer text-[11px] font-semibold px-4 py-1.5 rounded-full transition-all ${
                !annual ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`cursor-pointer flex items-center gap-1.5 text-[11px] font-semibold px-4 py-1.5 rounded-full transition-all ${
                annual ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Annual
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full transition-all ${
                annual ? "bg-blue-500 text-white" : "bg-blue-500/20 text-blue-400"
              }`}>-20%</span>
            </button>
          </div>
        </div>

        {/* Tier cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-xl border p-6 transition-all shadow-sm ${
                tier.highlight
                  ? "border-blue-500 bg-gradient-to-b from-blue-500/5 to-transparent"
                  : "border-border bg-card hover:border-border/60"
              }`}
              style={tier.highlight ? { boxShadow: "0 0 0 1px rgba(59,130,246,0.15), 0 24px 48px rgba(0,0,0,0.1)" } : {}}
            >
              {/* Badge */}
              {tier.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1 bg-blue-500 text-white text-[9px] font-bold px-2.5 py-1 rounded-full shadow-lg">
                    <Zap className="h-2.5 w-2.5" />
                    {tier.badge}
                  </div>
                </div>
              )}

              {/* Tier name & price */}
              <div className="mb-6">
                <h3 className="text-[12px] font-bold text-muted-foreground uppercase tracking-wider mb-3">{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-[36px] font-bold text-foreground tracking-tight">
                    {annual ? tier.annual : tier.monthly}
                  </span>
                  {tier.period && (
                    <span className="text-[12px] text-muted-foreground font-medium">{tier.period}</span>
                  )}
                </div>
                {annual && tier.monthly !== "$0" && tier.monthly !== "Custom" && (
                  <div className="text-[9px] text-blue-500 font-semibold mb-2">
                    Save ${(parseInt(tier.monthly.replace("$", "")) - parseInt(tier.annual.replace("$", ""))) * 12}/yr
                  </div>
                )}
                <p className="text-[11.5px] text-muted-foreground leading-relaxed">{tier.description}</p>
              </div>

              {/* CTA */}
              <Link
                href={tier.name === "Enterprise" ? "mailto:sales@zekoportal.com" : "/signup"}
                className={`btn-interactive w-full text-center text-[12px] font-bold py-2.5 rounded-[7px] transition-all mb-6 ${
                  tier.highlight
                    ? "bg-blue-500 text-white hover:bg-blue-600 shadow-[0_4px_16px_rgba(59,130,246,0.3)]"
                    : "bg-muted text-foreground hover:bg-muted/80 border border-border"
                }`}
              >
                {tier.cta}
              </Link>

              {/* Features */}
              <ul className="space-y-2.5 mt-auto">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[11.5px] text-muted-foreground font-medium">
                    <Check className={`h-3.5 w-3.5 shrink-0 mt-0.5 ${tier.highlight ? "text-blue-500" : "text-muted-foreground/50"}`} />
                    {f}
                  </li>
                ))}
                {tier.missing.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[11.5px] text-muted-foreground/40 font-medium line-through">
                    <div className="h-3.5 w-3.5 shrink-0 mt-0.5 border border-border rounded-sm" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-[11px] text-muted-foreground font-medium mt-8">
          All plans include a 14-day free trial. No credit card required.
        </p>
      </div>
    </section>
  );
}

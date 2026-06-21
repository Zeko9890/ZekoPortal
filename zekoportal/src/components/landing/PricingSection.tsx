"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    description: "For small teams getting started with project collaboration.",
    features: [
      "Up to 3 active projects",
      "1 team member",
      "Basic messaging",
      "500 MB file storage",
      "Email support",
    ],
    cta: "Get started",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/mo",
    description: "For growing teams that need full workspace features.",
    features: [
      "Unlimited projects",
      "Up to 15 team members",
      "Approval workflows",
      "50 GB file storage",
      "Priority support",
      "Custom branding",
      "Advanced analytics",
    ],
    cta: "Start free trial",
    highlight: true,
    badge: "Most popular",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large teams with advanced security and compliance needs.",
    features: [
      "Everything in Pro",
      "Unlimited team members",
      "SSO / SAML",
      "Dedicated account manager",
      "Custom integrations",
      "SLA guarantee",
      "On-premise option",
    ],
    cta: "Talk to sales",
    highlight: false,
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

  return (
    <section id="pricing" className="py-20 md:py-28 relative">
      <div ref={revealRef} className="reveal max-w-5xl mx-auto px-5 md:px-8">
        <div className="text-center mb-12">
          <p className="text-[11px] font-semibold text-blue-400/70 uppercase tracking-widest mb-3">
            Pricing
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-3">
            Simple plans, no surprises
          </h2>
          <p className="text-[14px] text-white/40 max-w-lg mx-auto">
            Start free. Upgrade when your team is ready.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-xl p-5 flex flex-col transition-all duration-200 ${
                tier.highlight
                  ? "bg-white/[0.04] border border-blue-500/20 shadow-soft"
                  : "bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.03] hover:border-white/[0.08]"
              }`}
            >
              {tier.badge && (
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-blue-500 text-[9px] font-bold text-white tracking-wider">
                  {tier.badge}
                </div>
              )}

              <div className="mb-5">
                <h3 className="text-[13px] font-semibold text-white/70 mb-2">
                  {tier.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-2xl font-bold text-white">
                    {tier.price}
                  </span>
                  {tier.period && (
                    <span className="text-[12px] text-white/25">{tier.period}</span>
                  )}
                </div>
                <p className="text-[11px] text-white/30 leading-relaxed">
                  {tier.description}
                </p>
              </div>

              <ul className="space-y-2 mb-6 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[11px] text-white/45">
                    <Check className="h-3 w-3 text-blue-400/60 shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={tier.name === "Enterprise" ? "#" : "/signup"}
                className={`block text-center text-[12px] font-medium py-2 rounded-lg transition-all ${
                  tier.highlight
                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                    : "bg-white/[0.05] hover:bg-white/[0.08] text-white/70 border border-white/[0.06]"
                }`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

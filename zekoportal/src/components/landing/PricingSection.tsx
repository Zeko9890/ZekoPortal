"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    description: "For freelancers and solo teams getting started.",
    features: [
      "Up to 3 projects",
      "1 team member",
      "Basic messaging",
      "File uploads (500 MB)",
      "Email support",
    ],
    cta: "Start Free",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/mo",
    description: "For agencies and growing teams that need more.",
    features: [
      "Unlimited projects",
      "Up to 15 team members",
      "Advanced dashboards",
      "Approval workflows",
      "File uploads (50 GB)",
      "Priority support",
      "Custom branding",
    ],
    cta: "Start Free Trial",
    highlight: true,
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large organisations with custom requirements.",
    features: [
      "Everything in Pro",
      "Unlimited team members",
      "SSO / SAML",
      "Dedicated account manager",
      "Custom integrations",
      "SLA guarantee",
      "On-premise option",
    ],
    cta: "Contact Sales",
    highlight: false,
  },
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add("visible");
      },
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
    <section id="pricing" className="py-24 md:py-32 relative">
      <div className="glow-orb w-[500px] h-[500px] bg-primary/4 bottom-[10%] left-[10%] absolute" />

      <div ref={revealRef} className="reveal max-w-6xl mx-auto px-5 md:px-8">
        <div className="text-center mb-14">
          <p className="text-[11px] font-semibold text-primary uppercase tracking-widest mb-3">
            Pricing
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-[#A1A1AA] text-base md:text-lg max-w-xl mx-auto">
            Start free and scale as you grow. No hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 max-w-4xl mx-auto">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-xl border p-6 flex flex-col transition-all duration-200 ${
                tier.highlight
                  ? "border-primary/40 bg-[#111827] shadow-lg shadow-primary/5"
                  : "border-[#27272A] bg-[#111827] hover:border-[#3F3F46]"
              }`}
            >
              {tier.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-primary text-[10px] font-bold text-white uppercase tracking-wider">
                  {tier.badge}
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-white mb-1">
                  {tier.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-3xl font-bold text-white">
                    {tier.price}
                  </span>
                  {tier.period && (
                    <span className="text-sm text-[#71717A]">{tier.period}</span>
                  )}
                </div>
                <p className="text-[12px] text-[#71717A] leading-relaxed">
                  {tier.description}
                </p>
              </div>

              <ul className="space-y-2.5 mb-8 flex-1">
                {tier.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-[12px] text-[#A1A1AA]"
                  >
                    <Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={tier.name === "Enterprise" ? "#" : "/signup"}
                className={`block text-center text-[13px] font-semibold py-2.5 rounded-md transition-colors ${
                  tier.highlight
                    ? "bg-primary hover:bg-[#0EA5E9] text-white"
                    : "bg-[#1F2937] hover:bg-[#374151] text-white border border-[#27272A]"
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

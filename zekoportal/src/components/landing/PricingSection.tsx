"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Starter",
    price: "$0",
    period: "/forever",
    description: "Perfect for evaluating ZekoPortal or running a single small project.",
    features: [
      "1 active project",
      "Up to 3 team members",
      "Core messaging",
      "1 GB storage limit",
      "Community support",
    ],
    cta: "Start Free",
    highlight: false,
  },
  {
    name: "Professional",
    price: "$49",
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
    cta: "Start 14-Day Trial",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
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
    <section id="pricing" className="py-20 md:py-28 bg-black relative border-t border-white/5">
      <div className="absolute inset-0 bg-radial-glow opacity-30" />
      
      <div ref={revealRef} className="reveal max-w-5xl mx-auto px-5 md:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
            Pricing that scales with you.
          </h2>
          <p className="text-[14px] text-white/40 max-w-md mx-auto font-medium">
            No hidden limits. Start free, upgrade when your team needs more power.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 max-w-4xl mx-auto rounded-xl overflow-hidden border border-white/10 bg-[#050505]">
          {tiers.map((tier, i) => (
            <div
              key={tier.name}
              className={`p-8 flex flex-col ${
                i !== 2 ? "border-b md:border-b-0 md:border-r border-white/10" : ""
              } ${tier.highlight ? "bg-white/5" : ""}`}
            >
              <div className="mb-6">
                <h3 className="text-[14px] font-bold text-white mb-2">
                  {tier.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-3xl font-bold text-white tracking-tight">
                    {tier.price}
                  </span>
                  {tier.period && (
                    <span className="text-[12px] text-white/40 font-medium">{tier.period}</span>
                  )}
                </div>
                <p className="text-[12px] text-white/50 leading-relaxed min-h-[40px]">
                  {tier.description}
                </p>
              </div>

              <Link
                href={tier.name === "Enterprise" ? "#" : "/signup"}
                className={`w-full text-center text-[12px] font-bold py-2.5 rounded-[6px] transition-all mb-8 ${
                  tier.highlight
                    ? "bg-white text-black hover:bg-white/90"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {tier.cta}
              </Link>

              <ul className="space-y-3 mt-auto">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[12px] text-white/70 font-medium">
                    <Check className="h-3.5 w-3.5 text-white/30 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

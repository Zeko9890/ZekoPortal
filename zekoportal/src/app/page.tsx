"use client";

import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import PortalVisualization from "@/components/landing/PortalVisualization";
import BentoGrid from "@/components/landing/BentoGrid";
import StatsBar from "@/components/landing/StatsBar";
import Testimonials from "@/components/landing/Testimonials";
import PricingSection from "@/components/landing/PricingSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#09090B] text-white overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <PortalVisualization />
      <BentoGrid />
      <StatsBar />
      <Testimonials />
      <PricingSection />
      <CTASection />
      <Footer />
    </div>
  );
}

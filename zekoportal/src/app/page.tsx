"use client";

import Navbar from "@/components/landing/Navbar";
import SplitHero from "@/components/landing/SplitHero";
import WorkspaceOverview from "@/components/landing/WorkspaceOverview";
import WorkflowAutomation from "@/components/landing/WorkflowAutomation";
import TeamCollaboration from "@/components/landing/TeamCollaboration";
import ClientPortal from "@/components/landing/ClientPortal";
import PricingSection from "@/components/landing/PricingSection";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#09090B] text-white overflow-x-hidden">
      <Navbar />
      {/* Section 1 — Split-screen hero with product preview */}
      <SplitHero />
      {/* Section 2 — Workspace overview: Tasks / Projects / Clients / Approvals / Files */}
      <WorkspaceOverview />
      {/* Section 3 — Workflow automation builder */}
      <WorkflowAutomation />
      {/* Section 4 — Team collaboration: comments, mentions, approvals */}
      <TeamCollaboration />
      {/* Section 5 — Client portal experience */}
      <ClientPortal />
      {/* Section 6 — Pricing */}
      <PricingSection />
      {/* Section 7 — Resources footer */}
      <Footer />
    </div>
  );
}

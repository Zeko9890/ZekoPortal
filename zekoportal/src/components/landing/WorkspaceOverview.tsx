"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  CheckSquare,
  FolderOpen,
  Users,
  ThumbsUp,
  Paperclip,
  MoreHorizontal,
  Circle,
  ChevronRight,
} from "lucide-react";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

const tabs = [
  { id: "tasks", label: "Tasks", icon: CheckSquare, accent: "#38BDF8" },
  { id: "projects", label: "Projects", icon: FolderOpen, accent: "#6366F1" },
  { id: "clients", label: "Clients", icon: Users, accent: "#10B981" },
  { id: "approvals", label: "Approvals", icon: ThumbsUp, accent: "#F59E0B" },
  { id: "files", label: "Files", icon: Paperclip, accent: "#EC4899" },
] as const;

type TabId = typeof tabs[number]["id"];

const taskRows = [
  { name: "Finalize hero section copy", project: "Website Redesign", status: "In Review", priority: "High", due: "Jun 24", assignee: "SC", aColor: "#6366F1" },
  { name: "Export brand icon set", project: "Brand Guidelines", status: "Done", priority: "Medium", due: "Jun 22", assignee: "MR", aColor: "#10B981" },
  { name: "Record onboarding walkthrough", project: "Mobile App v3", status: "Active", priority: "High", due: "Jun 26", assignee: "JP", aColor: "#0EA5E9" },
  { name: "Review Q3 ad creatives", project: "Q3 Campaign", status: "Active", priority: "Low", due: "Jun 28", assignee: "AL", aColor: "#F59E0B" },
  { name: "Client portal UAT sign-off", project: "Website Redesign", status: "Pending", priority: "High", due: "Jun 25", assignee: "KP", aColor: "#EC4899" },
];

const projectRows = [
  { name: "Website Redesign", client: "Acme Corp", tasks: 24, done: 17, status: "Active", health: "On track" },
  { name: "Brand Guidelines", client: "Globex", tasks: 12, done: 12, status: "Completed", health: "Delivered" },
  { name: "Mobile App v3", client: "Studio X", tasks: 38, done: 17, status: "Active", health: "At risk" },
  { name: "Q3 Campaign", client: "NovaTech", tasks: 9, done: 2, status: "Active", health: "On track" },
];

const clientRows = [
  { name: "Alex Loomis", company: "Acme Corp", projects: 2, portal: "Active", lastSeen: "Today", avatar: "AL", color: "#F59E0B" },
  { name: "Priya Sharma", company: "Globex", projects: 1, portal: "Active", lastSeen: "Yesterday", avatar: "PS", color: "#6366F1" },
  { name: "Tom Rutter", company: "Studio X", projects: 3, portal: "Active", lastSeen: "2d ago", avatar: "TR", color: "#10B981" },
  { name: "Nina Volkov", company: "NovaTech", projects: 1, portal: "Pending invite", lastSeen: "—", avatar: "NV", color: "#EC4899" },
];

const approvalRows = [
  { item: "Homepage v4.1 Mockup", requestedBy: "Sarah Chen", client: "Acme Corp", status: "Awaiting", due: "Jun 24" },
  { item: "Brand Color System", requestedBy: "Maya Rodriguez", client: "Globex", status: "Approved", due: "Jun 22" },
  { item: "App Icon Final", requestedBy: "James Park", client: "Studio X", status: "Changes Req.", due: "Jun 23" },
  { item: "Q3 Creative Brief", requestedBy: "Team", client: "NovaTech", status: "Awaiting", due: "Jun 27" },
];

const fileRows = [
  { name: "Homepage_v4_Final.fig", type: "Figma", size: "12.4 MB", updatedBy: "SC", updated: "2h ago", version: "v4" },
  { name: "Brand_Assets.zip", type: "Archive", size: "84.1 MB", updatedBy: "MR", updated: "Yesterday", version: "v2" },
  { name: "App_Wireframes.pdf", type: "PDF", size: "3.2 MB", updatedBy: "JP", updated: "3d ago", version: "v1" },
  { name: "Q3_Brief_FINAL.docx", type: "Word", size: "0.9 MB", updatedBy: "AL", updated: "Today", version: "v3" },
];

const statusColor: Record<string, string> = {
  "In Review": "bg-orange-50 text-orange-600",
  "Done": "bg-blue-50 text-blue-600",
  "Active": "bg-sky-50 text-sky-600",
  "Pending": "bg-gray-100 text-gray-500",
  "Completed": "bg-blue-50 text-blue-600",
  "Approved": "bg-blue-50 text-blue-600",
  "Awaiting": "bg-orange-50 text-orange-600",
  "Changes Req.": "bg-red-50 text-red-600",
  "At risk": "bg-red-50 text-red-600",
  "On track": "bg-blue-50 text-blue-600",
  "Delivered": "bg-blue-50 text-blue-600",
  "Pending invite": "bg-gray-100 text-gray-400",
};

export default function WorkspaceOverview() {
  const revealRef = useReveal();
  const [activeTab, setActiveTab] = useState<TabId>("tasks");
  const currentTab = tabs.find((t) => t.id === activeTab)!;

  return (
    <section id="features" className="py-24 bg-muted border-y border-border relative overflow-hidden transition-colors duration-500">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(56,189,248,0.08) 0%, transparent 70%)" }} />

      <div ref={revealRef} className="reveal max-w-[1100px] mx-auto px-6 md:px-10 relative z-10">

        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold text-sky-500 uppercase tracking-widest mb-3">Workspace Overview</p>
            <h2 className="text-[30px] md:text-[38px] font-bold tracking-tight text-foreground leading-tight">
              Everything in one view.
              <br />
              <span className="text-muted-foreground">Nothing slips through.</span>
            </h2>
          </div>
          <p className="text-[13px] text-muted-foreground max-w-[300px] leading-relaxed font-medium">
            Switch between your tasks, projects, clients, approvals, and files — all in a unified workspace.
          </p>
        </div>

        {/* Tab selector */}
        <div className="flex items-center gap-1 mb-4 flex-wrap">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] text-[11px] font-semibold transition-all ${
                  isActive
                    ? "text-foreground border border-gray-200 bg-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground border border-transparent hover:border-gray-200 hover:bg-white"
                }`}
                style={isActive ? { color: tab.accent } : {}}
              >
                <Icon className="h-3 w-3" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Dashboard panel */}
        <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-[0_24px_48px_-12px_rgba(0,0,0,0.05)]">

          {/* Panel header */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100 bg-gray-50">
            <div className="flex items-center gap-2">
              <currentTab.icon className="h-3.5 w-3.5" style={{ color: currentTab.accent }} />
              <span className="text-[11px] font-semibold text-gray-900">{currentTab.label}</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="text-[9px] font-medium text-gray-500 hover:text-gray-900 px-2 py-1 rounded-[4px] border border-gray-200 transition-colors bg-white shadow-sm">
                Filter
              </button>
              <button className="text-[9px] font-medium text-gray-500 hover:text-gray-900 px-2 py-1 rounded-[4px] border border-gray-200 transition-colors bg-white shadow-sm">
                Sort
              </button>
              <MoreHorizontal className="h-3.5 w-3.5 text-gray-400" />
            </div>
          </div>

          {/* Column headers */}
          <div className="px-4 py-2 border-b border-gray-100 bg-white">
            {activeTab === "tasks" && (
              <div className="grid grid-cols-[2fr_1.2fr_80px_80px_80px_32px] gap-3 text-[9px] font-bold text-gray-400 uppercase tracking-wider">
                <span>Task</span><span>Project</span><span>Status</span><span>Priority</span><span>Due</span><span></span>
              </div>
            )}
            {activeTab === "projects" && (
              <div className="grid grid-cols-[2fr_1.2fr_100px_80px_100px] gap-3 text-[9px] font-bold text-gray-400 uppercase tracking-wider">
                <span>Project</span><span>Client</span><span>Progress</span><span>Status</span><span>Health</span>
              </div>
            )}
            {activeTab === "clients" && (
              <div className="grid grid-cols-[1.5fr_1.5fr_80px_100px_80px] gap-3 text-[9px] font-bold text-gray-400 uppercase tracking-wider">
                <span>Client</span><span>Company</span><span>Projects</span><span>Portal</span><span>Last seen</span>
              </div>
            )}
            {activeTab === "approvals" && (
              <div className="grid grid-cols-[2fr_1.2fr_1fr_90px_80px] gap-3 text-[9px] font-bold text-gray-400 uppercase tracking-wider">
                <span>Item</span><span>Requested by</span><span>Client</span><span>Status</span><span>Due</span>
              </div>
            )}
            {activeTab === "files" && (
              <div className="grid grid-cols-[2fr_80px_80px_80px_80px_50px] gap-3 text-[9px] font-bold text-gray-400 uppercase tracking-wider">
                <span>Name</span><span>Type</span><span>Size</span><span>By</span><span>Updated</span><span>Ver.</span>
              </div>
            )}
          </div>

          {/* Rows */}
          <div className="divide-y divide-gray-100">
            {activeTab === "tasks" && taskRows.map((row, i) => (
              <div key={i} className="grid grid-cols-[2fr_1.2fr_80px_80px_80px_32px] gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors items-center group">
                <div className="flex items-center gap-2">
                  <Circle className="h-2.5 w-2.5 text-gray-300 shrink-0" />
                  <span className="text-[10px] font-medium text-gray-900 truncate">{row.name}</span>
                </div>
                <span className="text-[9px] text-gray-500 truncate">{row.project}</span>
                <span className={`text-[8px] font-semibold px-1.5 py-0.5 rounded-[3px] w-fit ${statusColor[row.status]}`}>{row.status}</span>
                <span className={`text-[8px] font-semibold ${row.priority === "High" ? "text-red-500" : row.priority === "Medium" ? "text-orange-500" : "text-gray-400"}`}>{row.priority}</span>
                <span className="text-[9px] text-gray-400 font-medium">{row.due}</span>
                <div className="h-5 w-5 rounded-full flex items-center justify-center text-[7px] font-bold text-white shadow-sm" style={{ backgroundColor: row.aColor }}>{row.assignee}</div>
              </div>
            ))}

            {activeTab === "projects" && projectRows.map((row, i) => (
              <div key={i} className="grid grid-cols-[2fr_1.2fr_100px_80px_100px] gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors items-center">
                <div className="flex items-center gap-2">
                  <FolderOpen className="h-3 w-3 text-gray-400 shrink-0" />
                  <span className="text-[10px] font-medium text-gray-900 truncate">{row.name}</span>
                </div>
                <span className="text-[9px] text-gray-500 truncate">{row.client}</span>
                <div className="flex items-center gap-1.5">
                  <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-sky-500 rounded-full" style={{ width: `${Math.round((row.done / row.tasks) * 100)}%` }} />
                  </div>
                  <span className="text-[8px] text-gray-400 font-mono w-8 shrink-0">{row.done}/{row.tasks}</span>
                </div>
                <span className={`text-[8px] font-semibold px-1.5 py-0.5 rounded-[3px] w-fit ${statusColor[row.status]}`}>{row.status}</span>
                <span className={`text-[8px] font-semibold px-1.5 py-0.5 rounded-[3px] w-fit ${statusColor[row.health]}`}>{row.health}</span>
              </div>
            ))}

            {activeTab === "clients" && clientRows.map((row, i) => (
              <div key={i} className="grid grid-cols-[1.5fr_1.5fr_80px_100px_80px] gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors items-center">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full flex items-center justify-center text-[7px] font-bold text-white shrink-0 shadow-sm" style={{ backgroundColor: row.color }}>{row.avatar}</div>
                  <span className="text-[10px] font-medium text-gray-900 truncate">{row.name}</span>
                </div>
                <span className="text-[9px] text-gray-500">{row.company}</span>
                <span className="text-[9px] text-gray-500 font-medium">{row.projects} project{row.projects > 1 ? "s" : ""}</span>
                <span className={`text-[8px] font-semibold px-1.5 py-0.5 rounded-[3px] w-fit ${statusColor[row.portal] || "bg-gray-100 text-gray-500"}`}>{row.portal}</span>
                <span className="text-[9px] text-gray-400">{row.lastSeen}</span>
              </div>
            ))}

            {activeTab === "approvals" && approvalRows.map((row, i) => (
              <div key={i} className="grid grid-cols-[2fr_1.2fr_1fr_90px_80px] gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors items-center">
                <div className="flex items-center gap-2">
                  <ThumbsUp className="h-3 w-3 text-gray-400 shrink-0" />
                  <span className="text-[10px] font-medium text-gray-900 truncate">{row.item}</span>
                </div>
                <span className="text-[9px] text-gray-500 truncate">{row.requestedBy}</span>
                <span className="text-[9px] text-gray-500 truncate">{row.client}</span>
                <span className={`text-[8px] font-semibold px-1.5 py-0.5 rounded-[3px] w-fit ${statusColor[row.status]}`}>{row.status}</span>
                <span className="text-[9px] text-gray-400 font-medium">{row.due}</span>
              </div>
            ))}

            {activeTab === "files" && fileRows.map((row, i) => (
              <div key={i} className="grid grid-cols-[2fr_80px_80px_80px_80px_50px] gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors items-center">
                <div className="flex items-center gap-2">
                  <Paperclip className="h-3 w-3 text-gray-400 shrink-0" />
                  <span className="text-[10px] font-medium text-gray-900 truncate">{row.name}</span>
                </div>
                <span className="text-[9px] text-gray-500">{row.type}</span>
                <span className="text-[9px] text-gray-500 font-mono">{row.size}</span>
                <span className="text-[9px] text-gray-500">{row.updatedBy}</span>
                <span className="text-[9px] text-gray-400">{row.updated}</span>
                <span className="text-[8px] font-semibold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-[3px] w-fit">{row.version}</span>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="px-4 py-2 border-t border-gray-100 flex items-center justify-between">
            <span className="text-[9px] text-gray-400 font-medium">
              Showing {activeTab === "tasks" ? taskRows.length : activeTab === "projects" ? projectRows.length : activeTab === "clients" ? clientRows.length : activeTab === "approvals" ? approvalRows.length : fileRows.length} items
            </span>
            <button className="flex items-center gap-1 text-[9px] text-gray-500 hover:text-gray-900 transition-colors font-medium">
              View all <ChevronRight className="h-2.5 w-2.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

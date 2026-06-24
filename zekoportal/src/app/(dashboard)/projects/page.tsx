"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Search, 
  FolderKanban, 
  ChevronRight, 
  SlidersHorizontal,
  Clock,
  ArrowUpRight
} from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import { useProjects } from "@/lib/projects-context";
import { Progress } from "@/components/ui/progress";

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { projects, loading, createProject } = useProjects();
  const [isCreating, setIsCreating] = useState(false);

  const filteredProjects = projects.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateProject = async () => {
    const title = window.prompt("Enter new project title:");
    if (!title) return;
    setIsCreating(true);
    try {
      await createProject({
        title,
        status: "active",
        progress: 0,
      });
    } catch (error) {
      console.error("Failed to create project", error);
      alert("Failed to create project");
    } finally {
      setIsCreating(false);
    }
  };

  const getStatusDetails = (status: string) => {
    switch(status) {
      case "active":
        return { label: "Active", dotClass: "status-active", textClass: "text-blue-400", bgClass: "bg-blue-500/10 border-blue-500/20" };
      case "in_review":
        return { label: "In Review", dotClass: "status-review", textClass: "text-orange-400", bgClass: "bg-orange-500/10 border-orange-500/20" };
      case "on_hold":
        return { label: "On Hold", dotClass: "status-hold", textClass: "text-zinc-400", bgClass: "bg-zinc-500/10 border-zinc-500/20" };
      case "completed":
        return { label: "Completed", dotClass: "status-complete", textClass: "text-blue-400", bgClass: "bg-blue-500/10 border-blue-500/20" };
      default:
        return { label: status, dotClass: "bg-zinc-500", textClass: "text-zinc-400", bgClass: "bg-zinc-500/10 border-zinc-500/20" };
    }
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1.5">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <FolderKanban className="h-7 w-7 text-primary" />
            Projects Portfolio
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">
            Manage your active initiatives, track overall progress, and review pending milestones all in one place.
          </p>
        </div>
        
        <button 
          onClick={handleCreateProject}
          disabled={isCreating}
          className="h-10 px-4 rounded-lg bg-primary text-sm font-semibold text-white hover:bg-primary/90 shadow-md shadow-primary/25 transition-all cursor-pointer whitespace-nowrap disabled:opacity-50"
        >
          {isCreating ? "Creating..." : "+ New Project"}
        </button>
      </div>

      {/* Filters bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-card border border-border/80 rounded-xl p-2 shadow-sm">
        <div className="relative w-full sm:w-80 shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-9 pr-4 rounded-lg bg-white/[0.03] border border-transparent text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary/40 focus:bg-white/[0.05] transition-all"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 mr-2 shrink-0">
            <SlidersHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs font-semibold text-zinc-300">Filters:</span>
          </div>
          {[
            { id: "all", label: "All Projects" },
            { id: "active", label: "Active" },
            { id: "in_review", label: "In Review" },
            { id: "completed", label: "Completed" }
          ].map(filter => (
            <button
              key={filter.id}
              onClick={() => setStatusFilter(filter.id)}
              className={cn(
                "px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer border",
                statusFilter === filter.id
                  ? "bg-primary text-white border-primary shadow-sm shadow-primary/20"
                  : "bg-transparent text-muted-foreground border-transparent hover:bg-white/5 hover:text-white"
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-[200px] rounded-xl border border-border/40 bg-card/50 p-6 flex flex-col relative overflow-hidden animate-pulse">
              <div className="flex justify-between items-start gap-4 mb-4">
                <div className="space-y-2.5 flex-1">
                  <div className="h-5 w-2/3 bg-white/10 rounded-md"></div>
                  <div className="h-3 w-1/2 bg-white/5 rounded-md"></div>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-6">
                <div className="h-5 w-20 bg-white/10 rounded-md"></div>
              </div>
              <div className="mt-auto space-y-3">
                <div className="flex justify-between items-center">
                  <div className="h-3 w-24 bg-white/5 rounded-md"></div>
                  <div className="h-3 w-8 bg-white/10 rounded-md"></div>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full"></div>
                <div className="flex items-center justify-between pt-4 border-t border-border/20">
                  <div className="h-3 w-28 bg-white/5 rounded-md"></div>
                  <div className="h-3 w-20 bg-white/10 rounded-md"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center rounded-xl border border-dashed border-border/60 bg-card">
          <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center mb-3">
             <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-bold text-white mb-1">No projects found</h3>
          <p className="text-sm text-muted-foreground max-w-sm mb-4">
            Try adjusting your search query or filters, or create a new project.
          </p>
          <button 
            onClick={handleCreateProject}
            className="h-9 px-4 rounded-md border border-border/80 bg-white/5 text-xs font-bold text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            Create Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredProjects.map((project) => {
            const status = getStatusDetails(project.status);
            
            return (
              <Link key={project.id} href={`/projects/${project.id}`} className="group block h-full">
                <div className="card-interactive h-full rounded-xl border border-border/80 bg-card p-6 flex flex-col relative overflow-hidden">
                  
                  {/* Card header */}
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <div className="space-y-1.5 min-w-0 flex-1">
                      <h2 className="text-lg font-bold text-white truncate group-hover:text-primary transition-colors flex items-center gap-2">
                        {project.title}
                      </h2>
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        Project created {project.createdAt ? formatDate(project.createdAt.toISOString()) : "recently"}
                      </p>
                    </div>
                  </div>

                  {/* Badges row */}
                  <div className="flex items-center gap-2 mb-6">
                    <div className={cn("flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border", status.bgClass, status.textClass)}>
                      <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", status.dotClass)} />
                      {status.label}
                    </div>
                  </div>

                  {/* Progress block */}
                  <div className="mt-auto space-y-3">
                    <div className="flex justify-between items-center text-[11px] font-semibold">
                      <span className="text-muted-foreground">Overall Progress</span>
                      <span className="text-white">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                    
                    <div className="flex items-center justify-between pt-4 border-t border-border/40 text-[10px] text-muted-foreground font-medium">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        Created {project.createdAt ? formatDate(project.createdAt.toISOString()) : "N/A"}
                      </div>
                      
                      <div className="flex items-center gap-1 text-white group-hover:text-primary transition-colors">
                        View Details
                        <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                  
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

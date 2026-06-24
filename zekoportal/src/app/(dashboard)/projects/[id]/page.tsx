"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  FileText, 
  MessageSquare, 
  CheckCircle2,
  Circle,
  AlertCircle,
  Layers,
  ArrowUpRight,
  Plus,
  Trash2,
  FolderKanban,
  Edit,
  ListTodo
} from "lucide-react";
import { useProjects } from "@/lib/projects-context";
import { useProjectTasks } from "@/lib/useProjectTasks";
import { useProjectActivity } from "@/lib/useProjectActivity";
import { cn, formatDate } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProjectDetailsPage() {
  const params = useParams();
  const projectId = params.id as string;
  const { projects, loading: projectLoading } = useProjects();
  const project = projects.find((p) => p.id === projectId);
  
  const { tasks, loading: tasksLoading, createTask, toggleTask, deleteTask } = useProjectTasks(projectId);
  const { activity, loading: activityLoading } = useProjectActivity(projectId);

  const [activeTab, setActiveTab] = useState("overview");
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [isCreatingTask, setIsCreatingTask] = useState(false);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    
    setIsCreatingTask(true);
    try {
      await createTask(newTaskTitle.trim());
      setNewTaskTitle("");
    } catch (error) {
      console.error("Failed to create task", error);
      alert("Failed to create task");
    } finally {
      setIsCreatingTask(false);
    }
  };

  if (projectLoading) {
    return (
      <div className="max-w-5xl mx-auto space-y-8 animate-pulse pt-4">
        <div className="flex justify-between">
          <div className="h-6 w-32 bg-white/5 rounded-md" />
          <div className="h-6 w-24 bg-white/5 rounded-md" />
        </div>
        <div className="rounded-xl border border-border/40 bg-card/50 p-8">
          <div className="h-8 w-1/3 bg-white/10 rounded-md mb-4" />
          <div className="h-4 w-1/4 bg-white/5 rounded-md mb-8" />
          <div className="grid grid-cols-4 gap-4 pt-6 border-t border-border/20">
             <div className="h-10 bg-white/5 rounded-md" />
             <div className="h-10 bg-white/5 rounded-md" />
             <div className="h-10 bg-white/5 rounded-md col-span-2" />
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
        <div className="h-16 w-16 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
          <AlertCircle className="h-8 w-8 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Project not found</h2>
        <p className="text-muted-foreground mb-6 max-w-sm">
          The project you are looking for does not exist or you do not have permission to view it.
        </p>
        <Link href="/projects">
          <button className="h-10 px-6 rounded-md bg-primary text-sm font-semibold text-white hover:bg-primary/90 transition-colors cursor-pointer">
            Back to Projects
          </button>
        </Link>
      </div>
    );
  }

  const getStatusDetails = (status: string) => {
    switch (status) {
      case "active": return { label: "Active", classes: "bg-blue-500/10 text-blue-400 border-blue-500/20", dot: "status-active" };
      case "in_review": return { label: "In Review", classes: "bg-orange-500/10 text-orange-400 border-orange-500/20", dot: "status-review" };
      case "completed": return { label: "Completed", classes: "bg-primary/10 text-primary border-primary/20", dot: "bg-primary" };
      default: return { label: status, classes: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20", dot: "bg-zinc-500" };
    }
  };

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return "Just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min${minutes === 1 ? "" : "s"} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hr${hours === 1 ? "" : "s"} ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days === 1 ? "" : "s"} ago`;
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'task_created': return <Plus className="h-3.5 w-3.5 text-white" />;
      case 'task_completed': return <CheckCircle2 className="h-3.5 w-3.5 text-white" />;
      case 'task_deleted': return <Trash2 className="h-3.5 w-3.5 text-white" />;
      case 'project_created': return <FolderKanban className="h-3.5 w-3.5 text-white" />;
      case 'project_updated': return <Edit className="h-3.5 w-3.5 text-white" />;
      default: return <AlertCircle className="h-3.5 w-3.5 text-white" />;
    }
  };

  const status = getStatusDetails(project.status);

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in pb-10 max-w-5xl mx-auto">
      
      {/* Top Breadcrumb & Actions */}
      <div className="flex items-center justify-between gap-4">
        <Link href="/projects" className="group flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-white transition-colors cursor-pointer">
          <div className="h-8 w-8 rounded-md bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
            <ArrowLeft className="h-4 w-4" />
          </div>
          Back to Projects
        </Link>
        <Link href="/messages">
          <button className="flex items-center gap-2 h-9 px-4 rounded-md bg-white/5 border border-white/10 text-xs font-bold text-white hover:bg-white/10 transition-colors cursor-pointer">
            <MessageSquare className="h-3.5 w-3.5" />
            Message Team
          </button>
        </Link>
      </div>

      {/* Header Card */}
      <div className="rounded-xl border border-border/80 bg-card p-6 md:p-8 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[60px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3" />
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
            <div className="space-y-3 flex-1">
              <div className="flex flex-wrap items-center gap-4">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
                  {project.title}
                </h1>
                <div className={cn("flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest border shrink-0", status.classes)}>
                  <span className={cn("h-2 w-2 rounded-full shrink-0", status.dot)} />
                  {status.label}
                </div>
              </div>
              <p className="text-[15px] text-muted-foreground leading-relaxed max-w-2xl mt-2">
                Project created {project.createdAt ? formatDate(project.createdAt.toISOString()) : "recently"}.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-border/40">
            <div className="space-y-1.5">
               <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                 <Calendar className="h-3.5 w-3.5" /> Start Date
               </span>
               <span className="text-sm font-semibold text-white">{project.createdAt ? formatDate(project.createdAt.toISOString()) : "N/A"}</span>
            </div>
            <div className="space-y-1.5">
               <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                 <Clock className="h-3.5 w-3.5" /> Last Updated
               </span>
               <span className="text-sm font-semibold text-white">N/A</span>
            </div>
            <div className="space-y-1.5 col-span-2 md:col-span-2">
               <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-widest">
                 <span className="text-muted-foreground flex items-center gap-1.5">
                   <Layers className="h-3.5 w-3.5" /> Overall Progress
                 </span>
                 <span className="text-primary">{project.progress}%</span>
               </div>
               <Progress value={project.progress} className="h-2 mt-2" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-card border border-border/80 w-full sm:w-auto h-auto p-1 grid grid-cols-3 gap-1">
          <TabsTrigger value="overview" className="text-xs font-bold py-2 data-[state=active]:bg-white/10 data-[state=active]:text-white">
            Tasks
          </TabsTrigger>
          <TabsTrigger value="activity" className="text-xs font-bold py-2 data-[state=active]:bg-white/10 data-[state=active]:text-white">
            Activity Feed
          </TabsTrigger>
          <TabsTrigger value="files" className="text-xs font-bold py-2 data-[state=active]:bg-white/10 data-[state=active]:text-white">
            Files & Assets
          </TabsTrigger>
        </TabsList>
        
        {/* TASKS TAB */}
        <TabsContent value="overview" className="mt-6 animate-fade-in space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
            <div>
              <h3 className="text-lg font-bold text-white">Project Tasks</h3>
              <p className="text-xs font-medium text-muted-foreground">{tasks.length} total tasks</p>
            </div>
            
            <form onSubmit={handleCreateTask} className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="text"
                placeholder="What needs to be done?"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="flex-1 sm:w-64 h-9 px-3 rounded-md bg-white/5 border border-white/10 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                disabled={isCreatingTask}
              />
              <button 
                type="submit"
                disabled={!newTaskTitle.trim() || isCreatingTask}
                className="h-9 px-3 flex items-center justify-center rounded-md bg-primary text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0"
              >
                <Plus className="h-4 w-4" />
              </button>
            </form>
          </div>
          
          {tasksLoading ? (
            <div className="space-y-3 animate-pulse">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-lg border border-border/40 bg-card/50">
                  <div className="h-5 w-5 rounded-full bg-white/10 shrink-0" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 w-1/3 bg-white/10 rounded-md" />
                    <div className="h-2 w-24 bg-white/5 rounded-md" />
                  </div>
                </div>
              ))}
            </div>
          ) : tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center rounded-xl border border-dashed border-border/40 bg-card/50 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="h-14 w-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4 shadow-sm">
                <ListTodo className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">No tasks yet</h3>
              <p className="text-sm text-muted-foreground max-w-sm mb-0">
                Type in the field above and hit enter to add your first task.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {tasks.map((task) => (
                <div 
                  key={task.id} 
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg border transition-colors group",
                    task.completed 
                      ? "bg-white/[0.02] border-border/40" 
                      : "bg-card border-border/80 hover:border-border"
                  )}
                >
                  <button 
                    onClick={() => toggleTask(task.id, !task.completed)}
                    className="shrink-0 text-muted-foreground hover:text-primary transition-colors focus:outline-none"
                  >
                    {task.completed ? (
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    ) : (
                      <Circle className="h-5 w-5" />
                    )}
                  </button>
                  
                  <div className="flex-1 min-w-0 flex flex-col">
                    <span className={cn(
                      "text-sm font-medium truncate transition-all",
                      task.completed ? "text-muted-foreground line-through decoration-muted-foreground/50" : "text-white"
                    )}>
                      {task.title}
                    </span>
                    {task.createdAt && (
                      <span className="text-[10px] text-muted-foreground">
                        Added {formatDate(task.createdAt.toISOString())}
                      </span>
                    )}
                  </div>
                  
                  <button 
                    onClick={() => deleteTask(task.id)}
                    className="shrink-0 p-1.5 rounded-md text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-red-400 hover:bg-red-500/10 transition-all focus:outline-none focus:opacity-100"
                    title="Delete task"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </TabsContent>


        {/* ACTIVITY TAB */}
        <TabsContent value="activity" className="mt-6 animate-fade-in">
          <div className="rounded-xl border border-border/80 bg-card p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">Activity Timeline</h3>
              <span className="text-xs font-medium text-muted-foreground">{activity.length} events</span>
            </div>
            
            {activityLoading ? (
              <div className="relative pl-6 border-l-2 border-border/40 space-y-8 mt-4 animate-pulse">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[31px] top-0 h-7 w-7 rounded-full bg-white/10 border-2 border-card" />
                    <div className="bg-card/50 border border-border/40 rounded-lg p-4">
                      <div className="h-4 w-1/2 bg-white/10 rounded-md mb-2" />
                      <div className="h-3 w-20 bg-white/5 rounded-md" />
                    </div>
                  </div>
                ))}
              </div>
            ) : activity.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center rounded-xl border border-dashed border-border/40 bg-card/50">
                 <div className="h-14 w-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4 shadow-sm">
                   <Clock className="h-6 w-6 text-muted-foreground" />
                 </div>
                 <p className="text-lg font-bold text-white mb-2">No activity yet</p>
                 <p className="text-sm text-muted-foreground mt-1 max-w-xs">Actions will appear here automatically as you work on this project.</p>
              </div>
            ) : (
              <div className="relative pl-6 border-l-2 border-border/60 space-y-8 mt-4">
                {activity.map((act) => (
                  <div key={act.id} className="relative group">
                    <div className="absolute -left-[31px] top-0 h-7 w-7 rounded-full border-2 border-card bg-primary flex items-center justify-center shrink-0 shadow-sm shadow-primary/20">
                      {getActivityIcon(act.type)}
                    </div>
                    <div className="bg-white/[0.02] border border-border/40 rounded-lg p-4 group-hover:bg-white/[0.04] group-hover:border-border/80 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <span className="text-sm font-bold text-white group-hover:text-primary transition-colors">
                          {act.message}
                        </span>
                        <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5 shrink-0">
                          <Clock className="h-3.5 w-3.5" />
                          {act.createdAt ? getTimeAgo(act.createdAt) : "Just now"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        {/* FILES TAB */}
        <TabsContent value="files" className="mt-6 animate-fade-in">
          <div className="flex flex-col items-center justify-center py-20 text-center rounded-xl border border-dashed border-border/60 bg-card">
            <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">No files yet</h3>
            <p className="text-sm text-muted-foreground max-w-sm mb-6">
              Documents, assets, and deliverables for this project will appear here once uploaded by the team.
            </p>
            <button className="h-9 px-4 rounded-md border border-border/80 bg-white/5 text-xs font-bold text-white hover:bg-white/10 transition-colors cursor-pointer">
              Upload File
            </button>
          </div>
        </TabsContent>
      </Tabs>
      
    </div>
  );
}

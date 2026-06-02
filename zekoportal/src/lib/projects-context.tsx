"use client";

import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from "react";
import { useAuth } from "./auth-context";
import { FirestoreProject, subscribeToProjects, createProject as createFirestoreProject } from "./projects";
import { subscribeToTaskCounts } from "./tasks";

interface ProjectsContextType {
  projects: FirestoreProject[];
  loading: boolean;
  createProject: (data: Omit<FirestoreProject, "id" | "userId" | "createdAt">) => Promise<string>;
}

const ProjectsContext = createContext<ProjectsContextType | null>(null);

export function ProjectsProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [rawProjects, setRawProjects] = useState<FirestoreProject[]>([]);
  const [loading, setLoading] = useState(true);

  // Track task counts per project: { [projectId]: { total, completed } }
  const [taskCounts, setTaskCounts] = useState<Record<string, { total: number; completed: number }>>({});

  // Keep a ref of active task-count unsubscribers keyed by projectId
  const taskUnsubs = useRef<Record<string, () => void>>({});

  // Subscribe to the user's projects
  useEffect(() => {
    if (!user) {
      setRawProjects([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsubscribe = subscribeToProjects(user.uid, (updatedProjects) => {
      setRawProjects(updatedProjects);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  // Subscribe to task counts for each project
  useEffect(() => {
    const currentUnsubs = taskUnsubs.current;
    const currentProjectIds = new Set(rawProjects.map((p) => p.id));

    // Tear down listeners for projects that no longer exist
    for (const id of Object.keys(currentUnsubs)) {
      if (!currentProjectIds.has(id)) {
        currentUnsubs[id]();
        delete currentUnsubs[id];
        setTaskCounts((prev) => {
          const next = { ...prev };
          delete next[id];
          return next;
        });
      }
    }

    // Set up listeners for new projects
    for (const project of rawProjects) {
      if (!currentUnsubs[project.id]) {
        currentUnsubs[project.id] = subscribeToTaskCounts(
          project.id,
          (total, completed) => {
            setTaskCounts((prev) => ({
              ...prev,
              [project.id]: { total, completed },
            }));
          }
        );
      }
    }

    // Cleanup all listeners on unmount
    return () => {
      for (const unsub of Object.values(taskUnsubs.current)) {
        unsub();
      }
      taskUnsubs.current = {};
    };
  }, [rawProjects]);

  // Compute projects with task-based progress
  const projects: FirestoreProject[] = rawProjects.map((p) => {
    const counts = taskCounts[p.id];
    const computedProgress =
      counts && counts.total > 0
        ? Math.round((counts.completed / counts.total) * 100)
        : 0;
    return { ...p, progress: computedProgress };
  });

  const createProject = useCallback(
    async (data: Omit<FirestoreProject, "id" | "userId" | "createdAt">) => {
      if (!user) throw new Error("User must be authenticated to create a project.");
      return await createFirestoreProject(user.uid, data);
    },
    [user]
  );

  return (
    <ProjectsContext.Provider value={{ projects, loading, createProject }}>
      {children}
    </ProjectsContext.Provider>
  );
}

export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error("useProjects must be used within a ProjectsProvider");
  }
  return context;
};

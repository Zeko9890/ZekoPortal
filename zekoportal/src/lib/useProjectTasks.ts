import { useState, useEffect } from "react";
import { useAuth } from "./auth-context";
import { FirestoreTask, subscribeToTasks, createTask as apiCreateTask, toggleTaskCompletion as apiToggleTask, deleteTask as apiDeleteTask } from "./tasks";

export function useProjectTasks(projectId: string | undefined) {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<FirestoreTask[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!projectId) {
      setTasks([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsubscribe = subscribeToTasks(projectId, (updatedTasks) => {
      setTasks(updatedTasks);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [projectId]);

  const createTask = async (title: string, dueDate?: Date | null) => {
    if (!projectId) throw new Error("No project ID provided");
    if (!user) throw new Error("User not authenticated");
    return await apiCreateTask(projectId, user.uid, title, dueDate);
  };

  const toggleTask = async (taskId: string, completed: boolean) => {
    if (!projectId) throw new Error("No project ID provided");
    if (!user) throw new Error("User not authenticated");
    return await apiToggleTask(projectId, taskId, user.uid, completed);
  };

  const deleteTask = async (taskId: string) => {
    if (!projectId) throw new Error("No project ID provided");
    if (!user) throw new Error("User not authenticated");
    return await apiDeleteTask(projectId, taskId, user.uid);
  };

  return {
    tasks,
    loading,
    createTask,
    toggleTask,
    deleteTask
  };
}

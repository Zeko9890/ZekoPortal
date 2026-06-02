import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp, 
  updateDoc, 
  deleteDoc, 
  doc, 
  Timestamp 
} from "firebase/firestore";
import { db } from "./firebase";
import { logActivity } from "./activity";

export interface FirestoreTask {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date | null;
  dueDate: Date | null;
}

/**
 * Creates a new task in the specified project's subcollection.
 */
export async function createTask(
  projectId: string, 
  userId: string,
  title: string,
  dueDate?: Date | null
) {
  const colRef = collection(db, `projects/${projectId}/tasks`);
  const docRef = await addDoc(colRef, {
    title,
    completed: false,
    createdAt: serverTimestamp(),
    dueDate: dueDate ? Timestamp.fromDate(dueDate) : null
  });
  
  await logActivity(projectId, userId, "task_created", `Added task: "${title}"`);
  
  return docRef.id;
}

/**
 * Subscribes to real-time updates for a project's tasks.
 */
export function subscribeToTasks(
  projectId: string, 
  onTasksUpdate: (tasks: FirestoreTask[]) => void
) {
  const colRef = collection(db, `projects/${projectId}/tasks`);
  
  // Note: if you want to use orderBy("createdAt", "desc"), you might need an index.
  // We'll sort on the client for now to avoid forcing index creation.
  const q = query(colRef);

  return onSnapshot(q, (snapshot) => {
    const tasks: FirestoreTask[] = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        completed: data.completed,
        createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : null,
        dueDate: data.dueDate instanceof Timestamp ? data.dueDate.toDate() : null
      } as FirestoreTask;
    });
    
    // Sort on client: incomplete first, then by creation date (newest first)
    tasks.sort((a, b) => {
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      if (!a.createdAt) return -1;
      if (!b.createdAt) return 1;
      return b.createdAt.getTime() - a.createdAt.getTime();
    });

    onTasksUpdate(tasks);
  });
}

/**
 * Toggles a task's completion status.
 */
export async function toggleTaskCompletion(projectId: string, taskId: string, userId: string, completed: boolean) {
  const docRef = doc(db, `projects/${projectId}/tasks`, taskId);
  await updateDoc(docRef, { completed });
  
  await logActivity(projectId, userId, "task_completed", `Marked task as ${completed ? "completed" : "incomplete"}`);
}

/**
 * Deletes a task.
 */
export async function deleteTask(projectId: string, taskId: string, userId: string) {
  const docRef = doc(db, `projects/${projectId}/tasks`, taskId);
  await deleteDoc(docRef);
  
  await logActivity(projectId, userId, "task_deleted", "Deleted a task");
}

/**
 * Lightweight listener that only tracks task counts for progress computation.
 * Avoids full task parsing — only reads the `completed` boolean.
 */
export function subscribeToTaskCounts(
  projectId: string,
  onCounts: (total: number, completed: number) => void
) {
  const colRef = collection(db, `projects/${projectId}/tasks`);
  const q = query(colRef);

  return onSnapshot(q, (snapshot) => {
    let total = 0;
    let completed = 0;
    snapshot.docs.forEach((doc) => {
      total++;
      if (doc.data().completed) completed++;
    });
    onCounts(total, completed);
  });
}

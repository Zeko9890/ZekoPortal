import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  serverTimestamp, 
  Timestamp 
} from "firebase/firestore";
import { db } from "./firebase";

export interface FirestoreActivity {
  id: string;
  type: "task_created" | "task_completed" | "task_deleted" | "project_created" | "project_updated";
  message: string;
  createdAt: Date | null;
  userId: string;
}

/**
 * Logs an activity event for a specific project.
 */
export async function logActivity(
  projectId: string, 
  userId: string, 
  type: FirestoreActivity["type"], 
  message: string
) {
  const colRef = collection(db, `projects/${projectId}/activity`);
  await addDoc(colRef, {
    type,
    message,
    userId,
    createdAt: serverTimestamp()
  });
}

/**
 * Subscribes to real-time activity updates for a project.
 */
export function subscribeToActivity(
  projectId: string, 
  onActivityUpdate: (activity: FirestoreActivity[]) => void
) {
  const colRef = collection(db, `projects/${projectId}/activity`);
  const q = query(colRef);

  return onSnapshot(q, (snapshot) => {
    const activityList: FirestoreActivity[] = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        type: data.type,
        message: data.message,
        userId: data.userId,
        createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : null
      } as FirestoreActivity;
    });
    
    // Sort on client by createdAt descending (newest first)
    activityList.sort((a, b) => {
      if (!a.createdAt) return -1;
      if (!b.createdAt) return 1;
      return b.createdAt.getTime() - a.createdAt.getTime();
    });

    onActivityUpdate(activityList);
  });
}

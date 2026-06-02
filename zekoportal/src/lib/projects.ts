import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  where, 
  orderBy, 
  serverTimestamp, 
  updateDoc, 
  deleteDoc, 
  doc, 
  Timestamp 
} from "firebase/firestore";
import { db } from "./firebase";
import { logActivity } from "./activity";

export interface FirestoreProject {
  id: string;
  title: string;
  status: "active" | "completed" | "pending" | "in_review" | "on_hold";
  progress: number;
  userId: string;
  createdAt: Date | null;
}

const PROJECTS_COLLECTION = "projects";

/**
 * Creates a new project in Firestore for the given user.
 */
export async function createProject(
  userId: string, 
  data: Omit<FirestoreProject, "id" | "userId" | "createdAt">
) {
  const colRef = collection(db, PROJECTS_COLLECTION);
  const docRef = await addDoc(colRef, {
    ...data,
    userId,
    createdAt: serverTimestamp()
  });
  
  await logActivity(docRef.id, userId, "project_created", "Project was created");
  
  return docRef.id;
}

/**
 * Subscribes to real-time updates for a user's projects.
 * Returns an unsubscribe function to clean up the listener.
 */
export function subscribeToProjects(
  userId: string, 
  onProjectsUpdate: (projects: FirestoreProject[]) => void
) {
  const colRef = collection(db, PROJECTS_COLLECTION);
  
  // Note: If you want to orderBy("createdAt", "desc"), you might need to create a Firestore composite index.
  // For now, we will sort them on the client to avoid forcing the user to create an index immediately.
  const q = query(colRef, where("userId", "==", userId));

  return onSnapshot(q, (snapshot) => {
    const projects: FirestoreProject[] = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        status: data.status,
        progress: data.progress,
        userId: data.userId,
        createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : null
      } as FirestoreProject;
    });
    
    // Client-side sort by createdAt descending (newest first)
    projects.sort((a, b) => {
      if (!a.createdAt) return -1;
      if (!b.createdAt) return 1;
      return b.createdAt.getTime() - a.createdAt.getTime();
    });

    onProjectsUpdate(projects);
  });
}

/**
 * Updates an existing project in Firestore.
 */
export async function updateProject(
  projectId: string, 
  userId: string,
  data: Partial<Omit<FirestoreProject, "id" | "userId" | "createdAt">>
) {
  const docRef = doc(db, PROJECTS_COLLECTION, projectId);
  await updateDoc(docRef, data);
  
  await logActivity(projectId, userId, "project_updated", "Project details were updated");
}

/**
 * Deletes a project from Firestore.
 */
export async function deleteProject(projectId: string) {
  const docRef = doc(db, PROJECTS_COLLECTION, projectId);
  await deleteDoc(docRef);
}

import { useState, useEffect } from "react";
import { FirestoreActivity, subscribeToActivity } from "./activity";

export function useProjectActivity(projectId: string | undefined) {
  const [activity, setActivity] = useState<FirestoreActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!projectId) {
      setActivity([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsubscribe = subscribeToActivity(projectId, (updatedActivity) => {
      setActivity(updatedActivity);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [projectId]);

  return {
    activity,
    loading
  };
}

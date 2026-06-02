export interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'completed' | 'overdue' | 'in_review';
  progress: number; // 0 to 100
}

export interface Activity {
  id: string;
  type: 'update' | 'message' | 'milestone' | 'document' | 'status' | 'general';
  title: string;
  description: string;
  timestamp: string;
  user: {
    name: string;
    avatar?: string;
    role?: string;
  };
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'in_review' | 'completed' | 'on_hold';
  progress: number; // 0 to 100
  clientName: string;
  providerName: string;
  startDate: string;
  endDate: string;
  category: string;
  budget: string;
  team: {
    name: string;
    role: string;
    avatar?: string;
  }[];
  milestones: Milestone[];
  activities: Activity[];
}

export interface Message {
  id: string;
  sender: 'client' | 'provider';
  text: string;
  timestamp: string;
  read: boolean;
}

export interface Participant {
  name: string;
  role: string;
  avatar?: string;
  status: 'online' | 'offline';
}

export interface Conversation {
  id: string;
  participant: Participant;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: Message[];
}

export interface UserProfile {
  name: string;
  email: string;
  role: string;
  company: string;
  avatar?: string;
  timezone: string;
  notifications: {
    email: boolean;
    push: boolean;
    weeklyDigest: boolean;
    projectUpdates: boolean;
  };
}

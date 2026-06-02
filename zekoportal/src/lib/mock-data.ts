import { Project, Conversation, UserProfile } from '../types';

export const mockUserProfile: UserProfile = {
  name: 'Sarah Connor',
  email: 'sarah@skynetsolutions.com',
  role: 'Product Director',
  company: 'Skynet Solutions',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
  timezone: 'America/Los_Angeles (PST)',
  notifications: {
    email: true,
    push: false,
    weeklyDigest: true,
    projectUpdates: true,
  },
};

export const mockProjects: Project[] = [
  {
    id: 'proj-1',
    name: 'Skynet Web Platform Redesign',
    description: 'Complete overhaul of the main customer portal and public-facing site. Focus on high-end glassmorphism design, fast performance, and a sleek dashboard for end-users.',
    status: 'active',
    progress: 68,
    clientName: 'Skynet Solutions',
    providerName: 'Zeko Labs',
    startDate: '2026-04-10',
    endDate: '2026-06-30',
    category: 'Design & Development',
    budget: '$48,000',
    team: [
      { name: 'Alex Rivera', role: 'Lead Developer', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
      { name: 'Sarah Connor', role: 'Product Director (Client)', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
      { name: 'Marcus Wright', role: 'UI/UX Designer', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' }
    ],
    milestones: [
      {
        id: 'ms-1-1',
        title: 'Wireframes & Interactive Prototypes',
        description: 'Provide desktop and mobile layouts for the client portal and core dashboards.',
        dueDate: '2026-04-25',
        status: 'completed',
        progress: 100
      },
      {
        id: 'ms-1-2',
        title: 'Frontend Component Architecture',
        description: 'Set up shadcn/ui components, custom layouts, and routing using Next.js App Router.',
        dueDate: '2026-05-15',
        status: 'completed',
        progress: 100
      },
      {
        id: 'ms-1-3',
        title: 'Backend Integration & State Management',
        description: 'Connect frontend to core services, set up authentication, and design real-time synchronization.',
        dueDate: '2026-06-10',
        status: 'pending',
        progress: 30
      },
      {
        id: 'ms-1-4',
        title: 'Final Q&A and Deployment',
        description: 'Complete cross-browser testing, accessibility checking, and deployment to production.',
        dueDate: '2026-06-30',
        status: 'pending',
        progress: 0
      }
    ],
    activities: [
      {
        id: 'act-1-1',
        type: 'status',
        title: 'Project set to Active',
        description: 'The redesigned client portal kickoff session completed and project status updated.',
        timestamp: '2026-04-10T10:00:00Z',
        user: { name: 'Alex Rivera', role: 'Lead Developer' }
      },
      {
        id: 'act-1-2',
        type: 'milestone',
        title: 'Milestone Completed: Wireframes & Interactive Prototypes',
        description: 'All Figma high-fidelity mockups approved by Sarah Connor.',
        timestamp: '2026-04-24T16:45:00Z',
        user: { name: 'Sarah Connor', role: 'Product Director (Client)', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' }
      },
      {
        id: 'act-1-3',
        type: 'document',
        title: 'Uploaded Architecture Design.pdf',
        description: 'Technical spec document showing DB schemas and Next.js structure.',
        timestamp: '2026-05-02T11:15:00Z',
        user: { name: 'Alex Rivera', role: 'Lead Developer', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' }
      },
      {
        id: 'act-1-4',
        type: 'milestone',
        title: 'Milestone Completed: Frontend Component Architecture',
        description: 'Tailwind styles and shadcn system are fully integrated and verified.',
        timestamp: '2026-05-15T18:00:00Z',
        user: { name: 'Marcus Wright', role: 'UI/UX Designer', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' }
      },
      {
        id: 'act-1-5',
        type: 'update',
        title: 'Updated Progress to 68%',
        description: 'Completed auth setup and first batch of protected page components.',
        timestamp: '2026-05-28T09:30:00Z',
        user: { name: 'Alex Rivera', role: 'Lead Developer', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' }
      }
    ]
  },
  {
    id: 'proj-2',
    name: 'Cybernetic AI Engine API Integration',
    description: 'Integrating external machine-learning models into the existing pipeline. Creating customizable middleware, developer tokens, and standard response models.',
    status: 'in_review',
    progress: 92,
    clientName: 'Skynet Solutions',
    providerName: 'Zeko Labs',
    startDate: '2026-05-01',
    endDate: '2026-06-15',
    category: 'API & Integration',
    budget: '$32,000',
    team: [
      { name: 'Alex Rivera', role: 'Lead Developer', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
      { name: 'Elena Rostova', role: 'AI Specialist', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150' }
    ],
    milestones: [
      {
        id: 'ms-2-1',
        title: 'API Schema Design',
        description: 'Define input and output JSON schemas for target ML inference pipelines.',
        dueDate: '2026-05-10',
        status: 'completed',
        progress: 100
      },
      {
        id: 'ms-2-2',
        title: 'Pipeline Model Execution',
        description: 'Deploy inference runner script inside cloud-based worker machines.',
        dueDate: '2026-05-25',
        status: 'completed',
        progress: 100
      },
      {
        id: 'ms-2-3',
        title: 'Client System Validation & Review',
        description: 'Currently awaiting client sign-off on performance test results.',
        dueDate: '2026-06-05',
        status: 'pending',
        progress: 80
      }
    ],
    activities: [
      {
        id: 'act-2-1',
        type: 'update',
        title: 'API Integration Draft Created',
        description: 'Initial schemas outlined in the repository documentation.',
        timestamp: '2026-05-02T14:22:00Z',
        user: { name: 'Elena Rostova', role: 'AI Specialist', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150' }
      },
      {
        id: 'act-2-2',
        type: 'milestone',
        title: 'Milestone Completed: Pipeline Model Execution',
        description: 'Validation testing results: average latency of 85ms across 10k requests.',
        timestamp: '2026-05-24T10:00:00Z',
        user: { name: 'Elena Rostova', role: 'AI Specialist', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150' }
      },
      {
        id: 'act-2-3',
        type: 'status',
        title: 'Status changed to In Review',
        description: 'Waiting for Skynet QA team to sign off on final round of performance dashboards.',
        timestamp: '2026-05-29T16:00:00Z',
        user: { name: 'Alex Rivera', role: 'Lead Developer', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' }
      }
    ]
  },
  {
    id: 'proj-3',
    name: 'Skynet Mobile Companion App',
    description: 'Hybrid iOS and Android applications utilizing React Native. Designed to monitor hardware statuses, execute remote updates, and alert administrators in case of critical thresholds.',
    status: 'on_hold',
    progress: 25,
    clientName: 'Skynet Solutions',
    providerName: 'Zeko Labs',
    startDate: '2026-03-01',
    endDate: '2026-08-30',
    category: 'Mobile Development',
    budget: '$65,000',
    team: [
      { name: 'Sarah Connor', role: 'Product Director (Client)', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
      { name: 'Lucas Hayes', role: 'Mobile Engineer', avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150' }
    ],
    milestones: [
      {
        id: 'ms-3-1',
        title: 'UX Flow Design & Client Sign-Off',
        description: 'Interactive wireframes detailing how users navigate through alerts, notifications and metrics.',
        dueDate: '2026-03-25',
        status: 'completed',
        progress: 100
      },
      {
        id: 'ms-3-2',
        title: 'Hardware Link Protocols (BLE)',
        description: 'Draft logic for connecting client phones to Skynet devices over Bluetooth Low Energy.',
        dueDate: '2026-05-05',
        status: 'overdue',
        progress: 10
      }
    ],
    activities: [
      {
        id: 'act-3-1',
        type: 'update',
        title: 'Bluetooth low energy research logged',
        description: 'Created bluetooth support matrix for iOS vs Android stack versions.',
        timestamp: '2026-03-12T11:00:00Z',
        user: { name: 'Lucas Hayes', role: 'Mobile Engineer', avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150' }
      },
      {
        id: 'act-3-2',
        type: 'status',
        title: 'Project set to On Hold',
        description: 'Skynet internal hardware specifications are currently being updated; pausing mobile BLE work.',
        timestamp: '2026-04-18T15:20:00Z',
        user: { name: 'Sarah Connor', role: 'Product Director (Client)', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' }
      }
    ]
  },
  {
    id: 'proj-4',
    name: 'Skynet Cloud Security Hardening',
    description: 'Performing comprehensive audit, penetration testing, VPC configurations, identity access management controls, and compliance report writing.',
    status: 'completed',
    progress: 100,
    clientName: 'Skynet Solutions',
    providerName: 'Zeko Labs',
    startDate: '2026-02-01',
    endDate: '2026-04-30',
    category: 'Cybersecurity',
    budget: '$50,000',
    team: [
      { name: 'Elena Rostova', role: 'Security Analyst', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150' },
      { name: 'Alex Rivera', role: 'Lead Developer', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' }
    ],
    milestones: [
      {
        id: 'ms-4-1',
        title: 'Initial Vulnerability Audit',
        description: 'Run automated scanners and perform standard network mapping activities.',
        dueDate: '2026-02-28',
        status: 'completed',
        progress: 100
      },
      {
        id: 'ms-4-2',
        title: 'VPC and Firewall Re-configuration',
        description: 'Lock down port bindings, configure subnet routes, write security groups.',
        dueDate: '2026-03-31',
        status: 'completed',
        progress: 100
      },
      {
        id: 'ms-4-3',
        title: 'Final Compliance Audit Report',
        description: 'Complete SOC2 compliance matrix and sign off on internal system modifications.',
        dueDate: '2026-04-30',
        status: 'completed',
        progress: 100
      }
    ],
    activities: [
      {
        id: 'act-4-1',
        type: 'milestone',
        title: 'Milestone Completed: Initial Vulnerability Audit',
        description: 'Discovered and logged 4 critical security vectors.',
        timestamp: '2026-02-27T17:30:00Z',
        user: { name: 'Elena Rostova', role: 'Security Analyst', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150' }
      },
      {
        id: 'act-4-2',
        type: 'milestone',
        title: 'Milestone Completed: VPC Configuration',
        description: 'Firewall rules tested and updated across all target instances.',
        timestamp: '2026-03-29T11:00:00Z',
        user: { name: 'Alex Rivera', role: 'Lead Developer', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' }
      },
      {
        id: 'act-4-3',
        type: 'milestone',
        title: 'Milestone Completed: Final Compliance Audit Report',
        description: 'Zeko Security Audit Team officially signs off. Document delivered.',
        timestamp: '2026-04-28T14:00:00Z',
        user: { name: 'Elena Rostova', role: 'Security Analyst', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150' }
      },
      {
        id: 'act-4-4',
        type: 'status',
        title: 'Project set to Completed',
        description: 'All deliverables uploaded, validated, and approved by Skynet board.',
        timestamp: '2026-04-30T10:00:00Z',
        user: { name: 'Sarah Connor', role: 'Product Director (Client)', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' }
      }
    ]
  }
];

export const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    participant: {
      name: 'Alex Rivera',
      role: 'Lead Developer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      status: 'online',
    },
    lastMessage: 'I have updated the login screens and added Framer Motion animations. Can you take a look at the layout wrapper?',
    lastMessageTime: '10:42 AM',
    unreadCount: 2,
    messages: [
      { id: 'm-1-1', sender: 'provider', text: 'Hi Sarah, welcome to your new client portal!', timestamp: 'May 28, 2026 2:15 PM', read: true },
      { id: 'm-1-2', sender: 'client', text: 'Thanks Alex! The layout looks super clean and the speed is incredible. Can we review the authentication design?', timestamp: 'May 28, 2026 2:20 PM', read: true },
      { id: 'm-1-3', sender: 'provider', text: 'Yes, we are using cookie-based auth tokens and everything is wrapped in secure Next.js layouts.', timestamp: 'May 28, 2026 2:32 PM', read: true },
      { id: 'm-1-4', sender: 'provider', text: 'I have updated the login screens and added Framer Motion animations. Can you take a look at the layout wrapper?', timestamp: 'May 31, 2026 10:42 AM', read: false },
    ],
  },
  {
    id: 'conv-2',
    participant: {
      name: 'Elena Rostova',
      role: 'Security Specialist',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      status: 'offline',
    },
    lastMessage: 'The penetration audit is officially complete. You can download the SOC2 compliance file in your dashboard documents section.',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    messages: [
      { id: 'm-2-1', sender: 'provider', text: 'Good morning Sarah. I am starting on the VPC configurations this morning.', timestamp: 'May 29, 2026 9:00 AM', read: true },
      { id: 'm-2-2', sender: 'client', text: 'Awesome. Please keep us updated about the public-facing port bindings.', timestamp: 'May 29, 2026 10:15 AM', read: true },
      { id: 'm-2-3', sender: 'provider', text: 'The penetration audit is officially complete. You can download the SOC2 compliance file in your dashboard documents section.', timestamp: 'May 30, 2026 4:18 PM', read: true },
    ],
  },
  {
    id: 'conv-3',
    participant: {
      name: 'Marcus Wright',
      role: 'UI/UX Designer',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      status: 'online',
    },
    lastMessage: 'Let me know if the font sizes feel right. We can switch to Inter or Outfit if you prefer.',
    lastMessageTime: '3 days ago',
    unreadCount: 0,
    messages: [
      { id: 'm-3-1', sender: 'provider', text: 'Hi Sarah, I uploaded the high-fidelity mockups for the dashboard layout.', timestamp: 'May 25, 2026 1:00 PM', read: true },
      { id: 'm-3-2', sender: 'client', text: 'They look incredible Marcus. Especially the dark theme cards!', timestamp: 'May 25, 2026 2:30 PM', read: true },
      { id: 'm-3-3', sender: 'provider', text: 'Let me know if the font sizes feel right. We can switch to Inter or Outfit if you prefer.', timestamp: 'May 28, 2026 11:10 AM', read: true },
    ],
  },
];

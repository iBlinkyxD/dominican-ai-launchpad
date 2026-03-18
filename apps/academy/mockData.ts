import {
  User,
  Space,
  Post,
  Course,
  Event,
  Chat,
  Notification,
  Badge,
} from "./types";

// --- Badges ---
const BADGES: Record<string, Badge> = {
  helper: {
    id: "b1",
    name: "Top Helper",
    icon: "🤝",
    description: "Consistently helps others in comments.",
    color: "bg-blue-100 text-blue-700",
  },
  scholar: {
    id: "b2",
    name: "Scholar",
    icon: "📚",
    description: "Completed 5+ courses.",
    color: "bg-purple-100 text-purple-700",
  },
  innovator: {
    id: "b3",
    name: "Innovator",
    icon: "💡",
    description: "Posted highly rated creative ideas.",
    color: "bg-yellow-100 text-yellow-700",
  },
  guide: {
    id: "b4",
    name: "Community Guide",
    icon: "🧭",
    description: "Welcomes new members.",
    color: "bg-green-100 text-green-700",
  },
  star: {
    id: "b5",
    name: "Rising Star",
    icon: "✨",
    description: "Fastest growing reputation this month.",
    color: "bg-pink-100 text-pink-700",
  },
};

// --- Seed Data ---

export const CURRENT_USER: User = {
  id: "u1",
  name: "Dwight Schrute",
  email: "dwight@daia.edu",
  role: "student",
  avatar:
    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  bio: "Learning AI and Design. Aspiring beet farmer and robotics engineer.",
  location: "Santo Domingo",
  interests: ["AI", "Design", "Robotics"],
  joinedSpaces: ["s1", "s3", "s4"],
  level: 4,
  points: 450,
  nextLevelPoints: 600,
  reputation: 24,
  badges: [BADGES.innovator, BADGES.star],
};

export const MOCK_USERS: User[] = [
  CURRENT_USER,
  {
    id: "u2",
    name: "Sarah Jenkins",
    email: "sarah@daia.edu",
    role: "teacher",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60",
    bio: "Science teacher loving all things Physics and Chemistry. Let's experiment!",
    location: "Santiago",
    interests: ["Science", "Physics", "Education", "STEM"],
    joinedSpaces: ["s1"],
    level: 12,
    points: 2400,
    nextLevelPoints: 3000,
    reputation: 156,
    badges: [BADGES.guide, BADGES.scholar, BADGES.helper],
  },
  {
    id: "u3",
    name: "Mr. O'Neill",
    email: "oneill@daia.edu",
    role: "teacher",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60",
    bio: "Robotics Club Advisor. Building the future one servo at a time.",
    location: "Santo Domingo",
    interests: ["Robotics", "Coding", "Engineering"],
    joinedSpaces: ["s4", "s1"],
    level: 15,
    points: 4500,
    nextLevelPoints: 5000,
    reputation: 340,
    badges: [BADGES.innovator, BADGES.guide],
  },
  {
    id: "u4",
    name: "Maria Rodriguez",
    email: "maria@daia.edu",
    role: "parent",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=60",
    bio: "Mother of two. Interested in how AI is shaping education for our kids.",
    location: "Punta Cana",
    interests: ["Parenting", "Education Policy", "Art"],
    joinedSpaces: ["s2"],
    level: 3,
    points: 320,
    nextLevelPoints: 400,
    reputation: 15,
    badges: [BADGES.helper],
  },
  {
    id: "u5",
    name: "Alex Chen",
    email: "alex@daia.edu",
    role: "student",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=60",
    bio: "Coding wizard in training. Python is my second language.",
    location: "Santo Domingo",
    interests: ["Coding", "Python", "Gaming", "AI"],
    joinedSpaces: ["s1", "s3"],
    level: 7,
    points: 1200,
    nextLevelPoints: 1500,
    reputation: 89,
    badges: [BADGES.scholar, BADGES.innovator],
  },
  {
    id: "u6",
    name: "Elena Gomez",
    email: "elena@daia.edu",
    role: "learner",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=60",
    bio: "Lifelong learner exploring the intersection of Art and AI.",
    location: "La Romana",
    interests: ["Art History", "Generative AI", "Design"],
    joinedSpaces: ["s1"],
    level: 2,
    points: 150,
    nextLevelPoints: 300,
    reputation: 8,
    badges: [],
  },
  {
    id: "u7",
    name: "David Ortiz",
    email: "bigpapi@daia.edu",
    role: "parent",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60",
    bio: "Supporting the local community and tech education.",
    location: "Santo Domingo",
    interests: ["Sports", "Community", "Leadership"],
    joinedSpaces: ["s2", "s1"],
    level: 5,
    points: 600,
    nextLevelPoints: 800,
    reputation: 45,
    badges: [BADGES.star],
  },
];

export const MOCK_SPACES: Space[] = [
  {
    id: "s1",
    name: "DAIA Announcements",
    description: "Official news and updates from the D-A-I-A administration.",
    coverImage: "https://picsum.photos/seed/space1/800/300",
    category: "school",
    visibility: "public",
    memberCount: 1250,
    isJoined: true,
  },
  {
    id: "s2",
    name: "Parents Community",
    description: "A support group for parents to discuss education and events.",
    coverImage: "https://picsum.photos/seed/space2/800/300",
    category: "topic",
    visibility: "private",
    memberCount: 340,
    isJoined: false,
  },
  {
    id: "s3",
    name: "English 101",
    description: "Beginner English course discussions and homework help.",
    coverImage: "https://picsum.photos/seed/space3/800/300",
    category: "topic",
    visibility: "public",
    memberCount: 85,
    isJoined: true,
  },
  {
    id: "s4",
    name: "Robotics Club",
    description: "Building the future, one servo at a time.",
    coverImage: "https://picsum.photos/seed/space4/800/300",
    category: "club",
    visibility: "public",
    memberCount: 42,
    isJoined: true,
  },
];

export const MOCK_POSTS: Post[] = [
  {
    id: "p1",
    authorId: "u2",
    authorName: "Sarah Jenkins",
    authorAvatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60",
    spaceId: "s1",
    spaceName: "DAIA Announcements",
    type: "text",
    body: "Welcome to the new D-A-I-A platform! We are excited to have students, parents, and teachers all in one place. Please update your profile.",
    createdAt: "2h ago",
    likes: 45,
    comments: 12,
    tags: ["announcement", "welcome"],
  },
  {
    id: "p2",
    authorId: "u3",
    authorName: "Mr. O'Neill",
    authorAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60",
    spaceId: "s4",
    spaceName: "Robotics Club",
    type: "image",
    body: "Great progress on the rover prototype today! Check out the suspension mechanism.",
    mediaUrl: "https://picsum.photos/seed/rover/600/400",
    createdAt: "5h ago",
    likes: 28,
    comments: 4,
  },
];

export const MOCK_COURSES: Course[] = [
  {
    id: "c1",
    code: "AI-001",
    title: "Discover AI (Mini Course)",
    description:
      "Intro to AI and its impact on life, work, and opportunity in the Dominican Republic.",
    thumbnail:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    progress: 0,
    totalLessons: 5,
    completedLessons: 0,
    modules: [
      {
        id: "m1",
        title: "Introduction",
        lessons: [
          {
            id: "l1",
            title: "What is AI?",
            duration: "5 min",
            isCompleted: false,
            type: "video",
          },
        ],
      },
    ],
  },
  {
    id: "c2",
    code: "AI-101",
    title: "Foundations of AI",
    description:
      "Learn how data, algorithms, and logic power the intelligence behind machines.",
    thumbnail:
      "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    progress: 0,
    totalLessons: 12,
    completedLessons: 0,
    modules: [],
  },
  {
    id: "c3",
    code: "AI-102",
    title: "Machine Learning",
    description:
      "See how computers learn from data and make predictions using real examples.",
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    progress: 0,
    totalLessons: 20,
    completedLessons: 0,
    modules: [],
  },
  {
    id: "c4",
    code: "AI-001",
    title: "Discover AI (Mini Course)",
    description:
      "Intro to AI and its impact on life, work, and opportunity in the Dominican Republic.",
    thumbnail:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    progress: 0,
    totalLessons: 5,
    completedLessons: 0,
    modules: [
      {
        id: "m1",
        title: "Introduction",
        lessons: [
          {
            id: "l1",
            title: "What is AI?",
            duration: "5 min",
            isCompleted: false,
            type: "video",
          },
        ],
      },
    ],
  },
  {
    id: "c5",
    code: "AI-101",
    title: "Foundations of AI",
    description:
      "Learn how data, algorithms, and logic power the intelligence behind machines.",
    thumbnail:
      "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    progress: 0,
    totalLessons: 12,
    completedLessons: 0,
    modules: [],
  },
  {
    id: "c6",
    code: "AI-102",
    title: "Machine Learning",
    description:
      "See how computers learn from data and make predictions using real examples.",
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    progress: 0,
    totalLessons: 20,
    completedLessons: 0,
    modules: [],
  },
];

export const MOCK_EVENTS: Event[] = [
  {
    id: "e1",
    title: "Parent Orientation Night",
    startTime: "Tomorrow, 6:00 PM",
    location: "Main Hall",
    type: "physical",
    spaceId: "s1",
    spaceName: "DAIA Announcements",
    attendees: 120,
  },
];

export const MOCK_CHATS: Chat[] = [
  {
    id: "ch1",
    participants: [
      {
        id: "u3",
        name: "Mr. O'Neill",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60",
      },
    ],
    lastMessage: "Don't forget to bring the servo motors tomorrow.",
    timestamp: "10m ago",
    unreadCount: 1,
    isGroup: false,
  },
];

// --- Mock Service Functions ---

export const api = {
  getUser: async () => CURRENT_USER,
  getUsers: async () => MOCK_USERS,
  getSpaces: async () => MOCK_SPACES,
  getSpace: async (id: string) => MOCK_SPACES.find((s) => s.id === id),
  getPosts: async (spaceId?: string) => {
    if (spaceId) return MOCK_POSTS.filter((p) => p.spaceId === spaceId);
    return MOCK_POSTS;
  },
  getCourses: async () => MOCK_COURSES,
  getEvents: async () => MOCK_EVENTS,
  getChats: async () => MOCK_CHATS,
  toggleLike: async (postId: string) => {
    console.log(`Toggled like on ${postId}`);
    return true;
  },
};

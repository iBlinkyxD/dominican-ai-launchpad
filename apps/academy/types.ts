export type UserRole = 'student' | 'parent' | 'teacher' | 'admin' | 'learner';

export interface Badge {
  id: string;
  name: string;
  icon: string; // Emoji or icon name
  description: string;
  color: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  bio?: string;
  location?: string;
  interests: string[];
  joinedSpaces: string[]; // Space IDs
  children?: string[]; // User IDs (for parents)
  
  // Gamification
  level: number;
  points: number;
  nextLevelPoints: number;
  reputation: number; // "Kudos" received
  badges: Badge[];
}

export type SpaceCategory = 'school' | 'grade' | 'topic' | 'club';

export interface Space {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  category: SpaceCategory;
  visibility: 'public' | 'private' | 'secret';
  memberCount: number;
  isJoined?: boolean;
}

export type PostType = 'text' | 'image' | 'video' | 'poll' | 'lesson_share';

export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  spaceId: string;
  spaceName: string;
  type: PostType;
  body: string;
  mediaUrl?: string;
  createdAt: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
  pollOptions?: { label: string; votes: number }[];
  tags?: string[];
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  body: string;
  createdAt: string;
}

export interface Course {
  id: string;
  code?: string; // e.g. AI-001
  title: string;
  description: string;
  thumbnail: string;
  modules: CourseModule[];
  progress: number; // 0-100
  totalLessons: number;
  completedLessons: number;
}

export interface CourseModule {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  isCompleted: boolean;
  type: 'video' | 'article' | 'quiz';
  content?: string; // HTML/Markdown content mock
}

export interface Event {
  id: string;
  title: string;
  startTime: string;
  location: string;
  type: 'virtual' | 'physical';
  spaceId: string;
  spaceName: string;
  attendees: number;
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'mention' | 'invite';
  text: string;
  isRead: boolean;
  createdAt: string;
}

export interface Chat {
  id: string;
  participants: { id: string; name: string; avatar: string }[];
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isGroup: boolean;
  name?: string;
}
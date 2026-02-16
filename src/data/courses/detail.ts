import introAI from "@/assets/courses/intro-AI.jpeg";
import learnEnglishAI from "@/assets/courses/learn-English-AI.jpeg";
import AIinDR from "@/assets/courses/AI-in-DR.jpeg";

export interface Curriculum {
  title: string;
  lessons: string[];
  items?: string[];
}

export interface Instructor {
  name: string;
  title: string;
  image: string;
  bio: string;
}

export interface CourseDetail {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  students: number;
  lessons: number;
  duration: string;
  instructorId: string;
  image: string;
  videoThumbnail: string;
  tags: string[];
  featured: boolean;
  benefits: string[];
  requirements: string[];
  whatToExpect: string;
  curriculum: Curriculum[];
  trustedBy: string[];
}

export const courseDetail: Record<string, CourseDetail> = {
  "introduction-to-ai": {
    slug: "introduction-to-ai",
    title: "Introduction to AI",
    subtitle:
      "Master AI concepts from basics to advanced neural networks with hands-on projects",
    description:
      "Understand the basics, explore real-world applications, and unlock the power of AI for your future.",
    price: 99,
    rating: 4.8,
    reviews: 342,
    students: 0,
    lessons: 42,
    duration: "20 hours",
    instructorId: "salomon",
    image: introAI,
    videoThumbnail:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop",
    tags: ["Foundations", "Intelligence", "Future"],
    featured: true,
    benefits: [
      "Build AI applications from scratch",
      "Career advancement opportunities",
      "Knowledge for innovation",
      "Industry-recognized certification",
      "Increased performance",
      "Structured learning path",
      "Personal growth",
      "Stay up-to-date",
    ],
    requirements: [
      "Basic knowledge of Python programming",
      "Understanding of basic mathematics",
      "A computer with internet access",
      "Desire to learn AI concepts",
      "No prior AI experience required",
    ],
    whatToExpect: `Unlock the full potential of React.js with this modern practical skills for you with the latest JavaScript frameworks and libraries, creating scalable, flexible, and customizable platforms that enable you to create advanced, efficient, and scalable solutions. Our training-made development approach focuses on structured learning paths, and covers from basics to expert with project-based curriculum. This course is designed to equip you with industry-ready skills.

Whether you're new to AI or have some experience, our hands-on lessons cover everything from basic concepts to advanced neural networks, preparing you for real-world challenges and opportunities in the AI industry.`,
    curriculum: [
      {
        title: "Module 1: Introduction to AI/ML and Python",
        lessons: [
          "What is AI and ML?",
          "Setting up Python environment",
          "Basic Python for AI",
          "Your first AI program",
        ],
      },
      {
        title: "Module 2: Neural Network Development",
        lessons: [
          "Understanding neurons",
          "Building neural networks",
          "Activation functions",
          "Training basics",
        ],
      },
      {
        title: "Module 3: Deep Learning Fundamentals",
        lessons: [
          "CNN architectures",
          "RNN and LSTM",
          "Transfer learning",
          "Model optimization",
        ],
      },
      {
        title: "Module 4: Final Project and Deployment",
        lessons: [
          "Project planning",
          "Building the AI model",
          "Testing and validation",
          "Deployment strategies",
        ],
      },
    ],
    trustedBy: ["TechCorp", "DataFlow", "AI Labs", "CloudTech"],
  },
  "learn-english-with-ai": {
    slug: "learn-english-with-ai",
    title: "Learn English with AI",
    subtitle:
      "Comprehensive data science course covering pandas, numpy, and real-world applications",
    description:
      "Practice, improve, and communicate confidently with AI-guided lessons and real conversations.",
    price: 99,
    rating: 4.9,
    reviews: 289,
    students: 32,
    lessons: 56,
    duration: "28 hours",
    instructorId: "luis",
    image: learnEnglishAI,
    videoThumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop",
    tags: ["Language", "Practice", "Confidence"],
    featured: true,
    benefits: [
      "Master data manipulation",
      "Statistical analysis skills",
      "Data visualization expertise",
      "Real-world project experience",
      "Portfolio development",
      "Industry best practices",
      "Career advancement",
      "Certification included",
    ],
    requirements: [
      "Basic Python programming",
      "Understanding of statistics",
      "Computer with 8GB RAM",
      "Eagerness to learn",
      "No prior data science experience",
    ],
    whatToExpect: `This comprehensive data science course will transform you from a beginner to a proficient data scientist. You'll learn to manipulate, analyze, and visualize data using Python's most powerful libraries.

Through hands-on projects and real-world datasets, you'll gain practical experience that employers value. By the end, you'll have a portfolio of projects demonstrating your skills.`,
    curriculum: [
      {
        title: "Module 1: Python for Data Science",
        lessons: [
          "NumPy fundamentals",
          "Pandas essentials",
          "Data types and structures",
          "Data cleaning",
        ],
      },
      {
        title: "Module 2: Data Analysis & Statistics",
        lessons: [
          "Descriptive statistics",
          "Inferential statistics",
          "Hypothesis testing",
          "Correlation analysis",
        ],
      },
      {
        title: "Module 3: Data Visualization",
        lessons: [
          "Matplotlib basics",
          "Seaborn for visualization",
          "Interactive plots",
          "Dashboard creation",
        ],
      },
      {
        title: "Module 4: Machine Learning Integration",
        lessons: [
          "ML basics for data science",
          "Predictive modeling",
          "Model evaluation",
          "Final project",
        ],
      },
    ],
    trustedBy: ["Analytics Co", "DataDriven", "InsightHub", "MetricsPro"],
  },
  "ai-in-the-dominican-republic": {
    slug: "ai-in-the-dominican-republic",
    title: "AI in the Dominican Republic",
    subtitle:
      "Build modern web applications with React, Node.js, and databases",
    description:
      "Discover how AI is transforming industries, solving challenges, and creating opportunities in the Dominican Republic.",
    price: 99,
    rating: 4.7,
    reviews: 456,
    students: 0,
    lessons: 68,
    duration: "35 hours",
    instructorId: "salomon",
    image: AIinDR,
    videoThumbnail:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=450&fit=crop",
    tags: ["Innovation", "Impact", "Solutions"],
    featured: true,
    benefits: [
      "Full stack expertise",
      "Modern tech stack",
      "Real project experience",
      "Job-ready skills",
      "Portfolio projects",
      "Best practices",
      "Career support",
      "Lifetime access",
    ],
    requirements: [
      "Basic HTML/CSS knowledge",
      "JavaScript fundamentals",
      "Computer with modern browser",
      "Code editor installed",
      "Willingness to practice",
    ],
    whatToExpect: `This comprehensive full stack course covers everything from React frontend to Node.js backend. You'll build multiple real-world projects that you can add to your portfolio.

Learn modern development practices, deployment strategies, and become a complete web developer ready for the job market.`,
    curriculum: [
      {
        title: "Module 1: React Fundamentals",
        lessons: [
          "React basics",
          "Components & Props",
          "State management",
          "Hooks deep dive",
        ],
      },
      {
        title: "Module 2: Advanced React",
        lessons: [
          "Context API",
          "React Router",
          "Performance optimization",
          "Testing",
        ],
      },
      {
        title: "Module 3: Backend with Node.js",
        lessons: [
          "Node.js basics",
          "Express framework",
          "REST APIs",
          "Database integration",
        ],
      },
      {
        title: "Module 4: Full Stack Project",
        lessons: [
          "Project architecture",
          "Frontend-backend integration",
          "Authentication",
          "Deployment",
        ],
      },
    ],
    trustedBy: ["WebFlow", "CodeCraft", "DevHub", "TechStart"],
  },
};

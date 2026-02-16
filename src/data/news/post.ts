import apolloE from "@/assets/partner/apollo-e.jpeg";

export interface NewsContentItem {
  type: "paragraph" | "heading" | "list";
  text?: string;
  items?: string[];
}

export interface NewsPost {
  slug: string;
  title: string;
  publishedDate: string;
  category: string;
  thumbnail: string;
  partner: string;
  content: NewsContentItem[];
}

export const newsPost: Record<string, NewsPost> = {
  "cras-in-turpis-non-libero-vestibulum-semper": {
    slug: "cras-in-turpis-non-libero-vestibulum-semper",
    title: "Cras in turpis non libero vestibulum semper",
    publishedDate: "2026-01-29",
    category: "Product",
    thumbnail: apolloE,
    partner: "DAIA + INTEC",
    content: [
      {
        type: "paragraph",
        text: "Artificial Intelligence is no longer a futuristic concept in education — it is now a daily classroom reality. In 2026, AI is actively reshaping how students learn, how teachers teach, and how institutions operate. From adaptive learning systems to intelligent tutoring assistants, education has entered a new era of personalization, efficiency, and accessibility.",
      },
      { type: "heading", text: "Personalized Learning at Scale" },
      {
        type: "paragraph",
        text: "One of the most impactful transformations AI has brought to education is personalization. Traditional classrooms often follow a one-size-fits-all approach. However, AI-powered platforms now analyze student performance in real time and adapt lessons accordingly.",
      },
    ],
  },
    "duis-posuere-neque-ac-porta-malesuada": {
    slug: "duis-posuere-neque-ac-porta-malesuada",
    title: "Duis posuere neque ac porta malesuada",
    publishedDate: "2026-01-27",
    category: "Product",
    thumbnail: apolloE,
    partner: "DAIA + Apollo-E",
    content: [
      {
        type: "paragraph",
        text: "Artificial Intelligence is no longer a futuristic concept in education — it is now a daily classroom reality. In 2026, AI is actively reshaping how students learn, how teachers teach, and how institutions operate. From adaptive learning systems to intelligent tutoring assistants, education has entered a new era of personalization, efficiency, and accessibility.",
      },
      { type: "heading", text: "Personalized Learning at Scale" },
      {
        type: "paragraph",
        text: "One of the most impactful transformations AI has brought to education is personalization. Traditional classrooms often follow a one-size-fits-all approach. However, AI-powered platforms now analyze student performance in real time and adapt lessons accordingly.",
      },
    ],
  },
  "lorem-ipsum-dolor-sit-amet-consectetur-adipiscing-elit": {
    slug:"lorem-ipsum-dolor-sit-amet-consectetur-adipiscing-elit",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    publishedDate: "2026-01-20",
    category: "Product",
    thumbnail: apolloE,
    partner: "DAIA + Apollo-E",
    content: [
      {
        type: "paragraph",
        text: "Artificial Intelligence is no longer a futuristic concept in education — it is now a daily classroom reality. In 2026, AI is actively reshaping how students learn, how teachers teach, and how institutions operate. From adaptive learning systems to intelligent tutoring assistants, education has entered a new era of personalization, efficiency, and accessibility.",
      },
      { type: "heading", text: "Personalized Learning at Scale" },
      {
        type: "paragraph",
        text: "One of the most impactful transformations AI has brought to education is personalization. Traditional classrooms often follow a one-size-fits-all approach. However, AI-powered platforms now analyze student performance in real time and adapt lessons accordingly.",
      },
    ],
  },
};

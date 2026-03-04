import escuelaPrimeraJesusMaestro from "@/assets/partner/escuela-primera-jesus-maestro.jpeg";
import { blogPost } from "./post";


export interface Author {
  name: string;
  avatar: string;
}

export interface BlogList {
  slug: string;
  title: string;
  preview: string;
  tags: string[];
  duration: string;
  authorIds: string[];
  publishedDate: string;
  thumbnail: string;
}

export const blogList: BlogList[] = Object.values(blogPost).map((post) => ({
  slug: post.slug,
  title: post.title,
  preview: post.content.find(c => c.type === "paragraph")?.text.slice(0, 140) + "...",
  tags: post.tags,
  duration: post.duration,
  authorIds: post.authorIds,
  publishedDate: post.publishedDate,
  thumbnail: post.thumbnail,
}));

import { newsPost } from "./post";

export interface NewsList {
    slug: string;
    title: string;
    publishedDate: string;
    category: string;
    thumbnail: string;
    partner: string;
}

export const newsList: NewsList[] = Object.values(newsPost).map((post) => ({
    slug: post.slug,
    title: post.title,
    publishedDate: post.publishedDate,
    category: post.category,
    thumbnail: post.thumbnail,
    partner: post.partner,
}))
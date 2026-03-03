import { initiativeDetail } from "./detail";

export interface Initiative {
  slug: string;
  name: string;
  subtext: string;
  image: string;
}

export const initiatives: Initiative[] = initiativeDetail.map((initiative) => ({
  slug: initiative.slug,
  name: initiative.name,
  subtext: initiative.subtext,
  image: initiative.image[0].src, // ✅ now it's a string
}));
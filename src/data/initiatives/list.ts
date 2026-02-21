import { initiativeDetail } from "./detail";

export interface Initiative {
  slug: string;
  name: string;
  subtext: string;
  image: string;
}

export const initiatives: Initiative[] = Object.values(initiativeDetail).map((initiative) => ({
  slug: initiative.slug,
  name: initiative.name,
  subtext: initiative.subtext,
  image: initiative.image,
}));

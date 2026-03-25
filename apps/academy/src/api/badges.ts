import { academyAPI } from "./axios";

export interface BadgeRead {
  id: string;
  name: string;
  description: string | null;
  icon_url: string | null;
  criteria: string | null;
}

export const getMyBadges = async (): Promise<BadgeRead[]> => {
  const res = await academyAPI.get("/badges/mine");
  return res.data;
};

export const getAllBadges = async (): Promise<BadgeRead[]> => {
  const res = await academyAPI.get("/badges/");
  return res.data;
};

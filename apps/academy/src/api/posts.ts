import { academyAPI } from "./axios";

export interface PostRead {
  id: string;
  author_id: string;
  author_daia_user_id: string | null;
  space_id: string | null;
  title: string | null;
  content: string;
  media_url: string | null;
  visibility: "public" | "space_only" | "draft";
  created_at: string;
  updated_at: string | null;
}

export const createPost = async (content: string): Promise<PostRead> => {
  const res = await academyAPI.post<PostRead>("/posts/", { content });
  return res.data;
};

export const getPosts = async (limit = 20, offset = 0): Promise<PostRead[]> => {
  const res = await academyAPI.get<PostRead[]>("/posts/", { params: { limit, offset } });
  return res.data;
};

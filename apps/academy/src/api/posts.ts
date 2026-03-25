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
  likes_count: number;
  comments_count: number;
  liked_by_me: boolean;
}

export const createPost = async (payload: {
  content: string;
  media_url?: string;
  title?: string;
}): Promise<PostRead> => {
  const res = await academyAPI.post<PostRead>("/posts/", payload);
  return res.data;
};

export const getPosts = async (limit = 20, offset = 0): Promise<PostRead[]> => {
  const res = await academyAPI.get<PostRead[]>("/posts/", { params: { limit, offset } });
  return res.data;
};

export const likePost = async (postId: string): Promise<void> => {
  await academyAPI.post(`/posts/${postId}/like`);
};

export const unlikePost = async (postId: string): Promise<void> => {
  await academyAPI.delete(`/posts/${postId}/like`);
};

export const uploadPostImage = async (file: File): Promise<string> => {
  const form = new FormData();
  form.append("file", file);
  const res = await academyAPI.post<{ url: string }>("/posts/upload-image", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  // Supabase returns an absolute https:// URL; fall back to prepending base for local
  const url = res.data.url;
  if (url.startsWith("http")) return url;
  const baseUrl = (academyAPI.defaults.baseURL ?? "").replace(/\/$/, "");
  return `${baseUrl}${url}`;
};

export const uploadPostFile = async (file: File): Promise<{ url: string; name: string }> => {
  const form = new FormData();
  form.append("file", file);
  const res = await academyAPI.post<{ url: string; name: string }>("/posts/upload-file", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};
import { academyAPI } from "./axios";

export interface CommentRead {
  id: string;
  post_id: string;
  author_id: string;
  author_daia_user_id: string | null;
  parent_id: string | null;
  content: string;
  created_at: string;
}

export const getPostComments = async (postId: string): Promise<CommentRead[]> => {
  const res = await academyAPI.get<CommentRead[]>(`/comments/post/${postId}`);
  return res.data;
};

export const createComment = async (postId: string, content: string): Promise<CommentRead> => {
  const res = await academyAPI.post<CommentRead>("/comments/", { post_id: postId, content });
  return res.data;
};

export const deleteComment = async (commentId: string): Promise<void> => {
  await academyAPI.delete(`/comments/${commentId}`);
};
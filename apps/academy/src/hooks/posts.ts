import { useState, useEffect, useCallback } from "react";
import { getPosts, createPost, PostRead } from "../api/posts";

export const usePosts = () => {
  const [posts, setPosts] = useState<PostRead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPosts();
      setPosts(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const submitPost = async (payload: { content: string; media_url?: string; title?: string }) => {
    const newPost = await createPost(payload);
    setPosts((prev) => [newPost, ...prev]);
    return newPost;
  };

  return { posts, loading, error, refetch: fetchPosts, submitPost };
};
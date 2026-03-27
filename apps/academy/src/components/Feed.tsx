import React, { useState, useEffect, useRef } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Image as ImageIcon,
  Smile,
  Paperclip,
  Loader2,
  Send,
  X,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast";
import { PostRead, likePost, unlikePost, uploadPostImage, uploadPostFile } from "../api/posts";
import { CommentRead, getPostComments, createComment, deleteComment } from "../api/comments";
import { Card, Button } from "./UI";
import { useAuth } from "../../../../packages/src/auth";

// ── Emoji Picker ─────────────────────────────────────────────────────────────

const EMOJIS = [
  "😊","😂","😍","🤔","👍","👎","🔥","❤️","🎉","😎",
  "🙏","💪","🤝","👏","🌟","✅","📚","🚀","💡","🤯",
  "😅","🥳","😢","😡","🫶","✨","💯","🫡","🤩","😤",
];

const EmojiPicker: React.FC<{ onPick: (e: string) => void }> = ({ onPick }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
        title="Emoji"
      >
        <Smile className="w-5 h-5" />
      </button>
      {open && (
        <div className="absolute bottom-full left-0 z-50 mb-2 bg-white border border-gray-200 rounded-2xl shadow-xl p-3 grid grid-cols-6 gap-1 w-56">
          {EMOJIS.map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() => { onPick(emoji); setOpen(false); }}
              className="text-xl hover:bg-gray-100 rounded-lg p-1 transition-colors leading-none"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

// ── Create Post ───────────────────────────────────────────────────────────────

interface CreatePostProps {
  onPost?: (payload: { content: string; media_url?: string }) => Promise<unknown>;
}

export const CreatePost: React.FC<CreatePostProps> = ({ onPost }) => {
  const { user, loading } = useAuth();
  const [isFocused, setIsFocused] = useState(false);
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const attachInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  if (loading || !user) return null;

  const firstInitial = user.first_name?.charAt(0).toUpperCase() || "";

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setIsFocused(true);
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAttachedFile(file);
    setIsFocused(true);
  };

  const removeFile = () => {
    setAttachedFile(null);
    if (attachInputRef.current) attachInputRef.current.value = "";
  };

  const hasContent = !!content.trim() || !!imageFile || !!attachedFile;

  const handlePost = async () => {
    if (!hasContent || !onPost) return;
    setSubmitting(true);
    try {
      let media_url: string | undefined;
      if (imageFile) {
        media_url = await uploadPostImage(imageFile);
      } else if (attachedFile) {
        const result = await uploadPostFile(attachedFile);
        media_url = result.url;
      }
      await onPost({ content: content.trim(), media_url });
      setContent("");
      setImageFile(null);
      setImagePreview(null);
      setAttachedFile(null);
      setIsFocused(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
      if (attachInputRef.current) attachInputRef.current.value = "";
    } catch {
      toast.error("Failed to post. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="mb-6">
      <div className="flex gap-4">
        <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
          {user.profile_picture_url ? (
            <img src={user.profile_picture_url} alt={user.first_name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
              {firstInitial}
            </div>
          )}
        </div>

        <div className="flex-1">
          <textarea
            ref={textareaRef}
            placeholder={`What's on your mind, ${user.first_name}?`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onFocus={() => setIsFocused(true)}
            rows={isFocused ? 3 : 1}
            className="w-full bg-gray-50 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 resize-none transition-all border border-transparent focus:border-indigo-200"
          />

          {imagePreview && (
            <div className="mt-2 relative inline-block">
              <img src={imagePreview} alt="Preview" className="max-h-48 rounded-xl object-cover border border-gray-200" />
              <button onClick={removeImage} className="absolute -top-2 -right-2 w-5 h-5 bg-gray-700 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                <X className="w-3 h-3" />
              </button>
            </div>
          )}

          {attachedFile && (
            <div className="mt-2 inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-medium px-3 py-1.5 rounded-full">
              <Paperclip className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate max-w-[200px]">{attachedFile.name}</span>
              <button onClick={removeFile} className="shrink-0 hover:text-red-500 transition-colors">
                <X className="w-3 h-3" />
              </button>
            </div>
          )}

          {isFocused && (
            <div className="flex items-center justify-between mt-3">
              <div className="flex gap-1 items-center text-gray-500">
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageSelect} />
                <input ref={attachInputRef} type="file" className="hidden" onChange={handleFileSelect} />
                <button type="button" onClick={() => fileInputRef.current?.click()} className="p-2 hover:bg-gray-100 rounded-full transition-colors" title="Upload image">
                  <ImageIcon className="w-5 h-5" />
                </button>
                <button type="button" onClick={() => attachInputRef.current?.click()} className="p-2 hover:bg-gray-100 rounded-full transition-colors" title="Attach file">
                  <Paperclip className="w-5 h-5" />
                </button>
                <EmojiPicker onPick={(emoji) => { setContent((c) => c + emoji); textareaRef.current?.focus(); }} />
              </div>
              <Button size="sm" onClick={handlePost} disabled={submitting || !hasContent}>
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Post"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

// ── Feed Post Card ────────────────────────────────────────────────────────────

interface FeedPostCardProps {
  post: PostRead;
  currentUserDaiaId?: string;
  currentUserName?: string;
  currentUserAvatar?: string;
}

export const FeedPostCard: React.FC<FeedPostCardProps> = ({
  post,
  currentUserDaiaId,
  currentUserName,
  currentUserAvatar,
}) => {
  const [liked, setLiked] = useState(post.liked_by_me);
  const [likesCount, setLikesCount] = useState(post.likes_count);
  const [commentsCount, setCommentsCount] = useState(post.comments_count);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<CommentRead[]>([]);
  const [commentsLoaded, setCommentsLoaded] = useState(false);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);

  const isOwn = post.author_daia_user_id === currentUserDaiaId;
  const authorName = post.author_name ?? (isOwn ? (currentUserName ?? "You") : "Member");
  const authorAvatar = post.author_avatar ?? (isOwn ? currentUserAvatar : undefined);
  const firstInitial = authorName.charAt(0).toUpperCase();

  const handleLike = async () => {
    const wasLiked = liked;
    setLiked(!wasLiked);
    setLikesCount((c) => wasLiked ? Math.max(0, c - 1) : c + 1);
    try {
      if (wasLiked) await unlikePost(post.id);
      else await likePost(post.id);
    } catch {
      setLiked(wasLiked);
      setLikesCount((c) => wasLiked ? c + 1 : Math.max(0, c - 1));
    }
  };

  const loadComments = async () => {
    if (commentsLoaded) return;
    setCommentsLoading(true);
    try {
      const data = await getPostComments(post.id);
      setComments(data);
      setCommentsLoaded(true);
    } finally {
      setCommentsLoading(false);
    }
  };

  const handleToggleComments = () => {
    setShowComments((prev) => {
      if (!prev) loadComments();
      return !prev;
    });
  };

  const handleSubmitComment = async () => {
    if (!commentInput.trim()) return;
    setSubmittingComment(true);
    try {
      const c = await createComment(post.id, commentInput.trim());
      setComments((prev) => [...prev, c]);
      setCommentsCount((n) => n + 1);
      setCommentInput("");
    } catch {
      toast.error("Failed to post comment");
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteComment(commentId);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
      setCommentsCount((n) => Math.max(0, n - 1));
    } catch {
      toast.error("Failed to delete comment");
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/dashboard?post=${post.id}`);
    toast.success("Post link copied!");
  };

  return (
    <Card className="mb-4">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
            {authorAvatar ? (
              <img src={authorAvatar} alt={authorName} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                {firstInitial}
              </div>
            )}
          </div>
          <div>
            <h4 className="font-semibold text-sm text-gray-900">{authorName}</h4>
            <span className="text-xs text-gray-400">{timeAgo(post.created_at)}</span>
          </div>
        </div>
        <button className="text-gray-400 hover:bg-gray-100 p-1 rounded-full transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="mb-4">
        {post.title && <h3 className="font-semibold text-gray-900 mb-1">{post.title}</h3>}
        <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">{post.content}</p>
        {post.media_url && (
          <div className="mt-3 rounded-xl overflow-hidden border border-gray-100">
            <img src={post.media_url} alt="Post media" className="w-full h-auto object-cover max-h-96" />
          </div>
        )}
      </div>

      {/* Stats row */}
      {(likesCount > 0 || commentsCount > 0) && (
        <div className="flex gap-4 text-xs text-gray-400 mb-3 pb-3 border-b border-gray-50">
          {likesCount > 0 && (
            <span>{likesCount} {likesCount === 1 ? "like" : "likes"}</span>
          )}
          {commentsCount > 0 && (
            <button onClick={handleToggleComments} className="hover:text-indigo-600 transition-colors">
              {commentsCount} {commentsCount === 1 ? "comment" : "comments"}
            </button>
          )}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <div className="flex gap-1">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${
              liked ? "text-red-500 bg-red-50" : "text-gray-500 hover:bg-gray-50 hover:text-red-400"
            }`}
          >
            <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
            <span className="text-xs font-medium">Like</span>
          </button>
          <button
            onClick={handleToggleComments}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${
              showComments ? "text-indigo-600 bg-indigo-50" : "text-gray-500 hover:bg-gray-50 hover:text-indigo-500"
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            <span className="text-xs font-medium">Comment</span>
          </button>
        </div>
        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
        >
          <Share2 className="w-4 h-4" />
          <span className="text-xs font-medium">Share</span>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
          {commentsLoading && (
            <div className="space-y-3 animate-pulse">
              {[1, 2].map((i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 shrink-0" />
                  <div className="flex-1 space-y-1.5 py-1">
                    <div className="h-2.5 bg-gray-200 rounded w-1/4" />
                    <div className="h-2.5 bg-gray-200 rounded w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!commentsLoading && comments.map((comment) => {
            const isMine = comment.author_daia_user_id === currentUserDaiaId;
            const name = comment.author_name ?? (isMine ? (currentUserName ?? "You") : "Member");
            const avatar = comment.author_avatar ?? (isMine ? currentUserAvatar : undefined);
            return (
              <div key={comment.id} className="flex gap-3 group">
                <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
                  {avatar ? (
                    <img src={avatar} alt={name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                      {name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-xl px-3 py-2">
                    <p className="text-xs font-semibold text-gray-700 mb-0.5">{name}</p>
                    <p className="text-sm text-gray-800 leading-relaxed">{comment.content}</p>
                  </div>
                  <div className="flex items-center gap-3 mt-1 px-1">
                    <span className="text-[11px] text-gray-400">{timeAgo(comment.created_at)}</span>
                    {isMine && (
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="text-[11px] text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all flex items-center gap-0.5"
                      >
                        <Trash2 className="w-3 h-3" />
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {!commentsLoading && commentsLoaded && comments.length === 0 && (
            <p className="text-xs text-gray-400 text-center py-2">No comments yet. Be the first!</p>
          )}

          {/* Comment input */}
          <div className="flex gap-3 pt-1">
            <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
              {currentUserAvatar ? (
                <img src={currentUserAvatar} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                  {(currentUserName ?? "Y").charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                placeholder="Write a comment…"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmitComment();
                  }
                }}
                className="flex-1 bg-gray-50 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 border border-transparent focus:border-indigo-200"
              />
              <button
                onClick={handleSubmitComment}
                disabled={submittingComment || !commentInput.trim()}
                className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0"
              >
                {submittingComment ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};
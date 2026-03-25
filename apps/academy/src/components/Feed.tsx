import React, { useState } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Image as ImageIcon,
  Smile,
  Paperclip,
  Loader2,
} from "lucide-react";
import { PostRead } from "../api/posts";
import { Card, Button } from "./UI";
import { useAuth } from "../../../../packages/src/auth";

// --- Create Post Widget ---
interface CreatePostProps {
  onPost?: (content: string) => Promise<unknown>;
}

export const CreatePost: React.FC<CreatePostProps> = ({ onPost }) => {
  const { user, loading } = useAuth();
  const [isFocused, setIsFocused] = useState(false);
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (loading) return <p>Loading user info...</p>;
  if (!user) return <p>Please log in to see your info.</p>;

  const firstInitial = user.first_name?.charAt(0).toUpperCase() || "";

  const handlePost = async () => {
    if (!content.trim() || !onPost) return;
    setSubmitting(true);
    try {
      await onPost(content.trim());
      setContent("");
      setIsFocused(false);
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
            placeholder={`What's on your mind, ${user?.first_name}?`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-gray-50 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 min-h-[50px] resize-none transition-all"
            onFocus={() => setIsFocused(true)}
          />
          {isFocused && (
            <div className="flex items-center justify-between mt-3">
              <div className="flex gap-2 text-gray-500">
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <ImageIcon className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Paperclip className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Smile className="w-5 h-5" />
                </button>
              </div>
              <Button
                size="sm"
                onClick={handlePost}
                disabled={submitting || !content.trim()}
              >
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Post"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

// --- Feed Post Card ---
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
  const [liked, setLiked] = useState(false);

  const isOwn = post.author_daia_user_id === currentUserDaiaId;
  const authorName = isOwn ? currentUserName ?? "You" : "Member";
  const authorAvatar = isOwn ? currentUserAvatar : undefined;
  const firstInitial = authorName.charAt(0).toUpperCase();

  const timeAgo = (iso: string) => {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
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
        <button className="text-gray-400 hover:bg-gray-100 p-1 rounded-full">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="mb-4">
        {post.title && (
          <h3 className="font-semibold text-gray-900 mb-1">{post.title}</h3>
        )}
        <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">{post.content}</p>
        {post.media_url && (
          <div className="mt-3 rounded-lg overflow-hidden border border-gray-100">
            <img src={post.media_url} alt="Post media" className="w-full h-auto object-cover max-h-96" />
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex gap-4">
          <button
            onClick={() => setLiked(!liked)}
            className={`flex items-center gap-1.5 text-sm transition-colors ${liked ? "text-red-500" : "text-gray-500 hover:text-red-500"}`}
          >
            <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
          </button>
          <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-indigo-600 transition-colors">
            <MessageCircle className="w-5 h-5" />
          </button>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <Share2 className="w-5 h-5" />
        </button>
      </div>
    </Card>
  );
};

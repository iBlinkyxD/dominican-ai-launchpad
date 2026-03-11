import React, { useState } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Image as ImageIcon,
  Smile,
  Paperclip,
} from "lucide-react";
import { Post, Comment } from "../../types";
import { Avatar, Button, Card, Badge } from "./UI";
import { useAuth } from "../../../../packages";

// --- Create Post Widget ---
export const CreatePost = () => {
  const { user, loading } = useAuth();
  const [isFocused, setIsFocused] = useState(false);
  if (loading) return <p>Loading user info...</p>;

  if (!user) return <p>Please log in to see your info.</p>;
  // Get the first letter of the first name, fallback to empty string
  const firstInitial = user.first_name?.charAt(0).toUpperCase() || "";
  return (
    <Card className="mb-6">
      <div className="flex gap-4">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
          {firstInitial}
        </div>
        <div className="flex-1">
          <textarea
            placeholder={`What's on your mind, ${user?.first_name}?`}
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
              <Button size="sm">Post</Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

// --- Post Card ---
export const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const [liked, setLiked] = useState(post.isLiked);
  const [count, setCount] = useState(post.likes);

  const handleLike = () => {
    setLiked(!liked);
    setCount(liked ? count - 1 : count + 1);
  };

  return (
    <Card className="mb-4">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-3">
          <Avatar src={post.authorAvatar} alt={post.authorName} />
          <div>
            <h4 className="font-semibold text-sm text-gray-900">
              {post.authorName}
            </h4>
            <div className="flex items-center text-xs text-gray-500 gap-2">
              <span className="font-medium text-indigo-600 hover:underline cursor-pointer">
                {post.spaceName}
              </span>
              <span>•</span>
              <span>{post.createdAt}</span>
            </div>
          </div>
        </div>
        <button className="text-gray-400 hover:bg-gray-100 p-1 rounded-full">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="mb-4">
        <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">
          {post.body}
        </p>

        {/* Media */}
        {post.mediaUrl && (
          <div className="mt-3 rounded-lg overflow-hidden border border-gray-100">
            <img
              src={post.mediaUrl}
              alt="Post media"
              className="w-full h-auto object-cover max-h-96"
            />
          </div>
        )}

        {/* Poll */}
        {post.type === "poll" && post.pollOptions && (
          <div className="mt-3 space-y-2">
            {post.pollOptions.map((opt, i) => (
              <div
                key={i}
                className="relative h-10 bg-gray-50 rounded-lg overflow-hidden cursor-pointer group hover:bg-gray-100 border border-gray-200"
              >
                <div
                  className="absolute top-0 left-0 h-full bg-indigo-100 transition-all duration-500"
                  style={{ width: `${opt.votes}%` }}
                />
                <div className="absolute inset-0 flex items-center justify-between px-4">
                  <span className="text-sm font-medium z-10 text-gray-700">
                    {opt.label}
                  </span>
                  <span className="text-xs text-gray-500 z-10">
                    {opt.votes}%
                  </span>
                </div>
              </div>
            ))}
            <p className="text-xs text-gray-400 text-right">
              100 votes • Ends in 2 days
            </p>
          </div>
        )}

        {/* Tags */}
        {post.tags && (
          <div className="flex gap-2 mt-3">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-indigo-600 hover:underline"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex gap-4">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 text-sm transition-colors ${liked ? "text-red-500" : "text-gray-500 hover:text-red-500"}`}
          >
            <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
            <span>{count}</span>
          </button>

          <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-indigo-600 transition-colors">
            <MessageCircle className="w-5 h-5" />
            <span>{post.comments}</span>
          </button>
        </div>

        <button className="text-gray-400 hover:text-gray-600">
          <Share2 className="w-5 h-5" />
        </button>
      </div>
    </Card>
  );
};

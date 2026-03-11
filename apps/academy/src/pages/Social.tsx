import React, { useState, useEffect } from "react";
import { useAuth } from "../../../../packages";
import { api } from "../../mockData";
import { Chat } from "../../types";
import { Avatar, Card, Button } from "../components/UI";
import {
  Search,
  MoreVertical,
  Send,
  MessageSquare,
  Zap,
  Star,
  Trophy,
  Award,
  Lock,
} from "lucide-react";

export const Messages = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  useEffect(() => {
    api.getChats().then(setChats);
  }, []);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm h-[calc(100vh-140px)] flex overflow-hidden animate-in fade-in duration-500">
      {/* Sidebar List */}
      <div
        className={`w-full md:w-80 border-r border-gray-200 flex flex-col ${selectedChat ? "hidden md:flex" : "flex"}`}
      >
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-bold text-lg mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search chats"
              className="w-full pl-9 pr-4 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat.id)}
              className={`p-4 flex gap-3 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-50 ${selectedChat === chat.id ? "bg-indigo-50" : ""}`}
            >
              <div className="relative">
                {chat.isGroup ? (
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                    {chat.name?.[0]}
                  </div>
                ) : (
                  <Avatar
                    src={chat.participants[0].avatar}
                    alt=""
                    size="lg"
                    className="w-12 h-12"
                  />
                )}
                {chat.unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full border-2 border-white">
                    {chat.unreadCount}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-semibold text-gray-900 truncate">
                    {chat.isGroup ? chat.name : chat.participants[0].name}
                  </h4>
                  <span className="text-xs text-gray-400">
                    {chat.timestamp}
                  </span>
                </div>
                <p
                  className={`text-sm truncate ${chat.unreadCount > 0 ? "font-semibold text-gray-800" : "text-gray-500"}`}
                >
                  {chat.lastMessage}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div
        className={`flex-1 flex flex-col ${!selectedChat ? "hidden md:flex" : "flex"}`}
      >
        {selectedChat ? (
          <>
            <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-white">
              <div className="flex items-center gap-3">
                <Button
                  size="sm"
                  variant="ghost"
                  className="md:hidden"
                  onClick={() => setSelectedChat(null)}
                >
                  ←
                </Button>
                <Avatar
                  src="https://picsum.photos/seed/oneill/200/200"
                  alt="Current Chat"
                />
                <div>
                  <h3 className="font-bold text-gray-900">Mr. O'Neill</h3>
                  <span className="text-xs text-green-500 flex items-center gap-1">
                    ● Online
                  </span>
                </div>
              </div>
              <button>
                <MoreVertical className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
              <div className="flex justify-center">
                <span className="text-xs text-gray-400 bg-gray-200 px-2 py-1 rounded-full">
                  Today
                </span>
              </div>

              <div className="flex justify-end">
                <div className="bg-indigo-600 text-white p-3 rounded-l-lg rounded-tr-lg max-w-[80%] text-sm">
                  Hi Mr. O'Neill, I have a question about the servo motors.
                </div>
              </div>

              <div className="flex justify-start gap-2">
                <Avatar
                  src="https://picsum.photos/seed/oneill/200/200"
                  alt=""
                  size="sm"
                />
                <div className="bg-white border border-gray-200 text-gray-800 p-3 rounded-r-lg rounded-tl-lg max-w-[80%] text-sm shadow-sm">
                  Sure Alex, what seems to be the issue? Don't forget to bring
                  them tomorrow.
                </div>
              </div>
            </div>

            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 bg-gray-100 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700">
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400 flex-col gap-4">
            <MessageSquare className="w-16 h-16 opacity-20" />
            <p>Select a conversation to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
};

export const Profile = () => {
  const { user, loading } = useAuth();
  if (!user) return null;

  if (loading) return <p>Loading user info...</p>;

  if (!user) return <p>Please log in to see your info.</p>;
  const progress = Math.min(100, Math.round((3500 / 1000) * 100));

  const firstInitial = user.first_name?.charAt(0).toUpperCase() || "";

  return (
    <div className="animate-in fade-in duration-500 pb-10">
      <div className="relative mb-24">
        <div className="h-48 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg relative overflow-hidden">
          {/* Abstract pattern */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mt-20 -mr-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full -mb-20 -ml-10 blur-2xl"></div>
        </div>

        <div className="absolute -bottom-20 left-6 right-6 flex flex-col md:flex-row items-end md:items-end justify-between gap-4">
          <div className="flex items-end gap-5">
            <div className="p-1.5 bg-white rounded-2xl shadow-lg">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {firstInitial}
              </div>
            </div>
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-gray-900">{user.first_name} {user.last_name}</h1>
              <div className="flex items-center gap-2 text-gray-500 capitalize">
                <span className="font-medium">Student</span>
                <span>•</span>
                <span>Dominican Republic</span>
              </div>
            </div>
          </div>
          <div className="mb-4 flex gap-3">
            <Button variant="outline">Edit Profile</Button>
            <Button>Share Profile</Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Stats & Info */}
        <div className="space-y-6">
          {/* Gamification Card */}
          <Card className="p-6 bg-gradient-to-br from-gray-900 to-indigo-900 text-white border-none shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Trophy className="w-24 h-24" />
            </div>

            <div className="relative z-10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Current Level</h3>
                <div className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold border border-white/20">
                  Lvl 4
                </div>
              </div>

              <div className="flex items-end gap-2 mb-2">
                <span className="text-4xl font-bold">3500</span>
                <span className="text-indigo-200 mb-1.5">
                  / 1000 XP
                </span>
              </div>

              <div className="w-full bg-black/30 h-2 rounded-full mb-4 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-1000"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              <div className="flex justify-between text-xs text-indigo-200">
                <span>Beginner</span>
                <span>Master</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-600" />
              Badges Earned
            </h3>

              <div className="text-center py-6 text-gray-400 text-sm bg-gray-50 rounded-lg border border-dashed">
                No badges yet. Participate to earn!
              </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-bold mb-4">About</h3>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              Lorem
            </p>
            <div className="flex flex-wrap gap-2">

            </div>
          </Card>
        </div>

        {/* Right Column: Activity Feed */}
        <div className="md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg text-gray-900">
              Recent Contributions
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="font-medium text-gray-900">
                21 Kudos Received
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {/* Mock Activity Items */}
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex gap-4">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <p className="text-gray-900 text-sm font-medium">
                  Commented on{" "}
                  <span className="text-indigo-600 hover:underline cursor-pointer">
                    "Introduction to Robotics"
                  </span>
                </p>
                <p className="text-gray-500 text-xs mt-1">2 hours ago</p>
                <div className="mt-3 bg-gray-50 p-3 rounded-lg text-sm text-gray-600 italic border-l-2 border-gray-300">
                  "This was extremely helpful! The explanation about servo
                  motors clarified my project issues."
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex gap-4">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <p className="text-gray-900 text-sm font-medium">
                  Earned the{" "}
                  <span className="text-purple-700 font-bold">Rising Star</span>{" "}
                  badge
                </p>
                <p className="text-gray-500 text-xs mt-1">Yesterday</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex gap-4 opacity-75">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-gray-500 text-sm font-medium">
                  Joined a Private Space
                </p>
                <p className="text-gray-400 text-xs mt-1">3 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import { useState, useEffect } from "react";
import { api } from "../../mockData";
import { Chat } from "../../types";
import { Avatar, Button } from "../components/UI";
import { Search, MoreVertical, Send, MessageSquare } from "lucide-react";

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
                  <Avatar src={chat.participants[0].avatar} alt="" size="lg" className="w-12 h-12" />
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
                  <span className="text-xs text-gray-400">{chat.timestamp}</span>
                </div>
                <p className={`text-sm truncate ${chat.unreadCount > 0 ? "font-semibold text-gray-800" : "text-gray-500"}`}>
                  {chat.lastMessage}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className={`flex-1 flex flex-col ${!selectedChat ? "hidden md:flex" : "flex"}`}>
        {selectedChat ? (
          <>
            <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-white">
              <div className="flex items-center gap-3">
                <Button size="sm" variant="ghost" className="md:hidden" onClick={() => setSelectedChat(null)}>
                  ←
                </Button>
                <Avatar src="https://picsum.photos/seed/oneill/200/200" alt="Current Chat" />
                <div>
                  <h3 className="font-bold text-gray-900">Mr. O'Neill</h3>
                  <span className="text-xs text-green-500 flex items-center gap-1">● Online</span>
                </div>
              </div>
              <button>
                <MoreVertical className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
              <div className="flex justify-center">
                <span className="text-xs text-gray-400 bg-gray-200 px-2 py-1 rounded-full">Today</span>
              </div>
              <div className="flex justify-end">
                <div className="bg-indigo-600 text-white p-3 rounded-l-lg rounded-tr-lg max-w-[80%] text-sm">
                  Hi Mr. O'Neill, I have a question about the servo motors.
                </div>
              </div>
              <div className="flex justify-start gap-2">
                <Avatar src="https://picsum.photos/seed/oneill/200/200" alt="" size="sm" />
                <div className="bg-white border border-gray-200 text-gray-800 p-3 rounded-r-lg rounded-tl-lg max-w-[80%] text-sm shadow-sm">
                  Sure Alex, what seems to be the issue? Don't forget to bring them tomorrow.
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

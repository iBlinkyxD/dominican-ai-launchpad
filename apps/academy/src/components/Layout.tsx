import React, { useState, useRef, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  LayoutGrid,
  GraduationCap,
  MessageSquare,
  User,
  Calendar,
  Settings,
  ShieldCheck,
  Search,
  Bell,
  ChevronRight,
  Plus,
  Users,
  Sparkles,
  ChevronDown,
  Bot,
  Zap,
  Megaphone,
  LogOut,
  UserCircle,
  Settings2,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { Avatar } from "./UI";
import { useAuth } from "../../../../packages/src/auth";
import daiaLogo from "../assets/DAIA-icon-bg.png";

// --- Dropdown Wrapper ---
// Added optional modifier to children to fix TS "missing children" errors in JSX usage at lines 149, 184, 219, and 258
const NavDropdown = ({
  isOpen,
  onClose,
  children,
  className = "",
}: {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={ref}
      className={`absolute top-full right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 ${className}`}
    >
      {children}
    </div>
  );
};

// --- Top Navigation ---
const TopNavigation = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState<
    "users" | "messages" | "notifications" | "profile" | null
  >(null);

  const toggleDropdown = (
    type: "users" | "messages" | "notifications" | "profile",
  ) => {
    setActiveDropdown(activeDropdown === type ? null : type);
  };

  const progress = user ? Math.min(100, Math.round((4500 / 1000) * 100)) : 0;

  if (loading) return <p>Loading user info...</p>;

  if (!user) return <p>Please log in to see your info.</p>;

  // Get the first letter of the first name, fallback to empty string
  const firstInitial = user.first_name?.charAt(0).toUpperCase() || "";

  const handleLogout = async () => {
    window.location.href = `${import.meta.env.VITE_HUB_URL}/`;
  };

  return (
    <div className="h-16 flex items-center justify-between px-6 shrink-0 relative z-50">
      <NavLink to="/">
        <div className="flex items-center gap-3">
          <img src={daiaLogo} className="w-12 h-12 border rounded-sm" />
          <div className="hidden md:block leading-tight text-white">
            <div className="font-semibold text-[20px]">
              DAIA <span className="text-gray-400">Academy</span>
            </div>
          </div>
        </div>
      </NavLink>

      <div className="flex-1 max-w-xl mx-8 hidden md:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 bg-[#1a3b6e]/50 text-white border border-[#2d4f8f]/50 rounded-lg text-sm placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white/30 transition-colors hover:bg-[#1a3b6e]/70"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Gamification Stats */}
        <div className="hidden sm:flex flex-col items-end mr-4">
          <div className="flex items-center gap-1.5 text-xs font-bold text-white mb-0.5">
            <Zap className="w-3 h-3 text-yellow-400 fill-current" />
            <span>Lvl 4</span>
            <span className="opacity-60 font-normal">| 2600 XP</span>
          </div>
          <div className="w-24 h-1.5 bg-[#1a3b6e] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-1">
          {/* Community Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("users")}
              className={`relative p-2 rounded-full transition-all ${activeDropdown === "users" ? "bg-white text-[#0B1E40]" : "text-white hover:bg-white/10"}`}
            >
              <Users className="w-5 h-5" />
              <span className="absolute top-1 right-1 bg-red-500 border border-[#0B1E40] text-white text-[9px] font-bold px-1 rounded-full">
                2
              </span>
            </button>
            <NavDropdown
              isOpen={activeDropdown === "users"}
              onClose={() => setActiveDropdown(null)}
            >
              <div className="p-4 border-b border-gray-50 flex justify-between items-center">
                <h4 className="font-bold text-gray-900">Member Requests</h4>
                <button className="text-xs text-indigo-600 font-bold">
                  View Directory
                </button>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {[
                  {
                    name: "Maria Santos",
                    role: "Teacher",
                    avatar:
                      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100",
                  },
                  {
                    name: "John Doe",
                    role: "Student",
                    avatar:
                      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
                  },
                ].map((req, i) => (
                  <div
                    key={i}
                    className="p-4 hover:bg-gray-50 flex items-center gap-3 border-b border-gray-50 last:border-0"
                  >
                    <Avatar src={req.avatar} alt="" size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-900 truncate">
                        {req.name}
                      </p>
                      <p className="text-xs text-gray-500">{req.role}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-sm">
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 bg-gray-100 text-gray-500 rounded-lg hover:bg-gray-200">
                        <Plus className="w-4 h-4 rotate-45" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </NavDropdown>
          </div>

          {/* Messages Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("messages")}
              className={`relative p-2 rounded-full transition-all ${activeDropdown === "messages" ? "bg-white text-[#0B1E40]" : "text-white hover:bg-white/10"}`}
            >
              <MessageSquare className="w-5 h-5" />
              <span className="absolute top-1 right-1 bg-indigo-500 border border-[#0B1E40] text-white text-[9px] font-bold px-1 rounded-full">
                3
              </span>
            </button>
            <NavDropdown
              isOpen={activeDropdown === "messages"}
              onClose={() => setActiveDropdown(null)}
            >
              <div className="p-4 border-b border-gray-50 flex justify-between items-center">
                <h4 className="font-bold text-gray-900">Recent Chats</h4>
                <button
                  onClick={() => {
                    navigate("/messages");
                    setActiveDropdown(null);
                  }}
                  className="text-xs text-indigo-600 font-bold"
                >
                  Open Inbox
                </button>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {[
                  {
                    name: "Mr. O'Neill",
                    msg: "Don't forget the servos!",
                    time: "10m ago",
                    avatar:
                      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
                  },
                  {
                    name: "Sarah Jenkins",
                    msg: "The new curriculum looks great",
                    time: "2h ago",
                    avatar:
                      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
                  },
                  {
                    name: "DAIA Support",
                    msg: "Welcome to the platform!",
                    time: "1d ago",
                    avatar:
                      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=100",
                  },
                ].map((chat, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      navigate("/messages");
                      setActiveDropdown(null);
                    }}
                    className="p-4 hover:bg-gray-50 flex items-center gap-3 border-b border-gray-50 last:border-0 cursor-pointer"
                  >
                    <Avatar src={chat.avatar} alt="" size="sm" />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline">
                        <p className="text-sm font-bold text-gray-900 truncate">
                          {chat.name}
                        </p>
                        <span className="text-[10px] text-gray-400">
                          {chat.time}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 truncate">
                        {chat.msg}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </NavDropdown>
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("notifications")}
              className={`relative p-2 rounded-full transition-all ${activeDropdown === "notifications" ? "bg-white text-[#0B1E40]" : "text-white hover:bg-white/10"}`}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 bg-yellow-500 border border-[#0B1E40] text-white text-[9px] font-bold px-1 rounded-full">
                5
              </span>
            </button>
            <NavDropdown
              isOpen={activeDropdown === "notifications"}
              onClose={() => setActiveDropdown(null)}
            >
              <div className="p-4 border-b border-gray-50 flex justify-between items-center">
                <h4 className="font-bold text-gray-900">Notifications</h4>
                <button className="text-xs text-indigo-600 font-bold">
                  Mark all read
                </button>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {[
                  {
                    text: "Your post was liked by 5 others",
                    time: "5m ago",
                    icon: <Zap className="w-3 h-3" />,
                    color: "bg-yellow-100 text-yellow-600",
                  },
                  {
                    text: "New course added: Robotics 201",
                    time: "1h ago",
                    icon: <GraduationCap className="w-3 h-3" />,
                    color: "bg-indigo-100 text-indigo-600",
                  },
                  {
                    text: "Upcoming event: AI Meetup",
                    time: "4h ago",
                    icon: <Calendar className="w-3 h-3" />,
                    color: "bg-emerald-100 text-emerald-600",
                  },
                  {
                    text: "Mr. O'Neill mentioned you in a post",
                    time: "1d ago",
                    icon: <MessageSquare className="w-3 h-3" />,
                    color: "bg-purple-100 text-purple-600",
                  },
                ].map((notif, i) => (
                  <div
                    key={i}
                    className="p-4 hover:bg-gray-50 flex gap-3 border-b border-gray-50 last:border-0 cursor-pointer group"
                  >
                    <div
                      className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center ${notif.color} transition-transform group-hover:scale-110`}
                    >
                      {notif.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-800 leading-snug">
                        {notif.text}
                      </p>
                      <div className="flex items-center gap-1 mt-1 text-[10px] text-gray-400">
                        <Clock className="w-3 h-3" />
                        <span>{notif.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </NavDropdown>
          </div>
        </div>

        {/* User Profile Dropdown */}
        <div className="relative ml-2">
          <button
            onClick={() => toggleDropdown("profile")}
            className={`flex items-center gap-2 cursor-pointer p-1 pr-2 rounded-full transition-all ${activeDropdown === "profile" ? "bg-white shadow-md" : "hover:bg-white/10"}`}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
              {firstInitial}
            </div>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${activeDropdown === "profile" ? "rotate-180 text-[#0B1E40]" : "text-white"}`}
            />
          </button>
          <NavDropdown
            isOpen={activeDropdown === "profile"}
            onClose={() => setActiveDropdown(null)}
            className="w-64"
          >
            <div className="p-4 bg-gray-50/50 border-b border-gray-100">
              <p className="text-sm font-bold text-gray-900">
                {user?.first_name} {user?.last_name}
              </p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
            <div className="p-2">
              <button
                onClick={() => {
                  navigate("/profile");
                  setActiveDropdown(null);
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <UserCircle className="w-4 h-4 text-gray-400" /> My Profile
              </button>
              <button
                onClick={() => {
                  navigate("/learn");
                  setActiveDropdown(null);
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <GraduationCap className="w-4 h-4 text-gray-400" /> My Courses
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                <Settings2 className="w-4 h-4 text-gray-400" /> Settings
              </button>
            </div>
            <div className="p-2 border-t border-gray-100">
              <button
                onClick={() => {
                  handleLogout();
                  setActiveDropdown(null);
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" /> Exit
              </button>
            </div>
          </NavDropdown>
        </div>
      </div>
    </div>
  );
};

// --- Sidebar ---
const SidebarLink = ({
  to,
  label,
  badge,
  hasSubmenu,
}: {
  to: string;
  label: string;
  badge?: string;
  hasSubmenu?: boolean;
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center justify-between px-4 py-3 mx-2 rounded-lg transition-all text-sm font-medium group ${
          isActive
            ? "bg-[#0B1E40] text-white shadow-md"
            : "text-gray-700 hover:bg-gray-200/50"
        }`
      }
    >
      <span>{label}</span>
      <div className="flex items-center gap-2">
        {badge && (
          <span
            className={`text-xs px-2 py-0.5 rounded font-bold ${
              window.location.hash.includes(to)
                ? "bg-white/20 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {badge}
          </span>
        )}
        {hasSubmenu && (
          <ChevronRight
            className={`w-4 h-4 ${
              window.location.hash.includes(to)
                ? "text-white/70"
                : "text-gray-400"
            }`}
          />
        )}
      </div>
    </NavLink>
  );
};

const SidebarSection = ({ children }: { children?: React.ReactNode }) => (
  <div className="py-2 border-b border-gray-200/50 last:border-0">
    {children}
  </div>
);

export const Sidebar = () => {
  return (
    <div className="w-72 bg-[#F8FAFC] flex flex-col border-r border-gray-200 shrink-0 h-full overflow-y-auto rounded-l-3xl">
      <div className="p-4">
        <button className="w-full flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all font-medium shadow-sm">
          <Plus className="w-5 h-5 text-gray-500" />
          <span>Create</span>
        </button>
      </div>

      <SidebarSection>
        <div className="px-2 space-y-1">
          <NavLink
            to="/chat-daia"
            className={({ isActive }) =>
              `flex items-center justify-between px-4 py-2 hover:bg-gray-100 rounded-lg cursor-pointer mx-2 font-medium text-sm transition-colors ${isActive ? "bg-indigo-50 text-indigo-700" : "text-gray-700"}`
            }
          >
            <div className="flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span>Chat with Quisqueya</span>
            </div>
            <span className="bg-indigo-100 text-indigo-700 text-xs px-1.5 py-0.5 rounded">
              AI
            </span>
          </NavLink>

          <NavLink
            to="/announcements"
            className={({ isActive }) =>
              `flex items-center justify-between px-4 py-2 hover:bg-gray-100 rounded-lg cursor-pointer mx-2 font-medium text-sm transition-colors ${isActive ? "bg-[#0B1E40] text-white shadow-md" : "text-gray-700"}`
            }
          >
            {({ isActive }) => (
              <div className="flex items-center gap-3">
                <Megaphone
                  className={`w-4 h-4 ${isActive ? "text-white" : "text-red-500"}`}
                />
                <span>Announcements</span>
              </div>
            )}
          </NavLink>

          <NavLink
            to="/members"
            className={({ isActive }) =>
              `flex items-center justify-between px-4 py-2 hover:bg-gray-100 rounded-lg cursor-pointer mx-2 font-medium text-sm transition-colors ${isActive ? "bg-[#0B1E40] text-white shadow-md" : "text-gray-700"}`
            }
          >
            <div className="flex items-center gap-3">
              <Users className="w-4 h-4" />
              <span>Members</span>
            </div>
          </NavLink>
        </div>
      </SidebarSection>

      <SidebarSection>
        <SidebarLink to="/" label="Home" hasSubmenu />
      </SidebarSection>

      {/* <SidebarSection>
        <SidebarLink to="/spaces" label="Computer Program" hasSubmenu />
      </SidebarSection> */}

      <SidebarSection>
        <SidebarLink to="/learn" label="Courses" hasSubmenu />
      </SidebarSection>

      <SidebarSection>
        <SidebarLink to="/events" label="Learners Community" hasSubmenu />
      </SidebarSection>

      {/* <SidebarSection>
        <SidebarLink to="/school1" label="DAIA School 001" hasSubmenu />
        <SidebarLink to="/school2" label="DAIA School 002" hasSubmenu />
      </SidebarSection> */}

      <div className="flex-1"></div>
    </div>
  );
};

// --- Bottom Nav (Mobile) ---
export const BottomNav = () => {
  const navItems = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/spaces", icon: LayoutGrid, label: "Spaces" },
    { to: "/learn", icon: GraduationCap, label: "Courses" },
    { to: "/chat-daia", icon: Sparkles, label: "DAIA AI" },
    { to: "/messages", icon: MessageSquare, label: "Chat" },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full h-full space-y-1 ${
                isActive ? "text-[#0B1E40]" : "text-gray-500"
              }`
            }
          >
            <Icon className="w-6 h-6" />
            <span className="text-[10px] font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

// --- Mobile Header ---
export const MobileHeader = () => {
  return (
    <div className="md:hidden fixed top-0 w-full bg-[#0B1E40] z-40 px-4 h-14 flex items-center justify-between shadow-sm">
      <div className="font-bold text-white flex items-center gap-2">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center p-0.5">
          <span className="text-[#0B1E40] font-bold text-xs">DA</span>
        </div>
        DAIA
      </div>
      <div className="flex items-center gap-4 text-white">
        <Search className="w-5 h-5" />
        <Bell className="w-5 h-5" />
      </div>
    </div>
  );
};

// --- Main Layout Wrapper ---
export const AppLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const location = useLocation();
  const isChat = location.pathname.includes("/chat-daia");

  return (
    <div className="h-screen bg-[#0B1E40] flex flex-col overflow-hidden font-sans">
      <TopNavigation />

      {/* Main Content Card Container */}
      <div className="flex-1 mx-2 mb-2 md:mx-4 md:mb-4 bg-white rounded-3xl overflow-hidden flex shadow-2xl relative">
        <div className="hidden md:block h-full">
          <Sidebar />
        </div>

        {/* Right Content Area */}
        <main className="flex-1 bg-white overflow-y-auto relative h-full">
          <div
            className={`h-full overflow-y-auto ${isChat ? "" : "p-4 md:p-8"}`}
          >
            {children}
          </div>
        </main>
      </div>

      <MobileHeader />
      <BottomNav />
    </div>
  );
};

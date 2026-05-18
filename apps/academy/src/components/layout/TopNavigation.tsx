import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Search,
  Users,
  MessageSquare,
  Bell,
  ChevronDown,
  LogOut,
  Settings2,
  UserCircle,
  Zap,
} from "lucide-react";
import { useAuth } from "@packages/auth";
import { useAcademyUser } from "@/hooks/users";
import { NavDropdown } from "./NavDropdown";
import { NotificationDropdown } from "./NotificationDropdown";
import { useNotificationCount } from "@/hooks/notifications";
import daiaLogo from "@/assets/DAIA-icon-bg.png";

export const TopNavigation = () => {
  const { user, loading: authLoading } = useAuth();
  const { academyUser, loading: academyLoading } = useAcademyUser(); // Academy API: xp, level
  const { unreadCount, clearCount } = useNotificationCount();
  const navigate = useNavigate();

  const [activeDropdown, setActiveDropdown] = useState<
    "messages" | "notifications" | "profile" | null
  >(null);

  const toggleDropdown = (type: "messages" | "notifications" | "profile") => {
    setActiveDropdown(activeDropdown === type ? null : type);
  };

  if (authLoading || academyLoading) return <p>Loading user...</p>;
  if (!user) return <p>Please login</p>;

  const firstInitial = user.first_name?.charAt(0).toUpperCase() || "";

  // XP progress within current level
  // Level N requires N² * 100 XP, next level requires (N+1)² * 100 XP
  const level = academyUser?.level ?? 1;
  const totalXp = academyUser?.total_xp ?? 0;
  const currentLevelXp = Math.pow(level, 2) * 100;
  const nextLevelXp = Math.pow(level + 1, 2) * 100;
  const rawProgress =
    ((totalXp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100;
  const progress = Math.min(100, Math.max(0, Math.round(rawProgress)));

  const handleLogout = () => {
    window.location.href = `${import.meta.env.VITE_HUB_URL}/`;
  };

  return (
    <div className="h-16 flex items-center justify-between px-6 shrink-0 relative z-50">
      {/* Logo */}
      <NavLink to="/">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <img
            src={daiaLogo}
            className="w-12 h-12 border rounded-sm object-contain shrink-0"
            alt="DAIA Logo"
          />

          <div className="leading-tight text-white min-w-0">
            <div className="font-semibold text-[20px] whitespace-nowrap truncate">
              DAIA <span className="text-gray-400 sm:inline">Academy</span>
            </div>
          </div>
        </div>
      </NavLink>

      {/* Icons */}
      <div className="flex items-center gap-2">
        {/* Gamification Stats */}
        {academyUser && (
          <div className="hidden sm:flex flex-col items-end mr-4">
            <div className="flex items-center gap-1.5 text-xs font-bold text-white mb-0.5">
              <Zap className="w-3 h-3 text-yellow-400 fill-current" />
              <span>Lvl {level}</span>
              <span className="opacity-60 font-normal">| {totalXp} XP</span>
            </div>
            <div className="w-24 h-1.5 bg-[#1a3b6e] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-1000"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Messages */}
        <button
          onClick={() => toggleDropdown("messages")}
          className="p-2 text-white hover:bg-white/10 rounded-full"
        >
          <MessageSquare className="w-5 h-5" />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { toggleDropdown("notifications"); clearCount(); }}
            className="p-2 text-white hover:bg-white/10 rounded-full"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            )}
          </button>
          <NotificationDropdown
            isOpen={activeDropdown === "notifications"}
            onClose={() => setActiveDropdown(null)}
          />
        </div>

        {/* Profile */}
        <div className="relative ml-2">
          <button
            onClick={() => toggleDropdown("profile")}
            className="flex items-center gap-2 p-1 pr-2 rounded-full hover:bg-white/10"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden shadow-lg">
              {user.profile_picture_url ? (
                <img
                  src={user.profile_picture_url}
                  alt="avatar"
                  className="w-8 h-8 object-cover"
                />
              ) : (
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                  {firstInitial}
                </div>
              )}
            </div>

            <ChevronDown className="w-4 h-4 text-white" />
          </button>

          <NavDropdown
            isOpen={activeDropdown === "profile"}
            onClose={() => setActiveDropdown(null)}
          >
            <div className="p-4 bg-gray-50/50 border-b border-gray-100">
              <p className="text-sm font-bold text-gray-900">
                {user.first_name} {user.last_name}
              </p>
              <p className="text-xs text-gray-500 font-mono tracking-wide">
                {user.daia_member_id != null
                  ? `#${String(user.daia_member_id).padStart(8, "0")}`
                  : "—"}
              </p>
            </div>

            <div className="p-2">
              <button
                onClick={() => navigate(`/profile/${user?.username}`)}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <UserCircle className="w-4 h-4 text-gray-400" /> My Profile
              </button>
              <button
                onClick={() => navigate("/settings")}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Settings2 className="w-4 h-4 text-gray-400" /> Settings
              </button>
              <div className="p-2 border-t border-gray-100">
                <button
                  onClick={() => {
                    handleLogout();
                    setActiveDropdown(null);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" /> Back to Hub
                </button>
              </div>
            </div>
          </NavDropdown>
        </div>
      </div>
    </div>
  );
};

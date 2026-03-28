import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Search,
  Users,
  MessageSquare,
  Bell,
  ChevronDown,
  UserCircle,
  Settings2,
  LogOut,
} from "lucide-react";
import { useAuth } from "@packages/auth";
import { NavDropdown } from "./NavDropdown";
import daiaLogo from "@/assets/DAIA-icon-bg.png";

export const TopNavigation = () => {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  const [activeDropdown, setActiveDropdown] = useState<
    "messages" | "notifications" | "profile" | null
  >(null);

  const toggleDropdown = (type: "messages" | "notifications" | "profile") => {
    setActiveDropdown(activeDropdown === type ? null : type);
  };

  if (loading) return <p>Loading user...</p>;
  if (!user) return <p>Please login</p>;

  const firstInitial = user.first_name?.charAt(0).toUpperCase() || "";

  const handleLogout = async () => {
    try {
      await logout(); // wait for backend to delete cookie
    } finally {
      window.location.href = `${import.meta.env.VITE_LANDING_URL}/login`;
    }
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
              DAIA <span className="text-gray-400 hidden sm:inline">Hub</span>
            </div>
          </div>
        </div>
      </NavLink>

      {/* Icons */}
      <div className="flex items-center gap-2">
        {/* Messages */}
        <button
          onClick={() => toggleDropdown("messages")}
          className="p-2 text-white hover:bg-white/10 rounded-full"
        >
          <MessageSquare className="w-5 h-5" />
        </button>

        {/* Notifications */}
        <button
          onClick={() => toggleDropdown("notifications")}
          className="p-2 text-white hover:bg-white/10 rounded-full"
        >
          <Bell className="w-5 h-5" />
        </button>

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
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>

            <div className="p-2">
              <button
                onClick={() => navigate("/profile")}
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
                  <LogOut className="w-4 h-4" /> LogOut
                </button>
              </div>
            </div>
          </NavDropdown>
        </div>
      </div>
    </div>
  );
};

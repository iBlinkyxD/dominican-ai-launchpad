import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Search, Users, MessageSquare, Bell, ChevronDown } from "lucide-react";
import { useAuth } from "../../../../../packages/src/auth";
import { NavDropdown } from "./NavDropdown";
import daiaLogo from "../../assets/DAIA-icon.png";

export const TopNavigation = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [activeDropdown, setActiveDropdown] = useState<
    "messages" | "notifications" | "profile" | null
  >(null);

  const toggleDropdown = (
    type: "messages" | "notifications" | "profile"
  ) => {
    setActiveDropdown(activeDropdown === type ? null : type);
  };

  if (loading) return <p>Loading user...</p>;
  if (!user) return <p>Please login</p>;

  const firstInitial = user.first_name?.charAt(0).toUpperCase() || "";

  const handleLogout = () => {
    window.location.href = `${import.meta.env.VITE_HUB_URL}/`;
  };

  return (
    <div className="h-16 flex items-center justify-between px-6 shrink-0 relative z-50">
      
      {/* Logo */}
      <NavLink to="/">
        <div className="flex items-center gap-3">
          <img src={daiaLogo} className="w-12 h-12" />
          <div className="hidden md:block leading-tight text-white">
            <div className="font-bold text-sm">Dominican AI Association</div>
            <div className="font-bold text-sm">(DAIA)</div>
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
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
              {firstInitial}
            </div>

            <ChevronDown className="w-4 h-4 text-white" />
          </button>

          <NavDropdown
            isOpen={activeDropdown === "profile"}
            onClose={() => setActiveDropdown(null)}
          >
            <div className="p-4 border-b">
              <p className="font-bold">
                {user.first_name} {user.last_name}
              </p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>

            <div className="p-2">
              <button
                onClick={() => navigate("/profile")}
                className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
              >
                Profile
              </button>

              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded"
              >
                Logout
              </button>
            </div>
          </NavDropdown>
        </div>
      </div>
    </div>
  );
};
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  LogOut,
  Settings2,
  UserCircle,
  Shield,
} from "lucide-react";
import { useAuth } from "@packages/auth";
import { NavDropdown } from "./NavDropdown";
import daiaLogo from "../../assets/DAIA-icon-bg.png";

export const TopNavigation = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [profileOpen, setProfileOpen] = useState(false);

  if (loading) return <div className="h-16 shrink-0" />;
  if (!user) return <div className="h-16 shrink-0" />;

  const firstInitial = user.first_name?.charAt(0).toUpperCase() || "";

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
              DAIA <span className="text-gray-400 sm:inline">Admin</span>
            </div>
          </div>
        </div>
      </NavLink>

      {/* Admin badge + Profile */}
      <div className="flex items-center gap-2">
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-medium">
          <Shield className="w-3 h-3" />
          Admin
        </div>

        <div className="relative ml-2">
          <button
            onClick={() => setProfileOpen((o) => !o)}
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
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  {firstInitial}
                </div>
              )}
            </div>
            <ChevronDown className="w-4 h-4 text-white" />
          </button>

          <NavDropdown
            isOpen={profileOpen}
            onClose={() => setProfileOpen(false)}
          >
            <div className="p-4 bg-gray-50/50 border-b border-gray-100">
              <p className="text-sm font-bold text-gray-900">
                {user.first_name} {user.last_name}
              </p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>

            <div className="p-2">
              <button
                onClick={() => { navigate("/settings"); setProfileOpen(false); }}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Settings2 className="w-4 h-4 text-gray-400" /> Settings
              </button>
              <div className="p-2 border-t border-gray-100">
                <button
                  onClick={() => { handleLogout(); setProfileOpen(false); }}
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

import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { User, ChevronDown, ChevronRight, Shield, Grid3x3, LogOut } from "lucide-react";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAccountExpanded, setIsAccountExpanded] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside
      className={`
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                lg:translate-x-0

                fixed
                top-[72px]
                left-0
                z-40

                w-64
                h-[calc(100vh-57px)]

                bg-white
                border-r border-gray-200

                transition-transform duration-300
                overflow-y-auto
            `}
    >
      <nav className="p-4 space-y-1">
        {/* My Account Section */}
        <div>
          <button
            onClick={() => setIsAccountExpanded(!isAccountExpanded)}
            className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition"
          >
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>My Account</span>
            </div>
            {isAccountExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>

          {isAccountExpanded && (
            <div className="ml-6 mt-1 space-y-1">
              <button
                onClick={() => navigate("/overview")}
                className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition ${
                  isActive("/overview")
                    ? "bg-gray-100 text-gray-900 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => navigate("/security")}
                className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition ${
                  isActive("/security")
                    ? "bg-gray-100 text-gray-900 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                Security info
              </button>
              <button
                onClick={() => navigate("/devices")}
                className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition ${
                  isActive("/devices")
                    ? "bg-gray-100 text-gray-900 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                Devices
              </button>
              <button
                onClick={() => navigate("/settings")}
                className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition ${
                  isActive("/settings")
                    ? "bg-gray-100 text-gray-900 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                Settings & Privacy
              </button>
            </div>
          )}
        </div>

        {/* All Apps */}
        <button
          onClick={() => navigate("/allapps")}
          className={`flex items-center gap-2 w-full px-3 py-2 text-sm font-medium rounded-lg transition ${
            isActive("/allapps")
              ? "bg-gray-100 text-gray-900"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <Grid3x3 className="h-4 w-4" />
          <span>All Apps</span>
        </button>

        {/* My Access */}
        <button
          onClick={() => navigate("/access")}
          className={`flex items-center gap-2 w-full px-3 py-2 text-sm font-medium rounded-lg transition ${
            isActive("/access")
              ? "bg-gray-100 text-gray-900"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <Shield className="h-4 w-4" />
          <span>My Access</span>
        </button>
      </nav>
      {/* Logout Button at Bottom */}
      <div className="p-4 border-t border-gray-200 mt-auto">
        <Link to="http://localhost:8080" className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium rounded-lg transition text-red-600 hover:bg-red-50">
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </Link>
      </div>
    </aside>
  );
}

export default Sidebar;

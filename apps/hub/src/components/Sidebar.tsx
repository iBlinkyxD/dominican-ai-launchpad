import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Settings, GraduationCap, Shield, Grid3x3, LogOut } from "lucide-react";
import { useAuth } from "../../../../packages/src/auth";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth(); // ✅ get logout from auth
  const [isAccountExpanded, setIsAccountExpanded] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await logout(); // wait for backend to delete cookie
    } finally {
      window.location.href = `${import.meta.env.VITE_LANDING_URL}/login`;
    }
  };

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
        <button
          onClick={() => navigate("/")}
          className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition"
        >
          <div className="flex items-center gap-2">
            <Grid3x3 className="h-4 w-4" />
            <span>My Apps</span>
          </div>
        </button>

        {/* My Account Section */}
        <button
          onClick={() => navigate("/academy")}
          className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition"
        >
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            <span>Academy</span>
          </div>
        </button>

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
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </button>
      </nav>
      {/* Logout Button at Bottom */}
      <div className="p-4 border-t border-gray-200 mt-auto">
        <button
          onClick={handleLogout} // ✅ call handleLogout
          className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium rounded-lg transition text-red-600 hover:bg-red-50"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;

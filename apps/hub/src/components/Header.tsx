import { useState } from "react";
import { Settings, Menu } from "lucide-react";
import daiaLogo from "../assets/DAIA-logo.png";
import { useAuth } from "@packages/auth";

function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, loading } = useAuth();

  if (loading) return <p>Loading user info...</p>;

  if (!user) return <p>Please log in to see your info.</p>;

  // Get the first letter of the first name, fallback to empty string
  const firstInitial = user.first_name?.charAt(0).toUpperCase() || "";
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <Menu className="h-5 w-5 text-gray-600" />
            </button>
            <img src={daiaLogo} alt="DAIA Logo" className="h-8 w-auto" />
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-gray-900">{user.first_name} {user.last_name}</p>
              <p className="text-xs text-gray-600">{user.email}</p>
            </div>
            <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {firstInitial}
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

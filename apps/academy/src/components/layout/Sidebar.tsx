import { Plus, Sparkles, Megaphone, Users } from "lucide-react";
import { NavLink } from "react-router-dom";
import { SidebarLink } from "./SidebarLink";
import { SidebarSection } from "./SidebarSection";

export const Sidebar = () => {
  return (
    <div className="w-72 bg-[#F8FAFC] flex flex-col border-r border-gray-200 h-full overflow-y-auto rounded-l-3xl">
      <SidebarSection>
        <div className="px-2 pt-4 space-y-1">
          <NavLink
            to="/chat-daia"
            className={({ isActive }) =>
              `flex items-center justify-between mt-1 px-4 py-2 hover:bg-gray-100 rounded-lg cursor-pointer mx-2 font-medium text-sm transition-colors ${isActive ? "bg-indigo-50 text-indigo-700" : "text-gray-700"}`
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

      <div className="p-4">
        <SidebarSection>
          <SidebarLink to="/" label="Home" hasSubmenu={false} />
        </SidebarSection>

        <SidebarSection>
          <SidebarLink to="/courses" label="Courses" hasSubmenu={false} />
        </SidebarSection>

        <SidebarSection>
          <SidebarLink to="/badges-certificates" label="Badges & Certificates" hasSubmenu={false} />
        </SidebarSection>

        <SidebarSection>
          <SidebarLink to="/events" label="Learners Community" hasSubmenu={false} />
        </SidebarSection>
      </div>

      <div className="flex-1"></div>
    </div>
  );
};

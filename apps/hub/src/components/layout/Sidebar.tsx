import { Home, GraduationCap, Grid3x3, Settings, Shield } from "lucide-react";
import { SidebarLink } from "./SidebarLink";
import { SidebarSection } from "./SidebarSection";
import { useAuth } from "@packages/auth";

export const Sidebar = () => {
  const { user } = useAuth();

  return (
    <div className="w-72 bg-[#F8FAFC] flex flex-col border-r border-gray-200 h-full overflow-y-auto rounded-l-3xl">

      <div className="p-4">

      </div>

        <SidebarSection>
          <SidebarLink to="/" label="Home" icon={Home} hasSubmenu={false}/>
        </SidebarSection>

        <SidebarSection>
          <SidebarLink to="/academy" label="Academy" icon={GraduationCap} hasSubmenu={false} />
        </SidebarSection>

        <SidebarSection>
          <SidebarLink to="/apps" label="All Apps" icon={Grid3x3} hasSubmenu={false} />
        </SidebarSection>

        <SidebarSection>
          <SidebarLink to="/settings" label="Settings" icon={Settings} hasSubmenu={false} />
        </SidebarSection>

        {user?.is_admin && (
          <SidebarSection>
            <a
              href={import.meta.env.VITE_ADMIN_URL}
              className="flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-all text-sm font-medium text-gray-700 hover:bg-gray-200/50"
            >
              <Shield className="w-4 h-4" />
              <span>Admin</span>
            </a>
          </SidebarSection>
        )}

      <div className="flex-1"></div>
    </div>
  );
};
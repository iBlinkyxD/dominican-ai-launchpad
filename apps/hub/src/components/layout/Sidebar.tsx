import { Home, GraduationCap, Grid3x3, Clock, Settings } from "lucide-react";
import { SidebarLink } from "./SidebarLink";
import { SidebarSection } from "./SidebarSection";

export const Sidebar = () => {
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

      <div className="flex-1"></div>
    </div>
  );
};
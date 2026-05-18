import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { GraduationCap, ChevronDown, ChevronRight, Package, Video, Clock } from "lucide-react";
import { SidebarSection } from "./SidebarSection";
import { SidebarLink } from "./SidebarLink";

const CollapsibleSection = ({
  icon,
  label,
  isActive,
  open,
  onToggle,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) => (
  <>
    <button
      onClick={onToggle}
      className={`w-full flex items-center justify-between px-4 py-3 mx-2 rounded-lg transition-all text-sm font-medium ${
        isActive ? "bg-[#0B1E40] text-white shadow-md" : "text-gray-700 hover:bg-gray-200/50"
      }`}
      style={{ width: "calc(100% - 1rem)" }}
    >
      <div className="flex items-center gap-2">
        {icon}
        <span>{label}</span>
      </div>
      {open
        ? <ChevronDown className="w-4 h-4 opacity-60" />
        : <ChevronRight className="w-4 h-4 opacity-60" />}
    </button>

    {open && (
      <div className="mt-1 ml-4 space-y-0.5">
        {children}
      </div>
    )}
  </>
);

const SubLink = ({ to, icon, label, end }: { to: string; icon: React.ReactNode; label: string; end?: boolean }) => (
  <NavLink
    to={to}
    end={end}
    className={({ isActive }) =>
      `flex items-center gap-2 px-4 py-2 mx-2 rounded-lg transition-all text-sm font-medium ${
        isActive ? "bg-[#0B1E40] text-white shadow-md" : "text-gray-600 hover:bg-gray-200/50"
      }`
    }
  >
    {icon}
    {label}
  </NavLink>
);

export const Sidebar = () => {
  const location = useLocation();

  const isTutoringActive = location.pathname.startsWith("/tutoring");
  const isAcademyActive =
    location.pathname.startsWith("/academy/courses") ||
    location.pathname.startsWith("/academy/packages");

  const [tutoringOpen, setTutoringOpen] = useState(isTutoringActive);
  const [academyOpen,  setAcademyOpen]  = useState(isAcademyActive);

  return (
    <div className="w-72 bg-[#F8FAFC] flex flex-col border-r border-gray-200 h-full overflow-y-auto rounded-l-3xl">
      <div className="p-4">
        <SidebarSection>
          <SidebarLink to="/" label="Home" />
        </SidebarSection>

        <SidebarSection>
          <SidebarLink to="/users" label="Users & Roles" />
        </SidebarSection>

        <SidebarSection>
          <CollapsibleSection
            icon={<Video className="w-4 h-4" />}
            label="Virtual Tutoring"
            isActive={isTutoringActive}
            open={tutoringOpen}
            onToggle={() => setTutoringOpen(o => !o)}
          >
            <SubLink to="/tutoring"          icon={<Video className="w-3.5 h-3.5" />} label="Courses" end />
            <SubLink to="/tutoring/waitlist" icon={<Clock className="w-3.5 h-3.5" />} label="Waitlist" />
          </CollapsibleSection>
        </SidebarSection>

        <SidebarSection>
          <CollapsibleSection
            icon={<GraduationCap className="w-4 h-4" />}
            label="Academy"
            isActive={isAcademyActive}
            open={academyOpen}
            onToggle={() => setAcademyOpen(o => !o)}
          >
            <SubLink to="/academy/courses"  icon={<GraduationCap className="w-3.5 h-3.5" />} label="Courses" />
            <SubLink to="/academy/packages" icon={<Package className="w-3.5 h-3.5" />}      label="Packages" />
          </CollapsibleSection>
        </SidebarSection>
      </div>

      <div className="flex-1" />
    </div>
  );
};

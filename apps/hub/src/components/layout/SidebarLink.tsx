import { NavLink } from "react-router-dom";
import { ChevronRight, LucideIcon } from "lucide-react";

interface Props {
  to: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
  hasSubmenu?: boolean;
}

export const SidebarLink = ({ to, label, icon: Icon, badge, hasSubmenu }: Props) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center justify-between px-4 py-3 mx-2 rounded-lg transition-all text-sm font-medium group ${
          isActive
            ? "bg-[#0B1E40] text-white shadow-md"
            : "text-gray-700 hover:bg-gray-200/50"
        }`
      }
    >
      <div className="flex items-center gap-3">
        <Icon className="w-4 h-4" />
        <span className="text-sm font-medium">{label}</span>
      </div>

      <div className="flex items-center gap-2">
        {badge && (
          <span className="text-xs px-2 py-0.5 rounded font-bold bg-gray-200 text-gray-600">
            {badge}
          </span>
        )}

        {hasSubmenu && <ChevronRight className="w-4 h-4 text-gray-400" />}
      </div>
    </NavLink>
  );
};

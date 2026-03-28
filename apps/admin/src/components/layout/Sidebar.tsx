import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { GraduationCap, ChevronDown, ChevronRight, Home, Package } from "lucide-react";
import { SidebarSection } from "./SidebarSection";
import { SidebarLink } from "./SidebarLink";

export const Sidebar = () => {
  const location = useLocation();
  const isAcademyActive =
    location.pathname.startsWith("/academy/courses") ||
    location.pathname.startsWith("/academy/packages");

  const [academyOpen, setAcademyOpen] = useState(isAcademyActive);

  return (
    <div className="w-72 bg-[#F8FAFC] flex flex-col border-r border-gray-200 h-full overflow-y-auto rounded-l-3xl">
      <div className="p-4">
        <SidebarSection>
          <SidebarLink to="/" label="Home" />
        </SidebarSection>

        <SidebarSection>
          {/* Academy collapsible section */}
          <button
            onClick={() => setAcademyOpen((o) => !o)}
            className={`w-full flex items-center justify-between px-4 py-3 mx-2 rounded-lg transition-all text-sm font-medium ${
              isAcademyActive
                ? "bg-[#0B1E40] text-white shadow-md"
                : "text-gray-700 hover:bg-gray-200/50"
            }`}
            style={{ width: "calc(100% - 1rem)" }}
          >
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              <span>Academy</span>
            </div>
            {academyOpen ? (
              <ChevronDown className="w-4 h-4 opacity-60" />
            ) : (
              <ChevronRight className="w-4 h-4 opacity-60" />
            )}
          </button>

          {academyOpen && (
            <div className="mt-1 ml-4 space-y-0.5">
              <NavLink
                to="/academy/courses"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 mx-2 rounded-lg transition-all text-sm font-medium ${
                    isActive
                      ? "bg-[#0B1E40] text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-200/50"
                  }`
                }
              >
                <GraduationCap className="w-3.5 h-3.5" />
                Courses
              </NavLink>

              <NavLink
                to="/academy/packages"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 mx-2 rounded-lg transition-all text-sm font-medium ${
                    isActive
                      ? "bg-[#0B1E40] text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-200/50"
                  }`
                }
              >
                <Package className="w-3.5 h-3.5" />
                Packages
              </NavLink>
            </div>
          )}
        </SidebarSection>
      </div>

      <div className="flex-1" />
    </div>
  );
};

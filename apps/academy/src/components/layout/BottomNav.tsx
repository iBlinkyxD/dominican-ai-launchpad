import { NavLink } from "react-router-dom";
import {
  Home,
  GraduationCap,
  Settings,
  Video,
  Award,
} from "lucide-react";
import { useSettingsMenu } from "@packages/SettingsMenuContext";
import { useRole } from "@packages/auth";

export const BottomNav = () => {
  const { setIsOpen } = useSettingsMenu();
  const { hasAnyRole } = useRole("academy");
  const canAccessTutoring = hasAnyRole("student", "teacher");

  const navItems = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/courses", icon: GraduationCap, label: "Courses" },
    { to: "/badges-certificates", icon: Award, label: "Badges" },
    ...(canAccessTutoring ? [{ to: "/tutoring", icon: Video, label: "Virtual Tutoring" }] : []),
    { to: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="flex justify-around items-center h-16">
        {navItems.map(({ to, icon: Icon, label }) => {
          if (to === "/settings") {
            return (
              <button
                key={to}
                onClick={() => {
                  setIsOpen(true);
                }}
                className="flex flex-col items-center justify-center w-full text-gray-500"
              >
                <Icon className="w-6 h-6" />
                <span className="text-[10px] font-medium">{label}</span>
              </button>
            );
          }

          return (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center w-full ${
                  isActive ? "text-[#0B1E40]" : "text-gray-500"
                }`
              }
            >
              <Icon className="w-6 h-6" />
              <span className="text-[10px] font-medium">{label}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

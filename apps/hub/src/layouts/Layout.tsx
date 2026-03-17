import { Sidebar } from "@/components/layout/Sidebar";
import { TopNavigation } from "@/components/layout/TopNavigation";
import { BottomNav } from "@/components/layout/BottomNav";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import SettingsMenu from "@/components/layout/SettingsMenu";

const AppLayout = () => {
  const location = useLocation();
  const isChat = location.pathname.includes("/chat-daia");

  return (
    <div className="h-screen bg-[#0B1E40] flex flex-col overflow-hidden">
      <TopNavigation />

      <div className="flex-1 mx-2 mb-2 md:mx-4 md:mb-4 bg-white rounded-3xl overflow-hidden flex shadow-2xl relative">
        <div className="hidden lg:block h-full">
          <Sidebar />
        </div>

        <main className="flex-1 bg-white overflow-y-auto relative">
          <div
            className={`
              ${isChat ? "" : "p-4 md:p-8"}
              pb-20 lg:pb-8
            `}
          >
            <Outlet />
          </div>
        </main>
      </div>

      <BottomNav />

      <SettingsMenu />
    </div>
  );
};

export default AppLayout;

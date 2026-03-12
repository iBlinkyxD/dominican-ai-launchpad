import { Sidebar } from "../components/layout/Sidebar";
import { TopNavigation } from "../components/layout/TopNavigation";
import { BottomNav } from "../components/layout/BottomNav";
import { MobileHeader } from "../components/layout/MobileHeader";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  const location = useLocation();
  const isChat = location.pathname.includes("/chat-daia");

  return (
    <div className="h-screen bg-[#0B1E40] flex flex-col overflow-hidden">

      <TopNavigation />

      <div className="flex-1 mx-2 mb-2 md:mx-4 md:mb-4 bg-white rounded-3xl flex shadow-2xl">

        <div className="hidden md:block h-full">
          <Sidebar />
        </div>

        <main className="flex-1 overflow-y-auto">
          <div className={`h-full ${isChat ? "" : "p-4 md:p-8"}`}>
            <Outlet />
          </div>
        </main>

      </div>

      <MobileHeader />
      <BottomNav />
    </div>
  );
};

export default AppLayout;
import { Sidebar } from "./layout/Sidebar";
import { TopNavigation } from "./layout/TopNavigation";
import { BottomNav } from "./layout/BottomNav";
import { useLocation, Outlet } from "react-router-dom";
import { useRef, useEffect } from "react";

const AppLayout = () => {
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    mainRef.current?.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="h-screen bg-[#0B1E40] flex flex-col overflow-hidden">
      <TopNavigation />

      <div className="flex-1 mx-2 mb-2 md:mx-4 md:mb-4 bg-white rounded-3xl overflow-hidden flex shadow-2xl relative">
        <div className="hidden lg:block h-full">
          <Sidebar />
        </div>

        <main ref={mainRef} className="flex-1 bg-white overflow-y-auto relative">
          <div className="p-4 md:p-8 pb-20 lg:pb-8">
            <Outlet />
          </div>
        </main>
      </div>

      <BottomNav />
    </div>
  );
};

export default AppLayout;

import { Search, Bell } from "lucide-react";

export const MobileHeader = () => {
  return (
    <div className="md:hidden fixed top-0 w-full bg-[#0B1E40] z-40 px-4 h-14 flex items-center justify-between">
      <div className="font-bold text-white flex items-center gap-2">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <span className="text-[#0B1E40] font-bold text-xs">DA</span>
        </div>
        DAIA
      </div>

      <div className="flex items-center gap-4 text-white">
        <Search className="w-5 h-5" />
        <Bell className="w-5 h-5" />
      </div>
    </div>
  );
};
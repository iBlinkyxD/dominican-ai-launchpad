import { ChevronRight } from "lucide-react";
import { useSettingsMenu } from "@packages/SettingsMenuContext";
import { useNavigate } from "react-router-dom";

const SettingsMenu = () => {
  const navigate = useNavigate();
  const { isOpen, setIsOpen } = useSettingsMenu();

  const tabs = [
    { id: "profile", label: "My Profile", isDanger: false },
    { id: "security", label: "Security", isDanger: false },
    { id: "notifications", label: "Notifications", isDanger: false },
    { id: "billing", label: "Billing", isDanger: false },
  ];

  if (!isOpen) return null;

  return (
    <div className="flex">
      <div className="lg:hidden w-full">
        <div className="fixed inset-0 z-50">
          <div
            className="fixed inset-0 bg-black/20"
            onClick={() => setIsOpen(false)}
          />

          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4">
            {/* Menu Content */}
            <div className="overflow-y-auto flex-1">
              <h2 className="text-xl font-bold text-gray-900 mb-4 px-2 pt-2">
                Settings
              </h2>
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      navigate(`/settings?tab=${tab.id}`);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-sm rounded-lg transition flex items-center justify-between group ${
                      tab.isDanger
                        ? "text-red-600 hover:bg-red-50"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span className={tab.isDanger ? "font-medium" : ""}>
                      {tab.label}
                    </span>
                    <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsMenu;

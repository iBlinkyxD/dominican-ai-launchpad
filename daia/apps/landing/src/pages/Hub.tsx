import { useState } from "react";
import {
  GraduationCap,
  Plane,
  Home,
  User,
  ChevronDown,
  ChevronRight,
  Settings,
  Shield,
  Smartphone,
  Building2,
  Clock,
  Grid3x3,
  Menu,
} from "lucide-react";
import daiaLogo from "@/assets/DAIA-logo.png";

interface Product {
  name: string;
  description: string;
  category: string;
}

const Hub = () => {
  const [activeMenu, setActiveMenu] = useState("overview");
  const [isAccountExpanded, setIsAccountExpanded] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const allProducts: Product[] = [
    {
      name: "Educa One",
      description:
        "Transforming education through AI-powered learning solutions",
      category: "DAIA Education",
    },
    {
      name: "Scholar One",
      description: "Academic excellence with intelligent tutoring systems",
      category: "DAIA Education",
    },
    {
      name: "Quisqueya AI",
      description: "Personalized learning experiences for Dominican students",
      category: "DAIA Education",
    },
    {
      name: "Isla Intelligence",
      description: "Smart tourism insights for the Dominican Republic",
      category: "DAIA Tourism",
    },
    {
      name: "Cultura Connect",
      description: "Connect travelers with authentic cultural experiences",
      category: "DAIA Tourism",
    },
    {
      name: "Terra Vision AI",
      description: "AI-powered property insights and market analysis",
      category: "DAIA Real Estate",
    },
    {
      name: "Title Trust DR",
      description: "Secure and transparent property title verification",
      category: "DAIA Real Estate",
    },
  ];

  // Apps the user has access to (excluding Scholar One, Isla Intelligence, Terra Vision AI)
  const userApps = allProducts.filter(
    (product) =>
      product.name !== "Scholar One" &&
      product.name !== "Isla Intelligence" &&
      product.name !== "Terra Vision AI",
  );

  // Apps that need access request
  const restrictedApps = [
    "Scholar One",
    "Isla Intelligence",
    "Terra Vision AI",
  ];

  const getCategoryIcon = (category: string) => {
    if (category.includes("Education"))
      return <GraduationCap className="h-5 w-5" />;
    if (category.includes("Tourism")) return <Plane className="h-5 w-5" />;
    if (category.includes("Real Estate")) return <Home className="h-5 w-5" />;
    return <Grid3x3 className="h-5 w-5" />;
  };

  const getCategoryColor = (category: string) => {
    if (category.includes("Education")) return "from-blue-500 to-blue-600";
    if (category.includes("Tourism")) return "from-green-500 to-green-600";
    if (category.includes("Real Estate"))
      return "from-purple-500 to-purple-600";
    return "from-gray-500 to-gray-600";
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col">
      {/* Top Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <Menu className="h-5 w-5 text-gray-600" />
              </button>
              <img src={daiaLogo} alt="DAIA Logo" className="h-8 w-auto" />
              <span className="text-sm font-medium text-gray-700">
                My Account
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                <Settings className="h-5 w-5 text-gray-600" />
              </button>
              <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  U
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                lg:translate-x-0

                fixed
                top-[72px]
                left-0
                z-40

                w-64
                h-[calc(100vh-57px)]

                bg-white
                border-r border-gray-200

                transition-transform duration-300
                overflow-y-auto
            `}
        >
          <nav className="p-4 space-y-1">
            {/* My Account Section */}
            <div>
              <button
                onClick={() => setIsAccountExpanded(!isAccountExpanded)}
                className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition"
              >
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>My Account</span>
                </div>
                {isAccountExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>

              {isAccountExpanded && (
                <div className="ml-6 mt-1 space-y-1">
                  <button
                    onClick={() => setActiveMenu("overview")}
                    className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition ${
                      activeMenu === "overview"
                        ? "bg-gray-100 text-gray-900 font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveMenu("security")}
                    className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition ${
                      activeMenu === "security"
                        ? "bg-gray-100 text-gray-900 font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    Security info
                  </button>
                  <button
                    onClick={() => setActiveMenu("devices")}
                    className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition ${
                      activeMenu === "devices"
                        ? "bg-gray-100 text-gray-900 font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    Devices
                  </button>
                  <button
                    onClick={() => setActiveMenu("settings")}
                    className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition ${
                      activeMenu === "settings"
                        ? "bg-gray-100 text-gray-900 font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    Settings & Privacy
                  </button>
                </div>
              )}
            </div>

            {/* All Apps */}
            <button
              onClick={() => setActiveMenu("allapps")}
              className={`flex items-center gap-2 w-full px-3 py-2 text-sm font-medium rounded-lg transition ${
                activeMenu === "allapps"
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Grid3x3 className="h-4 w-4" />
              <span>All Apps</span>
            </button>

            {/* My Access */}
            <button
              onClick={() => setActiveMenu("access")}
              className={`flex items-center gap-2 w-full px-3 py-2 text-sm font-medium rounded-lg transition ${
                activeMenu === "access"
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Shield className="h-4 w-4" />
              <span>My Access</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto lg:ml-64">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Overview Section */}
            {activeMenu === "overview" && (
              <>
                {/* User Profile Card */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      U
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        User Account
                      </h2>
                      <p className="text-sm text-gray-600">user@example.com</p>
                    </div>
                  </div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {/* Security Card */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
                    <div className="flex flex-col items-center text-center">
                      <Shield className="h-12 w-12 text-blue-600 mb-4" />
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Security info
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Keep your verification methods and security info up to
                        date
                      </p>
                      <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        UPDATE INFO →
                      </button>
                    </div>
                  </div>

                  {/* Settings Card */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
                    <div className="flex flex-col items-center text-center">
                      <Settings className="h-12 w-12 text-blue-600 mb-4" />
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Settings & Privacy
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Personalize your account settings and see how your data
                        is used
                      </p>
                      <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        VIEW SETTINGS AND PRIVACY →
                      </button>
                    </div>
                  </div>

                  {/* Devices Card */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
                    <div className="flex flex-col items-center text-center">
                      <Smartphone className="h-12 w-12 text-blue-600 mb-4" />
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Devices
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Disable a lost device and review your connected devices
                      </p>
                      <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        MANAGE DEVICES →
                      </button>
                    </div>
                  </div>

                  {/* Organizations Card */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
                    <div className="flex flex-col items-center text-center">
                      <Building2 className="h-12 w-12 text-blue-600 mb-4" />
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Organizations
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        See all the organizations that you're a part of
                      </p>
                      <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        MANAGE ORGANIZATIONS →
                      </button>
                    </div>
                  </div>

                  {/* Recent Activity Card */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
                    <div className="flex flex-col items-center text-center">
                      <Clock className="h-12 w-12 text-blue-600 mb-4" />
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        My sign-ins
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        See when and where you've signed in and check if
                        anything looks unusual
                      </p>
                      <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        REVIEW RECENT ACTIVITY →
                      </button>
                    </div>
                  </div>
                </div>

                {/* Apps Section */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Your Applications
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userApps.map((product, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition group"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div
                            className={`w-12 h-12 rounded-lg bg-gradient-to-r ${getCategoryColor(product.category)} flex items-center justify-center text-white`}
                          >
                            {getCategoryIcon(product.category)}
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 mb-2">
                          {product.category}
                        </div>
                        <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {product.name}
                        </h4>
                        <p className="text-sm text-gray-600 leading-relaxed mb-4">
                          {product.description}
                        </p>
                        <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-sm">
                          Launch App
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* All Apps Section */}
            {activeMenu === "allapps" && (
              <>
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    All Apps
                  </h2>
                  <p className="text-gray-600">
                    Access all your DAIA applications in one place
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allProducts.map((product, index) => {
                    const needsAccess = restrictedApps.includes(product.name);
                    return (
                      <div
                        key={index}
                        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition group"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div
                            className={`w-12 h-12 rounded-lg bg-gradient-to-r ${getCategoryColor(product.category)} flex items-center justify-center text-white`}
                          >
                            {getCategoryIcon(product.category)}
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 mb-2">
                          {product.category}
                        </div>
                        <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {product.name}
                        </h4>
                        <p className="text-sm text-gray-600 leading-relaxed mb-4">
                          {product.description}
                        </p>
                        <button
                          className={`w-full px-4 py-2 rounded-lg transition font-medium text-sm ${
                            needsAccess
                              ? "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
                              : "bg-blue-600 text-white hover:bg-blue-700"
                          }`}
                        >
                          {needsAccess ? "Request Access" : "Launch App"}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {/* Security Info Section */}
            {activeMenu === "security" && (
              <div className="max-w-2xl">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Security Info
                </h2>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <p className="text-gray-600">
                    Manage your security settings and verification methods.
                  </p>
                </div>
              </div>
            )}

            {/* Devices Section */}
            {activeMenu === "devices" && (
              <div className="max-w-2xl">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Devices
                </h2>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <p className="text-gray-600">
                    View and manage your connected devices.
                  </p>
                </div>
              </div>
            )}

            {/* Settings Section */}
            {activeMenu === "settings" && (
              <div className="max-w-2xl">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Settings & Privacy
                </h2>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <p className="text-gray-600">
                    Customize your account settings and privacy preferences.
                  </p>
                </div>
              </div>
            )}

            {/* My Access Section */}
            {activeMenu === "access" && (
              <div className="max-w-2xl">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  My Access
                </h2>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <p className="text-gray-600">
                    Manage your access permissions and authorizations.
                  </p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Hub;
	
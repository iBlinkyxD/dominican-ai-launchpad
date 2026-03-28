import { useEffect, useState } from "react";
import { getMe } from "@packages/api/auth";

type Status = "loading" | "authorized" | "unauthorized" | "not_admin";

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    getMe()
      .then((user) => {
        if (user.is_admin) {
          setStatus("authorized");
        } else {
          setStatus("not_admin");
        }
      })
      .catch(() => {
        setStatus("unauthorized");
      });
  }, []);

  if (status === "loading") {
    return (
      <div className="h-screen bg-[#0B1E40] flex items-center justify-center">
        <div className="text-white text-sm">Loading...</div>
      </div>
    );
  }

  if (status === "unauthorized") {
    window.location.href = `${import.meta.env.VITE_LANDING_URL}/login`;
    return null;
  }

  if (status === "not_admin") {
    return (
      <div className="h-screen bg-[#0B1E40] flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 max-w-sm text-center shadow-2xl">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-xl">🚫</span>
          </div>
          <h1 className="text-lg font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-sm text-gray-500 mb-6">
            Your account does not have admin privileges.
          </p>
          <button
            onClick={() => {
              window.location.href = `${import.meta.env.VITE_HUB_URL}/`;
            }}
            className="w-full bg-[#0B1E40] text-white text-sm font-medium py-2.5 rounded-lg hover:bg-[#0B1E40]/90 transition-colors"
          >
            Back to Hub
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AdminRoute;

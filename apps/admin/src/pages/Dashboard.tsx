import { GraduationCap, Package, Users } from "lucide-react";

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Welcome to the DAIA Admin panel.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Courses</p>
            <p className="text-xl font-bold text-gray-900">—</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 flex items-center gap-4">
          <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
            <Package className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Packages</p>
            <p className="text-xl font-bold text-gray-900">—</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 flex items-center gap-4">
          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
            <Users className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Members</p>
            <p className="text-xl font-bold text-gray-900">—</p>
          </div>
        </div>
      </div>
    </div>
  );
};

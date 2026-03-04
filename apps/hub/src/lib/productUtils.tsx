import { GraduationCap, Plane, Home, Grid3x3 } from "lucide-react";

export const getCategoryIcon = (category: string) => {
  if (category.includes("Education"))
    return <GraduationCap className="h-5 w-5" />;
  if (category.includes("Tourism")) return <Plane className="h-5 w-5" />;
  if (category.includes("Real Estate"))
    return <Home className="h-5 w-5" />;
  return <Grid3x3 className="h-5 w-5" />;
};

export const getCategoryColor = (category: string) => {
  if (category.includes("Education")) return "from-blue-500 to-blue-600";
  if (category.includes("Tourism")) return "from-green-500 to-green-600";
  if (category.includes("Real Estate"))
    return "from-purple-500 to-purple-600";
  return "from-gray-500 to-gray-600";
};
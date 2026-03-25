import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CourseBreadcrumbProps {
  type: "course" | "package";
  title: string | undefined;
}

export function CourseBreadcrumb({ type, title }: CourseBreadcrumbProps) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
      <button
        onClick={() => navigate("/courses")}
        className="hover:text-gray-900 flex items-center gap-1"
      >
        <ChevronLeft className="h-4 w-4" />
        Courses
      </button>
      <span>/</span>
      <span className="text-gray-400">
        {type === "package" ? "Packages" : "Courses"}
      </span>
      <span>/</span>
      <span className="text-gray-900 font-medium">{title}</span>
    </div>
  );
}

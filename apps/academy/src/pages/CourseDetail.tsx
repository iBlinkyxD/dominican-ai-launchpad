import { useState } from "react";
import { CourseHeader } from "../components/courseDetail/CourseHeader";
import { CourseTabs } from "../components/courseDetail/CourseTabs";
import { CourseSidebar } from "../components/courseDetail/CourseSidebar";
import { CourseOverview } from "../components/courseDetail/CourseOverview";
import { Play } from "lucide-react";

export function CourseDetail() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div>
      <CourseHeader />

      <div className="grid lg:grid-cols-3 gap-8 p-6">
        {/* LEFT */}
        <div className="lg:col-span-2">
            {/* Video */}
            <div className="relative aspect-video">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=450&fit=crop"
                alt="Course instructor"
                className="w-full h-full object-cover border rounded-2xl"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition transform">
                  <Play
                    className="h-8 w-8 text-purple-600 ml-1"
                    fill="currentColor"
                  />
                </button>
              </div>
            </div>
          
          <div className="border rounded-2xl mt-4">
            <CourseTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="p-6">
              {activeTab === "overview" && <CourseOverview />}
              {activeTab === "author" && <div>Author</div>}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <CourseSidebar />
      </div>
    </div>
  );
}

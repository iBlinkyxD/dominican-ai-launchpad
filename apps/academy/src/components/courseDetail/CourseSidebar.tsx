import { useState } from "react";
import { ChevronDown, ChevronUp, Play, Check, Star } from "lucide-react";
import luisDorismon from "../../assets/author/luis-dorimson.jpeg";

export const CourseSidebar = () => {
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({
    "01": true,
    "02": false,
    "03": false,
    "04": false,
    "05": false,
    "06": false,
    "07": false,
  });

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const courseSections = [
    {
      id: "01",
      title: "Intro",
      duration: "22min",
      lessons: [
        { title: "Introduction", duration: "2 min" },
        { title: "What is Figma?", duration: "5 min" },
        { title: "Understanding Figma", duration: "12 min" },
        { title: "UI tour", duration: "3 min" },
      ],
    },
    {
      id: "02",
      title: "Intermediate Level Stuff",
      duration: "1h 20min",
      lessons: [
        { title: "Introduction", duration: "2 min" },
        { title: "What is Figma?", duration: "5 min" },
        { title: "Understanding Figma", duration: "12 min" },
        { title: "UI tour", duration: "3 min" },
      ],
    },
    {
      id: "03",
      title: "Advanced Stuff",
      duration: "36min",
      lessons: [],
    },
    {
      id: "04",
      title: "Imports & Graphics",
      duration: "40min",
      lessons: [],
    },
    {
      id: "05",
      title: "Component in Figma",
      duration: "1h 12min",
      lessons: [],
    },
    {
      id: "06",
      title: "Styles in Figma",
      duration: "41min",
      lessons: [],
    },
    {
      id: "07",
      title: "Summary",
      duration: "8min",
      lessons: [],
    },
  ];

  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 sticky top-8">
        <div className="p-6 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">Course content</h3>
        </div>

        <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
          {courseSections.map((section) => (
            <div
              key={section.id}
              className="border-b border-gray-200 last:border-b-0"
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
              >
                <div className="flex items-start gap-3 flex-1 text-left">
                  <span className="font-medium text-gray-900 text-sm">
                    {section.id}: {section.title}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500">
                    {section.duration}
                  </span>
                  {expandedSections[section.id] ? (
                    <ChevronUp className="h-4 w-4 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  )}
                </div>
              </button>

              {expandedSections[section.id] && section.lessons.length > 0 && (
                <div className="bg-gray-50 px-6 py-2">
                  {section.lessons.map((lesson, index) => (
                    <button
                      key={index}
                      className="w-full py-2.5 flex items-center justify-between text-left hover:text-purple-600 transition group"
                    >
                      <div className="flex items-center gap-2">
                        <Play className="h-3 w-3 text-gray-400 group-hover:text-purple-600" />
                        <span className="text-sm text-gray-700 group-hover:text-purple-600">
                          {lesson.title}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {lesson.duration}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Author in Sidebar */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <h4 className="font-semibold text-gray-900 mb-4">Author</h4>
          <div className="flex items-start gap-3">
            <img
              src={luisDorismon}
              alt="Crystal Lucas"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h5 className="font-semibold text-gray-900 text-sm truncate">
                  Prof. Luis Dorismon
                </h5>
                <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="h-2 w-2 text-white" />
                </div>
              </div>
              <p className="text-xs text-gray-600 mb-2">English Language</p>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-medium text-gray-900">4.8</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-600 mt-3 line-clamp-2">
            Crystal is a seasoned UI/UX designer with over a decade of
            experience in creating beautiful digital experiences.
          </p>
        </div>
      </div>
    </div>
  );
};

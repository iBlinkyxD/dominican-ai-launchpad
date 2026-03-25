// components/AdditionalCourses.tsx
import { CourseListItem } from "./CourseListItem";

export const AdditionalCourses = ({ courses, showHeading = false, enrolledIds = new Set<string>() }) => {
  return (
    <div>
      {showHeading && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Individual Courses</h2>
          <p className="text-gray-600">Explore other popular courses</p>
        </div>
      )}
      <div className="grid gap-4">
        {courses.map((course) => (
          <CourseListItem key={course.id} course={course} isEnrolled={enrolledIds.has(course.id)} />
        ))}
      </div>
    </div>
  );
};
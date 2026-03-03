import { courseDetail } from "./detail";
import { instructors } from "./instructor";

export interface CourseList {
  slug: string;
  i18nKey: string;
  price: number;
  rating: number;
  students: number;
  lessons: number;
  instructor: string;
  image: string;
  featured: boolean;
}

export const coursesList: CourseList[] = Object.values(courseDetail).map(
  (course) => ({
    slug: course.slug,
    i18nKey: course.i18nKey,
    price: course.price,
    rating: course.rating,
    students: course.students,
    lessons: course.lessons,
    instructor: instructors[course.instructorId]?.name ?? "",
    image: course.image,
    featured: course.featured,
  })
);

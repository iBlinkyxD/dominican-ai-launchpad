import { Link } from "react-router-dom";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { ScrollAnimation } from "@/hooks/useScrollAnimation";
import { Star, Clock, Users, BookOpen, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

import course8 from "@/assets/courses/course-8.jpeg";
import course13 from "@/assets/courses/course-13.jpeg";
import course15 from "@/assets/courses/course-15.jpeg";

const courses = [
  {
    id: "introduction-to-ai",
    title: "Introduction to AI",
    description:
      "Master the core concepts of artificial intelligence and machine learning. Learn neural networks, deep learning, and practical AI applications.",
    price: 99,
    rating: 4.8,
    students: 1250,
    lessons: 42,
    duration: "20 hours",
    instructor: "Dr. Maria Santos",
    image: course13,
    tags: ["AI", "Machine Learning", "Python"],
    featured: true,
  },
  {
    id: "learn-english-with-ai",
    title: "Learn English with AI",
    description:
      "Comprehensive data science course covering pandas, numpy, visualization, and statistical analysis for real-world applications.",
    price: 99,
    rating: 4.9,
    students: 980,
    lessons: 56,
    duration: "28 hours",
    instructor: "Carlos Rodriguez",
    image: course8,
    tags: ["Python", "Data Science", "Analytics"],
    featured: true,
  },
  {
    id: "ai-in-the-dominican-republic",
    title: "AI in the Dominican Republic",
    description:
      "Build modern web applications with React, Node.js, and databases. From frontend to backend, become a complete developer.",
    price: 99,
    rating: 4.7,
    students: 2100,
    lessons: 68,
    duration: "35 hours",
    instructor: "Ana Martinez",
    image: course15,
    tags: ["React", "Node.js", "JavaScript"],
    featured: true,
  },
];

const Courses = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto section-padding">
          <ScrollAnimation animation="fade-up" className="text-center">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <GraduationCap className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  Our Courses
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mb-6">
                Learn with Expert-Led
                <span className="text-primary"> AI Courses</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Explore cutting-edge courses designed to equip you with the
                skills needed for the AI-driven future. Learn from industry
                experts and gain practical experience.
              </p>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="pb-16">
        <div className="container mx-auto section-padding">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <ScrollAnimation
                key={course.id}
                animation="fade-up"
                delay={index * 100}
              >
                <Link to={`#`} className="group block">
                  <div className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    {/* Course Image */}
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {course.featured && (
                        <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                          Featured
                        </span>
                      )}
                    </div>

                    {/* Course Content */}
                    <div className="p-6">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {course.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {course.title}
                      </h3>

                      {/* Description */}
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {course.description}
                      </p>

                      {/* Stats */}
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          <span>{course.lessons} lessons</span>
                        </div>
                      </div>

                      {/* Rating & Students */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-medium text-foreground">
                            {course.rating}
                          </span>
                          <span className="text-muted-foreground">
                            ({course.students.toLocaleString()})
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {course.instructor}
                        </span>
                      </div>

                      {/* Price & CTA */}
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <span className="text-2xl font-bold text-foreground">
                          ${course.price}
                        </span>
                        <Button className="bg-primary hover:bg-primary/90">
                          TBA
                        </Button>
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
        <div className="container mx-auto section-padding text-center">
          <ScrollAnimation animation="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of students who are already advancing their careers
              with our expert-led courses.
            </p>
            <Button
              size="lg"
              className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-8"
            >
              Browse All Courses
            </Button>
          </ScrollAnimation>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Courses;

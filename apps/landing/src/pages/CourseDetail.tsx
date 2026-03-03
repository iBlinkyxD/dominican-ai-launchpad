// import { useParams, Link } from "react-router-dom";
// import Header from "@/components/landing/Header";
// import Footer from "@/components/landing/Footer";
// import { ScrollAnimation } from "@/hooks/useScrollAnimation";
// import {
//   Star,
//   Clock,
//   Users,
//   BookOpen,
//   Play,
//   Check,
//   ChevronRight,
//   Award,
//   Download,
//   Infinity,
//   Globe,
//   Monitor,
//   FileText,
//   ChevronDown,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";

// import { instructors } from "@/data/courses/instructor";
// import { courseDetail } from "@/data/courses/detail";

// const CourseDetail = () => {
//   const { courseId } = useParams();
//   const course = courseDetail[courseId as keyof typeof courseDetail];
//   const instructor = instructors[course.instructorId as keyof typeof instructors];

//   if (!course) {
//     return (
//       <div className="min-h-screen bg-background">
//         <Header />
//         <div className="pt-32 pb-20 text-center">
//           <h1 className="text-2xl font-bold text-foreground">
//             Course not found
//           </h1>
//           <Link
//             to="/courses"
//             className="text-primary hover:underline mt-4 inline-block"
//           >
//             Back to courses
//           </Link>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   const featuredCourses = Object.values(courseDetail).filter(
//     (c) => c.slug !== course.slug,
//   );

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />

//       <main className="pt-24 pb-16">
//         {/* Breadcrumb */}
//         <section
//           aria-labelledby="course-detail-breadcrumb"
//           className="py-16 relative overflow-hidden"
//         >
//           <div className="pt-24 pb-4 bg-muted/30">
//             <div className="container mx-auto section-padding">
//               <nav className="flex items-center gap-2 text-sm text-muted-foreground">
//                 <Link to="/" className="hover:text-primary transition-colors">
//                   Home
//                 </Link>
//                 <ChevronRight className="w-4 h-4" />
//                 <Link
//                   to="/courses"
//                   className="hover:text-primary transition-colors"
//                 >
//                   Courses
//                 </Link>
//                 <ChevronRight className="w-4 h-4" />
//                 <span className="text-foreground font-medium truncate">
//                   {course.title}
//                 </span>
//               </nav>
//             </div>
//           </div>
//         </section>

//         {/* Hero Section */}
//         <section className="py-8 bg-muted/30">
//           <div className="container mx-auto section-padding">
//             <div className="grid lg:grid-cols-3 gap-8">
//               {/* Left Content */}
//               <div className="lg:col-span-2">
//                 <ScrollAnimation animation="fade-up">
//                   <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
//                     {course.title}
//                   </h1>
//                   <p className="text-muted-foreground mb-6">
//                     {course.subtitle}
//                   </p>

//                   {/* Instructor */}
//                   <div className="flex items-center gap-3 mb-6">
//                     <img
//                       src={course.image}
//                       alt={instructor.name}
//                       className="w-10 h-10 rounded-full object-cover"
//                     />

//                     <div>
//                       <p className="text-sm font-medium text-foreground">
//                         {instructor.name}
//                       </p>
//                       <p className="text-xs text-muted-foreground">
//                         {instructor.title}
//                       </p>
//                     </div>
//                     <div className="flex items-center gap-1 ml-4">
//                       <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
//                       <span className="font-medium">{course.rating}</span>
//                       <span className="text-muted-foreground">
//                         ({course.reviews} reviews)
//                       </span>
//                     </div>
//                   </div>

//                   {/* Video Player */}
//                   <div className="relative aspect-video rounded-2xl overflow-hidden bg-black group cursor-pointer">
//                     <img
//                       src={course.videoThumbnail}
//                       alt={course.title}
//                       className="w-full h-full object-cover opacity-80"
//                     />
//                     <div className="absolute inset-0 flex items-center justify-center">
//                       <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
//                         <Play className="w-8 h-8 text-primary fill-primary ml-1" />
//                       </div>
//                     </div>
//                     {/* Video controls overlay */}
//                     <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
//                       <div className="flex items-center gap-4 text-white text-sm">
//                         <Play className="w-5 h-5" />
//                         <div className="flex-1 h-1 bg-white/30 rounded-full">
//                           <div className="h-full w-1/3 bg-primary rounded-full" />
//                         </div>
//                         <span>12:34</span>
//                       </div>
//                     </div>
//                   </div>
//                 </ScrollAnimation>
//               </div>

//               {/* Right Sidebar - Price Card */}
//               <div className="lg:col-span-1">
//                 <ScrollAnimation animation="fade-left">
//                   <div className="bg-card border border-border rounded-2xl p-6 sticky top-24 shadow-lg">
//                     <p className="text-muted-foreground mb-2">
//                       Unlock your learning journey now!
//                     </p>
//                     <p className="text-sm text-muted-foreground mb-4">
//                       Flexible access tailored to your budget, with
//                       comprehensive features and lifetime learning
//                     </p>
//                     <div className="text-4xl font-bold text-foreground mb-6">
//                       ${course.price}
//                     </div>

//                     <Button className="w-full bg-foreground text-background hover:bg-foreground/90 mb-3 h-12">
//                       Buy Course
//                     </Button>
//                     <Button variant="outline" className="w-full mb-6 h-12">
//                       See All Courses
//                     </Button>

//                     <div className="space-y-3">
//                       <h4 className="font-semibold text-foreground">
//                         This Course Includes:
//                       </h4>
//                       <div className="space-y-2 text-sm">
//                         <div className="flex items-center gap-2 text-muted-foreground">
//                           <BookOpen className="w-4 h-4 text-primary" />
//                           <span>{course.lessons} lessons</span>
//                         </div>
//                         <div className="flex items-center gap-2 text-muted-foreground">
//                           <Clock className="w-4 h-4 text-primary" />
//                           <span>{course.duration} on-demand video</span>
//                         </div>
//                         <div className="flex items-center gap-2 text-muted-foreground">
//                           <Download className="w-4 h-4 text-primary" />
//                           <span>Downloadable resources</span>
//                         </div>
//                         <div className="flex items-center gap-2 text-muted-foreground">
//                           <Award className="w-4 h-4 text-primary" />
//                           <span>Certificate of Completion</span>
//                         </div>
//                         <div className="flex items-center gap-2 text-muted-foreground">
//                           <Infinity className="w-4 h-4 text-primary" />
//                           <span>Lifetime access</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </ScrollAnimation>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Course Benefits */}
//         <section className="py-12">
//           <div className="container mx-auto section-padding">
//             <ScrollAnimation animation="fade-up">
//               <h2 className="text-2xl font-bold text-foreground mb-6">
//                 Our Course Benefits
//               </h2>
//               <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
//                 {course.benefits.map((benefit, index) => (
//                   <div key={index} className="flex items-center gap-2">
//                     <Check className="w-5 h-5 text-primary flex-shrink-0" />
//                     <span className="text-muted-foreground">{benefit}</span>
//                   </div>
//                 ))}
//               </div>
//             </ScrollAnimation>

//             {/* Trusted By */}
//             <ScrollAnimation animation="fade-up" delay={100}>
//               <div className="mt-12 pt-8 border-t border-border">
//                 <p className="text-sm text-muted-foreground mb-4">
//                   Top teams boost skills with our trusted courses
//                 </p>
//                 <div className="flex flex-wrap gap-8 items-center">
//                   {course.trustedBy.map((company, index) => (
//                     <div
//                       key={index}
//                       className="flex items-center gap-2 text-muted-foreground"
//                     >
//                       <Monitor className="w-5 h-5" />
//                       <span className="font-medium">{company}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </ScrollAnimation>
//           </div>
//         </section>

//         {/* Requirements */}
//         <section className="py-8">
//           <div className="container mx-auto section-padding">
//             <ScrollAnimation animation="fade-up">
//               <div className="bg-muted/50 rounded-2xl p-6">
//                 <h2 className="text-xl font-bold text-foreground mb-4">
//                   Requirements
//                 </h2>
//                 <ul className="space-y-2">
//                   {course.requirements.map((req, index) => (
//                     <li
//                       key={index}
//                       className="flex items-start gap-2 text-muted-foreground"
//                     >
//                       <span className="text-primary mt-1">•</span>
//                       <span>{req}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </ScrollAnimation>
//           </div>
//         </section>

//         {/* What to Expect */}
//         <section className="py-8">
//           <div className="container mx-auto section-padding">
//             <ScrollAnimation animation="fade-up">
//               <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-2xl p-6">
//                 <h2 className="text-xl font-bold text-foreground mb-4">
//                   What to expect from this course
//                 </h2>
//                 <div className="prose prose-sm text-muted-foreground max-w-none">
//                   {course.whatToExpect.split("\n\n").map((para, index) => (
//                     <p key={index} className="mb-4">
//                       {para}
//                     </p>
//                   ))}
//                 </div>
//               </div>
//             </ScrollAnimation>
//           </div>
//         </section>

//         {/* Curriculum */}
//         <section className="py-8">
//           <div className="container mx-auto section-padding">
//             <ScrollAnimation animation="fade-up">
//               <div className="bg-muted/30 rounded-2xl p-6">
//                 <h2 className="text-xl font-bold text-foreground mb-6">
//                   The Curriculum
//                 </h2>
//                 <Accordion type="single" collapsible className="space-y-2">
//                   {course.curriculum.map((module, index) => (
//                     <AccordionItem
//                       key={index}
//                       value={`module-${index}`}
//                       className="bg-background border border-border rounded-lg px-4"
//                     >
//                       <AccordionTrigger className="hover:no-underline">
//                         <span className="text-foreground font-medium">
//                           {module.title}
//                         </span>
//                       </AccordionTrigger>
//                       <AccordionContent>
//                         <ul className="space-y-2 pb-2">
//                           {module.lessons.map((lesson, lessonIndex) => (
//                             <li
//                               key={lessonIndex}
//                               className="flex items-center gap-2 text-muted-foreground text-sm"
//                             >
//                               <Play className="w-4 h-4 text-primary" />
//                               <span>{lesson}</span>
//                             </li>
//                           ))}
//                         </ul>
//                       </AccordionContent>
//                     </AccordionItem>
//                   ))}
//                 </Accordion>
//               </div>
//             </ScrollAnimation>
//           </div>
//         </section>

//         {/* Certificate */}
//         <section className="py-8">
//           <div className="container mx-auto section-padding">
//             <ScrollAnimation animation="fade-up">
//               <h2 className="text-xl font-bold text-foreground mb-6">
//                 Certificate of Completion
//               </h2>
//               <div className="bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-2xl p-8 border border-primary/20">
//                 <div className="max-w-md mx-auto text-center">
//                   <div className="bg-background rounded-xl p-6 shadow-lg border border-border">
//                     <Award className="w-12 h-12 text-primary mx-auto mb-4" />
//                     <h3 className="text-2xl font-bold text-primary mb-2">
//                       Certificate
//                     </h3>
//                     <p className="text-sm text-muted-foreground mb-4">
//                       of Appreciation
//                     </p>
//                     <p className="text-xs text-muted-foreground mb-2">
//                       This is to certify that
//                     </p>
//                     <p className="text-xl font-script text-foreground mb-4">
//                       Your Name Here
//                     </p>
//                     <p className="text-xs text-muted-foreground">
//                       has successfully completed the {course.title} course
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </ScrollAnimation>
//           </div>
//         </section>

//         {/* Instructor */}
//         <section className="py-8">
//           <div className="container mx-auto section-padding">
//             <ScrollAnimation animation="fade-up">
//               <div className="bg-card border border-border rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-start">
//                 <img
//                   src={instructor.image}
//                   alt={instructor.name}
//                   className="w-24 h-24 rounded-xl object-cover"
//                 />
//                 <div className="flex-1">
//                   <p className="text-sm text-muted-foreground mb-1">
//                     I believe my journey.
//                   </p>
//                   <h3 className="text-xl font-bold text-foreground mb-1">
//                     {instructor.name}
//                   </h3>
//                   <p className="text-sm text-primary mb-3">
//                     {instructor.title}
//                   </p>
//                   <p className="text-muted-foreground text-sm">
//                     {instructor.bio}
//                   </p>
//                 </div>
//               </div>
//             </ScrollAnimation>
//           </div>
//         </section>

//         {/* Featured Courses */}
//         <section className="py-16 bg-muted/30">
//           <div className="container mx-auto section-padding">
//             <ScrollAnimation animation="fade-up">
//               <div className="text-center mb-12">
//                 <p className="text-sm text-muted-foreground mb-2">
//                   Related Courses
//                 </p>
//                 <h2 className="text-3xl font-bold text-foreground">
//                   Featured Courses
//                 </h2>
//               </div>
//             </ScrollAnimation>

//             <div className="grid md:grid-cols-2 gap-6">
//               {featuredCourses.map((featuredCourse, index) => (
//                 <ScrollAnimation
//                   key={featuredCourse.slug}
//                   animation="fade-up"
//                   delay={index * 100}
//                 >
//                   <Link
//                     to={`/courses/${featuredCourse.slug}`}
//                     className="group block"
//                   >
//                     <div className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all flex">
//                       <div className="w-1/3 aspect-square overflow-hidden">
//                         <img
//                           src={featuredCourse.image}
//                           alt={featuredCourse.title}
//                           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                         />
//                       </div>
//                       <div className="flex-1 p-4">
//                         <div className="flex items-center gap-1 mb-2">
//                           <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
//                           <span className="text-sm font-medium">
//                             {featuredCourse.rating}
//                           </span>
//                           <span className="text-xs text-muted-foreground">
//                             ({featuredCourse.reviews})
//                           </span>
//                           <span className="ml-auto text-lg font-bold text-foreground">
//                             ${featuredCourse.price}
//                           </span>
//                         </div>
//                         <h3 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
//                           {featuredCourse.title}
//                         </h3>
//                         <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
//                           {featuredCourse.description}
//                         </p>
//                         <div className="flex items-center justify-between text-xs text-muted-foreground">
//                           <span className="text-primary font-medium">
//                             {featuredCourse.tags[0]}
//                           </span>
//                           <span>{featuredCourse.duration}</span>
//                         </div>
//                       </div>
//                     </div>
//                   </Link>
//                 </ScrollAnimation>
//               ))}
//             </div>

//             <div className="text-center mt-8">
//               <Link to="/courses">
//                 <Button variant="outline" className="rounded-full px-8">
//                   View All Courses
//                   <ChevronRight className="w-4 h-4 ml-1" />
//                 </Button>
//               </Link>
//             </div>
//           </div>
//         </section>

//         {/* Course Topics */}
//         <section className="py-16">
//           <div className="container mx-auto section-padding text-center">
//             <ScrollAnimation animation="fade-up">
//               <p className="text-sm text-muted-foreground mb-2">
//                 What you'll learn
//               </p>
//               <h2 className="text-3xl font-bold text-foreground mb-8">
//                 Course Topics
//               </h2>
//               <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
//                 Explore the key topics covered in our courses, designed to equip
//                 you with the skills needed for modern development.
//               </p>
//               <div className="flex flex-wrap justify-center gap-3">
//                 {course.tags
//                   .concat([
//                     "Python",
//                     "JavaScript",
//                     "React",
//                     "Node.js",
//                     "SQL",
//                     "APIs",
//                     "Cloud",
//                   ])
//                   .slice(0, 8)
//                   .map((tag, index) => (
//                     <span
//                       key={index}
//                       className="px-4 py-2 bg-muted border border-border rounded-full text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
//                     >
//                       {tag}
//                     </span>
//                   ))}
//               </div>
//             </ScrollAnimation>
//           </div>
//         </section>

//         {/* CTA Section */}
//         <section className="py-20 bg-foreground text-background">
//           <div className="container mx-auto section-padding text-center">
//             <ScrollAnimation animation="fade-up">
//               <p className="text-sm text-background/70 mb-2">DAIA Education</p>
//               <h2 className="text-3xl md:text-4xl font-bold mb-4">
//                 Boost your Learning & Knowledge
//                 <br />
//                 with DAIA Now
//               </h2>
//               <Button
//                 size="lg"
//                 className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 mt-6"
//               >
//                 Start Learning Now
//               </Button>
//               <p className="text-sm text-background/60 mt-4">
//                 Join 50,000+ learners. Free trial available.
//               </p>
//             </ScrollAnimation>
//           </div>
//         </section>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default CourseDetail;

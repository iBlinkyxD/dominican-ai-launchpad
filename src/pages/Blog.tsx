import { NotebookPen } from "lucide-react";
import { Link } from "react-router-dom";
import { ScrollAnimation } from "@/hooks/useScrollAnimation";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

import partner1 from "../assets/partner/partner-1.jpeg";

import elbaAbreu from "@/assets/profile/elba-abreu-cropped.jpeg";
import luisDorismon from "@/assets/profile/luis-dorismon-cropped.jpeg";
import emelysRivera from "@/assets/profile/emelys-rivera-cropped.jpeg";
import kevinJoa from "@/assets/profile/kevin-joa-cropped.jpeg";

const blogList = [
  {
    id: "ai-in-education-2026",
    title: "How AI Is Transforming Education in 2026",
    preview:
      "From adaptive learning systems to AI tutors, explore how artificial intelligence is reshaping classrooms across the globe.",
    tags: ["AI", "Education", "EdTech"],
    duration: "7m",
    author: [
      {
        name: "Lewis Dorismon",
        avatar: luisDorismon,
      },
    ],
    publishedDate: "February 2, 2026",
    thumbnail: partner1,
  },
  {
    id: "future-of-tourism-ai",
    title: "The Future of Tourism Powered by AI",
    preview:
      "Discover how predictive analytics and smart automation are redefining the tourism experience for travelers and businesses.",
    tags: ["AI", "Tourism", "Innovation"],
    duration: "6m",
    author: [
      {
        name: "Kevin Joa",
        avatar: kevinJoa,
      },
      {
        name: "Emelys Rivera",
        avatar: emelysRivera,
      },
    ],
    publishedDate: "January 18, 2026",
    thumbnail: partner1,
  },
  {
    id: "real-estate-automation",
    title: "AI Automation in Real Estate: What’s Next?",
    preview:
      "From intelligent property valuation to AI-driven customer insights, real estate is entering a new digital era.",
    tags: ["AI", "Real Estate", "Automation"],
    duration: "8m",
    author: [
      {
        name: "Elba Abreu",
        avatar: elbaAbreu,
      },
    ],
    publishedDate: "January 10, 2026",
    thumbnail: partner1,
  },
  // {
  //   id: "ethical-ai-framework",
  //   title: "Building an Ethical AI Framework for Startups",
  //   preview:
  //     "A practical guide to implementing responsible AI principles while scaling your startup efficiently.",
  //   tags: ["Ethics", "AI Policy", "Startups"],
  //   duration: "9m",
  //   author: ["Sofia Ramirez", "Daniel Cruz"],
  //   publishedDate: "December 22, 2025",
  //   thumbnail: partner1,
  // },
  // {
  //   id: "ai-student-app-impact",
  //   title: "Inside the DAIA Student App: Empowering Learners with AI",
  //   preview:
  //     "A deep dive into how AI-driven personalization is helping students learn smarter and faster.",
  //   tags: ["AI", "Mobile App", "Education"],
  //   duration: "5m",
  //   author: ["Miguel Fernandez"],
  //   publishedDate: "December 5, 2025",
  //   thumbnail: partner1,
  // },
  // {
  //   id: "ai-workshops-business",
  //   title: "Why AI Workshops Are Essential for Modern Businesses",
  //   preview:
  //     "Hands-on AI workshops are becoming the fastest way for companies to upskill teams and stay competitive.",
  //   tags: ["Workshops", "AI Training", "Business"],
  //   duration: "4m",
  //   author: ["Laura Perez", "Javier Morales"],
  //   publishedDate: "November 28, 2025",
  //   thumbnail: partner1,
  // },
];

const Blog = () => {
  const latestBlog = [...blogList].sort(
    (a, b) =>
      new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime(),
  )[0];

  const otherBlogs = blogList.filter((blog) => blog.id !== latestBlog.id);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="py-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 via-background to-blue-50/50" />

          <div className="container mx-auto section-padding relative z-10">
            <ScrollAnimation animation="fade-up" className="text-center mb-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card shadow-sm mb-6">
                <NotebookPen className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  Blog
                </span>
              </div>

              <h1 className="font-display font-medium text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
                Our Blog
              </h1>

              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Catch up with our latest articles!
              </p>
            </ScrollAnimation>

            <section className="py-8 relative overflow-hidden">
              <ScrollAnimation animation="fade-up" className="mb-8">
                <Link to={`/blog/${latestBlog.id}`} className="group block">
                  <div className="bg-card border rounded-3xl p-8 grid md:grid-cols-2 gap-8 items-center w-3/4 mx-auto overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    {/* LEFT CONTENT */}
                    <div className="space-y-6">
                      {/* Tags + Read Time */}
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        {latestBlog.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                        <span>•</span>
                        <span>{latestBlog.duration} read</span>
                      </div>

                      {/* Title */}
                      <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                        {latestBlog.title}
                      </h2>

                      {/* Preview */}
                      <p className="text-muted-foreground">
                        {latestBlog.preview}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-6 border-t">
                        <div className="flex items-center gap-4">
                          {/* Avatars */}
                          <div className="flex -space-x-3">
                            {latestBlog.author.map((a, index) => (
                              <img
                                key={index}
                                src={a.avatar}
                                alt={a.name}
                                className="w-10 h-10 rounded-full border-2 border-background object-cover"
                              />
                            ))}
                          </div>

                          {/* Text */}
                          <div className="leading-tight">
                            <p className="text-sm text-muted-foreground">
                              Written by
                            </p>
                            <p className="font-medium">
                              {latestBlog.author.map((a) => a.name).join(", ")}
                            </p>
                          </div>
                        </div>

                        <div className="text-sm text-muted-foreground">
                          Posted on {latestBlog.publishedDate}
                        </div>
                      </div>
                    </div>

                    {/* RIGHT IMAGE */}
                    <div>
                      <img
                        src={latestBlog.thumbnail}
                        alt={latestBlog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 border-border rounded-2xl"
                      />
                    </div>
                  </div>
                </Link>
              </ScrollAnimation>
            </section>

            <section>
              <ScrollAnimation animation="fade-up" className="text-center mb-8">
                <h1 className="font-display font-medium text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
                  Other articles
                </h1>
              </ScrollAnimation>
              <div className="container mx-auto section-padding">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch auto-rows-fr">
                  {otherBlogs.map((blog, index) => (
                    <ScrollAnimation
                      key={blog.id}
                      animation="fade-up"
                      delay={index * 100}
                    >
                      <Link to={`/blog/${blog.id}`} className="group block">
                        <div className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-[500px] flex flex-col">
                          {/* Blog Image */}
                          <div className="relative aspect-video overflow-hidden">
                            <img
                              src={blog.thumbnail}
                              alt={blog.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>

                          {/* Blog Content */}
                          <div className="p-6 flex flex-col flex-1">
                            {/* Tags */}
                            <div className="flex gap-2 mb-3 overflow-hidden">
                              {blog.tags.slice(0, 2).map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
                                >
                                  {tag}
                                </span>
                              ))}
                              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <span>•</span>
                                <span>{blog.duration} read</span>
                              </div>
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-bold text-foreground mb-2 transition-colors line-clamp-2">
                              {blog.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                              {blog.preview}
                            </p>

                            {/* Footer */}
                            <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                              <div>
                                <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
                                  Written by
                                </p>
                                <p className="text-xs text-gray-500 group-hover:text-black transition-colors">
                                  {blog.author.join(", ")}
                                </p>
                              </div>

                              <div>
                                <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
                                  Posted on
                                </p>
                                <p className="text-xs text-gray-500 group-hover:text-black transition-colors">
                                  {blog.publishedDate}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </ScrollAnimation>
                  ))}
                </div>
              </div>
            </section>

            {/* Back to Home Link */}
            <ScrollAnimation
              animation="fade-up"
              delay={400}
              className="text-center mt-16"
            >
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                ← Back to Home
              </Link>
            </ScrollAnimation>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;

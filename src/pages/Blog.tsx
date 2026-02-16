import { NotebookPen } from "lucide-react";
import { Link } from "react-router-dom";
import { ScrollAnimation } from "@/hooks/useScrollAnimation";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

import { authors } from "@/data/blog/author";
import { blogList } from "@/data/blog/list";

const Blog = () => {
  const latestBlog = [...blogList].sort(
    (a, b) =>
      new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime(),
  )[0];

  const otherBlogs = blogList.filter((blog) => blog.slug !== latestBlog.slug);

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
                <Link to={`/blog/${latestBlog.slug}`} className="group block">
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
                            {latestBlog.authorIds.map((id) => {
                              const author = authors[id];

                              if (!author) return null;
                              return (
                                <img
                                  key={author.id}
                                  src={author.avatar}
                                  alt={author.name}
                                  className="w-10 h-10 rounded-full border-2 border-background object-cover"
                                />
                              );
                            })}
                          </div>

                          {/* Text */}
                          <div className="leading-tight">
                            <p className="text-sm text-muted-foreground">
                              Written by
                            </p>
                            <p className="font-medium">
                              {latestBlog.authorIds
                                .map((id) => authors[id]?.name)
                                .filter(Boolean)
                                .join(", ")}{" "}
                            </p>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm text-muted-foreground">
                            Posted on
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(
                              latestBlog.publishedDate + "T00:00:00",
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
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
                      key={blog.slug}
                      animation="fade-up"
                      delay={index * 100}
                    >
                      <Link to={`/blog/${blog.slug}`} className="group block">
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
                                  {blog.authorIds
                                    .map((id) => authors[id]?.name)
                                    .filter(Boolean)
                                    .join(", ")}
                                </p>
                              </div>

                              <div>
                                <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
                                  Posted on
                                </p>
                                <p className="text-xs text-gray-500 group-hover:text-black transition-colors">
                                  {new Date(
                                    blog.publishedDate + "T00:00:00",
                                  ).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
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

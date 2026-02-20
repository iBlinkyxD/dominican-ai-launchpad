import { Users, Search, Linkedin, Twitter, Newspaper } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ScrollAnimation } from "@/hooks/useScrollAnimation";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

import { newsList } from "@/data/news/list";

const News = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 via-background to-blue-50/50" />

          <div className="container mx-auto section-padding relative z-10">
            <ScrollAnimation animation="fade-up" className="text-center mb-16">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card shadow-sm mb-6">
                <Newspaper className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  News
                </span>
              </div>

              <h1 className="font-display font-medium text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
                Latest News
              </h1>

              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Official updates, announcements, and milestones from DAIA.
              </p>
            </ScrollAnimation>

            <div className="mx-auto px-6 py-6">
              <div className="space-y-8">
                {newsList.map((news, index) => (
                  <ScrollAnimation
                    key={news.slug}
                    animation="fade-up"
                    delay={index * 100}
                  >
                    <Link to={`/news/${news.slug}`} className="group block">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-y-4 md:gap-y-0 items-start transition-all duration-300 hover:-translate-y-1">
                        {/* DATE */}
                        <div className="order-3 md:order-1 md:col-span-3 md:border-l md:border-l-gray-500 md:border-r md:border-r-blue-950 pl-4">
                          <p className="text-base text-gray-500">
                            {" "}
                            {new Date(
                              news.publishedDate + "T00:00:00",
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>

                        {/* CATEGORY + TITLE */}
                        <div className="order-1 md:order-2 md:col-span-6 space-y-3 text-left md:pl-0">
                          <h2 className="font-semibold text-blue-950 text-base tracking-wide border-l border-blue-950 pl-4 md:border-none">
                            {news.category}
                          </h2>

                          <h1 className="md:text-2xl text-xl font-medium text-black leading-snug pl-4">
                            {news.title}
                          </h1>
                        </div>

                        {/* IMAGE */}
                        <div className="order-4 md:order-3 md:col-span-3 md:border-l md:border-gray-400 md:border-dashed pl-4">
                          <div className="bg-gray-100 rounded-2xl h-80 md:h-40 flex items-center justify-center transition-all duration-300 group-hover:shadow-md ">
                            <span className="text-gray-700 font-medium">
                              <img
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-xl"
                                src={news.thumbnail}
                              />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </ScrollAnimation>
                ))}
              </div>
            </div>

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

export default News;

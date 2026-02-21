import { Users, Search, Linkedin, Twitter, Newspaper } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { ScrollAnimation } from "@/hooks/useScrollAnimation";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

import { getNewsList } from "@/data/news/post";
import { useTranslation } from "react-i18next";

const News = () => {
  const { t, i18n } = useTranslation("news");
  const newsList = useMemo(() => getNewsList(), [i18n.language]);
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section
          aria-labelledby="news-hero"
          className="py-16 relative overflow-hidden"
        >
          <div className="container mx-auto relative z-10">
            <ScrollAnimation animation="fade-up" className="text-center mb-16">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card shadow-sm mb-6">
                <Newspaper className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  {t(`news.badge`)}
                </span>
              </div>

              <h1 className="font-display font-medium text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
                {t(`news.title`)}
              </h1>

              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t(`news.subtitle`)}
              </p>
            </ScrollAnimation>
          </div>
        </section>

        <section aria-labelledby="news-listing">
          <div className="container mx-auto relative z-10">
            <div className="space-y-8">
              {newsList.map((news, index) => (
                <ScrollAnimation
                  key={news.slug}
                  animation="fade-up"
                  delay={index * 100}
                >
                  <Link to={`/news/${news.slug}`} className="group block">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-4 lg:gap-y-0 items-start transition-all duration-300 hover:-translate-y-1">
                      {/* DATE */}
                      <div className="order-3 lg:order-1 lg:col-span-3 lg:border-l lg:border-l-gray-500 md:border-r lg:border-r-blue-950 pl-4">
                        <p className="text-base text-gray-500">
                          {new Date(
                            news.publishedDate + "T00:00:00",
                          ).toLocaleDateString(
                            i18n.language === "es" ? "es-DO" : "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            },
                          )}
                        </p>
                      </div>

                      {/* CATEGORY + TITLE */}
                      <div className="order-1 lg:order-2 lg:col-span-6 space-y-3 text-left lg:pl-0">
                        <h2 className="font-semibold text-blue-950 text-base tracking-wide border-l border-blue-950 pl-4 lg:border-none">
                          {news.category}
                        </h2>

                        <h1 className="text-2xl  font-medium text-black leading-snug px-4">
                          {news.title}
                        </h1>
                      </div>

                      {/* IMAGE */}
                      <div className="order-4 lg:order-3 lg:col-span-3 lg:border-l lg:border-gray-400 lg:border-dashed px-4">
                        <div
                          className="bg-gray-100 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:shadow-md"
                          style={{
                            boxShadow:
                              "0 20px 60px -15px hsl(var(--foreground) / 0.5), 0 8px 20px -8px hsl(var(--foreground) / 0.05), inset 0 1px 0 hsl(0 0% 100% / 0.3)",
                            background:
                              "linear-gradient(145deg, hsl(var(--card)) 0%, hsl(var(--card) / 0.85) 100%)",
                            transformStyle: "preserve-3d",
                          }}
                        >
                          <img
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-xl"
                            src={news.thumbnail}
                          />
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
            {t(`news.backHome`)}
          </Link>
        </ScrollAnimation>
      </main>

      <Footer />
    </div>
  );
};

export default News;

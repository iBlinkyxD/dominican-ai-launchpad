import { useParams, Link } from "react-router-dom";
import { School, GraduationCap, Building2, ChevronRight } from "lucide-react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { ScrollAnimation } from "@/hooks/useScrollAnimation";

import { newsPost } from "@/data/news/post";

const NewsDetail = () => {
  const { newsId } = useParams();
  const news = newsPost[newsId as keyof typeof newsPost];

  if (!newsId) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-20 text-center">
          <h1 className="text-2xl font-medium text-foreground">
            News not found
          </h1>
          <Link
            to="/news"
            className="text-primary hover:underline mt-4 inline-block"
          >
            Back to news
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <section aria-labelledby="news-breadcrumb">
        <div className="pt-24 pb-4 bg-muted/30">
          <div className="container mx-auto section-padding">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link to="/news" className="hover:text-primary transition-colors">
                News
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground font-medium truncate">
                {news.title}
              </span>
            </nav>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section aria-labelledby="news-content" className="bg-muted/30">
        <div className="container mx-auto section-padding">
          <ScrollAnimation animation="fade-up">
            {/* TITLE (Full Width) */}
            <h1 className="text-4xl lg:text-5xl font-medium text-foreground leading-tight mb-6">
              {news.title}
            </h1>

            {/* CONTENT GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 items-start">
              {/* LEFT COLUMN — DATE */}
              <div className="lg:col-span-1 mb-6">
                <p className="text-muted-foreground text-sm tracking-wide">
                  {new Date(
                    news.publishedDate + "T00:00:00",
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              {/* RIGHT COLUMN — IMAGE + TEXT */}
              <div className="lg:col-span-2 space-y-8">
                {/* Image */}
                <div className="w-full aspect-video rounded-2xl overflow-hidden">
                  <iframe
                    className="w-full h-full"
                    src={news.thumbnail}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                </div>

                {/* Body Text */}
                <div className="space-y-6">
                  {news.content
                    .filter((_, index) => index !== 0)
                    .map((block, index) => {
                      switch (block.type) {
                        case "heading":
                          return (
                            <h2
                              key={index}
                              className="text-3xl font-semibold text-foreground"
                            >
                              {block.text}
                            </h2>
                          );

                        case "paragraph":
                          return (
                            <p
                              key={index}
                              className="text-lg text-muted-foreground leading-relaxed text-justify"
                            >
                              {block.text}
                            </p>
                          );

                        case "list":
                          return (
                            <ul
                              key={index}
                              className="list-disc list-inside space-y-2 text-lg text-muted-foreground"
                            >
                              {block.items.map((item, i) => (
                                <li key={i}>{item}</li>
                              ))}
                            </ul>
                          );

                        default:
                          return null;
                      }
                    })}
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NewsDetail;

import { useParams, Link } from "react-router-dom";
import { School, GraduationCap, Building2, ChevronRight } from "lucide-react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { ScrollAnimation } from "@/hooks/useScrollAnimation";

import { getNewsPosts } from "@/data/news/post";
import { useTranslation } from "react-i18next";

const NewsDetail = () => {
  const { t } = useTranslation("news");
  const { newsId } = useParams();

  const posts = getNewsPosts();
  const news = newsId ? posts[newsId] : undefined;

  if (!news) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-20 text-center">
          <h1 className="text-2xl font-medium text-foreground">
            {t(`newsDetail.notFound`)}
          </h1>
          <Link
            to="/news"
            className="text-primary hover:underline mt-4 inline-block"
          >
            {t(`newsDetail.backToNews`)}
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const { Content } = news;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <section aria-labelledby="news-breadcrumb">
        <div className="pt-24 pb-4 bg-muted/30">
          <div className="container mx-auto relative z-10">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary transition-colors">
                {t(`newsDetail.home`)}
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link to="/news" className="hover:text-primary transition-colors">
                {t(`newsDetail.news`)}
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground font-medium truncate">
                {news.shortTitle}
              </span>
            </nav>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section aria-labelledby="news-content" className="bg-muted/30">
        <div className="container mx-auto relative z-10 pt-16">
          <ScrollAnimation animation="fade-up">
            {/* TITLE (Full Width) */}
            <h1 className="text-3xl lg:text-[42px] font-medium text-foreground leading-tight mb-6 lg:w-3/4 text-center mx-auto">
              {news.title}
            </h1>

            {/* RIGHT COLUMN — IMAGE + TEXT */}
            <div className="space-y-8 py-16 mx-auto">
              {/* Image */}
              <div
                className="lg:w-9/12 mx-auto relative aspect-video rounded-2xl overflow-hidden"
                style={{
                  boxShadow:
                    "0 20px 60px -15px hsl(var(--foreground) / 0.5), 0 8px 20px -8px hsl(var(--foreground) / 0.05), inset 0 1px 0 hsl(0 0% 100% / 0.3)",
                  background:
                    "linear-gradient(145deg, hsl(var(--card)) 0%, hsl(var(--card) / 0.85) 100%)",
                  transformStyle: "preserve-3d",
                }}
              >
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={news.thumbnail}
                  alt={news.partner}
                />
              </div>

              {/* Body Text */}
              <div className="text-foreground space-y-6 lg:w-3/4 py-16 text-justify mx-auto [&_strong]:font-semibold [&_blockquote]:bg-muted [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:px-6 [&_blockquote]:py-4 [&_blockquote]:italic [&_blockquote]:rounded-lg">
                <Content />
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

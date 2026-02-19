import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, Sparkles, Bell } from "lucide-react";
import { ScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { useTranslation } from "react-i18next";

const ComingSoon = () => {
  const { t } = useTranslation("comingSoon");
  const location = useLocation();
  const slug = location.pathname.replace("/", "");

  const pageInfo: Record<string, { key: string }> = {
    "/educa-one": { key: slug },
    "/scholar-one": { key: slug },
    "/quisqueya-ai": { key: slug },
    "/isla-intelligence": { key: slug },
    "/culturaconnect": { key: slug },
    "/terravision-ai": { key: slug },
    "/titletrust-dr": { key: slug },
    "/scholarship": { key: slug },
  };

  const currentPage = pageInfo[location.pathname] || {
    key: "default",
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <section className="py-8 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>

          <div className="container mx-auto section-padding relative z-10">
            <ScrollAnimation animation="fade-up" className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  {t(`comingSoon.badge`)}
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-medium mb-4 text-foreground text-center">
                {t(`pages.${currentPage.key}.title`)}
              </h1>

              <p className="text-3xl font-medium mb-4 text-primary text-center">
                {t(`comingSoon.problem`)}
              </p>

              <h2 className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6 text-justify">
                {t(`pages.${currentPage.key}.problem`)}
              </h2>

              <p className="text-3xl font-medium mb-4 text-blue-950 text-center">
                {t(`comingSoon.solution`)}
              </p>

              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12 text-justify">
                {t(`pages.${currentPage.key}.solution`)}
              </p>
            </ScrollAnimation>
          </div>

          {/* Notify Form */}
          <ScrollAnimation
            animation="fade-up"
            delay={200}
            className="text-center mt-16"
          >
            <div className="max-w-md mx-auto mb-12 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                {t(`comingSoon.notifyText`)}
              </p>
              <div className="flex gap-3">
                <Input
                  type="email"
                  placeholder={t(`comingSoon.emailPlaceholder`)}
                  className="rounded-full bg-muted/50 border-border"
                />
                <Button className="rounded-full bg-primary hover:bg-primary/90 px-6 gap-2">
                  <Bell className="w-4 h-4" />
                  {t(`comingSoon.notifyButton`)}
                </Button>
              </div>
            </div>
          </ScrollAnimation>

          <ScrollAnimation
            animation="fade-up"
            delay={400}
            className="text-center mt-16"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              {t(`comingSoon.backHome`)}
            </Link>
          </ScrollAnimation>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ComingSoon;

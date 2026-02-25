import { Search, Linkedin, Twitter, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ScrollAnimation } from "@/hooks/useScrollAnimation";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { initiatives } from "@/data/initiatives/list";
import { useTranslation } from "react-i18next";

const Initiative = () => {
  const { t } = useTranslation("initiatives")

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">

        {/* Hero Section */}
        <section aria-labelledby="initiative-hero">
          <div className="container mx-auto relative z-10">
            <ScrollAnimation animation="fade-up" className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card shadow-sm mb-6">
                <Rocket className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  {t(`initiatives.badge`)}
                </span>
              </div>

              <h1 className="font-display font-medium text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
                {t(`initiatives.title`)}
              </h1>

              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t(`initiatives.subtitle`)}
              </p>
            </ScrollAnimation>
          </div>
        </section>

        {/* Initiative Grid */}
        <section aria-labelledby="initiative-grid">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {initiatives.map((initiative, index) => (
                <ScrollAnimation
                  key={initiative.slug}
                  animation="fade-up"
                  delay={index * 100}
                >
                  <Link to={`#`} className="group block">
                    <div className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col ">
                      {/* School/Company Image */}
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={initiative.image}
                          alt={initiative.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6 md:h-[250px] lg:h-[200px]">
                        {/* Title */}
                        <h3 className="text-xl font-medium text-foreground mb-2 group-hover:transition-colors line-clamp-2">
                          {initiative.name}
                        </h3>

                        {/* Description */}
                        <p className="text-muted-foreground text-sm mb-4 text-justify ">
                          {t(`initiatives.${initiative.subtext}`)}
                        </p>
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
              {t(`initiatives.backHome`)}
            </Link>
          </ScrollAnimation>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default Initiative;

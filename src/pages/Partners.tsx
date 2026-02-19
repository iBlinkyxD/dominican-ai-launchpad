import { Users, Search, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ScrollAnimation } from "@/hooks/useScrollAnimation";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { partners } from "@/data/partner/list";
import { useTranslation } from "react-i18next";

const Partner = () => {
  const { t } = useTranslation("partner")
  const [selected, setSelected] = useState("All");
  const [query, setQuery] = useState("");

  const filteredPartners = partners.filter((partner) => {
    const matchesRole = selected === "All" || partner.role === selected;

    const matchesSearch = partner.name
      .toLowerCase()
      .includes(query.toLowerCase());

    return matchesRole && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">

        {/* Hero Section */}
        <section aria-labelledby="partner-hero">
          <div className="container mx-auto section-padding relative z-10">
            <ScrollAnimation animation="fade-up" className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card shadow-sm mb-6">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  {t(`partner.badge`)}
                </span>
              </div>

              <h1 className="font-display font-medium text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
                {t(`partner.title`)}
              </h1>

              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t(`partner.subtitle`)}
              </p>
            </ScrollAnimation>
          </div>
        </section>

        {/* Search/Filter Grid */}
        <section aria-labelledby="partner-serach">
          <ScrollAnimation animation="fade-up" className="text-center mb-16">
            <div className="max-w-6xl mx-auto flex flex-col items-center gap-6">
              
              {/* Search */}
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder={t(`partner.searchPlaceholder`)}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-9"
                />
              </div>

              {/* Filter Buttons */}
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  size="sm"
                  onClick={() => setSelected("All")}
                  className={`rounded-full px-8 ${
                    selected === "All"
                      ? "bg-foreground text-background"
                      : "bg-background text-foreground hover:bg-background/90"
                  }`}
                >
                  {t(`partner.filters.all`)}
                </Button>

                <Button
                  size="sm"
                  onClick={() => setSelected("School")}
                  className={`rounded-full px-8 ${
                    selected === "School"
                      ? "bg-foreground text-background"
                      : "bg-background text-foreground hover:bg-background/90"
                  }`}
                >
                  {t(`partner.filters.school`)}
                </Button>

                <Button
                  size="sm"
                  onClick={() => setSelected("University")}
                  className={`rounded-full px-8 ${
                    selected === "University"
                      ? "bg-foreground text-background"
                      : "bg-background text-foreground hover:bg-background/90"
                  }`}
                >
                  {t(`partner.filters.university`)}
                </Button>

                <Button
                  size="sm"
                  onClick={() => setSelected("Company")}
                  className={`rounded-full px-8 ${
                    selected === "Company"
                      ? "bg-foreground text-background"
                      : "bg-background text-foreground hover:bg-background/90"
                  }`}
                >
                  {t(`partner.filters.company`)}
                </Button>
              </div>
            </div>
          </ScrollAnimation>
        </section>

        {/* Partners Grid */}
        <section aria-labelledby="partner-grid">
          <div className="container mx-auto section-padding">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPartners.map((partner, index) => (
                <ScrollAnimation
                  key={partner.slug}
                  animation="fade-up"
                  delay={index * 100}
                >
                  <Link to={`#`} className="group block">
                    <div className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-[380px]">
                      {/* School/Company Image */}
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={partner.image}
                          alt={partner.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {
                          <span
                            className={`absolute top-4 left-4 px-3 py-1 text-xs font-semibold rounded-full border 
                                   bg-white text-black border-black-500/20"
                                `}
                          >
                            {" "}
                            {t(`partner.roles.${partner.role}`)}
                          </span>
                        }
                      </div>
                      <div className="p-6">
                        {/* Title */}
                        <h3 className="text-xl font-medium text-foreground mb-2 group-hover:transition-colors line-clamp-2">
                          {partner.name}
                        </h3>

                        {/* Description */}
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {partner.location}
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
              {t(`partner.backHome`)}
            </Link>
          </ScrollAnimation>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default Partner;

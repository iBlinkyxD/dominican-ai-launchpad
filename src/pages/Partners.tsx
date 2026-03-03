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
  const { t } = useTranslation("partner");
  const [selected, setSelected] = useState("all");
  const roles = ["all", "school", "university", "company"];
  const [query, setQuery] = useState("");

  const filteredPartners = partners.filter((partner) => {
    const matchesRole = selected === "all" || partner.role === selected;

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
        <section className="pt-8 relative overflow-hidden" aria-labelledby="partner-hero">
          <div className="container mx-auto relative z-10">
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
              <div className="relative w-full max-w-md px-4">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
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
                {roles.map((role) => (
                  <Button
                    key={role}
                    size="sm"
                    onClick={() => setSelected(role)}
                    className={`rounded-full px-8 ${
                      selected === role
                        ? "bg-foreground text-background"
                        : "bg-background text-foreground"
                    }`}
                  >
                    {t(`partner.filters.${role}`)}
                  </Button>
                ))}
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

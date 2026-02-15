import { Users, Search, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ScrollAnimation } from "@/hooks/useScrollAnimation";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import partner1 from "../assets/partner/partner-1.jpeg";
import partner2 from "../assets/partner/partner-2.jpeg";
import partner3 from "../assets/partner/partner-3.jpeg";

const partnerList = [
  {
    id: 1,
    idName: "escuela-primera-jesus-maestro",
    name: "Escuela Primera Jesus Maestro",
    role: "School",
    location: "Santo Domingo, Dominican Republic",
    image: partner1,
  },
  {
    id: 2,
    idName: "apollo-e",
    name: "Apollo-E Inc.",
    role: "Company",
    location: "Miami, Florida",
    image: partner2,
  },
  {
    id: 3,
    idName: "intec",
    name: "Instituto Tecnológico de Santo Domingo",
    role: "University",
    location: "Santo Domingo, Dominican Republic",
    image: partner3,
  },
];

const Partner = () => {
  const [selected, setSelected] = useState("All");
  const [query, setQuery] = useState("");

  const filteredPartners = partnerList.filter((partner) => {
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
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 via-background to-blue-50/50" />

          <div className="container mx-auto section-padding relative z-10">
            <ScrollAnimation animation="fade-up" className="text-center mb-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card shadow-sm mb-6">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  Partners
                </span>
              </div>

              <h1 className="font-display font-medium text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
                Our Partners
              </h1>

              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The light moves faster when we move together.
              </p>
            </ScrollAnimation>

            {/* Search/Filter Grid */}
            <ScrollAnimation animation="fade-up" className="text-center mb-16">
              <div className="max-w-6xl mx-auto flex flex-col items-center gap-6">
                {/* Filter Buttons */}
                {/* Search */}
                <div className="relative w-full max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
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
                    All
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
                    School
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
                    University
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
                    Company
                  </Button>
                </div>
              </div>
            </ScrollAnimation>

            {/* Partners Grid */}
            <section>
              <div className="container mx-auto section-padding">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPartners.map((partner, index) => (
                    <ScrollAnimation
                      key={partner.id}
                      animation="fade-up"
                      delay={index * 100}
                    >
                      <Link
                        to={`#`}
                        className="group block"
                      >
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
                                {partner.role}
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

export default Partner;

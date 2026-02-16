import { Users, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { ScrollAnimation } from "@/hooks/useScrollAnimation";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { teamMembers } from "@/data/team";

const Teams = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        
        {/* Hero Section */}
        <section
          aria-labelledby="team-hero"
          className="py-16 relative overflow-hidden"
        >
          <div className="container mx-auto section-padding relative z-10">
            <ScrollAnimation animation="fade-up" className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card shadow-sm mb-6">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  Our Team
                </span>
              </div>

              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
                Meet Our Amazing Team
              </h1>

              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The passionate individuals behind the Dominican AI Association,
                dedicated to advancing AI education and innovation in the
                Caribbean.
              </p>
            </ScrollAnimation>
          </div>
        </section>

        {/* Team Cards - 3D Perspective Container */}
        <section aria-labelledby="team-members">
          <div
            className="relative max-w-6xl mx-auto"
            style={{ perspective: "1000px" }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-center">
              {teamMembers.map((member, index) => (
                <ScrollAnimation
                  key={member.id}
                  animation="fade-up"
                  delay={index * 100}
                >
                  <div
                    className="group relative bg-card/90 backdrop-blur-xl rounded-3xl overflow-hidden transition-all duration-500 cursor-pointer border border-border/30 hover:scale-105 hover:-translate-y-2"
                    style={{
                      boxShadow:
                        "0 20px 60px -15px hsl(var(--foreground) / 0.08), 0 8px 20px -8px hsl(var(--foreground) / 0.05), inset 0 1px 0 hsl(0 0% 100% / 0.3)",
                      background:
                        "linear-gradient(145deg, hsl(var(--card)) 0%, hsl(var(--card) / 0.85) 100%)",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {/* Glossy overlay */}
                    <div
                      className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-500 group-hover:opacity-80 z-10"
                      style={{
                        background:
                          "linear-gradient(135deg, hsl(0 0% 100% / 0.5) 0%, transparent 40%, transparent 60%, hsl(0 0% 100% / 0.1) 100%)",
                        opacity: 0.6,
                      }}
                    />

                    {/* Secondary shine on hover */}
                    <div
                      className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
                      style={{
                        background:
                          "radial-gradient(ellipse at 30% 0%, hsl(0 0% 100% / 0.3) 0%, transparent 50%)",
                      }}
                    />

                    {/* Image */}
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Image overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />

                      {/* Social Icons */}
                      <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-8 h-8 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-md transition-transform hover:scale-110">
                          <Linkedin className="w-4 h-4 text-foreground" />
                        </div>
                        <div className="w-8 h-8 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-md transition-transform hover:scale-110">
                          <Twitter className="w-4 h-4 text-foreground" />
                        </div>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="relative p-6 text-center">
                      <h3 className="font-display text-lg font-medium text-foreground mb-1">
                        {member.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {member.role}
                      </p>
                    </div>
                  </div>
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
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Teams;

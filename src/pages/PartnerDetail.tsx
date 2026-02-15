import { useParams, Link } from "react-router-dom";
import { School, GraduationCap, Building2, ChevronRight } from "lucide-react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { ScrollAnimation } from "@/hooks/useScrollAnimation";

import partner2 from "../assets/partner/partner-2.jpeg";

const partnersData = {
  "escuela-primera-jesus-maestro": {
    id: "escuela-primera-jesus-maestro",
    title: "Escuela Primera Jesus Maestro",
    location: "Santo Domingo, Dominican Republic",
    role: "School",
    thumbnail: "https://www.youtube.com/embed/hU8EFj252ac?autoplay=1&mute=1",
    icon: School,
  },
  "apollo-e": {
    id: "apollo-e",
    title: "Apollo-E Inc.",
    location: "Maimi, Florida",
    role: "Company",
    thumbnail: partner2,
    icon: Building2,
  },
  "intec": {
    id: "intec",
    title: "Instituto Tecnológico de Santo Domingo",
    location: "Santo Domingo, Dominican Republic",
    role: "University",
    thumbnail: "https://www.youtube.com/embed/hU8EFj252ac?autoplay=1&mute=1",
    icon: GraduationCap,
  },
};

const PartnerDetail = () => {
  const { partnerId } = useParams();
  const partner = partnersData[partnerId as keyof typeof partnersData];

  if (!partnerId) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-20 text-center">
          <h1 className="text-2xl font-medium text-foreground">
            Partner not found
          </h1>
          <Link
            to="/partners"
            className="text-primary hover:underline mt-4 inline-block"
          >
            Back to partner
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const featuredCourses = Object.values(partnersData).filter(
    (p) => p.id !== partner.id,
  );

  const Icon = partner.icon;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <div className="pt-24 pb-4 bg-muted/30">
        <div className="container mx-auto section-padding">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link
              to="/partners"
              className="hover:text-primary transition-colors"
            >
              Partners
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-medium truncate">
              {partner.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}

      <section className="py-8 bg-muted/30">
        <div className="container mx-auto section-padding">
          <ScrollAnimation animation="fade-up">
            <div className="flex flex-col items-center text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card shadow-sm mb-6">
                <Icon className="w-4 h-4 text-primary" />

                <span className="text-sm font-medium text-foreground">
                  {partner.role}
                </span>
              </div>

              <h1 className="text-5xl font-medium text-foreground mb-4">
                {partner.title}
              </h1>

              <p className="text-muted-foreground mb-6">{partner.location}</p>

              <div className="w-full max-w-6xl aspect-video rounded-2xl overflow-hidden bg-black shadow-xl">
                <iframe
                  className="w-full h-full"
                  src={partner.thumbnail}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PartnerDetail;

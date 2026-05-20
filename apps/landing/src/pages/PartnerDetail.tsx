import { useParams, Link } from "react-router-dom";
import { School, GraduationCap, Building2, ChevronRight } from "lucide-react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { ScrollAnimation } from "@/hooks/useScrollAnimation";

import { partnerDetail } from "@/data/partner/detail";

const PartnerDetail = () => {
  const { partnerSlug } = useParams();
  const partner = partnerDetail.find((p) => p.slug === partnerSlug);

  if (!partner) {
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
            Back to partners
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const Icon = partner.icon;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">

        {/* Breadcrumb */}
        <section aria-labelledby="partner-Breadcrumb">
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
                  {partner.name}
                </span>
              </nav>
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section aria-labelledby="partner-hero" className="py-8 bg-muted/30">
          <div className="container mx-auto section-padding">
            <ScrollAnimation animation="fade-up">
              <div className="flex flex-col items-center text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card shadow-sm mb-6">
                  <Icon className="w-4 h-4 text-primary" />

                  <span className="text-sm font-medium text-foreground">
                    {partner.roleKey}
                  </span>
                </div>

                <h1 className="text-5xl font-medium text-foreground mb-4">
                  {partner.name}
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
      </main>

      <Footer />
    </div>
  );
};

export default PartnerDetail;

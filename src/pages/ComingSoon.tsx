import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, Sparkles, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

const ComingSoon = () => {
  const location = useLocation();
  
  const pageInfo: Record<string, { title: string; subtitle: string; description: string }> = {
    "/tourism": {
      title: "DAIA Tourism",
      subtitle: "AI-Powered Travel Experiences",
      description: "Discover the Dominican Republic like never before with AI-enhanced tourism solutions. Smart recommendations, seamless planning, and unforgettable experiences.",
    },
    "/real-estate": {
      title: "DAIA Real Estate",
      subtitle: "Smart Property Solutions",
      description: "Find your perfect property with AI-powered real estate services. Intelligent matching, virtual tours, and data-driven insights for buyers and sellers.",
    },
  };

  const currentPage = pageInfo[location.pathname] || pageInfo["/tourism"];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-32 pb-20 px-4 min-h-[80vh] flex items-center relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="container mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Coming Soon</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-foreground">
            {currentPage.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-primary font-medium mb-6">
            {currentPage.subtitle}
          </p>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            {currentPage.description}
          </p>

          {/* Notify Form */}
          <div className="max-w-md mx-auto mb-12">
            <p className="text-sm text-muted-foreground mb-4">
              Be the first to know when we launch
            </p>
            <div className="flex gap-3">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="rounded-full bg-muted/50 border-border"
              />
              <Button className="rounded-full bg-primary hover:bg-primary/90 px-6 gap-2">
                <Bell className="w-4 h-4" />
                Notify Me
              </Button>
            </div>
          </div>

          <Link to="/">
            <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ComingSoon;

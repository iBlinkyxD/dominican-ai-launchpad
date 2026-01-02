import { ArrowRight, Sparkles, Users, BookOpen, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Wave Background */}
      <div className="absolute inset-0 z-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue via-brand-red/80 to-brand-blue animate-gradient" />
        
        {/* Wave layers */}
        <div className="absolute inset-0 opacity-30">
          <svg
            className="absolute bottom-0 left-0 w-[200%] h-full animate-wave"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path
              fill="hsl(0 72% 45% / 0.3)"
              d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
          <svg
            className="absolute bottom-0 left-0 w-[200%] h-full animate-wave"
            style={{ animationDelay: "-5s", animationDuration: "25s" }}
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path
              fill="hsl(215 70% 25% / 0.3)"
              d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,90.7C672,85,768,107,864,144C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
        </div>

        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-red/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "-2s" }} />
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-brand-red-light/15 rounded-full blur-2xl animate-float" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto section-padding pt-24 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span className="text-sm font-medium text-white/90">
              Trusted by 5,000+ Happy Learners
            </span>
          </div>

          {/* Headline */}
          <h1 
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            Empowering the
            <span className="block mt-2 bg-gradient-to-r from-white via-red-200 to-white bg-clip-text text-transparent">
              Dominican Republic
            </span>
            with AI Innovation
          </h1>

          {/* Subheadline */}
          <p 
            className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            Join the leading community fostering artificial intelligence education, 
            research, and innovation across the Caribbean.
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Button 
              size="lg"
              className="btn-glossy text-primary-foreground rounded-full px-8 py-6 text-lg font-semibold group"
            >
              View All Courses
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="rounded-full px-8 py-6 text-lg font-semibold bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm"
            >
              Start Learning Now
            </Button>
          </div>

          {/* Floating Feature Cards */}
          <div 
            className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto animate-fade-in"
            style={{ animationDelay: "0.5s" }}
          >
            {[
              { icon: BookOpen, label: "Expert-Led Courses", value: "50+" },
              { icon: Users, label: "Active Community", value: "5K+" },
              { icon: Award, label: "Certifications", value: "100%" },
            ].map((item, index) => (
              <div
                key={item.label}
                className="group p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-300 animate-float"
                style={{ animationDelay: `${index * 0.5}s` }}
              >
                <item.icon className="w-8 h-8 text-white/80 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{item.value}</div>
                <div className="text-sm text-white/70">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default Hero;

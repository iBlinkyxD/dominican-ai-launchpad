import { Sparkles, Video, GraduationCap, BadgeCheck, LayoutGrid, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-background">
      {/* Gradient Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-pink-200/60 via-pink-100/30 to-background" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-pink-300/30 rounded-full blur-3xl" />
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-purple-200/20 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center container mx-auto section-padding pt-32 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Trust Badge */}
          <div 
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background text-sm font-medium mb-10 animate-fade-in"
          >
            <Sparkles className="w-4 h-4" />
            <span>Trusted by 20,000+ Happy Learners</span>
          </div>

          {/* Headline */}
          <h1 
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 leading-[1.1] tracking-tight animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            Laying the digital foundation for a smarter, stronger Dominican Republic.
          </h1>

          {/* Subheadline */}
          <p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            Our mission is to foster responsible innovation, education, and collaboration in 
            the field of artificial intelligence across the Dominican Republic.
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Button 
              size="lg"
              variant="outline"
              className="rounded-full px-8 py-6 text-base font-semibold border-foreground/20 bg-card hover:bg-muted"
            >
              View All Courses
            </Button>
            <Button 
              size="lg"
              className="rounded-full px-8 py-6 text-base font-semibold bg-foreground text-background hover:bg-foreground/90"
            >
              Start Learning Now
            </Button>
          </div>
        </div>

        {/* Floating Cards Illustration */}
        <div 
          className="relative mt-16 w-full max-w-3xl mx-auto h-[280px] md:h-[320px] animate-fade-in"
          style={{ animationDelay: "0.5s" }}
        >
          {/* Main container card */}
          <div className="absolute inset-x-0 bottom-0 h-[200px] md:h-[240px] bg-gradient-to-b from-pink-100/50 to-pink-50/30 rounded-3xl backdrop-blur-sm border border-pink-200/30" />

          {/* Left card - App icons */}
          <div 
            className="absolute left-[10%] md:left-[15%] bottom-[60px] md:bottom-[80px] w-[120px] md:w-[160px] h-[140px] md:h-[180px] bg-card rounded-2xl shadow-xl border border-border/50 p-4 transform -rotate-3 hover:rotate-0 transition-transform duration-500 animate-float"
          >
            <div className="grid grid-cols-2 gap-2">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center">
                <LayoutGrid className="w-5 h-5 md:w-7 md:h-7 text-white" />
              </div>
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center">
                <Video className="w-5 h-5 md:w-7 md:h-7 text-white" />
              </div>
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl bg-green-500 flex items-center justify-center">
                <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-white" />
              </div>
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center">
                <Crown className="w-5 h-5 md:w-7 md:h-7 text-white" />
              </div>
            </div>
          </div>

          {/* Right card - Graduate */}
          <div 
            className="absolute right-[10%] md:right-[15%] bottom-[60px] md:bottom-[80px] w-[120px] md:w-[160px] h-[140px] md:h-[180px] bg-card rounded-2xl shadow-xl border border-border/50 p-6 transform rotate-3 hover:rotate-0 transition-transform duration-500 animate-float"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="flex flex-col items-center justify-center h-full">
              <GraduationCap className="w-12 h-12 md:w-16 md:h-16 text-foreground mb-2" />
              <div className="w-full space-y-2 mt-2">
                <div className="h-2 bg-muted rounded-full w-full" />
                <div className="h-2 bg-muted rounded-full w-3/4 mx-auto" />
              </div>
            </div>
          </div>

          {/* Badge check floating */}
          <div 
            className="absolute right-[25%] md:right-[30%] top-0 w-14 h-14 md:w-16 md:h-16 bg-card rounded-2xl shadow-lg border border-border/50 flex items-center justify-center animate-float"
            style={{ animationDelay: "0.6s" }}
          >
            <BadgeCheck className="w-8 h-8 md:w-10 md:h-10 text-foreground" />
          </div>

          {/* Small floating elements */}
          <div className="absolute left-[5%] top-[30%] w-3 h-3 bg-pink-400/60 rounded-full animate-pulse-slow" />
          <div className="absolute right-[8%] top-[40%] w-2 h-2 bg-purple-400/60 rounded-full animate-pulse-slow" style={{ animationDelay: "1s" }} />
          <div className="absolute left-[30%] top-[10%] w-4 h-4 bg-pink-300/40 rounded-full animate-pulse-slow" style={{ animationDelay: "0.5s" }} />
        </div>
      </div>
    </section>
  );
};

export default Hero;

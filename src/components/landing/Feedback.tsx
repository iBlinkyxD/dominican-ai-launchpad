import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "María García",
    role: "Data Scientist at TechDom",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    content: "The Dominican AI Association transformed my career. The courses are world-class, and the community support is incredible. I went from beginner to landing my dream job in just 8 months.",
    rating: 5,
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    role: "ML Engineer at StartupRD",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    content: "The hands-on projects and real-world applications taught here are unmatched. I've built AI solutions that are now used by thousands of people across the Caribbean.",
    rating: 5,
  },
  {
    id: 3,
    name: "Ana Martínez",
    role: "AI Researcher",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    content: "Being part of this community has opened doors I never thought possible. The mentorship program connected me with industry leaders who helped shape my research career.",
    rating: 5,
  },
  {
    id: 4,
    name: "José Hernández",
    role: "Startup Founder",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    content: "The entrepreneurship track gave me the skills and network to launch my AI startup. We've raised our seed round and are growing rapidly thanks to the foundation I built here.",
    rating: 5,
  },
];

const Feedback = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section id="feedback" className="min-h-screen flex items-center py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto section-padding relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
            Testimonials
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            What Our Students
            <span className="block gradient-text">Say About Us</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hear from our community members who have transformed their careers through our programs.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main Testimonial Card */}
          <div className="relative">
            <div className="glass-card-strong rounded-3xl p-8 md:p-12">
              <Quote className="w-12 h-12 text-primary/30 mb-6" />
              
              <div className="min-h-[180px] flex items-center">
                <p className="text-xl md:text-2xl text-foreground leading-relaxed font-medium">
                  "{testimonials[currentIndex].content}"
                </p>
              </div>

              <div className="flex items-center justify-between mt-8 pt-8 border-t border-border">
                <div className="flex items-center gap-4">
                  <img
                    src={testimonials[currentIndex].avatar}
                    alt={testimonials[currentIndex].name}
                    className="w-16 h-16 rounded-full object-cover ring-4 ring-primary/20"
                  />
                  <div>
                    <h4 className="font-display font-semibold text-lg text-foreground">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-muted-foreground">
                      {testimonials[currentIndex].role}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={goToPrevious}
                className="rounded-full w-12 h-12 border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              {/* Dots */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setCurrentIndex(index);
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "w-8 bg-primary"
                        : "bg-border hover:bg-muted-foreground"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={goToNext}
                className="rounded-full w-12 h-12 border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feedback;

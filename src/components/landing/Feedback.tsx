import { Star, Heart, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollAnimation } from "@/hooks/useScrollAnimation";

const testimonials = [
  {
    id: 1,
    name: "María García",
    role: "Data Scientist",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    content:
      "The courses are top-notch, providing in-depth knowledge that's easy to apply. Each lesson is structured to ensure you fully grasp the material.",
    rating: 5,
    rotation: "md:rotate-[-4deg] md:translate-y-4",
    hoverRotation: "hover:md:rotate-[-2deg] hover:-translate-y-2",
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    role: "ML Engineer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    content:
      "The courses are excellent, delivering practical insights with ease. Each module is designed to help you fully understand and apply the knowledge.",
    rating: 5,
    rotation: "md:scale-105 z-10",
    hoverRotation: "hover:md:scale-110 hover:-translate-y-3",
  },
  {
    id: 3,
    name: "Ana Martínez",
    role: "AI Researcher",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    content:
      "These courses are exceptional, offering detailed content that's easy to implement. Every lesson is carefully crafted to deepen your understanding.",
    rating: 5,
    rotation: "md:rotate-[4deg] md:translate-y-4",
    hoverRotation: "hover:md:rotate-[2deg] hover:-translate-y-2",
  },
];

const Feedback = () => {
  return (
    <section id="feedback" className="min-h-screen flex items-center py-24 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 via-background to-blue-50/50" />

      <div className="container mx-auto section-padding relative z-10">
        {/* Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-16">
          {/* Left side - Title and CTA */}
          <ScrollAnimation animation="fade-right" className="max-w-xl mb-10 lg:mb-0">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card shadow-sm mb-6">
              <Heart className="w-4 h-4 text-primary fill-primary" />
              <span className="text-sm font-medium text-foreground">Testimonials</span>
            </div>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
              Our Students feedback
            </h2>

            <p className="text-lg text-muted-foreground mb-8">
              Explore the incredible advantages of enrolling in our courses and enhancing your skills.
            </p>

            <Button className="btn-glossy text-primary-foreground rounded-full px-8 py-6 text-base font-semibold">
              Start Learning Now
            </Button>
          </ScrollAnimation>

          {/* Right side - Decorative elements */}
          <ScrollAnimation
            animation="fade-left"
            delay={200}
            className="hidden lg:flex items-center gap-4 text-muted-foreground/40 text-2xl mt-8"
          >
            <span>✦</span>
            <span>✳</span>
            <span className="text-3xl">+</span>
          </ScrollAnimation>
        </div>

        {/* Testimonial Cards - 3D Perspective Container */}
        <div className="relative max-w-5xl mx-auto" style={{ perspective: "1000px" }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-center">
            {testimonials.map((testimonial, index) => (
              <ScrollAnimation key={testimonial.id} animation="fade-up" delay={index * 150}>
                <div 
                  className={`group relative bg-card/90 backdrop-blur-xl rounded-3xl p-8 transition-all duration-500 h-full overflow-hidden border border-border/30 cursor-pointer ${testimonial.rotation} ${testimonial.hoverRotation}`}
                  style={{
                    boxShadow: "0 20px 60px -15px hsl(var(--foreground) / 0.08), 0 8px 20px -8px hsl(var(--foreground) / 0.05), inset 0 1px 0 hsl(0 0% 100% / 0.3)",
                    background: "linear-gradient(145deg, hsl(var(--card)) 0%, hsl(var(--card) / 0.85) 100%)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Glossy overlay */}
                  <div
                    className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-500 group-hover:opacity-80"
                    style={{
                      background: "linear-gradient(135deg, hsl(0 0% 100% / 0.5) 0%, transparent 40%, transparent 60%, hsl(0 0% 100% / 0.1) 100%)",
                      opacity: 0.6,
                    }}
                  />
                  
                  {/* Secondary shine on hover */}
                  <div
                    className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: "radial-gradient(ellipse at 30% 0%, hsl(0 0% 100% / 0.3) 0%, transparent 50%)",
                    }}
                  />

                  {/* Top row - Stars and LinkedIn */}
                  <div className="relative flex items-center justify-between mb-6">
                    <div className="flex items-center gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 transition-transform duration-300 group-hover:scale-110" />
                      ))}
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-[#0A66C2] flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110">
                      <Linkedin className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* Quote */}
                  <p className="relative text-foreground/80 italic text-base leading-relaxed mb-8">"{testimonial.content}"</p>

                  {/* Author */}
                  <div className="relative flex items-center gap-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-white/50 shadow-md transition-transform duration-300 group-hover:scale-105"
                    />
                    <div>
                      <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feedback;

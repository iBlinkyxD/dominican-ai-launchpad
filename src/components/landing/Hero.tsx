import { useState, useEffect, useRef } from "react";
import { Sparkles, Video, GraduationCap, BadgeCheck, LayoutGrid, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Parallax transform values based on scroll
  const parallax = (speed: number) => ({
    transform: `translateY(${scrollY * speed}px)`,
  });

  // Interactive mouse movement
  const mouseParallax = (intensity: number) => ({
    transform: `translate(${mousePosition.x * intensity}px, ${mousePosition.y * intensity}px)`,
  });

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex flex-col overflow-hidden" 
      style={{ background: "radial-gradient(circle at 50% 50%, #1A4F8B, transparent 70%)" }}
    >
      {/* Aurora Animated Gradient Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-pink-200/60 via-pink-100/30 to-background" />
        
        {/* Aurora layers */}
        <div 
          className="absolute inset-0 opacity-60"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 20% 40%, rgba(236, 72, 153, 0.3) 0%, transparent 50%),
              radial-gradient(ellipse 60% 40% at 80% 60%, rgba(168, 85, 247, 0.25) 0%, transparent 50%),
              radial-gradient(ellipse 70% 50% at 50% 30%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)
            `,
            animation: 'aurora1 8s ease-in-out infinite alternate',
          }}
        />
        
        <div 
          className="absolute inset-0 opacity-50"
          style={{
            background: `
              radial-gradient(ellipse 60% 60% at 70% 20%, rgba(236, 72, 153, 0.35) 0%, transparent 50%),
              radial-gradient(ellipse 50% 40% at 30% 70%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
              radial-gradient(ellipse 80% 50% at 60% 50%, rgba(34, 211, 238, 0.15) 0%, transparent 50%)
            `,
            animation: 'aurora2 10s ease-in-out infinite alternate-reverse',
          }}
        />
        
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            background: `
              radial-gradient(ellipse 50% 80% at 40% 50%, rgba(251, 146, 60, 0.2) 0%, transparent 50%),
              radial-gradient(ellipse 70% 40% at 80% 30%, rgba(192, 132, 252, 0.25) 0%, transparent 50%),
              radial-gradient(ellipse 60% 50% at 20% 80%, rgba(96, 165, 250, 0.2) 0%, transparent 50%)
            `,
            animation: 'aurora3 12s ease-in-out infinite alternate',
          }}
        />

        {/* Interactive mouse-following aurora glow */}
        <div
          className="absolute w-[800px] h-[800px] rounded-full blur-3xl opacity-30 transition-all duration-1000 ease-out pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, rgba(168, 85, 247, 0.2) 40%, transparent 70%)',
            left: `calc(50% + ${mousePosition.x * 200}px - 400px)`,
            top: `calc(50% + ${mousePosition.y * 200}px - 400px)`,
          }}
        />

        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full transition-transform duration-500 ease-out"
            style={{
              width: `${4 + (i % 4) * 3}px`,
              height: `${4 + (i % 4) * 3}px`,
              left: `${10 + (i * 7)}%`,
              top: `${15 + (i * 5) % 60}%`,
              background: `hsl(${320 + i * 15}, 70%, ${70 + (i % 3) * 10}%)`,
              opacity: 0.4 + (i % 3) * 0.15,
              transform: `translate(${mousePosition.x * (20 + i * 5)}px, ${mousePosition.y * (15 + i * 4)}px)`,
              animation: `float ${3 + i * 0.5}s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}

        {/* Subtle shimmer overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            animation: 'shimmer 20s linear infinite',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center container mx-auto section-padding pt-32 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/30 backdrop-blur-md border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.15)] text-foreground text-sm font-medium mb-10 animate-fade-in hover:bg-white/20 transition-all duration-300">
            <Sparkles className="w-4 h-4 text-yellow-300 fill-yellow-300/20" />
            <span className="drop-shadow-sm">Trusted by 20,000+ Happy Learners</span>
          </div>

          {/* Headline */}
          <h1
            className="font-display text-4xl sm:text-4xl md:text-5xl lg:text-6xl  text-foreground mb-8 leading-[1.1] tracking-tight animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            Laying the digital foundation for a smarter, stronger Dominican Republic.
          </h1>

          {/* Subheadline */}
          <p
            className="text-lg md:text-xl text-foreground max-w-3xl mx-auto mb-10 animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            Our mission is to foster responsible innovation, education, and collaboration in the field of artificial
            intelligence across the Dominican Republic.
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

        {/* Floating Cards Illustration with Parallax */}
        <div
          className="relative mt-16 w-full max-w-3xl mx-auto h-[280px] md:h-[320px] animate-fade-in"
          style={{ animationDelay: "0.5s" }}
        >
          {/* Main container card */}
          <div
            className="absolute inset-x-0 bottom-0 h-[200px] md:h-[240px] bg-white/30 backdrop-blur-xl border border-white/20 rounded-3xl transition-transform duration-500 ease-out"
            style={{
              transform: `translateY(${scrollY * 0.08}px) rotateX(${mousePosition.y * 2}deg) rotateY(${mousePosition.x * 2}deg)`,
            }}
          />

          {/* Left card - App icons */}
          <div
            className="absolute left-[10%] md:left-[15%] bottom-[60px] md:bottom-[80px] w-[120px] md:w-[160px] h-[140px] md:h-[180px] bg-white/30 backdrop-blur-xl border border-white/20 rounded-2xl p-4 hover:rotate-0 transition-all duration-500 ease-out"
            style={{
              transform: `translateY(${scrollY * -0.15}px) translate(${mousePosition.x * -15}px, ${mousePosition.y * -10}px) rotate(-3deg)`,
            }}
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
            className="absolute right-[10%] md:right-[15%] bottom-[60px] md:bottom-[80px] w-[120px] md:w-[160px] h-[140px] md:h-[180px] bg-white/30 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:rotate-0 transition-all duration-500 ease-out"
            style={{
              transform: `translateY(${scrollY * -0.12}px) translate(${mousePosition.x * 15}px, ${mousePosition.y * -10}px) rotate(3deg)`,
            }}
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
            className="absolute right-[25%] md:right-[30%] top-0 w-14 h-14 md:w-16 md:h-16 bg-card rounded-2xl shadow-lg border border-border/50 flex items-center justify-center transition-all duration-500 ease-out"
            style={{
              transform: `translateY(${scrollY * -0.2}px) translate(${mousePosition.x * 25}px, ${mousePosition.y * 20}px)`,
            }}
          >
            <BadgeCheck className="w-8 h-8 md:w-10 md:h-10 text-foreground" />
          </div>

          {/* Small floating elements with parallax + mouse */}
          <div
            className="absolute left-[5%] top-[30%] w-3 h-3 bg-pink-400/60 rounded-full transition-all duration-300 ease-out"
            style={{
              transform: `translateY(${scrollY * -0.25}px) translate(${mousePosition.x * 30}px, ${mousePosition.y * 25}px)`,
            }}
          />
          <div
            className="absolute right-[8%] top-[40%] w-2 h-2 bg-purple-400/60 rounded-full transition-all duration-300 ease-out"
            style={{
              transform: `translateY(${scrollY * -0.18}px) translate(${mousePosition.x * -20}px, ${mousePosition.y * 30}px)`,
            }}
          />
          <div
            className="absolute left-[30%] top-[10%] w-4 h-4 bg-pink-300/40 rounded-full transition-all duration-300 ease-out"
            style={{
              transform: `translateY(${scrollY * -0.22}px) translate(${mousePosition.x * 35}px, ${mousePosition.y * -20}px)`,
            }}
          />
          <div
            className="absolute right-[20%] bottom-[50%] w-2 h-2 bg-indigo-300/50 rounded-full transition-all duration-300 ease-out"
            style={{
              transform: `translateY(${scrollY * -0.15}px) translate(${mousePosition.x * -25}px, ${mousePosition.y * 35}px)`,
            }}
          />
          <div
            className="absolute left-[20%] bottom-[40%] w-3 h-3 bg-orange-300/40 rounded-full transition-all duration-300 ease-out"
            style={{
              transform: `translateY(${scrollY * -0.28}px) translate(${mousePosition.x * 40}px, ${mousePosition.y * -30}px)`,
            }}
          />
        </div>
      </div>

      {/* CSS for aurora and float animations */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-20px); }
        }
        @keyframes aurora1 {
          0% { 
            transform: translateX(-5%) translateY(-5%) scale(1); 
            filter: hue-rotate(0deg);
          }
          50% { 
            transform: translateX(5%) translateY(5%) scale(1.1); 
            filter: hue-rotate(15deg);
          }
          100% { 
            transform: translateX(-3%) translateY(3%) scale(1.05); 
            filter: hue-rotate(-10deg);
          }
        }
        @keyframes aurora2 {
          0% { 
            transform: translateX(5%) translateY(5%) scale(1.1) rotate(5deg); 
            filter: hue-rotate(10deg);
          }
          50% { 
            transform: translateX(-5%) translateY(-3%) scale(1) rotate(-5deg); 
            filter: hue-rotate(-15deg);
          }
          100% { 
            transform: translateX(3%) translateY(-5%) scale(1.15) rotate(3deg); 
            filter: hue-rotate(5deg);
          }
        }
        @keyframes aurora3 {
          0% { 
            transform: translateX(-3%) translateY(3%) scale(1.05) rotate(-3deg); 
            filter: hue-rotate(-5deg);
          }
          50% { 
            transform: translateX(3%) translateY(-3%) scale(0.95) rotate(3deg); 
            filter: hue-rotate(20deg);
          }
          100% { 
            transform: translateX(5%) translateY(5%) scale(1.1) rotate(-5deg); 
            filter: hue-rotate(-15deg);
          }
        }
        @keyframes shimmer {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(50px) translateY(50px); }
        }
      `}</style>
    </section>
  );
};

export default Hero;

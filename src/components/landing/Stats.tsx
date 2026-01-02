import { useEffect, useState, useRef } from "react";
import { Clock, BookOpen, Users, Rocket, Cloud, Camera, Cpu, Zap } from "lucide-react";

interface StatCardProps {
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  value: number;
  suffix: string;
  label: string;
  delay: number;
}

const StatCard = ({ icon: Icon, iconBg, iconColor, value, suffix, label, delay }: StatCardProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const stepValue = value / steps;
    let current = 0;

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        current += stepValue;
        if (current >= value) {
          setCount(value);
          clearInterval(interval);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [isVisible, value, delay]);

  return (
    <div
      ref={ref}
      className="relative bg-card rounded-3xl p-8 md:p-10 shadow-[0_4px_40px_-12px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_50px_-12px_rgba(0,0,0,0.15)] transition-all duration-500 flex flex-col items-center text-center"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: `all 0.6s ease-out ${delay}ms`,
      }}
    >
      {/* Icon */}
      <div 
        className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-8 ${iconBg}`}
        style={{ boxShadow: "0 8px 24px -8px rgba(0,0,0,0.15)" }}
      >
        <Icon className={`w-10 h-10 ${iconColor}`} />
      </div>
      
      {/* Number */}
      <div className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-3 tracking-tight">
        {count.toLocaleString()}
        <span className="text-primary">{suffix}</span>
      </div>
      
      {/* Label */}
      <p className="text-sm md:text-base text-muted-foreground font-semibold uppercase tracking-widest">
        {label}
      </p>
    </div>
  );
};

const Stats = () => {
  const stats = [
    { 
      icon: Clock, 
      iconBg: "bg-gradient-to-br from-red-100 to-red-50", 
      iconColor: "text-primary",
      value: 200, 
      suffix: "+", 
      label: "Hours of Content", 
      delay: 0 
    },
    { 
      icon: BookOpen, 
      iconBg: "bg-gradient-to-br from-blue-100 to-blue-50", 
      iconColor: "text-accent",
      value: 50, 
      suffix: "+", 
      label: "Courses", 
      delay: 100 
    },
    { 
      icon: Users, 
      iconBg: "bg-gradient-to-br from-purple-100 to-purple-50", 
      iconColor: "text-purple-500",
      value: 5, 
      suffix: "k+", 
      label: "Students", 
      delay: 200 
    },
  ];

  const partners = [
    { icon: Rocket, name: "TechDom" },
    { icon: Cpu, name: "AILabs" },
    { icon: Camera, name: "MediaRD" },
    { icon: Cloud, name: "CloudCaribe" },
    { icon: Zap, name: "InnovateDR" },
  ];

  return (
    <section id="stats" className="min-h-screen flex items-center py-24 bg-background relative overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute top-20 left-20 text-muted-foreground/10 text-6xl">✦</div>
      <div className="absolute top-32 right-32 text-muted-foreground/10 text-4xl">✦</div>
      
      <div className="container mx-auto section-padding">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card shadow-sm mb-6">
            <span className="text-lg">🎓</span>
            <span className="text-sm font-medium text-foreground">We Offer</span>
          </div>
          
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Boost Your Skills
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From critical skills to technical topics, we support your professional development
            with courses that help you grow and succeed.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto mb-20">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        {/* Partners Section */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-border" />
            <p className="text-sm text-muted-foreground whitespace-nowrap">
              Adopted by renowned enterprises such as
            </p>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {partners.map((partner) => (
              <div 
                key={partner.name}
                className="flex items-center gap-2 text-muted-foreground/70 hover:text-foreground transition-colors"
              >
                <partner.icon className="w-6 h-6" />
                <span className="font-display font-semibold text-lg">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;

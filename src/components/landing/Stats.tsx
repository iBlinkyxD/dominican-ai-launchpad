import { useEffect, useState, useRef } from "react";
import { BookOpen, Users, Clock, Handshake } from "lucide-react";

interface StatItemProps {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  delay: number;
}

const StatItem = ({ icon: Icon, value, suffix, label, delay }: StatItemProps) => {
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
      className="group relative p-8 rounded-3xl glass-card hover:shadow-xl transition-all duration-500"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: `all 0.6s ease-out ${delay}ms`,
      }}
    >
      {/* Gradient border effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-8 h-8 text-primary-foreground" />
        </div>
        
        <div className="font-display text-5xl lg:text-6xl font-bold text-foreground mb-2">
          {count.toLocaleString()}
          <span className="text-primary">{suffix}</span>
        </div>
        
        <p className="text-lg text-muted-foreground font-medium">{label}</p>
      </div>
    </div>
  );
};

const Stats = () => {
  const stats = [
    { icon: BookOpen, value: 50, suffix: "+", label: "Courses Available", delay: 0 },
    { icon: Users, value: 5000, suffix: "+", label: "Students Enrolled", delay: 100 },
    { icon: Clock, value: 200, suffix: "+", label: "Hours of Content", delay: 200 },
    { icon: Handshake, value: 25, suffix: "+", label: "Industry Partnerships", delay: 300 },
  ];

  return (
    <section id="stats" className="min-h-screen flex items-center py-24 bg-muted/30">
      <div className="container mx-auto section-padding">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Our Impact
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Driving AI Excellence in the
            <span className="block gradient-text">Dominican Republic</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We're building the largest AI learning community in the Caribbean, 
            one student at a time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <StatItem key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;

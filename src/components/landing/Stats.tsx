import { useEffect, useState, useRef } from "react";
import { Calendar, Mail, Users, FileUser, MapPin } from "lucide-react";
import { ScrollAnimation } from "@/hooks/useScrollAnimation";

import google from "@/assets/carosuel/google.png";
import nvidia from "@/assets/carosuel/nvidia.png";
import openai from "@/assets/carosuel/openai.png";
import anthropic from "@/assets/carosuel/anthropic.png";
import aws from "@/assets/carosuel/aws.png";
import apple from "@/assets/carosuel/apple.png";
import stripe from "@/assets/carosuel/stripe.png";

interface StatCardProps {
  icon: React.ElementType;
  iconGradient: string;
  iconColor: string;
  value: number;
  suffix: string;
  label: string;
  delay: number;
  rotation: string;
}

const StatCard = ({
  icon: Icon,
  iconGradient,
  iconColor,
  value,
  suffix,
  label,
  delay,
  rotation,
}: StatCardProps) => {
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
      { threshold: 0.3 },
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
    <ScrollAnimation animation="fade-up" delay={delay}>
      <div
        ref={ref}
        className={`group relative bg-card/90 backdrop-blur-xl rounded-3xl p-8 md:p-10 flex flex-col items-center text-center transition-all duration-500 cursor-pointer ${rotation}`}
        style={{
          boxShadow:
            "0 20px 60px -15px hsl(var(--foreground) / 0.08), 0 8px 20px -8px hsl(var(--foreground) / 0.05), inset 0 1px 0 hsl(0 0% 100% / 0.3)",
          background:
            "linear-gradient(145deg, hsl(var(--card)) 0%, hsl(var(--card) / 0.85) 100%)",
          border: "1px solid hsl(var(--border) / 0.3)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Glossy overlay - enhanced on hover */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-500 group-hover:opacity-80"
          style={{
            background:
              "linear-gradient(135deg, hsl(0 0% 100% / 0.5) 0%, transparent 40%, transparent 60%, hsl(0 0% 100% / 0.1) 100%)",
            opacity: 0.6,
          }}
        />

        {/* Secondary shine effect on hover */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(ellipse at 30% 0%, hsl(0 0% 100% / 0.3) 0%, transparent 50%)",
          }}
        />

        {/* Icon */}
        <div
          className={`relative w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1 ${iconGradient}`}
          style={{ boxShadow: "0 8px 20px -6px hsl(var(--foreground) / 0.15)" }}
        >
          <Icon
            className={`w-8 h-8 ${iconColor} transition-transform duration-500 group-hover:scale-110`}
            strokeWidth={1.5}
          />
        </div>

        {/* Number */}
        <div className="font-display text-4xl md:text-5xl font-medium text-foreground mb-2 tracking-tight transition-transform duration-500 group-hover:scale-105">
          {count.toLocaleString()}
          <span className="text-primary">{suffix}</span>
        </div>

        {/* Label */}
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">
          {label}
        </p>
      </div>
    </ScrollAnimation>
  );
};

const Stats = () => {
  const stats = [
    {
      icon: FileUser,
      iconGradient: "bg-gradient-to-br from-rose-200 via-rose-100 to-rose-50",
      iconColor: "text-rose-500",
      value: 100,
      suffix: "+",
      label: "Hours of Curriculum",
      delay: 0,
      rotation:
        "md:rotate-[-4deg] md:translate-y-4 hover:md:rotate-[-2deg] hover:-translate-y-2 hover:shadow-[0_30px_80px_-20px_hsl(var(--foreground)/0.12)]",
    },
    {
      icon: MapPin,
      iconGradient: "bg-gradient-to-br from-sky-200 via-sky-100 to-sky-50",
      iconColor: "text-sky-500",
      value: 3,
      suffix: "+",
      label: "Provinces Engaged",
      delay: 100,
      rotation:
        "md:scale-105 z-10 hover:md:scale-110 hover:-translate-y-3 hover:shadow-[0_35px_90px_-20px_hsl(var(--foreground)/0.15)]",
    },
    {
      icon: Users,
      iconGradient:
        "bg-gradient-to-br from-violet-200 via-violet-100 to-violet-50",
      iconColor: "text-violet-500",
      value: 3,
      suffix: "k+",
      label: "Students",
      delay: 200,
      rotation:
        "md:rotate-[4deg] md:translate-y-4 hover:md:rotate-[2deg] hover:-translate-y-2 hover:shadow-[0_30px_80px_-20px_hsl(var(--foreground)/0.12)]",
    },
  ];

  const partners = [
    { name: "Google", image: google },
    { name: "Nvidia", image: nvidia },
    { name: "OpenAI", image: openai },
    { name: "Anthropic", image: anthropic },
    { name: "AWS", image: aws },
    { name: "Apple", image: apple },
    { name: "Stripe", image: stripe },
  ];

  // Double the partners for seamless loop
  const marqueePartners = [...partners, ...partners];

  return (
    <section
      id="stats"
      className="min-h-screen flex items-center py-24 bg-background relative overflow-hidden"
    >
      {/* Subtle decorative elements */}
      <div className="absolute top-20 left-20 text-muted-foreground/10 text-4xl">
        ✦
      </div>
      <div className="absolute top-32 right-32 text-muted-foreground/10 text-3xl">
        ✦
      </div>

      <div className="container mx-auto section-padding">
        {/* Header */}
        <ScrollAnimation animation="fade-up" className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card shadow-sm mb-6">
            <span className="text-base">🎓</span>
            <span className="text-sm font-normal text-foreground">
              We Offer
            </span>
          </div>

          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-4 font-medium">
            Boost Your Skills
          </h2>

          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto font-normal leading-relaxed">
            From critical skills to technical topics, we support your
            professional development with courses that help you grow and
            succeed.
          </p>
        </ScrollAnimation>

        {/* Stats Cards - 3D Perspective Container */}
        <div
          className="relative max-w-5xl mx-auto mb-20"
          style={{ perspective: "1000px" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-center">
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </div>

        {/* Partners Section - Marquee */}
        <ScrollAnimation
          animation="fade-up"
          delay={300}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-border" />
            <p className="text-xs text-muted-foreground whitespace-nowrap font-normal">
              Our Infrastructure Partners
            </p>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Marquee Container */}
          <div className="relative overflow-hidden">
            <div className="flex w-max animate-marquee">
              {marqueePartners.map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  className="flex items-center gap-2 text-muted-foreground/60 hover:text-foreground transition-colors mx-8 shrink-0"
                >
                  <img src={partner.image} className="w-16" />
                  {/* <span className="font-display font-normal text-base">{partner.name}</span> */}
                </div>
              ))}
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default Stats;

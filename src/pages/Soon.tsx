import { useState, useEffect } from "react";

const Soon = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const targetDate = new Date("2026-02-14T22:00:00-05:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const parallax = (speed: number) => ({
    transform: `translateY(${scrollY * speed}px)`,
  });

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center mx-2 md:mx-4">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-400/30 to-purple-400/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-70" />
        <div className="relative bg-white/40 backdrop-blur-xl border border-white/40 rounded-2xl p-4 md:p-6 min-w-[80px] md:min-w-[120px] lg:min-w-[140px] shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] hover:shadow-[0_8px_32px_0_rgba(255,255,255,0.3)] transition-all duration-300 transform group-hover:-translate-y-1">
          <div className="text-3xl md:text-5xl lg:text-7xl font-bold text-foreground tabular-nums drop-shadow-sm text-center font-display">
            {String(value).padStart(2, "0")}
          </div>
        </div>
      </div>
      <div className="mt-3 md:mt-4 text-xs md:text-sm font-medium text-foreground/80 uppercase tracking-[0.2em]">
        {label}
      </div>
    </div>
  );

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "radial-gradient(circle at 50% 50%, #1A4F8B, transparent 70%)" }}
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-pink-200/60 via-pink-100/30 to-background" />
        <div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-pink-300/30 rounded-full blur-3xl transition-transform duration-100"
          style={parallax(0.05)}
        />
        <div
          className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-purple-200/20 rounded-full blur-3xl transition-transform duration-100"
          style={parallax(0.03)}
        />
        <div
          className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-indigo-200/20 rounded-full blur-3xl transition-transform duration-100"
          style={parallax(0.04)}
        />
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
          
          {/* Logo Section */}
          <div className="mb-8 md:mb-12 animate-slide-up relative group" style={{ animationDelay: "0.1s" }}>
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative bg-white/30 backdrop-blur-xl border border-white/30 rounded-[2rem] p-6 md:p-10 shadow-xl transform transition-transform duration-500 hover:scale-[1.02]">
              <img 
                src="/assets/logo.png" 
                alt="Dominican AI Launchpad Logo" 
                className="w-auto h-16 md:h-20 lg:h-24 drop-shadow-xl object-contain"
              />
            </div>
          </div>

          {/* Heading */}
          <h1
            className="font-display text-3xl md:text-5xl lg:text-6xl text-foreground font-bold tracking-tight mb-6 animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            Launching Soon
          </h1>

          <p
            className="text-base md:text-lg lg:text-xl text-foreground/80 max-w-2xl mx-auto mb-12 animate-slide-up leading-relaxed"
            style={{ animationDelay: "0.3s" }}
          >
            We're building the future of AI education in the Dominican Republic. <br className="hidden md:block"/>
            Get ready for a revolutionary learning experience.
          </p>

          {/* Countdown */}
          <div
            className="flex flex-wrap items-center justify-center gap-y-6 mb-12 animate-fade-in w-full"
            style={{ animationDelay: "0.4s" }}
          >
            <TimeUnit value={timeLeft.days} label="Days" />
            <div className="text-3xl md:text-5xl lg:text-7xl text-foreground/40 font-light hidden sm:block -mt-6 mx-1">:</div>
            <TimeUnit value={timeLeft.hours} label="Hours" />
            <div className="text-3xl md:text-5xl lg:text-7xl text-foreground/40 font-light hidden sm:block -mt-6 mx-1">:</div>
            <TimeUnit value={timeLeft.minutes} label="Minutes" />
            <div className="text-3xl md:text-5xl lg:text-7xl text-foreground/40 font-light hidden sm:block -mt-6 mx-1">:</div>
            <TimeUnit value={timeLeft.seconds} label="Seconds" />
          </div>

          {/* Launch Date */}
          <div
            className="flex flex-col items-center gap-3 animate-slide-up mt-4"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-foreground/20 to-transparent mb-3" />
            <p className="text-sm md:text-base text-foreground/80 tracking-widest uppercase">
              Launch Date: <span className="font-bold text-foreground ml-2">February 14, 2026</span>
            </p>
          </div>
        </div>

        {/* Floating Particles */}
        <div className="absolute left-[5%] top-[20%] w-2 h-2 bg-pink-400/60 rounded-full animate-float" style={{ animationDelay: "0s" }} />
        <div className="absolute right-[10%] top-[15%] w-3 h-3 bg-purple-400/60 rounded-full animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute left-[15%] bottom-[20%] w-4 h-4 bg-indigo-400/60 rounded-full animate-float" style={{ animationDelay: "4s" }} />
        <div className="absolute right-[20%] bottom-[30%] w-2 h-2 bg-blue-400/60 rounded-full animate-float" style={{ animationDelay: "1s" }} />
      </div>
    </section>
  );
};

export default Soon;
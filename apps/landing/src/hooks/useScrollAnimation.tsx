import { useEffect, useRef, useState } from "react";

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const { threshold = 0.1, rootMargin = "0px", triggerOnce = true } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
};

interface ScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animation?: "fade-up" | "fade-down" | "fade-left" | "fade-right" | "scale" | "fade";
  duration?: number;
}

export const ScrollAnimation = ({
  children,
  className = "",
  delay = 0,
  animation = "fade-up",
  duration = 600,
}: ScrollAnimationProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const animations = {
    "fade-up": {
      hidden: { opacity: 0, transform: "translateY(40px)" },
      visible: { opacity: 1, transform: "translateY(0)" },
    },
    "fade-down": {
      hidden: { opacity: 0, transform: "translateY(-40px)" },
      visible: { opacity: 1, transform: "translateY(0)" },
    },
    "fade-left": {
      hidden: { opacity: 0, transform: "translateX(-40px)" },
      visible: { opacity: 1, transform: "translateX(0)" },
    },
    "fade-right": {
      hidden: { opacity: 0, transform: "translateX(40px)" },
      visible: { opacity: 1, transform: "translateX(0)" },
    },
    scale: {
      hidden: { opacity: 0, transform: "scale(0.95)" },
      visible: { opacity: 1, transform: "scale(1)" },
    },
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
  };

  const currentAnimation = animations[animation];
  const style = isVisible ? currentAnimation.visible : currentAnimation.hidden;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        transition: `all ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { School, GraduationCap, Building2, ChevronRight } from "lucide-react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { ScrollAnimation } from "@/hooks/useScrollAnimation";

import { useTranslation } from "react-i18next";
import { initiativeDetail } from "@/data/initiatives/detail";

const InitiativeDetail = () => {
  const { initiativeId } = useParams();
  const initiative = initiativeDetail.find(
    (item) => item.slug === initiativeId,
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = () => {
    if (!initiative) return;
    setCurrentIndex((prev) =>
      prev === initiative.image.length - 1 ? 0 : prev + 1,
    );
  };

  const prevSlide = () => {
    if (!initiative) return;
    setCurrentIndex((prev) =>
      prev === 0 ? initiative.image.length - 1 : prev - 1,
    );
  };

  useEffect(() => {
    if (!initiative || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === initiative.image.length - 1 ? 0 : prev + 1,
      );
    }, 7000);

    return () => clearInterval(interval);
  }, [initiative, isPaused]);

  if (!initiative) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-20 text-center">
          <h1 className="text-2xl font-medium text-foreground">
            Initiative Not found
          </h1>
          <Link
            to="/initiatives"
            className="text-primary hover:underline mt-4 inline-block"
          >
            Back to initiatives
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <section aria-labelledby="news-breadcrumb">
        <div className="pt-24 pb-4 bg-muted/30">
          <div className="container mx-auto relative z-10">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link to="/initiatives" className="hover:text-primary transition-colors">
                Initiatives
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground font-medium truncate">
                {initiative.shortName}
              </span>
            </nav>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section aria-labelledby="news-content" className="bg-muted/30">
        <div className="container mx-auto relative z-10 pt-16">
          <ScrollAnimation animation="fade-up">
            {/* TITLE (Full Width) */}
            <h1 className="text-3xl lg:text-[42px] font-medium text-foreground leading-tight mb-6 lg:w-3/4 text-center mx-auto">
              {initiative.name}
            </h1>

            {/* Image Slideshow  */}
            <div className="space-y-8 py-16 mx-auto">
              <div
                className="lg:w-9/12 mx-auto relative aspect-video rounded-2xl overflow-hidden group"
                style={{
                  boxShadow:
                    "0 20px 60px -15px hsl(var(--foreground) / 0.5), 0 8px 20px -8px hsl(var(--foreground) / 0.05), inset 0 1px 0 hsl(0 0% 100% / 0.3)",
                  background:
                    "linear-gradient(145deg, hsl(var(--card)) 0%, hsl(var(--card) / 0.85) 100%)",
                }}
              >
                {/* Image */}
                <div
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  {initiative.image.map((img, index) => (
                    <img
                      key={index}
                      src={img.src}
                      alt={initiative.name}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                        index === currentIndex
                          ? "opacity-100 z-10"
                          : "opacity-0 z-0"
                      }`}
                    />
                  ))}
                </div>

                {/* Left Arrow */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white px-3 py-2 rounded-full"
                >
                  ‹
                </button>

                {/* Right Arrow */}
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white px-3 py-2 rounded-full"
                >
                  ›
                </button>
              </div>

              {/* Caption Under Image */}
              <div className="lg:w-9/12 mx-auto -mt-2 px-4">
                <div className="p-6 text-center transition-all duration-500">
                  <h3 className="text-lg font-semibold text-foreground">
                    {initiative.image[currentIndex].text}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    {initiative.image[currentIndex].text2}
                  </p>
                </div>
              </div>

              {/* Dots */}
              <div className="flex justify-center gap-2">
                {initiative.image.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 w-2 rounded-full ${
                      currentIndex === index ? "bg-primary" : "bg-muted"
                    }`}
                  />
                ))}
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default InitiativeDetail;

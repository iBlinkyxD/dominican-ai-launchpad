import { useState } from "react";
import { Plus, X, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollAnimation } from "@/hooks/useScrollAnimation";

import elbaAbreu from "@/assets/profile/elba-abreu-cropped.jpeg";
import luisDorismon from "@/assets/profile/luis-dorismon-cropped.jpeg";
import emelysRivera from "@/assets/profile/emelys-rivera-cropped.jpeg";
import kevinJoa from "@/assets/profile/kevin-joa-cropped.jpeg";

const faqs = [
  {
    question: "What is Dominican AI Association?",
    answer:
      "The Dominican AI Association is the leading organization dedicated to advancing artificial intelligence education, research, and innovation in the Dominican Republic and across the Caribbean.",
  },
  {
    question: "Do you have a refund policy?",
    answer:
      "Yes, we offer a 7-day money-back guarantee on all our courses. If you're not satisfied with the content, you can request a full refund within 7 days of purchase.",
  },
  {
    question: "Is the community supportive?",
    answer:
      "Absolutely! Our community is one of our greatest strengths. Members actively help each other through study groups, and mentorship programs. You'll never feel alone on your learning journey.",
  },
  {
    question: "Who can participate in DAIA programs?",
    answer:
      "Students, schools, entrepreneurs, businesses, and institutions can all engage with DAIA. Whether you are a young student learning English, a developer building AI tools, or a company seeking innovation, DAIA creates pathways for growth and collaboration.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(1);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="min-h-screen flex items-center py-24 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 via-background to-purple-50/30" />

      <div className="container mx-auto section-padding relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - Title and Contact Card */}
          <div>
            <ScrollAnimation animation="fade-right">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card shadow-sm mb-6">
                <HelpCircle className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">FAQ Hub</span>
              </div>

              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-12 leading-tight">
                Frequently Asked
                <br />
                Questions!
              </h2>
            </ScrollAnimation>

            {/* Still Have Questions Card */}
            <ScrollAnimation animation="fade-up" delay={200}>
              <div className="group relative bg-card/90 backdrop-blur-xl border border-border/30 rounded-3xl p-8 shadow-[0_4px_40px_-12px_hsl(var(--foreground)/0.08),inset_0_1px_0_hsl(0_0%_100%/0.3)] hover:shadow-[0_8px_50px_-12px_hsl(var(--foreground)/0.12)] hover:-translate-y-1 transition-all duration-500 overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/40 before:via-transparent before:to-white/10 before:pointer-events-none before:rounded-3xl">
                <h3 className="font-display text-2xl text-foreground mb-3">Still Have Questions?</h3>
                <p className="text-muted-foreground mb-6">
                  <a
                    href="#footer"
                    className="text-foreground underline underline-offset-4 hover:text-primary transition-colors"
                  >
                    Contact Us
                  </a>
                  , We are happy to help you
                </p>

                {/* Avatar Stack */}
                <div className="flex items-center mb-6">
                  <div className="flex -space-x-3">
                    <img
                      src={elbaAbreu}
                      alt="Team member"
                      className="w-12 h-12 rounded-full border-2 border-card object-cover"
                    />
                    <img
                      src={luisDorismon}
                      alt="Team member"
                      className="w-12 h-12 rounded-full border-2 border-card object-cover"
                    />
                    <img
                      src={emelysRivera}
                      alt="Team member"
                      className="w-12 h-12 rounded-full border-2 border-card object-cover"
                    />
                    <img
                      src={kevinJoa}
                      alt="Team member"
                      className="w-12 h-12 rounded-full border-2 border-card object-cover"
                    />
                  </div>
                </div>

                <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-8 py-6 text-base font-semibold">
                  Start Learning Now
                </Button>
              </div>
            </ScrollAnimation>
          </div>

          {/* Right Column - FAQ Accordion */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <ScrollAnimation key={index} animation="fade-left" delay={index * 100}>
                <div
                  className={`group relative bg-card/90 backdrop-blur-xl rounded-2xl shadow-[0_2px_20px_-8px_hsl(var(--foreground)/0.06),inset_0_1px_0_hsl(0_0%_100%/0.25)] border border-border/30 overflow-hidden transition-all duration-500 hover:-translate-y-0.5 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/30 before:via-transparent before:to-white/5 before:pointer-events-none before:rounded-2xl ${openIndex === index ? "shadow-[0_8px_40px_-8px_hsl(var(--foreground)/0.1)]" : "hover:shadow-[0_6px_30px_-8px_hsl(var(--foreground)/0.08)]"
                    }`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <span className="font-semibold text-foreground pr-4">{faq.question}</span>
                    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground">
                      {openIndex === index ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    </div>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-out ${openIndex === index ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                      }`}
                  >
                    <div className="px-6 pb-6 text-muted-foreground leading-relaxed">{faq.answer}</div>
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

export default FAQ;

import { CreditCard, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { ScrollAnimation } from "@/hooks/useScrollAnimation";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { teamMembers } from "@/data/team";
import { useTranslation } from "react-i18next";

type Plan = {
  name: string;
  description: string;
  price: string;
  priceNote: string;
  buttonText: string;
  gradientColor: string;
  badge?: string;
  features: string[];
};

const plans: Plan[] = [
  {
    name: "Professional",
    description: "Corporate AI Training & Certification Program",
    price: "$4500",
    priceNote: "Up to 30 staff",
    buttonText: "Get started",
    gradientColor: "from-red-200",
    features: [
      "Executive and team-level AI training",
      "Build practical AI capability",
      "Internal readiness",
    ],
  },
  {
    name: "Organizations",
    description: "AI Workforce Installation",
    price: "$5000",
    priceNote: "Fixed",
    buttonText: "Get started",
    gradientColor: "from-gray-200",
    features: [
      "Deploy one custom autonomous AI agent",
      "Automate a high-impact workflow",
      "Operate 24/7 inside your organization",
    ],
  },
  {
    name: "Companies",
    description: "AI Strategy & Modernization Roadmap",
    price: "$9500",
    priceNote: "+75 per employee",
    buttonText: "Contact team",
    gradientColor: "from-yellow-200",
    features: [
      "Comprehensive AI audit",
      "12-month transformation roadmap with one AI agent deployed",
    ],
  },
  {
    name: "Companies++",
    description: "Enterprise AI Infrastructure Upgrade",
    price: "$1500",
    priceNote: "+100 per employee",
    buttonText: "Contact team",
    gradientColor: "from-blue-200",
    features: [
      "Multi-agent deployment",
      "System Integrations",
      "Dashboards",
      "Executive AI leadership training for full organizational modernization",
    ],
  },
];

const Services = () => {
  const { t } = useTranslation("team");
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section
          aria-labelledby="services-hero"
          className="py-16 relative overflow-hidden"
        >
          <div className="container mx-auto relative z-10">
            <ScrollAnimation animation="fade-up" className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card shadow-sm mb-6">
                <CreditCard className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  Membership
                </span>
              </div>

              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
                Our Membership
              </h1>

              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Innovative leaders building tomorrow
              </p>
            </ScrollAnimation>
          </div>
        </section>

        {/* Services Cards */}
        <section aria-labelledby="services-cards">
          <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-4">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`
              rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-xl transition-all duration-300
              bg-gradient-to-b ${plan.gradientColor} from-[0%] via-white via-[30%] to-white to-[100%]
            `}
              >
                {/* Badge */}
                {plan.badge && (
                  <span className="absolute top-4 right-4 text-xs font-medium bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full">
                    {plan.badge}
                  </span>
                )}

                {/* Header */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 h-10">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="mt-6 flex items-end gap-2">
                    <span className="text-4xl font-semibold text-gray-900">
                      {plan.price}
                    </span>
                    <span className="text-sm text-gray-500">
                      / {plan.priceNote}
                    </span>
                  </div>

                  {/* Button */}
                  <button
                    className={`mt-6 w-full py-3 rounded-lg font-medium transition border hover:bg-black hover:text-white
                `}
                  >
                    {plan.buttonText}
                  </button>

                  {/* Features */}
                  <div className="mt-8">
                    <p className="text-sm font-medium text-gray-700 mb-4">
                      What's included:
                    </p>
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 text-sm text-gray-600"
                        >
                          <span className="mt-1 h-4 w-4 rounded-full bg-purple-100 flex items-center justify-center">
                            <svg
                              className="h-3 w-3 text-purple-600"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Back to Home Link */}
          <ScrollAnimation
            animation="fade-up"
            delay={400}
            className="text-center mt-16"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              {t(`team.backHome`)}
            </Link>
          </ScrollAnimation>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;

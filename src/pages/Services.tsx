import { CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { ScrollAnimation } from "@/hooks/useScrollAnimation";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { useTranslation } from "react-i18next";
import { serviceDetail } from "@/data/services/detail";
import DAIALogo from "@/assets/DAIA-icon.png";

const Services = () => {
  const { t } = useTranslation("services");
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section
          aria-labelledby="services-hero"
          className="pt-8 relative overflow-hidden"
        >
          <div className="container mx-auto relative z-10">
            <ScrollAnimation animation="fade-up" className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card shadow-sm mb-6">
                <CreditCard className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  {t(`services.badge`)}
                </span>
              </div>

              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
                {t(`services.title`)}
              </h1>

              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t(`services.subtitle`)}
              </p>
            </ScrollAnimation>
          </div>
        </section>

        {/* Services Cards */}
        <section aria-labelledby="services-cards">
          <div className="container mx-auto grid gap-8 xl:grid-cols-4 items-stretch">
            {serviceDetail.map((plan, index) => (
              <ScrollAnimation
                key={plan.name}
                animation="fade-up"
                delay={index * 100}
              >
                <div
                  key={t(plan.slug)}
                  className="group rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Gradient Header */}
                  <div
                    className="relative h-32"
                    style={{
                      background: `linear-gradient(135deg, ${plan.gradientFrom} 0%, ${plan.gradientTo} 100%)`,
                    }}
                  >
                    <div className="absolute -right-6 -top-6 pointer-events-none opacity-15">
                      <img
                        src={DAIALogo}
                        alt=""
                        className="w-36 h-36 object-contain brightness-0 invert transition-transform duration-500 ease-out group-hover:scale-110"
                      />
                    </div>

                    <div className="absolute top-6 left-6 w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg border border-white/30">
                      {(() => {
                        const Icon = plan.icon;
                        return <Icon className="w-10 h-10 text-white" />;
                      })()}
                    </div>
                  </div>

                  {/* Content Wrapper (IMPORTANT) */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-medium text-black">
                      {t(plan.name)}
                    </h3>

                    <p className="text-sm text-gray-500 mt-3 min-h-[40px]">
                      {t(plan.description)}
                    </p>

                    <div className="mt-6 flex items-end ">
                      <span className="text-4xl font-medium text-gray-900">
                        {t(plan.price)}
                      </span>
                    </div>

                    <div className="flex items-end">
                      <span className="text-sm text-gray-500">
                        {t(plan.priceNote)}
                      </span>
                    </div>

                    <div className="mt-8 pb-8">
                      <p className="text-sm font-medium text-gray-700 mb-4">
                        {t(`services.included`)}
                      </p>

                      <ul className="space-y-3">
                        {(
                          t(plan.features, { returnObjects: true }) as string[]
                        ).map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-3 text-sm text-gray-600"
                          >
                            <span
                              style={{ backgroundColor: plan.buttonColor }}
                              className="mt-1 h-4 w-4 flex-shrink-0 rounded-full flex items-center justify-center"
                            >
                              <svg
                                className="h-3 w-3 text-white"
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

                    <Link
                      to={`/services/${plan.slug}`}
                      state={{ selectedService: plan.name }}
                      className="mt-auto"
                    >
                      <button
                        style={{ backgroundColor: plan.buttonColor }}
                        className="w-full py-3 rounded-lg font-medium text-white transition hover:opacity-90"
                      >
                        {t(plan.buttonText)}
                      </button>
                    </Link>
                  </div>
                </div>
              </ScrollAnimation>
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
              {t(`services.backHome`)}
            </Link>
          </ScrollAnimation>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;

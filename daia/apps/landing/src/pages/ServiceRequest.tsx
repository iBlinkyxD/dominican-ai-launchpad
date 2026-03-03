import { CreditCard, Send } from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ScrollAnimation } from "@/hooks/useScrollAnimation";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";
import { serviceDetail } from "@/data/services/detail";

import DAIALogo from "@/assets/DAIA-icon.png";

const ServiceRequest = () => {
  const { t } = useTranslation("services");
  const { toast } = useToast();
  const { serviceId } = useParams();
  const service = serviceDetail.find((item) => item.slug === serviceId);

  if (!service) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-20 text-center">
          <h1 className="text-2xl font-medium text-foreground">
            Service Not found
          </h1>
          <Link
            to="/services"
            className="text-primary hover:underline mt-4 inline-block"
          >
            Back to services
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    job: "",
    companySize: "",
    readiness: "",
    authority: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

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
                {(() => {
                  const Icon = service.icon;
                  return <Icon className="w-4 h-4 text-primary" />;
                })()}
                <span className="text-sm font-medium text-foreground">
                  {t(service.name)}
                </span>
              </div>

              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
                {t(service.headline)}
              </h1>

              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t(service.subheadline)}
              </p>
            </ScrollAnimation>
          </div>
        </section>

        {/* Services Cards */}
        <section className="container mx-auto mt-12">
          <div className="grid lg:grid-cols-2 gap-12">
            <ScrollAnimation animation="fade-up">
              {/* LEFT SIDE — FORM */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 px-8 pb-8 pt-4">
                <form
                  name="service-request"
                  method="POST"
                  action="/thank-you"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  className="relative z-20 space-y-6"
                >
                  {/* Required for Netlify */}
                  <input
                    type="hidden"
                    name="form-name"
                    value="service-request"
                  />
                  <input type="hidden" name="bot-field" />

                  {/* Hidden fields for custom Select components */}
                  <input
                    type="hidden"
                    name="companySize"
                    value={formData.companySize}
                  />
                  <input
                    type="hidden"
                    name="readiness"
                    value={formData.readiness}
                  />
                  <input
                    type="hidden"
                    name="authority"
                    value={formData.authority}
                  />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        {t(`servicesForm.fields.fullName`)}
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t(`servicesForm.placeholders.fullName`)}
                        required
                        className="bg-background/50 border-border/50 focus:border-primary"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        {t(`servicesForm.fields.workEmail`)}
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t(`servicesForm.placeholders.workEmail`)}
                        required
                        className="bg-background/50 border-border/50 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="company"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        {t(`servicesForm.fields.companyName`)}
                      </label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder={t(`servicesForm.placeholders.companyName`)}
                        required
                        className="bg-background/50 border-border/50 focus:border-primary"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="job"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        {t(`servicesForm.fields.jobTitle`)}
                      </label>
                      <Input
                        id="job"
                        name="job"
                        value={formData.job}
                        onChange={handleChange}
                        placeholder={t(`servicesForm.placeholders.jobTitle`)}
                        required
                        className="bg-background/50 border-border/50 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t(`servicesForm.fields.companySize`)}
                    </label>

                    <Select
                      value={formData.companySize}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, companySize: value }))
                      }
                    >
                      <SelectTrigger className="bg-background/50 border-border/50 focus:border-primary">
                        <SelectValue
                          placeholder={t(
                            `servicesForm.placeholders.companySize`,
                          )}
                        />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="1-10">1–10</SelectItem>
                        <SelectItem value="11-50">11–50</SelectItem>
                        <SelectItem value="51-200">51–200</SelectItem>
                        <SelectItem value="200+">200+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t(`servicesForm.fields.whenBegin`)}
                    </label>

                    <Select
                      value={formData.readiness}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, readiness: value }))
                      }
                    >
                      <SelectTrigger className="bg-background/50 border-border/50 focus:border-primary">
                        <SelectValue placeholder="" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="Immediately">
                          {t(`servicesForm.options.readiness.immediately`)}
                        </SelectItem>
                        <SelectItem value="Within 30 days">
                          {t(`servicesForm.options.readiness.30days`)}
                        </SelectItem>
                        <SelectItem value="1-3 months">
                          {t(`servicesForm.options.readiness.1-3months`)}
                        </SelectItem>
                        <SelectItem value="Just exploring">
                          {t(`servicesForm.options.readiness.exploring`)}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t(`servicesForm.fields.decisionProcess`)}
                    </label>

                    <Select
                      value={formData.authority}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, authority: value }))
                      }
                    >
                      <SelectTrigger className="bg-background/50 border-border/50 focus:border-primary">
                        <SelectValue placeholder="" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="Final decision maker">
                          {t(`servicesForm.options.authority.final`)}
                        </SelectItem>
                        <SelectItem value="Part of decision team">
                          {t(`servicesForm.options.authority.team`)}
                        </SelectItem>
                        <SelectItem value="Researching for leadership">
                          {t(`servicesForm.options.authority.research`)}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      {t(`servicesForm.fields.challenge`)}
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t(`servicesForm.placeholders.challenge`)}
                      rows={5}
                      required
                      className="bg-background/50 border-border/50 focus:border-primary resize-none"
                    />
                  </div>

                  <Button type="submit" className="w-full gap-2">
                    {t("servicesForm.button.send")}
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fade-up">
              {/* RIGHT SIDE — SELECTED SERVICES */}
              <div
                key={t(service.slug)}
                className="group rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Gradient Header */}
                <div
                  className="relative h-32"
                  style={{
                    background: `linear-gradient(135deg, ${service.gradientFrom} 0%, ${service.gradientTo} 100%)`,
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
                      const Icon = service.icon;
                      return <Icon className="w-10 h-10 text-white" />;
                    })()}
                  </div>
                </div>

                {/* Content Wrapper (IMPORTANT) */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-medium text-black">
                    {t(service.name)}
                  </h3>

                  <p className="text-sm text-gray-500 mt-3 min-h-[40px]">
                    {t(service.description)}
                  </p>

                  <div className="mt-6 flex items-end ">
                    <span className="text-4xl font-medium text-gray-900">
                      {t(service.price)}
                    </span>
                  </div>

                  <div className="flex items-end">
                    <span className="text-sm text-gray-500">
                      {t(service.priceNote)}
                    </span>
                  </div>

                  <div className="mt-8 pb-8">
                    <p className="text-sm font-medium text-gray-700 mb-4">
                      {t(`services.included`)}
                    </p>

                    <ul className="space-y-3">
                      {(
                        t(service.features, { returnObjects: true }) as string[]
                      ).map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 text-sm text-gray-600"
                        >
                          <span
                            style={{ backgroundColor: service.buttonColor }}
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
                </div>
              </div>
            </ScrollAnimation>
          </div>
          {/* Back to Home Link */}
          <ScrollAnimation
            animation="fade-up"
            delay={400}
            className="text-center mt-16"
          >
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              {t(`servicesForm.backService`)}
            </Link>
          </ScrollAnimation>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ServiceRequest;

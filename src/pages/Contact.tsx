import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { ScrollAnimation } from "@/hooks/useScrollAnimation";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation("contact");
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: t(`contact.toast.successTitle`),
      description: t(`contact.toast.successDescription`),
    });

    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      title: t(`contact.contactInfo.email`),
      value: "hello@daia.do",
      href: "mailto:hello@daia.do",
    },
    {
      icon: Phone,
      title: t(`contact.contactInfo.phone`),
      value: "+1 (849) 472-5777",
      href: "tel:+18095550123",
    },
    {
      icon: MapPin,
      title: t(`contact.contactInfo.location`),
      value: "C. Emma Balaguer 5, Los Girasoles",
      href: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section
          aria-labelledby="contact-hero"
          className="py-16 relative overflow-hidden"
        >
          {/* <div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 via-background to-blue-50/50" /> */}

          <div className="container mx-auto relative z-10">
            <ScrollAnimation animation="fade-up" className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card shadow-sm mb-6">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  {t(`contact.badge`)}
                </span>
              </div>

              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
                {t(`contact.title`)}
              </h1>

              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t(`contact.description`)}
              </p>
            </ScrollAnimation>
          </div>
        </section>

        {/* Content Section */}
        <section aria-labelledby="contact-content">
          <div className="container grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <ScrollAnimation animation="fade-up" delay={100}>
              <div
                className="relative bg-card/90 backdrop-blur-xl rounded-3xl p-8 border border-border/30"
                style={{
                  boxShadow:
                    "0 20px 60px -15px hsl(var(--foreground) / 0.08), 0 8px 20px -8px hsl(var(--foreground) / 0.05), inset 0 1px 0 hsl(0 0% 100% / 0.3)",
                  background:
                    "linear-gradient(145deg, hsl(var(--card)) 0%, hsl(var(--card) / 0.85) 100%)",
                }}
              >
                {/* Glossy overlay */}
                <div
                  className="absolute inset-0 rounded-3xl pointer-events-none z-10"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(0 0% 100% / 0.5) 0%, transparent 40%, transparent 60%, hsl(0 0% 100% / 0.1) 100%)",
                    opacity: 0.6,
                  }}
                />

                <form
                  onSubmit={handleSubmit}
                  className="relative z-20 space-y-6"
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        {t(`contact.form.name`)}
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t(`contact.form.namePlaceholder`)}
                        required
                        className="bg-background/50 border-border/50 focus:border-primary"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        {t(`contact.form.email`)}
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t(`contact.form.emailPlaceholder`)}
                        required
                        className="bg-background/50 border-border/50 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      {t(`contact.form.subject`)}
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder={t(`contact.form.subjectPlaceholder`)}
                      required
                      className="bg-background/50 border-border/50 focus:border-primary"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      {t(`contact.form.message`)}
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t(`contact.form.messagePlaceholder`)}
                      rows={5}
                      required
                      className="bg-background/50 border-border/50 focus:border-primary resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full gap-2"
                  >
                    {isSubmitting
                      ? t(`contact.form.sending`)
                      : t(`contact.form.send`)}
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            </ScrollAnimation>

            {/* Contact Info */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <ScrollAnimation
                  key={info.title}
                  animation="fade-up"
                  delay={200 + index * 100}
                >
                  <a
                    href={info.href}
                    className="group block relative bg-card/90 backdrop-blur-xl rounded-2xl p-6 border border-border/30 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1"
                    style={{
                      boxShadow:
                        "0 20px 60px -15px hsl(var(--foreground) / 0.08), 0 8px 20px -8px hsl(var(--foreground) / 0.05), inset 0 1px 0 hsl(0 0% 100% / 0.3)",
                      background:
                        "linear-gradient(145deg, hsl(var(--card)) 0%, hsl(var(--card) / 0.85) 100%)",
                    }}
                  >
                    {/* Glossy overlay */}
                    <div
                      className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500 group-hover:opacity-80"
                      style={{
                        background:
                          "linear-gradient(135deg, hsl(0 0% 100% / 0.5) 0%, transparent 40%, transparent 60%, hsl(0 0% 100% / 0.1) 100%)",
                        opacity: 0.6,
                      }}
                    />

                    <div className="relative z-10 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <info.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-medium text-foreground">
                          {info.title}
                        </h3>
                        <p className="text-muted-foreground">{info.value}</p>
                      </div>
                    </div>
                  </a>
                </ScrollAnimation>
              ))}

              {/* Map placeholder */}
              <ScrollAnimation animation="fade-up" delay={500}>
                <div
                  className="relative bg-card/90 backdrop-blur-xl rounded-2xl overflow-hidden border border-border/30 h-48"
                  style={{
                    boxShadow:
                      "0 20px 60px -15px hsl(var(--foreground) / 0.08), 0 8px 20px -8px hsl(var(--foreground) / 0.05), inset 0 1px 0 hsl(0 0% 100% / 0.3)",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center">
                    <div className="text-center">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.2204720929626!2d-69.98740015!3d18.5189365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eaf8bb3b6814b8b%3A0xca34cc7e55ac8b16!2sEscuela%20Primaria%20Jes%C3%BAs%20Maestro%2C%20C.%20Emma%20Balaguer%205%2C%20Los%20Girasoles!5e0!3m2!1sen!2sdo!4v1771644110292!5m2!1sen!2sdo"
                        width="600"
                        height="450"
                        className="border:0;"
                        loading="lazy"
                      />
                      {/* <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        {t(`contact.contactInfo.mapLabel`)}
                      </p> */}
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;

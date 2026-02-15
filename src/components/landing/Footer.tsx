import { Facebook, Twitter, Linkedin, Instagram, Youtube, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollAnimation } from "@/hooks/useScrollAnimation";
import logo from "@/assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    programs: [
      { label: "Introduction to AI", href: "#" },
      { label: "Learn English with AI", href: "#" },
      { label: "AI in the Dominican Republic", href: "#" },
    ],
    company: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Partners", href: "#" },
    ],
    support: [
      { label: "Help Center", href: "#" },
      { label: "Contact Us", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com/daia_official", label: "Facebook" },
    { icon: Twitter, href: "https://x.com/daia_official", label: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com/company/daia_official", label: "LinkedIn" },
    { icon: Instagram, href: "https:/instagram.com/daia.do/", label: "Instagram" },
    { icon: Youtube, href: "https://www.youtube.com/channel/UCQzLflrAQSQoen02x1yonvg", label: "YouTube" },
  ];

  return (
    <footer id="footer" className="relative overflow-hidden">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-pink-50/90 via-background to-purple-50/80 py-16">
        <div className="container mx-auto section-padding">
          <ScrollAnimation animation="fade-up">
            <div className="bg-white/30 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 shadow-[0_4px_40px_-12px_rgba(0,0,0,0.08)]">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
                    <Mail className="w-3 h-3" />
                    Newsletter
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl text-foreground mb-2">
                    Stay Updated with AI Trends
                  </h3>
                  <p className="text-muted-foreground">
                    Get the latest courses, events, and AI insights delivered to your inbox.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="rounded-full px-6 h-12 min-w-[280px] border-border bg-background"
                  />
                  <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-full h-12 px-6 gap-2">
                    Subscribe
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-background border-t border-border py-16">
        <div className="container mx-auto section-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
            {/* Brand Column */}
            <ScrollAnimation animation="fade-up" className="lg:col-span-2">
              <a href="#" className="flex items-center gap-3 mb-6">
                <img src={'/assets/logo.png'} alt="Dominican AI Association" className="h-12 w-auto" />

              </a>
              <p className="text-muted-foreground mb-6 max-w-sm leading-relaxed">
                Empowering the Dominican Republic with world-class AI education and fostering innovation across the
                Caribbean.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    target="_blank"
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-foreground hover:text-background transition-all duration-300"
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </ScrollAnimation>

            {/* Programs Column */}
            <ScrollAnimation animation="fade-up" delay={100}>
              <h4 className="font-display font-semibold text-foreground mb-6">Programs</h4>
              <ul className="space-y-4">
                {footerLinks.programs.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </ScrollAnimation>

            {/* Company Column */}
            <ScrollAnimation animation="fade-up" delay={200}>
              <h4 className="font-display font-semibold text-foreground mb-6">Company</h4>
              <ul className="space-y-4">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </ScrollAnimation>

            {/* Support Column */}
            <ScrollAnimation animation="fade-up" delay={300}>
              <h4 className="font-display font-semibold text-foreground mb-6">Support</h4>
              <ul className="space-y-4">
                {footerLinks.support.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </ScrollAnimation>
          </div>

          {/* Bottom Bar */}
          <ScrollAnimation animation="fade-up" delay={400}>
            <div className="pt-8 border-t border-border">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-muted-foreground text-sm text-center md:text-left">
                  © {currentYear} Dominican AI Association. All rights reserved.
                </p>
                <div className="flex items-center gap-6 text-sm">
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Privacy
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Terms
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Cookies
                  </a>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

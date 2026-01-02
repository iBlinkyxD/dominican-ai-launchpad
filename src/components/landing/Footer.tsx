import { Facebook, Twitter, Linkedin, Instagram, Youtube, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "@/assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    programs: [
      { label: "AI Fundamentals", href: "#" },
      { label: "Machine Learning", href: "#" },
      { label: "Deep Learning", href: "#" },
      { label: "Data Science", href: "#" },
      { label: "Certifications", href: "#" },
    ],
    community: [
      { label: "About Us", href: "#" },
      { label: "Events", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Partners", href: "#" },
    ],
    support: [
      { label: "Help Center", href: "#" },
      { label: "Contact Us", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer id="footer" className="bg-foreground text-background pt-20 pb-8">
      <div className="container mx-auto section-padding">
        {/* Newsletter Section */}
        <div className="glass-card bg-primary/10 rounded-3xl p-8 md:p-12 mb-16 border-primary/20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="font-display text-2xl md:text-3xl font-bold text-background mb-2">
                Stay Updated with AI Trends
              </h3>
              <p className="text-background/70">
                Subscribe to our newsletter for the latest courses, events, and AI insights.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-background/10 border-background/20 text-background placeholder:text-background/50 rounded-full px-6 min-w-[280px]"
              />
              <Button className="btn-glossy text-primary-foreground rounded-full px-8 whitespace-nowrap">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-3 mb-6">
              <img src={logo} alt="Dominican AI Association" className="h-12 w-auto" />
              <span className="font-display font-bold text-xl text-background">
                Dominican AI
              </span>
            </a>
            <p className="text-background/70 mb-6 max-w-sm">
              Empowering the Dominican Republic with world-class AI education, 
              fostering innovation, and building the future of technology in the Caribbean.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a href="mailto:info@dominicanai.org" className="flex items-center gap-3 text-background/70 hover:text-background transition-colors">
                <Mail className="w-5 h-5" />
                <span>info@dominicanai.org</span>
              </a>
              <a href="tel:+18095551234" className="flex items-center gap-3 text-background/70 hover:text-background transition-colors">
                <Phone className="w-5 h-5" />
                <span>+1 (809) 555-1234</span>
              </a>
              <div className="flex items-center gap-3 text-background/70">
                <MapPin className="w-5 h-5" />
                <span>Santo Domingo, Dominican Republic</span>
              </div>
            </div>
          </div>

          {/* Programs Column */}
          <div>
            <h4 className="font-display font-semibold text-lg text-background mb-6">Programs</h4>
            <ul className="space-y-3">
              {footerLinks.programs.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Column */}
          <div>
            <h4 className="font-display font-semibold text-lg text-background mb-6">Community</h4>
            <ul className="space-y-3">
              {footerLinks.community.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="font-display font-semibold text-lg text-background mb-6">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-background/60 text-sm text-center md:text-left">
              © {currentYear} Dominican AI Association. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center text-background/70 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

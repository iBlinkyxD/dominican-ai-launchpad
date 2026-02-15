import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Crown,
  ChevronDown,
  Plane,
  Home,
  BookOpen,
  Handshake,
  Smartphone,
  Monitor,
  Brain,
  Newspaper,
  NotebookPen,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

import banner from "../../assets/banner.jpeg";
import ComingSoon from "@/pages/ComingSoon";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isMobileMenuOpen);

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isMobileMenuOpen]);

  const solutionsSections = [
    {
      title: "DAIA Education",
      items: [
        {
          label: "Educa One",
          href: "#",
          description: "TBA",
          icon: Monitor,
          comingSoon: true,
        },
        {
          label: "DAIA Student App",
          href: "#",
          description: "TBA",
          icon: Smartphone,
          comingSoon: true,
        },
        {
          label: "Quisqueya AI",
          href: "#",
          description: "TBA",
          icon: Brain,
          comingSoon: true,
        },
      ],
    },
    {
      title: "DAIA Tourism",
      items: [
        {
          label: "TBA",
          href: "#",
          description: "TBA",
          icon: Plane,
          comingSoon: true,
        },
        {
          label: "TBA",
          href: "#",
          description: "TBA",
          icon: Plane,
          comingSoon: true,
        },
      ],
    },
    {
      title: "DAIA Real Estate",
      items: [
        {
          label: "TBA",
          href: "#",
          description: "TBA",
          icon: Home,
          comingSoon: true,
        },
        {
          label: "TBA",
          href: "#",
          description: "TBA",
          icon: Home,
          comingSoon: true,
        },
      ],
    },
  ];

  const companyLinks = [
    {
      label: "Partners",
      href: "/partners",
      icon: Home,
      description: "The light moves faster when we move together.",
      comingSoon: false,
    },
    {
      label: "Scholarship",
      href: "#",
      icon: Plane,
      description: "TBA",
      comingSoon: true,
    },
    {
      label: "News",
      href: "#",
      icon: Newspaper,
      description: "TBA",
      comingSoon: true,
    },
    {
      label: "Blog",
      href: "#",
      icon: NotebookPen,
      description: "TBA",
      comingSoon: true,
    },
  ];

  const navLinks = [
    { label: "Courses", href: "/courses", isAnchor: false, icon: BookOpen },
    { label: "Teams", href: "/teams", isAnchor: false },
    { label: "Partner", href: "/contact", isAnchor: false, icon: Handshake },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        isMobileMenuOpen
          ? "bg-background shadow-sm border-b border-border"
          : isScrolled
            ? "bg-background/80 backdrop-blur-xl shadow-sm border-b border-border/50"
            : "bg-transparent"
      }`}
    >
      <div className="container mx-auto section-padding">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={"/assets/logo.png"}
              alt="Dominican AI Association"
              className="h-10 lg:h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            {/* Courses Link - First */}
            <Link
              to="/courses"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Courses
            </Link>

            {/* Solutions Dropdown - Second */}
            <div
              className="relative"
              onMouseEnter={() => setIsSolutionsOpen(true)}
              onMouseLeave={() => setIsSolutionsOpen(false)}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors">
                Solutions
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${isSolutionsOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Dropdown Menu */}
              {isSolutionsOpen && (
                <div className="absolute top-full -left-80 pt-4">
                  <div className="bg-background/95 backdrop-blur-xl border border-border rounded-2xl shadow-xl p-6 w-max">
                    <div className="grid gap-8 grid-cols-[220px_auto_auto_auto]">
                      {/* RIGHT IMAGE COLUMN */}
                      <div className="relative w-[220px] h-[320px] rounded-xl overflow-hidden bg-muted">
                        <img
                          src={banner}
                          alt="Featured"
                          className="w-full h-full object-cover"
                        />

                        {/* Optional overlay */}
                        <div className="absolute inset-0 bg-black/30 flex items-end p-4">
                          <div>
                            <p className="text-white font-semibold text-sm">
                              Explore AI Solutions
                            </p>
                            <p className="text-white/80 text-xs">
                              Discover how we empower schools and companies
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* LEFT 3 COLUMNS (Sections) */}
                      {solutionsSections.map((section) => (
                        <div key={section.title}>
                          <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-4">
                            {section.title}
                          </h4>

                          <div className="space-y-2">
                            {section.items.map((item) => (
                              <Link
                                key={item.label}
                                to={item.href}
                                className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors group"
                              >
                                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                  <item.icon className="w-4 h-4 text-primary" />
                                </div>

                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-foreground">
                                      {item.label}
                                    </span>
                                    {item.comingSoon && (
                                      <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded-full font-semibold">
                                        Coming Soon
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {item.description}
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Teams Link - Third */}
            <Link
              to="/teams"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Team
            </Link>

            {/* Companies Dropdown - Fourth */}
            <div
              className="relative"
              onMouseEnter={() => setIsCompanyOpen(true)}
              onMouseLeave={() => setIsCompanyOpen(false)}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors">
                Company
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${isCompanyOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Dropdown Menu */}
              {isCompanyOpen && (
                <div className="absolute top-full left-0 pt-2">
                  <div className="bg-background/95 backdrop-blur-xl border border-border rounded-xl shadow-xl p-2 min-w-[400px]">
                    {companyLinks.map((item) => (
                      <Link
                        key={item.label}
                        to={item.href}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                          <item.icon className="w-5 h-5 text-blue-950" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-foreground">
                              {item.label}
                            </span>

                            {item.comingSoon && (
                              <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded-full font-semibold">
                                Coming Soon
                              </span>
                            )}
                          </div>

                          <div className="text-xs text-muted-foreground">
                            {item.description}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/contact"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-6">
            <a
              href="#"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Login
            </a>
            <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-6 gap-2">
              <Crown className="w-4 h-4" />
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-16 bg-background/95 backdrop-blur-xl border-b border-border shadow-lg z-40">
            <nav className="h-[calc(100vh-4rem)] overflow-y-auto p-4 flex flex-col gap-2">
              {/* Courses Link - First */}
              <Link
                to="/courses"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-3 px-4 text-foreground hover:bg-muted rounded-lg transition-colors font-medium"
              >
                Courses
              </Link>

              <hr className="my-2 border-border" />

              {/* Solutions Section - Second */}
              <div className="py-2">
                <div className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Solutions
                </div>
                {solutionsSections.map((section) => (
                  <div key={section.title} className="mb-4">
                    {/* Section Title */}
                    <div className="px-4 py-2 text-xs font-semibold uppercase text-muted-foreground">
                      {section.title}
                    </div>

                    {/* Section Items */}
                    {section.items.map((item) => (
                      <Link
                        key={item.label}
                        to={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 py-3 px-4 text-foreground hover:bg-muted rounded-lg transition-colors"
                      >
                        <item.icon className="w-5 h-5 text-primary" />
                        <div>
                          <div className="text-sm font-medium">
                            {item.label}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {item.description}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>

              <hr className="my-2 border-border" />

              {/* Teams Link - Third */}
              <Link
                to="/teams"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-3 px-4 text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                Team
              </Link>

              <hr className="my-2 border-border" />

              {/* Companies Dropdown - Fourth */}
              <div className="py-2">
                <div className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Company
                </div>
                {companyLinks.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 py-3 px-4 text-foreground hover:bg-muted rounded-lg transition-colors"
                  >
                    <item.icon className="w-5 h-5 text-primary" />
                    <div>
                      <div className="text-sm font-medium">{item.label}</div>
                      <div className="text-xs text-muted-foreground">
                        {item.description}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <hr className="my-2 border-border" />

              {/* Contact Link - Fifth */}
              <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-3 px-4 text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                Contact
              </Link>

              <hr className="my-2 border-border" />
              <a
                href="#"
                className="py-3 px-4 text-muted-foreground hover:bg-muted rounded-lg transition-colors"
              >
                Login
              </a>

              <Button className="bg-foreground text-background hover:bg-foreground/90 mt-2 gap-2 p-6">
                <Crown className="w-4 h-4" />
                Sign Up
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

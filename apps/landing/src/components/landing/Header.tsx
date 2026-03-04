import { useState, useEffect, useRef } from "react";
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
  TreePalm,
  Earth,
  ShieldCheck,
  GraduationCap,
  Globe,
  Users,
  Rocket,
  CreditCard,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

import banner from "../../assets/banner.jpeg";
import ComingSoon from "@/pages/ComingSoon";

const Header = () => {
  const { t, i18n } = useTranslation("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const [mobileSubMenu, setMobileSubMenu] = useState<
    "none" | "solutions" | "company"
  >("none");
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [isLangOpen, setIsLangOpen] = useState(false);

  const currentLang = i18n.language?.startsWith("es") ? "es" : "en";

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
      title: t("header.solutions.education"),
      items: [
        {
          label: t("header.solutionsItems.educaOne.label"),
          href: "/educa-one",
          description: t("header.solutionsItems.educaOne.description"),
          icon: Monitor,
        },
        {
          label: t("header.solutionsItems.scholarOne.label"),
          href: "/scholar-one",
          description: t("header.solutionsItems.scholarOne.description"),
          icon: Smartphone,
        },
        {
          label: t("header.solutionsItems.quisqueyaAI.label"),
          href: "/quisqueya-ai",
          description: t("header.solutionsItems.quisqueyaAI.description"),
          icon: Brain,
        },
      ],
    },
    {
      title: t("header.solutions.tourism"),
      items: [
        {
          label: t("header.solutionsItems.islaIntelligence.label"),
          href: "/isla-intelligence",
          description: t("header.solutionsItems.islaIntelligence.description"),
          icon: TreePalm,
        },
        {
          label: t("header.solutionsItems.culturaConnect.label"),
          href: "/cultura-connect",
          description: t("header.solutionsItems.culturaConnect.description"),
          icon: Earth,
        },
      ],
    },
    {
      title: t("header.solutions.realEstate"),
      items: [
        {
          label: t("header.solutionsItems.terraVisionAI.label"),
          href: "/terra-vision-ai",
          description: t("header.solutionsItems.terraVisionAI.description"),
          icon: Home,
        },
        {
          label: t("header.solutionsItems.titleTrustDR.label"),
          href: "/title-trust-dr",
          description: t("header.solutionsItems.titleTrustDR.description"),
          icon: ShieldCheck,
        },
      ],
    },
  ];

  const companyLinks = [
    {
      label: t("header.company.services.title"),
      href: "/services",
      icon: CreditCard,
      description: t("header.company.services.description"),
    },
    {
      label: t("header.company.partners.title"),
      href: "/partners",
      icon: Users,
      description: t("header.company.partners.description"),
    },
    {
      label: t("header.company.initiative.title"),
      href: "/initiatives",
      icon: Rocket,
      description: t("header.company.initiative.description"),
    },
    {
      label: t("header.company.news.title"),
      href: "/news",
      icon: Newspaper,
      description: t("header.company.news.description"),
    },
    {
      label: t("header.company.blog.title"),
      href: "#",
      icon: NotebookPen,
      description: t("header.company.blog.description"),
    },
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
        <div className="relative flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={"/assets/logo.png"}
              alt="Dominican AI Association"
              className="h-10 lg:h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {/* Courses Link - First */}
            <Link
              to="/courses"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              {t("header.nav.courses")}
            </Link>

            {/* Solutions Dropdown - Second */}
            <div
              className="relative"
              onMouseEnter={() => setIsSolutionsOpen(true)}
              onMouseLeave={() => setIsSolutionsOpen(false)}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors">
                {t("header.nav.solutions")}
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${isSolutionsOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Dropdown Menu */}
              {isSolutionsOpen && (
                <div className="absolute top-full -left-[370px] pt-4">
                  <div className="bg-background/95 backdrop-blur-xl border border-border rounded-2xl shadow-xl p-6 w-max">
                    <div className="grid gap-6 grid-cols-[220px_220px_220px_220px]">
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
                              {t("header.solutions.exploreTitle")}
                            </p>
                            <p className="text-white/80 text-xs">
                              {t("header.solutions.exploreDesc")}
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
                                onClick={() => setIsSolutionsOpen(false)}
                                className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors group"
                              >
                                <div className="w-9 h-9 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                  <item.icon className="w-4 h-4 text-primary" />
                                </div>

                                <div>
                                  <span className="text-sm font-medium text-foreground">
                                    {item.label}
                                  </span>
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
              to="/team"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              {t("header.nav.team")}
            </Link>

            {/* Companies Dropdown - Fourth */}
            <div
              className="relative"
              onMouseEnter={() => setIsCompanyOpen(true)}
              onMouseLeave={() => setIsCompanyOpen(false)}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors">
                {t("header.nav.company")}
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${isCompanyOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Dropdown Menu */}
              {isCompanyOpen && (
                <div className="absolute top-full left-0 pt-2">
                  <div className="bg-background/95 backdrop-blur-xl border border-border rounded-xl shadow-xl p-2 min-w-[280px]">
                    {companyLinks.map((item) => (
                      <Link
                        key={item.label}
                        to={item.href}
                        onClick={() => setIsCompanyOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors group"
                      >
                        <div className="w-10 h-10 shrink-0 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                          <item.icon className="w-5 h-5 text-blue-950" />
                        </div>
                        <div>
                          <span className="text-sm font-medium text-foreground">
                            {item.label}
                          </span>
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
              {t("header.nav.contact")}
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden xl:flex items-center gap-6">
            {/* Language Dropdown */}
            <div
              className="relative border rounded-full px-2 py-2"
              onMouseEnter={() => setIsLangOpen(true)}
              onMouseLeave={() => setIsLangOpen(false)}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors">
                {currentLang === "en" ? "🇺🇸" : "🇩🇴"}
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${isLangOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Dropdown Menu */}
              {isLangOpen && (
                <div className="absolute top-full -right-20 pt-2 w-40">
                  <div className="bg-background/95 backdrop-blur-xl border border-border rounded-xl shadow-xl p-2">
                    <button
                      onClick={() => {
                        i18n.changeLanguage("en");
                        setIsLangOpen(false);
                      }}
                      className="flex items-center gap-3 w-full px-4 py-3 hover:bg-muted transition-colors"
                    >
                      <span className="text-lg">🇺🇸</span>
                      <span className="text-sm font-medium">English</span>
                    </button>

                    <button
                      onClick={() => {
                        i18n.changeLanguage("es");
                        setIsLangOpen(false);
                      }}
                      className="flex items-center gap-3 w-full px-4 py-3 hover:bg-muted transition-colors"
                    >
                      <span className="text-lg">🇩🇴</span>
                      <span className="text-sm font-medium">Español</span>
                    </button>
                  </div>
                </div>
              )}
              {/* {isLangOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-background border border-border rounded-xl shadow-lg overflow-hidden z-50">

                </div>
              )} */}
            </div>
            <Link
              to="#"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              {t("header.nav.login")}
            </Link>
            <Link to="#">
              <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-6 gap-2">
                <Crown className="w-4 h-4" />
                {t("header.nav.signup")}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="xl:hidden fixed inset-0 top-16 bg-background/95 backdrop-blur-xl border-b border-border shadow-lg z-40 overflow-hidden">
            <div className="relative w-full h-full">
              {/* Main Menu */}
              <div
                className={`absolute inset-0 transition-transform duration-300 ${
                  mobileSubMenu === "none"
                    ? "translate-x-0"
                    : "-translate-x-full"
                }`}
              >
                <nav className="h-full overflow-y-auto p-4 flex flex-col gap-2">
                  {/* Language Selector */}
                  <div className="mb-4">
                    <div className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                      {t("header.nav.language")}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => i18n.changeLanguage("en")}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium ${
                          currentLang === "en"
                            ? "bg-foreground text-background"
                            : "bg-muted text-foreground"
                        }`}
                      >
                        🇺🇸 English
                      </button>
                      <button
                        onClick={() => i18n.changeLanguage("es")}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium ${
                          currentLang === "es"
                            ? "bg-foreground text-background"
                            : "bg-muted text-foreground"
                        }`}
                      >
                        🇩🇴 Español
                      </button>
                    </div>
                  </div>

                  {/* Courses */}
                  <Link
                    to="/courses"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="py-3 px-4 text-foreground hover:bg-muted rounded-lg transition-colors font-medium"
                  >
                    {t("header.nav.courses")}
                  </Link>

                  <hr className="my-2 border-border" />

                  {/* Solutions Button */}
                  <button
                    onClick={() => setMobileSubMenu("solutions")}
                    className="py-3 px-4 flex justify-between items-center text-foreground hover:bg-muted rounded-lg transition-colors font-medium"
                  >
                    {t("header.nav.solutions")}
                    <ChevronDown className="w-4 h-4 -rotate-90" />
                  </button>

                  <hr className="my-2 border-border" />

                  {/* Teams */}
                  <Link
                    to="/team"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="py-3 px-4 text-foreground hover:bg-muted rounded-lg transition-colors font-medium"
                  >
                    {t("header.nav.team")}
                  </Link>

                  <hr className="my-2 border-border" />

                  {/* Company Button */}
                  <button
                    onClick={() => setMobileSubMenu("company")}
                    className="py-3 px-4 flex justify-between items-center text-foreground hover:bg-muted rounded-lg transition-colors font-medium"
                  >
                    {t("header.nav.company")}
                    <ChevronDown className="w-4 h-4 -rotate-90" />
                  </button>

                  <hr className="my-2 border-border" />

                  {/* Contact */}
                  <Link
                    to="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="py-3 px-4 text-foreground hover:bg-muted rounded-lg transition-colors font-medium"
                  >
                    {t("header.nav.contact")}
                  </Link>

                  <hr className="my-2 border-border" />
                  <Link
                    to="/#"
                    className="py-3 px-4 text-foreground hover:bg-muted rounded-lg transition-colors font-medium"
                  >
                    {t("header.nav.login")}
                  </Link>
                  <Link to="/#">
                    <Button className="bg-foreground text-background hover:bg-foreground/90 mt-2 gap-2 p-6 w-[100%]">
                      <Crown className="w-4 h-4" />
                      {t("header.nav.signup")}
                    </Button>
                  </Link>
                </nav>
              </div>

              {/* Solutions Submenu */}
              <div
                className={`absolute inset-0 transition-transform duration-300 ${
                  mobileSubMenu === "solutions"
                    ? "translate-x-0"
                    : "translate-x-full"
                }`}
              >
                <div className="h-full overflow-y-auto p-4 flex flex-col gap-2">
                  <button
                    onClick={() => setMobileSubMenu("none")}
                    className="flex items-center gap-2 text-sm font-medium mb-4 text-primary"
                  >
                    ← {t("header.nav.back")}
                  </button>

                  {solutionsSections.map((section) => (
                    <div key={section.title} className="mb-4">
                      <div className="text-xs font-semibold uppercase text-muted-foreground mb-2">
                        {section.title}
                      </div>
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
              </div>

              {/* Company Submenu */}
              <div
                className={`absolute inset-0 transition-transform duration-300 ${
                  mobileSubMenu === "company"
                    ? "translate-x-0"
                    : "translate-x-full"
                }`}
              >
                <div className="h-full overflow-y-auto p-4 flex flex-col gap-2">
                  <button
                    onClick={() => setMobileSubMenu("none")}
                    className="flex items-center gap-2 text-sm font-medium mb-4 text-primary"
                  >
                    ← {t("header.nav.back")}
                  </button>

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
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

import { useState, useEffect } from "react";
import { Menu, X, Crown, ChevronDown, GraduationCap, Plane, Home, BookOpen, Handshake } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const solutionsLinks = [
    { label: "DAIA Education", href: "/education", icon: GraduationCap, description: "AI-powered learning platform" },
    { label: "DAIA Tourism", href: "/tourism", icon: Plane, description: "Coming Soon" },
    { label: "DAIA Real Estate", href: "/real-estate", icon: Home, description: "Coming Soon" },
  ];

  const navLinks = [
    { label: "Courses", href: "/courses", isAnchor: false, icon: BookOpen },
    { label: "Teams", href: "/teams", isAnchor: false },
    { label: "Partner", href: "/contact", isAnchor: false, icon: Handshake },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-xl shadow-sm border-b border-border/50" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto section-padding">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src={"/assets/logo.png"} alt="Dominican AI Association" className="h-10 lg:h-12 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {/* Courses Link - First */}
            <Link to="/courses" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
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
                <ChevronDown className={`w-4 h-4 transition-transform ${isSolutionsOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Dropdown Menu */}
              {isSolutionsOpen && (
                <div className="absolute top-full left-0 pt-2">
                  <div className="bg-background/95 backdrop-blur-xl border border-border rounded-xl shadow-xl p-2 min-w-[240px]">
                    {solutionsLinks.map((item) => (
                      <Link
                        key={item.label}
                        to={item.href}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <item.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-foreground">{item.label}</div>
                          <div className="text-xs text-muted-foreground">{item.description}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Teams Link - Third */}
            <Link to="/teams" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Team
            </Link>

            {/* Partner Link - Fourth */}
            <Link to="/contact" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Contact
            </Link>

            <Link to="/partner" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Partner
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
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
            className="md:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border shadow-lg">
            <nav className="flex flex-col p-4 gap-2">
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
                {solutionsLinks.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 py-3 px-4 text-foreground hover:bg-muted rounded-lg transition-colors"
                  >
                    <item.icon className="w-5 h-5 text-primary" />
                    <div>
                      <div className="text-sm font-medium">{item.label}</div>
                      <div className="text-xs text-muted-foreground">{item.description}</div>
                    </div>
                  </Link>
                ))}
              </div>

              <hr className="my-2 border-border" />

              {/* Teams Link - Third */}
              <Link
                to="/teams"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-3 px-4 text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                Teams
              </Link>

              {/* Partner Link - Fourth */}
              <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-3 px-4 text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                Partner
              </Link>

              <hr className="my-2 border-border" />
              <a href="#" className="py-3 px-4 text-muted-foreground hover:bg-muted rounded-lg transition-colors">
                Login
              </a>
              <Button className="bg-foreground text-background hover:bg-foreground/90 mt-2 gap-2">
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

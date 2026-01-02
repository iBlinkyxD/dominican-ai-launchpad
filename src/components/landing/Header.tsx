import { useState, useEffect } from "react";
import { Menu, X, Crown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Courses", href: isHomePage ? "#stats" : "/#stats", isAnchor: true },
    { label: "Teams", href: "/teams", isAnchor: false },
    { label: "Reviews", href: isHomePage ? "#feedback" : "/#feedback", isAnchor: true },
    { label: "Contact", href: isHomePage ? "#footer" : "/#footer", isAnchor: true },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-background/80 backdrop-blur-xl shadow-sm border-b border-border/50"
        : "bg-transparent"
        }`}
    >
      <div className="container mx-auto section-padding">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src={'/assets/logo.png'} alt="Dominican AI Association" className="h-10 lg:h-12 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              link.isAnchor ? (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              )
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-6">
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
              {navLinks.map((link) => (
                link.isAnchor ? (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="py-3 px-4 text-foreground hover:bg-muted rounded-lg transition-colors"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="py-3 px-4 text-foreground hover:bg-muted rounded-lg transition-colors"
                  >
                    {link.label}
                  </Link>
                )
              ))}
              <hr className="my-2 border-border" />
              <a
                href="#"
                className="py-3 px-4 text-muted-foreground hover:bg-muted rounded-lg transition-colors"
              >
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

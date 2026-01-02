import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Courses", href: "#stats" },
    { label: "Reviews", href: "#feedback" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#footer" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl shadow-lg border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto section-padding">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3">
            <img src={logo} alt="Dominican AI Association" className="h-10 lg:h-12 w-auto" />
            <span className="hidden sm:block font-display font-semibold text-lg text-foreground">
              Dominican AI
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Log in
            </a>
            <Button className="btn-glossy text-primary-foreground rounded-full px-6">
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
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-3 px-4 text-foreground hover:bg-muted rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <hr className="my-2 border-border" />
              <a
                href="#"
                className="py-3 px-4 text-muted-foreground hover:bg-muted rounded-lg transition-colors"
              >
                Log in
              </a>
              <Button className="btn-glossy text-primary-foreground mt-2">
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

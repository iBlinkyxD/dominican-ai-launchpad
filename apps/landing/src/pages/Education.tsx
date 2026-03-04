import { Link } from "react-router-dom";
import { GraduationCap, BookOpen, Users, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

const Education = () => {
  const features = [
    {
      icon: GraduationCap,
      title: "AI-Powered Learning",
      description: "Personalized curriculum adapted to your learning pace and style.",
    },
    {
      icon: BookOpen,
      title: "Expert-Led Courses",
      description: "Learn from industry professionals and AI specialists.",
    },
    {
      icon: Users,
      title: "Community Learning",
      description: "Join a network of learners and collaborate on projects.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">DAIA Education Portal</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
            Transform Your Future
            <br />
            <span className="text-primary">with AI Education</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Access world-class AI education programs designed for the Dominican Republic. 
            Learn, grow, and lead the AI revolution.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 gap-2"
            >
              Login to Portal
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="rounded-full px-8 border-border hover:bg-muted"
            >
              Create Account
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="relative rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-primary/20 p-12 text-center overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/5" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Ready to Start Learning?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Join thousands of students already transforming their careers with AI education.
              </p>
              <Button 
                size="lg" 
                className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-8"
              >
                Get Started Today
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Education;

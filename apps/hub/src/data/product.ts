import { GraduationCap, Monitor, Smartphone, Brain, TreePalm, Earth, Home, ShieldCheck, LucideIcon, Ear } from "lucide-react";

export interface Product {
  icon: LucideIcon;
  name: string;
  description: string;
  category: string;
}

export const allProducts: Product[] = [
  {
    icon: Monitor,
    name: "Educa One",
    description:
      "Transforming education through AI-powered learning solutions",
    category: "DAIA Education",
  },
  {
    icon: Smartphone,
    name: "Scholar One",
    description: "Academic excellence with intelligent tutoring systems",
    category: "DAIA Education",
  },
  {
    icon: Brain,
    name: "Quisqueya AI",
    description: "Personalized learning experiences for Dominican students",
    category: "DAIA Education",
  },
  {
    icon: TreePalm,
    name: "Isla Intelligence",
    description: "Smart tourism insights for the Dominican Republic",
    category: "DAIA Tourism",
  },
  {
    icon: Earth,
    name: "Cultura Connect",
    description: "Connect travelers with authentic cultural experiences",
    category: "DAIA Tourism",
  },
  {
    icon: Home,
    name: "Terra Vision AI",
    description: "AI-powered property insights and market analysis",
    category: "DAIA Real Estate",
  },
  {
    icon: ShieldCheck,
    name: "Title Trust DR",
    description: "Secure and transparent property title verification",
    category: "DAIA Real Estate",
  },
];

export const restrictedApps = [
  "Scholar One",
  "Isla Intelligence",
  "Terra Vision AI",
];
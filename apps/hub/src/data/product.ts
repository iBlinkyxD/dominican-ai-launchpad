export interface Product {
  name: string;
  description: string;
  category: string;
}

export const allProducts: Product[] = [
  {
    name: "Educa One",
    description:
      "Transforming education through AI-powered learning solutions",
    category: "DAIA Education",
  },
  {
    name: "Scholar One",
    description: "Academic excellence with intelligent tutoring systems",
    category: "DAIA Education",
  },
  {
    name: "Quisqueya AI",
    description: "Personalized learning experiences for Dominican students",
    category: "DAIA Education",
  },
  {
    name: "Isla Intelligence",
    description: "Smart tourism insights for the Dominican Republic",
    category: "DAIA Tourism",
  },
  {
    name: "Cultura Connect",
    description: "Connect travelers with authentic cultural experiences",
    category: "DAIA Tourism",
  },
  {
    name: "Terra Vision AI",
    description: "AI-powered property insights and market analysis",
    category: "DAIA Real Estate",
  },
  {
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
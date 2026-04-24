import { GraduationCap, Bot, Sprout, Rocket, Search } from "lucide-react";

export interface ServiceDetail {
  slug: string;
  name: string;
  headline: string;
  subheadline: string;
  description: string;
  price: string;
  priceNote: string;
  buttonText: string;
  buttonColor: string;
  gradientFrom: string;
  gradientTo: string;
  icon: any;
  badge?: string;
  features: string;
}

export const serviceDetail: ServiceDetail[] = [
  {
    slug: "enterprise-ai-solutions",
    name: "services.aiBusinessAudit.name",
    headline: "services.aiBusinessAudit.headline",
    subheadline: "services.aiBusinessAudit.subheadline",
    description: "services.aiBusinessAudit.description",
    price: "services.aiBusinessAudit.price",
    priceNote: "services.aiBusinessAudit.priceNote",
    buttonText: "services.aiBusinessAudit.buttonText",
    buttonColor: "#BD2D2F",
    gradientFrom: "#BD2D2F",
    gradientTo: "#d94245",
    icon: Search,
    features: "services.aiBusinessAudit.features",
  },
  {
    slug: "enterprise-ai-upgrade",
    name: "services.corporateTraining.name",
    headline: "services.corporateTraining.headline",
    subheadline: "services.corporateTraining.subheadline",
    description: "services.corporateTraining.description",
    price: "services.corporateTraining.price",
    priceNote: "services.corporateTraining.priceNote",
    buttonText: "services.corporateTraining.buttonText",
    buttonColor: "#9AA8B7",
    gradientFrom: "#9AA8B7",
    gradientTo: "#b5c2d1",
    icon: GraduationCap,
    features: "services.corporateTraining.features",
  },
  {
    slug: "ai-agent-installation",
    name: "services.agentInstallation.name",
    headline: "services.agentInstallation.headline",
    subheadline: "services.agentInstallation.subheadline",
    description: "services.agentInstallation.description",
    price: "services.agentInstallation.price",
    priceNote: "services.agentInstallation.priceNote",
    buttonText: "services.agentInstallation.buttonText",
    buttonColor: "#002D62",
    gradientFrom: "#002D62",
    gradientTo: "#0a4a8a",
    icon: Bot,
    features: "services.agentInstallation.features",
  },
  {
    slug: "ai-growth-engine",
    name: "services.growthEngine.name",
    headline: "services.growthEngine.headline",
    subheadline: "services.growthEngine.subheadline",
    description: "services.growthEngine.description",
    price: "services.growthEngine.price",
    priceNote: "services.growthEngine.priceNote",
    buttonText: "services.growthEngine.buttonText",
    buttonColor: "#D4AF37",
    gradientFrom: "#D4AF37",
    gradientTo: "#e8c95f",
    icon: Sprout,
    features: "services.growthEngine.features",
  },
];

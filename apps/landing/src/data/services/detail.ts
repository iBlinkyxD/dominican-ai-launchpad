import {
  GraduationCap,
  Bot,
  Sprout,
  Rocket,
  Search,
  Megaphone,
  Clapperboard
} from "lucide-react";

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
  stripeUrl: string;
}

export const serviceDetail: ServiceDetail[] = [
  {
    slug: "content-management",
    name: "services.contentManagement.name",
    headline: "services.contentManagement.headline",
    subheadline: "services.contentManagement.subheadline",
    description: "services.contentManagement.description",
    price: "services.contentManagement.price",
    priceNote: "services.contentManagement.priceNote",
    buttonText: "services.contentManagement.buttonText",
    buttonColor: "#BD2D2F",
    gradientFrom: "#BD2D2F",
    gradientTo: "#d94245",
    icon: Clapperboard,
    features: "services.contentManagement.features",
    stripeUrl: import.meta.env.VITE_STRIPE_CONTENT_MANAGEMENT,
  },
  {
    slug: "ai-business-audit",
    name: "services.aiBusinessAudit.name",
    headline: "services.aiBusinessAudit.headline",
    subheadline: "services.aiBusinessAudit.subheadline",
    description: "services.aiBusinessAudit.description",
    price: "services.aiBusinessAudit.price",
    priceNote: "services.aiBusinessAudit.priceNote",
    buttonText: "services.aiBusinessAudit.buttonText",
    buttonColor: "#9AA8B7",
    gradientFrom: "#9AA8B7",
    gradientTo: "#b5c2d1",
    icon: Search,
    features: "services.aiBusinessAudit.features",
    stripeUrl: import.meta.env.VITE_STRIPE_BUSINESS_AUDIT,
  },
  {
    slug: "corporate-ai-training",
    name: "services.corporateTraining.name",
    headline: "services.corporateTraining.headline",
    subheadline: "services.corporateTraining.subheadline",
    description: "services.corporateTraining.description",
    price: "services.corporateTraining.price",
    priceNote: "services.corporateTraining.priceNote",
    buttonText: "services.corporateTraining.buttonText",
    buttonColor: "#002D62",
    gradientFrom: "#002D62",
    gradientTo: "#0a4a8a",
    icon: GraduationCap,
    features: "services.corporateTraining.features",
    stripeUrl: import.meta.env.VITE_STRIPE_CORPORATE_TRAINING,
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
    buttonColor: "#D4AF37",
    gradientFrom: "#D4AF37",
    gradientTo: "#e8c95f",
    icon: Bot,
    features: "services.agentInstallation.features",
    stripeUrl: import.meta.env.VITE_STRIPE_AGENT_INSTALLATION,
  },
];

import { School, GraduationCap, Building2, ChevronRight } from "lucide-react";
import escuelaPrimeraJesusMaestro from "@/assets/partner/escuela-primera-jesus-maestro.jpeg";
import apolloE from "@/assets/partner/apollo-e.jpeg";
import intec from "@/assets/partner/intec.jpeg";

export interface PartnerDetail {
  slug: string;
  name: string;
  role: string;
  location: string;
  image: string;
  thumbnail: string;
  icon: any,
}

export const partnerDetail: PartnerDetail[] = [
  {
    slug: "escuela-primera-jesus-maestro",
    name: "Escuela Primera Jesus Maestro",
    role: "School",
    location: "Santo Domingo, Dominican Republic",
    image: escuelaPrimeraJesusMaestro,
    thumbnail: escuelaPrimeraJesusMaestro,
    icon: School,
  },
  {
    slug: "apollo-e",
    name: "Apollo-E Inc.",
    role: "Company",
    location: "Miami, Florida",
    image: apolloE,
    thumbnail: apolloE,
    icon: Building2,
  },
  {
    slug: "intec",
    name: "Instituto Tecnológico de Santo Domingo",
    role: "University",
    location: "Santo Domingo, Dominican Republic",
    image: intec,
    thumbnail: intec,
    icon: GraduationCap,
  },
];

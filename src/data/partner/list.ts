import { School, GraduationCap, Building2, ChevronRight } from "lucide-react";
import escuelaPrimeraJesusMaestro from "@/assets/partner/escuela-primera-jesus-maestro.jpeg";
import apolloE from "@/assets/partner/apollo-e.jpeg";
import intec from "@/assets/partner/intec.jpeg";

import { partnerDetail } from "./detail";

export interface Partner {
  slug: string;
  name: string;
  role: string;
  location: string;
  image: string;
}

export const partners: Partner[] = Object.values(partnerDetail).map((partner) => ({
  slug: partner.slug,
  name: partner.name,
  role: partner.roleKey,
  location: partner.location,
  image: partner.image,
}));

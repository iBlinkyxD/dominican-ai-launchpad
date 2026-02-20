import pursuitWisdomScholarship from "@/assets/initiative/pursuit-of-wisdom-scholarship.jpeg";
import lightlinkproject from "@/assets/initiative/light-link-project.jpeg";
export interface InitiativeDetail {
  slug: string;
  name: string;
  subtext: string;
  image: string;
}

export const initiativeDetail: InitiativeDetail[] = [
  {
    slug: "light-link-project",
    name: "Light-Link Project",
    subtext: "Lightlink is an initiative that allows individuals and families to adopt a computer for a school in the Dominican Republic, directly equipping students with access to modern education, AI tools, and life-changing digital opportunity — with DAIA serving as the bridge that empowers others to be the light.",
    image: lightlinkproject,
  },
  {
    slug: "pursuit-of-wisdom-scholarship",
    name: "Pursuit of Wisdom Scholarship",
    subtext: "The Pursuit of Wisdom Scholarship, delivered through MINNECT, equips students in the Dominican Republic with structured access to international experts, meaningful dialogue, and guided mentorship — transforming curiosity into intentional inquiry, and positioning DAIA as the bridge that connects young minds to global wisdom.",
    image: pursuitWisdomScholarship,
  },
];

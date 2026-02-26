import pursuitWisdomScholarship from "@/assets/initiative/pursuit-of-wisdom-scholarship.jpeg";
import lightlinkproject from "@/assets/initiative/light-link-project.jpeg";
import communityProblemSolvers from "@/assets/initiative/community-problem-solvers.jpeg";

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
    subtext: "lightLinkProject",
    image: lightlinkproject,
  },
  {
    slug: "pursuit-of-wisdom-scholarship",
    name: "Pursuit of Wisdom Scholarship",
    subtext: "pursuitWisdomScholarship",
    image: pursuitWisdomScholarship,
  },
    {
    slug: "community-problem-solvers",
    name: "DAIA Community Problem Solvers (CPS)",
    subtext: "communityProblemSolvers",
    image: communityProblemSolvers,
  },
];

import pursuitWisdomScholarship from "@/assets/initiative/pursuit-of-wisdom-scholarship.jpeg";
import lightlinkproject from "@/assets/initiative/light-link-project.jpeg";
import daiaCPS1 from "@/assets/initiative/DAIA-CPS/DAIA-CPS-1.jpeg";
import daiaCPS2 from "@/assets/initiative/DAIA-CPS/DAIA-CPS-2.jpeg";

export interface InitiativeDetail {
  slug: string;
  name: string;
  shortName: string;
  subtext: string;
  image: {
    src: string;
    text: string;
    text2: string;
  }[];
}

export const initiativeDetail: InitiativeDetail[] = [
  {
    slug: "light-link-project",
    name: "Light-Link Project",
    shortName: "Light-Link Project",
    subtext: "lightLinkProject",
    image: [
      {
        src: lightlinkproject,
        text: "Students collaborating during the Light-Link workshop.",
        text2: "Lorem"
      },
    ],
  },
  {
    slug: "pursuit-of-wisdom-scholarship",
    name: "Pursuit of Wisdom Scholarship",
    shortName: "Pursuit of Wisdom Scholarship",
    subtext: "pursuitWisdomScholarship",
    image: [
      {
        src: pursuitWisdomScholarship,
        text:
          "Recipients of the Pursuit of Wisdom Scholarship celebrating their achievement.",
        text2: "lorem"
      },
    ],
  },
  {
    slug: "daia-community-problem-solvers",
    name: "DAIA Community Problem Solvers (CPS)",
    shortName: "DAIA CPS",
    subtext: "communityProblemSolvers",
    image: [
      {
        src: daiaCPS1,
        text: "Watson Valcourt & John Presimé",
        text2: "Flood Disaster"
      },
      {
        src: daiaCPS2,
        text: "Sabaneta de Yásica",
        text2: "Puerto Plata",
      },
    ],
  },
];

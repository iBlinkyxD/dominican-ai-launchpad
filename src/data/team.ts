import elbaAbreu from "@/assets/team/elba-abreu.jpeg";
import luisDorismon from "@/assets/team/luis-dorismon.jpeg";
import emelysRivera from "@/assets/team/emelys-rivera.jpeg";
import solomon from "@/assets/team/solomon.jpeg";
import rosaAzcona from "@/assets/team/rosa-azcona.jpeg";
import kevinJoa from "@/assets/team/kevin-joa.jpeg";

export interface TeamMember {
  id: number;
  name: string;
  roleKey: string;
  image: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Elba Abreu",
    roleKey: "legalCounsel",
    image: elbaAbreu,
  },
  {
    id: 2,
    name: "Luis Dorismon",
    roleKey: "vicePresident",
    image: luisDorismon,
  },
  {
    id: 3,
    name: "Emelys Rivera",
    roleKey: "controller",
    image: emelysRivera,
  },
  {
    id: 4,
    name: "Salomón / Solomon",
    roleKey: "chiefSteward",
    image: solomon,
  },
  {
    id: 5,
    name: "Rosa Azcona",
    roleKey: "coordinator",
    image: rosaAzcona,
  },
  {
    id: 6,
    name: "Kevin Joa",
    roleKey: "softwareDeveloper",
    image: kevinJoa,
  },
];

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enHome from "@/locales/en/home.json";
import enCourses from "@/locales/en/courses.json";
import enComingSoon from "@/locales/en/comingSoon.json";
import enTeam from "@/locales/en/team.json";
import enPartner from "@/locales/en/partner.json";
import enContact from "@/locales/en/contact.json";

import esHome from "@/locales/es/home.json";
import esCourses from "@/locales/es/courses.json";
import esComingSoon from "@/locales/es/comingSoon.json";
import esTeam from "@/locales/es/team.json";
import esPartner from "@/locales/es/partner.json";
import esContact from "@/locales/es/contact.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        home: enHome,
        courses: enCourses,
        comingSoon: enComingSoon,
        team: enTeam,
        partner: enPartner,
        contact: enContact,
      },
      es: {
        home: esHome,
        courses: esCourses,
        comingSoon: esComingSoon,
        team: esTeam,
        partner: esPartner,
        contact: esContact,
      },
    },
    fallbackLng: "en",
    debug: true,

    ns: ["home", "courses", "comingSoon", "team", "partner", "contact"],
    defaultNS: "home",

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

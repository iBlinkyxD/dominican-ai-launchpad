import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enHome from "@/locales/en/home.json";
import enCourses from "@/locales/en/courses.json";
import enComingSoon from "@/locales/en/comingSoon.json";
import enTeam from "@/locales/en/team.json";
import enPartner from "@/locales/en/partner.json";
import enContact from "@/locales/en/contact.json";
import enInitiatives from "@/locales/en/initiatives.json";
import enNews from "@/locales/en/news.json";
import enServices from "@/locales/en/services.json";

import esHome from "@/locales/es/home.json";
import esCourses from "@/locales/es/courses.json";
import esComingSoon from "@/locales/es/comingSoon.json";
import esTeam from "@/locales/es/team.json";
import esPartner from "@/locales/es/partner.json";
import esContact from "@/locales/es/contact.json";
import esInitiatives from "@/locales/es/initiatives.json";
import esNews from "@/locales/es/news.json";
import esServices from "@/locales/es/services.json";

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
        initiatives: enInitiatives,
        news: enNews,
        services: enServices,
      },
      es: {
        home: esHome,
        courses: esCourses,
        comingSoon: esComingSoon,
        team: esTeam,
        partner: esPartner,
        contact: esContact,
        initiatives: esInitiatives,
        news: esNews,
        services: esServices,
      },
    },
    fallbackLng: "en",
    debug: true,

    ns: ["home", "courses", "comingSoon", "team", "partner", "contact", "initiatives", "news", "services"],
    defaultNS: "home",

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

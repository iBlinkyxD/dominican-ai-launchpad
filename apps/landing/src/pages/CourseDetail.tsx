import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { EnrollmentModal } from "@/components/landing/EnrollmentModal";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { ScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  Star, Clock, Users, BookOpen, Check, ChevronRight, Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { instructors } from "@/data/courses/instructor";
import { courseDetail } from "@/data/courses/detail";
import { useTranslation } from "react-i18next";

const STEP_META = [
  { numeral: "I",   badgeRed: false, active: false },
  { numeral: "II",  badgeRed: false, active: false },
  { numeral: "III", badgeRed: true,  active: true  },
  { numeral: "IV",  badgeRed: false, active: false },
];

type StepTranslation    = { timing: string; title: string; desc: string; badge: string };
type GoodToKnowItem     = { title: string; body: string };

const CourseDetail = () => {
  const { courseId } = useParams();
  const { t } = useTranslation("courses");
  const course = courseDetail[courseId as keyof typeof courseDetail];

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-20 text-center">
          <h1 className="text-2xl font-bold text-foreground">{t("courseDetail.notFound.title")}</h1>
          <Link to="/courses" className="text-primary hover:underline mt-4 inline-block">
            {t("courseDetail.notFound.back")}
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const [showModal, setShowModal] = useState(false);

  const instructor   = instructors[course.instructorId as keyof typeof instructors];
  const isTutoring   = course.slug === "1on1-virtual-tutoring";

  const title        = t(`coursesDetails.${course.i18nKey}.title`);
  const subtitle     = t(`coursesDetails.${course.i18nKey}.subtitle`);
  const duration     = t(`coursesDetails.${course.i18nKey}.duration`);
  const benefits     = t(`coursesDetails.${course.i18nKey}.benefits`,   { returnObjects: true }) as string[];
  const requirements = t(`coursesDetails.${course.i18nKey}.requirements`, { returnObjects: true }) as string[];
  const whatToExpect = t(`coursesDetails.${course.i18nKey}.whatToExpect`);
  const curriculum   = t(`coursesDetails.${course.i18nKey}.curriculum`,  { returnObjects: true }) as { title: string; lessons: string[] }[];
  const tags         = t(`coursesDetails.${course.i18nKey}.tags`,        { returnObjects: true }) as string[];

  const stepTranslations  = t("courseDetail.howItWorks.steps",    { returnObjects: true }) as StepTranslation[];
  const howItWorksSteps   = STEP_META.map((meta, i) => ({ ...meta, ...stepTranslations[i] }));
  const goodToKnowItems   = t("courseDetail.goodToKnow.items",    { returnObjects: true }) as GoodToKnowItem[];
  const tutoringFeatures  = t("courseDetail.card.tutoringFeatures", { returnObjects: true }) as string[];

  return (
    <div className="min-h-screen bg-background">
      {showModal && <EnrollmentModal onClose={() => setShowModal(false)} />}
      <Header />

      <main className="pt-24 pb-0">
        {/* Breadcrumb */}
        <div className="bg-muted/30 border-b border-border">
          <div className="container mx-auto px-6 py-4">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary transition-colors">{t("courseDetail.breadcrumb.home")}</Link>
              <ChevronRight className="w-4 h-4" />
              <Link to="/courses" className="hover:text-primary transition-colors">{t("courseDetail.breadcrumb.courses")}</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground font-medium">{title}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="py-12 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-10 items-start">
              {/* Left column */}
              <div className="lg:col-span-2 space-y-6">
                <ScrollAnimation animation="fade-up">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tags?.map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{title}</h1>
                  <p className="text-muted-foreground text-lg mb-6">{subtitle}</p>

                  <div className="flex flex-wrap items-center gap-5 text-sm">
                    <div className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold text-foreground">{course.rating}</span>
                      <span className="text-muted-foreground">({course.reviews} {t("courseDetail.hero.reviews")})</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{duration}</span>
                    </div>
                    {course.students > 0 && (
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span>{course.students.toLocaleString()} {t("courseDetail.hero.students")}</span>
                      </div>
                    )}
                  </div>
                </ScrollAnimation>

                {/* Course image */}
                <ScrollAnimation animation="fade-up" delay={100}>
                  <div className="relative aspect-video rounded-2xl overflow-hidden shadow-md">
                    <img src={course.image} alt={title} className="w-full h-full object-cover" />
                    {isTutoring && (
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E40]/75 to-transparent flex items-end p-6">
                        <p className="text-white text-lg font-semibold">
                          {t("courseDetail.hero.imageOverlay")}
                        </p>
                      </div>
                    )}
                  </div>
                </ScrollAnimation>
              </div>

              {/* Right — sticky card */}
              <div className="lg:col-span-1">
                <ScrollAnimation animation="fade-left">
                  <div className="bg-card border border-border rounded-2xl p-6 sticky top-24 shadow-lg">
                    {/* Red accent line */}
                    <div className="w-8 h-1 bg-[#C72B2B] rounded-full mb-4" />

                    {/* Plan label */}
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#0B1E40] mb-2">
                      {isTutoring ? t("courseDetail.card.monthlyPlan") : t("courseDetail.card.oneTimePurchase")}
                    </p>

                    {/* Card title */}
                    <h3 className="text-xl font-semibold text-[#0B1E40] leading-snug mb-5">{title}</h3>

                    {/* Price */}
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="text-sm font-medium text-muted-foreground">US$</span>
                      <span className="text-5xl font-semibold text-foreground">{course.price}</span>
                      {isTutoring && (
                        <span className="text-sm text-muted-foreground">{t("courseDetail.card.perMonth")}</span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-5">
                      {isTutoring ? t("courseDetail.card.billingNote") : t("courseDetail.card.oneTimeNote")}
                    </p>

                    <div className="border-t border-border mb-5" />

                    {/* Feature checklist */}
                    <ul className="space-y-3 mb-6">
                      {(isTutoring ? tutoringFeatures : [
                        `${course.lessons} ${t("courseDetail.card.onDemandLessons")}`,
                        `${duration} ${t("courseDetail.card.videoContent")}`,
                        t("courseDetail.card.ownPace"),
                        t("courseDetail.card.certificate"),
                      ]).map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="w-5 h-5 rounded-full bg-[#0B1E40] flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-white" />
                          </span>
                          <span className="text-sm text-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA button */}
                    <Button
                      onClick={() => isTutoring && setShowModal(true)}
                      className="w-full bg-[#C72B2B] hover:bg-[#C72B2B]/90 h-12 text-sm font-semibold rounded-lg mb-3"
                    >
                      {isTutoring ? t("courseDetail.card.joinWaitlist") : t("courseDetail.card.enrollNow")}
                    </Button>

                    {/* Stripe badge */}
                    <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground uppercase tracking-widest">
                      <Lock className="w-3 h-3" /> {t("courseDetail.card.securedByStripe")}
                    </p>
                  </div>
                </ScrollAnimation>
              </div>
            </div>
          </div>
        </section>

        {/* Promise / Guarantee — tutoring only */}
        {isTutoring && (
          <section className="py-16 bg-[#0B1E40]">
            <div className="container mx-auto px-6">
              <ScrollAnimation animation="fade-up">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                  {/* Left */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-px bg-[#C9A84C]" />
                      <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C]">
                        {t("courseDetail.promise.eyebrow")}
                      </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-semibold text-white leading-tight">
                      {t("courseDetail.promise.titleStart")}{" "}
                      <em className="text-[#C9A84C]">{t("courseDetail.promise.titleMatch")}</em>
                      <br className="md:hidden lg:block" />
                      {" "}<em className="text-[#C9A84C]">{t("courseDetail.promise.titleGuarantee")}</em>
                    </h2>
                  </div>

                  {/* Right */}
                  <div className="space-y-5 text-white/75 leading-relaxed">
                    <p>
                      {t("courseDetail.promise.p1Pre")}{" "}
                      <strong className="text-white font-semibold">{t("courseDetail.promise.p1Bold")}</strong>{" "}
                      {t("courseDetail.promise.p1Post")}
                    </p>
                    <p>{t("courseDetail.promise.p2")}</p>
                    <p>
                      {t("courseDetail.promise.p3Pre")}{" "}
                      <strong className="text-white font-semibold">{t("courseDetail.promise.p3Bold")}</strong>{" "}
                      {t("courseDetail.promise.p3Post")}
                    </p>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </section>
        )}

        {/* How It Works — tutoring only */}
        {isTutoring && (
          <section className="py-16 bg-[#ffffff]">
            <div className="container mx-auto px-6">
              <ScrollAnimation animation="fade-up">
                {/* Header row */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-16">
                  <h2 className="text-3xl md:text-4xl font-semibold text-[#0B1E40] leading-tight">
                    {t("courseDetail.howItWorks.titleStart")}{" "}
                    <em className="text-[#C72B2B]">{t("courseDetail.howItWorks.titleEnd")}</em>
                  </h2>
                  <p className="text-sm text-muted-foreground max-w-sm md:text-right leading-relaxed">
                    {t("courseDetail.howItWorks.subtitle")}
                  </p>
                </div>

                {/* Steps with timeline */}
                <div className="relative grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
                  {/* Horizontal connector line — desktop only */}
                  <div className="hidden lg:block absolute top-7 left-7 right-7 h-px bg-[#0B1E40]/20" />

                  {howItWorksSteps.map((step) => (
                    <div key={step.numeral} className="flex flex-row lg:flex-col gap-5 lg:gap-0">
                      {/* Circle */}
                      <div className={`w-14 h-14 rounded-full border-2 flex items-center justify-center shrink-0 relative z-10 mb-0 lg:mb-8 ${
                        step.active
                          ? "bg-[#C72B2B] border-[#C72B2B] text-white"
                          : "bg-[#F8F7F4] border-[#0B1E40] text-[#0B1E40]"
                      }`}>
                        <span className="text-sm italic font-medium">{step.numeral}</span>
                      </div>

                      {/* Content */}
                      <div className="flex flex-col">
                        <p className="text-xs font-bold text-[#C72B2B] uppercase tracking-wider mb-2">{step.timing}</p>
                        <h3 className="text-lg font-semibold text-[#0B1E40] mb-2">{step.title}</h3>
                        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{step.desc}</p>
                        <span className={`self-start text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded border ${
                          step.badgeRed
                            ? "bg-[#C72B2B] text-white border-[#C72B2B]"
                            : "border-border text-foreground bg-gray-200"
                        }`}>
                          {step.badge}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollAnimation>
            </div>
          </section>
        )}

        {/* Good to Know — tutoring only */}
        {isTutoring && (
          <section className="py-16 bg-[#F8F7F4]">
            <div className="container mx-auto px-6 lg:px-48">
              <ScrollAnimation animation="fade-up">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-10">
                  {t("courseDetail.goodToKnow.eyebrow")}
                </p>
                <div className="grid lg:grid-cols-2 gap-x-16 gap-y-10">
                  {goodToKnowItems.map(({ title: itemTitle, body }) => (
                    <div key={itemTitle}>
                      <h3 className="text-[19px] font-semibold text-[#0B1E40] mb-2">{itemTitle}</h3>
                      <p className="text-[14.5px] text-muted-foreground leading-relaxed">{body}</p>
                    </div>
                  ))}
                </div>
              </ScrollAnimation>
            </div>
          </section>
        )}

        {/* CTA Banner */}
        <section className="py-20 bg-[#0B1E40]">
          <div className="container mx-auto px-6 text-center">
            <ScrollAnimation animation="fade-up">
              <p className="text-white/50 text-xs uppercase tracking-widest mb-3">{t("courseDetail.cta.brand")}</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {isTutoring ? t("courseDetail.cta.tutoringTitle") : t("courseDetail.cta.defaultTitle")}
              </h2>
              <p className="text-white/60 mb-8 max-w-2xl mx-auto">
                {isTutoring ? t("courseDetail.cta.tutoringDesc") : t("courseDetail.cta.defaultDesc")}
              </p>
              <Button
                size="lg"
                onClick={() => isTutoring && setShowModal(true)}
                className="bg-white text-[#0B1E40] hover:bg-white/90 rounded-full px-10 font-semibold"
              >
                {isTutoring ? t("courseDetail.cta.tutoringButton") : t("courseDetail.cta.defaultButton")}
              </Button>
            </ScrollAnimation>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CourseDetail;

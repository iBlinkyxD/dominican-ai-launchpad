import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is the Dominican AI Association?",
    answer: "The Dominican AI Association is the leading organization dedicated to advancing artificial intelligence education, research, and innovation in the Dominican Republic and across the Caribbean. We provide world-class courses, community support, and industry connections to help individuals and organizations harness the power of AI.",
  },
  {
    question: "Who can join the association?",
    answer: "Anyone with an interest in AI is welcome to join! Whether you're a complete beginner curious about AI, a professional looking to upskill, a student pursuing a career in tech, or an organization wanting to implement AI solutions—we have programs designed for all levels and backgrounds.",
  },
  {
    question: "What types of courses do you offer?",
    answer: "We offer a comprehensive range of AI courses including Machine Learning fundamentals, Deep Learning, Natural Language Processing, Computer Vision, Data Science, AI Ethics, and specialized tracks for business applications. All courses feature hands-on projects, real-world case studies, and are taught by industry experts.",
  },
  {
    question: "Are the courses available in Spanish?",
    answer: "Yes! All our courses are available in both Spanish and English. We believe in making AI education accessible to everyone in the Dominican Republic and Latin America, which is why we prioritize content in our native language while also offering English options for international learners.",
  },
  {
    question: "Do you offer certifications?",
    answer: "Absolutely! Upon completing our courses, you receive industry-recognized certifications that validate your skills. Our certifications are recognized by major tech companies and can significantly boost your career prospects in the AI field.",
  },
  {
    question: "How can organizations partner with you?",
    answer: "We offer various partnership opportunities including corporate training programs, research collaborations, internship placements, and sponsorship packages. Contact us through our partnership form, and our team will work with you to create a customized collaboration that meets your organization's goals.",
  },
  {
    question: "Is there financial aid available?",
    answer: "Yes, we're committed to making AI education accessible to everyone. We offer scholarships, flexible payment plans, and special discounts for students, recent graduates, and individuals from underrepresented communities. Contact our support team to learn about available options.",
  },
  {
    question: "How do I get started?",
    answer: "Getting started is easy! Simply create a free account on our platform, explore our course catalog, and enroll in the program that best fits your goals. You can also join our community Discord server to connect with fellow learners and mentors right away.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="min-h-screen flex items-center py-24 bg-muted/30">
      <div className="container mx-auto section-padding">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            FAQ
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Frequently Asked
            <span className="block gradient-text">Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our programs, membership, and community.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-card rounded-2xl px-6 border-none data-[state=open]:shadow-lg transition-all duration-300"
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-foreground hover:text-primary hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;

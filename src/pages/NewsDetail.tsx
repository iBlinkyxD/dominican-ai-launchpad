import { useParams, Link } from "react-router-dom";
import { School, GraduationCap, Building2, ChevronRight } from "lucide-react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { ScrollAnimation } from "@/hooks/useScrollAnimation";

import partner2 from "../assets/partner/partner-2.jpeg";

const newsData = {
  "1": {
    id: "1",
    title: "Cras in turpis non libero vestibulum semper",
    date: "January 29, 2026",
    category: "Product",
    thumbnail: partner2,
    partner: "DAIA + INTEC",
    text: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed lectus at ex finibus tempus. Integer eu dui augue. Nam lacinia sem nec metus tincidunt, at porta lectus pellentesque. Donec et magna euismod, tincidunt neque a, venenatis ligula. Mauris sed gravida lectus. Phasellus pellentesque non elit nec accumsan. Nulla nec auctor justo. Nam porttitor arcu diam, molestie efficitur risus auctor eu. Nam faucibus dolor id augue tincidunt, vitae malesuada eros varius. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque cursus vestibulum nisl id scelerisque. Phasellus in accumsan odio. Suspendisse consectetur sem eu ipsum tincidunt dignissim. Sed mattis nisl at sollicitudin pellentesque.",
      "Proin vel odio eget arcu iaculis vestibulum. Nulla molestie, sapien quis pharetra mattis, lacus justo vulputate nisi, sit amet ullamcorper felis tortor a sapien. Cras dui nunc, fringilla quis consectetur eget, blandit non neque. Duis rhoncus turpis eu elementum viverra. Morbi nec pellentesque erat. Nunc non leo in lectus interdum condimentum. Aenean vitae porttitor augue, nec tristique tellus. Nulla tellus enim, rutrum sed nunc nec, mattis lobortis metus. In metus nulla, interdum pellentesque arcu at, scelerisque pharetra neque. Morbi condimentum faucibus turpis a aliquet.",
      "Cras in turpis non libero vestibulum semper. Pellentesque sed metus ex. Sed dictum justo sit amet lectus viverra, bibendum tempor massa commodo. Ut sed porttitor erat. Suspendisse lorem ligula, pretium id sapien eu, gravida commodo justo. Phasellus sed bibendum ligula. Cras eget nunc finibus, porttitor velit nec, vestibulum metus. Donec at massa a nibh tincidunt rutrum. Aliquam viverra, lacus ut ultricies lacinia, arcu ante convallis risus, a imperdiet libero neque ac arcu. Donec vitae rhoncus ante.",
    ],
  },
  "2": {
    id: "2",
    title: "Duis posuere neque ac porta malesuada",
    date: "January 27, 2026",
    category: "Product",
    thumbnail: partner2,
    partner: "DAIA + Apollo-E",
    text: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed lectus at ex finibus tempus. Integer eu dui augue. Nam lacinia sem nec metus tincidunt, at porta lectus pellentesque. Donec et magna euismod, tincidunt neque a, venenatis ligula. Mauris sed gravida lectus. Phasellus pellentesque non elit nec accumsan. Nulla nec auctor justo. Nam porttitor arcu diam, molestie efficitur risus auctor eu. Nam faucibus dolor id augue tincidunt, vitae malesuada eros varius. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque cursus vestibulum nisl id scelerisque. Phasellus in accumsan odio. Suspendisse consectetur sem eu ipsum tincidunt dignissim. Sed mattis nisl at sollicitudin pellentesque.",
      "Proin vel odio eget arcu iaculis vestibulum. Nulla molestie, sapien quis pharetra mattis, lacus justo vulputate nisi, sit amet ullamcorper felis tortor a sapien. Cras dui nunc, fringilla quis consectetur eget, blandit non neque. Duis rhoncus turpis eu elementum viverra. Morbi nec pellentesque erat. Nunc non leo in lectus interdum condimentum. Aenean vitae porttitor augue, nec tristique tellus. Nulla tellus enim, rutrum sed nunc nec, mattis lobortis metus. In metus nulla, interdum pellentesque arcu at, scelerisque pharetra neque. Morbi condimentum faucibus turpis a aliquet.",
    ],
  },
  "3": {
    id: "3",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    date: "January 20, 2026",
    category: "Product",
    thumbnail: partner2,
    partner: "DAIA + Apollo-E",
    text: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed lectus at ex finibus tempus. Integer eu dui augue. Nam lacinia sem nec metus tincidunt, at porta lectus pellentesque. Donec et magna euismod, tincidunt neque a, venenatis ligula. Mauris sed gravida lectus. Phasellus pellentesque non elit nec accumsan. Nulla nec auctor justo. Nam porttitor arcu diam, molestie efficitur risus auctor eu. Nam faucibus dolor id augue tincidunt, vitae malesuada eros varius. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque cursus vestibulum nisl id scelerisque. Phasellus in accumsan odio. Suspendisse consectetur sem eu ipsum tincidunt dignissim. Sed mattis nisl at sollicitudin pellentesque.",
      "Proin vel odio eget arcu iaculis vestibulum. Nulla molestie, sapien quis pharetra mattis, lacus justo vulputate nisi, sit amet ullamcorper felis tortor a sapien. Cras dui nunc, fringilla quis consectetur eget, blandit non neque. Duis rhoncus turpis eu elementum viverra. Morbi nec pellentesque erat. Nunc non leo in lectus interdum condimentum. Aenean vitae porttitor augue, nec tristique tellus. Nulla tellus enim, rutrum sed nunc nec, mattis lobortis metus. In metus nulla, interdum pellentesque arcu at, scelerisque pharetra neque. Morbi condimentum faucibus turpis a aliquet.",
      "Cras in turpis non libero vestibulum semper. Pellentesque sed metus ex. Sed dictum justo sit amet lectus viverra, bibendum tempor massa commodo. Ut sed porttitor erat. Suspendisse lorem ligula, pretium id sapien eu, gravida commodo justo. Phasellus sed bibendum ligula. Cras eget nunc finibus, porttitor velit nec, vestibulum metus. Donec at massa a nibh tincidunt rutrum. Aliquam viverra, lacus ut ultricies lacinia, arcu ante convallis risus, a imperdiet libero neque ac arcu. Donec vitae rhoncus ante.",
      "Duis posuere neque ac porta malesuada. Mauris eget ullamcorper lorem. Cras sit amet tristique metus, vel iaculis massa. Quisque viverra orci in scelerisque pellentesque. Duis placerat nisl in tortor semper, id accumsan risus mollis. Phasellus arcu est, gravida sed velit maximus, tempor placerat urna. Aenean venenatis quis elit quis porttitor.",
    ],
  },
  "4": {
    id: "4",
    title: "Duis rhoncus turpis eu elementum viverra",
    date: "January 14, 2026",
    category: "Product",
    thumbnail: partner2,
    partner: "DAIA + INTEC",
    text: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed lectus at ex finibus tempus. Integer eu dui augue. Nam lacinia sem nec metus tincidunt, at porta lectus pellentesque. Donec et magna euismod, tincidunt neque a, venenatis ligula. Mauris sed gravida lectus. Phasellus pellentesque non elit nec accumsan. Nulla nec auctor justo. Nam porttitor arcu diam, molestie efficitur risus auctor eu. Nam faucibus dolor id augue tincidunt, vitae malesuada eros varius. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque cursus vestibulum nisl id scelerisque. Phasellus in accumsan odio. Suspendisse consectetur sem eu ipsum tincidunt dignissim. Sed mattis nisl at sollicitudin pellentesque.",
      "Proin vel odio eget arcu iaculis vestibulum. Nulla molestie, sapien quis pharetra mattis, lacus justo vulputate nisi, sit amet ullamcorper felis tortor a sapien. Cras dui nunc, fringilla quis consectetur eget, blandit non neque. Duis rhoncus turpis eu elementum viverra. Morbi nec pellentesque erat. Nunc non leo in lectus interdum condimentum. Aenean vitae porttitor augue, nec tristique tellus. Nulla tellus enim, rutrum sed nunc nec, mattis lobortis metus. In metus nulla, interdum pellentesque arcu at, scelerisque pharetra neque. Morbi condimentum faucibus turpis a aliquet.",
      "Cras in turpis non libero vestibulum semper. Pellentesque sed metus ex. Sed dictum justo sit amet lectus viverra, bibendum tempor massa commodo. Ut sed porttitor erat. Suspendisse lorem ligula, pretium id sapien eu, gravida commodo justo. Phasellus sed bibendum ligula. Cras eget nunc finibus, porttitor velit nec, vestibulum metus. Donec at massa a nibh tincidunt rutrum. Aliquam viverra, lacus ut ultricies lacinia, arcu ante convallis risus, a imperdiet libero neque ac arcu. Donec vitae rhoncus ante.",
      "Duis posuere neque ac porta malesuada. Mauris eget ullamcorper lorem. Cras sit amet tristique metus, vel iaculis massa. Quisque viverra orci in scelerisque pellentesque. Duis placerat nisl in tortor semper, id accumsan risus mollis. Phasellus arcu est, gravida sed velit maximus, tempor placerat urna. Aenean venenatis quis elit quis porttitor.",
      "Integer accumsan augue non velit fringilla aliquam. Vivamus viverra ex in lacus pretium, in cursus ipsum pharetra. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus porttitor malesuada vestibulum. Donec metus risus, vestibulum imperdiet fringilla non, tincidunt eget felis. Quisque lacinia eu nulla quis fermentum. Aenean nec ultricies ipsum, vel pretium nisi. Aenean posuere lectus sit amet tortor fringilla, quis aliquam massa sollicitudin. Vestibulum sit amet est consequat, pretium felis sit amet, dignissim diam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas eget facilisis augue. Ut lacinia suscipit arcu, et faucibus diam feugiat in. Pellentesque sit amet massa ante.",
    ],
  },
};

const NewsDetail = () => {
  const { newsId } = useParams();
  const news = newsData[newsId as keyof typeof newsData];

  if (!newsId) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-20 text-center">
          <h1 className="text-2xl font-medium text-foreground">
            News not found
          </h1>
          <Link
            to="/news"
            className="text-primary hover:underline mt-4 inline-block"
          >
            Back to news
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <div className="pt-24 pb-4 bg-muted/30">
        <div className="container mx-auto section-padding">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/news" className="hover:text-primary transition-colors">
              News
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-medium truncate">
              {news.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-muted/30">
        <div className="container mx-auto section-padding">
          <ScrollAnimation animation="fade-up">
            {/* TITLE (Full Width) */}
            <h1 className="text-4xl lg:text-5xl font-medium text-foreground leading-tight mb-6">
              {news.title}
            </h1>

            {/* CONTENT GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 items-start">
              {/* LEFT COLUMN — DATE */}
              <div className="lg:col-span-1 mb-6">
                <p className="text-muted-foreground text-sm tracking-wide">
                  {news.date}
                </p>
              </div>

              {/* RIGHT COLUMN — IMAGE + TEXT */}
              <div className="lg:col-span-2 space-y-8">
                {/* Image */}
                <div className="w-full aspect-video rounded-2xl overflow-hidden">
                  <iframe
                    className="w-full h-full"
                    src={news.thumbnail}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                </div>

                {/* Body Text */}
                <div className="space-y-6">
                  {news.text.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-gray-700 text-lg leading-relaxed text-justify"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NewsDetail;

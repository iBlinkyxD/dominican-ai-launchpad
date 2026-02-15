import { useParams, Link } from "react-router-dom";
import {
  Twitter,
  Facebook,
  Linkedin,
  Instagram,
  LinkIcon,
  ChevronRight,
} from "lucide-react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { ScrollAnimation } from "@/hooks/useScrollAnimation";

import { blogData } from "@/data/BlogData";

const BlogDetail = () => {
  const { blogId } = useParams();
  const blog = blogData[blogId as keyof typeof blogData];

  const firstParagraph = blog?.content.find(
    (block) => block.type === "paragraph",
  );

  if (!blogId) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-20 text-center">
          <h1 className="text-2xl font-medium text-foreground">
            Blog not found
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
            <Link to="/blog" className="hover:text-primary transition-colors">
              Blog
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-medium truncate">
              {blog.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}

      <section className="py-8 bg-muted/30">
        <div className="container mx-auto section-padding">
          <ScrollAnimation animation="fade-up">
            <div className="flex flex-col items-center text-center">
              <div className="items-center gap-3 text-sm text-muted-foreground w-3/5">
                <h1 className="text-5xl text-justify font-medium text-foreground mb-4">
                  {blog.title}
                </h1>

                {firstParagraph && (
                  <p className="text-muted-foreground text-justify mb-6 text-lg">
                    {firstParagraph.text}
                  </p>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between pt-6 border-t mb-8">
                  <div className="flex items-center gap-4 text-left">
                    <div className="flex -space-x-3">
                      {blog.author.map((a, index) => (
                        <img
                          key={index}
                          src={a.avatar}
                          alt={a.name}
                          className="w-12 h-12 rounded-full border-2 border-background object-cover"
                        />
                      ))}
                    </div>
                    {/* Text */}
                    <div className="leading-tight">
                      <p className="text-sm text-muted-foreground">
                        Written by
                      </p>
                      <p className="font-medium">
                        {blog.author.map((a) => a.name).join(", ")}
                      </p>
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    Posted on {blog.publishedDate}
                  </div>
                </div>
              </div>
            </div>
            <section className="pb-8">
              <div className="mx-auto relative aspect-video rounded-2xl overflow-hidden bg-black shadow-xl">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={blog.thumbnail}
                />
              </div>
            </section>
          </ScrollAnimation>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-4">
            {/* LEFT CONTENT */}
            <div className="lg:col-span-3 pr-16">
              <div className="space-y-8">
                {blog.content
                  .filter((_, index) => index !== 0)
                  .map((block, index) => {
                    switch (block.type) {
                      case "heading":
                        return (
                          <h2
                            key={index}
                            className="text-3xl font-semibold text-foreground"
                          >
                            {block.text}
                          </h2>
                        );

                      case "paragraph":
                        return (
                          <p
                            key={index}
                            className="text-lg text-muted-foreground leading-relaxed text-justify"
                          >
                            {block.text}
                          </p>
                        );

                      case "list":
                        return (
                          <ul
                            key={index}
                            className="list-disc list-inside space-y-2 text-lg text-muted-foreground"
                          >
                            {block.items.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        );

                      default:
                        return null;
                    }
                  })}
              </div>
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="lg:col-span-1 space-y-8">
              {/* Other Blogs */}
              <div className="bg-card border border-border rounded-2xl p-6 space-y-6 shadow-lg">
                <h3 className="text-lg font-semibold">More Articles</h3>

                {Object.values(blogData)
                  .filter((b) => b.id !== blog.id)
                  .slice(0, 3)
                  .map((b) => (
                    <Link
                      key={b.id}
                      to={`/blog/${b.id}`}
                      className="block group"
                    >
                      <div className="flex gap-4 items-start">
                        <img
                          src={b.thumbnail}
                          alt={b.title}
                          className="w-20 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <p className="text-sm font-medium group-hover:text-primary transition">
                            {b.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {b.publishedDate}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}

                {/* Footer */}
                {/* Footer */}
                <div className="flex flex-col justify-between pt-4 border-t border-border mt-auto">
                  <h3 className="text-lg font-semibold">Share this article</h3>

                  <div className="flex flex-row gap-3">
                    {/* Facebook */}
                    <button className="flex items-center justify-center w-10 h-10 bg-gray-200 hover:bg-gray-700/20 transition rounded-full">
                      <Facebook />
                    </button>

                    {/* Twitter */}
                    <button className="flex items-center justify-center w-10 h-10 bg-gray-200 hover:bg-gray-700/20 transition rounded-full">
                      <Twitter />
                    </button>

                    {/* LinkedIn */}
                    <button className="flex items-center justify-center w-10 h-10 bg-gray-200 hover:bg-gray-700/20 transition rounded-full">
                      <Linkedin />
                    </button>

                    {/* Copy Link */}
                    <button className="flex items-center justify-center w-10 h-10 bg-gray-200 hover:bg-gray-700/20 transition rounded-full">
                      <LinkIcon />
                    </button>
                  </div>
                </div>
              </div>

              {/* Subcribe Box */}
              {/* <div className="bg-card border border-border rounded-2xl p-6 space-y-4 shadow-lg">
                <h3 className="text-lg font-semibold">Share this article</h3>

              </div> */}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogDetail;

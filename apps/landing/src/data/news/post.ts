import i18n from "@/i18n";

export interface NewsMeta {
  slug: string;
  title: string;
  shortTitle: string;
  publishedDate: string;
  category: string;
  partner: string;
  thumbnail: string;
}

interface MDXModule {
  default: React.ComponentType;
  frontmatter: NewsMeta;
}

// Import all mdx files
const modules = import.meta.glob("/content/news/*/*.mdx", {
  eager: true,
}) as Record<string, MDXModule>;

export const getNewsPosts = () => {
  const currentLang = i18n.language;

  const temp: Record<string, Record<string, MDXModule>> = {};

  Object.entries(modules).forEach(([path, module]) => {
    const match = path.match(
      /\/content\/news\/([^/]+)\/([^/]+)\.mdx$/
    );
    if (!match) return;

    const slug = match[1];
    const lang = match[2];

    if (!temp[slug]) temp[slug] = {};
    temp[slug][lang] = module;
  });

  const posts: Record<
    string,
    NewsMeta & { Content: React.ComponentType }
  > = {};

  Object.entries(temp).forEach(([slug, langs]) => {
    const module = langs[currentLang] || langs["en"];

    if (!module) return;

    posts[slug] = {
      ...module.frontmatter,
      Content: module.default,
    };
  });

  return posts;
};

export const getNewsList = () => {
  return Object.values(getNewsPosts());
};
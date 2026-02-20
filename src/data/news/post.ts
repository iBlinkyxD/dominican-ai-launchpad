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

// Build posts object
export const newsPost = Object.values(modules).reduce(
  (acc, module) => {
    acc[module.frontmatter.slug] = {
      ...module.frontmatter,
      Content: module.default,
    };
    return acc;
  },
  {} as Record<string, NewsMeta & { Content: React.ComponentType }>
);

// Generate news list automatically
export const newsList = Object.values(newsPost);
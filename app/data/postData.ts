export type Post = {
  slug: string;
  title: string;
  author: string;
  publishDate: string;
  summary: string;
};

export const POSTS: Post[] = [
  {
    slug: "truth-about-nextjs",
    title: "The Truth About Next.js",
    author: "Emma",
    publishDate: "2024-01-10",
    summary: "A developer's observations about Next.js.",
  },
  {
    slug: "where-are-we-going",
    title: "Where Are We Going, Really?",
    author: "Florence",
    publishDate: "2024-01-15",
    summary:
      "A walkthrough on the history of web development, and what's on the horizon.",
  },
  {
    slug: "rethinking-tech-debt",
    title: "Rethinking Tech Debt",
    author: "Saoirse",
    publishDate: "2024-01-20",
    summary: "What is tech debt? How do we address it?",
  },
  {
    slug: "whats-on-your-desk",
    title: "What's on your desk, Codecademy?",
    author: "Emma",
    publishDate: "2024-01-25",
    summary: "Explore the Codecademy team's WFH favorites.",
  },
  {
    slug: "how-we-built-codecademy",
    title: "How We Built Codecademy",
    author: "Florence",
    publishDate: "2024-01-30",
    summary: "Deconstruct the layers of Codecademy.",
  },
  {
    slug: "a-race-to-the-top",
    title: "A Race to the Top: How We Optimize for Search Engines",
    author: "Saoirse",
    publishDate: "2024-02-04",
    summary:
      "Exploring how we optimize our applications for search engines and improve our SEO rankings.",
  },
];

export const POSTS_BY_SLUG = Object.fromEntries(POSTS.map((p) => [p.slug, p]));

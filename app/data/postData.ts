export type Post = {
  _id: string;
  title: string;
  username: string;
  updatedAt: string;
  createdAt?: string;
  content: string;
  tags?: string[];
  commentCount?: number;
};

export const POSTS: Post[] = [
  {
    _id: "truth-about-nextjs",
    title: "The Truth About Next.js",
    username: "Emma",
    updatedAt: "2024-01-10",
    content: "A developer's observations about Next.js.",
  },
  {
    _id: "where-are-we-going",
    title: "Where Are We Going, Really?",
    username: "Florence",
    updatedAt: "2024-01-15",
    content:
      "A walkthrough on the history of web development, and what's on the horizon.",
  },
  {
    _id: "rethinking-tech-debt",
    title: "Rethinking Tech Debt",
    username: "Saoirse",
    updatedAt: "2024-01-20",
    content: "What is tech debt? How do we address it?",
  },
  {
    _id: "whats-on-your-desk",
    title: "What's on your desk, Codecademy?",
    username: "Emma",
    updatedAt: "2024-01-25",
    content: "Explore the Codecademy team's WFH favorites.",
  },
  {
    _id: "how-we-built-codecademy",
    title: "How We Built Codecademy",
    username: "Florence",
    updatedAt: "2024-01-30",
    content: "Deconstruct the layers of Codecademy.",
  },
  {
    _id: "a-race-to-the-top",
    title: "A Race to the Top: How We Optimize for Search Engines",
    username: "Saoirse",
    updatedAt: "2024-02-04",
    content:
      "Exploring how we optimize our applications for search engines and improve our SEO rankings.",
  },
];

export const POSTS_BY__id = Object.fromEntries(POSTS.map((p) => [p._id, p]));

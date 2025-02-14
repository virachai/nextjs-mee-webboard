import { MetadataRoute } from "next"; // Import the necessary type from Next.js

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*", // Applies to all user agents (search engines)
      allow: "/", // Allow crawling of the root (home page)
      disallow: [
        "/public/", // Disallow crawling of the public directory
        "/data/", // Disallow crawling of the data directory
        "/components/", // Disallow crawling of the components directory
        "/lib/", // Disallow crawling of the lib directory
      ],
    },
    sitemap: "https://localhost:4001/sitemap.xml", // Reference to your sitemap.xml for better indexing
  };
}

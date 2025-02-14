import { MetadataRoute } from "next"; // Import the necessary type from Next.js
import { POSTS } from "@/data/postData"; // Import the post data (replace with actual import path)
const SITE_URL = "https://localhost:3000"; // Define your site URL

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL, // Home page URL
      lastModified: new Date(), // Current date and time for home page
    },
    ...POSTS.map((post: { slug: string; publishDate: string }) => ({
      url: `${SITE_URL}/post/${post.slug}`, // Construct post URL using the slug
      lastModified: new Date(post.publishDate), // Use the post's publish date
    })),
  ];
}

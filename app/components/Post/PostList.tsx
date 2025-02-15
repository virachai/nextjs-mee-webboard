"use client";

import Post from "./PostCard";
import AvataThumbnail from "@/public/avatar_placeholder.jpg";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Post as PostType } from "@/app/data/postData";

export default function PostList() {
  const pathname = usePathname();

  // State to store the fetched posts
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the posts from the API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const baseApiUrl =
          process.env.NEXT_PUBLIC_BASE_API || "http://localhost:4000";

        const response = await fetch(`${baseApiUrl}/aboard/posts/`);
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredItems = pathname.includes("/post")
    ? posts.filter((item) => item?.username.includes("Emma"))
    : posts;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-white mt-8 rounded-xl min-h-screen">
      <ul>
        {filteredItems.map((post: PostType) => (
          <li key={post._id}>
            <Post post={post} image={AvataThumbnail} local={true} />
          </li>
        ))}
      </ul>
    </div>
  );
}

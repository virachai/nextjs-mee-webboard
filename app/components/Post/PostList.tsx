"use client";

import Post from "./PostCard";
import AvataThumbnail from "@/public/avatar_placeholder.jpg";
import { useEffect, useState } from "react";
import { Post as PostType } from "@/app/data/postData";
import { useSession } from "next-auth/react"; // Use useSession
import { Session } from "next-auth";

export default function PostList({ endpoint }: { endpoint?: string }) {
  const { data: session } = useSession(); // Use the hook here
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${endpoint}`);
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
  }, [endpoint]);

  const handleDelete = (postId: string) => {
    console.log(`Delete post with ID: ${postId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center bg-white mt-8 rounded-xl min-h-screen">
        <h2 className="py-8">Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center bg-white mt-8 rounded-xl min-h-screen">
        <h2 className="py-8">Error: {error}</h2>
      </div>
    );
  }

  if (!loading && !posts.length) {
    return (
      <div className="flex justify-center bg-white mt-8 rounded-xl min-h-screen">
        <h2 className="py-8">Not Found</h2>
      </div>
    );
  }

  return (
    <div className="bg-white mt-8 rounded-xl min-h-screen">
      <ul>
        {posts.map((post: PostType) => (
          <li key={post._id}>
            <Post
              post={post}
              image={AvataThumbnail}
              local={true}
              onDelete={handleDelete}
              session={session as Session}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

"use client";

import Post from "./PostCard";
import { POSTS, Post as PostType } from "@/app/data/postData";
import AvataThumbnail from "@/public/avatar_placeholder.jpg";
import { usePathname } from "next/navigation";
// import { useRouter } from "next/router";

export default function PostList() {
  const pathname = usePathname();

  const filteredItems = pathname.includes("/post")
    ? POSTS.filter((item) => item?.author.includes("Emma"))
    : POSTS;
  return (
    <div className="bg-white mt-8 rounded-xl min-h-screen">
      <ul>
        {filteredItems.map((post: PostType) => (
          <li key={post.slug}>
            <Post post={post} image={AvataThumbnail} local={true} />
          </li>
        ))}
      </ul>
    </div>
  );
}

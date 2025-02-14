import Post from "./PostCard";
import { POSTS, Post as PostType } from "@/app/data/postData";
import AvataThumbnail from "@/public/avatar_placeholder.jpg";
// avatar_placeholder;

export default function PostList() {
  return (
    <div className="bg-white mt-8 rounded-xl">
      <ul>
        {POSTS.map((post: PostType) => (
          <li key={post.slug}>
            <Post post={post} image={AvataThumbnail} local={true} />
          </li>
        ))}
      </ul>
    </div>
  );
}

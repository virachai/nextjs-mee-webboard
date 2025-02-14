import Post from "@/app/components/Post/Post";
import { POSTS, Post as PostType } from "@/app/data/postData";

export default function PostList() {
  return (
    <div className="rounded-lg">
      <main>
        <ul>
          {POSTS.map((post: PostType) => (
            <li key={post.slug}>
              <Post
                post={post}
                image="https://images.unsplash.com/photo-1621193793262-4127d9855c91?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                local={false}
              />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

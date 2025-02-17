// app/(root)/(homepage)/post/page.tsx
import PostSection from "@/app/components/Post/PostSection";

export default async function Page() {
  return (
    <div>
      <PostSection endpoint={"/api/our-blog"} />
    </div>
  );
}

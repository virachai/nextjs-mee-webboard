// app/(root)/(homepage)/page.tsx
import PostSection from "@/app/components/Post/PostSection";

export default function Page() {
  return (
    <div>
      <PostSection endpoint={"/api/posts"} />
    </div>
  );
}

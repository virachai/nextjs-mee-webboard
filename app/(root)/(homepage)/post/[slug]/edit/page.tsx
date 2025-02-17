import PostSection from "@/app/components/Post/PostSection";
import PostAction from "@/app/components/Post/PostAction";
import { Suspense } from "react";

export default function Page() {
  return (
    <div>
      <Suspense>
        <PostSection endpoint={"/api/our-blog"} />
      </Suspense>
      <Suspense>
        <PostAction />
      </Suspense>
    </div>
  );
}

import PostSection from "@/app/components/Post/PostSection";
import PostAction from "@/app/components/Post/PostAction";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Create Post",
};

export default function Page() {
  return (
    <div>
      <Suspense>
        <PostSection />
      </Suspense>
      <Suspense>
        <PostAction />
      </Suspense>
    </div>
  );
}

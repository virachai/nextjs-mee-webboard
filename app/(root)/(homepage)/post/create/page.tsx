import PostSection from "@/app/components/Post/PostSection";
import PostAction from "@/app/components/Post/PostAction";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Post",
};

export default function Page() {
  return (
    <div>
      <PostSection />
      <PostAction />
    </div>
  );
}

import PostSection from "@/app/components/Post/PostSection";
import EditPost from "@/app/components/Post/EditPost";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Post",
};

export default async function Page() {
  return (
    <div>
      <PostSection />
      <EditPost />
    </div>
  );
}

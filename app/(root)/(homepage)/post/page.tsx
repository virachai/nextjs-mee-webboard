import { Metadata } from "next";
import PostSection from "@/app/components/Post/PostSection";

export const metadata: Metadata = {
  title: "Our Blog",
};

export default function Page() {
  return (
    <div>
      <PostSection />
    </div>
  );
}

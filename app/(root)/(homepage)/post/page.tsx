// app/(root)/(homepage)/post/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";
import { redirect } from "next/navigation";
import PostSection from "@/app/components/Post/PostSection";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <div>
      <PostSection endpoint={"/api/our-blog"} />
    </div>
  );
}

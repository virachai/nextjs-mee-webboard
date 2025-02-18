// app/(root)/(homepage)/post/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";
import PostSection from "@/app/components/Post/PostSection";

export default async function Page() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      {!session && (
        <div className="bg-[#BBC2C0] px-4 md:px-6 pt-4 md:pt-6">
          <div className="flex justify-center bg-white p-4 rounded-xl w-full">
            <h2>Sign in to interact with our blog posts!</h2>
          </div>
        </div>
      )}
      <PostSection endpoint={"/api/our-blog"} />
    </div>
  );
}

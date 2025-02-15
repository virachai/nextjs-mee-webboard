import { Metadata } from "next";
import PostSection from "@/app/components/Post/PostSection";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Our Blog",
};

export default async function Page() {
  // Get the session from NextAuth
  const session = await getServerSession(authOptions);

  // If no session exists, redirect to the home page
  if (!session) {
    redirect("/");
  }

  return (
    <div>
      <PostSection />
    </div>
  );
}

import Search from "@/app/components/ui/search";
import { CreatePost } from "@/app/components/ui/homepage/buttons";
import CommunityDropdown from "@/app/components/ui/community-dropdown";
import PostList from "@/app/components/Post/PostList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Blog",
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  console.log(query, currentPage);

  return (
    <div className="bg-[#BBC2C0] md:p-6 px-4 py-12 w-full">
      <div className="flex justify-between items-center gap-2">
        <Search placeholder="Search" />
        <CommunityDropdown />
        <CreatePost />
      </div>
      <PostList />
    </div>
  );
}

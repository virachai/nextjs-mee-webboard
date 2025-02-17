import Search from "@/app/components/ui/search";
import { CreatePost } from "@/app/components/ui/homepage/buttons";
import CommunityDropdown from "@/app/components/ui/community-dropdown";
import PostList from "@/app/components/Post/PostList";
import { Suspense } from "react";

export default async function Page({ endpoint }: { endpoint?: string }) {
  return (
    <div className="bg-[#BBC2C0] md:p-6 px-4 py-12 w-full">
      <div className="flex justify-between items-center gap-2">
        <Suspense>
          <Search placeholder="Search" />
        </Suspense>
        <Suspense>
          <CommunityDropdown />
        </Suspense>
        <Suspense>
          <CreatePost />
        </Suspense>
      </div>
      <Suspense>
        <PostList endpoint={endpoint} />
      </Suspense>
    </div>
  );
}

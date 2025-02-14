// import Pagination from "@/app/ui/invoices/pagination";
import Search from "@/app/components/ui/search";
// import Table from "@/app/ui/invoices/table";
import { CreatePost } from "@/app/components/ui/homepage/buttons";
import CommunityDropdown from "@/app/components/ui/community-dropdown";
// import { lusitana } from "@/app/ui/fonts";
// import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
// import { Suspense } from "react";
// import { fetchInvoicesPages } from "@/app/lib/data";
// D:\DEV\DataWow\nextjs-mee-webboard\app\components\ui\blog\post-list.tsx
import PostList from "@/app/components/Post/PostList";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "a Board",
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

  // const totalPages = await fetchInvoicesPages(query);

  return (
    <div className="bg-[#BBC2C0] md:p-6 px-4 py-12 w-full">
      <div className="flex justify-between items-center gap-2">
        <Search placeholder="Search" />
        <CommunityDropdown />
        <CreatePost />
      </div>
      <PostList />
      {/* <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="flex justify-center mt-5 w-full">
        <Pagination totalPages={totalPages} />
      </div> */}
    </div>
  );
}

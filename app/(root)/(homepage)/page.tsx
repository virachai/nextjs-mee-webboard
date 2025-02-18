// app/(root)/(homepage)/page.tsx
import PostSection from "@/app/components/Post/PostSection";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    tag?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const page = searchParams?.page || "1";
  const tag = searchParams?.tag || "";
  const endpoint = `/api/posts?query=${query}&page=${page}&tag=${tag}`;

  return (
    <div>
      <PostSection endpoint={endpoint} />
    </div>
  );
}

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import CommentsSection from "@/app/components/Comment/CommentsSection";
import AvataThumbnail from "@/public/avatar_placeholder.jpg";
import { format } from "timeago.js";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  let post = undefined;

  try {
    const baseApiUrl =
      process.env.NEXT_PUBLIC_BASE_API || "http://localhost:4000";

    const response = await fetch(`${baseApiUrl}/aboard/posts/${slug}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      if (response.status === 404) {
        notFound();
      }
      throw new Error(`Failed to fetch post: ${response.statusText}`);
    }

    post = await response.json();
  } catch (error) {
    // Error boundary fallback
    if (error)
      return (
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <h2 className="mb-2 font-bold text-gray-900 text-2xl">
              Something went wrong
            </h2>
            <p className="text-gray-600">
              We couldn&apos;t load this post. Please try again later.
            </p>
            <Link
              href="/"
              className="inline-block mt-4 text-blue-600 hover:underline"
            >
              Return to home
            </Link>
          </div>
        </div>
      );
  }

  return (
    <main className="mx-auto px-4 py-8 max-w-3xl">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex justify-center items-center bg-[#D8E9E4] hover:bg-[#B0D1C1] rounded-full w-12 h-12 text-gray-600 transition-all duration-200"
      >
        <ArrowLeft className="w-5 h-5" />
      </Link>

      {/* Author Section */}
      <div className="flex items-center gap-3 mt-6">
        <div className="relative bg-gray-200 rounded-full w-12 h-12 overflow-hidden">
          <Image
            src={AvataThumbnail}
            alt={`${post?.username}'s avatar`}
            fill
            sizes="48px"
            className="object-cover"
            priority
          />
        </div>
        <div className="flex sm:flex-row flex-col sm:items-center gap-1 sm:gap-2">
          <span className="font-medium text-lg">{post?.username}</span>
          <time className="text-gray-500 text-sm">
            {format(post?.updatedAt)} {/* Display time ago */}
          </time>
        </div>
      </div>

      {/* Tags Section (replaces 'Uncategorized') */}
      <div className="mt-4">
        {post?.tags?.length ? (
          <div className="inline-flex flex-wrap gap-2">
            {post?.tags.map((tag: string, index: number) => (
              <Link
                href={`/?tag=${tag}`}
                key={index}
                className="inline-block bg-gray-100 px-4 py-1 rounded-full text-gray-600 text-sm capitalize"
              >
                {tag}
              </Link>
            ))}
          </div>
        ) : (
          <span className="inline-block bg-gray-100 px-4 py-1 rounded-full text-gray-600 text-sm">
            Uncategorized
          </span>
        )}
      </div>

      {/* Post Content */}
      <article className="mt-6">
        <h1 className="mb-6 font-bold text-gray-900 text-3xl">{post?.title}</h1>
        <div className="max-w-none prose prose-gray">{post?.content}</div>
      </article>

      {/* Comments */}
      <section className="mt-12">
        <CommentsSection postId={post?._id} />
      </section>
    </main>
  );
}

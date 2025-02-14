// pages/post/[slug]/page.tsx

import React from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { POSTS_BY_SLUG } from "@/app/data/postData";
import { CONTENTS_BY_SLUG } from "@/app/data/postContentData";
import Image from "next/image";
import type { Metadata } from "next";
import styles from "./page.module.css";
import CommentsSection from "@/app/components/Comment/CommentsSection";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS_BY_SLUG[slug];
  const content = CONTENTS_BY_SLUG[slug];

  if (!post || !content) {
    return {
      title: "Post not found",
      description: "This post could not be found.",
    };
  }

  return {
    title: post.title,
    description: post.summary || "No description available.",
    openGraph: {
      title: post.title,
      description: post.summary,
      images: ["https://images.unsplash.com/photo-1621193793262-4127d9855c91"],
    },
    twitter: {
      card: "summary_large_image",
      images: ["https://images.unsplash.com/photo-1621193793262-4127d9855c91"],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const post = POSTS_BY_SLUG[slug];
  const content = CONTENTS_BY_SLUG[slug];

  if (!post) {
    throw new Error(`Post not found for slug: ${slug}`);
  }

  return (
    <div className={styles.container}>
      {/* Back Button */}
      <Link
        href="/"
        className="flex justify-center items-center bg-mint-100 hover:bg-mint-200 rounded-full w-12 h-12 text-gray-600 transition-colors"
      >
        <ArrowLeft />
      </Link>

      {/* Author Section */}
      <div className="flex items-center gap-3 mt-6">
        <div className="relative bg-gray-200 rounded-full w-12 h-12 overflow-hidden">
          <Image
            src="https://via.assets.so/img.jpg?w=48&h=48"
            alt={`${post.author}'s avatar`}
            className="w-full h-full object-cover"
            width={48}
            height={48}
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium text-lg">{post.author}</span>
          <span className="text-gray-500">{post.publishDate}</span>
        </div>
      </div>

      {/* Category */}
      <div className="inline-block bg-gray-100 mt-4 px-4 py-1 rounded-full text-gray-600">
        Uncategorized
      </div>

      {/* Title & Content */}
      <h1 className="mt-4 font-bold text-gray-900 text-3xl">{post.title}</h1>
      <div className="mt-4 text-gray-700 leading-relaxed">{content?.copy}</div>

      {/* Comments Section */}
      <CommentsSection />
    </div>
  );
}

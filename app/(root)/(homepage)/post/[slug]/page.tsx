import React from "react";
import { POSTS_BY_SLUG } from "@/app/data/postData";
import { CONTENTS_BY_SLUG } from "@/app/data/postContentData";
import styles from "./page.module.css";
import type { Metadata } from "next";

type PageProps = {
  params: Promise<{ slug: string }>; // `params` is now a Promise
};

// Dynamic metadata generation based on the slug
export async function generateMetadata({
  params,
}: PageProps): // parent: ResolvingMetadata
Promise<Metadata> {
  const { slug } = await params; // Unwrap the slug from params

  // Fetch the post and content based on the slug
  const post = POSTS_BY_SLUG[slug];
  const content = CONTENTS_BY_SLUG[slug];

  if (!post || !content) {
    return {
      title: "Post not found",
      description: "This post could not be found.",
    };
  }

  // Generate metadata dynamically
  return {
    title: post.title,
    description: post.summary || "No description available.",
    openGraph: {
      title: post.title,
      description: post.summary,
      images: ["https://images.unsplash.com/photo-1621193793262-4127d9855c91"], // You can customize or replace with actual image URLs if available
    },
    twitter: {
      card: "summary_large_image",
      images: ["https://images.unsplash.com/photo-1621193793262-4127d9855c91"], // You can replace this with a dynamic image URL if needed
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  // Fetch the post and content based on the slug
  const post = POSTS_BY_SLUG[slug];
  const content = CONTENTS_BY_SLUG[slug];

  if (!post) {
    throw new Error(`Post not found for slug: ${post}`);
  }

  return (
    <div className={styles.container}>
      <h1>{post.title}</h1>
      <small>
        {post.publishDate} | {post.author}
      </small>
      <p>{content?.copy}</p>
    </div>
  );
}

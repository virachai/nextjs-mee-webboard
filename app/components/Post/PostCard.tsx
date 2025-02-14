import React from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import styles from "./Post.module.css";
import { MessageCircle } from "lucide-react";

type PostProps = {
  post: {
    slug: string;
    title: string;
    author: string;
    publishDate: string;
    summary: string;
  };
  image: string | StaticImageData; // Union type for both remote (URL) and local (StaticImageData) images
  local?: boolean; // Optional flag to distinguish local images
  priority?: boolean; // Optional priority for preloading
};

const PostCard = ({
  post: { slug, title, author, publishDate, summary },
  image,
  local = false,
  priority = false,
}: PostProps) => (
  <Link className={styles.containerLink} href={`/post/${slug}`}>
    <div className="flex flex-col gap-4 bg-transparent p-4 border border-gray-200 rounded-xl">
      <div className="flex items-center gap-3">
        <div className="bg-gray-200 rounded-full w-10 h-10 overflow-hidden">
          <Image
            src={local ? (image as StaticImageData) : (image as string)}
            alt={`${author}'s avatar`}
            width={40}
            height={40}
            className="w-full h-full object-cover"
            priority={priority}
          />
        </div>
        <span className="text-[#939494] text-lg">{author}</span>
      </div>

      <div className="inline-flex">
        <span className="bg-gray-100 mx-1 px-3 py-1 rounded-full text-gray-600 text-sm">
          {publishDate && "History"}
        </span>
        <span className="bg-gray-100 mx-1 px-3 py-1 rounded-full text-gray-600 text-sm">
          {publishDate && "Food"}
        </span>
      </div>

      <div className="space-y-2">
        <h2 className="font-bold text-gray-900 text-xl">{title}</h2>
        <p className="min-h-[48px] text-gray-600 line-clamp-2">
          {summary} {summary}
        </p>
      </div>

      <div className="flex items-center gap-1 text-gray-500">
        <MessageCircle size={20} />
        {/* <span>{commentCount} Comments</span> */}
        <span>99+ Comments</span>
      </div>
    </div>
  </Link>
);

export default PostCard;

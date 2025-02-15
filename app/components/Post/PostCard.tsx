import React from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import styles from "./Post.module.css";
import { MessageCircle } from "lucide-react";
import { Post as PostType } from "@/app/data/postData";

type PostProps = {
  post: PostType;
  image: string | StaticImageData; // Union type for both remote (URL) and local (StaticImageData) images
  local?: boolean; // Optional flag to distinguish local images
  priority?: boolean; // Optional priority for preloading
};

const PostCard = ({
  post: { _id, title, username, content, tags },
  image,
  local = false,
  priority = false,
}: PostProps) => (
  <div className={styles.containerLink}>
    <div className="flex flex-col gap-4 bg-transparent p-4 border border-gray-200 rounded-xl">
      <div className="flex items-center gap-3">
        <div className="bg-gray-200 rounded-full w-10 h-10 overflow-hidden">
          <Image
            src={local ? (image as StaticImageData) : (image as string)}
            alt={`${username}'s avatar`}
            width={40}
            height={40}
            className="w-full h-full object-cover"
            priority={priority}
          />
        </div>
        <span className="text-[#939494] text-lg">{username}</span>
      </div>

      <div className="inline-flex flex-wrap gap-2">
        {tags?.map((tag: string, index: number) => (
          <span
            key={index}
            className="bg-gray-100 mx-1 px-3 py-1 rounded-full text-gray-600 text-sm capitalize"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="space-y-2">
        <Link className={styles.containerLink} href={`/post/${_id}`}>
          <h2 className="font-bold text-gray-900 text-xl">{title}</h2>
          <p className="min-h-[48px] text-gray-600 line-clamp-2">{content}</p>
        </Link>
      </div>

      <div className="flex items-center gap-1 text-gray-500">
        <MessageCircle size={20} />
        {/* <span>{commentCount} Comments</span> */}
        <span>99+ Comments</span>
      </div>
    </div>
  </div>
);

export default PostCard;

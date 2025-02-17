import React from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import styles from "./Post.module.css";
import { MessageCircle, Edit, Trash } from "lucide-react"; // Import Edit and Trash icons
import { Post as PostType } from "@/app/data/postData";
import { Session } from "next-auth"; // Import Session type if needed

type PostProps = {
  post: PostType;
  image: string | StaticImageData; // Union type for both remote (URL) and local (StaticImageData) images
  local?: boolean; // Optional flag to distinguish local images
  priority?: boolean; // Optional priority for preloading
  onDelete?: (postId: string) => void; // Optional delete handler
  session?: Session; // Optional session prop for checking user authentication or ownership
};

const PostCard = ({
  post: { _id, title, username, content, tags },
  image,
  local = false,
  priority = false,
  onDelete,
  session, // Receive session as a prop
}: PostProps) => (
  <div className={styles.containerLink}>
    <div className="relative flex flex-col gap-4 bg-transparent p-4 border border-gray-200 rounded-xl">
      {/* Edit and Delete buttons - Show only if the user is authenticated and is the owner of the post */}
      {session?.user?.name === username && (
        <div className="top-4 right-4 absolute flex gap-2">
          <Link
            href={`/post/${_id}/edit`}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Edit post"
          >
            <Edit size={18} />
          </Link>

          <button
            onClick={() => onDelete && onDelete(_id)}
            className="p-2 text-gray-500 hover:text-red-500 transition-colors"
            aria-label="Delete post"
          >
            <Trash size={18} />
          </button>
        </div>
      )}

      {/* User avatar and username */}
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

      {/* Tags */}
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

      {/* Post title and content */}
      <div className="space-y-2">
        <Link className={styles.containerLink} href={`/post/${_id}`}>
          <h2 className="font-bold text-gray-900 text-xl">{title}</h2>
          <p className="min-h-[48px] text-gray-600 line-clamp-2">{content}</p>
        </Link>
      </div>

      {/* Comment section */}
      <div className="flex items-center gap-1 text-gray-500">
        <MessageCircle size={20} />
        <span>99+ Comments</span>
      </div>
    </div>
  </div>
);

export default PostCard;

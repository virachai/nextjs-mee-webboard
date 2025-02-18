"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import styles from "./Post.module.css";
import { MessageCircle, Edit, Trash } from "lucide-react"; // Import Edit and Trash icons
import { Post as PostType } from "@/app/data/postData";
import { Session } from "next-auth";
import * as Dialog from "@radix-ui/react-dialog"; // Import Radix Dialog components
import { Button } from "@/app/components/ui/button"; // Assuming Button is a custom component or imported from your UI library

type PostProps = {
  post: PostType;
  image: string | StaticImageData; // Union type for both remote (URL) and local (StaticImageData) images
  local?: boolean; // Optional flag to distinguish local images
  priority?: boolean; // Optional priority for preloading
  onDelete?: (postId: string) => void; // Optional delete handler
  session?: Session; // Optional session prop for checking user authentication or ownership
};

const PostCard = ({
  post: { _id, title, username, content, tags, commentCount },
  image,
  local = false,
  priority = false,
  onDelete,
  session,
}: PostProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to handle delete action
  const handleDelete = () => {
    if (onDelete) {
      onDelete(_id);
    }
    setIsModalOpen(false); // Close modal after confirming delete
  };

  return (
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

            <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
              <Dialog.Trigger
                onClick={() => setIsModalOpen(true)} // Open modal when delete is clicked
                className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                aria-label="Delete post"
              >
                <Trash size={18} />
              </Dialog.Trigger>

              {/* Confirmation Modal */}
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
                <Dialog.Content className="top-1/2 left-1/2 fixed p-4 w-full md:max-w-[380px] -translate-x-1/2 -translate-y-1/2 transform">
                  <div className="bg-white p-6 rounded-lg w-full">
                    <div className="text-center">
                      <Dialog.Title className="text-xl">
                        Please confirm if you wish to delete the post
                      </Dialog.Title>
                      <Dialog.Description className="mt-2 text-gray-600">
                        Are you sure you want to delete the post? Once deleted,
                        it cannot be recovered.
                      </Dialog.Description>
                    </div>

                    <div className="flex md:flex-row flex-col justify-around gap-3 mt-4">
                      <Button
                        variant="destructive"
                        onClick={handleDelete}
                        className="bg-[#F23536] w-full md:w-max-[150px] text-white"
                      >
                        Delete
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setIsModalOpen(false)}
                        className="bg-white w-full md:w-max-[150px]"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
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
              className="w-full min-w-[40px] h-full object-cover"
              priority={priority}
            />
          </div>
          <span className="text-[#939494] text-lg">{username}</span>
        </div>

        {/* Tags */}
        <div className="inline-flex flex-wrap gap-2">
          {tags?.map((tag: string, index: number) => (
            <Link
              href={`/?tag=${tag}`}
              key={index}
              className="bg-gray-100 mx-1 px-3 py-1 rounded-full text-gray-600 text-sm capitalize"
            >
              {tag}
            </Link>
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
          <span>{commentCount} Comments</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;

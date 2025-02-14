// components/CommentCard.tsx
import Image from "next/image";
import React from "react";

type CommentCardProps = {
  author: string;
  timeAgo: string;
  content: string;
};

export default function CommentCard({
  author,
  timeAgo,
  content,
}: CommentCardProps) {
  return (
    <div className="flex gap-3">
      <div className="bg-gray-200 rounded-full w-10 h-10 overflow-hidden">
        <Image
          src="https://via.assets.so/img.jpg?w=40&h=40"
          alt={`${author}'s avatar`}
          className="w-full h-full object-cover"
          width={40}
          height={40}
        />
      </div>
      <div>
        <div className="flex items-center gap-2">
          <span className="font-medium">{author}</span>
          <span className="text-gray-500 text-sm">{timeAgo}</span>
        </div>
        <p className="mt-1 text-gray-700">{content}</p>
      </div>
    </div>
  );
}

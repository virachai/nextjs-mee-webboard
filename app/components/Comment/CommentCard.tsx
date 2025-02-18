// app/components/Comment/CommentCard.tsx
import Image from "next/image";
import { format } from "timeago.js";

type CommentCardProps = {
  username: string;
  createdAt: string;
  content: string;
};

export default function CommentCard({
  username,
  createdAt,
  content,
}: CommentCardProps) {
  return (
    <div className="flex gap-3">
      <div className="bg-gray-200 rounded-full w-10 h-10 overflow-hidden">
        <Image
          src="https://via.assets.so/img.jpg?w=40&h=40"
          alt={`${username}'s avatar`}
          className="w-full min-w-[40px] h-full object-cover"
          width={40}
          height={40}
        />
      </div>
      <div>
        <div className="flex items-center gap-2">
          <span className="font-medium">{username}</span>
          <span className="text-gray-500 text-sm">{format(createdAt)}</span>
        </div>
        <p className="mt-1 text-gray-700">{content}</p>
      </div>
    </div>
  );
}

// components/CommentList.tsx
import React from "react";
import CommentCard from "./CommentCard";

type Comment = {
  author: string;
  timeAgo: string;
  content: string;
};

type CommentListProps = {
  comments: Comment[];
};

export default function CommentList({ comments }: CommentListProps) {
  return (
    <div className="space-y-6 mt-6">
      {comments.map((comment, index) => (
        <CommentCard
          key={index}
          author={comment.author}
          timeAgo={comment.timeAgo}
          content={comment.content}
        />
      ))}
    </div>
  );
}

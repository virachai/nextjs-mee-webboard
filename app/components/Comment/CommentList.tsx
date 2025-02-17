// components/CommentList.tsx
import React from "react";
import CommentCard from "./CommentCard";

interface Comment {
  username: string;
  createdAt: string;
  content: string;
}

type CommentListProps = {
  comments: Comment[];
};

export default function CommentList({ comments }: CommentListProps) {
  return (
    <div className="space-y-6 mt-6">
      {comments.map((comment, index) => (
        <CommentCard
          key={index}
          username={comment.username}
          createdAt={comment.createdAt}
          content={comment.content}
        />
      ))}
    </div>
  );
}

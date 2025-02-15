// app/components/Comment/CommentsSection.tsx
"use client";

import { useState } from "react";
import CommentList from "./CommentList";
import CommentAction from "./CommentAction";

interface Comment {
  id: string;
  author: string;
  timeAgo: string;
  content: string;
  likes?: number;
  replies?: Comment[];
}

interface CommentsSectionProps {
  postId?: string;
  initialComments?: Comment[];
}

const MOCK_COMMENTS = [
  {
    id: "1",
    author: "Wittawat98",
    timeAgo: "12h ago",
    content:
      "Lorem ipsum dolor sit amet consectetur. Purus cursus vel est a pretium quam imperdiet.",
  },
  {
    id: "2",
    author: "Hawaii51",
    timeAgo: "1mo. ago",
    content:
      "Lorem ipsum dolor sit amet consectetur. Purus cursus vel est a pretium quam imperdiet.",
  },
  {
    id: "3",
    author: "Helo_re",
    timeAgo: "3mo. ago",
    content:
      "Lorem ipsum dolor sit amet consectetur. Purus cursus vel est a pretium quam imperdiet.",
  },
];

const CommentsSection = ({
  postId,
  initialComments = MOCK_COMMENTS,
}: CommentsSectionProps) => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  console.log("CommentsSection", postId);

  const toggleForm = () => {
    setIsFormVisible((prev) => !prev);
  };

  return (
    <div className="mt-8">
      <h2 className="mb-6 font-semibold text-xl">
        {MOCK_COMMENTS.length} Comments
      </h2>

      {/* Add Comment Button */}
      {!isFormVisible && (
        <button
          className="hover:bg-green-50 px-6 py-2 border-2 border-green-500 rounded-lg w-full md:max-w-[200px] text-green-500 text-center transition-colors"
          onClick={toggleForm}
        >
          Add Comment
        </button>
      )}

      {/* Show CommentAction with the form/modal based on the state */}
      {isFormVisible && (
        <CommentAction isFormVisible={isFormVisible} toggleForm={toggleForm} />
      )}

      {/* Pass MOCK_COMMENTS to CommentList as a prop */}
      <CommentList comments={initialComments} />
    </div>
  );
};

export default CommentsSection;

"use client";

import { useState, useEffect } from "react";
import CommentList from "./CommentList";
import CommentAction from "./CommentAction";

interface Comment {
  username: string;
  createdAt: string;
  content: string;
}

interface CommentsSectionProps {
  postId?: string;
  initialComments?: Comment[];
}

const CommentsSection = ({ postId }: CommentsSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleForm = () => {
    setIsFormVisible((prev) => !prev);
  };

  // Fetch comments when the component mounts or postId changes
  useEffect(() => {
    const fetchComments = async () => {
      if (!postId) return;

      try {
        const response = await fetch(`/api/posts/${postId}/comments`);
        // const response = await fetch(
        //   `https://nestjs-movie-api-tmdb.vercel.app/aboard/posts/${postId}/comments`
        // );
        if (!response.ok) {
          console.error("Failed to fetch comments");
          return;
        }

        const data = await response.json();
        console.log(data);
        setComments(data.comments || []); // Set the fetched comments
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [postId]); // Only fetch comments if postId changes

  return (
    <div className="mt-8">
      <h2 className="mb-6 font-semibold text-xl">{comments.length} Comments</h2>

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

      {/* Pass the fetched comments to CommentList */}
      <CommentList comments={comments} />
    </div>
  );
};

export default CommentsSection;

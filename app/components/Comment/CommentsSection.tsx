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
  postId: string;
}

const CommentsSection = ({ postId }: CommentsSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state

  const toggleForm = () => {
    setIsFormVisible((prev) => !prev);
  };

  // Fetch comments when the component mounts or postId changes
  useEffect(() => {
    const fetchComments = async () => {
      if (!postId) return;

      try {
        setLoading(true); // Start loading

        const response = await fetch(`/api/posts/${postId}/comments`);
        if (!response.ok) {
          console.error("Failed to fetch comments");
          setLoading(false); // Stop loading in case of failure
          return;
        }

        const data = await response.json();
        setComments(data.comments || []); // Set the fetched comments
      } catch (error) {
        console.error("Error fetching comments:", error);
        setLoading(false); // Stop loading in case of an error
      } finally {
        setLoading(false); // Stop loading after the fetch completes
      }
    };

    fetchComments();
  }, [postId, isFormVisible]); // Only fetch comments if postId changes

  if (loading) {
    return (
      <div className="flex justify-center bg-white mt-8 rounded-xl min-h-screen">
        <h2 className="py-8">Loading...</h2>
      </div>
    );
  }

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
        <CommentAction
          isFormVisible={isFormVisible}
          toggleForm={toggleForm}
          slug={postId}
        />
      )}

      {/* Pass the fetched comments to CommentList */}
      <CommentList comments={comments} />
    </div>
  );
};

export default CommentsSection;

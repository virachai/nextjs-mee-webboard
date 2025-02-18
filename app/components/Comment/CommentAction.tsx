// app/components/Comment/CommentAction.tsx
import { useState } from "react";
import { useSession } from "next-auth/react";

const CommentAction = ({
  isFormVisible,
  toggleForm,
  slug, // Pass the slug from the parent component to identify the post
}: {
  isFormVisible: boolean;
  toggleForm: () => void;
  slug: string; // The post slug (ID) passed down
}) => {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || !session) return;

    const username = session?.user?.name;

    if (!username) return;

    setIsSubmitting(true);
    setError(null); // Reset any previous error

    try {
      // Call the API to create a comment
      const response = await fetch(`/api/posts/${slug}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username, // Replace with actual username from session or state
          content: comment,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create comment.");
      }

      const newComment = await response.json();
      console.log("Comment submitted:", newComment);

      setComment("");
      toggleForm();
    } catch (err) {
      setError((err as Error)?.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!session)
    return (
      <div className="flex justify-center bg-slate-50 p-4 w-full">
        <h2>Sign in to add a comment!</h2>
      </div>
    );

  return (
    <>
      {/* Desktop Form */}
      <div className={`md:block ${isFormVisible ? "block" : "hidden"}`}>
        <form onSubmit={handleSubmit} className="mt-4">
          <textarea
            value={comment}
            onChange={handleCommentChange}
            placeholder="Write your comment..."
            className="p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 w-full resize-none"
            rows={4}
            required
          />
          {error && <p className="mt-2 text-red-500">{error}</p>}
          <div className="flex justify-end gap-x-3 mt-4">
            <button
              type="button"
              onClick={toggleForm}
              className="hover:bg-gray-100 px-6 py-2 border-2 border-gray-500 rounded-lg min-w-[120px] text-gray-500 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !comment}
              className={`px-6 py-2 border-2 rounded-lg text-white transition-colors min-w-[120px] ${
                comment
                  ? "border-green-500 bg-green-500 hover:bg-green-600"
                  : "border-gray-300 bg-gray-300 cursor-not-allowed"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>

      {/* Mobile Modal */}
      <div
        className={`fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50 md:hidden ${
          isFormVisible ? "block" : "hidden"
        }`}
      >
        <div className="relative flex flex-col gap-y-4 bg-white p-6 rounded-lg w-11/12 md:w-[400px]">
          <button
            onClick={toggleForm}
            className="top-3 right-3 absolute text-gray-500 hover:text-gray-700"
          >
            X
          </button>
          <h3>Add Comment</h3>
          <form onSubmit={handleSubmit}>
            <textarea
              value={comment}
              onChange={handleCommentChange}
              placeholder="Write your comment..."
              className="p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 w-full resize-none"
              rows={4}
              required
            />
            {error && <p className="mt-2 text-red-500">{error}</p>}
            <div className="flex flex-col gap-y-4 mt-4">
              <button
                type="button"
                onClick={toggleForm}
                className="hover:bg-gray-100 px-6 py-2 border-2 border-gray-500 rounded-lg text-gray-500 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !comment}
                className={`px-6 py-2 border-2 rounded-lg text-white transition-colors ${
                  comment
                    ? "border-green-500 bg-green-500 hover:bg-green-600"
                    : "border-gray-300 bg-gray-300 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CommentAction;

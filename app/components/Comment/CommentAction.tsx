import React, { useState } from "react";

const CommentAction = ({
  isFormVisible,
  toggleForm,
}: {
  isFormVisible: boolean;
  toggleForm: () => void;
}) => {
  const [comment, setComment] = useState("");

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add the logic to submit the comment (e.g., call an API, update state, etc.)
    console.log("Comment submitted:", comment);
    setComment(""); // Reset comment after submitting
    toggleForm(); // Close the form/modal after submission
  };

  return (
    <>
      {/* Desktop Form */}
      <div className={`md:block ${isFormVisible ? "block" : "hidden"}`}>
        <form onSubmit={handleSubmit} className="mt-4">
          <textarea
            value={comment}
            onChange={handleCommentChange}
            placeholder="Write your comment..."
            className="p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
            rows={4}
          />
          <div className="flex justify-end gap-x-3 mt-4">
            <button
              type="button"
              onClick={toggleForm}
              className="hover:bg-gray-100 px-6 py-2 border-2 border-gray-500 rounded-lg text-gray-500 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!comment}
              className={`px-6 py-2 border-2 rounded-lg text-white transition-colors ${
                comment
                  ? "border-green-500 bg-green-500 hover:bg-green-600"
                  : "border-gray-300 bg-gray-300 cursor-not-allowed"
              }`}
            >
              Submit
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
              className="p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
              rows={4}
            />
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
                disabled={!comment}
                className={`px-6 py-2 border-2 rounded-lg text-white transition-colors ${
                  comment
                    ? "border-green-500 bg-green-500 hover:bg-green-600"
                    : "border-gray-300 bg-gray-300 cursor-not-allowed"
                }`}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CommentAction;

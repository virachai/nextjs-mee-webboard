// app/components/Comment/CommentsSection.tsx
import CommentList from "./CommentList";

const MOCK_COMMENTS = [
  {
    author: "Wittawat98",
    timeAgo: "12h ago",
    content:
      "Lorem ipsum dolor sit amet consectetur. Purus cursus vel est a pretium quam imperdiet.",
  },
  {
    author: "Hawaii51",
    timeAgo: "1mo. ago",
    content:
      "Lorem ipsum dolor sit amet consectetur. Purus cursus vel est a pretium quam imperdiet.",
  },
  {
    author: "Helo_re",
    timeAgo: "3mo. ago",
    content:
      "Lorem ipsum dolor sit amet consectetur. Purus cursus vel est a pretium quam imperdiet.",
  },
];

const CommentsSection = () => {
  return (
    <div className="mt-8">
      <h2 className="mb-6 font-semibold text-xl">
        {MOCK_COMMENTS.length} Comments
      </h2>

      {/* Add Comment Button */}
      <button className="hover:bg-green-50 px-6 py-2 border-2 border-green-500 rounded-lg w-full md:max-w-[200px] text-green-500 text-center transition-colors">
        Add Comment
      </button>

      {/* Pass MOCK_COMMENTS to CommentList as a prop */}
      <CommentList comments={MOCK_COMMENTS} />
    </div>
  );
};

export default CommentsSection;

"use client";

import { useState, useEffect } from "react";
import { X, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { tagData } from "@/app/components/ui/community-dropdown";

interface PostFormProps {
  slug?: string;
  onClose: () => void;
}

const PostForm = ({ slug, onClose }: PostFormProps) => {
  const [selectedCommunity, setSelectedCommunity] = useState("");
  const [showCommunities, setShowCommunities] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [postData, setPostData] = useState<{
    title: string;
    content: string;
    community: string;
  } | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (slug) {
      setPostData(null);
      console.log(slug, postData);
      // Fetch the existing post data if the slug is provided (edit mode)
      // Example fetch (uncomment when implementing fetching logic):
      // fetch(`/api/posts/${slug}`)
      //   .then((res) => res.json())
      //   .then((data) => {
      //     setPostData(data);
      //     setTitle(data.title);
      //     setContent(data.content);
      //     setSelectedCommunity(data.community);
      //   });
    }
  }, [slug, postData]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const postPayload = { selectedCommunity, title, content };

    // If we're editing, we send a PUT request; otherwise, it's a POST request.
    const method = slug ? "PUT" : "POST";
    const url = slug ? `/api/posts/${slug}` : "/api/posts";

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postPayload),
    })
      .then((res) => res.json())
      .then(() => {
        onClose();
        if (slug) {
          router.push(`/post/${slug}`);
        } else {
          router.push("/");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoading(false);
      });
  };

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-start bg-black bg-opacity-50 p-4 sm:p-6">
      <div className="relative bg-white shadow-xl mt-8 rounded-lg w-full max-w-2xl min-h-[300px]">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-bold text-2xl">
            {slug ? "Edit Post" : "Create Post"} - {slug}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 p-4">
          {/* Community Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowCommunities(!showCommunities)}
              className="flex justify-between items-center p-3 border hover:border-green-500 rounded-lg w-full sm:w-64 text-gray-600 text-left transition-colors"
            >
              {selectedCommunity || "Choose a community"}
              <ChevronDown
                size={20}
                className={`transition-transform ${
                  showCommunities ? "rotate-180" : ""
                }`}
              />
            </button>

            {!slug && showCommunities && (
              <div className="z-10 absolute bg-white shadow-lg mt-1 border rounded-lg w-full sm:w-64">
                {tagData.map((community) => (
                  <button
                    key={community.id}
                    type="button"
                    className="hover:bg-gray-50 p-3 first:rounded-t-lg last:rounded-b-lg w-full text-left transition-colors"
                    onClick={() => {
                      setSelectedCommunity(community.label); // Use community.label instead of community.name
                      setShowCommunities(false);
                    }}
                  >
                    {community.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title Input */}
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
            required
          />

          {/* Content Textarea */}
          <textarea
            placeholder="What's on your mind..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 w-full min-h-[200px]"
            required
          />

          {/* Action Buttons */}
          <div className="flex md:flex-row flex-col md:justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="hover:bg-gray-50 px-6 py-2 border rounded-lg text-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`${
                isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500"
              } hover:bg-green-600 px-6 py-2 rounded-lg text-white transition-colors`}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : slug ? "Confirm" : "Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;

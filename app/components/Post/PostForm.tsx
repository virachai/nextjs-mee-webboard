"use client";

import { useState, useEffect } from "react";
import { X, ChevronDown, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { tagData } from "@/app/components/ui/community-dropdown";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

interface PostFormProps {
  slug?: string;
  onClose: () => void;
}

interface PostPayload {
  title: string;
  content: string;
  tags?: string[];
  username?: string;
}

const PostForm = ({ slug, onClose }: PostFormProps) => {
  const { data: session } = useSession();
  const router = useRouter();

  const [selectedCommunity, setSelectedCommunity] = useState("");
  const [showCommunities, setShowCommunities] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (slug) {
      const fetchPostData = async () => {
        try {
          const response = await fetch(`/api/posts/${slug}`);
          if (!response.ok) throw new Error("Failed to fetch post data");
          const data = await response.json();
          setTitle(data.title);
          setContent(data.content);
          setTags(data.tags);
        } catch (error) {
          toast.error("Error fetching post data. Please try again.");
          console.error(error);
        }
      };
      fetchPostData();
    }
  }, [slug]);

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   if (!session?.user?.name) {
  //     toast.error("Please sign in.");
  //     return;
  //   }

  //   if (tags.length === 0 && !slug) {
  //     toast.error("Please select a community.");
  //     return;
  //   }

  //   setIsLoading(true);

  //   const username = session?.user?.name as string;

  //   if (!username) {
  //     toast.error("Please Sign-In.");
  //     return;
  //   }

  //   const postPayload: PostPayload = {
  //     title,
  //     content,
  //     tags,
  //     username: username,
  //   };

  //   try {
  //     const method = slug ? "PUT" : "POST";
  //     const url = slug ? `/api/posts/${slug}` : `/api/posts`; // Updated API endpoint for creating a post

  //     const response = await fetch(url, {
  //       method,
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(postPayload),
  //     });

  //     if (response.status !== 200 && response.status !== 201)
  //       throw new Error("Failed to submit post");

  //     toast.success(
  //       slug ? "Post updated successfully!" : "Post created successfully!"
  //     );

  //     setTimeout(() => {
  //       onClose();
  //       router.push(slug ? `/post/${slug}` : "/");
  //     }, 2000);
  //   } catch (error) {
  //     toast.error("Error submitting post. Please try again.");
  //     console.error(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!session?.user?.name) {
      toast.error("Please sign in.");
      return;
    }

    setIsLoading(true);

    const username = session?.user?.name as string;

    if (!username) {
      toast.error("Please Sign-In.");
      return;
    }

    const postPayload: PostPayload = {
      title,
      content,
      tags: slug ? tags : [],
      username: slug ? undefined : username,
    };

    try {
      const method = slug ? "PUT" : "POST";
      const url = slug ? `/api/posts/${slug}` : `/api/posts`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postPayload),
      });

      if (response.status !== 200 && response.status !== 201)
        throw new Error("Failed to submit post");

      toast.success(
        slug ? "Post updated successfully!" : "Post created successfully!"
      );

      setTimeout(() => {
        onClose();
        router.push(slug ? `/post/${slug}` : "/");
      }, 2000);
    } catch (error) {
      toast.error("Error submitting post. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const CommunityDropdown = () => (
    <div className="relative">
      <button
        type="button"
        onClick={() => setShowCommunities(!showCommunities)}
        className="flex justify-between items-center p-3 border hover:border-green-500 rounded-lg w-full md:w-64 text-gray-600 md:text-left transition-colors"
        aria-expanded={showCommunities}
        aria-haspopup="listbox"
      >
        <p className="md:text-left grow">
          {selectedCommunity || "Choose a community"}
        </p>
        <ChevronDown
          size={20}
          className={`transition-transform ${
            showCommunities ? "rotate-180" : ""
          }`}
        />
      </button>

      {showCommunities && (
        <div
          className="z-10 absolute bg-white shadow-lg mt-1 border rounded-lg w-full md:w-64"
          role="listbox"
        >
          {tagData.map((community) => (
            <button
              key={community.id}
              type="button"
              className="hover:bg-gray-50 p-3 first:rounded-t-lg last:rounded-b-lg w-full text-left transition-colors"
              onClick={() => {
                setSelectedCommunity(community.label);
                setTags([community.id]);
                setShowCommunities(false);
              }}
              role="option"
              aria-selected={selectedCommunity === community.label}
            >
              {community.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-start bg-black bg-opacity-50 p-4 sm:p-6">
      <div className="relative bg-white shadow-xl mt-8 rounded-lg w-full max-w-2xl min-h-[300px]">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-bold text-2xl">
            {slug ? "Edit Post" : "Create Post"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>
        {!session && (
          <div className="flex justify-center bg-slate-50 p-4 w-full">
            <h2>Sign in to ceate a post!</h2>
          </div>
        )}
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 p-4">
          {/* Community Dropdown */}
          {!slug && <CommunityDropdown />}

          {/* Title Input */}
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
            required
            aria-label="Post Title"
          />

          {/* Content Textarea */}
          <textarea
            placeholder="What's on your mind..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 w-full min-h-[200px] resize-none"
            required
            aria-label="Post Content"
          />

          {/* Action Buttons */}
          <div className="flex md:flex-row flex-col md:justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="hover:bg-gray-50 px-6 py-2 border rounded-lg min-w-[120px] text-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`${
                isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500"
              } hover:bg-green-600 px-6 py-2 rounded-lg text-white transition-colors min-w-[120px]`}
              disabled={isLoading}
              aria-label={isLoading ? "Saving..." : slug ? "Confirm" : "Post"}
            >
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : slug ? (
                "Confirm"
              ) : (
                "Post"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;

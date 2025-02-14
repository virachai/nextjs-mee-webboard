"use client";

import { useRouter, useParams } from "next/navigation";
import PostForm from "./PostForm";

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const handleClose = () => {
    const previousUrl = document.referrer;
    if (previousUrl && new URL(previousUrl).origin === window.location.origin) {
      router.back();
    } else {
      router.push("/post");
    }
  };

  return (
    <div className="p-4">
      <PostForm slug={slug} onClose={handleClose} />
    </div>
  );
}

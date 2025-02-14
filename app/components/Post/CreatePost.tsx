"use client";

import { useRouter } from "next/navigation";
import PostForm from "./PostForm";

export default function Page() {
  const router = useRouter();

  const handleClose = () => {
    const previousUrl = document.referrer;
    if (previousUrl && new URL(previousUrl).origin === window.location.origin) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <div className="p-4">
      <PostForm slug={""} onClose={handleClose} />
    </div>
  );
}

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./error.module.css";
import Button from "@/app/components/Button/Button";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const router = useRouter();
  const goBack = () => {
    router.back();
  };
  return (
    <div className={styles.container}>
      <h2>
        Oops! We&apos;ve sent you the wrong way. This post does not exist.
      </h2>
      <Button onClick={goBack} label="Return to Previous" />
    </div>
  );
}

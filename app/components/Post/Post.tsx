import React from "react";
import styles from "./Post.module.css";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";

type PostProps = {
  post: {
    slug: string;
    title: string;
    author: string;
    publishDate: string;
    summary: string;
  };
  image: string | StaticImageData; // Union type for both remote (URL) and local (StaticImageData) images
  local?: boolean; // Optional flag to distinguish local images
  priority?: boolean; // Optional priority for preloading
};

export default function Post({
  post: { slug, title, author, publishDate, summary },
  image,
  local = false,
  priority = false,
}: PostProps) {
  return (
    <Link className={styles.containerLink} href={`/post/${slug}`}>
      <div className={styles.imageContainer}>
        {local ? (
          // Handle local images as StaticImageData
          <Image
            className={styles.postImage}
            src={image as StaticImageData} // Assert the type as StaticImageData
            alt={title}
            priority={priority} // Pass the priority prop to Image
            // fill={true} // Fill the container with the image
            width={1024} // You should specify width and height for remote images
            height={638}
          />
        ) : (
          // Handle remote images as URL (string)
          <Image
            className={styles.postImage}
            src={image as string} // Assert the type as string (URL)
            alt={title}
            width={500} // You should specify width and height for remote images
            height={500}
            priority={priority} // Pass the priority prop to Image
          />
        )}
      </div>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.summary}>{summary}</p>
      <small className={styles.info}>
        {publishDate} | {author}
      </small>
    </Link>
  );
}

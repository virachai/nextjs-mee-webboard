import React from "react";
import Link from "next/link";
import styles from "./Button.module.css";

type ButtonProps = {
  label: string;
  href?: string;
  onClick?: () => void;
};

export default function Button({ label, href, onClick }: ButtonProps) {
  return href ? (
    <Link href={href} className={styles.button} passHref>
      {label}
    </Link>
  ) : (
    <button className={styles.button} onClick={onClick}>
      {label}
    </button>
  );
}

import { spaceMono, nunito } from "@/app/fonts"; // Named imports for fonts
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Apply spaceMono font to <h3> */}
        <h3 className={`${spaceMono.variable}`}>
          Codecademy <span className={styles.accent}>&lt;Dev&gt;</span> Blog
        </h3>
        {/* Apply nunito font to <h4> */}
        <h4 className={`${nunito.variable}`}>
          Like what you&apos;re reading? Subscribe to our newsletter!
        </h4>
        <form>
          <input
            className={styles.input}
            type="text"
            placeholder="email"
          ></input>
          <button className={styles.button} type="button">
            Subscribe
          </button>
        </form>
      </div>
    </footer>
  );
}

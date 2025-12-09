"use client";

import Image from "next/image";
import styles from "./Sidebar.module.css";

export default function Sidebar({ onAddThread, onOpenArchived }) {
  return (
    <aside className={styles.sidebar}>
      <button className={styles.addThreadButton} onClick={onAddThread}>
        + thread
      </button>
      <button className={styles.archivedButton} onClick={onOpenArchived}>
        archive
      </button>
      <div className={styles.logoContainer}>
        <Image
          src="/mind-threads-logo.png"
          alt="Mind Threads"
          width={50}
          height={50}
          className={styles.logo}
        />
      </div>
    </aside>
  );
}

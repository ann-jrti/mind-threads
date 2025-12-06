"use client";

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
    </aside>
  );
}

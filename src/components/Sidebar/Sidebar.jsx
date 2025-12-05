"use client";

import styles from "./Sidebar.module.css";

export default function Sidebar({ onAddThread }) {
  return (
    <aside className={styles.sidebar}>
      <button className={styles.addThreadButton} onClick={onAddThread}>
        + thread
      </button>
    </aside>
  );
}

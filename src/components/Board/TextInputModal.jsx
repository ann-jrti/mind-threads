"use client";

import { useState } from "react";
import styles from "./TextInputModal.module.css";

export default function TextInputModal({
  title,
  placeholder = "...",
  submitLabel = "create",
  onSubmit,
  onCancel,
  initialValue = "",
  type = "default",
}) {
  const [text, setText] = useState(initialValue);

  function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) return;

    onSubmit(text.trim());
    setText("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (text.trim()) {
        onSubmit(text.trim());
        setText("");
      }
    }
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>{title}</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          {type === "update" ? (
            <textarea
              className={styles.textarea}
              placeholder={placeholder}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          ) : (
            <input
              className={styles.input}
              placeholder={placeholder}
              value={text}
              onChange={(e) => setText(e.target.value)}
              autoFocus
            />
          )}

          <div className={styles.actions}>
            <button type="button" className={styles.cancel} onClick={onCancel}>
              cancel
            </button>

            <button type="submit" className={styles.create}>
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

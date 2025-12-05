"use client";

import { useState } from "react";
import TextInputModal from "../Board/TextInputModal";
import Actions from "./Actions";
import { addUpdateToThread, updateUpdateInThread } from "@/utils/threadStorage";
import styles from "./Thread.module.css";

export default function Thread({ thread, onUpdate, onArchive }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUpdateId, setEditingUpdateId] = useState(null);
  const [editingText, setEditingText] = useState("");

  function handleAddUpdate(text) {
    const updatedThread = addUpdateToThread(thread, text);
    onUpdate(updatedThread);
    setIsModalOpen(false);
  }

  function handleEditUpdate(updateId, newText) {
    const updatedThread = updateUpdateInThread(thread, updateId, newText);
    onUpdate(updatedThread);
    setEditingUpdateId(null);
    setEditingText("");
  }

  function handleEditClick(update) {
    setEditingUpdateId(update.id);
    setEditingText(update.text);
  }

  return (
    <div className={styles.thread}>
      <div className={styles.header}>
        <h3 className={styles.title}>{thread.title}</h3>

        <button
          className={styles.addBtn}
          onClick={() => setIsModalOpen(true)}
          aria-label="Add update"
        >
          +
        </button>
      </div>

      <div className={styles.updates}>
        {thread.updates.map((update) => (
          <div key={update.id} className={styles.update}>
            <button
              className={styles.editBtn}
              onClick={() => handleEditClick(update)}
              aria-label="Edit update"
            >
              <p className={styles.updateText}>{update.text}</p>
            </button>
          </div>
        ))}
      </div>

      <Actions
        onArchive={() => onArchive(thread.id)}
        thread={thread}
        onUpdate={onUpdate}
      />

      {isModalOpen && (
        <TextInputModal
          title="add update"
          type="update"
          placeholder="..."
          submitLabel="add"
          onSubmit={handleAddUpdate}
          onCancel={() => setIsModalOpen(false)}
        />
      )}

      {editingUpdateId !== null && (
        <TextInputModal
          title="edit update"
          placeholder="..."
          submitLabel="update"
          initialValue={editingText}
          type="update"
          onSubmit={(text) => handleEditUpdate(editingUpdateId, text)}
          onCancel={() => {
            setEditingUpdateId(null);
            setEditingText("");
          }}
        />
      )}
    </div>
  );
}

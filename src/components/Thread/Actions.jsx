"use client";

import { useState } from "react";
import TextInputModal from "../Board/TextInputModal";
import { Archive } from "lucide-react";
import {
  addActionToThread,
  toggleActionInThread,
  updateActionInThread,
} from "@/utils/threadStorage";

import styles from "./Actions.module.css";

export default function Actions({ thread, onArchive, onUpdate }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingActionId, setEditingActionId] = useState(null);
  const [editingText, setEditingText] = useState("");

  function handleAddAction(text) {
    const updatedThread = addActionToThread(thread, text);
    onUpdate(updatedThread);
    setIsModalOpen(false);
  }

  function handleToggleAction(actionId) {
    const updatedThread = toggleActionInThread(thread, actionId);
    onUpdate(updatedThread);
  }

  function handleStartEditing(action) {
    setEditingActionId(action.id);
    setEditingText(action.text);
  }

  function handleSaveEdit() {
    if (editingText.trim() && editingActionId) {
      const updatedThread = updateActionInThread(
        thread,
        editingActionId,
        editingText.trim()
      );
      onUpdate(updatedThread);
    }
    setEditingActionId(null);
    setEditingText("");
  }

  function handleCancelEdit() {
    setEditingActionId(null);
    setEditingText("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSaveEdit();
    } else if (e.key === "Escape") {
      handleCancelEdit();
    }
  }

  return (
    <>
      <div className={styles.actionsContainer}>
        <div className={styles.actionsList}>
          {thread.actions &&
            thread.actions.map((action) => (
              <div key={action.id} className={styles.actionItem}>
                <input
                  type="checkbox"
                  checked={action.completed || false}
                  onChange={() => handleToggleAction(action.id)}
                  className={styles.actionCheckbox}
                />
                {editingActionId === action.id ? (
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    onBlur={handleSaveEdit}
                    onKeyDown={handleKeyDown}
                    className={styles.actionEditInput}
                    autoFocus
                  />
                ) : (
                  <span
                    className={`${styles.actionText} ${
                      action.completed ? styles.completed : ""
                    }`}
                    onClick={() => handleStartEditing(action)}
                  >
                    {action.text}
                  </span>
                )}
              </div>
            ))}
        </div>

        {isModalOpen && (
          <TextInputModal
            title="add action"
            placeholder="..."
            submitLabel="add"
            onSubmit={handleAddAction}
            onCancel={() => setIsModalOpen(false)}
          />
        )}
      </div>
      <div className={styles.actionBtns}>
        <button
          className={styles.addActionBtn}
          onClick={() => setIsModalOpen(true)}
          aria-label="Add action"
        >
          + action
        </button>
        {onArchive && (
          <button
            className={styles.archiveBtn}
            onClick={onArchive}
            aria-label="Archive thread"
            title="Archive thread"
          >
            <Archive size={16} />
          </button>
        )}
      </div>
    </>
  );
}

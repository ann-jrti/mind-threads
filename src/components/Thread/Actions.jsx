"use client";

import { useState } from "react";
import TextInputModal from "../Board/TextInputModal";
import { Archive } from "lucide-react";
import {
  addActionToThread,
  removeActionFromThread,
} from "@/utils/threadStorage";

import styles from "./Actions.module.css";

export default function Actions({ thread, onArchive, onUpdate }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleAddAction(text) {
    const updatedThread = addActionToThread(thread, text);
    onUpdate(updatedThread);
    setIsModalOpen(false);
  }

  function handleRemoveAction(actionId) {
    const updatedThread = removeActionFromThread(thread, actionId);
    onUpdate(updatedThread);
  }

  return (
    <>
      <div className={styles.actionsContainer}>
        <div className={styles.actionsList}>
          {thread.actions &&
            thread.actions.map((action) => (
              <div key={action.id} className={styles.actionBadge}>
                <span>{action.text}</span>
                <button
                  className={styles.removeBadge}
                  onClick={() => handleRemoveAction(action.id)}
                  aria-label={`Remove action: ${action.text}`}
                >
                  ×
                </button>
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

"use client";

import { useState } from "react";
import TextInputModal from "../Board/TextInputModal";
import Actions from "./Actions";
import {
  addUpdateToThread,
  updateUpdateInThread,
  formatDisplayDate,
} from "@/utils/threadStorage";
import { ListChevronsDownUp, ListChevronsUpDown } from "lucide-react";

import styles from "./Thread.module.css";

export default function Thread({ thread, onUpdate, onArchive }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUpdateId, setEditingUpdateId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(true);

  function getDisplayDate(update) {
    if (!update) return "";
    if (update.displayDate) return update.displayDate;
    if (update.createdAt) {
      const parsedDate = new Date(update.createdAt);
      if (!Number.isNaN(parsedDate.getTime())) {
        return formatDisplayDate(parsedDate);
      }
    }
    return "";
  }

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

  function handleToggleCollapse() {
    setIsCollapsed((s) => !s);
  }

  const latestUpdate =
    thread.updates.length > 0
      ? thread.updates[thread.updates.length - 1]
      : null;

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

      {thread.updates.length > 1 && (
        <div className={styles.toggleRow}>
          <button
            className={styles.uncollapseBtn}
            onClick={handleToggleCollapse}
            aria-label={isCollapsed ? "Uncollapse updates" : "Collapse updates"}
          >
            {isCollapsed ? (
              <ListChevronsUpDown color="black" width="18" strokeWidth="1" />
            ) : (
              <ListChevronsDownUp color="black" width="18" strokeWidth="1" />
            )}
          </button>
        </div>
      )}

      <div className={styles.updates}>
        {thread.updates.length > 0 && isCollapsed && latestUpdate && (
          <div key={latestUpdate.id} className={styles.update}>
            <button
              className={styles.editBtn}
              onClick={() => handleEditClick(latestUpdate)}
              aria-label="Edit update"
            >
              <p className={styles.updateText}>
                <span className={styles.dateText}>
                  {getDisplayDate(latestUpdate)}
                </span>
                {latestUpdate.text}
              </p>
            </button>
          </div>
        )}

        {thread.updates.length > 0 &&
          !isCollapsed &&
          thread.updates.map((update) => (
            <div key={update.id} className={styles.update}>
              <button
                className={styles.editBtn}
                onClick={() => handleEditClick(update)}
                aria-label="Edit update"
              >
                <p className={styles.updateText}>
                  <span className={styles.dateText}>
                    {getDisplayDate(update)}
                  </span>
                  <span>{update.text}</span>
                </p>
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

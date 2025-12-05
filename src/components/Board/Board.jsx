"use client";

import { useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import Thread from "@/components/Thread/Thread";
import TextInputModal from "./TextInputModal";
import {
  createThread,
  archiveThread,
  THREADS_STORAGE_KEY,
  ARCHIVED_THREADS_KEY,
} from "@/utils/threadStorage";
import styles from "./Board.module.css";

export default function Board() {
  const [threads, setThreads] = useLocalStorage(THREADS_STORAGE_KEY, []);
  const [archivedThreads, setArchivedThreads] = useLocalStorage(
    ARCHIVED_THREADS_KEY,
    []
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleAddThread(title) {
    const newThread = createThread(title);
    setThreads((prev) => [...prev, newThread]);
    setIsModalOpen(false);
  }

  function handleArchiveThread(threadId) {
    setThreads((prev) => {
      const threadToArchive = prev.find((thread) => thread.id === threadId);
      if (threadToArchive) {
        const archivedThread = archiveThread(threadToArchive);
        setArchivedThreads((archived) => [...archived, archivedThread]);
        return prev.filter((thread) => thread.id !== threadId);
      }
      return prev;
    });
  }

  function handleUpdateThread(updatedThread) {
    setThreads((prev) =>
      prev.map((thread) =>
        thread.id === updatedThread.id ? updatedThread : thread
      )
    );
  }

  return (
    <div className={styles.boardWrapper}>
      <button className={styles.addButton} onClick={() => setIsModalOpen(true)}>
        + thread
      </button>

      <div className={styles.board}>
        {typeof window !== "undefined" &&
          threads.map((thread) => (
            <Thread
              key={thread.id}
              thread={thread}
              onArchive={handleArchiveThread}
              onUpdate={handleUpdateThread}
            />
          ))}
      </div>

      {isModalOpen && (
        <TextInputModal
          title="add thread"
          placeholder="..."
          submitLabel="create"
          onSubmit={handleAddThread}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

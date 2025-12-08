"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import Thread from "@/components/Thread/Thread";
import TextInputModal from "./TextInputModal";
import ArchivedThreadsModal from "./ArchivedThreadsModal";
import {
  createThread,
  archiveThread,
  THREADS_STORAGE_KEY,
  ARCHIVED_THREADS_KEY,
} from "@/utils/threadStorage";
import styles from "./Board.module.css";

export default function Board({
  isModalOpen,
  setIsModalOpen,
  isArchivedModalOpen,
  setIsArchivedModalOpen,
}) {
  const [threads, setThreads] = useLocalStorage(THREADS_STORAGE_KEY, []);
  const [archivedThreads, setArchivedThreads] = useLocalStorage(
    ARCHIVED_THREADS_KEY,
    []
  );

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

  function handleDeleteArchivedThread(threadId) {
    setArchivedThreads((prev) =>
      prev.filter((thread) => thread.id !== threadId)
    );
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

      {isArchivedModalOpen && (
        <ArchivedThreadsModal
          archivedThreads={archivedThreads}
          onDelete={handleDeleteArchivedThread}
          onClose={() => setIsArchivedModalOpen(false)}
        />
      )}
    </div>
  );
}

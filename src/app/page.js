"use client";

import { useState } from "react";
import Board from "@/components/Board/Board";
import Sidebar from "@/components/Sidebar/Sidebar";
import styles from "./page.module.css";

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isArchivedModalOpen, setIsArchivedModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleOpenArchived = () => {
    setIsArchivedModalOpen(true);
  };

  return (
    <main className={styles.main}>
      <Board
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        isArchivedModalOpen={isArchivedModalOpen}
        setIsArchivedModalOpen={setIsArchivedModalOpen}
      />
      <Sidebar
        onAddThread={handleOpenModal}
        onOpenArchived={handleOpenArchived}
      />
    </main>
  );
}

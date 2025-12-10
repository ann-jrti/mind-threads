"use client";

import { useState } from "react";
import {
  addUpdateToThread,
  updateUpdateInThread,
  formatDisplayDate,
} from "@/utils/threadStorage";
import { parseTextWithLinks } from "@/utils/linkify";

export default function useThread(thread, onUpdate, onArchive) {
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

  function handleEditUpdate(newText) {
    const updatedThread = updateUpdateInThread(
      thread,
      editingUpdateId,
      newText
    );
    onUpdate(updatedThread);
    setEditingUpdateId(null);
    setEditingText("");
  }

  function handleEditClick(update) {
    setEditingUpdateId(update.id);
    setEditingText(update.text);
  }

  function handleCancelEdit() {
    setEditingUpdateId(null);
    setEditingText("");
  }

  function handleToggleCollapse() {
    setIsCollapsed((s) => !s);
  }

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function handleArchive() {
    onArchive(thread.id);
  }

  function getTextWithLinks(text) {
    return parseTextWithLinks(text);
  }

  const latestUpdate =
    thread.updates.length > 0
      ? thread.updates[thread.updates.length - 1]
      : null;

  const hasMultipleUpdates = thread.updates.length > 1;
  const hasUpdates = thread.updates.length > 0;
  const isEditing = editingUpdateId !== null;

  return {
    state: {
      isModalOpen,
      isCollapsed,
      isEditing,
      editingText,
    },
    data: {
      latestUpdate,
      hasMultipleUpdates,
      hasUpdates,
      updates: thread.updates,
      title: thread.title,
    },
    actions: {
      openModal,
      closeModal,
      handleAddUpdate,
      handleEditUpdate,
      handleEditClick,
      handleCancelEdit,
      handleToggleCollapse,
      handleArchive,
    },
    utils: {
      getDisplayDate,
      getTextWithLinks,
    },
    thread,
    onUpdate,
  };
}
